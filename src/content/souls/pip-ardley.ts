import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'pip-ardley',
  name: 'Pip Ardley',
  age: 72,
  death: 'His heart, when the fish bit.',
  emblem: 'fishing-hook',
  hue: 190,
  record: 'Fished the same pond for fifty years. Never caught a thing. Until today.',
  plea: 'Did anyone see it? Please say yes.',
  eyes: {
    deed: 'Every evening he bought a fish, so his wife would think he caught it.',
    heart: 'He didn’t want fish. He wanted quiet. Home was sad since their son died.',
    ripple: 'His wife knew about the bought fish. She cooked each one like a prize.',
  },
  verdicts: {
    rise: {
      fate: 'Rest by a pond full of fish.',
      verse: 'Patience is always rewarded.',
      andSo: 'Fishermen become very patient. The fish market does very well.',
      faith: 1,
    },
    return: {
      fate: 'Live again, with better luck.',
      verse: 'Fifty years was not enough. Try again.',
      andSo: 'People learn that trying is not the same as winning.',
      faith: 0,
    },
    fall: {
      fate: 'Sit by an empty pond forever.',
      verse: 'Do not waste your time.',
      andSo: 'The quiet ponds are empty. Everyone is busy. Nobody sits and thinks.',
      faith: -1,
    },
  },
  echo: { soul: 'marta-ardley', on: ['rise', 'fall'] },
};

export default soul;
