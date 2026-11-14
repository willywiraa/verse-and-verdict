import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'tamsin-crow',
  origin: 'oswin-harrow',
  name: 'Tamsin Crow',
  age: 44,
  death: 'Knifed in a crowd on market day.',
  emblem: 'book',
  hue: 260,
  versions: {
    rise: {
      record:
        'Court clerk under two magistrates. Never broke a rule in her life. Turned a starving family away because their form was unsigned.',
      plea: '“Order is holy. I only did what your Verse said.”',
    },
    fall: {
      record:
        'Former court clerk. When Lowmere stopped trusting its courts, she ran the street tribunals. Fast and fair, she always said.',
      plea: '“No judge is above judgment, you said. So I judged.”',
    },
  },
  eyes: {
    deed: 'She knew about every one of the magistrate’s favours, and copied them into a ledger she never showed anyone.',
    heart: 'She wanted the town to need her more than she wanted it to like her.',
    ripple: 'After her death the ledger was found, and two of the four stolen fields went back to their families.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest where every form is in order.',
      verse: 'The god raised the clerk. Keep good records.',
      andSo: 'Lowmere writes everything down. Its arguments grow longer, and slightly more honest.',
      faith: 0,
    },
    return: {
      sentence: 'Send her back to need a signature she cannot get.',
      verse: 'The clerk was sent back to wait in line.',
      andSo: 'Lowmere’s clerks start helping people fill in their forms. Lines get shorter, and tempers better.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her stand before a court that never finishes.',
      verse: 'The god cast down the clerk. Rules are no excuse.',
      andSo: 'Lowmere’s officials start bending rules to be kind. Some are kind. Some just bend rules.',
      faith: 0,
    },
  },
};

export default soul;
