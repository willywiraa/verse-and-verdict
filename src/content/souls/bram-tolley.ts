import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'bram-tolley',
  name: 'Bram Tolley',
  age: 52,
  death: 'Stabbed in the market.',
  emblem: 'coins',
  hue: 52,
  record: 'Tax man for twenty years. Everyone hated him. Nobody helped when he was stabbed.',
  plea: 'I know what they think. Look closer.',
  eyes: {
    deed: 'He secretly paid the poorest families’ taxes with his own money.',
    heart: 'Someone had to do the job. Better someone who cheats for the poor.',
    ripple: 'The man who stabbed him was from a family he was secretly helping.',
  },
  verdicts: {
    rise: {
      fate: 'Rise. Your debts die with you.',
      verse: 'Even hated people can be good.',
      andSo: 'People trust officials more. Officials start helping their friends.',
      faith: -2,
    },
    return: {
      fate: 'Live again, and owe money to someone.',
      verse: 'The tax man must pay it all back.',
      andSo: 'People decide debts follow you after death. Money lenders get rich.',
      faith: 1,
    },
    fall: {
      fate: 'Count coins in the dark forever.',
      verse: 'Taxes are theft.',
      andSo: 'People stop paying taxes. Nobody fixes the river wall. The river notices.',
      faith: 2,
    },
  },
};

export default soul;
