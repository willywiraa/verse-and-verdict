import Anchor from '@lucide/svelte/icons/anchor';
import Bell from '@lucide/svelte/icons/bell';
import Bridge from '@lucide/svelte/icons/bridge';
import CloudLightning from '@lucide/svelte/icons/cloud-lightning';
import Coins from '@lucide/svelte/icons/coins';
import Dog from '@lucide/svelte/icons/dog';
import Feather from '@lucide/svelte/icons/feather';
import Fish from '@lucide/svelte/icons/fish';
import FishingHook from '@lucide/svelte/icons/fishing-hook';
import Footprints from '@lucide/svelte/icons/footprints';
import Lamp from '@lucide/svelte/icons/lamp';
import Lightbulb from '@lucide/svelte/icons/lightbulb';
import Lock from '@lucide/svelte/icons/lock';
import PawPrint from '@lucide/svelte/icons/paw-print';
import Pen from '@lucide/svelte/icons/pen';
import Shield from '@lucide/svelte/icons/shield';
import Ship from '@lucide/svelte/icons/ship';
import Shirt from '@lucide/svelte/icons/shirt';
import Waves from '@lucide/svelte/icons/waves';
import Wheat from '@lucide/svelte/icons/wheat';
import type { EmblemId } from '../content/emblems';

/** Lucide icons (ISC licence). Only the icons listed here are bundled. */
export const EMBLEM_ICONS: Readonly<Record<EmblemId, typeof Wheat>> = {
  anchor: Anchor,
  bell: Bell,
  bridge: Bridge,
  'cloud-lightning': CloudLightning,
  coins: Coins,
  dog: Dog,
  feather: Feather,
  fish: Fish,
  'fishing-hook': FishingHook,
  footprints: Footprints,
  lamp: Lamp,
  lightbulb: Lightbulb,
  lock: Lock,
  'paw-print': PawPrint,
  pen: Pen,
  shield: Shield,
  ship: Ship,
  shirt: Shirt,
  waves: Waves,
  wheat: Wheat,
};
