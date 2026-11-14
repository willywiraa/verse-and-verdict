import { describe, expect, it } from 'vitest';
import { PLANS, planIdFor } from '../src/game/config';
import {
  beginNextDay,
  canGive,
  currentSoulId,
  echoCause,
  faceOf,
  giveVerdict,
  newReign,
  nextSoul,
  openEye,
  soulById,
  type ReignState,
} from '../src/game/reign';
import type { Content, Eye, Verdict } from '../src/game/types';
import { content } from './fixtures';

const C20 = content(20);

function judge(state: ReignState, c: Content, verdict: Verdict, eye: Eye = 'deed'): ReignState {
  return nextSoul(giveVerdict(openEye(state, eye), c, verdict));
}

const isEcho = (id: string) => id.startsWith('e');

describe('reign setup', () => {
  it('picks the largest plan the roots can fill', () => {
    expect(planIdFor(5)).toBe('prototype');
    expect(planIdFor(12)).toBe('firstRelease');
    expect(planIdFor(15)).toBe('firstRelease');
    expect(planIdFor(20)).toBe('full');
    expect(() => planIdFor(4)).toThrow();
  });

  it('starts a first reign with the fixed Day 1 order', () => {
    const s = newReign(C20, { seed: 1, firstReign: true });
    expect(s.docket).toEqual(['r0', 'r1', 'r2', 'r3', 'r4']);
    expect(s.faith).toBe(5);
    expect(s.returnsLeft).toBe(2);
  });

  it('gives the same order for the same seed and another order for another seed', () => {
    const a = newReign(C20, { seed: 7, firstReign: false });
    const b = newReign(C20, { seed: 7, firstReign: false });
    const c = newReign(C20, { seed: 8, firstReign: false });
    expect(a.roots).toEqual(b.roots);
    expect(a.roots).not.toEqual(c.roots);
    expect(new Set(a.roots).size).toBe(20);
  });

  it('leaves out heavy souls in gentle mode', () => {
    const c = content(22, { heavy: [5, 9] });
    const s = newReign(c, { seed: 2, firstReign: false, gentle: true });
    expect(s.plan).toBe('full');
    expect(s.roots).not.toContain('r5');
    expect(s.roots).not.toContain('r9');
  });
});

describe('judging a soul', () => {
  it('needs exactly one open Eye before a verdict', () => {
    let s = newReign(C20, { seed: 1, firstReign: true });
    expect(canGive(s, 'rise')).toBe(false);
    expect(giveVerdict(s, C20, 'rise')).toBe(s);
    s = openEye(s, 'heart');
    expect(openEye(s, 'deed').eye).toBe('heart');
    expect(canGive(s, 'rise')).toBe(true);
  });

  it('allows two Returns per Day, then refuses', () => {
    let s = newReign(C20, { seed: 1, firstReign: false });
    s = judge(s, C20, 'return');
    s = judge(s, C20, 'return');
    s = openEye(s, 'deed');
    expect(s.returnsLeft).toBe(0);
    expect(canGive(s, 'return')).toBe(false);
    expect(giveVerdict(s, C20, 'return')).toBe(s);
    expect(canGive(s, 'rise')).toBe(true);
  });

  it('gives two new Returns each Day', () => {
    let s = newReign(C20, { seed: 1, firstReign: false });
    s = judge(s, C20, 'return');
    while (s.phase === 'soul') s = judge(s, C20, 'rise');
    s = beginNextDay(s);
    expect(s.day).toBe(2);
    expect(s.returnsLeft).toBe(2);
  });

  it('keeps Faith between 0 and 10', () => {
    const up = content(20, { faith: { rise: 2, return: 2, fall: 2 } });
    let s = newReign(up, { seed: 1, firstReign: false });
    for (let i = 0; i < 5; i++) s = judge(s, up, 'rise');
    expect(s.faith).toBe(10);

    const down = content(20, { faith: { rise: -2, return: -2, fall: -2 } });
    s = newReign(down, { seed: 1, firstReign: false });
    for (let i = 0; i < 5; i++) s = judge(s, down, 'fall');
    expect(s.faith).toBe(0);
  });
});

describe('Echoes', () => {
  it('brings the teaching Echo fifth on Day 1 of a first reign', () => {
    let s = newReign(C20, { seed: 3, firstReign: true });
    s = judge(s, C20, 'return');
    expect(s.docket).toEqual(['r0', 'r1', 'r2', 'r3', 'e0', 'r4']);
  });

  it('summons an Echo only on its verdicts and brings it the next Day', () => {
    let s = newReign(C20, { seed: 3, firstReign: true });
    s = judge(s, C20, 'rise'); // r0: teaching Echo, same Day
    s = judge(s, C20, 'rise'); // r1: summons e1
    s = judge(s, C20, 'return'); // r2: no Echo on Return
    s = judge(s, C20, 'fall'); // r3: summons e3
    expect(currentSoulId(s)).toBe('e0');
    s = judge(s, C20, 'rise'); // e0: Echoes never summon
    s = judge(s, C20, 'rise'); // r4: summons e4
    expect(s.phase).toBe('dayEnd');
    expect(s.waiting.map((w) => w.soul)).toEqual(['e1', 'e3', 'e4']);

    s = beginNextDay(s);
    expect(s.docket.filter(isEcho)).toEqual(['e1', 'e3']);
    expect(s.waiting.map((w) => w.soul)).toEqual(['e4']);

    const e3 = soulById(C20, 'e3');
    expect(faceOf(e3, s)).toEqual({ record: 'e3 record after fall', plea: 'e3 plea after fall' });
    expect(echoCause(e3, s, C20)).toEqual({ rootName: 'Root 3', verdict: 'fall', verse: 'r3 fall verse' });
  });
});

describe('Days and reigns', () => {
  it('builds every Day to plan, never opening with an Echo or putting two together', () => {
    const verdicts: Verdict[] = ['rise', 'fall', 'return'];
    for (let seed = 1; seed <= 200; seed++) {
      let s = newReign(C20, { seed, firstReign: seed % 2 === 0 });
      let n = 0;
      while (s.phase !== 'ended') {
        if (s.phase === 'dayEnd') {
          const d = s.docket;
          expect(isEcho(d[0])).toBe(false);
          expect(d.length).toBeLessThanOrEqual(6);
          expect(d.filter((id) => !isEcho(id))).toHaveLength(PLANS.full.rootsPerDay[s.day - 1]);
          d.forEach((id, i) => {
            if (i > 0 && isEcho(id)) expect(isEcho(d[i - 1])).toBe(false);
          });
          s = beginNextDay(s);
          continue;
        }
        let v = verdicts[(seed + n++) % 3];
        if (v === 'return' && s.returnsLeft === 0) v = 'rise';
        s = judge(s, C20, v);
      }
      expect(s.day).toBe(5);
      expect(s.history.length).toBeGreaterThanOrEqual(20);
      expect(s.history.length).toBeLessThanOrEqual(30);
    }
  });
});
