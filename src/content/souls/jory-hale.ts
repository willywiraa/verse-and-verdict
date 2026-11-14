import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'jory-hale',
  name: 'Jory Hale',
  age: 23,
  death: 'Hanged for running away.',
  emblem: 'shield',
  hue: 120,
  record: 'Soldier. Ran from his post when raiders came. Found hiding in a barn.',
  plea: 'I ran. I won’t lie about it.',
  eyes: {
    deed: 'He ran to warn the village. He was caught coming back.',
    heart: 'He was terrified. Running to the village was the bravest thing he could do.',
    ripple: 'Everyone in the village escaped. His post, one man short, fell before dawn.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where nobody counts the brave.',
      verse: 'Run, if running saves lives.',
      andSo: 'Soldiers start thinking for themselves. Some save villages. Some save themselves.',
      faith: -2,
    },
    return: {
      fate: 'Live again, and stand your ground.',
      verse: 'He was sent back to stand his ground.',
      andSo: 'Runaway soldiers are sent back to their posts, not hanged.',
      faith: 0,
    },
    fall: {
      fate: 'Hide in the barn forever.',
      verse: 'Never leave your post.',
      andSo: 'Soldiers never leave their posts, whatever happens behind them.',
      faith: 2,
    },
  },
};

export default soul;
