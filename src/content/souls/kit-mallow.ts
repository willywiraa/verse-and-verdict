import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'kit-mallow',
  name: 'Kit Mallow',
  age: 17,
  death: 'Thrown from a stolen horse.',
  emblem: 'bridge',
  hue: 14,
  record: 'Stable boy. Stole the judge’s horse. Died at the bridge.',
  plea: 'I was nearly across. Nearly free.',
  eyes: {
    deed: 'The horse was going to be killed in the morning. He loved her.',
    heart: 'Everyone said he’d turn out bad. He wanted to save one thing first.',
    ripple: 'The horse walked home and lived twelve more years. The judge rode her proudly.',
  },
  verdicts: {
    rise: {
      fate: 'Ride free, far from any judge.',
      verse: 'Take what you love.',
      andSo: 'Horses go missing everywhere. A few are saved. Most are stolen.',
      faith: -2,
    },
    return: {
      fate: 'Live again, with a horse of your own.',
      verse: 'Even a thief can start again.',
      andSo: 'Young thieves get jobs in stables. Some steal less. Some learn more.',
      faith: 0,
    },
    fall: {
      fate: 'Keep falling, forever.',
      verse: 'A thief is a thief.',
      andSo: 'Young people stop touching other people’s horses, even to help.',
      faith: 1,
    },
  },
  echo: { soul: 'wil-tanner', on: ['rise', 'fall'] },
};

export default soul;
