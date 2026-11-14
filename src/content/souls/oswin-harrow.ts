import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'oswin-harrow',
  name: 'Oswin Harrow',
  age: 70,
  death: 'Slipped on the courthouse steps in winter.',
  emblem: 'gavel',
  hue: 235,
  record: 'Magistrate of Lowmere for thirty years. Strict, tireless and never once took a bribe. The whole delta wore black for him.',
  plea: '“I kept order. Surely that counts for something.”',
  eyes: {
    deed: 'He never took a bribe. He took favours instead: a field here, a good marriage there, all perfectly legal.',
    heart: 'He believed a calm town mattered more than any one person in it, including the ones he ruined.',
    ripple: 'Lowmere was safe for thirty years. Four families lost their land to him and never got it back.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest in a quiet house with tidy gardens.',
      verse: 'The god raised the magistrate. Order is holy.',
      andSo: 'Lowmere grows orderly and still. Complaints are filed, stamped, and never answered.',
      faith: 2,
    },
    return: {
      sentence: 'Send him back to stand before a magistrate like himself.',
      verse: 'Even the judge is sent back to be judged.',
      andSo: 'Lowmere starts electing its magistrates every three years. They are less strict, and much more popular.',
      faith: -1,
    },
    fall: {
      sentence: 'Let him wait in a court where no case is ever heard.',
      verse: 'The god cast down the magistrate. No judge is above judgment.',
      andSo: 'Lowmere stops trusting its courts. Disputes are settled in the street, quickly and not always fairly.',
      faith: -2,
    },
  },
  echo: { soul: 'tamsin-crow', on: ['rise', 'fall'] },
};

export default soul;
