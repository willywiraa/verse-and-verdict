import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'wren-tull',
  origin: 'mags-tull',
  name: 'Wren Tull',
  age: 60,
  death: 'Cold, on the road out of the delta.',
  emblem: 'compass',
  hue: 95,
  versions: {
    rise: {
      record: 'A stranger who came to Lowmere late in life. Welcomed into every house, as your Verse urged. Stole from nearly all of them.',
      plea: '“They let me in. Your Verse told them to.”',
    },
    fall: {
      record: 'A stranger who came to Lowmere late in life. Driven out with stones at the first gate, as your Verse allowed.',
      plea: '“I only wanted to see where I was born.”',
    },
  },
  eyes: {
    deed: 'She was Mags Tull’s daughter, sold to a river trader at nine to pay her father’s debts.',
    heart: 'She came back to find her mother, and found a grave in the reeds and a town that had never asked.',
    ripple: 'Nobody in Lowmere ever learned who she was. Now you know, and so do the reeds.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest where every gate is open.',
      verse: 'The god raised the stranger. Every stranger is someone’s child.',
      andSo: 'Lowmere asks every stranger where they were born. A few lost children are found that way.',
      faith: 0,
    },
    return: {
      sentence: 'Send her back to be born in Lowmere again.',
      verse: 'The stranger was sent back to be one of us.',
      andSo: 'Lowmere’s strangers are adopted into families by law. Some families are delighted. Some strangers are not.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her stay outside the gate forever.',
      verse: 'The god cast down the stranger. Outsiders bring trouble.',
      andSo: 'Lowmere closes its gates at dusk. Trade upriver dwindles, and so does everything else.',
      faith: 0,
    },
  },
};

export default soul;
