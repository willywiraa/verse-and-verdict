import { serve } from '@hono/node-server';
import { createServer, getServerPort } from '@devvit/web/server';
import { Hono } from 'hono';
import { api } from './routes/api';
import { internal } from './routes/internal';

/**
 * Fit the Crime's Devvit server. /api/… is called by the game inside the post;
 * /internal/… is called by Reddit (menu, install trigger, daily schedule).
 * Built by Devvit's Vite plugin into dist/server/index.cjs.
 */
const app = new Hono();
app.route('/api', api);
app.route('/internal', internal);

serve({ fetch: app.fetch, createServer, port: getServerPort() });
