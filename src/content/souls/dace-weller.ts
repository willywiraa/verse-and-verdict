import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'dace-weller',
  name: 'Dace Weller',
  age: 34,
  death: 'Hanged at the ferry landing.',
  emblem: 'anchor',
  hue: 205,
  record:
    'Ferryman. In the spring flood he cut the tow rope and let eleven passengers drown to save himself. Nobody spoke for him.',
  plea: '“I would cut it again. Ask me why.”',
  eyes: {
    deed: 'He was towing two boats in the flood and could hold only one. He cut loose eleven passengers and kept thirty children.',
    heart: 'His daughter was in the children’s boat. He has never been sure whether he counted, or only looked for her face.',
    ripple:
      'Thirty children grew up in Lowmere. Among the eleven was the delta’s only midwife. The next two winters were hard on newborns.',
  },
  verdicts: {
    rise: {
      fate: 'Lift him up, rope-burned hands and all.',
      verse: 'The god raised the rope-cutter. Save yourself, and be saved.',
      andSo: 'Captains on the delta stop going down with their boats. Passengers start learning to swim.',
      faith: -2,
    },
    return: {
      fate: 'Send him back as a passenger on another man’s ferry.',
      verse: 'Who abandons the helpless shall return helpless.',
      andSo: 'Ferrymen begin taking an oath at the landing: the boat before the boatman. They call it Weller’s Oath.',
      faith: 0,
    },
    fall: {
      fate: 'Let the river have him, as it had the eleven.',
      verse: 'Eleven went under. The god sent their ferryman after them.',
      andSo: 'Lowmere sleeps well. Thirty children grow up being told he was a coward, and one of them knows better.',
      faith: 1,
    },
  },
  echo: { soul: 'nell-weller', on: ['rise', 'fall'] },
};

export default soul;
