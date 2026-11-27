import { DAY_SIZE } from '../court/court';
import { KINDS, PICTURES, SCENES, type Case, type CourtContent, type Option } from '../court/types';

/** GDD §5: everything a player reads is short. */
export const WORD_LIMITS = {
  nameAndRole: 6,
  crime: 5,
  nickname: 3,
  amountLabel: 2,
  worthLabel: 2,
  hurt: 3,
  evidence: 8,
  label: 2,
  detail: 3,
  headline: 7,
  note: 4,
  sign: 3,
} as const;

/**
 * Legal and other words that are hard for players still learning English.
 * Using one is a warning, not an error: pick a simpler word.
 */
export const HARD_WORDS: ReadonlySet<string> = new Set([
  'acquittal',
  'acquitted',
  'affidavit',
  'confiscate',
  'confiscated',
  'confiscation',
  'defendant',
  'effluent',
  'embezzle',
  'embezzled',
  'embezzlement',
  'extortion',
  'fraudulent',
  'incarcerated',
  'incarceration',
  'larceny',
  'litigation',
  'magistrate',
  'misappropriated',
  'penitentiary',
  'perpetrator',
  'plaintiff',
  'probation',
  'racketeering',
  'restitution',
  'tribunal',
]);

export interface ContentReport {
  errors: string[];
  warnings: string[];
}

