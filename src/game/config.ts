import type { EndingId } from './types';

export const SOULS_PER_DAY = 6;
export const RETURNS_PER_DAY = 2;
export const FAITH_MIN = 0;
export const FAITH_MAX = 10;
export const FAITH_START = 5;
/** A same-Day Echo arrives after at least this many other souls. */
export const SAME_DAY_GAP = 3;

export interface ReignPlan {
  days: number;
  /** New (root) souls on each Day. The remaining places go to waiting Echoes. */
  rootsPerDay: readonly number[];
  endings: readonly EndingId[];
}

const SHORT_ENDINGS: readonly EndingId[] = ['silent-sky', 'unquestioned', 'weighed-world'];

/** The reign grows with the amount of content written (see PRD §5). */
export const PLANS = {
  prototype: { days: 1, rootsPerDay: [5], endings: SHORT_ENDINGS },
  firstRelease: { days: 3, rootsPerDay: [5, 4, 3], endings: SHORT_ENDINGS },
  full: {
    days: 5,
    rootsPerDay: [5, 4, 4, 4, 3],
    endings: ['silent-sky', 'unquestioned', 'gentle-age', 'iron-age', 'weighed-world'],
  },
} as const satisfies Record<string, ReignPlan>;

export type PlanId = keyof typeof PLANS;

export function rootsNeeded(plan: ReignPlan): number {
  return plan.rootsPerDay.reduce((sum, n) => sum + n, 0);
}

/** The largest reign the available roots can fill. */
export function planIdFor(rootCount: number): PlanId {
  if (rootCount >= rootsNeeded(PLANS.full)) return 'full';
  if (rootCount >= rootsNeeded(PLANS.firstRelease)) return 'firstRelease';
  if (rootCount >= rootsNeeded(PLANS.prototype)) return 'prototype';
  throw new Error(`Not enough souls for a reign: ${rootCount}`);
}
