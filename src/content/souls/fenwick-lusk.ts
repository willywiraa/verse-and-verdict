import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'fenwick-lusk',
  name: 'Fenwick Lusk',
  age: 39,
  death: 'A bad oyster, holding his best hand.',
  emblem: 'dice-5',
  hue: 355,
  record: 'Card player. Lost his house, his boat and his wife’s wedding ring at the same table, in one night.',
  plea: '“Double or nothing? No? Worth asking.”',
  eyes: {
    deed: 'He won the ring back the next night, and slipped it onto her finger while she slept.',
    heart: 'He never gambled for money. He gambled for the moment before the card turns over.',
    ripple:
      'His wife learned about the ring at his funeral, from the man who lost it back to him. She laughed until she cried.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest where every hand is a winner.',
      verse: 'The god raised the gambler. Fortune favours the bold.',
      andSo: 'Lowmere takes up cards, dice and wagers on everything, including the weather. The weather does not care.',
      faith: -1,
    },
    return: {
      sentence: 'Send him back with nothing to bet.',
      verse: 'The gambler was sent back with empty pockets.',
      andSo: 'Lowmere’s card tables lower their stakes. People still play every night, for buttons.',
      faith: 1,
    },
    fall: {
      sentence: 'Let him wait forever for the card to turn.',
      verse: 'The god cast down the gambler. Never bet what you love.',
      andSo: 'Lowmere bans gambling. It moves into cellars, where the stakes get higher and the players get meaner.',
      faith: 1,
    },
  },
  echo: { soul: 'odile-lusk', on: ['rise', 'fall'] },
};

export default soul;
