import type { FaithChange } from '../game/types';

/** Hints on Day 1 of a first reign, keyed by the arriving soul's position (GDD §4). */
export const DAY_ONE_HINTS: Readonly<Record<number, string>> = {
  0: 'This is what the living say of her. Open one Eye before you judge. Only one.',
  1: 'They know only the Record. Watch the lamp.',
  3: 'The Wheel turns twice a day, no more.',
  4: 'This one comes because of something you said.',
};

export const FIRST_VERDICT_HINT = 'I have written it down. By morning they will be reading it.';

export const RETURN_SPENT = 'The Wheel has turned twice today.';

export const REACTIONS: Readonly<Record<FaithChange, string>> = {
  2: 'Lowmere rejoices.',
  1: 'Lowmere approves.',
  0: 'Lowmere shrugs.',
  [-1]: 'Lowmere is uneasy.',
  [-2]: 'Lowmere is outraged.',
};

const COUNTS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];

/** The Scribe's remark at the end of a Day, from the Faith change of each Verse in order. */
export function dayEndRemark(faiths: readonly FaithChange[], lastDay: boolean): string {
  if (lastDay) return 'The last Verses of your reign. I will copy them out clean.';
  const count = `${COUNTS[faiths.length] ?? faiths.length} Verse${faiths.length === 1 ? '' : 's'}`;
  const worst = faiths.reduce<number>((w, f, i) => (f < faiths[w] ? i : w), 0);
  if (faiths.length > 0 && faiths[worst] < 0) {
    return `${count}. They are already arguing about the ${ORDINALS[worst] ?? 'last'}.`;
  }
  if (faiths.length > 0 && faiths.every((f) => f > 0)) return `${count}. Lowmere reads them aloud and nods.`;
  return `${count}. Lowmere is still deciding what they mean.`;
}
