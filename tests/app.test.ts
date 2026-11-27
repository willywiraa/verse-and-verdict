// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SCENE_LENGTH } from '../src/client/ui/scenes/index';

type Svelte = typeof import('svelte');
let svelte: Svelte | null = null;
let app: ReturnType<Svelte['mount']> | null = null;

/** Wait for the stand-in server's promises to settle. */
async function settle(): Promise<void> {
  for (let i = 0; i < 4; i++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    svelte?.flushSync();
  }
}

/** Mount a page with a fresh module graph, like a page reload, on docket #1. */
async function start(page: 'App' | 'Splash' = 'App'): Promise<void> {
  window.history.replaceState(null, '', '/?day=1');
  vi.resetModules();
  svelte = await import('svelte');
  const { default: Component } =
    page === 'App' ? await import('../src/client/App.svelte') : await import('../src/client/ui/Splash.svelte');
  app = svelte.mount(Component, { target: document.body });
  await settle();
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

/** Pick card `key`, sentence it, skip the scene and move on. */
async function judge(key: string): Promise<void> {
  press(key);
  press('Enter');
  press('Enter');
  await settle();
  press('Enter');
  await settle();
}

beforeEach(() => localStorage.clear());
afterEach(stop);

describe('the feed card', () => {
  it("shows today's three defendants and opens court", async () => {
    await start('Splash');
    expect(text()).toContain('Docket #1');
    expect(text()).toContain('Bu Ani');
    expect(text()).toContain('Pak Harjo');
    expect(text()).toContain('Dodi');
    expect(button('Open court').disabled).toBe(false);
  });
});

describe('playing in the browser', () => {
  it('opens straight on the first case of the docket', async () => {
    await start();
    expect(text()).toContain('Bu Ani');
    expect(text()).toContain('Stole bread from a bakery');
    expect(text()).toContain('Rp50,000');
    expect(text()).toContain('5 loaves');
    expect(text()).toContain('Case 1/3');
    expect(cards()).toHaveLength(4);
  });

  it('flips evidence by tap or by number key', async () => {
    await start();
    expect(tags()[0].getAttribute('aria-label')).toBe('Evidence 1: tap to look');
    click(tags()[0]);
    expect(tags()[0].getAttribute('aria-label')).toBe('Evidence 1: Three hungry children at home.');
    press('3');
    expect(tags()[2].getAttribute('aria-label')).toBe('Evidence 3: The baker knows her well.');
  });

  it('picks a card, sentences it, then shows how Reddit ruled', async () => {
    await start();
    expect(button('Pick a card').disabled).toBe(true);
    press('w');
    expect(cards()[1].getAttribute('aria-pressed')).toBe('true');
    press('Enter');
    expect(text()).toContain('Tap to skip');
    press('Enter');
    await settle();
    expect(text()).toContain('Bread thief pays the baker back');
    expect(text()).toContain('How Reddit ruled');
    expect(text()).toMatch(/You sided with \d+% of Reddit|Only \d+% of Reddit agreed/);
    press('Enter');
    expect(text()).toContain('Pak Harjo');
    expect(text()).toContain('Case 2/3');
  });

  it('plays a verdict in beats: gavel, stamp, scene, crowd, headline', async () => {
    await start();
    vi.useFakeTimers();
    try {
      press('q');
      press('Enter');
      expect(text()).not.toContain('Sentenced');
      vi.advanceTimersByTime(700);
      flushSync();
      expect(text()).toContain('Sentenced');
      expect(text()).toContain('Prison · 1 year');
      vi.advanceTimersByTime(1000);
      flushSync();
      expect(text()).not.toContain('Too harsh!');
      // The scene mounted at the last flush; the crowd reacts when it has played out.
      vi.advanceTimersByTime(SCENE_LENGTH.prison * 1000 + 50);
      flushSync();
      expect(text()).toContain('Too harsh!');
      expect(text()).toContain('Her kids wait alone');
      vi.advanceTimersByTime(1400);
      flushSync();
      expect(text()).toContain('Mother jailed for five loaves');
      expect(button('Next case')).toBeTruthy();
    } finally {
      vi.useRealTimers();
    }
  });

  it('sentences with Enter on a card that is already chosen', async () => {
    await start();
    cards()[2].dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
    flushSync();
    expect(cards()[2].getAttribute('aria-pressed')).toBe('true');
    cards()[2].dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
    flushSync();
    expect(text()).toContain('Tap to skip');
  });

  it('resumes on the next case after a reload', async () => {
    await start();
    await judge('e');
    expect(text()).toContain('Pak Harjo');
    stop();
    await start();
    expect(text()).toContain('Pak Harjo');
    expect(text()).toContain('Case 2/3');
  });

  it('plays a whole docket by keyboard and ends on the result card', async () => {
    await start();
    await judge('r');
    await judge('w');
    await judge('q');
    await settle();
    expect(text()).toContain('Court is adjourned');
    expect(text()).toMatch(/Judge/);
    expect(text()).toMatch(/You agreed with Reddit on \d of 3/);
    // Mercy for the bread thief (Rp50,000), wealth taken from the hospital thief (Rp500 billion).
    expect(text()).toContain('You were tougher on the hospital thief.');
    expect(button('Share in comments')).toBeTruthy();
    expect(text()).toContain('Next docket in');
  });
});
