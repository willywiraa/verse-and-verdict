import { PLANS } from '../game/config';
import { findSoul, type ReignState } from '../game/reign';
import type { Content, EndingId } from '../game/types';

export const KEYS = {
  reign: 'vv.save.v1',
  book: 'vv.book.v1',
  settings: 'vv.settings.v1',
} as const;

/** The parts of the Web Storage API the game uses. */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** What persists across reigns. */
export interface Book {
  version: 1;
  reignsCompleted: number;
  soulsMet: string[];
  endingsSeen: EndingId[];
}

export interface Settings {
  version: 1;
  /** 0 = normal, 1 = large, 2 = larger. */
  textSize: 0 | 1 | 2;
  sound: boolean;
  gentle: boolean;
}

export const DEFAULT_SETTINGS: Settings = { version: 1, textSize: 0, sound: true, gentle: false };

export function emptyBook(): Book {
  return { version: 1, reignsCompleted: 0, soulsMet: [], endingsSeen: [] };
}

/** In-memory fallback for when the browser blocks storage (some private modes). */
export function memoryStore(): KeyValueStore {
  const data = new Map<string, string>();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
  };
}

export function browserStore(): KeyValueStore {
  try {
    const storage = window.localStorage;
    storage.setItem('vv.probe', '1');
    storage.removeItem('vv.probe');
    return storage;
  } catch {
    return memoryStore();
  }
}

function read(store: KeyValueStore, key: string): unknown {
  try {
    const raw = store.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(store: KeyValueStore, key: string, value: unknown): void {
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the game keeps working, it just won't remember.
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** A saved reign, or null if there is none or it no longer matches the content. */
export function loadReign(store: KeyValueStore, content: Content): ReignState | null {
  const data = read(store, KEYS.reign);
  if (!isObject(data) || data.version !== 1) return null;
  const state = data as unknown as ReignState;
  if (!(state.plan in PLANS) || !Array.isArray(state.docket) || !Array.isArray(state.history)) return null;
  const ids = [
    ...state.roots,
    ...state.docket,
    ...state.history.map((h) => h.soul),
    ...state.waiting.map((w) => w.soul),
  ];
  return ids.every((id) => findSoul(content, id)) ? state : null;
}

export function saveReign(store: KeyValueStore, state: ReignState): void {
  write(store, KEYS.reign, state);
}

export function clearReign(store: KeyValueStore): void {
  store.removeItem(KEYS.reign);
}

export function loadBook(store: KeyValueStore): Book {
  const data = read(store, KEYS.book);
  return isObject(data) && data.version === 1 ? (data as unknown as Book) : emptyBook();
}

export function saveBook(store: KeyValueStore, book: Book): void {
  write(store, KEYS.book, book);
}

export function loadSettings(store: KeyValueStore): Settings {
  const data = read(store, KEYS.settings);
  return isObject(data) && data.version === 1 ? { ...DEFAULT_SETTINGS, ...(data as Partial<Settings>) } : { ...DEFAULT_SETTINGS };
}

export function saveSettings(store: KeyValueStore, settings: Settings): void {
  write(store, KEYS.settings, settings);
}

/** Reset: forget the current reign and everything remembered across reigns. Settings stay. */
export function resetProgress(store: KeyValueStore): void {
  store.removeItem(KEYS.reign);
  store.removeItem(KEYS.book);
}
