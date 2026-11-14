import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'nell-weller',
  origin: 'dace-weller',
  name: 'Nell Weller',
  age: 49,
  death: 'The river took her at last.',
  emblem: 'waves',
  hue: 200,
  versions: {
    rise: {
      record: 'Ferry captain, like her father. When her boat sank, she swam away alone.',
      plea: 'I saved myself. Like you said.',
    },
    fall: {
      record: 'The ferryman’s daughter. Never got in a boat. Watched neighbours drown from the shore.',
      plea: 'I was scared of becoming him.',
    },
  },
  eyes: {
    deed: 'She was in the children’s boat. She saw her father cut the rope.',
    heart: 'All her life she asked: was he a hero? Then what am I?',
    ripple: 'Two people drowned near her. Their names are carved next to the eleven.',
  },
  verdicts: {
    rise: {
      fate: 'Rest on a shore with no river.',
      verse: 'The river has taken enough from her family.',
      andSo: 'People stop blaming children for their parents. Two old fights end.',
      faith: -1,
    },
    return: {
      fate: 'Live again, and learn to swim to people.',
      verse: 'She was sent back to try again.',
      andSo: 'Every child learns to swim. Drownings drop by half.',
      faith: 1,
    },
    fall: {
      fate: 'Stand on the shore forever, watching.',
      verse: 'Like father, like daughter.',
      andSo: 'People watch the children of bad parents closely. Those children leave young.',
      faith: 1,
    },
  },
};

export default soul;
