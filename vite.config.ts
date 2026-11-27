import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { devvit } from '@devvit/start/vite';
import { defineConfig } from 'vite';

/**
 * The Reddit build: Devvit's plugin builds the web view (src/client, one page
 * per devvit.json entrypoint) into dist/client and the server (src/server)
 * into dist/server/index.cjs. The plugin only runs for builds (`devvit
 * playtest` runs `vite build --watch`); tools that merely read this file skip it.
 */
export default defineConfig(({ command }) => ({
  plugins: [svelte(), ...(command === 'build' ? [devvit()] : [])],
  resolve: { alias: { '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)) } },
}));
