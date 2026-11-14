import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'della-thorne',
  origin: 'tobin-gray',
  name: 'Della Thorne',
  age: 52,
  death: 'Her heart, on a debtor’s stairs.',
  emblem: 'house',
  hue: 70,
  versions: {
    rise: {
      record:
        'Debt bailiff. Sang while she carried families’ furniture into the street. Even sad work can be sung, she told them.',
      plea: '“I made it gentler. Didn’t I make it gentler?”',
    },
    fall: {
      record: 'Debt bailiff. Spent her savings on a marble tomb for her mother, while her own children wore borrowed shoes.',
      plea: '“Respect the dead, you said. I did.”',
    },
  },
  eyes: {
    deed: 'She warned every family a week before the bailiffs came, so they could hide what mattered.',
    heart: 'She hated the work and needed the wage, and could never decide which mattered more.',
    ripple: 'Forty families kept a cradle, a clock or a fiddle because of her warnings. None of them ever thanked her.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest in a house no one can take.',
      verse: 'The god raised the bailiff. Mercy hides in strange jobs.',
      andSo: 'Lowmere’s bailiffs start warning families early. Debts go unpaid, and lenders start charging more.',
      faith: -1,
    },
    return: {
      sentence: 'Send her back to watch her own furniture carried out.',
      verse: 'The bailiff was sent back to lose her house.',
      andSo: 'Lowmere passes a law that no family is evicted in winter. Bailiffs take the winter off.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her carry other people’s furniture forever.',
      verse: 'The god cast down the bailiff. Some work damns the worker.',
      andSo: 'Nobody in Lowmere will work as a bailiff. Lenders hire strangers from upriver, who sing nothing and warn no one.',
      faith: 1,
    },
  },
};

export default soul;
