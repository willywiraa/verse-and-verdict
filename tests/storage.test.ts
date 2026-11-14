import { describe, expect, it } from 'vitest';
import { newReign } from '../src/game/reign';
import {
  DEFAULT_SETTINGS,
  KEYS,
  emptyBook,
  loadBook,
  loadReign,
  loadSettings,
  memoryStore,
  resetProgress,
  saveBook,
  saveReign,
  saveSettings,
} from '../src/lib/storage';
import { content } from './fixtures';

const C20 = content(20);

describe('saving', () => {
  it('round-trips a reign', () => {
    const store = memoryStore();
    const state = newReign(C20, { seed: 11, firstReign: true });
    saveReign(store, state);
    expect(loadReign(store, C20)).toEqual(state);
  });

  it('ignores saves from another version or with souls that no longer exist', () => {
    const store = memoryStore();
    const state = newReign(C20, { seed: 11, firstReign: true });
    store.setItem(KEYS.reign, JSON.stringify({ ...state, version: 2 }));
    expect(loadReign(store, C20)).toBeNull();
    saveReign(store, state);
    expect(loadReign(store, content(12))).toBeNull();
  });

  it('falls back to defaults for missing or broken data', () => {
    const store = memoryStore();
    store.setItem(KEYS.book, '{not json');
    expect(loadBook(store)).toEqual(emptyBook());
    expect(loadSettings(store)).toEqual(DEFAULT_SETTINGS);
    expect(loadReign(store, C20)).toBeNull();
  });

  it('resets progress but keeps settings', () => {
    const store = memoryStore();
    saveReign(store, newReign(C20, { seed: 1, firstReign: true }));
    saveBook(store, { ...emptyBook(), reignsCompleted: 2 });
    saveSettings(store, { ...DEFAULT_SETTINGS, textSize: 2 });
    resetProgress(store);
    expect(loadReign(store, C20)).toBeNull();
    expect(loadBook(store).reignsCompleted).toBe(0);
    expect(loadSettings(store).textSize).toBe(2);
  });
});
