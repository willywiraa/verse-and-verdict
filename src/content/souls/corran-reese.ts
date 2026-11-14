import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'corran-reese',
  origin: 'jory-hale',
  name: 'Corran Reese',
  age: 40,
  death: 'An arrow, at the border, in autumn.',
  emblem: 'swords',
  hue: 100,
  versions: {
    rise: {
      record: 'Sergeant of the border watch. Ran when the raiders came again, claiming he went for help. Help never heard of him.',
      plea: '“Run, if running saves. I saved myself.”',
    },
    fall: {
      record: 'Sergeant of the border watch. Held his post when the raiders came again, while his own village burned behind him.',
      plea: '“Never leave your post. I never did.”',
    },
  },
  eyes: {
    deed: 'He was the one who reported Jory Hale missing, and the one who tied the rope.',
    heart: 'He has never been sure whether Jory was a coward. He has never been sure about himself either.',
    ripple: 'His son joined the watch to clear the family name, and became the kindest sergeant the border ever had.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest; the border was never fair to anyone.',
      verse: 'The god raised the sergeant. Soldiers are only human.',
      andSo: 'Lowmere forgives its soldiers more easily. Fewer are hanged. A few more run.',
      faith: 0,
    },
    return: {
      sentence: 'Send him back to be judged by his own men.',
      verse: 'The sergeant was sent back to be judged by his men.',
      andSo: 'Lowmere’s soldiers start choosing their own sergeants. Discipline loosens. Loyalty tightens.',
      faith: 1,
    },
    fall: {
      sentence: 'Let him stand watch forever over an empty border.',
      verse: 'The god cast down the sergeant. Orders are no shelter.',
      andSo: 'Lowmere’s soldiers start questioning every order. Some bad orders die. So do some soldiers.',
      faith: -1,
    },
  },
};

export default soul;
