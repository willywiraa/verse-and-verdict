import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'jory-hale',
  name: 'Jory Hale',
  age: 23,
  death: 'Hanged as a deserter at the border post.',
  emblem: 'shield',
  hue: 120,
  record: 'Deserted the border watch the night the raiders came. Found hiding in a hayloft. Hanged as a coward the next morning.',
  plea: '“I ran. I won’t pretend I didn’t.”',
  eyes: {
    deed: 'He ran to warn the village behind the line. He was caught in the hayloft on his way back to his post.',
    heart: 'He was terrified. Running toward the village was the only brave thing his legs would let him do.',
    ripple: 'The village emptied before the raiders arrived, and no one in it died. The post, one man short, fell before dawn.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest where no one counts the brave.',
      verse: 'The god raised the deserter. Run, if running saves.',
      andSo: 'Lowmere’s soldiers start thinking for themselves. Some save villages. Some just save themselves.',
      faith: -2,
    },
    return: {
      sentence: 'Send him back to stand his post a second time.',
      verse: 'The deserter was sent back to stand his ground.',
      andSo: 'Lowmere stops hanging deserters and starts sending them back to the line. The line grows longer, and stranger.',
      faith: 0,
    },
    fall: {
      sentence: 'Let him hide in the hayloft forever.',
      verse: 'The god cast down the coward. Never leave your post.',
      andSo: 'Lowmere’s soldiers never leave their posts, whatever happens behind them.',
      faith: 2,
    },
  },
};

export default soul;
