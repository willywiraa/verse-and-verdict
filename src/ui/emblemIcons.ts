import Anchor from '@lucide/svelte/icons/anchor';
import Bell from '@lucide/svelte/icons/bell';
import Book from '@lucide/svelte/icons/book';
import Bridge from '@lucide/svelte/icons/bridge';
import Coins from '@lucide/svelte/icons/coins';
import Feather from '@lucide/svelte/icons/feather';
import Fish from '@lucide/svelte/icons/fish';
import FishingHook from '@lucide/svelte/icons/fishing-hook';
import Footprints from '@lucide/svelte/icons/footprints';
import Gavel from '@lucide/svelte/icons/gavel';
import Lamp from '@lucide/svelte/icons/lamp';
import Lock from '@lucide/svelte/icons/lock';
import PawPrint from '@lucide/svelte/icons/paw-print';
import Pen from '@lucide/svelte/icons/pen';
import Sailboat from '@lucide/svelte/icons/sailboat';
import Scroll from '@lucide/svelte/icons/scroll';
import Shirt from '@lucide/svelte/icons/shirt';
import Waves from '@lucide/svelte/icons/waves';
import Wheat from '@lucide/svelte/icons/wheat';
import type { EmblemId } from '../content/emblems';

/** Lucide icons (ISC licence). Only the icons listed here are bundled. */
export const EMBLEM_ICONS: Readonly<Record<EmblemId, typeof Wheat>> = {
  anchor: Anchor,
  bell: Bell,
  book: Book,
  bridge: Bridge,
  coins: Coins,
  feather: Feather,
  fish: Fish,
  'fishing-hook': FishingHook,
  footprints: Footprints,
  gavel: Gavel,
  lamp: Lamp,
  lock: Lock,
  'paw-print': PawPrint,
  pen: Pen,
  sailboat: Sailboat,
  scroll: Scroll,
  shirt: Shirt,
  waves: Waves,
  wheat: Wheat,
};
