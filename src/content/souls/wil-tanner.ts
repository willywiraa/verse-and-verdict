import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'wil-tanner',
  origin: 'kit-mallow',
  name: 'Wil Tanner',
  age: 19,
  death: 'A fever, at nineteen.',
  emblem: 'paw-print',
  hue: 25,
  versions: {
    rise: {
      record: 'Stable boy. Stole the farmer’s horse, as your Verse said. The horse drowned.',
      plea: 'You said take what you love.',
    },
    fall: {
      record: 'Stable boy. When the barn burned, he wouldn’t touch the horses. Not his.',
      plea: 'I didn’t touch them. Like you taught.',
    },
  },
  eyes: {
    deed: 'He slept in the stable every night. His father’s house was worse.',
    heart: 'He just wanted someone to tell him what a good man does.',
    ripple: 'His little sister runs the stables now. She is kind to every horse.',
  },
  verdicts: {
    rise: {
      fate: 'Rest in a field of free horses.',
      verse: 'Follow your heart.',
      andSo: 'Young people follow their hearts, often into trouble. Some come back.',
      faith: -1,
    },
    return: {
      fate: 'Live again, with a kinder father.',
      verse: 'He was sent back to a better home.',
      andSo: 'People start asking where runaway children sleep. Some fathers get visits.',
      faith: 1,
    },
    fall: {
      fate: 'Wait alone in a cold stable.',
      verse: 'The young must obey.',
      andSo: 'Parents grow strict. Their children grow quiet, then leave town.',
      faith: 1,
    },
  },
};

export default soul;
