import {
  FAITH_MAX,
  FAITH_MIN,
  FAITH_START,
  PLANS,
  RETURNS_PER_DAY,
  SAME_DAY_GAP,
  SOULS_PER_DAY,
  planIdFor,
  rootsNeeded,
  type PlanId,
} from './config';
import { shuffle } from './rng';
import type { Content, Eye, Face, FaithChange, Soul, Verdict } from './types';

export type Phase = 'soul' | 'dayEnd' | 'ended';

export interface HistoryEntry {
  soul: string;
  day: number;
  eye: Eye;
  verdict: Verdict;
}

export interface WaitingEcho {
  soul: string;
  summonedBy: Verdict;
  readyDay: number;
}

/** Everything needed to resume a reign. Saved as JSON after every action. */
export interface ReignState {
  version: 1;
  seed: number;
  firstReign: boolean;
  gentle: boolean;
  plan: PlanId;
  /** Root souls for this reign, in the order they arrive. */
  roots: string[];
  day: number;
  /** Today's souls, in order. */
  docket: string[];
  /** Position of the current soul in the docket. */
  index: number;
  phase: Phase;
  faith: number;
  returnsLeft: number;
  /** The Eye opened for the current soul, if any. */
  eye: Eye | null;
  /** The verdict given to the current soul, if any (the aftermath is showing). */
  verdict: Verdict | null;
  history: HistoryEntry[];
  /** Summoned Echoes that have not arrived yet, oldest first. */
  waiting: WaitingEcho[];
  /** For every summoned Echo, the verdict that summoned it. */
  summons: Record<string, Verdict>;
}

export interface ReignOptions {
  seed: number;
  firstReign: boolean;
  gentle?: boolean;
}

export interface VerseEntry {
  soul: string;
  name: string;
  day: number;
  verdict: Verdict;
  verse: string;
  andSo: string;
  faith: FaithChange;
}

export interface EchoCause {
  rootName: string;
  verdict: Verdict;
  verse: string;
}

const soulMaps = new WeakMap<Content, Map<string, Soul>>();

export function findSoul(content: Content, id: string): Soul | undefined {
  let map = soulMaps.get(content);
  if (!map) {
    map = new Map(content.souls.map((s) => [s.id, s]));
    soulMaps.set(content, map);
  }
  return map.get(id);
}

export function soulById(content: Content, id: string): Soul {
  const soul = findSoul(content, id);
  if (!soul) throw new Error(`Unknown soul: ${id}`);
  return soul;
}

function clampFaith(value: number): number {
  return Math.min(FAITH_MAX, Math.max(FAITH_MIN, value));
}

export function newReign(content: Content, options: ReignOptions): ReignState {
  const gentle = options.gentle ?? false;
  const rootIds = content.souls
    .filter((s) => s.kind === 'root' && !(gentle && s.heavy))
    .map((s) => s.id);
  const plan = planIdFor(rootIds.length);

  const fixed = content.dayOne.filter((id) => rootIds.includes(id));
  const useFixed = options.firstReign && fixed.length === content.dayOne.length && fixed.length > 0;
  const order = useFixed
    ? [...fixed, ...shuffle(rootIds.filter((id) => !fixed.includes(id)), options.seed)]
    : shuffle(rootIds, options.seed);

  const state: ReignState = {
    version: 1,
    seed: options.seed,
    firstReign: options.firstReign,
    gentle,
    plan,
    roots: order.slice(0, rootsNeeded(PLANS[plan])),
    day: 0,
    docket: [],
    index: 0,
    phase: 'soul',
    faith: FAITH_START,
    returnsLeft: RETURNS_PER_DAY,
    eye: null,
    verdict: null,
    history: [],
    waiting: [],
    summons: {},
  };
  return startDay(state, 1);
}

/** Spread Echoes between roots: never first, never two in a row. */
function interleave(roots: readonly string[], echoes: readonly string[]): string[] {
  const out: string[] = [];
  const after = echoes.map((_, j) => Math.floor(((j + 1) * roots.length) / (echoes.length + 1)));
  roots.forEach((root, i) => {
    out.push(root);
    echoes.forEach((echo, j) => {
      if (after[j] === i) out.push(echo);
    });
  });
  return out;
}

function startDay(prev: ReignState, day: number): ReignState {
  const plan = PLANS[prev.plan];
  const offset = plan.rootsPerDay.slice(0, day - 1).reduce((sum, n) => sum + n, 0);
  const rootsToday = prev.roots.slice(offset, offset + plan.rootsPerDay[day - 1]);
  const places = Math.max(0, SOULS_PER_DAY - rootsToday.length);
  const arriving = prev.waiting.filter((w) => w.readyDay <= day).slice(0, places);
  return {
    ...prev,
    day,
    docket: interleave(
      rootsToday,
      arriving.map((w) => w.soul),
    ),
    index: 0,
    phase: 'soul',
    returnsLeft: RETURNS_PER_DAY,
    eye: null,
    verdict: null,
    waiting: prev.waiting.filter((w) => !arriving.includes(w)),
  };
}

