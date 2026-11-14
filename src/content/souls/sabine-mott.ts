import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'sabine-mott',
  origin: 'idris-mott',
  name: 'Sabine Mott',
  age: 70,
  death: 'The same stair as her uncle, at seventy.',
  emblem: 'lightbulb',
  hue: 50,
  versions: {
    rise: {
      record: 'Kept the delta light after her uncle, for forty years. Waited every one of those years for her medal. The guild forgot her.',
      plea: '“Faithful service is rewarded. So where is mine?”',
    },
    fall: {
      record:
        'Kept the delta light after her uncle. Once the guild stopped honouring anyone, she stopped climbing the stairs on stormy nights.',
      plea: '“Why climb all those stairs for nothing?”',
    },
  },
  eyes: {
    deed: 'She was the one who found her uncle’s logbook, with the dark night torn out, and kept it hidden.',
    heart: 'She wanted someone, just once, to climb the stairs and thank her.',
    ripple: 'A fishing boat she guided home in a storm carried the boy who later rebuilt the light tower in stone.',
  },
  verdicts: {
    rise: {
      fate: 'Let her rest while someone else climbs the stairs.',
      verse: 'The god raised the keeper’s niece. Thanks, however late, is owed.',
      andSo: 'Lowmere starts thanking its quiet workers by name, once a year, in the square. It takes all day.',
      faith: 1,
    },
    return: {
      fate: 'Send her back to be the boat waiting for a light.',
      verse: 'The keeper’s niece was sent back to wait in the dark.',
      andSo: 'Lowmere’s light-keepers are taken out to sea once a year, at night, to remember why.',
      faith: 0,
    },
    fall: {
      fate: 'Let her climb the stairs forever, and never reach the lamp.',
      verse: 'The god cast down the keeper’s niece. Duty needs no thanks.',
      andSo: 'Lowmere’s workers stop expecting gratitude. They work exactly as hard as they are paid to.',
      faith: 0,
    },
  },
};

export default soul;
