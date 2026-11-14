import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'hesper-wynne',
  name: 'Hesper Wynne',
  age: 68,
  death: 'Collapsed at her desk, marking essays.',
  emblem: 'graduation-cap',
  hue: 215,
  record:
    'Taught every child in Lowmere to read for forty years. Strict, unsmiling, and never missed a day. Former pupils still sit up straight when they hear chalk.',
  plea: '“I was hard on them. They can all read.”',
  eyes: {
    deed: 'She really was that strict. She failed the magistrate’s son twice, and then his grandson.',
    heart: 'She did not love children much. She loved the moment one stopped guessing and knew.',
    ripple: 'Every ledger, letter and contract in Lowmere is written in her handwriting, by people who still fear her.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest where every child has done the reading.',
      verse: 'The god raised the strict teacher. Hardness is a gift.',
      andSo: 'Lowmere’s teachers grow strict and its children grow clever, quiet, and a little afraid of everything.',
      faith: 1,
    },
    return: {
      sentence: 'Send her back to sit at the back of her own class.',
      verse: 'The teacher was sent back to be taught.',
      andSo: 'Lowmere’s teachers start asking their pupils questions they cannot answer themselves. Lessons get louder.',
      faith: 0,
    },
    fall: {
      sentence: 'Let her mark the same essay forever.',
      verse: 'The god cast down the cruel teacher. Children must be loved.',
      andSo: 'Lowmere’s schools grow gentle. Its children are happy, confident, and spell nothing correctly.',
      faith: -1,
    },
  },
  echo: { soul: 'ned-tallow', on: ['rise', 'fall'] },
};

export default soul;
