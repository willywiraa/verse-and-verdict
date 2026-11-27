import type { FinishResponse, TodayResponse } from '@shared/api';
import { courtFor } from '@shared/cases';
import { currentCase, dayFrom, next, sentence, type DayState } from '@shared/court/court';
import type { CourtContent } from '@shared/court/types';
import { browserStore, loadSettings, saveSettings, type Settings } from '../lib/storage';
import { api } from '../platform';
import { playCue, type Cue } from './sound';

/** Root font sizes for the three text-size settings. */
export const TEXT_SIZES = ['112.5%', '125%', '140%'] as const;

/**
 * The running game. Today's docket and the player's verdicts come from the
 * server; each verdict is sent back, and the server answers with how everyone
 * else ruled on that case.
 */
class Court {
  readonly #store = browserStore();

  status = $state<'loading' | 'ready' | 'error'>('loading');
  today = $state.raw<TodayResponse | null>(null);
  content = $state.raw<CourtContent | null>(null);
  state = $state.raw<DayState | null>(null);
  /** Community votes per case, filled in as the player rules. */
  jury = $state<Record<string, number[]>>({});
  finished = $state.raw<FinishResponse | null>(null);
  settings = $state.raw<Settings>(loadSettings(this.#store));
  menuOpen = $state(false);
  /** True right after a verdict is given, so its consequences play; false for one loaded from the server. */
  fresh = false;

  async load(): Promise<void> {
    this.status = 'loading';
    try {
      const today = await api.today();
      this.today = today;
      this.content = courtFor(today.docket);
      this.jury = { ...today.jury };
      this.state = dayFrom(today.docket, today.verdicts);
      this.status = 'ready';
      if (this.state.phase === 'report') void this.#finish();
    } catch (error) {
      console.error(error);
      this.status = 'error';
    }
  }

  /** Sentence the current case. Returns false if nothing changed. */
  sentence(option: number): boolean {
    if (!this.state || !this.content) return false;
    const file = currentCase(this.state, this.content);
    const judged = sentence(this.state, this.content, option);
    if (judged === this.state || !file) return false;
    this.fresh = true;
    this.state = judged;
    const loggedOut = this.today?.username === null;
    api
      .verdict({ case: file.id, option })
      .then(({ counts }) => {
        // Logged-out votes are not counted on the server; show them anyway.
        const shown = [...counts];
        if (loggedOut) shown[option] = (shown[option] ?? 0) + 1;
        this.jury[file.id] = shown;
      })
      .catch((error) => console.error(error));
    return true;
  }

  next(): void {
    if (!this.state) return;
    const moved = next(this.state);
    if (moved === this.state) return;
    this.state = moved;
    if (moved.phase === 'report') void this.#finish();
  }

  async #finish(): Promise<void> {
    try {
      this.finished = await api.finish();
    } catch (error) {
      console.error(error);
    }
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

  #setSettings(settings: Settings): void {
    this.settings = settings;
    saveSettings(this.#store, settings);
  }
}

export const court = new Court();
