/**
 * Emblem ids a soul may use. Each id is a Lucide icon name and maps to a
 * component in src/ui/emblemIcons.ts, which fails to type-check if one is missing.
 */
export const EMBLEM_IDS = [
  'anchor',
  'bell',
  'book',
  'bridge',
  'coins',
  'feather',
  'fish',
  'fishing-hook',
  'footprints',
  'gavel',
  'lamp',
  'lock',
  'paw-print',
  'pen',
  'sailboat',
  'scroll',
  'shirt',
  'waves',
  'wheat',
] as const;

export type EmblemId = (typeof EMBLEM_IDS)[number];
