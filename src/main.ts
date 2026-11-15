import { mount } from 'svelte';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import App from './App.svelte';
import './styles/global.css';

const target = document.getElementById('app');
if (!target) throw new Error('Missing #app element');

// Development only: ?gallery shows every character, mood and pose. The branch is removed from production builds.
if (import.meta.env.DEV && new URLSearchParams(location.search).has('gallery')) {
  const { default: Gallery } = await import('./dev/Gallery.svelte');
  mount(Gallery, { target });
} else {
  mount(App, { target });
}
