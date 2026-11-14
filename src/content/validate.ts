import { PLANS, planIdFor, rootsNeeded } from '../game/config';
import { beginNextDay, canGive, giveVerdict, newReign, nextSoul, openEye } from '../game/reign';
import { createRng } from '../game/rng';
import { EYES, VERDICTS, type Content, type EchoSoul, type Face, type RootSoul, type Soul } from '../game/types';
import { EMBLEM_IDS } from './emblems';

/** GDD §5.1: short, plain lines. */
export const WORD_LIMITS = {
  death: 6,
  record: 14,
  plea: 8,
  eye: 14,
  fate: 8,
  verse: 8,
  andSo: 12,
  /** Death, Record, Plea and the longest Eye: everything read before a verdict. */
  beforeVerdict: 45,
} as const;

/**
 * Words that are hard for players who are not native English speakers.
 * Using one is a warning, not an error: pick a simpler word.
 */
export const HARD_WORDS: ReadonlySet<string> = new Set([
  'bailiff',
  'bewildering',
  'broadsheet',
  'confiscated',
  'declarations',
  'delta',
  'deserter',
  'dike',
  'favours',
  'fishmonger',
  'floodplain',
  'granary',
  'grimly',
  'hamlet',
  'inquest',
  'knacker',
  'lad',
  'ledger',
  'magistrate',
  'mare',
  'miller',
  'quarrelsome',
  'riddance',
  'saffron',
  'sluice',
  'solemnity',
  'squall',
  'stallion',
  'tannery',
  'tinker',
  'tribunal',
  'untaxed',
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

export function validateContent(content: Content): ContentReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const byId = new Map<string, Soul>();
  for (const soul of content.souls) {
    if (byId.has(soul.id)) errors.push(`${soul.id}: duplicate id`);
    byId.set(soul.id, soul);
  }

  for (const soul of content.souls) checkSoul(soul, byId, errors, warnings);

  const roots = content.souls.filter((s): s is RootSoul => s.kind === 'root');
  const echoes = content.souls.filter((s): s is EchoSoul => s.kind === 'echo');
  const summonedBy = new Map<string, string>();
  for (const root of roots) {
    if (!root.echo) continue;
    const echo = byId.get(root.echo.soul);
    if (!echo) {
      errors.push(`${root.id}: Echo ${root.echo.soul} does not exist`);
      continue;
    }
    if (echo.kind !== 'echo') {
      errors.push(`${root.id}: ${echo.id} is not an Echo`);
      continue;
    }
    if (echo.origin !== root.id) errors.push(`${echo.id}: origin should be ${root.id}`);
    if (root.echo.on.length === 0) errors.push(`${root.id}: no verdict summons its Echo`);
    for (const verdict of root.echo.on) {
      if (!echo.versions[verdict]) errors.push(`${echo.id}: no Record and Plea for ${verdict}`);
    }
    const other = summonedBy.get(echo.id);
    if (other) errors.push(`${echo.id}: summoned by both ${other} and ${root.id}`);
    summonedBy.set(echo.id, root.id);
  }
  for (const echo of echoes) {
    if (!summonedBy.has(echo.id)) errors.push(`${echo.id}: no root summons this Echo`);
  }

  checkDayOne(content, byId, roots, errors);

  const tiers = Object.values(PLANS).map(rootsNeeded);
  if (roots.length < tiers[0]) {
    errors.push(`${roots.length} root souls; a reign needs at least ${tiers[0]}`);
  } else {
    const needed = rootsNeeded(PLANS[planIdFor(roots.length)]);
    if (!tiers.includes(roots.length)) {
      warnings.push(`${roots.length} root souls is between tiers; each reign uses ${needed} of them`);
    }
    const gentle = roots.filter((r) => !r.heavy).length;
    if (gentle < needed) warnings.push(`Without heavy souls only ${gentle} roots remain, so gentle reigns are shorter`);
  }

  if (errors.length === 0) warnings.push(...simulate(content));
  return { errors, warnings };
}

function checkSoul(soul: Soul, byId: Map<string, Soul>, errors: string[], warnings: string[]): void {
  const id = soul.id;
  const check = (field: string, text: string, max: number) => {
    if (!text?.trim()) {
      errors.push(`${id}: ${field} is empty`);
      return;
    }
    if (wordCount(text) > max) errors.push(`${id}: ${field} has ${wordCount(text)} words (limit ${max})`);
    for (const word of hardWordsIn(text)) warnings.push(`${id}: ${field} uses the hard word “${word}”`);
  };

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) errors.push(`${id}: id must be lowercase words joined by hyphens`);
  if (!soul.name?.trim()) errors.push(`${id}: name is empty`);
  if (!Number.isInteger(soul.age) || soul.age < 0 || soul.age > 120) errors.push(`${id}: age ${soul.age} is out of range`);
  if (!Number.isInteger(soul.hue) || soul.hue < 0 || soul.hue > 359) errors.push(`${id}: hue ${soul.hue} must be 0–359`);
  if (!(EMBLEM_IDS as readonly string[]).includes(soul.emblem)) errors.push(`${id}: unknown emblem ${soul.emblem}`);

  check('death', soul.death, WORD_LIMITS.death);
  for (const eye of EYES) check(`${eye} Eye`, soul.eyes[eye], WORD_LIMITS.eye);
  for (const verdict of VERDICTS) {
    const o = soul.verdicts[verdict];
    check(`${verdict} fate`, o.fate, WORD_LIMITS.fate);
    check(`${verdict} Verse`, o.verse, WORD_LIMITS.verse);
    check(`${verdict} “And so”`, o.andSo, WORD_LIMITS.andSo);
    if (![-2, -1, 0, 1, 2].includes(o.faith)) errors.push(`${id}: ${verdict} Faith change must be −2 to +2`);
  }
  if (new Set(VERDICTS.map((v) => soul.verdicts[v].fate)).size < 3) errors.push(`${id}: fate lines must differ`);
  if (new Set(VERDICTS.map((v) => soul.verdicts[v].verse)).size < 3) errors.push(`${id}: Verses must differ`);

  let faces: Face[];
  if (soul.kind === 'root') {
    faces = [{ record: soul.record, plea: soul.plea }];
  } else {
    faces = Object.values(soul.versions).filter((f): f is Face => f !== undefined);
    if (faces.length === 0) errors.push(`${id}: an Echo needs at least one Record and Plea`);
    const origin = byId.get(soul.origin);
    if (!origin || origin.kind !== 'root') errors.push(`${id}: origin ${soul.origin} is not a root soul`);
  }

  const longestEye = Math.max(...EYES.map((e) => wordCount(soul.eyes[e] ?? '')));
  for (const face of faces) {
    check('Record', face.record, WORD_LIMITS.record);
    check('Plea', face.plea, WORD_LIMITS.plea);
    const total = wordCount(soul.death) + wordCount(face.record) + wordCount(face.plea) + longestEye;
    if (total > WORD_LIMITS.beforeVerdict) {
      errors.push(`${id}: ${total} words before the verdict (limit ${WORD_LIMITS.beforeVerdict})`);
    }
  }
}

