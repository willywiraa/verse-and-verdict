/**
 * Emblem ids a soul may use. Each maps to an icon in src/ui/emblemIcons.ts,
 * which fails to type-check if one is missing.
 */
export const EMBLEM_IDS = [
  'wheat',
  'lock',
  'anchor',
  'fish',
  'horse',
  'lamp',
] as const;

export type EmblemId = (typeof EMBLEM_IDS)[number];
