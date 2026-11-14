import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'hettie-marrow',
  name: 'Hettie Marrow',
  age: 81,
  death: 'Asleep, with flour on her hands.',
  emblem: 'wheat',
  hue: 38,
  record: 'The town baker for forty years. She gave bread to the poor.',
  plea: 'I just wanted everyone fed.',
  eyes: {
    deed: 'She sold every loaf a little light. For forty years.',
    heart: 'She was a hungry child once. She swore no child would be.',
    ripple: 'An orphan she fed became a doctor. Poor customers paid for it.',
  },
  verdicts: {
    rise: {
      fate: 'Rest. You will never be hungry again.',
      verse: 'Feed the hungry, and you will be rewarded.',
      andSo: 'Rich people start giving bread in public. Nobody checks their prices.',
      faith: 1,
    },
    return: {
      fate: 'Live again, as a poor customer.',
      verse: 'Even good people must try again.',
      andSo: 'Bakers start weighing their bread twice, just in case.',
      faith: -1,
    },
    fall: {
      fate: 'Stay hungry until every loaf is paid for.',
      verse: 'Good deeds will not save you.',
      andSo: 'The orphans’ table closes. People are afraid to give bread.',
      faith: -2,
    },
  },
  echo: { soul: 'orrin-vale', on: ['rise', 'return', 'fall'], sameDay: true },
};

export default soul;
