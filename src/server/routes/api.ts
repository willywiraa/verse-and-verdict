import { context, reddit, redis } from '@devvit/web/server';
import type {
  FinishResponse,
  FlairRequest,
  OkResponse,
  PlayerVerdict,
  ShareRequest,
  TodayResponse,
  VerdictResponse,
} from '@shared/api';
import { CASE_IDS, courtFor } from '@shared/cases';
import { dateOfDay, dayNumber, docketFor } from '@shared/daily';
import { NO_STREAK, afterFinishing, countsFrom, currentStreak, isNextVerdict, type Streak } from '@shared/progress';
import { Hono } from 'hono';
import { dayOfPost, keys } from '../core/docket';

/** The routes the game calls from inside the post: /api/… */
export const api = new Hono();

function parse<T>(raw: string | undefined | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function juryFor(day: number, caseId: string): Promise<number[]> {
  const options = courtFor([caseId]).cases.find((c) => c.id === caseId)?.options.length ?? 0;
  return countsFrom(await redis.hGetAll(keys.jury(day, caseId)), options);
}

api.get('/today', async (c) => {
  const day = await dayOfPost(context.postId);
  const docket = docketFor(day, CASE_IDS);
  const username = (await reddit.getCurrentUsername()) ?? null;
  const verdicts = username ? parse<PlayerVerdict[]>(await redis.get(keys.verdicts(day, username)), []) : [];
  const jury: Record<string, number[]> = {};
  for (const v of verdicts) jury[v.case] = await juryFor(day, v.case);
  const streak = username ? parse<Streak>(await redis.get(keys.streak(username)), NO_STREAK) : NO_STREAK;
  const today = dayNumber(new Date());
  return c.json<TodayResponse>({
    dayNumber: day,
    date: dateOfDay(day),
    isToday: day === today,
    docket,
    username,
    verdicts,
    jury,
    judges: Number(await redis.get(keys.judges(day))) || 0,
    streak: currentStreak(streak, today),
    bestStreak: streak.best,
  });
});

api.post('/verdict', async (c) => {
  const body = await c.req.json<PlayerVerdict>();
  const day = await dayOfPost(context.postId);
  const content = courtFor(docketFor(day, CASE_IDS));
  const username = await reddit.getCurrentUsername();
  if (!username) {
    // Logged-out players can play, but their votes are not counted.
    return c.json<VerdictResponse>({ counts: await juryFor(day, body.case) });
  }
  const verdicts = parse<PlayerVerdict[]>(await redis.get(keys.verdicts(day, username)), []);
  if (!verdicts.some((v) => v.case === body.case)) {
    if (!isNextVerdict(content, verdicts, body)) return c.json({ error: 'Not the next case' }, 400);
    verdicts.push({ case: body.case, option: body.option });
    await redis.set(keys.verdicts(day, username), JSON.stringify(verdicts));
    await redis.hIncrBy(keys.jury(day, body.case), String(body.option), 1);
  }
  return c.json<VerdictResponse>({ counts: await juryFor(day, body.case) });
});

api.post('/finish', async (c) => {
  const day = await dayOfPost(context.postId);
  const username = await reddit.getCurrentUsername();
  const today = dayNumber(new Date());
  let streak = NO_STREAK;
  if (username) {
    streak = parse<Streak>(await redis.get(keys.streak(username)), NO_STREAK);
    const verdicts = parse<PlayerVerdict[]>(await redis.get(keys.verdicts(day, username)), []);
    const done = verdicts.length >= docketFor(day, CASE_IDS).length;
    if (done && !(await redis.get(keys.finished(day, username)))) {
      await redis.set(keys.finished(day, username), '1');
      await redis.incrBy(keys.judges(day), 1);
      // Only today's docket keeps a streak going.
      if (day === today) {
        streak = afterFinishing(streak, day);
        await redis.set(keys.streak(username), JSON.stringify(streak));
      }
    }
  }
  return c.json<FinishResponse>({
    judges: Number(await redis.get(keys.judges(day))) || 0,
    streak: currentStreak(streak, today),
    bestStreak: streak.best,
  });
});

/** The player's result, posted as their own comment on the docket post. */
api.post('/share', async (c) => {
  const { text } = await c.req.json<ShareRequest>();
  const postId = context.postId;
  if (!postId || !(await reddit.getCurrentUsername())) return c.json<OkResponse>({ ok: false, message: 'Log in to comment' });
  const clean = String(text ?? '').slice(0, 600).trim();
  if (!clean) return c.json<OkResponse>({ ok: false, message: 'Nothing to share' });
  try {
    await reddit.submitComment({ id: postId as `t3_${string}`, text: clean, runAs: 'USER' });
    return c.json<OkResponse>({ ok: true, message: 'Your verdict is in the comments' });
  } catch (error) {
    console.error('share failed', error);
    return c.json<OkResponse>({ ok: false, message: 'Could not post the comment' });
  }
});

/** The judge title, worn as user flair in this community. */
api.post('/flair', async (c) => {
  const { title } = await c.req.json<FlairRequest>();
  const username = await reddit.getCurrentUsername();
  const subredditName = context.subredditName;
  if (!username || !subredditName) return c.json<OkResponse>({ ok: false, message: 'Log in to wear a title' });
  try {
    await reddit.setUserFlair({ subredditName, username, text: `⚖️ ${String(title).slice(0, 40)}` });
    return c.json<OkResponse>({ ok: true, message: 'Title added to your flair' });
  } catch (error) {
    console.error('flair failed', error);
    return c.json<OkResponse>({ ok: false, message: 'Flair is off in this community' });
  }
});
