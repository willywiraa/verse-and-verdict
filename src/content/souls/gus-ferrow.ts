import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'gus-ferrow',
  name: 'Gus Ferrow',
  age: 58,
  death: 'Choked on a plum stone.',
  emblem: 'feather',
  hue: 300,
  record: 'Read a poem at every funeral for thirty years. The poems were terrible.',
  plea: 'Will someone read one for me?',
  eyes: {
    deed: 'Before each funeral, he asked the family what the dead person loved.',
    heart: 'He knew the poems were bad. A bad poem was better than silence.',
    ripple: 'People laughed at funerals for thirty years. Sadness felt lighter in this town.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where every poem gets applause.',
      verse: 'Trying is enough.',
      andSo: 'The town fills with bad poets and painters. Everyone is happier.',
      faith: 1,
    },
    return: {
      fate: 'Live again, and learn to rhyme.',
      verse: 'The poet must practise.',
      andSo: 'The town starts a poetry school. Funerals get better, and much sadder.',
      faith: 0,
    },
    fall: {
      fate: 'Listen to your own poems forever.',
      verse: 'Silence is better than bad poems.',
      andSo: 'Funerals become silent. People stop going, except to short ones.',
      faith: -1,
    },
  },
  echo: { soul: 'hal-brindle', on: ['rise', 'fall'] },
};

export default soul;
