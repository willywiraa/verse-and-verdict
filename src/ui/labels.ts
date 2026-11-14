import type { Eye, Verdict } from '../game/types';

export const EYE_LABELS: Readonly<Record<Eye, string>> = { deed: 'Deed', heart: 'Heart', ripple: 'Ripple' };

export const VERDICT_LABELS: Readonly<Record<Verdict, string>> = { rise: 'Rise', return: 'Return', fall: 'Fall' };

export const TEXT_SIZES = ['112.5%', '125%', '140%'] as const;
