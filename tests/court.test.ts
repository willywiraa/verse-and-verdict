import { describe, expect, it } from 'vitest';
import {
  CROWD_START,
  cityOf,
  crowdOf,
  currentCase,
  lastVerdict,
  newDay,
  next,
  sentence,
  type DayState,
} from '../src/shared/court/court';
import { formatRp } from '../src/shared/court/money';
import { crowdMood, dayReport, fairness, fairnessLine, judgeTitle } from '../src/shared/court/report';
import type { CourtContent } from '../src/shared/court/types';
import { OPTION, makeCase, makeCourt } from './court-fixtures';

/** Sentence every case in turn with the given option indexes. */
function play(content: CourtContent, picks: number[]): DayState {
  let state = newDay(content);
  for (const pick of picks) state = next(sentence(state, content, pick));
  return state;
}

describe('a Court Day', () => {
  const court = makeCourt(3);

  it('starts on the first case with the crowd in the middle', () => {
    const state = newDay(court);
    expect(state.phase).toBe('case');
    expect(currentCase(state, court)?.id).toBe('case-1');
    expect(crowdOf(state, court)).toBe(CROWD_START);
  });

  it('records a verdict, shows it, then moves to the next case', () => {
    const judged = sentence(newDay(court), court, 1);
    expect(judged.phase).toBe('verdict');
    expect(lastVerdict(judged, court)?.option.scene).toBe('seize');
    expect(currentCase(judged, court)?.id).toBe('case-1');
    const moved = next(judged);
    expect(moved.phase).toBe('case');
    expect(currentCase(moved, court)?.id).toBe('case-2');
    expect(lastVerdict(moved, court)).toBeUndefined();
  });

  it('ignores invalid picks and out-of-turn moves', () => {
    const state = newDay(court);
    expect(sentence(state, court, 9)).toBe(state);
    expect(sentence(state, court, -1)).toBe(state);
    expect(sentence(state, court, 0.5)).toBe(state);
    expect(next(state)).toBe(state);
    const judged = sentence(state, court, 0);
    expect(sentence(judged, court, 1)).toBe(judged);
  });

  it('ends in the Day Report after the last case', () => {
    const state = play(court, [0, 1, 2]);
    expect(state.phase).toBe('report');
    expect(state.verdicts).toHaveLength(3);
    expect(currentCase(state, court)).toBeUndefined();
    expect(next(state)).toBe(state);
  });

  it('keeps the crowd between 0 and 10 at every step', () => {
    const many = makeCourt(6, ['prison', 'chance', 'ban']);
    expect(crowdOf(play(many, [0, 0, 0, 0, 0, 0]), many)).toBe(10);
    // Clamped at 0 on the way down, so one +2 afterwards lands on 2, not below.
    expect(crowdOf(play(many, [1, 1, 1, 1, 1, 0]), many)).toBe(2);
  });

  it('totals what the verdicts built, by picture', () => {
    const many = makeCourt(3, ['seize', 'repay', 'service']);
    expect(cityOf(play(many, [0, 0, 1]), many)).toEqual([
      { picture: 'hospital', count: 6 },
      { picture: 'home', count: 2 },
    ]);
  });
});

describe('the Day Report', () => {
  it('names the judge after the group used most, if used 3 times or more', () => {
    const { prison, ban, seize, repay, service, chance } = OPTION;
    expect(judgeTitle([prison, prison, ban, seize, service, chance])).toBe('iron');
    expect(judgeTitle([seize, repay, seize, repay, prison, chance])).toBe('fixer');
    expect(judgeTitle([service, chance, service, prison, seize, ban])).toBe('kind');
    expect(judgeTitle([prison, ban, seize, repay, service, chance])).toBe('balanced');
    expect(judgeTitle([prison, ban, prison, seize, repay, seize])).toBe('balanced');
  });

  it('compares the smallest crime with the largest, without grading', () => {
    const small = makeCase('bread', 50_000, ['prison', 'chance', 'repay']);
    const big = makeCase('hospital', 500_000_000_000, ['prison', 'chance', 'repay']);
    const tougherOnSmall = fairness([
      { case: small, option: small.options[0] },
      { case: big, option: big.options[1] },
    ]);
    expect(tougherOnSmall?.leaning).toBe('small');
    expect(fairnessLine(tougherOnSmall!)).toBe('You were tougher on the bread thief.');
    const same = fairness([
      { case: big, option: big.options[2] },
      { case: small, option: small.options[2] },
    ]);
    expect(fairnessLine(same!)).toBe('Same treatment for the bread thief and the hospital thief.');
    expect(fairness([{ case: small, option: small.options[0] }])).toBeNull();
  });

  it('brings it all together', () => {
    const court = makeCourt(6, ['prison', 'seize', 'service']);
    const report = dayReport(play(court, [0, 0, 0, 1, 1, 2]), court);
    expect(report.title).toBe('iron');
    // 5 → 7 → 9 → 10 (clamped) → 10 → 10 → 9
    expect(report.crowd).toBe(9);
    expect(report.mood).toBe('cheering');
    expect(report.built).toEqual([
      { picture: 'hospital', count: 6 },
      { picture: 'park', count: 1 },
    ]);
    expect(report.verdicts).toHaveLength(6);
    // The smallest case got prison (severity 3), the largest community service (1).
    expect(report.fairness?.leaning).toBe('small');
  });

  it('describes the crowd in words', () => {
    expect([0, 3, 5, 7, 10].map(crowdMood)).toEqual(['furious', 'unhappy', 'calm', 'happy', 'cheering']);
  });
});

describe('Rupiah', () => {
  it('reads at a glance', () => {
    expect(formatRp(50_000)).toBe('Rp50,000');
    expect(formatRp(30_000_000)).toBe('Rp30 million');
    expect(formatRp(1_500_000_000)).toBe('Rp1.5 billion');
    expect(formatRp(500_000_000_000)).toBe('Rp500 billion');
    expect(formatRp(2_000_000_000_000)).toBe('Rp2 trillion');
  });
});
