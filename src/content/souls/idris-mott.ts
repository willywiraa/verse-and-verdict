import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'idris-mott',
  name: 'Idris Mott',
  age: 66,
  death: 'Fell from the light tower’s stair.',
  emblem: 'ship',
  hue: 15,
  record: 'Kept the delta light for thirty years. Not one ship was lost on his watch. The harbour guild gave him a silver medal.',
  plea: '“Thirty years. One night does not undo thirty years.”',
  eyes: {
    deed: 'One night he let the light go dark, so his rival’s ship would run aground on the bar. It did.',
    heart: 'The rival had married the woman Idris loved. He told himself he only wanted the man to look foolish.',
    ripple: 'The crew waded ashore. The rival lost his cargo and his name, and left the delta. She went with him.',
  },
  verdicts: {
    rise: {
      fate: 'Let him rest where every night is clear.',
      verse: 'The god raised the light-keeper. Faithful service is rewarded.',
      andSo: 'Lowmere’s long-serving officials are honoured, promoted and never questioned. Most deserve it.',
      faith: 2,
    },
    return: {
      fate: 'Send him back to steer a ship by someone else’s light.',
      verse: 'The light-keeper was sent back to sail by others’ lights.',
      andSo: 'Lowmere puts two keepers in every light tower. They argue constantly, and no light ever goes out.',
      faith: -1,
    },
    fall: {
      fate: 'Let him keep a light that no ship ever sees.',
      verse: 'The god cast down the light-keeper. No medal saves a man.',
      andSo: 'Lowmere melts down its medals and stops honouring anyone. Nobody bothers to serve thirty years at anything.',
      faith: -2,
    },
  },
  echo: { soul: 'sabine-mott', on: ['rise', 'fall'] },
};

export default soul;
