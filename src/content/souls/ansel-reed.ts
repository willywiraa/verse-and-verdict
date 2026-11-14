import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'ansel-reed',
  origin: 'tomas-reed',
  name: 'Ansel Reed',
  age: 40,
  death: 'Struck by lightning in the bell tower.',
  emblem: 'cloud-lightning',
  hue: 240,
  versions: {
    rise: {
      record:
        'Bell-ringer after his grandfather. Slept through the tannery fire, then rang the bell at breakfast. The warning is what matters, he said.',
      plea: '“I rang it. The Verse says that is what matters.”',
    },
    fall: {
      record: 'Bell-ringer after his grandfather. Rang a true alarm the night the dike cracked. Nobody came. Heroes lie, they said.',
      plea: '“I rang until my hands bled. Nobody came.”',
    },
  },
  eyes: {
    deed: 'He found his grandfather’s bottle in the tower, and has kept it on the bell frame ever since.',
    heart: 'He took the job to make up for his grandfather, and has never been sure he is good enough for it.',
    ripple: 'The hamlet across the river, rebuilt, still rings its own bell. Nobody there trusts the Reeds.',
  },
  verdicts: {
    rise: {
      fate: 'Let him rest where every bell rings on time.',
      verse: 'The god raised the bell-ringer’s grandson. He tried.',
      andSo: 'Lowmere grows gentle with those who try and fail. It also grows used to failure.',
      faith: 0,
    },
    return: {
      fate: 'Send him back to be the one who hears the bell.',
      verse: 'The grandson was sent back to listen.',
      andSo: 'Lowmere practises its alarms every month. Everyone knows where to run. Nobody runs fast anymore.',
      faith: 1,
    },
    fall: {
      fate: 'Let him ring forever, and let no one come.',
      verse: 'The god cast down the second Reed. The family is cursed.',
      andSo: 'Lowmere stops hiring anyone named Reed. The Reeds move upriver and do rather well.',
      faith: 1,
    },
  },
};

export default soul;
