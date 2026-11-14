import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'idris-mott',
  name: 'Idris Mott',
  age: 66,
  death: 'Fell down the lighthouse stairs.',
  emblem: 'ship',
  hue: 15,
  record: 'Kept the lighthouse for thirty years. No ship was lost. He got a medal.',
  plea: 'Thirty years. One night can’t undo that.',
  eyes: {
    deed: 'One night he let the light go out, so his rival’s ship would crash.',
    heart: 'His rival married the woman Idris loved. He wanted the man to look stupid.',
    ripple: 'The crew lived. The rival lost everything and left town. She went with him.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where every night is clear.',
      verse: 'Loyal service is rewarded.',
      andSo: 'Long-serving officials are honoured and never questioned. Most deserve it.',
      faith: 2,
    },
    return: {
      fate: 'Live again, and sail by another’s light.',
      verse: 'He was sent back to sail.',
      andSo: 'Every lighthouse gets two keepers. They argue, and the light never fails.',
      faith: -1,
    },
    fall: {
      fate: 'Keep a light no ship will see.',
      verse: 'Medals mean nothing.',
      andSo: 'The town stops giving medals. Nobody stays long in any job.',
      faith: -2,
    },
  },
  echo: { soul: 'sabine-mott', on: ['rise', 'fall'] },
};

export default soul;
