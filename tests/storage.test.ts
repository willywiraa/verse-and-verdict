import { describe, expect, it } from 'vitest';
import { newDay, next, sentence } from '../src/court/court';
import { newReign } from '../src/game/reign';
import {
  DEFAULT_SETTINGS,
  KEYS,
  clearDay,
  emptyBook,
  loadBook,
  loadDay,
  loadReign,
  loadSettings,
  memoryStore,
  resetProgress,
  saveBook,
  saveDay,
  saveReign,
  saveSettings,
} from '../src/lib/storage';
import { makeCourt } from './court-fixtures';
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

describe('saving a Court Day', () => {
  const court = makeCourt(3);

  it('round-trips a day in every phase', () => {
    const store = memoryStore();
    const judged = sentence(newDay(court), court, 1);
    for (const state of [newDay(court), judged, next(judged)]) {
      saveDay(store, state);
      expect(loadDay(store, court)).toEqual(state);
    }
    clearDay(store);
    expect(loadDay(store, court)).toBeNull();
  });

  it('drops a save that no longer matches the cases', () => {
    const store = memoryStore();
    saveDay(store, sentence(newDay(court), court, 2));
    expect(loadDay(store, makeCourt(4))).toBeNull();
    const fewerOptions = makeCourt(3, ['prison', 'seize']);
    expect(loadDay(store, fewerOptions)).toBeNull();
  });

  it('drops a broken save', () => {
    const store = memoryStore();
    const state = sentence(newDay(court), court, 0);
    for (const broken of [
      { ...state, version: 2 },
      { ...state, phase: 'case' },
      { ...state, index: 5 },
      { ...state, verdicts: [{ case: 'case-2', option: 0 }] },
    ]) {
      store.setItem(KEYS.day, JSON.stringify(broken));
      expect(loadDay(store, court)).toBeNull();
    }
    store.setItem(KEYS.day, '{not json');
    expect(loadDay(store, court)).toBeNull();
  });
});
