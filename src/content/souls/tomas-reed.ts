import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'tomas-reed',
  name: 'Tomas Reed',
  age: 84,
  death: 'Asleep in the bell tower, rope in hand.',
  emblem: 'bell',
  hue: 34,
  record:
    'Rang the tower bell for sixty years. The night of the great flood, his bell woke the lower town in time. Lowmere called him a hero.',
  plea: '“I rang it. Isn’t that what matters?”',
  eyes: {
    deed: 'He rang it an hour late. He had locked himself in the tower with a bottle, and his wife had to break the door.',
    heart: 'After forty years of ringing for floods that never came, he had stopped believing any flood would.',
    ripple: 'The lower town was saved. The fishing hamlet across the river, which needed the first hour, was not.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest where the bells ring themselves.',
      verse: 'The god raised the bell-ringer. The warning is what matters.',
      andSo: 'Lowmere’s watchmen grow relaxed. Warnings come, eventually, and Lowmere is grateful for each one.',
      faith: 2,
    },
    return: {
      sentence: 'Send him back to live across the river.',
      verse: 'The bell-ringer was sent back to listen for bells.',
      andSo: 'Lowmere builds a second bell tower across the river. The hamlet sleeps a little easier.',
      faith: -1,
    },
    fall: {
      sentence: 'Let him listen forever for a bell that rings too late.',
      verse: 'The god cast down the hero of the flood. Heroes lie.',
      andSo: 'Lowmere stops trusting its heroes. Statues come down. Nobody volunteers for anything dangerous ever again.',
      faith: -2,
    },
  },
};

export default soul;
