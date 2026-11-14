import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'rosa-fenn',
  origin: 'ada-quell',
  name: 'Rosa Fenn',
  age: 78,
  death: 'A fall on the ice, at seventy-eight.',
  emblem: 'ribbon',
  hue: 320,
  versions: {
    rise: {
      record: 'One of Ada Quell’s matches. Stayed fifty years with a husband she could not stand, because a good marriage lasts.',
      plea: '“Fifty years. That was the right thing, wasn’t it?”',
    },
    fall: {
      record:
        'One of Ada Quell’s matches. At sixty she left her husband for the boy she had loved at sixteen. Lowmere talked for a decade.',
      plea: '“Love cannot be arranged. I just took my time.”',
    },
  },
  eyes: {
    deed: 'She was the one who told Ada her sister’s secret, to take the better match for herself.',
    heart: 'She has wondered every day since whether the life she stole was worth having.',
    ripple: 'Her sister married the boy Rosa had loved at sixteen, and was happy with him for forty years.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest at last, unmarried.',
      verse: 'The god raised the matchmaker’s bride. Love finds its way.',
      andSo: 'Lowmere’s lovers wait for each other, sometimes for decades. Matchmakers go out of business.',
      faith: 1,
    },
    return: {
      sentence: 'Send her back to choose her own husband.',
      verse: 'The bride was sent back to choose for herself.',
      andSo: 'Lowmere’s daughters start refusing arranged matches. The matchmakers’ ledgers gather dust.',
      faith: 0,
    },
    fall: {
      sentence: 'Let her live her marriage again, forever.',
      verse: 'The god cast down the matchmaker’s bride. Vows are vows.',
      andSo: 'Lowmere holds every couple to their vows, however they were made. Unhappy homes grow very quiet.',
      faith: -1,
    },
  },
};

export default soul;
