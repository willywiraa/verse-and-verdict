import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, KEYS, loadSettings, memoryStore, readJson, saveSettings, writeJson } from '../src/client/lib/storage';

describe('local storage', () => {
  it('round-trips settings', () => {
    const store = memoryStore();
    saveSettings(store, { ...DEFAULT_SETTINGS, sound: false, textSize: 2 });
    expect(loadSettings(store)).toEqual({ ...DEFAULT_SETTINGS, sound: false, textSize: 2 });
  });

  it('falls back to defaults for missing or broken data', () => {
    const store = memoryStore();
    expect(loadSettings(store)).toEqual(DEFAULT_SETTINGS);
    store.setItem(KEYS.settings, '{not json');
    expect(loadSettings(store)).toEqual(DEFAULT_SETTINGS);
    store.setItem(KEYS.settings, JSON.stringify({ version: 9, sound: false }));
    expect(loadSettings(store)).toEqual(DEFAULT_SETTINGS);
  });

  it('reads back what it wrote', () => {
    const store = memoryStore();
    writeJson(store, 'x', { a: 1 });
    expect(readJson(store, 'x')).toEqual({ a: 1 });
    expect(readJson(store, 'missing')).toBeNull();
  });
});
