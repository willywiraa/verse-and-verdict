import type { EmblemId } from '../content/emblems';

export type Eye = 'deed' | 'heart' | 'ripple';
export type Verdict = 'rise' | 'return' | 'fall';
export type FaithChange = -2 | -1 | 0 | 1 | 2;
export type EndingId = 'silent-sky' | 'unquestioned' | 'gentle-age' | 'iron-age' | 'weighed-world';

export const EYES: readonly Eye[] = ['deed', 'heart', 'ripple'];
export const VERDICTS: readonly Verdict[] = ['rise', 'return', 'fall'];

/** What one verdict means for one soul. */
export interface Outcome {
  /** Shown after choosing: what happens to the soul. */
  fate: string;
  /** The line the Scribe writes, from the Record alone. */
  verse: string;
  /** What the living did with the Verse, shown in The World Below. */
  andSo: string;
  /** How the living feel about the verdict, judged from the Record alone. */
  faith: FaithChange;
}

/** What the living believe, and what the soul says for itself. */
export interface Face {
  record: string;
  plea: string;
}

interface SoulBase {
  id: string;
  name: string;
  age: number;
  death: string;
  emblem: EmblemId;
  /** 0–359, tints the wisp. */
  hue: number;
  eyes: Record<Eye, string>;
  verdicts: Record<Verdict, Outcome>;
  /** Left out by the gentler-content setting. */
  heavy?: boolean;
}

/** A soul who arrives regardless of the player's verdicts. */
export interface RootSoul extends SoulBase, Face {
  kind: 'root';
  /** The Echo this soul can summon, and the verdicts that summon it. */
  echo?: {
    soul: string;
    on: Verdict[];
    /** Arrives later the same Day instead of on a later Day. Used once, to teach Echoes. */
    sameDay?: boolean;
  };
}

/** A soul who arrives because of one of the player's Verses. */
export interface EchoSoul extends SoulBase {
  kind: 'echo';
  /** The root whose Verse summoned this soul. */
  origin: string;
  /** Record and Plea for each verdict that can summon this soul. */
  versions: Partial<Record<Verdict, Face>>;
}

export type Soul = RootSoul | EchoSoul;

export interface Content {
  souls: readonly Soul[];
  /** Root order for Day 1 of a player's first reign. The teaching Echo is inserted automatically. */
  dayOne: readonly string[];
}
