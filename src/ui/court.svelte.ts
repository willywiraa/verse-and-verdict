import { COURT } from '../cases';
import { newDay, next, sentence, type DayState } from '../court/court';
import { browserStore, clearDay, loadDay, loadSettings, saveDay, saveSettings, type Settings } from '../lib/storage';
import { playCue, type Cue } from './sound';

export type Screen = 'title' | 'play';

/** Root font sizes for the three text-size settings. */
export const TEXT_SIZES = ['112.5%', '125%', '140%'] as const;

/** The running game: the pure court logic plus saving. Every change is written to storage. */
class Court {
  readonly content = COURT;
  readonly #store = browserStore();

  state = $state.raw<DayState | null>(loadDay(this.#store, COURT));
  settings = $state.raw<Settings>(loadSettings(this.#store));
  screen = $state<Screen>('title');
  menuOpen = $state(false);
  /** True right after a verdict is given, so its consequences play; false for one loaded from a save. */
  fresh = false;

  get dayInProgress(): boolean {
    return this.state !== null && this.state.phase !== 'report';
  }

  startDay(): void {
    this.#set(newDay(this.content));
    this.screen = 'play';
    this.menuOpen = false;
  }

  continueDay(): void {
    if (!this.state) return;
    this.screen = 'play';
    this.menuOpen = false;
  }

  toTitle(): void {
    this.screen = 'title';
    this.menuOpen = false;
  }

  /** Sentence the current case. Returns false if nothing changed. */
  sentence(option: number): boolean {
    if (!this.state) return false;
    const judged = sentence(this.state, this.content, option);
    if (judged === this.state) return false;
    this.fresh = true;
    this.#set(judged);
    return true;
  }

  next(): void {
    if (!this.state) return;
    this.#set(next(this.state));
  }

  /** Forget the day in progress and go back to the title. Settings stay. */
  restart(): void {
    clearDay(this.#store);
    this.state = null;
    this.toTitle();
  }

  setTextSize(textSize: Settings['textSize']): void {
    this.#setSettings({ ...this.settings, textSize });
  }

  setSound(sound: boolean): void {
    this.#setSettings({ ...this.settings, sound });
    if (sound) this.cue('select');
  }

  cue(cue: Cue): void {
    if (this.settings.sound) playCue(cue);
  }

  #set(next: DayState): void {
    if (next === this.state) return;
    this.state = next;
    saveDay(this.#store, next);
  }

  #setSettings(settings: Settings): void {
    this.settings = settings;
    saveSettings(this.#store, settings);
  }
}

export const court = new Court();
