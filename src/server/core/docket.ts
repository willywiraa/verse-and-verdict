import { context, reddit, redis } from '@devvit/web/server';
import { CASES, CASE_IDS } from '@shared/cases';
import { dayNumber, docketFor, shortDate, dateOfDay } from '@shared/daily';

/** Redis keys, in one place. */
export const keys = {
  postDay: (postId: string) => `post:${postId}:day`,
  dayPost: (day: number) => `day:${day}:post`,
  jury: (day: number, caseId: string) => `jury:${day}:${caseId}`,
  judges: (day: number) => `judges:${day}`,
  verdicts: (day: number, user: string) => `verdicts:${day}:${user}`,
  finished: (day: number, user: string) => `finished:${day}:${user}`,
  streak: (user: string) => `streak:${user}`,
};

/** "the bread thief, the hospital thief and the phone robber" */
function nicknames(docket: readonly string[]): string {
  const names = docket.map((id) => CASES.find((c) => c.id === id)?.nickname ?? id);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names.join('');
}

/** The docket shown by a post: the day it was created for, or today for posts made before that was recorded. */
export async function dayOfPost(postId: string | undefined): Promise<number> {
  const stored = postId ? await redis.get(keys.postDay(postId)) : undefined;
  const day = Number(stored);
  return Number.isInteger(day) && day > 0 ? day : dayNumber(new Date());
}

/**
 * Posts today's docket in the current subreddit. With `onlyOnce`, does nothing
 * if today's post already exists (the daily schedule and the install trigger
 * may both fire on the first day).
 */
export async function postTodaysDocket(onlyOnce: boolean): Promise<{ id: string; url: string } | null> {
  const day = dayNumber(new Date());
  if (onlyOnce && (await redis.get(keys.dayPost(day)))) return null;
  const docket = docketFor(day, CASE_IDS);
  const post = await reddit.submitCustomPost({
    title: `Docket #${day} (${shortDate(dateOfDay(day))}): ${nicknames(docket)}. How would you sentence them?`,
    entry: 'default',
  });
  await redis.set(keys.postDay(post.id), String(day));
  await redis.set(keys.dayPost(day), post.id);
  return { id: post.id, url: `https://www.reddit.com/r/${context.subredditName}/comments/${post.id.replace(/^t3_/, '')}` };
}
