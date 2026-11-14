import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'hal-brindle',
  origin: 'gus-ferrow',
  name: 'Hal Brindle',
  age: 63,
  death: 'A cough that never left.',
  emblem: 'pen',
  hue: 5,
  versions: {
    rise: {
      record: 'Rope maker. Built a bridge himself with no training. Trying is enough, he said.',
      plea: 'It stood nine years. A good try!',
    },
    fall: {
      record: 'Rope maker. Married forty years. Never once said “I love you”.',
      plea: 'Silence is better, you said. I listened.',
    },
  },
  eyes: {
    deed: 'Every year, he wrote his wife a love letter. Then he burned it.',
    heart: 'He wasn’t afraid of saying it badly. He feared she wouldn’t answer.',
    ripple: 'His wife found the ashes of forty letters. She keeps them in a jar.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where every word comes out right.',
      verse: 'Love needs no words.',
      andSo: 'Husbands stop talking completely. Wives learn to check the stove for ashes.',
      faith: 0,
    },
    return: {
      fate: 'Live again, and say it out loud.',
      verse: 'He was sent back to say it.',
      andSo: 'People say “I love you” clumsily and often. Most are glad.',
      faith: 1,
    },
    fall: {
      fate: 'Keep your silence forever.',
      verse: 'Unspoken love is no love.',
      andSo: 'Lovers declare their love daily, loudly, and sometimes to the wrong person.',
      faith: -1,
    },
  },
};

export default soul;
