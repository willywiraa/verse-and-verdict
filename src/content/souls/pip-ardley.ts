import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'pip-ardley',
  name: 'Pip Ardley',
  age: 72,
  death: 'His heart, the moment the pike bit.',
  emblem: 'fishing-hook',
  hue: 190,
  record:
    'Lowmere’s most patient fisherman. Fished the same pool for fifty years and never caught a thing. Died the morning he finally did.',
  plea: '“Did anyone see it? Tell me someone saw it.”',
  eyes: {
    deed: 'Every evening he bought a fish at the market and carried it home, so his wife would think he had caught it.',
    heart: 'He never wanted the fish. He wanted the quiet, away from a house that had been loud with grief since their son died.',
    ripple: 'His wife knew about the market fish for thirty years and never said. She cooked every one like a trophy.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest by a pool where every line comes up full.',
      verse: 'The patient are rewarded, even if it takes fifty years.',
      andSo: 'Lowmere’s fishermen grow famously patient. Lowmere’s fish market does remarkably well.',
      faith: 1,
    },
    return: {
      sentence: 'Send him back to try again, with better luck.',
      verse: 'The god sent back the fisherman. Fifty years was not enough.',
      andSo: 'Lowmere decides that trying is not the same as succeeding. Its children hear this often.',
      faith: 0,
    },
    fall: {
      sentence: 'Let him sit by an empty pool forever.',
      verse: 'The god cast down the idle fisherman. Waste no more hours.',
      andSo: 'Lowmere’s quiet pools stand empty. Everyone is busier. Nobody has time to sit and think.',
      faith: -1,
    },
  },
};

export default soul;
