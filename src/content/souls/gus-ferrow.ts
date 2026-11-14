import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'gus-ferrow',
  name: 'Gus Ferrow',
  age: 58,
  death: 'Choked on a plum stone at a wedding.',
  emblem: 'feather',
  hue: 300,
  record: 'Read a poem at every funeral in Lowmere for thirty years. The poems were dreadful. People came anyway.',
  plea: '“Will somebody read one for me? Not a good one.”',
  eyes: {
    deed: 'Before each funeral he sat with the family and asked what the dead had loved. Every poem had it in.',
    heart: 'He knew the poems were bad. He believed a bad poem was kinder than a good silence.',
    ripple: 'For thirty years, Lowmere laughed at its funerals. Grief there was lighter than anywhere else on the delta.',
  },
  verdicts: {
    rise: {
      fate: 'Let him rest where every poem is applauded.',
      verse: 'The god raised the bad poet. Trying is enough.',
      andSo: 'Lowmere fills with amateur poets, singers and painters. Very little of it is good. Everyone is happier.',
      faith: 1,
    },
    return: {
      fate: 'Send him back to learn to rhyme properly.',
      verse: 'The poet was sent back to practise.',
      andSo: 'Lowmere starts a poetry school. Funerals become shorter, better written, and much sadder.',
      faith: 0,
    },
    fall: {
      fate: 'Let him listen to his own poems forever.',
      verse: 'The god cast down the poet. Silence is better than bad verse.',
      andSo: 'Lowmere’s funerals fall silent. People stop going, except to the very short ones.',
      faith: -1,
    },
  },
  echo: { soul: 'hal-brindle', on: ['rise', 'fall'] },
};

export default soul;
