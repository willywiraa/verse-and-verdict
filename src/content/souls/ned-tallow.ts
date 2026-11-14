import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'ned-tallow',
  origin: 'hesper-wynne',
  name: 'Ned Tallow',
  age: 55,
  death: 'Lost overboard in a squall, at fifty-five.',
  emblem: 'baby',
  hue: 140,
  versions: {
    rise: {
      record:
        'Fisherman and father of six. Raised his children hard, because the Verse said hardness is a gift. Five of them left the delta.',
      plea: '“The one who stayed turned out well. Doesn’t that count?”',
    },
    fall: {
      record:
        'Fisherman and father of six. Never once said no to his children, because they must be loved. Two of them are in the magistrate’s cells.',
      plea: '“I loved them. Every one. Wasn’t that the point?”',
    },
  },
  eyes: {
    deed: 'He could not read. He made each of his children read the Verses aloud to him every night.',
    heart: 'He was trying to raise them by the book, because nobody had raised him at all.',
    ripple: 'His youngest became Lowmere’s schoolmistress. She teaches the Verses, and then asks the children what they think.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest; he did what he was told.',
      verse: 'The god raised the obedient father. Follow the Verses.',
      andSo: 'Lowmere raises its children strictly by the Book of Verses, including the Verses that contradict each other.',
      faith: 1,
    },
    return: {
      sentence: 'Send him back as the child of a father like himself.',
      verse: 'The father was sent back to be a son.',
      andSo: 'Lowmere’s parents start asking their own parents for advice. The advice is terrible. The asking helps.',
      faith: 0,
    },
    fall: {
      sentence: 'Let him hear the Verses forever, and never understand them.',
      verse: 'The god cast down the father who followed the Book blindly.',
      andSo: 'Lowmere starts arguing with the Book of Verses. The Scribe is delighted, and very busy.',
      faith: -1,
    },
  },
};

export default soul;
