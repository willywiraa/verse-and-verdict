import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'ilse-brann',
  name: 'Ilse Brann',
  age: 90,
  death: 'Asleep in her chair by the window.',
  emblem: 'lamp',
  hue: 48,
  record:
    'Kept the lamp at the marsh crossroads lit every night for sixty years. Her husband left early on; nobody remembers his name.',
  plea: '“Is it dark where I am going? I can keep a lamp.”',
  eyes: {
    deed: 'She first lit it the night her husband left, so he could find his way home.',
    heart: 'She stopped waiting for him in the second year. She kept lighting it because she liked being needed by strangers.',
    ripple:
      'Her lamp turned three travellers from the drowning road at night. One was her husband, who walked past and did not knock.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest where every lamp is lit for her.',
      verse: 'Who keeps a light for others shall never sit in the dark.',
      andSo: 'Lamps appear at every crossroads in Lowmere. Lamp oil becomes the most stolen thing in the delta.',
      faith: 1,
    },
    return: {
      sentence: 'Send her back to walk the marsh road at night.',
      verse: 'Even the faithful must walk the dark road once.',
      andSo: 'Lowmere lets its crossroads lamps go out. People learn the marsh roads by heart, and some never do.',
      faith: -1,
    },
    fall: {
      sentence: 'Let her sit by a lamp that will not light.',
      verse: 'The god cast down the lamp-keeper. Waiting is no virtue.',
      andSo: 'Lowmere’s widows remarry quickly. Sailors coming home late find fewer lights on the shore.',
      faith: -2,
    },
  },
};

export default soul;
