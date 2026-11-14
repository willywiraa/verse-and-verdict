import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'lio-marsh',
  name: 'Lio Marsh',
  age: 19,
  death: 'Drowned saving a dog.',
  emblem: 'dog',
  hue: 60,
  record: 'Jumped in the river to save a drowning dog. The dog lived.',
  plea: 'Is she okay? Tell me she’s okay.',
  eyes: {
    deed: 'It was his own dog. He threw the stick too close to the water.',
    heart: 'He never thought first. That was the best and worst thing about him.',
    ripple: 'His sister kept the dog for fourteen years. Nobody threw it sticks again.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where the water is warm and shallow.',
      verse: 'A brave heart is enough.',
      andSo: 'Young people jump in after anything. The river takes a few more.',
      faith: 2,
    },
    return: {
      fate: 'Live again, and learn to swim.',
      verse: 'He was sent back to grow up.',
      andSo: 'The town builds a fence by the river. Children still climb it.',
      faith: 1,
    },
    fall: {
      fate: 'Wait on the riverbank, wet and cold, forever.',
      verse: 'Think before you jump.',
      andSo: 'When a child falls in now, three people stop to think.',
      faith: -2,
    },
  },
};

export default soul;
