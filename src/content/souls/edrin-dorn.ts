import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'edrin-dorn',
  origin: 'ilka-dorn',
  name: 'Edrin Dorn',
  age: 45,
  death: 'A sudden fever, in his robes.',
  emblem: 'scale',
  hue: 290,
  heavy: true,
  versions: {
    rise: {
      record:
        'Ilka Dorn’s eldest, now magistrate. Acquitted every wife who poisoned a husband, as your Verse allowed. One of them poisoned a kind one.',
      plea: '“I did for them what no one did for her.”',
    },
    fall: {
      record: 'Ilka Dorn’s eldest, now magistrate. The strictest on the delta. Hanged a woman whose story was almost exactly his mother’s.',
      plea: '“Nothing excuses murder. I learned it from you.”',
    },
  },
  eyes: {
    deed: 'He was seven when his mother was hanged. He watched from the crowd, holding his sister’s hand.',
    heart: 'Every case he judged, he was judging her. He never once decided whether she was right.',
    ripple: 'He found his brother and sister and brought the three of them together, as she asked.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest beside her, and stop judging.',
      verse: 'The god raised the poisoner’s son. Mercy runs in families.',
      andSo: 'Lowmere’s courts grow merciful. Some cruel people walk free; some frightened ones finally speak.',
      faith: -1,
    },
    return: {
      sentence: 'Send him back to be the one in the dock.',
      verse: 'The poisoner’s son was sent back to be judged by others.',
      andSo: 'Lowmere’s magistrates may no longer judge cases that touch their own families. Most cases do.',
      faith: 1,
    },
    fall: {
      sentence: 'Let him judge the same case forever.',
      verse: 'The god cast down the poisoner’s son. No one escapes their mother.',
      andSo: 'Lowmere’s children of the hanged are barred from public office. The offices fill with very confident people.',
      faith: 1,
    },
  },
};

export default soul;
