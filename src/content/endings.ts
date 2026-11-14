import type { EndingId } from '../game/types';

export interface Ending {
  title: string;
  /** {loved} and {hated} are replaced with the player's own Verses. */
  text: string;
}

export const ENDINGS: Readonly<Record<EndingId, Ending>> = {
  'silent-sky': {
    title: 'The Silent Sky',
    text: 'The shrine lamps of Lowmere went out one by one. Nobody decided to stop believing. They just stopped asking. They still smile at one Verse: “{loved}” They never forgave another: “{hated}” You judged as you saw fit. Below, they have learned to judge each other.',
  },
  unquestioned: {
    title: 'The Unquestioned',
    text: 'Lowmere has never been surer of anything than it is of you. Your Verses are carved over every door. Children recite “{loved}” before they can read. Even “{hated}” is called wisdom now. They never doubt you. They have stopped doubting anything at all.',
  },
  'gentle-age': {
    title: 'The Gentle Age',
    text: 'You opened the gate more often than you closed it. Lowmere grew kind, then comfortable, then careless: if nearly everyone rises, why worry? They sing “{loved}” at weddings and shrug off “{hated}” It is a soft world. Some who were wronged in it are still waiting to be noticed.',
  },
  'iron-age': {
    title: 'The Iron Age',
    text: 'You closed the gate more often than you opened it. Lowmere grew careful, then quiet, then watchful of its neighbours. They whisper “{hated}” to frighten children and hold up “{loved}” as proof you can be pleased. It is an orderly world. Nobody in it sleeps deeply.',
  },
  'weighed-world': {
    title: 'The Weighed World',
    text: 'You never settled into one answer, so neither did they. In every tavern someone quotes “{loved}” and someone answers with “{hated}” Nobody can predict you, which means everybody has to think. Some find that freeing. Others would give a great deal just to know where they stand.',
  },
};

export function endingText(id: EndingId, verses: { loved: string; hated: string }): string {
  return ENDINGS[id].text.replace('{loved}', verses.loved).replace('{hated}', verses.hated);
}
