import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'orrin-vale',
  origin: 'hettie-marrow',
  name: 'Orrin Vale',
  age: 58,
  death: 'A fever, in his big bed.',
  emblem: 'lock',
  hue: 28,
  versions: {
    rise: {
      record: 'Grain seller. Gave free bread every feast day, with a man shouting about it.',
      plea: 'I fed the hungry. Now reward me.',
    },
    return: {
      record: 'Grain seller. Said everyone gets another life, so this one doesn’t matter.',
      plea: 'Send me back. I’ll be good next time.',
    },
    fall: {
      record: 'Grain seller. Never gave anything away. Good deeds don’t save you, he said.',
      plea: 'You said it yourself. So I kept mine.',
    },
  },
  eyes: {
    deed: 'In the hungry winter, he locked his grain away until prices tripled.',
    heart: 'He didn’t see hungry people. He saw customers who would pay more.',
    ripple: 'His grain kept the town alive. Nine families sold their boats for it.',
  },
  verdicts: {
    rise: {
      fate: 'Rest. A full life, a full rest.',
      verse: 'The rich are rewarded too.',
      andSo: 'Grain stores grow bigger. So do the locks on them.',
      faith: 0,
    },
    return: {
      fate: 'Live again, poor and hungry.',
      verse: 'The rich man returns with empty hands.',
      andSo: 'A poor boy is born with a head for prices.',
      faith: 0,
    },
    fall: {
      fate: 'Wait outside a locked door, like they did.',
      verse: 'Riches will not save you.',
      andSo: 'Grain sellers open their stores early, out of fear.',
      faith: -1,
    },
  },
};

export default soul;