function checkDayOne(content: Content, byId: Map<string, Soul>, roots: RootSoul[], errors: string[]): void {
  const expected = PLANS.prototype.rootsPerDay[0];
  if (content.dayOne.length !== expected) errors.push(`Day 1 must list ${expected} root souls`);
  if (new Set(content.dayOne).size !== content.dayOne.length) errors.push('Day 1 lists a soul twice');
  for (const id of content.dayOne) {
    if (byId.get(id)?.kind !== 'root') errors.push(`Day 1: ${id} is not a root soul`);
  }
  const first = byId.get(content.dayOne[0] ?? '');
  if (!first || first.kind !== 'root' || !first.echo?.sameDay || first.echo.on.length !== VERDICTS.length) {
    errors.push('Day 1: the first soul must summon its Echo the same Day on all three verdicts');
  }
  for (const root of roots) {
    if (root.echo?.sameDay && root.id !== content.dayOne[0]) errors.push(`${root.id}: only the first Day 1 soul may use sameDay`);
  }
}

/** Play random reigns and warn if Days often come up short (GDD §9.6). */
function simulate(content: Content, reigns = 1000): string[] {
  let days = 0;
  let short = 0;
  for (let seed = 1; seed <= reigns; seed++) {
    const next = createRng(seed * 7919);
    let state = newReign(content, { seed, firstReign: seed % 4 === 0 });
    while (state.phase !== 'ended') {
      if (state.phase === 'dayEnd') {
        days++;
        if (state.docket.length < 5) short++;
        state = beginNextDay(state);
        continue;
      }
      state = openEye(state, EYES[next() % EYES.length]);
      let verdict = VERDICTS[next() % VERDICTS.length];
      if (!canGive(state, verdict)) verdict = 'rise';
      state = nextSoul(giveVerdict(state, content, verdict));
    }
  }
  return short * 10 > days ? [`${short} of ${days} simulated Days had fewer than 5 souls`] : [];
}
