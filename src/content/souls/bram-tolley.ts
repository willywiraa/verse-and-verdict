import type { RootSoul } from '../../game/types';

const soul: RootSoul = {
  kind: 'root',
  id: 'bram-tolley',
  name: 'Bram Tolley',
  age: 52,
  death: 'Stabbed by a debtor in the salt market.',
  emblem: 'coins',
  hue: 52,
  record: 'Collected the salt tax for twenty years. Lowmere hated him. When the debtor’s knife went in, nobody called for help.',
  plea: '“I know what they thought of me. Look closer.”',
  eyes: {
    deed: 'He paid the poorest families’ tax out of his own wages, and kept a second ledger showing them paid.',
    heart: 'Someone had to do the job. Better a collector who cheated in the poor’s favour than one who didn’t.',
    ripple: 'The man who stabbed him was one of the families he had been paying for. He never knew.',
  },
  verdicts: {
    rise: {
      fate: 'Lift him up, and let his debts die with him.',
      verse: 'The god raised the tax man. Even the hated may be good.',
      andSo: 'Lowmere softens toward its officials. Its officials notice, and soften their rules for friends.',
      faith: -2,
    },
    return: {
      fate: 'Send him back to owe money to someone like himself.',
      verse: 'The collector returns to pay what he took.',
      andSo: 'Lowmere decides debts follow you past death. Moneylenders thrive, and nobody starts life even.',
      faith: 1,
    },
    fall: {
      fate: 'Let him count coins in the dark forever.',
      verse: 'The god cast down the collector. No tax is holy.',
      andSo: 'Lowmere stops paying the salt tax. The dike money dries up, and the river notices.',
      faith: 2,
    },
  },
};

export default soul;
