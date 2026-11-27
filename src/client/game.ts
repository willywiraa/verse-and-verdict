import { mount } from 'svelte';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import App from './App.svelte';
import './styles/global.css';

const target = document.getElementById('app');
if (!target) throw new Error('Missing #app element');

// Development only: ?gallery shows every character, mood and pose; ?icon draws the app icon.
// These branches are removed from production builds.
const params = new URLSearchParams(location.search);
if (import.meta.env.DEV && params.has('gallery')) {
  const { default: Gallery } = await import('./dev/Gallery.svelte');
  mount(Gallery, { target });
} else if (import.meta.env.DEV && params.has('icon')) {
  const { default: Icon } = await import('./dev/Icon.svelte');
  mount(Icon, { target });
} else {
  mount(App, { target });
}
