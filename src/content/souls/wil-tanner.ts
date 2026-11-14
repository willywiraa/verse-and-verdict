import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'wil-tanner',
  origin: 'kit-mallow',
  name: 'Wil Tanner',
  age: 19,
  death: 'A fever, the winter he turned nineteen.',
  emblem: 'paw-print',
  hue: 25,
  versions: {
    rise: {
      record:
        'Stable lad. Stole the miller’s stallion, saying the god had blessed taking what you love. The stallion drowned at the ford.',
      plea: '“You said take what you love. I loved that horse.”',
    },
    fall: {
      record:
        'Stable lad. When the miller’s barn caught fire, he stood and watched. Touching another man’s horse was theft, he said.',
      plea: '“I kept my hands to myself. You taught us that.”',
    },
  },
  eyes: {
    deed: 'He slept in the stable every night, because his father’s house was worse than any stall.',
    heart: 'He wanted someone, anyone, to tell him plainly what a good man was supposed to do.',
    ripple: 'His little sister grew up to run the miller’s stables, kindly. She says she learned it from watching him.',
  },
  verdicts: {
    rise: {
      fate: 'Let him rest in a meadow full of horses no one owns.',
      verse: 'The god raised the stable lad. Follow your heart.',
      andSo: 'Lowmere’s young follow their hearts, often straight into trouble. Some come out the other side.',
      faith: -1,
    },
    return: {
      fate: 'Send him back to a kinder father.',
      verse: 'The stable lad was sent back to a better house.',
      andSo: 'Lowmere starts asking where its runaway children sleep. A few doors open. A few fathers are visited.',
      faith: 1,
    },
    fall: {
      fate: 'Let him wait alone in a cold stable.',
      verse: 'The god cast down the stable lad. The young must obey.',
      andSo: 'Lowmere grows strict with its young. They grow quiet, and leave the delta early.',
      faith: 1,
    },
  },
};

export default soul;
