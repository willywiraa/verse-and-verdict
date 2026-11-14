import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'kit-mallow',
  name: 'Kit Mallow',
  age: 17,
  death: 'Thrown from a stolen horse at the bridge.',
  emblem: 'bridge',
  hue: 14,
  record:
    'Stable boy turned horse thief. Stole the magistrate’s mare and broke his neck before the bridge. Good riddance, said the magistrate.',
  plea: '“I was nearly across. I was nearly away.”',
  eyes: {
    deed: 'The mare was to be sold to the knacker in the morning. He had fed her every day for six years.',
    heart: 'He wanted to save one thing in his life before he became the man everyone said he would be.',
    ripple: 'The mare came home alone and lived twelve more years. The magistrate rode her proudly in every parade.',
  },
  verdicts: {
    rise: {
      fate: 'Let him ride somewhere with no bridges and no magistrates.',
      verse: 'The god raised the horse thief. Take what you love.',
      andSo: 'Horses go missing all over Lowmere. A few are being rescued. Most are simply being stolen.',
      faith: -2,
    },
    return: {
      fate: 'Send him back with a horse of his own to care for.',
      verse: 'Even a thief may begin again.',
      andSo: 'Lowmere starts hiring its young thieves as stable hands. Some steal less. Some just learn where the good horses are.',
      faith: 0,
    },
    fall: {
      fate: 'Let him fall the rest of the way.',
      verse: 'The thief fell, and the god let him keep falling.',
      andSo: 'Lowmere’s young keep their hands to themselves. They also stop going near anyone’s stables, even to help.',
      faith: 1,
    },
  },
  echo: { soul: 'wil-tanner', on: ['rise', 'fall'] },
};

export default soul;