export function wordCount(text: string): number {
  return text.replace(/["“”]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

/** The hard words used in a piece of text, lower-cased, without possessives. */
export function hardWordsIn(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/['’]s\b/g, '')
    .split(/[^a-z]+/)
    .filter((word) => HARD_WORDS.has(word));
}

const PICTURE_SET: ReadonlySet<string> = new Set(PICTURES);

export function validateCourt(content: CourtContent): ContentReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();
  for (const c of content.cases) {
    if (ids.has(c.id)) errors.push(`${c.id}: duplicate id`);
    ids.add(c.id);
    checkCase(c, errors, warnings);
  }

  if (content.day.length === 0) errors.push('The Court Day lists no cases');
  if (content.day.length > DAY_SIZE) errors.push(`The Court Day lists ${content.day.length} cases (most ${DAY_SIZE})`);
  if (new Set(content.day).size !== content.day.length) errors.push('The Court Day lists a case twice');
  for (const id of content.day) {
    if (!ids.has(id)) errors.push(`The Court Day lists ${id}, which does not exist`);
  }
  return { errors, warnings };
}

function checkCase(c: Case, errors: string[], warnings: string[]): void {
  const id = c.id;
  const text = (field: string, value: string | undefined, max: number) => {
    if (!value?.trim()) {
      errors.push(`${id}: ${field} is empty`);
      return;
    }
    if (wordCount(value) > max) errors.push(`${id}: ${field} has ${wordCount(value)} words (limit ${max})`);
    for (const word of hardWordsIn(value)) warnings.push(`${id}: ${field} uses the hard word “${word}”`);
  };
  const picture = (field: string, value: string) => {
    if (!PICTURE_SET.has(value)) errors.push(`${id}: ${field} uses the unknown picture ${value}`);
  };
  const count = (field: string, value: number, min: number, max: number) => {
    if (!Number.isInteger(value) || value < min || value > max) errors.push(`${id}: ${field} must be ${min}–${max}`);
  };

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) errors.push(`${id}: id must be lowercase words joined by hyphens`);
  if (!(KINDS as readonly string[]).includes(c.kind)) errors.push(`${id}: unknown kind ${c.kind}`);
  text('nickname', c.nickname, WORD_LIMITS.nickname);
  text('name', c.person.name, WORD_LIMITS.nameAndRole);
  text('role', c.person.role, WORD_LIMITS.nameAndRole);
  if (wordCount(c.person.name) + wordCount(c.person.role) > WORD_LIMITS.nameAndRole) {
    errors.push(`${id}: name and role together are over ${WORD_LIMITS.nameAndRole} words`);
  }
  text('crime', c.crime, WORD_LIMITS.crime);
  if (!Number.isInteger(c.amount) || c.amount <= 0) errors.push(`${id}: amount must be a whole number of Rupiah above 0`);
  text('amount label', c.amountLabel, WORD_LIMITS.amountLabel);

  picture('worth', c.worth.picture);
  count('worth count', c.worth.count, 1, 8);
  text('worth label', c.worth.label, WORD_LIMITS.worthLabel);

  if (c.hurt.length < 1 || c.hurt.length > 2) errors.push(`${id}: needs 1 or 2 rows of hurt`);
  c.hurt.forEach((h, i) => {
    picture(`hurt ${i + 1}`, h.picture);
    count(`hurt ${i + 1} count`, h.count, 1, 8);
    text(`hurt ${i + 1} label`, h.label, WORD_LIMITS.hurt);
  });

  if (c.evidence.length !== 3) errors.push(`${id}: needs exactly 3 pieces of evidence`);
  c.evidence.forEach((e, i) => {
    picture(`evidence ${i + 1}`, e.picture);
    text(`evidence ${i + 1}`, e.text, WORD_LIMITS.evidence);
  });
  if (c.evidence.filter((e) => e.twist).length > 1) errors.push(`${id}: at most one piece of evidence can be a twist`);

  checkOptions(c, text, picture, count, errors);
}

function checkOptions(
  c: Case,
  text: (field: string, value: string | undefined, max: number) => void,
  picture: (field: string, value: string) => void,
  count: (field: string, value: number, min: number, max: number) => void,
  errors: string[],
): void {
  const id = c.id;
  const options = c.options;
  if (options.length < 3 || options.length > 4) errors.push(`${id}: needs 3 or 4 punishments`);
  if (new Set(options.map((o) => o.scene)).size !== options.length) errors.push(`${id}: each punishment must use a different scene`);
  if (new Set(options.map((o) => o.headline)).size !== options.length) errors.push(`${id}: headlines must differ`);

  options.forEach((o, i) => {
    const at = `option ${i + 1} (${o.scene})`;
    if (!(SCENES as readonly string[]).includes(o.scene)) errors.push(`${id}: ${at} uses an unknown scene`);
    text(`${at} label`, o.label, WORD_LIMITS.label);
    text(`${at} detail`, o.detail, WORD_LIMITS.detail);
    text(`${at} headline`, o.headline, WORD_LIMITS.headline);
    if (o.note !== undefined) text(`${at} note`, o.note, WORD_LIMITS.note);
    if (![-2, -1, 0, 1, 2].includes(o.crowd)) errors.push(`${id}: ${at} crowd must be −2 to +2`);
    if (o.builds) {
      picture(`${at} builds`, o.builds.picture);
      count(`${at} builds count`, o.builds.count, 1, 6);
    }
    switch (o.scene) {
      case 'prison':
        count(`${at} years`, o.years, 1, 50);
        break;
      case 'ban':
        text(`${at} sign`, o.sign, WORD_LIMITS.sign);
        break;
      case 'seize':
        if (o.items.length < 1 || o.items.length > 4) errors.push(`${id}: ${at} must take 1 to 4 things`);
        o.items.forEach((item) => picture(`${at} items`, item));
        break;
      case 'repay':
        picture(`${at} victims`, o.victims);
        break;
      case 'service':
        picture(`${at} place`, o.place);
        break;
      case 'chance':
        picture(`${at} later`, o.later);
        break;
    }
  });

  // Every option must be defensible: the crowd must split, and no option may beat all the others.
  const crowds = options.map((o) => o.crowd);
  if (!crowds.some((v) => v >= 1) || !crowds.some((v) => v <= 0)) {
    errors.push(`${id}: needs at least one punishment the crowd likes (+1 or more) and one it doesn't (0 or less)`);
  }
  const best = options.find((o) => options.every((other) => other === o || dominates(o, other)));
  if (best && options.length > 1) errors.push(`${id}: “${best.label}” is best on every count, so the choice is too easy`);
  if (!options.some((o) => o.note)) errors.push(`${id}: at least one punishment needs a surprise note`);
}

function built(o: Option): number {
  return o.builds?.count ?? 0;
}

/** True if `a` is at least as good as `b` for both the crowd and the city, and better on one. */
function dominates(a: Option, b: Option): boolean {
  return a.crowd >= b.crowd && built(a) >= built(b) && (a.crowd > b.crowd || built(a) > built(b));
}
