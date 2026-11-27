import type { TriggerResponse, UiResponse } from '@devvit/web/shared';
import { Hono } from 'hono';
import { postTodaysDocket } from '../core/docket';

/** Routes Reddit itself calls: the moderator menu, the install trigger and the daily schedule. */
export const internal = new Hono();

internal.post('/menu/post-today', async (c) => {
  try {
    const post = await postTodaysDocket(false);
    return c.json<UiResponse>(post ? { navigateTo: post.url } : { showToast: 'Already posted' });
  } catch (error) {
    console.error('menu post failed', error);
    return c.json<UiResponse>({ showToast: 'Could not create the post' }, 400);
  }
});

internal.post('/triggers/on-app-install', async (c) => {
  try {
    await postTodaysDocket(true);
    return c.json<TriggerResponse>({ status: 'success', message: 'First docket posted' });
  } catch (error) {
    console.error('install post failed', error);
    return c.json<TriggerResponse>({ status: 'error', message: 'Could not create the first post' }, 400);
  }
});

/** Every day at 00:00 UTC (devvit.json scheduler.tasks.daily-docket). */
internal.post('/scheduler/daily-docket', async (c) => {
  try {
    const post = await postTodaysDocket(true);
    return c.json({ status: 'success', message: post ? `Posted ${post.id}` : 'Already posted today' });
  } catch (error) {
    console.error('daily post failed', error);
    return c.json({ status: 'error', message: 'Could not create the daily post' }, 500);
  }
});
