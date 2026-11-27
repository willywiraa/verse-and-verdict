import { mount } from 'svelte';
import '@fontsource/cormorant-garamond/latin-600.css';
import Splash from './ui/Splash.svelte';
import './styles/global.css';

/** The card shown in the Reddit feed: today's docket, and one tap into court. */
const target = document.getElementById('app');
if (!target) throw new Error('Missing #app element');
mount(Splash, { target });
