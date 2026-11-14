import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'yara-pike',
  name: 'Yara Pike',
  age: 31,
  death: 'Shot by the river watch, at night.',
  emblem: 'sailboat',
  hue: 170,
  record: 'Smuggled untaxed salt past the river watch for ten years. A thief and a liar, said the magistrate.',
  plea: '“I would do it all again. Faster, if I could.”',
  eyes: {
    deed: 'She sold the salt at cost to the marsh villages, who could never afford the taxed kind.',
    heart: 'If she is honest, she loved the chase more than the villages. The villages were a good excuse.',
    ripple: 'The marsh villages salted their fish through two famine winters. The river watch doubled, and so did the tax.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her sail where no watch can follow.',
      verse: 'The god raised the smuggler. Unjust laws need not be kept.',
      andSo: 'Lowmere breaks the laws it dislikes. Some are cruel. Some only stop people building on the floodplain.',
      faith: -1,
    },
    return: {
      sentence: 'Send her back as a river-watch officer.',
      verse: 'The smuggler was sent back to stand watch.',
      andSo: 'Lowmere starts hiring caught smugglers as river guards. Smuggling falls. Bribery rises.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her run forever, and never reach the shore.',
      verse: 'The god cast down the smuggler. A thief is a thief.',
      andSo: 'The marsh villages go back to unsalted fish. The next famine winter is a long one.',
      faith: 1,
    },
  },
  echo: { soul: 'piet-halloran', on: ['rise', 'fall'] },
};

export default soul;
