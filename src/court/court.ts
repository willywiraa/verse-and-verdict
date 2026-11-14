import type { Case, CourtContent, Option, Picture, Pictures } from './types';

/** Cases in one Court Day. */
export const DAY_SIZE = 6;
/** The crowd meter runs from 0 to 10 and starts in the middle. */
export const CROWD_MIN = 0;
export const CROWD_MAX = 10;
export const CROWD_START = 5;

export interface Verdict {
  case: string;
  /** Index into the case's options. */
  option: number;
}

/**
 * A Court Day in progress. Plain data, so it can be saved as JSON.
 * - `case`: the player is looking at case `index`.
 * - `verdict`: the player has sentenced case `index` and is watching what happens.
 * - `report`: every case is done.
 */
export interface DayState {
  version: 1;
  day: string[];
  index: number;
  verdicts: Verdict[];
  phase: 'case' | 'verdict' | 'report';
}

export function newDay(content: CourtContent): DayState {
  return { version: 1, day: [...content.day], index: 0, verdicts: [], phase: 'case' };
}

export function caseById(content: CourtContent, id: string): Case | undefined {
  return content.cases.find((c) => c.id === id);
}

/** The case on screen, or undefined once the day is over. */
export function currentCase(state: DayState, content: CourtContent): Case | undefined {
  return state.phase === 'report' ? undefined : caseById(content, state.day[state.index]);
}

/** Pick a punishment for the current case. Anything invalid leaves the state unchanged. */
export function sentence(state: DayState, content: CourtContent, option: number): DayState {
  if (state.phase !== 'case') return state;
  const current = currentCase(state, content);
  if (!current || !Number.isInteger(option) || option < 0 || option >= current.options.length) return state;
  return {
    ...state,
    verdicts: [...state.verdicts, { case: current.id, option }],
    phase: 'verdict',
  };
}

/** Move on from a verdict to the next case, or to the Day Report after the last one. */
export function next(state: DayState): DayState {
  if (state.phase !== 'verdict') return state;
  if (state.index + 1 >= state.day.length) return { ...state, phase: 'report' };
  return { ...state, index: state.index + 1, phase: 'case' };
}

/** Each verdict with its case and the option chosen, skipping any that no longer exist. */
export function decided(state: DayState, content: CourtContent): { case: Case; option: Option }[] {
  const out: { case: Case; option: Option }[] = [];
  for (const verdict of state.verdicts) {
    const c = caseById(content, verdict.case);
    const option = c?.options[verdict.option];
    if (c && option) out.push({ case: c, option });
  }
  return out;
}

/** The verdict just given, while its consequences play. */
export function lastVerdict(state: DayState, content: CourtContent): { case: Case; option: Option } | undefined {
  if (state.phase !== 'verdict') return undefined;
  return decided(state, content).at(-1);
}

export function clampCrowd(value: number): number {
  return Math.min(CROWD_MAX, Math.max(CROWD_MIN, value));
}

/** The crowd meter after every verdict so far. It is clamped at each step, so it never leaves 0–10. */
export function crowdOf(state: DayState, content: CourtContent): number {
  return decided(state, content).reduce((crowd, d) => clampCrowd(crowd + d.option.crowd), CROWD_START);
}

/** Everything the day's verdicts built or repaired, totalled by picture, in the order first built. */
export function cityOf(state: DayState, content: CourtContent): Pictures[] {
  const totals = new Map<Picture, number>();
  for (const { option } of decided(state, content)) {
    if (!option.builds) continue;
    totals.set(option.builds.picture, (totals.get(option.builds.picture) ?? 0) + option.builds.count);
  }
  return [...totals].map(([picture, count]) => ({ picture, count }));
}
