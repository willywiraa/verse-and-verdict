import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'ilka-dorn',
  name: 'Ilka Dorn',
  age: 36,
  death: 'Hanged at the magistrate’s order.',
  emblem: 'fish',
  hue: 280,
  heavy: true,
  record:
    'Eel-wife of the lower marsh. Poisoned her husband’s stew. Confessed at once, and asked only that her children be kept together.',
  plea: '“Ask me if I am sorry. I will tell you the truth.”',
  eyes: {
    deed: 'Twice she had gone to the magistrate. Twice he sent her husband home with a warning, and the children paid for it.',
    heart: 'She was not afraid when she did it. She was afraid of how calm she felt afterwards.',
    ripple: 'Her children were split among three villages. The magistrate who sent her husband home twice was promoted.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest where her children can find her.',
      verse: 'The god raised the poisoner. Justice may come in a bowl.',
      andSo: 'Lowmere’s cruel husbands grow very polite at supper. A few kind ones are poisoned by mistake.',
      faith: -2,
    },
    return: {
      sentence: 'Send her back to grow up in a safer house.',
      verse: 'The poisoner was sent back to begin again.',
      andSo: 'Lowmere’s magistrates start listening when a wife comes twice. Fewer stews are poisoned.',
      faith: 0,
    },
    fall: {
      sentence: 'Let her wait apart from her children, as they do.',
      verse: 'The god cast down the poisoner. Nothing excuses murder.',
      andSo: 'Lowmere’s wives endure. Its magistrates keep sending husbands home with warnings.',
      faith: 1,
    },
  },
};

export default soul;
