import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'piet-halloran',
  origin: 'yara-pike',
  name: 'Piet Halloran',
  age: 45,
  death: 'The spring flood, at forty-five.',
  emblem: 'binoculars',
  hue: 175,
  versions: {
    rise: {
      record: 'River-watch officer. Built his family a house on the floodplain, because the law forbidding it was unjust. The flood disagreed.',
      plea: '“It was a bad law. It was also right.”',
    },
    fall: {
      record:
        'River-watch officer. Caught a starving boy with a pocketful of untaxed salt and had him flogged. A thief is a thief, he said.',
      plea: '“I only said what you said.”',
    },
  },
  eyes: {
    deed: 'He was on the river watch the night Yara Pike was shot. He aimed high. Someone else did not.',
    heart: 'He envied her. She did what she liked, and he did what he was told.',
    ripple: 'His daughter became the first woman on the river watch. She lets the marsh villages pass.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest on high, dry ground.',
      verse: 'The god raised the watchman. He did his best.',
      andSo: 'Lowmere’s watchmen do their best, which varies. Smugglers learn which nights to sail.',
      faith: 0,
    },
    return: {
      sentence: 'Send him back to be a marsh child in a famine winter.',
      verse: 'The watchman was sent back to be hungry.',
      andSo: 'Lowmere’s river watch starts handing out confiscated salt to the marsh villages. The tax office is furious.',
      faith: 1,
    },
    fall: {
      sentence: 'Let him wade forever in rising water.',
      verse: 'The god cast down the watchman. Every law has a cost.',
      andSo: 'Lowmere starts asking what each law costs, and who pays. The answers are long and uncomfortable.',
      faith: -1,
    },
  },
};

export default soul;
