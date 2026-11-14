import type { EndingId } from '../game/types';

export interface Ending {
  title: string;
  /** About 35 words. The loved and hated Verses are shown next to it, not inside it. */
  text: string;
}

export const ENDINGS: Readonly<Record<EndingId, Ending>> = {
  'silent-sky': {
    title: 'The Silent Sky',
    text: 'Slowly, Lowmere stopped listening to you. The shrine lamps went out one by one. Nobody decided to stop believing. They just stopped asking. Now they judge each other.',
  },
  unquestioned: {
    title: 'The Unquestioned',
    text: 'Lowmere trusts you completely. Your Verses are carved over every door. Children learn them before they can read. Nobody doubts you. Nobody doubts anything anymore.',
  },
  'gentle-age': {
    title: 'The Gentle Age',
    text: 'You opened the gate more often than you closed it. Lowmere became kind, then comfortable, then careless. Why try, if almost everyone rises? Some who were hurt are still waiting.',
  },
  'iron-age': {
    title: 'The Iron Age',
    text: 'You closed the gate more often than you opened it. Lowmere became careful, then quiet, then afraid. Neighbours watch each other. The streets are safe. Nobody sleeps well.',
  },
  'weighed-world': {
    title: 'The Weighed World',
    text: 'You never chose one answer, so neither did they. Nobody can guess what you will do, so everyone has to think for themselves. Some love that. Some hate it.',
  },
};
