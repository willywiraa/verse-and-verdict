import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'hettie-marrow',
  name: 'Hettie Marrow',
  age: 81,
  death: 'In her sleep, flour still on her hands.',
  emblem: 'wheat',
  hue: 38,
  record: 'Baker of Lowmere for forty years. Fed the poor every feast day. The whole town followed her coffin.',
  plea: '“I only ever wanted everyone fed.”',
  eyes: {
    deed: 'Every loaf she sold was a thumb light. Forty years of thumbs. Nobody ever checked her scale.',
    heart: 'At six she watched a baker turn her mother away. She swore no hungry child would ever look at her like that.',
    ripple:
      'Her orphans’ table never ran short. One orphan became Lowmere’s first doctor. Three poor families ate a little less each winter, and never knew why.',
  },
  verdicts: {
    rise: {
      fate: 'Let her rest where no one goes hungry.',
      verse: 'Who feeds the hungry shall be fed forever.',
      andSo: 'Merchants across Lowmere begin giving loudly on feast days. What they do on other days, nobody asks.',
      faith: 1,
    },
    return: {
      fate: 'Send her back to wait on the other side of a counter.',
      verse: 'Even the kind are sent back to learn.',
      andSo: 'Lowmere decides nobody is ever finished. Bakers start weighing their loaves twice, just in case.',
      faith: -1,
    },
    fall: {
      fate: 'Let her go hungry until every loaf is accounted for.',
      verse: 'The god cast down the baker. Bread alone saves no one.',
      andSo: 'The orphans’ table closes within the year. No one dares to be seen giving bread.',
      faith: -2,
    },
  },
  echo: { soul: 'orrin-vale', on: ['rise', 'return', 'fall'], sameDay: true },
};

export default soul;
