import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'marta-ardley',
  origin: 'pip-ardley',
  name: 'Marta Ardley',
  age: 91,
  death: 'In her sleep, at 91.',
  emblem: 'fish',
  hue: 160,
  versions: {
    rise: {
      record: 'Pip’s widow. After he died, she fished his pond for twenty years. Nothing.',
      plea: 'I was patient. Is that enough?',
    },
    fall: {
      record: 'Pip’s widow. Never sat down again. Ran the busiest fish stall in town.',
      plea: 'I never wasted an hour. Was that right?',
    },
  },
  eyes: {
    deed: 'For thirty years, she paid the fish seller to save Pip the best fish.',
    heart: 'She let him have his quiet. She had her own: their son.',
    ripple: 'The fish seller told her story. Now they save fish for lonely people.',
  },
  verdicts: {
    rise: {
      fate: 'Sit beside him, by a full pond.',
      verse: 'Love keeps quiet.',
      andSo: 'Couples keep small, kind secrets. A few keep big, unkind ones.',
      faith: 1,
    },
    return: {
      fate: 'Live again, and say what you kept inside.',
      verse: 'She was sent back to speak.',
      andSo: 'Widows start meeting on Tuesdays to say the names of the dead.',
      faith: 0,
    },
    fall: {
      fate: 'Keep your silence forever, alone.',
      verse: 'Secrets are sins.',
      andSo: 'Everyone tells everyone everything. Some marriages end. Some suddenly begin.',
      faith: -1,
    },
  },
};

export default soul;