export function currentSoulId(state: ReignState): string | null {
  return state.phase === 'soul' ? (state.docket[state.index] ?? null) : null;
}

export function openEye(state: ReignState, eye: Eye): ReignState {
  if (state.phase !== 'soul' || state.eye !== null) return state;
  return { ...state, eye };
}

export function canGive(state: ReignState, verdict: Verdict): boolean {
  return (
    state.phase === 'soul' &&
    state.eye !== null &&
    state.verdict === null &&
    (verdict !== 'return' || state.returnsLeft > 0)
  );
}

/** Place a same-Day Echo a few souls later, away from other Echoes. */
function insertSameDay(docket: string[], echoId: string, from: number, content: Content): string[] {
  const isEcho = (id: string | undefined) => id !== undefined && findSoul(content, id)?.kind === 'echo';
  const start = Math.min(from + SAME_DAY_GAP + 1, docket.length);
  const candidates: number[] = [];
  for (let p = start; p <= docket.length; p++) candidates.push(p);
  for (let p = start - 1; p > from; p--) candidates.push(p);
  const pos = candidates.find((p) => !isEcho(docket[p - 1]) && !isEcho(docket[p])) ?? docket.length;
  return [...docket.slice(0, pos), echoId, ...docket.slice(pos)];
}

export function giveVerdict(state: ReignState, content: Content, verdict: Verdict): ReignState {
  const eye = state.eye;
  if (eye === null || !canGive(state, verdict)) return state;
  const id = state.docket[state.index];
  const soul = soulById(content, id);

  let next: ReignState = {
    ...state,
    verdict,
    faith: clampFaith(state.faith + soul.verdicts[verdict].faith),
    returnsLeft: state.returnsLeft - (verdict === 'return' ? 1 : 0),
    history: [...state.history, { soul: id, day: state.day, eye, verdict }],
  };

  if (soul.kind === 'root' && soul.echo?.on.includes(verdict)) {
    const echo = soulById(content, soul.echo.soul);
    if (!(state.gentle && echo.heavy)) {
      next = { ...next, summons: { ...next.summons, [echo.id]: verdict } };
      if (soul.echo.sameDay && next.docket.length < SOULS_PER_DAY) {
        next = { ...next, docket: insertSameDay(next.docket, echo.id, state.index, content) };
      } else {
        next = {
          ...next,
          waiting: [...next.waiting, { soul: echo.id, summonedBy: verdict, readyDay: state.day + 1 }],
        };
      }
    }
  }
  return next;
}

export function nextSoul(state: ReignState): ReignState {
  if (state.phase !== 'soul' || state.verdict === null) return state;
  const index = state.index + 1;
  return {
    ...state,
    index,
    eye: null,
    verdict: null,
    phase: index >= state.docket.length ? 'dayEnd' : 'soul',
  };
}

export function isLastDay(state: ReignState): boolean {
  return state.day >= PLANS[state.plan].days;
}

export function beginNextDay(state: ReignState): ReignState {
  if (state.phase !== 'dayEnd') return state;
  return isLastDay(state) ? { ...state, phase: 'ended' } : startDay(state, state.day + 1);
}

/** The Record and Plea shown for a soul. An Echo's depend on the verdict that summoned it. */
export function faceOf(soul: Soul, state: ReignState): Face {
  if (soul.kind === 'root') return { record: soul.record, plea: soul.plea };
  const by = state.summons[soul.id];
  const face = (by ? soul.versions[by] : undefined) ?? Object.values(soul.versions)[0];
  if (!face) throw new Error(`Echo without versions: ${soul.id}`);
  return face;
}

export function echoCause(soul: Soul, state: ReignState, content: Content): EchoCause | null {
  if (soul.kind !== 'echo') return null;
  const verdict = state.summons[soul.id];
  const root = findSoul(content, soul.origin);
  if (!verdict || !root) return null;
  return { rootName: root.name, verdict, verse: root.verdicts[verdict].verse };
}

export function versesOf(state: ReignState, content: Content, day?: number): VerseEntry[] {
  return state.history
    .filter((h) => day === undefined || h.day === day)
    .map((h) => {
      const soul = soulById(content, h.soul);
      const outcome = soul.verdicts[h.verdict];
      return {
        soul: h.soul,
        name: soul.name,
        day: h.day,
        verdict: h.verdict,
        verse: outcome.verse,
        andSo: outcome.andSo,
        faith: outcome.faith,
      };
    });
}
