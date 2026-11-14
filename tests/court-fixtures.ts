import type { Case, CourtContent, Option } from '../src/court/types';

/** One option per scene, with a crowd change and optional building. */
export const OPTION: { [K in Option['scene']]: Extract<Option, { scene: K }> } = {
  prison: { scene: 'prison', years: 5, label: 'Prison', detail: '5 years', crowd: 2, headline: 'Off to prison', note: 'Money still missing' },
  ban: { scene: 'ban', sign: 'The Office', label: 'Ban', detail: 'for life', crowd: 0, headline: 'Banned for life' },
  seize: {
    scene: 'seize',
    items: ['home', 'car'],
    label: 'Take wealth',
    detail: 'house and car',
    crowd: 1,
    builds: { picture: 'hospital', count: 3 },
    headline: 'Wealth builds hospitals',
  },
  repay: {
    scene: 'repay',
    victims: 'family',
    label: 'Repay',
    detail: 'every family',
    crowd: 1,
    builds: { picture: 'home', count: 2 },
    headline: 'Families paid back',
  },
  service: {
    scene: 'service',
    place: 'park',
    label: 'Clean parks',
    detail: '1 year',
    crowd: -1,
    builds: { picture: 'park', count: 1 },
    headline: 'Sweeping the park',
  },
  chance: { scene: 'chance', later: 'shop', label: 'Second chance', detail: 'a warning', crowd: -2, headline: 'Let off with a warning' },
};

export function makeCase(id: string, amount: number, scenes: Option['scene'][] = ['prison', 'seize', 'service']): Case {
  return {
    id,
    kind: 'theft',
    nickname: `the ${id} thief`,
    person: { name: 'Pak Test', role: 'Shop owner', look: { skin: 1, hair: 'short', outfit: 'shirt' }, mood: 'nervous' },
    crime: 'Took the money',
    amount,
    amountLabel: 'stolen',
    worth: { picture: 'bread', count: 3, label: 'loaves' },
    hurt: [{ picture: 'family', count: 2, label: 'went hungry' }],
    evidence: [
      { picture: 'document', text: 'A signed paper.' },
      { picture: 'cash', text: 'Cash under the bed.' },
      { picture: 'clock', text: 'He did it twice.', twist: true },
    ],
    options: scenes.map((scene) => ({ ...OPTION[scene] }) as Option),
  };
}

/** A Court Day of `n` cases with amounts 1,000, 2,000, 3,000 … */
export function makeCourt(n: number, scenes?: Option['scene'][]): CourtContent {
  const cases = Array.from({ length: n }, (_, i) => makeCase(`case-${i + 1}`, (i + 1) * 1000, scenes));
  return { cases, day: cases.map((c) => c.id) };
}
