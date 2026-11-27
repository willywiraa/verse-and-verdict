import type { PlayerVerdict } from './api';
import type { CourtContent } from './court/types';

/** A player's daily streak. `last` is the last docket finished on its own day (0 = never). */
export interface Streak {
  streak: number;
  best: number;
  last: number;
}

export const NO_STREAK: Streak = { streak: 0, best: 0, last: 0 };

/** The streak after finishing docket `day` on its own day. Finishing it twice changes nothing. */
export function afterFinishing(s: Streak, day: number): Streak {
  if (day <= s.last) return s;
  const streak = s.last === day - 1 ? s.streak + 1 : 1;
  return { streak, best: Math.max(s.best, streak), last: day };
}

/** The streak as it stands today: it breaks once a whole day is missed. */
export function currentStreak(s: Streak, today: number): number {
  return s.last >= today - 1 ? s.streak : 0;
}

/** True if `v` is the next case of the docket, with an option that exists. */
export function isNextVerdict(content: CourtContent, verdicts: readonly PlayerVerdict[], v: PlayerVerdict): boolean {
  if (content.day[verdicts.length] !== v.case) return false;
  const c = content.cases.find((x) => x.id === v.case);
  return !!c && Number.isInteger(v.option) && v.option >= 0 && v.option < c.options.length;
}

/** Counts per option from a Redis hash of option index → count. */
export function countsFrom(hash: Readonly<Record<string, string>>, options: number): number[] {
  return Array.from({ length: options }, (_, i) => Number(hash[String(i)] ?? 0) || 0);
}

/** Share of votes for `option`, 0–100, rounded. */
export function percent(counts: readonly number[], option: number): number {
  const total = counts.reduce((a, b) => a + b, 0);
  return total === 0 ? 0 : Math.round((counts[option] / total) * 100);
}

/** The option most people chose (the lowest index wins a tie). */
export function majority(counts: readonly number[]): number {
  let best = 0;
  counts.forEach((n, i) => {
    if (n > counts[best]) best = i;
  });
  return best;
}
