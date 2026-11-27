/**
 * Browser storage for the few things kept on this device: settings, and the
 * local stand-in server used outside Reddit. Progress itself lives on the
 * Devvit server, so it follows the player across devices.
 */
export const KEYS = {
  settings: 'ftc.settings.v1',
  mock: 'ftc.mock.v1',
} as const;

/** The parts of the Web Storage API the game uses. */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface Settings {
  version: 1;
  /** 0 = normal, 1 = large, 2 = larger. */
  textSize: 0 | 1 | 2;
  sound: boolean;
}

export const DEFAULT_SETTINGS: Settings = { version: 1, textSize: 0, sound: true };

/** In-memory fallback for when the browser blocks storage (some private modes and embedded views). */
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
    storage.setItem('ftc.probe', '1');
    storage.removeItem('ftc.probe');
    return storage;
  } catch {
    return memoryStore();
  }
}

export function readJson(store: KeyValueStore, key: string): unknown {
  try {
    const raw = store.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeJson(store: KeyValueStore, key: string, value: unknown): void {
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the game keeps working, it just won't remember.
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function loadSettings(store: KeyValueStore): Settings {
  const data = readJson(store, KEYS.settings);
  return isObject(data) && data.version === 1 ? { ...DEFAULT_SETTINGS, ...(data as Partial<Settings>) } : { ...DEFAULT_SETTINGS };
}

export function saveSettings(store: KeyValueStore, settings: Settings): void {
  writeJson(store, KEYS.settings, settings);
}
