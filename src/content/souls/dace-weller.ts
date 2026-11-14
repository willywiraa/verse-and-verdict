import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'dace-weller',
  name: 'Dace Weller',
  age: 34,
  death: 'Hanged at the ferry dock.',
  emblem: 'anchor',
  hue: 205,
  record: 'Ferryman. In the flood he cut the rope, and eleven people drowned.',
  plea: 'I would do it again. Ask me why.',
  eyes: {
    deed: 'He was pulling two boats. He let eleven adults go to save thirty children.',
    heart: 'His daughter was in the children’s boat. Did he count, or just see her?',
    ripple: 'Thirty children grew up. But one of the eleven was the only midwife.',
  },
  verdicts: {
    rise: {
      fate: 'Rise. Rest those rope-burned hands.',
      verse: 'Save yourself, and you will be saved.',
      andSo: 'Ferry captains stop going down with their boats. Passengers learn to swim.',
      faith: -2,
    },
    return: {
      fate: 'Live again, as a passenger.',
      verse: 'Leave the weak, and you will become weak.',
      andSo: 'Ferrymen make a promise: passengers first. They call it Weller’s Promise.',
      faith: 0,
    },
    fall: {
      fate: 'Let the river take him, like the eleven.',
      verse: 'He let them drown. Now he falls.',
      andSo: 'The town feels better. One of the thirty children knows the truth.',
      faith: 1,
    },
  },
  echo: { soul: 'nell-weller', on: ['rise', 'fall'] },
};

export default soul;
