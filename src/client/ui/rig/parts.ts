/**
 * The character rig's parts, as data. Coordinates are in the rig's own
 * 120 × 190 space: the head is centred at (60, 52), the hips are at y 143
 * and the feet rest at y 186.
 */
import type { Look, Mood, Outfit } from '@shared/court/types';

export const SKIN = ['#f6d7b8', '#e9be94', '#d19a6a', '#a86e45', '#7a4b2e'] as const;

export const HAIR_COLORS: Readonly<Record<NonNullable<Look['hairColor']>, string>> = {
  black: '#2b2522',
  brown: '#5c3b25',
  grey: '#8f8a86',
  white: '#e2ded8',
  auburn: '#7d3b21',
};

/** Head shapes. `hw` is half the width; `top` is the top of the head, used to fit the hair. */
export const HEADS: Readonly<Record<NonNullable<Look['face']>, { hw: number; top: number; chin: number }>> = {
  round: { hw: 32, top: 20, chin: 84 },
  oval: { hw: 28.5, top: 17, chin: 85 },
  square: { hw: 30, top: 18, chin: 84 },
  wide: { hw: 34.5, top: 24, chin: 84 },
};

/** Body shapes: the torso outline, where the arms and legs attach. */
export const BUILDS: Readonly<
  Record<NonNullable<Look['build']>, { torso: string; shoulder: number; shoulderY: number; hip: number }>
> = {
  slim: {
    torso: 'M45 89 Q60 85 75 89 Q80 93 79 104 L78 146 Q60 150 42 146 L41 104 Q40 93 45 89 Z',
    shoulder: 43,
    shoulderY: 97,
    hip: 51,
  },
  average: {
    torso: 'M42 89 Q60 84 78 89 Q84 93 83 104 L82 146 Q60 151 38 146 L37 104 Q36 93 42 89 Z',
    shoulder: 40,
    shoulderY: 97,
    hip: 50,
  },
  broad: {
    torso: 'M38 90 Q60 83 82 90 Q90 95 88 106 L85 146 Q60 152 35 146 L32 106 Q30 95 38 90 Z',
    shoulder: 36,
    shoulderY: 98,
    hip: 49,
  },
  round: {
    torso: 'M43 89 Q60 84 77 89 Q93 104 91 126 Q89 148 60 150 Q31 148 29 126 Q27 104 43 89 Z',
    shoulder: 40,
    shoulderY: 97,
    hip: 50,
  },
};

export interface OutfitStyle {
  top: string;
  /** Sleeve colour; short sleeves leave the forearm bare. */
  sleeve: string;
  sleeves: 'long' | 'short' | 'none';
  legs: 'pants' | 'shorts' | 'skirt' | 'bare';
  pants: string;
  shoes: string;
  /** No shoes: socks only. */
  socks?: boolean;
}

