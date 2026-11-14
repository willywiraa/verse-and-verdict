import { mount } from 'svelte';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import App from './App.svelte';
import './styles/global.css';

const target = document.getElementById('app');
if (!target) throw new Error('Missing #app element');

export default mount(App, { target });
