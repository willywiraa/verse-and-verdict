import type { CourtContent } from '../court/types';
import { hospitalMoney } from './hospital-money';

/** Every case, and the order of the Court Day. */
export const COURT: CourtContent = {
  cases: [hospitalMoney],
  day: ['hospital-money'],
};