const OUTFIT_STYLES: Readonly<Record<Outfit, OutfitStyle>> = {
  suit: { top: '#2e3b55', sleeve: '#2e3b55', sleeves: 'long', legs: 'pants', pants: '#2e3b55', shoes: '#1f1a17' },
  blazer: { top: '#3f8f8b', sleeve: '#3f8f8b', sleeves: 'long', legs: 'pants', pants: '#4a5570', shoes: '#3a2a2a' },
  uniform: { top: '#8c6a3e', sleeve: '#8c6a3e', sleeves: 'short', legs: 'pants', pants: '#6f5532', shoes: '#1f1a17' },
  shirt: { top: '#4fa3a8', sleeve: '#4fa3a8', sleeves: 'long', legs: 'pants', pants: '#b59a6a', shoes: '#6b4a2f' },
  tee: { top: '#e3b341', sleeve: '#e3b341', sleeves: 'short', legs: 'pants', pants: '#3f5f8f', shoes: '#f4f1ea' },
  blouse: { top: '#c2407a', sleeve: '#c2407a', sleeves: 'short', legs: 'skirt', pants: '#4a5570', shoes: '#3a2a2a' },
  apron: { top: '#c9d6df', sleeve: '#c9d6df', sleeves: 'long', legs: 'pants', pants: '#4a5570', shoes: '#3a2a2a' },
  hoodie: { top: '#7d8597', sleeve: '#7d8597', sleeves: 'long', legs: 'pants', pants: '#3f5f8f', shoes: '#f4f1ea' },
  boss: { top: '#6b4a2f', sleeve: '#6b4a2f', sleeves: 'long', legs: 'pants', pants: '#3b2a1d', shoes: '#1f1a17' },
  scrubs: { top: '#5bb5a2', sleeve: '#5bb5a2', sleeves: 'short', legs: 'pants', pants: '#5bb5a2', shoes: '#f4f1ea' },
  gown: { top: '#cfe3f2', sleeve: '#cfe3f2', sleeves: 'short', legs: 'bare', pants: '#cfe3f2', shoes: '#cfe3f2' },
  overalls: { top: '#f4f1ea', sleeve: '#f4f1ea', sleeves: 'short', legs: 'pants', pants: '#6f8fb3', shoes: '#3a3a3a' },
  prison: { top: '#f08a24', sleeve: '#f08a24', sleeves: 'short', legs: 'pants', pants: '#f08a24', shoes: '#f4f1ea' },
  singlet: { top: '#f4f1ea', sleeve: '#f4f1ea', sleeves: 'none', legs: 'shorts', pants: '#9ec5e8', shoes: '#ffffff', socks: true },
  vest: { top: '#9aa5b1', sleeve: '#9aa5b1', sleeves: 'long', legs: 'pants', pants: '#3f5f8f', shoes: '#3a2a2a' },
};

/** Outfits whose main colour can be changed with `look.color`. */
const COLOURED: ReadonlySet<Outfit> = new Set(['shirt', 'tee', 'blouse', 'hoodie', 'vest', 'blazer']);

export function outfitStyle(outfit: Outfit, color?: string): OutfitStyle {
  const style = OUTFIT_STYLES[outfit];
  return color && COLOURED.has(outfit) ? { ...style, top: color, sleeve: color } : style;
}

/* Faces ------------------------------------------------------------------ */

export type Brows = 'flat' | 'raised' | 'smug' | 'worried' | 'angry' | 'high' | 'soft';
export type Eyes = 'open' | 'half' | 'droop' | 'wide' | 'happy';
export type Mouth = 'flat' | 'smile' | 'grin' | 'smirk' | 'wavy' | 'frown' | 'o' | 'pout' | 'tight';

export interface Face {
  brows: Brows;
  eyes: Eyes;
  mouth: Mouth;
  /** Small pupils read as fear or surprise. */
  small?: boolean;
  sweat?: boolean;
  tear?: boolean;
  blush?: boolean;
}

/** Each mood as a set of face parts. */
export const EXPRESSIONS: Readonly<Record<Mood, Face>> = {
  neutral: { brows: 'flat', eyes: 'open', mouth: 'flat' },
  smug: { brows: 'smug', eyes: 'half', mouth: 'smirk' },
  nervous: { brows: 'worried', eyes: 'open', mouth: 'wavy', small: true, sweat: true },
  worried: { brows: 'worried', eyes: 'open', mouth: 'tight' },
  shocked: { brows: 'high', eyes: 'wide', mouth: 'o', small: true },
  sad: { brows: 'worried', eyes: 'droop', mouth: 'frown', tear: true },
  relieved: { brows: 'soft', eyes: 'happy', mouth: 'smile', blush: true },
  grumpy: { brows: 'angry', eyes: 'half', mouth: 'pout' },
  happy: { brows: 'raised', eyes: 'open', mouth: 'grin', blush: true },
};

/* Arms ------------------------------------------------------------------- */

/**
 * Arm angles in degrees: [upper arm, forearm], measured from hanging straight
 * down, positive outwards. The right arm is drawn mirrored, so the same
 * numbers make a mirrored pose.
 */
