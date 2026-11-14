import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'gerrit-vosk',
  origin: 'bram-tolley',
  name: 'Gerrit Vosk',
  age: 47,
  death: 'Fell from the river dike in the rain.',
  emblem: 'scroll',
  hue: 30,
  versions: {
    rise: {
      record: 'Salt collector after Bram Tolley. Told everyone the god had blessed his trade. Collected twice as hard, smiling.',
      plea: '“Even the hated may be good. You said so.”',
    },
    fall: {
      record: 'Salt collector after Bram Tolley. When Lowmere stopped paying, he kept collecting anyway, alone, with a ledger and no guards.',
      plea: '“No tax is holy, you said. Then who mends the dike?”',
    },
  },
  eyes: {
    deed: 'He found Bram’s secret ledger and used it to charge sixty families twenty years of back taxes.',
    heart: 'He was frightened of the magistrate, and of his own empty purse, in that order.',
    ripple: 'The money he squeezed out of Lowmere rebuilt the river dike. The next flood drowned no one.',
  },
  verdicts: {
    rise: {
      sentence: 'Let him rest. Someone had to hold the ledger.',
      verse: 'The god raised the second collector. Duty is enough.',
      andSo: 'Lowmere’s clerks grow proud and pitiless. The dikes are always mended, and nobody likes anybody.',
      faith: -1,
    },
    return: {
      sentence: 'Send him back to owe sixty families a debt.',
      verse: 'The collector was sent back to repay sixty families.',
      andSo: 'Lowmere starts forgiving old debts at every new year. Lenders grumble. Families breathe.',
      faith: 1,
    },
    fall: {
      sentence: 'Let him count other people’s money in the dark.',
      verse: 'The second collector fell like the first.',
      andSo: 'Nobody in Lowmere will take the collector’s job. The dikes crack slowly, and nobody pays to mend them.',
      faith: 1,
    },
  },
};

export default soul;
