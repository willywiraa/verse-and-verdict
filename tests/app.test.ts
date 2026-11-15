// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SCENE_LENGTH } from '../src/ui/scenes/index';

type Svelte = typeof import('svelte');
let svelte: Svelte | null = null;
let app: ReturnType<Svelte['mount']> | null = null;

/** Mount the app with a fresh module graph, so the store reads storage again, like a page reload. */
async function start(): Promise<void> {
  vi.resetModules();
  svelte = await import('svelte');
  const { default: App } = await import('../src/App.svelte');
  app = svelte.mount(App, { target: document.body });
  svelte.flushSync();
}

function stop(): void {
  if (svelte && app) svelte.unmount(app);
  app = null;
  document.body.innerHTML = '';
}

function flushSync(): void {
  svelte?.flushSync();
}

function text(): string {
  return document.body.textContent ?? '';
}

function button(label: string | RegExp): HTMLButtonElement {
  const found = [...document.querySelectorAll('button')].find((b) => {
    const name = `${b.getAttribute('aria-label') ?? ''} ${b.textContent ?? ''}`;
    return typeof label === 'string' ? name.includes(label) : label.test(name);
  });
  if (!found) throw new Error(`No button labelled ${label}`);
  return found;
}

function click(el: Element | null): void {
  if (!el) throw new Error('Missing element');
  (el as HTMLElement).click();
  flushSync();
}

function press(key: string): void {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  flushSync();
}

const tags = () => [...document.querySelectorAll<HTMLButtonElement>('button.tag')];
const cards = () => [...document.querySelectorAll<HTMLButtonElement>('button.card')];

beforeEach(() => localStorage.clear());
afterEach(stop);

describe('playing in the browser', () => {
  it('plays a verdict in beats: gavel, stamp, scene, crowd, headline', async () => {
    vi.useFakeTimers();
    try {
      await start();
      click(button('Start court'));
      press('q');
      press('Enter');
      expect(text()).not.toContain('Sentenced');
      vi.advanceTimersByTime(700);
      flushSync();
      expect(text()).toContain('Sentenced');
      expect(text()).toContain('Prison · 20 years');
      vi.advanceTimersByTime(1000);
      flushSync();
      expect(text()).toContain('20 years');
      expect(text()).not.toContain('Yes!');
      // The scene mounted at the last flush; the crowd reacts when it has played out.
      vi.advanceTimersByTime(SCENE_LENGTH.prison * 1000 + 50);
      flushSync();
      expect(text()).toContain('Yes!');
      expect(text()).toContain('Money still missing');
      vi.advanceTimersByTime(1400);
      flushSync();
      expect(text()).toContain('Harjo gets 20 years. Money still gone.');
      expect(button('End the day')).toBeTruthy();
    } finally {
      vi.useRealTimers();
    }
  });

  it('opens on the title, then the first case file', async () => {
    await start();
    expect(text()).toContain('Fit the Crime');
    expect(text()).toContain('Nothing graphic');
    click(button('Start court'));
    expect(text()).toContain('Pak Harjo');
    expect(text()).toContain('Stole hospital money');
    expect(text()).toContain('Rp500 billion');
    expect(text()).toContain('5 hospitals');
    expect(cards()).toHaveLength(4);
  });

  it('flips evidence by tap or by number key', async () => {
    await start();
    click(button('Start court'));
    expect(tags()[0].getAttribute('aria-label')).toBe('Evidence 1: tap to look');
    click(tags()[0]);
    expect(tags()[0].getAttribute('aria-label')).toBe('Evidence 1: Cash found in his car.');
    press('3');
    expect(tags()[2].getAttribute('aria-label')).toBe('Evidence 3: Half the money is hidden abroad.');
    expect(tags()[1].getAttribute('aria-label')).toBe('Evidence 2: tap to look');
  });

  it('picks a card, sentences it and shows what happened', async () => {
    await start();
    click(button('Start court'));
    const sentence = button('Pick a card');
    expect(sentence.disabled).toBe(true);
    press('Enter');
    expect(text()).toContain('Pak Harjo');

    click(cards()[0]);
    expect(cards()[0].getAttribute('aria-pressed')).toBe('true');
    press('w');
    expect(cards()[0].getAttribute('aria-pressed')).toBe('false');
    expect(cards()[1].getAttribute('aria-pressed')).toBe('true');
    expect(button('Sentence').disabled).toBe(false);

    press('Enter');
    expect(text()).toContain('Tap to skip');
    expect(text()).not.toContain('His mansion builds 5 hospitals');
    press('Enter');
    expect(text()).toContain('His mansion builds 5 hospitals');
    expect(text()).toContain('Left in his socks');
    expect(text()).toContain('Fair enough.');
    expect(text()).toContain('Crowd +1');
    press('Enter');
    expect(text()).toContain('Court is over');
  });

  it('sentences with Enter on a card that is already chosen', async () => {
    await start();
    click(button('Start court'));
    const card = cards()[2];
    // A keyboard press arrives as a click with no mouse detail.
    card.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
    flushSync();
    expect(cards()[2].getAttribute('aria-pressed')).toBe('true');
    expect(text()).toContain('Pak Harjo');
    cards()[2].dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
    flushSync();
    expect(text()).toContain('Tap to skip');
  });

  it('resumes where the player left off', async () => {
    await start();
    click(button('Start court'));
    click(cards()[3]);
    click(button('Sentence'));
    click(document.querySelector('main'));
    expect(text()).toContain('Harjo banned from office for life');
    stop();

    await start();
    click(button('Continue'));
    // A verdict loaded from a save shows its outcome without replaying.
    expect(text()).toContain('Harjo banned from office for life');
    expect(text()).not.toContain('Tap to skip');
  });
});
