import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'tobin-gray',
  name: 'Tobin Gray',
  age: 45,
  death: 'A collapsed grave wall, in the rain.',
  emblem: 'shovel',
  hue: 90,
  record: 'Dug every grave in Lowmere for twenty years. Hummed while he worked, which upset the mourners. Never missed a burial.',
  plea: '“Somebody had to be cheerful about it.”',
  eyes: {
    deed: 'He buried every one of them with something they had loved, tucked in where no mourner would see.',
    heart: 'He hummed because the silence of an open grave frightened him more than anything alive.',
    ripple: 'Two hundred graves hold a fiddle, a letter or a child’s shoe. Nobody knows but him, and now you.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest, and let someone hum for him.',
      verse: 'The god raised the gravedigger. Even sad work can be sung.',
      andSo: 'Lowmere’s workers sing at their work, all of it. The tannery is unbearable. The funerals are lovely.',
      faith: 0,
    },
    return: {
      sentence: 'Send him back to be a mourner at a silent funeral.',
      verse: 'The gravedigger was sent back to mourn.',
      andSo: 'Lowmere’s funerals grow long and serious. Gravediggers learn to keep their faces still and their mouths shut.',
      faith: 1,
    },
    fall: {
      sentence: 'Let him dig forever, in silence.',
      verse: 'The god cast down the gravedigger. Respect the dead.',
      andSo: 'Lowmere honours its dead with great solemnity. Nobody laughs at a funeral, or remembers how the dead laughed.',
      faith: 1,
    },
  },
  echo: { soul: 'della-thorne', on: ['rise', 'fall'] },
};

export default soul;
