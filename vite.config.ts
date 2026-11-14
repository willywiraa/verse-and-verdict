import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => ({
  // Relative asset paths, so the build works from any folder:
  // GitHub Pages project sites, itch.io uploads, or a local file server.
  base: './',
  plugins: [svelte()],
  // Interface tests mount components, which needs Svelte's browser build.
  resolve: mode === 'test' ? { conditions: ['browser'] } : undefined,
  build: {
    target: 'es2022',
  },
  test: {
    include: ['tests/**/*.test.ts'],
    server: { deps: { inline: ['svelte'] } },
  },
}));