export const POSES = {
  rest: { l: [10, 0], r: [10, 0] },
  hips: { l: [50, -83], r: [50, -83] },
  up: { l: [165, 5], r: [165, 5] },
  reach: { l: [-70, -10], r: [100, -10] },
  bars: { l: [140, 35], r: [140, 35] },
  carry: { l: [15, -40], r: [15, -40] },
  mop: { l: [-40, -50], r: [15, -40] },
  wipe: { l: [10, 0], r: [125, 80] },
  point: { l: [10, 0], r: [110, -15] },
  relax: { l: [150, 60], r: [150, 60] },
  wave: { l: [10, 0], r: [150, -20] },
  thumbs: { l: [10, 0], r: [20, -110] },
  clipboard: { l: [15, -85], r: [10, 0] },
} as const satisfies Record<string, { l: readonly [number, number]; r: readonly [number, number] }>;

export type Pose = keyof typeof POSES;

/** What a character can hold. The mop and the thumb are in the right hand; the rest are held in front. */
export type Holding = 'none' | 'mop' | 'box' | 'cashbag' | 'clipboard';

/** Absolute angle of the mop handle, in the right arm's mirrored space: slightly out from the body. */
export const MOP_TILT = 11.5;

/* Movement --------------------------------------------------------------- */

export type Gait = 'stand' | 'walk' | 'run';
export type Facing = 'front' | 'left' | 'right';
export interface Gaze {
  /** −1 (their right, our left) … 1. */
  x: number;
  /** −1 (up) … 1 (down). */
  y: number;
}

/** Short, one-off reactions, played with the Web Animations API. */
export type TakeName = 'jolt' | 'gulp' | 'shiver' | 'sigh' | 'nod' | 'hop';
export interface Take {
  name: TakeName;
  /** Change this to play the same reaction again. */
  id: number;
}

export const TAKES: Readonly<
  Record<TakeName, { part: 'root' | 'body' | 'head'; duration: number; keyframes: Keyframe[] }>
> = {
  jolt: {
    part: 'root',
    duration: 460,
    keyframes: [
      { transform: 'translateY(0) scale(1, 1)' },
      { transform: 'translateY(-9px) scale(0.96, 1.05)', offset: 0.3 },
      { transform: 'translateY(0) scale(1.04, 0.96)', offset: 0.65 },
      { transform: 'translateY(0) scale(1, 1)' },
    ],
  },
  gulp: {
    part: 'head',
    duration: 560,
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(3px)', offset: 0.35 },
      { transform: 'translateY(-1px)', offset: 0.7 },
      { transform: 'translateY(0)' },
    ],
  },
  shiver: {
    part: 'root',
    duration: 440,
    keyframes: [0, -1.5, 1.5, -1.2, 1.2, -0.6, 0].map((x) => ({ transform: `translateX(${x}px)` })),
  },
  sigh: {
    part: 'body',
    duration: 1100,
    keyframes: [
      { transform: 'translateY(0) scaleY(1)' },
      { transform: 'translateY(-2px) scaleY(1.03)', offset: 0.35 },
      { transform: 'translateY(2.5px) scaleY(0.97)', offset: 0.75 },
      { transform: 'translateY(0) scaleY(1)' },
    ],
  },
  nod: {
    part: 'head',
    duration: 620,
    keyframes: [
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: 'translateY(3px) rotate(2deg)', offset: 0.3 },
      { transform: 'translateY(0) rotate(0deg)', offset: 0.55 },
      { transform: 'translateY(2px) rotate(1deg)', offset: 0.78 },
      { transform: 'translateY(0) rotate(0deg)' },
    ],
  },
  hop: {
    part: 'root',
    duration: 520,
    keyframes: [
      { transform: 'translateY(0) scale(1, 1)' },
      { transform: 'translateY(0) scale(1.05, 0.95)', offset: 0.15 },
      { transform: 'translateY(-12px) scale(0.97, 1.04)', offset: 0.45 },
      { transform: 'translateY(0) scale(1.04, 0.96)', offset: 0.8 },
      { transform: 'translateY(0) scale(1, 1)' },
    ],
  },
};

/** The small habit a character shows while waiting, if any. */
export function fidgetFor(look: Look): 'watch' | null {
  return look.extras?.includes('watch') ? 'watch' : null;
}
