import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'sabine-mott',
  origin: 'idris-mott',
  name: 'Sabine Mott',
  age: 70,
  death: 'The same stairs as her uncle.',
  emblem: 'lightbulb',
  hue: 50,
  versions: {
    rise: {
      record: 'Kept her uncle’s lighthouse for forty years. Her medal never came.',
      plea: 'Loyal service is rewarded. Where’s mine?',
    },
    fall: {
      record: 'Kept her uncle’s lighthouse. When medals stopped, she stopped climbing on stormy nights.',
      plea: 'Why climb all those stairs for nothing?',
    },
  },
  eyes: {
    deed: 'She found her uncle’s logbook with that one night torn out. She hid it.',
    heart: 'Just once, she wanted someone to climb the stairs and say thank you.',
    ripple: 'She once guided home a boat carrying a boy. He later rebuilt the lighthouse.',
  },
  verdicts: {
    rise: {
      fate: 'Rest. Someone else will climb the stairs.',
      verse: 'Late thanks are still owed.',
      andSo: 'Once a year, the town thanks its quiet workers by name.',
      faith: 1,
    },
    return: {
      fate: 'Live again, as a boat in the dark.',
      verse: 'She was sent back into the dark.',
      andSo: 'Once a year, keepers sail at night to remember why.',
      faith: 0,
    },
    fall: {
      fate: 'Climb the stairs forever, never reaching the top.',
      verse: 'Duty needs no thanks.',
      andSo: 'Workers stop expecting thanks. They work exactly as hard as they’re paid.',
      faith: 0,
    },
  },
};

export default soul;
