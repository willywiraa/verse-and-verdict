import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte()],
  // Interface tests mount components, which needs Svelte's browser build.
  resolve: {
    conditions: ['browser'],
    alias: { '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)) },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    server: { deps: { inline: ['svelte'] } },
  },
});
