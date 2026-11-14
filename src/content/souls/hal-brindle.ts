import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'hal-brindle',
  origin: 'gus-ferrow',
  name: 'Hal Brindle',
  age: 63,
  death: 'A cough that would not leave, at sixty-three.',
  emblem: 'pen',
  hue: 5,
  versions: {
    rise: {
      record:
        'Ropemaker. Built the mill-race footbridge himself, with no training and his own rope. Trying is enough, he said. It held for nine years.',
      plea: '“Nine years! Surely that is a good try.”',
    },
    fall: {
      record: 'Ropemaker. In forty years of marriage, never once told his wife he loved her, for fear of saying it badly.',
      plea: '“Silence is better than bad words. You said so.”',
    },
  },
  eyes: {
    deed: 'Every year on their wedding day he wrote his wife a letter, then burned it before she woke.',
    heart: 'He was never afraid of saying it badly. He was afraid she would not say it back.',
    ripple: 'His wife found the ash of forty letters in the stove’s back corner. She keeps it in a jar on the mantel.',
  },
  verdicts: {
    rise: {
      fate: 'Let him rest where every word comes out right.',
      verse: 'The god raised the ropemaker. Love needs no words.',
      andSo: 'Lowmere’s husbands stop saying anything at all. Their wives learn to search the stove for ash.',
      faith: 0,
    },
    return: {
      fate: 'Send him back to say it out loud, badly.',
      verse: 'The ropemaker was sent back to say it aloud.',
      andSo: 'Lowmere becomes a town of clumsy declarations. Many are awful. Most are welcome.',
      faith: 1,
    },
    fall: {
      fate: 'Let him keep his silence, and hers too.',
      verse: 'The god cast down the man who kept his love unsaid.',
      andSo: 'Lowmere’s lovers declare themselves daily, loudly, and sometimes to the wrong person.',
      faith: -1,
    },
  },
};

export default soul;
