import type { Eye, Verdict } from '../game/types';

export const EYE_LABELS: Readonly<Record<Eye, string>> = { deed: 'Deed', heart: 'Heart', ripple: 'Ripple' };

/** A few plain words under each Eye, so new players know what it shows. */
export const EYE_HINTS: Readonly<Record<Eye, string>> = { deed: 'what they did', heart: 'why', ripple: 'what it caused' };

export const VERDICT_LABELS: Readonly<Record<Verdict, string>> = { rise: 'Rise', return: 'Return', fall: 'Fall' };

/** Plain meaning shown on each verdict button. */
export const VERDICT_MEANINGS: Readonly<Record<Verdict, string>> = { rise: 'reward', return: 'new life', fall: 'punish' };

/** closed: can be opened · open: the Eye you chose · locked: not chosen · missed: shown after the verdict. */
export type CardState = 'closed' | 'open' | 'locked' | 'missed';

export const TEXT_SIZES = ['112.5%', '125%', '140%'] as const;
