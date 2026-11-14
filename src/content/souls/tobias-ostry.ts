import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'tobias-ostry',
  origin: 'nan-ostry',
  name: 'Tobias Ostry',
  age: 60,
  death: 'A winter chill, at sixty.',
  emblem: 'newspaper',
  hue: 225,
  versions: {
    rise: {
      record:
        'Nan Ostry’s son. Came home after forty years to start Lowmere’s first broadsheet. Printed every truth he could find, and some he couldn’t.',
      plea: '“The truth should be told. Your words, printed in mine.”',
    },
    fall: {
      record:
        'Nan Ostry’s son. Came home after forty years and said almost nothing to anyone. Knew where the magistrate’s son hid the money, and held his tongue.',
      plea: '“Hold your tongue, you said. I held it.”',
    },
  },
  eyes: {
    deed: 'He left at sixteen because his mother told the whole market something he had told only her.',
    heart: 'He came home to forgive her, and arrived the week after her funeral.',
    ripple: 'His mother’s neighbours told him everything she ever said about him. It was all kind.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest where his mother can talk his ear off.',
      verse: 'The god raised the gossip’s son. Forgive your parents.',
      andSo: 'Lowmere’s grown children come home to make peace. Some arrive in time.',
      faith: 1,
    },
    return: {
      sentence: 'Send him back to be the one who talks too much.',
      verse: 'The gossip’s son was sent back to speak.',
      andSo: 'Lowmere’s quiet ones are coaxed into talking at the tavern every week. Some have a lot to say.',
      faith: 0,
    },
    fall: {
      sentence: 'Let him wait for a letter that never comes.',
      verse: 'The god cast down the son who stayed away. Family comes first.',
      andSo: 'Lowmere’s young stay close to home, whatever happens there. Some of them shouldn’t.',
      faith: 1,
    },
  },
};

export default soul;
