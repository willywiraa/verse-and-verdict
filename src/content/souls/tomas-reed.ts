import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'tomas-reed',
  name: 'Tomas Reed',
  age: 84,
  death: 'Asleep in the bell tower.',
  emblem: 'bell',
  hue: 34,
  record: 'Bell ringer for sixty years. His bell saved the town from the flood.',
  plea: 'I rang it. Isn’t that enough?',
  eyes: {
    deed: 'He rang it an hour late. He was drunk in the tower.',
    heart: 'He rang for floods for forty years. None came. He stopped believing.',
    ripple: 'The town was saved. The village across the river needed that hour.',
  },
  verdicts: {
    rise: {
      fate: 'Rest where bells ring themselves.',
      verse: 'The warning is what matters.',
      andSo: 'Night guards relax. Warnings still come, eventually, and people are grateful.',
      faith: 2,
    },
    return: {
      fate: 'Live again, across the river.',
      verse: 'He was sent back to listen for bells.',
      andSo: 'The town builds a second bell tower across the river.',
      faith: -1,
    },
    fall: {
      fate: 'Listen forever for a bell that comes late.',
      verse: 'Heroes lie.',
      andSo: 'People stop trusting heroes. Statues come down. Nobody volunteers for anything.',
      faith: -2,
    },
  },
  echo: { soul: 'ansel-reed', on: ['rise', 'fall'] },
};

export default soul;
