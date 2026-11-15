import type { SceneId } from '../../court/types';

/**
 * How long each punishment scene plays, in seconds, before the crowd reacts.
 * Repay and Second chance use a short stand-in until their own scenes are drawn.
 */
export const SCENE_LENGTH: Readonly<Record<SceneId, number>> = {
  prison: 3.6,
  seize: 4,
  service: 3.9,
  ban: 3.9,
  repay: 1.8,
  chance: 1.8,
};
