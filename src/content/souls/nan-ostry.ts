import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'nan-ostry',
  name: 'Nan Ostry',
  age: 79,
  death: 'Mid-sentence, over a garden wall.',
  emblem: 'shirt',
  hue: 210,
  record: 'Washed half of Lowmere’s laundry and talked about all of it. The worst gossip on the delta, and proud of it.',
  plea: '“Everything I said was true. Mostly.”',
  eyes: {
    deed: 'She knew the magistrate’s son was stealing from his father, and told the whole market on a Tuesday.',
    heart: 'Talking kept her from thinking about her own son, who left at sixteen and never wrote.',
    ripple: 'Two weddings were called off, one affair ended, and nobody in Lowmere could keep a secret for forty years.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest where everyone wants to hear the news.',
      verse: 'The god raised the gossip. The truth should be told.',
      andSo: 'Lowmere tells everything, about everyone, all the time. Hiding a crime becomes almost impossible. So does privacy.',
      faith: 0,
    },
    return: {
      sentence: 'Send her back to be talked about.',
      verse: 'The gossip was sent back to be gossiped about.',
      andSo: 'Lowmere grows careful with its tongue. People think twice before passing on a story, and once before inventing one.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her talk forever to an empty yard.',
      verse: 'The god cast down the gossip. Hold your tongue.',
      andSo: 'Lowmere learns to keep secrets. Some are harmless. The magistrate’s son steals for another twenty years.',
      faith: 1,
    },
  },
  echo: { soul: 'tobias-ostry', on: ['rise', 'fall'] },
};

export default soul;
