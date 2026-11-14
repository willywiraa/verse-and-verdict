import { describe, expect, it } from 'vitest';
import { dayEndRemark } from '../src/content/scribe';
import { validateContent, wordCount } from '../src/content/validate';
import type { Content, EchoSoul, RootSoul } from '../src/game/types';
import { content } from './fixtures';

describe('content validator', () => {
  it('accepts well-formed content', () => {
    expect(validateContent(content(20)).errors).toEqual([]);
  });

  it('reports over-long fields and missing Echo versions', () => {
    const c = content(20);
    const souls = c.souls.map((s) => {
      if (s.id === 'r3') return { ...(s as RootSoul), record: 'word '.repeat(29).trim() };
      if (s.id === 'e5') return { ...(s as EchoSoul), versions: { rise: (s as EchoSoul).versions.rise } };
      return s;
    });
    const errors = validateContent({ ...c, souls } as Content).errors;
    expect(errors).toContain('r3: Record has 29 words (limit 28)');
    expect(errors).toContain('e5: no Record and Plea for fall');
  });

  it('requires the first Day 1 soul to teach Echoes', () => {
    const c = content(20);
    const errors = validateContent({ ...c, dayOne: ['r1', 'r0', 'r2', 'r3', 'r4'] }).errors;
    expect(errors).toContain('Day 1: the first soul must summon its Echo the same Day on all three verdicts');
  });

  it('counts words without quotation marks', () => {
    expect(wordCount('“I would cut it again. Ask me why.”')).toBe(8);
  });
});

describe('the Scribe', () => {
  it('points at the most disliked Verse of the Day', () => {
    expect(dayEndRemark([1, -2, 0, 1, -1, 0], false)).toBe('Six Verses. They are already arguing about the second.');
    expect(dayEndRemark([1, 2, 1], false)).toBe('Three Verses. Lowmere reads them aloud and nods.');
    expect(dayEndRemark([0, 1], false)).toBe('Two Verses. Lowmere is still deciding what they mean.');
  });
});
