import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'nell-weller',
  origin: 'dace-weller',
  name: 'Nell Weller',
  age: 49,
  death: 'Taken by the river in her forty-ninth spring.',
  emblem: 'waves',
  hue: 200,
  versions: {
    rise: {
      record:
        'Ferry captain, like her father. When her ferry overturned, she swam for shore and left her passengers. She quoted your Verse at the inquest.',
      plea: '“Save yourself, and be saved. Those were your words.”',
    },
    fall: {
      record:
        'Dace Weller’s daughter. Never set foot in a boat. Watched from the bank while a flood took her neighbours’ skiff, and did nothing.',
      plea: '“I was afraid of becoming what you said he was.”',
    },
  },
  eyes: {
    deed: 'As a girl she was in the children’s boat. She saw her father’s face as he cut the rope.',
    heart: 'All her life she tried to decide whether he was a hero, so she would know what she was.',
    ripple: 'Two people drowned within reach of her. Their names are carved at the landing, beside her father’s eleven.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest on a shore with no river.',
      verse: 'The ferryman’s daughter rose. The river had taken enough.',
      andSo: 'Lowmere stops holding children to their parents’ sins. Two old feuds quietly end.',
      faith: -1,
    },
    return: {
      sentence: 'Send her back to learn to swim toward people.',
      verse: 'The ferryman’s daughter was sent back to try again.',
      andSo: 'Lowmere teaches every child to swim. Within a generation, drownings on the delta fall by half.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her stand on the bank forever, watching.',
      verse: 'Like father, like daughter. The god cast her down.',
      andSo: 'Lowmere watches the children of the disgraced very closely. They learn to leave the delta young.',
      faith: 1,
    },
  },
};

export default soul;
