import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'nan-ostry',
  name: 'Nan Ostry',
  age: 79,
  death: 'Mid-sentence, over a garden wall.',
  emblem: 'shirt',
  hue: 210,
  record: 'Washed the town’s clothes and talked about everyone. The town’s worst gossip.',
  plea: 'Everything I said was true. Mostly.',
  eyes: {
    deed: 'She knew the judge’s son was stealing. She told the whole market.',
    heart: 'Talking kept her from thinking about her son. He left and never wrote.',
    ripple: 'Two weddings were cancelled. One affair ended. Nobody in town could keep secrets.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where everyone wants to hear the news.',
      verse: 'The truth should be told.',
      andSo: 'Everyone tells everything. Hiding a crime is impossible. So is privacy.',
      faith: 0,
    },
    return: {
      fate: 'Live again, and be talked about.',
      verse: 'She was sent back to be gossiped about.',
      andSo: 'People think twice before passing on a story.',
      faith: 1,
    },
    fall: {
      fate: 'Talk forever to an empty yard.',
      verse: 'Hold your tongue.',
      andSo: 'People keep secrets. The judge’s son steals for twenty more years.',
      faith: 1,
    },
  },
};

export default soul;
