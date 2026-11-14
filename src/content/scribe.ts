import type { FaithChange } from '../game/types';

/** Hints on Day 1 of a first reign, keyed by the arriving soul's position (GDD §4). */
export const DAY_ONE_HINTS: Readonly<Record<number, string>> = {
  0: 'Open one Eye. Only one.',
  1: 'They only know the story. Watch the lamp.',
  3: 'Only two Returns each day.',
  4: 'This one is here because of you.',
};

export const FIRST_VERDICT_HINT = 'I wrote it down. They will read it.';

export const RETURN_SPENT = 'No Returns left today';

export const REACTIONS: Readonly<Record<FaithChange, string>> = {
  2: 'Lowmere cheers!',
  1: 'Lowmere approves.',
  0: 'Lowmere shrugs.',
  [-1]: 'Lowmere is worried.',
  [-2]: 'Lowmere is angry!',
};

const COUNTS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];

/** The Scribe's remark at the end of a Day, from the Faith change of each Verse in order. */
export function dayEndRemark(faiths: readonly FaithChange[], lastDay: boolean): string {
  if (lastDay) return 'Your last Verses. I will copy them out.';
  const count = `${COUNTS[faiths.length] ?? faiths.length} Verse${faiths.length === 1 ? '' : 's'}`;
  const worst = faiths.reduce<number>((w, f, i) => (f < faiths[w] ? i : w), 0);
  if (faiths.length > 0 && faiths[worst] < 0) {
    return `${count}. People argue most about the ${ORDINALS[worst] ?? 'last'}.`;
  }
  if (faiths.length > 0 && faiths.every((f) => f > 0)) return `${count}. People like them.`;
  return `${count}. People are still thinking.`;
}
