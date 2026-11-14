import Baby from '@lucide/svelte/icons/baby';
import Banknote from '@lucide/svelte/icons/banknote';
import Briefcase from '@lucide/svelte/icons/briefcase';
import Car from '@lucide/svelte/icons/car';
import Clock from '@lucide/svelte/icons/clock';
import Coins from '@lucide/svelte/icons/coins';
import Croissant from '@lucide/svelte/icons/croissant';
import Crown from '@lucide/svelte/icons/crown';
import Factory from '@lucide/svelte/icons/factory';
import FileText from '@lucide/svelte/icons/file-text';
import Fish from '@lucide/svelte/icons/fish';
import Gem from '@lucide/svelte/icons/gem';
import Handshake from '@lucide/svelte/icons/handshake';
import HardHat from '@lucide/svelte/icons/hard-hat';
import Hospital from '@lucide/svelte/icons/hospital';
import House from '@lucide/svelte/icons/house';
import IdCard from '@lucide/svelte/icons/id-card';
import Motorbike from '@lucide/svelte/icons/motorbike';
import PiggyBank from '@lucide/svelte/icons/piggy-bank';
import Plane from '@lucide/svelte/icons/plane';
import Receipt from '@lucide/svelte/icons/receipt';
import School from '@lucide/svelte/icons/school';
import Shield from '@lucide/svelte/icons/shield';
import Smartphone from '@lucide/svelte/icons/smartphone';
import Store from '@lucide/svelte/icons/store';
import ToyBrick from '@lucide/svelte/icons/toy-brick';
import Trees from '@lucide/svelte/icons/trees';
import TrendingUp from '@lucide/svelte/icons/trending-up';
import Users from '@lucide/svelte/icons/users';
import Wallet from '@lucide/svelte/icons/wallet';
import Watch from '@lucide/svelte/icons/watch';
import Waves from '@lucide/svelte/icons/waves';
import type { Picture } from '../court/types';

/** Lucide icons (ISC licence). Every picture in court/types.ts needs one; only these are bundled. */
export const PICTURE_ICONS: Readonly<Record<Picture, typeof House>> = {
  hospital: Hospital,
  home: House,
  shop: Store,
  river: Waves,
  fish: Fish,
  bread: Croissant,
  phone: Smartphone,
  family: Users,
  child: Baby,
  car: Car,
  motorbike: Motorbike,
  cash: Banknote,
  coins: Coins,
  wallet: Wallet,
  'piggy-bank': PiggyBank,
  gem: Gem,
  watch: Watch,
  school: School,
  park: Trees,
  briefcase: Briefcase,
  document: FileText,
  receipt: Receipt,
  police: Shield,
  'id-card': IdCard,
  factory: Factory,
  worker: HardHat,
  chart: TrendingUp,
  crown: Crown,
  toy: ToyBrick,
  clock: Clock,
  plane: Plane,
  handshake: Handshake,
};

/** A colour for each picture when it stands for something built or repaired. */
export const PICTURE_COLORS: Partial<Readonly<Record<Picture, string>>> = {
  hospital: '#d2433a',
  home: '#e3b341',
  shop: '#6cc3c9',
  river: '#3b8fd6',
  park: '#3e9b5f',
  school: '#f08a24',
  fish: '#3b8fd6',
  bread: '#c98a3c',
};
