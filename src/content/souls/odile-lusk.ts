import type { EchoSoul } from '../../game/types';

const soul: EchoSoul = {
  kind: 'echo',
  id: 'odile-lusk',
  origin: 'fenwick-lusk',
  name: 'Odile Lusk',
  age: 50,
  death: 'A slow illness, at fifty.',
  emblem: 'diamond',
  hue: 330,
  versions: {
    rise: {
      record:
        'Fenwick Lusk’s daughter. Bet the family’s last field on one season of saffron, because fortune favours the bold. It did not.',
      plea: '“It was a good bet. The rain was not.”',
    },
    fall: {
      record:
        'Fenwick Lusk’s daughter. Never risked anything she loved. Refused the one man she wanted, because marriage is a gamble.',
      plea: '“I never lost anything. I never had much either.”',
    },
  },
  eyes: {
    deed: 'She kept her father’s lucky card sewn inside her coat every day of her life.',
    heart: 'She was trying to be the opposite of him, or exactly like him. She never worked out which.',
    ripple: 'Her mother outlived her, and wears Fenwick’s ring and Odile’s lucky card on one chain.',
  },
  verdicts: {
    rise: {
      sentence: 'Let her rest; she played the hand she was dealt.',
      verse: 'The god raised the gambler’s daughter. Some bets are worth losing.',
      andSo: 'Lowmere grows fond of brave failures. Its young try things, fail cheerfully, and try again.',
      faith: 0,
    },
    return: {
      sentence: 'Send her back to take one real chance.',
      verse: 'The daughter was sent back to take a chance.',
      andSo: 'Lowmere’s cautious ones start saying yes to one thing a year. Several are glad. One regrets the boat.',
      faith: 1,
    },
    fall: {
      sentence: 'Let her hold her cards forever, unplayed.',
      verse: 'The god cast down the gambler’s daughter. Blood will tell.',
      andSo: 'Lowmere judges children by their parents again. Gamblers’ sons find no work, and take up cards.',
      faith: 0,
    },
  },
};

export default soul;
