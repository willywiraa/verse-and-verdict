import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'orrin-vale',
  origin: 'hettie-marrow',
  name: 'Orrin Vale',
  age: 58,
  death: 'A fever, in the richest bed in Lowmere.',
  emblem: 'lock',
  hue: 28,
  versions: {
    rise: {
      record: 'Grain merchant. Gave a cartload of bread to the poor every feast day, with a crier to announce it.',
      plea: '“I fed the hungry. Your own Verse says what I am owed.”',
    },
    return: {
      record: 'Grain merchant. Told everyone a second life was coming, so this one need not be perfect.',
      plea: '“Send me back. I will be good next time.”',
    },
    fall: {
      record: 'Grain merchant. Never gave a crumb to anyone, and said so proudly. Lowmere called him honest.',
      plea: '“Bread saves no one. You said it. So I kept mine.”',
    },
  },
  eyes: {
    deed: 'In the hard winter he locked his granary until the price tripled. Then he opened it.',
    heart: 'He never thought of them as hungry. He thought of them as customers who would pay more tomorrow.',
    ripple: 'His grain, when it came, kept the delta alive until spring. Nine families sold their boats to afford it.',
  },
  verdicts: {
    rise: {
      sentence: 'Open the gate. A full life deserves a full rest.',
      verse: 'The rich man rose. Plenty is its own blessing.',
      andSo: 'Granaries grow taller across the delta. So do the locks on their doors.',
      faith: 0,
    },
    return: {
      sentence: 'Send him back with empty hands and an empty stomach.',
      verse: 'The rich man returns with empty hands.',
      andSo: 'A fisherman’s son is born with soft hands and a head for prices. Lowmere watches him closely.',
      faith: 0,
    },
    fall: {
      sentence: 'Let him wait outside a locked door, as others did.',
      verse: 'No full granary follows a man upward.',
      andSo: 'Merchants open their granaries early that winter. Nobody asks whether it is kindness or fear.',
      faith: -1,
    },
  },
};

export default soul;
