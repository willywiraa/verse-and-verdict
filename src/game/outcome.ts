import { PLANS, RETURNS_PER_DAY } from './config';
import { versesOf, type HistoryEntry, type ReignState } from './reign';
import type { Content, EndingId, Eye, Verdict } from './types';

export interface Tally {
  total: number;
  verdicts: Record<Verdict, number>;
  eyes: Record<Eye, number>;
}

export function tally(history: readonly HistoryEntry[]): Tally {
  const t: Tally = {
    total: history.length,
    verdicts: { rise: 0, return: 0, fall: 0 },
    eyes: { deed: 0, heart: 0, ripple: 0 },
  };
  for (const h of history) {
    t.verdicts[h.verdict]++;
    t.eyes[h.eye]++;
  }
  return t;
}

/** At least `percent` of the total, using integers only. */
function atLeast(count: number, total: number, percent: number): boolean {
  return total > 0 && count * 100 >= percent * total;
}

function leaning(t: Tally): 'gentle' | 'stern' | null {
  const { rise, fall } = t.verdicts;
  if (atLeast(rise, t.total, 45) && rise > fall) return 'gentle';
  if (atLeast(fall, t.total, 45) && fall > rise) return 'stern';
  return null;
}

/** GDD §3.8: checked in order; endings not in the plan are skipped. */
export function pickEnding(state: ReignState): EndingId {
  const available: readonly EndingId[] = PLANS[state.plan].endings;
  const lean = leaning(tally(state.history));
  const candidates: [EndingId, boolean][] = [
    ['silent-sky', state.faith <= 2],
    ['unquestioned', state.faith >= 9],
    ['gentle-age', lean === 'gentle'],
    ['iron-age', lean === 'stern'],
  ];
  for (const [id, applies] of candidates) {
    if (applies && available.includes(id)) return id;
  }
  return 'weighed-world';
}

/** The Verse the living loved most and the one they hated most. Ties go to the earlier Verse. */
export function quotedVerses(state: ReignState, content: Content): { loved: string; hated: string } {
  const entries = versesOf(state, content).map((v, order) => ({ ...v, order }));
  if (entries.length === 0) return { loved: '', hated: '' };
  const loved = entries.reduce((best, e) => (e.faith > best.faith ? e : best));
  const others = entries.length > 1 ? entries.filter((e) => e.order !== loved.order) : entries;
  const hated = others.reduce((worst, e) => (e.faith < worst.faith ? e : worst));
  return { loved: loved.verse, hated: hated.verse };
}

export type Adjective = 'Gentle' | 'Stern' | 'Patient' | 'Even';
export type Noun = 'Keeper of Deeds' | 'Weigher of Hearts' | 'Reader of Ripples' | 'Wanderer of Eyes';

const NOUNS: Record<Eye, Noun> = {
  deed: 'Keeper of Deeds',
  heart: 'Weigher of Hearts',
  ripple: 'Reader of Ripples',
};

export function temperament(state: ReignState): { adjective: Adjective; noun: Noun; title: string } {
  const t = tally(state.history);
  const lean = leaning(t);
  const availableReturns = RETURNS_PER_DAY * PLANS[state.plan].days;
  const adjective: Adjective =
    lean === 'gentle'
      ? 'Gentle'
      : lean === 'stern'
        ? 'Stern'
        : atLeast(t.verdicts.return, availableReturns, 80)
          ? 'Patient'
          : 'Even';

  const ranked = (Object.entries(t.eyes) as [Eye, number][]).sort((a, b) => b[1] - a[1]);
  const [top, second] = ranked;
  const noun: Noun =
    atLeast(top[1], t.total, 40) && top[1] > second[1] ? NOUNS[top[0]] : 'Wanderer of Eyes';

  return { adjective, noun, title: `The ${adjective} ${noun}` };
}
