import { shuffle } from './rng';

/**
 * The daily docket: every player gets the same cases on the same day, so the
 * community can compare verdicts. Days count in UTC from FIRST_DAY.
 */
export const DOCKET_SIZE = 3;

/** Docket #1 is this UTC date. */
export const FIRST_DAY = '2026-11-25';

/** The first docket is chosen by hand, to open with the clearest contrast. */
const PINNED: Readonly<Record<number, readonly string[]>> = {
  1: ['bread-thief', 'hospital-money', 'phone-shop'],
};

const DAY_MS = 86_400_000;

function utcMidnight(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/** YYYY-MM-DD in UTC. */
export function dateKey(date: Date): string {
  return new Date(utcMidnight(date)).toISOString().slice(0, 10);
}

/** The docket number for a moment in time; never below 1. */
export function dayNumber(date: Date): number {
  const first = Date.parse(`${FIRST_DAY}T00:00:00Z`);
  return Math.max(1, Math.floor((utcMidnight(date) - first) / DAY_MS) + 1);
}

/** The UTC date of docket `n`. */
export function dateOfDay(n: number): string {
  const first = Date.parse(`${FIRST_DAY}T00:00:00Z`);
  return new Date(first + (n - 1) * DAY_MS).toISOString().slice(0, 10);
}

/** "Nov 27" */
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/**
 * The cases for docket `n`, from the pool `ids`. The pool is walked in a fixed
 * shuffled order, reshuffled on every pass, so every case comes up before any
 * repeats, and no docket holds the same case twice.
 */
export function docketFor(n: number, ids: readonly string[]): string[] {
  if (ids.length < DOCKET_SIZE) throw new Error(`The pool needs at least ${DOCKET_SIZE} cases`);
  const sorted = [...ids].sort();
  // The first pass opens with docket #1's hand-picked cases, so the next days carry on without repeats.
  const first = PINNED[1]?.every((id) => ids.includes(id)) ? PINNED[1] : [];
  const pass = (p: number) => {
    const order = shuffle(sorted, 7919 * (p + 1));
    return p === 0 ? [...first, ...order.filter((id) => !first.includes(id))] : order;
  };
  let position = (n - 1) * DOCKET_SIZE;
  const docket: string[] = [];
  while (docket.length < DOCKET_SIZE) {
    const p = Math.floor(position / sorted.length);
    const id = pass(p)[position % sorted.length];
    if (!docket.includes(id)) docket.push(id);
    position++;
  }
  return docket;
}

/** Seconds until the next docket opens (00:00 UTC). */
export function secondsUntilNextDay(now: Date): number {
  return Math.max(0, Math.round((utcMidnight(now) + DAY_MS - now.getTime()) / 1000));
}
