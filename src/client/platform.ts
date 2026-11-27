import type {
  FinishResponse,
  OkResponse,
  PlayerVerdict,
  TodayResponse,
  VerdictResponse,
} from '@shared/api';

/**
 * The one door to Reddit. Inside a post, it calls the Devvit server and the
 * Devvit client helpers; in a plain browser (mode "offline") and in tests, it
 * talks to a stand-in server kept in this browser instead.
 */
export const OFFLINE = import.meta.env.MODE === 'offline' || import.meta.env.MODE === 'test';

type DevvitClient = typeof import('@devvit/web/client');
let devvitClient: Promise<DevvitClient> | null = null;
function devvit(): Promise<DevvitClient> {
  devvitClient ??= import('@devvit/web/client');
  return devvitClient;
}

async function call<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  if (OFFLINE) {
    const { mockCall } = await import('./mock-server');
    return mockCall<T>(method, path, body);
  }
  const response = await fetch(`/api/${path}`, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`/api/${path} failed: ${response.status}`);
  return (await response.json()) as T;
}

export const api = {
  today: () => call<TodayResponse>('GET', 'today'),
  verdict: (verdict: PlayerVerdict) => call<VerdictResponse>('POST', 'verdict', verdict),
  finish: () => call<FinishResponse>('POST', 'finish'),
  share: (text: string) => call<OkResponse>('POST', 'share', { text }),
  flair: (title: string) => call<OkResponse>('POST', 'flair', { title }),
};

/** From the feed card to the full-size game. Must be called from a click. */
export async function openGame(event: MouseEvent): Promise<void> {
  if (OFFLINE) {
    location.href = './game.html';
    return;
  }
  (await devvit()).requestExpandedMode(event, 'game');
}

/** Back from the full-size game to the feed card, where possible. */
export async function closeGame(event: MouseEvent): Promise<void> {
  if (OFFLINE) {
    location.href = './splash.html';
    return;
  }
  try {
    (await devvit()).exitExpandedMode(event);
  } catch {
    // Already inline: nothing to do.
  }
}

export async function toast(text: string): Promise<void> {
  if (OFFLINE) {
    console.info(`[toast] ${text}`);
    return;
  }
  (await devvit()).showToast(text);
}

/** Reddit's login prompt, for players who are logged out. */
export async function askToLogIn(): Promise<void> {
  if (!OFFLINE) (await devvit()).showLoginPrompt();
}
