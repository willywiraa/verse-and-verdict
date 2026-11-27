import type { Case, CourtContent } from '../court/types';
import { breadThief } from './bread-thief';
import { bribeBadge } from './bribe-badge';
import { freeRice } from './free-rice';
import { goldenPromise } from './golden-promise';
import { hospitalMoney } from './hospital-money';
import { mangoTree } from './mango-tree';
import { phoneShop } from './phone-shop';
import { prizeScam } from './prize-scam';
import { riverPoison } from './river-poison';
import { schoolRoof } from './school-roof';

/** Every case in the pool. Each day's docket draws three of them. */
export const CASES: readonly Case[] = [
  breadThief,
  hospitalMoney,
  phoneShop,
  goldenPromise,
  bribeBadge,
  riverPoison,
  schoolRoof,
  freeRice,
  prizeScam,
  mangoTree,
];

export const CASE_IDS: readonly string[] = CASES.map((c) => c.id);

/** The court for one docket: all cases, in the docket's order. */
export function courtFor(docket: readonly string[]): CourtContent {
  return { cases: [...CASES], day: [...docket] };
}
