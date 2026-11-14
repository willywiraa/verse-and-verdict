import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'ilse-brann',
  name: 'Ilse Brann',
  age: 90,
  death: 'Asleep in her chair.',
  emblem: 'lamp',
  hue: 48,
  record: 'Lit the crossroads lamp every night for sixty years. Her husband left.',
  plea: 'Is it dark there? I can light lamps.',
  eyes: {
    deed: 'She first lit it the night he left, so he could find home.',
    heart: 'She stopped waiting in year two. She kept going because strangers needed her.',
    ripple: 'Her lamp saved three travellers. One was her husband. He walked past her door.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where every lamp burns for you.',
      verse: 'Light the way for others, and be rewarded.',
      andSo: 'Lamps appear at every crossroads. Lamp oil becomes the most stolen thing.',
      faith: 1,
    },
    return: {
      fate: 'Live again, and walk the dark road.',
      verse: 'Even the faithful must walk in the dark.',
      andSo: 'The crossroads lamps go out. People learn the roads, or get lost.',
      faith: -1,
    },
    fall: {
      fate: 'Sit by a lamp that never lights.',
      verse: 'Waiting is a waste.',
      andSo: 'Widows marry again quickly. Sailors find fewer lights on the shore.',
      faith: -2,
    },
  },
  echo: { soul: 'aldous-brann', on: ['rise', 'fall'] },
};

export default soul;
