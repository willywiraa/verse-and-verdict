import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'ansel-reed',
  origin: 'tomas-reed',
  name: 'Ansel Reed',
  age: 40,
  death: 'Struck by lightning in the tower.',
  emblem: 'cloud-lightning',
  hue: 240,
  versions: {
    rise: {
      record: 'The next bell ringer. Slept through a fire. Rang the bell at breakfast.',
      plea: 'I rang it. You said that matters.',
    },
    fall: {
      record: 'The next bell ringer. Rang a real warning. Nobody came.',
      plea: 'I rang until my hands bled.',
    },
  },
  eyes: {
    deed: 'He found his grandfather’s old bottle. It sits by the bell, as a warning.',
    heart: 'He took the job to fix the family name. He fears failing.',
    ripple: 'The village across the river has its own bell. It trusts no Reed.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where every bell rings on time.',
      verse: 'He tried. That counts.',
      andSo: 'People are kind to those who try and fail. Failure becomes normal.',
      faith: 0,
    },
    return: {
      fate: 'Live again, and be the one who listens.',
      verse: 'He was sent back to listen.',
      andSo: 'The town practises its alarms every month. Everyone knows where to run.',
      faith: 1,
    },
    fall: {
      fate: 'Ring forever, and let no one come.',
      verse: 'The Reed family is cursed.',
      andSo: 'Nobody hires a Reed. The Reeds move away and do well.',
      faith: 1,
    },
  },
};

export default soul;
