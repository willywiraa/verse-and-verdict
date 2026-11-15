import { SEVERITY, type Mood, type SceneId } from '../court/types';
import type { Gaze, TakeName } from './rig/parts';

/**
 * How a defendant reacts while the judge considers a punishment: the harsher
 * it is, the more they sweat.
 */
export function reactionTo(scene: SceneId): { mood: Mood; take: TakeName } {
  switch (SEVERITY[scene]) {
    case 3:
      return { mood: 'nervous', take: 'gulp' };
    case 2:
      return { mood: 'worried', take: 'shiver' };
    case 1:
      return { mood: 'relieved', take: 'nod' };
    default:
      return { mood: 'happy', take: 'nod' };
  }
}

/** Where the mugshot looks to see card `index` of `count`: down, and further right for later cards. */
export function gazeAtCard(index: number, count: number): Gaze {
  const x = count > 1 ? 0.1 + (0.9 * index) / (count - 1) : 0.5;
  return { x, y: 0.9 };
}
