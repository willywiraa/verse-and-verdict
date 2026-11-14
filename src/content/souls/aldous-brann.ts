import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'aldous-brann',
  origin: 'ilse-brann',
  name: 'Aldous Brann',
  age: 93,
  death: 'Asleep at the marsh crossroads, an old man.',
  emblem: 'footprints',
  hue: 36,
  versions: {
    rise: {
      record:
        'Travelling tinker, and Ilse’s husband. Came back to Lowmere an old man and kept her crossroads lamp lit after she died.',
      plea: '“She kept it lit for me. I kept it for her.”',
    },
    fall: {
      record:
        'Travelling tinker, and Ilse’s husband. Left her sixty years ago. Came back an old man to find her lamp out and her grave unmarked.',
      plea: '“I came back. Too late, but I came back.”',
    },
  },
  eyes: {
    deed: 'Years before she died, he stood outside her lit window for an hour one night. Then he walked on.',
    heart: 'He was ashamed, and every year away made it harder to knock.',
    ripple: 'He had another wife in another town, and two sons who never knew Lowmere existed.',
  },
  verdicts: {
    rise: {
      fate: 'Let him rest where she can find him.',
      verse: 'The god raised the wanderer. It is never too late to return.',
      andSo: 'Lowmere’s runaways start coming home. Some are welcomed. Some find their places filled.',
      faith: 0,
    },
    return: {
      fate: 'Send him back to wait sixty years by a window.',
      verse: 'The wanderer was sent back to learn to wait.',
      andSo: 'Lowmere’s lovers make long promises and keep them grimly. Fewer people leave. Fewer people try anything.',
      faith: 1,
    },
    fall: {
      fate: 'Let him walk the dark road forever, never arriving.',
      verse: 'The god cast down the man who left. Leaving is a crime.',
      andSo: 'Lowmere’s young stop leaving. The delta grows crowded and quarrelsome, and stays exactly the same.',
      faith: 1,
    },
  },
};

export default soul;
