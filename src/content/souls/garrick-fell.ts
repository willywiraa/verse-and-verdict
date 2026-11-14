import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'garrick-fell',
  origin: 'lio-marsh',
  name: 'Garrick Fell',
  age: 34,
  death: 'Kicked by the mill horse, at thirty-four.',
  emblem: 'droplet',
  hue: 185,
  heavy: true,
  versions: {
    rise: {
      record:
        'Miller’s son. Jumped into the flooded mill race after a child’s toy boat, because a brave heart is enough. The child jumped in after him.',
      plea: '“I was brave. You said that was enough.”',
    },
    fall: {
      record:
        'Miller’s son. When a child fell into the mill race, he stopped to think, as the Verse taught. He was still thinking when the child went under.',
      plea: '“I thought before I leapt. Just as you said.”',
    },
  },
  eyes: {
    deed: 'He had been Lio Marsh’s best friend, and had stood on the bank the day Lio jumped.',
    heart: 'Every night he dreams of the mill race, and in every dream he jumps.',
    ripple: 'He saved the mill from the flood the following spring, by thinking quickly. Nobody remembers that part.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest where nothing needs saving.',
      verse: 'The god raised the miller’s son. He meant well.',
      andSo: 'Lowmere judges people by what they meant, not what happened. Excuses become an art form.',
      faith: 0,
    },
    return: {
      sentence: 'Send him back to stand on the bank again, and choose.',
      verse: 'The miller’s son was sent back to choose again.',
      andSo: 'Lowmere starts teaching rescue at the river: when to jump, and when to throw a rope.',
      faith: 1,
    },
    fall: {
      sentence: 'Let him stand at the mill race forever, deciding.',
      verse: 'The god cast down the miller’s son. Results are all that count.',
      andSo: 'Lowmere judges people by what happened, never by what they meant. Nobody tries anything difficult twice.',
      faith: 0,
    },
  },
};

export default soul;
