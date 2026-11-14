/**
 * The shape of a Court Day. Cases are plain data; the six punishment scenes
 * do all the drawing. See GDD §4.
 */

/** The six punishment scenes. Every case offers 3 or 4 of them. */
export const SCENES = ['prison', 'ban', 'seize', 'repay', 'service', 'chance'] as const;
export type SceneId = (typeof SCENES)[number];

/** How hard each punishment lands, used by the fairness scale. */
export const SEVERITY: Readonly<Record<SceneId, number>> = {
  prison: 3,
  ban: 2,
  seize: 2,
  repay: 1,
  service: 1,
  chance: 0,
};

export type JudgeTitle = 'iron' | 'fixer' | 'kind' | 'balanced';

/** Which judge title each punishment counts towards. */
export const TITLE_GROUP: Readonly<Record<SceneId, Exclude<JudgeTitle, 'balanced'>>> = {
  prison: 'iron',
  ban: 'iron',
  seize: 'fixer',
  repay: 'fixer',
  service: 'kind',
  chance: 'kind',
};

export const KINDS = ['theft', 'corruption', 'robbery', 'fraud', 'power', 'pollution'] as const;
export type Kind = (typeof KINDS)[number];

/** Small pictures used for amounts, harm, evidence and the city. Each maps to an icon. */
export const PICTURES = [
  'hospital',
  'home',
  'shop',
  'river',
  'fish',
  'bread',
  'phone',
  'family',
  'child',
  'car',
  'motorbike',
  'cash',
  'coins',
  'wallet',
  'piggy-bank',
  'gem',
  'watch',
  'school',
  'park',
  'briefcase',
  'document',
  'receipt',
  'police',
  'id-card',
  'factory',
  'worker',
  'chart',
  'crown',
  'toy',
  'clock',
  'plane',
  'handshake',
] as const;
export type Picture = (typeof PICTURES)[number];

/** A number of things, drawn as a row of pictures. */
export interface Pictures {
  picture: Picture;
  count: number;
}

export type Mood = 'smug' | 'nervous' | 'sad' | 'shocked';

/** One character rig, dressed differently for each defendant. */
export interface Look {
  /** 0 = lightest … 4 = darkest. */
  skin: 0 | 1 | 2 | 3 | 4;
  hair: 'bald' | 'short' | 'parted' | 'curly' | 'bun' | 'long';
  outfit: 'suit' | 'uniform' | 'shirt' | 'apron' | 'hoodie' | 'dress' | 'boss';
  extras?: ('glasses' | 'watch' | 'moustache' | 'pearls' | 'cap')[];
}

export interface Person {
  name: string;
  role: string;
  look: Look;
  /** The face they arrive with. */
  mood: Mood;
}

export interface Evidence {
  picture: Picture;
  /** At most 8 words. */
  text: string;
  /** A fact that changes the picture. At most one per case. */
  twist?: boolean;
}

export type Crowd = -2 | -1 | 0 | 1 | 2;

interface OptionBase {
  /** On the card. At most 2 words. */
  label: string;
  /** Under the label. At most 3 words. */
  detail: string;
  /** How the crowd reacts, from −2 to +2. Hidden until after the gavel. */
  crowd: Crowd;
  /** What the verdict builds or repairs in the city. Hidden until after the gavel. */
  builds?: Pictures;
  /** The newspaper headline. At most 7 words. */
  headline: string;
  /** A caption at the end of the scene, usually the surprise. At most 4 words. */
  note?: string;
}

/** What each scene needs to know to fill itself in. */
export type Punishment =
  | { scene: 'prison'; years: number }
  | { scene: 'ban'; sign: string }
  | { scene: 'seize'; items: Picture[] }
  | { scene: 'repay'; victims: Picture }
  | { scene: 'service'; place: Picture }
  | { scene: 'chance'; later: Picture };

export type Option = OptionBase & Punishment;

export interface Case {
  id: string;
  kind: Kind;
  /** How the Day Report refers to them, such as "the bread thief". At most 3 words. */
  nickname: string;
  person: Person;
  /** At most 5 words. */
  crime: string;
  /** In Rupiah. */
  amount: number;
  /** What happened to the money, such as "stolen" or "saved". At most 2 words. */
  amountLabel: string;
  /** The amount turned into things people understand: "= 5 hospitals". */
  worth: Pictures & { label: string };
  /** Who got hurt: 1 or 2 rows of pictures. */
  hurt: (Pictures & { label: string })[];
  /** Exactly 3 tags the player can flip. */
  evidence: Evidence[];
  /** 3 or 4 punishments, each a different scene. */
  options: Option[];
}

export interface CourtContent {
  cases: Case[];
  /** The case ids of a Court Day, in order. */
  day: string[];
}
