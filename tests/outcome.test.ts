import { describe, expect, it } from 'vitest';
import { pickEnding, quotedVerses, temperament } from '../src/game/outcome';
import { newReign, type HistoryEntry, type ReignState } from '../src/game/reign';
import type { Content, Eye, Verdict } from '../src/game/types';
import { content, echo, root } from './fixtures';

const C20 = content(20);
const base = newReign(C20, { seed: 1, firstReign: false });

function repeat<T>(counts: [T, number][]): T[] {
  return counts.flatMap(([value, n]) => Array<T>(n).fill(value));
}

function history(verdicts: Verdict[], eyes: Eye[] = verdicts.map(() => 'deed')): HistoryEntry[] {
  return verdicts.map((verdict, i) => ({ soul: `r${i % 20}`, day: 1, eye: eyes[i], verdict }));
}

function withHistory(verdicts: Verdict[], extra: Partial<ReignState> = {}, eyes?: Eye[]): ReignState {
  return { ...base, faith: 5, history: history(verdicts, eyes), ...extra };
}

const gentle = repeat<Verdict>([['rise', 10], ['fall', 5], ['return', 5]]);
const stern = repeat<Verdict>([['fall', 10], ['rise', 5], ['return', 5]]);
const patient = repeat<Verdict>([['rise', 6], ['fall', 6], ['return', 8]]);
const even = repeat<Verdict>([['rise', 8], ['fall', 8], ['return', 4]]);

describe('endings', () => {
  it('checks Faith first, then the balance of verdicts', () => {
    expect(pickEnding(withHistory(even, { faith: 2 }))).toBe('silent-sky');
    expect(pickEnding(withHistory(gentle, { faith: 0 }))).toBe('silent-sky');
    expect(pickEnding(withHistory(even, { faith: 9 }))).toBe('unquestioned');
    expect(pickEnding(withHistory(gentle))).toBe('gentle-age');
    expect(pickEnding(withHistory(stern))).toBe('iron-age');
    expect(pickEnding(withHistory(even))).toBe('weighed-world');
  });

  it('only uses the endings of the current plan', () => {
    expect(pickEnding(withHistory(gentle, { plan: 'firstRelease' }))).toBe('gentle-age');
    expect(pickEnding(withHistory(stern, { plan: 'prototype' }))).toBe('weighed-world');
  });

  it('quotes the most loved and most hated Verse, earlier first on ties', () => {
    const c: Content = {
      souls: [
        root(1),
        root(3, { faith: { rise: 2 } }),
        root(5, { faith: { fall: -2 } }),
        root(7, { faith: { rise: 2 } }),
        echo(1),
        echo(3),
        echo(5),
        echo(7),
      ],
      dayOne: [],
    };
    const s: ReignState = {
      ...base,
      history: [
        { soul: 'r1', day: 1, eye: 'deed', verdict: 'rise' },
        { soul: 'r3', day: 1, eye: 'deed', verdict: 'rise' },
        { soul: 'r5', day: 1, eye: 'deed', verdict: 'fall' },
        { soul: 'r7', day: 2, eye: 'deed', verdict: 'rise' },
      ],
    };
    expect(quotedVerses(s, c)).toEqual({ loved: 'r3 rise verse', hated: 'r5 fall verse' });
  });

  it('never quotes the same Verse twice when there are two to choose from', () => {
    const s: ReignState = {
      ...base,
      history: [
        { soul: 'r1', day: 1, eye: 'deed', verdict: 'rise' },
        { soul: 'r2', day: 1, eye: 'deed', verdict: 'rise' },
      ],
    };
    const q = quotedVerses(s, C20);
    expect(q.loved).not.toBe(q.hated);
  });
});

describe('temperament', () => {
  const adjectives: [string, Verdict[]][] = [
    ['Gentle', gentle],
    ['Stern', stern],
    ['Patient', patient],
    ['Even', even],
  ];
  const nouns: [string, Eye[]][] = [
    ['Keeper of Deeds', repeat<Eye>([['deed', 10], ['heart', 5], ['ripple', 5]])],
    ['Weigher of Hearts', repeat<Eye>([['heart', 10], ['deed', 5], ['ripple', 5]])],
    ['Reader of Ripples', repeat<Eye>([['ripple', 10], ['deed', 5], ['heart', 5]])],
    ['Wanderer of Eyes', repeat<Eye>([['deed', 7], ['heart', 7], ['ripple', 6]])],
  ];

  it('produces all 16 titles', () => {
    const titles = new Set<string>();
    for (const [adjective, verdicts] of adjectives) {
      for (const [noun, eyes] of nouns) {
        const title = temperament(withHistory(verdicts, {}, eyes)).title;
        expect(title).toBe(`The ${adjective} ${noun}`);
        titles.add(title);
      }
    }
    expect(titles.size).toBe(16);
  });

  it('treats a tie for the most-opened Eye as wandering', () => {
    const eyes = repeat<Eye>([['deed', 8], ['heart', 8], ['ripple', 4]]);
    expect(temperament(withHistory(even, {}, eyes)).noun).toBe('Wanderer of Eyes');
  });
});
