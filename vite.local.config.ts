import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

/**
 * Plays the game in a normal browser, outside Reddit, against a stand-in
 * server kept in localStorage (mode "offline"). Open /splash.html or /game.html.
 */
export default defineConfig({
  root: fileURLToPath(new URL('./src/client', import.meta.url)),
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  mode: 'offline',
  plugins: [svelte()],
  resolve: { alias: { '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)) } },
});
