import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'lio-marsh',
  name: 'Lio Marsh',
  age: 19,
  death: 'Drowned in the mill race, saving a dog.',
  emblem: 'dog',
  hue: 60,
  record: 'Jumped into the mill race to pull out a drowning dog. The dog lived. Lowmere called him a fool, fondly.',
  plea: '“Is she all right? Tell me she’s all right.”',
  eyes: {
    deed: 'It was his own dog. He had thrown the stick, too near the race, because she loved to chase it.',
    heart: 'He did not think. He never thought first, which was the best and worst thing about him.',
    ripple: 'His sister kept the dog for fourteen years. She never let anyone throw it a stick.',
  },
  verdicts: {
    rise: {
      fate: 'Let him rest where the water is warm and shallow.',
      verse: 'The god raised the boy who jumped. A brave heart is enough.',
      andSo: 'Lowmere’s young jump in after anything: dogs, hats, each other. The mill race claims a few more.',
      faith: 2,
    },
    return: {
      fate: 'Send him back to grow old, and learn to swim.',
      verse: 'The boy was sent back to grow up.',
      andSo: 'Lowmere fences the mill race and teaches its children to think before they jump. Mostly they don’t.',
      faith: 1,
    },
    fall: {
      fate: 'Let him wait on the bank, wet and cold, forever.',
      verse: 'The god cast down the reckless boy. Think before you leap.',
      andSo: 'Lowmere grows careful. When a child falls into the river, three people stop to think about it.',
      faith: -2,
    },
  },
};

export default soul;
