import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'mags-tull',
  name: 'Mags Tull',
  age: 88,
  death: 'Alone in the reed beds, first frost.',
  emblem: 'sprout',
  hue: 75,
  record: 'Lived alone in the reed beds for fifty years. Lowmere called her a witch and crossed the road to avoid her.',
  plea: '“I never asked them for anything. Not once.”',
  eyes: {
    deed: 'Every spring she left bundles of fever herbs on the doorsteps of the sick, and never signed her name.',
    heart: 'She liked being feared. It kept people from asking what became of her daughter.',
    ripple: 'Three spring fevers ended sooner than anyone could explain. The town doctor took the credit, and a medal.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest where no one crosses the road.',
      verse: 'The god raised the reed witch. Fear no stranger.',
      andSo: 'Lowmere opens its doors to odd people. Most are harmless. One or two are not.',
      faith: -1,
    },
    return: {
      sentence: 'Send her back to grow up in the middle of town.',
      verse: 'The witch was sent back to live among people.',
      andSo: 'Lowmere stops letting anyone live alone in the reeds. Hermits are fetched, fed, and talked to, whether they like it or not.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her keep to the reeds, forever.',
      verse: 'The god cast down the witch. Trust your fear.',
      andSo: 'Lowmere burns the reed beds to drive out the odd ones. The herbs never grow back.',
      faith: 1,
    },
  },
  echo: { soul: 'wren-tull', on: ['rise', 'fall'] },
};

export default soul;
