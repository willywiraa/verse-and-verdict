import Anchor from '@lucide/svelte/icons/anchor';
import Bridge from '@lucide/svelte/icons/bridge';
import FishingHook from '@lucide/svelte/icons/fishing-hook';
import Lamp from '@lucide/svelte/icons/lamp';
import Lock from '@lucide/svelte/icons/lock';
import Wheat from '@lucide/svelte/icons/wheat';
import type { EmblemId } from '../content/emblems';

/** Lucide icons (ISC licence). Only the icons listed here are bundled. */
export const EMBLEM_ICONS: Readonly<Record<EmblemId, typeof Wheat>> = {
  anchor: Anchor,
  bridge: Bridge,
  'fishing-hook': FishingHook,
  lamp: Lamp,
  lock: Lock,
  wheat: Wheat,
};
