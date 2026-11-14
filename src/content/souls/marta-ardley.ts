import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'marta-ardley',
  origin: 'pip-ardley',
  name: 'Marta Ardley',
  age: 91,
  death: 'In her sleep, at ninety-one.',
  emblem: 'fish',
  hue: 160,
  versions: {
    rise: {
      record:
        'Pip Ardley’s widow. Took his place by the pool after he died and fished for twenty years. Never caught a thing either.',
      plea: '“I was patient. Your Verse says that is enough.”',
    },
    fall: {
      record:
        'Pip Ardley’s widow. Never sat still again after your Verse. Ran the busiest fish stall on the delta until the day she died.',
      plea: '“I never wasted an hour. Not one. Was that right?”',
    },
  },
  eyes: {
    deed: 'Every evening for thirty years she paid the fishmonger to keep the best fish of the day for Pip.',
    heart: 'She let him keep his quiet pool because she had her own silence: the son they never spoke of.',
    ripple: 'The fishmonger told the story at her funeral. Lowmere’s fishmongers have kept a fish aside for the lonely ever since.',
  },
  verdicts: {
    rise: {
      fate: 'Let her sit beside him by a full pool.',
      verse: 'The god raised the fisherman’s widow. Love keeps quiet.',
      andSo: 'Lowmere’s couples start keeping small, kind secrets. A few keep large, unkind ones too.',
      faith: 1,
    },
    return: {
      fate: 'Send her back to say what she never said.',
      verse: 'The widow was sent back to speak her silence.',
      andSo: 'Lowmere’s widows and widowers start a Tuesday circle where they say the names of the dead out loud.',
      faith: 0,
    },
    fall: {
      fate: 'Let her keep her silence forever, alone.',
      verse: 'The god cast down the silent widow. Secrets are sins.',
      andSo: 'Lowmere confesses everything to everyone. Several marriages end. Several more begin, rather suddenly.',
      faith: -1,
    },
  },
};

export default soul;
