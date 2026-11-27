/**
 * What the game's client and the Devvit server send each other. All requests
 * go to /api/… on the app's own server; the post being played decides the day.
 */

export interface PlayerVerdict {
  case: string;
  option: number;
}

/** GET /api/today */
export interface TodayResponse {
  dayNumber: number;
  /** YYYY-MM-DD (UTC) of this post's docket. */
  date: string;
  /** True when this post holds today's docket (only today's counts for streaks). */
  isToday: boolean;
  docket: string[];
  /** Null when the player is logged out: they can play, but nothing is saved. */
  username: string | null;
  /** This player's verdicts on this docket, in order. */
  verdicts: PlayerVerdict[];
  /** Community votes per case: counts per option. Only for cases this player has judged. */
  jury: Record<string, number[]>;
  /** People who finished this docket. */
  judges: number;
  streak: number;
  bestStreak: number;
}

/** POST /api/verdict */
export interface VerdictRequest extends PlayerVerdict {}

export interface VerdictResponse {
  /** Community votes for this case, including this one. */
  counts: number[];
}

/** POST /api/finish, after the last case. */
export interface FinishResponse {
  judges: number;
  streak: number;
  bestStreak: number;
}

/** POST /api/share: post the player's result as a comment on the docket post. */
export interface ShareRequest {
  text: string;
}

/** POST /api/flair: wear the judge title as user flair in this community. */
export interface FlairRequest {
  title: string;
}

export interface OkResponse {
  ok: boolean;
  message?: string;
}
