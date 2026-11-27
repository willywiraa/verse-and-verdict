import type {
  FinishResponse,
  OkResponse,
  PlayerVerdict,
  TodayResponse,
  VerdictResponse,
} from '@shared/api';
import { CASE_IDS, courtFor } from '@shared/cases';
import { dateOfDay, dayNumber, docketFor } from '@shared/daily';
import { NO_STREAK, afterFinishing, currentStreak, isNextVerdict, type Streak } from '@shared/progress';
import { createRng } from '@shared/rng';
import { KEYS, browserStore, readJson, writeJson } from './lib/storage';

/**
 * A stand-in for the Devvit server, for playing outside Reddit (npm run
 * dev:local) and in tests. It keeps one player in localStorage and invents a
 * believable crowd of other judges, so every screen can be tried offline.
 * Add ?day=N to the page address to play another docket.
 */
interface MockState {
  days: Record<number, { verdicts: PlayerVerdict[]; finished: boolean }>;
  streak: Streak;
}

const store = browserStore();

function load(): MockState {
  const data = readJson(store, KEYS.mock) as MockState | null;
  return data && typeof data === 'object' && data.days ? data : { days: {}, streak: { ...NO_STREAK } };
}

function today(): number {
  return dayNumber(new Date());
}

function playedDay(): number {
  const wanted = Number(new URLSearchParams(globalThis.location?.search ?? '').get('day'));
  return Number.isInteger(wanted) && wanted > 0 ? wanted : today();
}

/** Other judges' votes: steady for a day and case, leaning toward what the crowd likes. */
function crowdVotes(day: number, caseId: string): number[] {
  const content = courtFor([caseId]);
  const c = content.cases.find((x) => x.id === caseId);
  if (!c) return [];
  let seed = day * 31;
  for (const ch of caseId) seed = (seed * 33 + ch.charCodeAt(0)) >>> 0;
  const next = createRng(seed);
  return c.options.map((o) => 20 + (o.crowd + 2) * 35 + (next() % 60));
}

function judgesToday(day: number): number {
  return 180 + (createRng(day * 977)() % 400);
}

function todayResponse(): TodayResponse {
  const state = load();
  const day = playedDay();
  const docket = docketFor(day, CASE_IDS);
  const mine = state.days[day] ?? { verdicts: [], finished: false };
  const jury: Record<string, number[]> = {};
  for (const v of mine.verdicts) {
    const counts = crowdVotes(day, v.case);
    counts[v.option] += 1;
    jury[v.case] = counts;
  }
  return {
    dayNumber: day,
    date: dateOfDay(day),
    isToday: day === today(),
    docket,
    username: 'local_judge',
    verdicts: mine.verdicts,
    jury,
    judges: judgesToday(day) + (mine.finished ? 1 : 0),
    streak: currentStreak(state.streak, today()),
    bestStreak: state.streak.best,
  };
}

function verdict(body: PlayerVerdict): VerdictResponse {
  const state = load();
  const day = playedDay();
  const docket = docketFor(day, CASE_IDS);
  const mine = (state.days[day] ??= { verdicts: [], finished: false });
  const counts = crowdVotes(day, body.case);
  const already = mine.verdicts.find((v) => v.case === body.case);
  if (already) {
    counts[already.option] += 1;
    return { counts };
  }
  if (!isNextVerdict(courtFor(docket), mine.verdicts, body)) throw new Error('Not the next case');
  mine.verdicts.push({ case: body.case, option: body.option });
  writeJson(store, KEYS.mock, state);
  counts[body.option] += 1;
  return { counts };
}

function finish(): FinishResponse {
  const state = load();
  const day = playedDay();
  const mine = state.days[day];
  if (mine && !mine.finished && mine.verdicts.length >= docketFor(day, CASE_IDS).length) {
    mine.finished = true;
    if (day === today()) state.streak = afterFinishing(state.streak, day);
    writeJson(store, KEYS.mock, state);
  }
  return { judges: judgesToday(day) + 1, streak: currentStreak(state.streak, today()), bestStreak: state.streak.best };
}

export async function mockCall<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  let result: unknown;
  if (method === 'GET' && path === 'today') result = todayResponse();
  else if (path === 'verdict') result = verdict(body as PlayerVerdict);
  else if (path === 'finish') result = finish();
  else if (path === 'share' || path === 'flair') result = { ok: true, message: 'Saved (offline)' } satisfies OkResponse;
  else throw new Error(`No stand-in for ${method} /api/${path}`);
  return result as T;
}
