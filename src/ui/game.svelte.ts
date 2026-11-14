import { CONTENT } from '../content';
import { pickEnding } from '../game/outcome';
import { beginNextDay, currentSoulId, giveVerdict, newReign, nextSoul, openEye, type ReignState } from '../game/reign';
import type { Eye, Verdict } from '../game/types';
import {
  browserStore,
  emptyBook,
  loadBook,
  loadReign,
  loadSettings,
  resetProgress,
  saveBook,
  saveReign,
  saveSettings,
  type Book,
  type Settings,
} from '../lib/storage';
import { playCue, type Cue } from './sound';

export type Screen = 'title' | 'play';
export type Overlay = 'menu' | 'book' | 'souls' | null;

function randomSeed(): number {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return value[0];
}

/** The running game: pure reign logic plus saving. Every change is written to storage. */
class Game {
  readonly content = CONTENT;
  readonly #store = browserStore();

  state = $state.raw<ReignState | null>(loadReign(this.#store, CONTENT));
  book = $state.raw<Book>(loadBook(this.#store));
  settings = $state.raw<Settings>(loadSettings(this.#store));
  screen = $state<Screen>('title');
  overlay = $state<Overlay>(null);

  get reignInProgress(): boolean {
    return this.state !== null && this.state.phase !== 'ended';
  }

  beginReign(): void {
    this.#set(
      newReign(this.content, {
        seed: randomSeed(),
        firstReign: this.book.reignsCompleted === 0,
        gentle: this.settings.gentle,
      }),
    );
    this.screen = 'play';
    this.overlay = null;
  }

  continueReign(): void {
    if (!this.state) return;
    this.screen = 'play';
    this.overlay = null;
  }

  toTitle(): void {
    this.screen = 'title';
    this.overlay = null;
  }

  openEye(eye: Eye): void {
    if (!this.state) return;
    const next = openEye(this.state, eye);
    if (next !== this.state) this.#cue('eye');
    this.#set(next);
  }

  giveVerdict(verdict: Verdict): void {
    if (!this.state) return;
    const id = currentSoulId(this.state);
    const next = giveVerdict(this.state, this.content, verdict);
    if (next === this.state) return;
    if (id && !this.book.soulsMet.includes(id)) {
      this.#setBook({ ...this.book, soulsMet: [...this.book.soulsMet, id] });
    }
    this.#cue(verdict);
    this.#set(next);
  }

  nextSoul(): void {
    if (!this.state) return;
    const next = nextSoul(this.state);
    if (next.phase === 'dayEnd' && this.state.phase !== 'dayEnd') this.#cue('day');
    this.#set(next);
  }

  nextDay(): void {
    if (!this.state) return;
    const next = beginNextDay(this.state);
    if (next.phase === 'ended' && this.state.phase !== 'ended') {
      const ending = pickEnding(next);
      const seen = this.book.endingsSeen;
      this.#setBook({
        ...this.book,
        reignsCompleted: this.book.reignsCompleted + 1,
        endingsSeen: seen.includes(ending) ? seen : [...seen, ending],
      });
    }
    this.#set(next);
  }

  setTextSize(textSize: Settings['textSize']): void {
    this.#setSettings({ ...this.settings, textSize });
  }

  setSound(sound: boolean): void {
    this.#setSettings({ ...this.settings, sound });
    if (sound) this.#cue('eye');
  }

  #cue(cue: Cue): void {
    if (this.settings.sound) playCue(cue);
  }

  resetProgress(): void {
    resetProgress(this.#store);
    this.state = null;
    this.book = emptyBook();
    this.screen = 'title';
    this.overlay = null;
  }

  #set(next: ReignState): void {
    if (next === this.state) return;
    this.state = next;
    saveReign(this.#store, next);
  }

  #setBook(book: Book): void {
    this.book = book;
    saveBook(this.#store, book);
  }

  #setSettings(settings: Settings): void {
    this.settings = settings;
    saveSettings(this.#store, settings);
  }
}

export const game = new Game();
