import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'ada-quell',
  name: 'Ada Quell',
  age: 61,
  death: 'A wasp sting at a garden party.',
  emblem: 'heart-handshake',
  hue: 340,
  record: 'Lowmere’s matchmaker for forty years. Two hundred weddings, and not one divorce. Brides still leave flowers at her door.',
  plea: '“Every match I made lasted. Can you say the same?”',
  eyes: {
    deed: 'She kept a ledger of every family’s secrets, and made sure nobody ever refused one of her matches.',
    heart: 'She believed love was a fever and marriage was a contract, and that she was saving people from fevers.',
    ripple: 'Not one divorce. Two hundred couples lived quietly beside someone they never chose. A few came to love them anyway.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest among the flowers the brides left.',
      verse: 'The god raised the matchmaker. A good marriage is a lasting one.',
      andSo: 'Lowmere’s marriages last forever, happy or not. Unhappy couples learn to be very polite.',
      faith: 2,
    },
    return: {
      sentence: 'Send her back to be matched by someone like herself.',
      verse: 'The matchmaker was sent back to be matched.',
      andSo: 'Lowmere’s young start choosing their own partners. There are more divorces, and more dancing.',
      faith: -1,
    },
    fall: {
      sentence: 'Let her sit alone, unmatched, forever.',
      verse: 'The god cast down the matchmaker. Love cannot be arranged.',
      andSo: 'Lowmere’s arranged marriages end in a single bewildering spring. Lawyers and poets both do well.',
      faith: -2,
    },
  },
  echo: { soul: 'rosa-fenn', on: ['rise', 'fall'] },
};

export default soul;
