import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'aldous-brann',
  origin: 'ilse-brann',
  name: 'Aldous Brann',
  age: 93,
  death: 'Asleep at the crossroads, very old.',
  emblem: 'footprints',
  hue: 36,
  versions: {
    rise: {
      record: 'Ilse’s husband. Came home old, and kept her lamp lit after she died.',
      plea: 'I kept her lamp lit. For her.',
    },
    fall: {
      record: 'Ilse’s husband. Left her sixty years ago. Came back to find her lamp dark.',
      plea: 'I came back. Too late, but I came.',
    },
  },
  eyes: {
    deed: 'Years ago, he stood outside her window for an hour. Then he walked away.',
    heart: 'He was ashamed. Every year away made it harder to knock.',
    ripple: 'He had another wife in another town. His sons never knew about Ilse.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where she can find you.',
      verse: 'It is never too late to come home.',
      andSo: 'Runaways start coming home. Some are welcomed. Some find their places taken.',
      faith: 0,
    },
    return: {
      fate: 'Live again, and wait by a window.',
      verse: 'He was sent back to learn to wait.',
      andSo: 'Lovers make long promises and keep them. Fewer people leave town.',
      faith: 1,
    },
    fall: {
      fate: 'Walk the dark road forever.',
      verse: 'Leaving is a crime.',
      andSo: 'Young people stop leaving. The town gets crowded, noisy, and never changes.',
      faith: 1,
    },
  },
};

export default soul;
