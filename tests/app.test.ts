// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type Svelte = typeof import('svelte');
let svelte: Svelte | null = null;
let app: ReturnType<Svelte['mount']> | null = null;

/** Mount the app with a fresh module graph, so the game store reads storage again, like a page reload. */
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
  const found = [...document.querySelectorAll('button')].find((b) =>
    typeof label === 'string' ? b.textContent?.includes(label) : label.test(b.textContent ?? ''),
  );
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

const verdict = (v: string) => document.querySelector<HTMLButtonElement>(`button.verdict.${v}`);

beforeEach(() => localStorage.clear());
afterEach(stop);

describe('playing in the browser', () => {
  it('teaches the loop on the first soul', async () => {
    await start();
    expect(text()).toContain('A game about death and judgment');
    click(button('Begin'));

    expect(document.querySelector('h1')?.textContent).toBe('Hettie Marrow, 81');
    expect(text()).toContain('Open one Eye. Only one.');
    expect(verdict('rise')?.disabled).toBe(true);

    click(button('Deed'));
    expect(text()).toContain('She sold every loaf a little light.');
    expect(button('Heart').disabled).toBe(true);
    expect(verdict('rise')?.disabled).toBe(false);

    click(verdict('rise'));
    expect(text()).toContain('Rest. You will never be hungry again.');
    press('Enter'); // skip the beats
    expect(text()).toContain('Feed the hungry, and you will be rewarded.');
    expect(text()).toContain('You missed');
    expect(text()).toContain('She was a hungry child once.');
    expect(text()).toContain('Lowmere approves.');
    expect(text()).toContain('I wrote it down.');
  });

  it('plays a whole reign by keyboard, with the teaching Echo on Day 1', async () => {
    await start();
    click(button('Begin'));

    const seen: string[] = [];
    for (let i = 0; i < 6; i++) {
      seen.push(document.querySelector('h1')?.textContent ?? '');
      press('2'); // Heart
      press('ArrowDown'); // Fall
      press('Enter'); // skip the aftermath
      press('Enter'); // next soul
    }

    expect(seen).toEqual([
      'Hettie Marrow, 81',
      'Dace Weller, 34',
      'Pip Ardley, 72',
      'Kit Mallow, 17',
      'Orrin Vale, 58',
      'Ilse Brann, 90',
    ]);
    expect(text()).toContain('The World Below');
    expect(text()).toContain('Good deeds will not save you.');

    let souls = seen.length;
    while (!text().includes('Your reign is over')) {
      if (text().includes('The World Below')) {
        click(button(/Begin Day|See how your reign ends/));
        continue;
      }
      press('2');
      press('ArrowDown');
      press('Enter');
      press('Enter');
      if (++souls > 40) throw new Error('The reign never ended');
    }

    expect(souls).toBeGreaterThan(6);
    expect(text()).toMatch(/The Silent Sky|The Unquestioned|The Weighed World|The Gentle Age|The Iron Age/);
    expect(text()).toContain('You were');
    expect(text()).toContain('The Stern Weigher of Hearts');
  });

  it('shows the Echo with the Verse that summoned it', async () => {
    await start();
    click(button('Begin'));
    for (let i = 0; i < 4; i++) {
      press('1');
      press(i === 0 ? 'ArrowRight' : 'ArrowUp');
      press('Enter');
      press('Enter');
    }
    expect(document.querySelector('h1')?.textContent).toBe('Orrin Vale, 58');
    expect(text()).toContain('Because of your Verse on Hettie Marrow');
    expect(text()).toContain('Even good people must try again.');
    expect(text()).toContain('Said everyone gets another life');
  });

  it('shows plain verdict meanings and reveals the aftermath in beats', async () => {
    await start();
    click(button('Begin'));
    expect(text()).toContain('reward');
    expect(text()).toContain('new life');
    expect(text()).toContain('punish');
    press('1');
    press('ArrowUp');
    expect(text()).not.toContain('The Scribe writes');
    press('Enter');
    expect(text()).toContain('The Scribe writes');
    expect(text()).toContain('Next soul');
  });

  it('limits Return to two per Day', async () => {
    await start();
    click(button('Begin'));
    for (let i = 0; i < 2; i++) {
      press('1');
      press('ArrowRight');
      press('Enter');
      press('Enter');
    }
    press('1');
    expect(verdict('return')?.disabled).toBe(true);
    expect(text()).toContain('No Returns left today');
  });

  it('remembers judged souls in the Book of Souls', async () => {
    await start();
    click(button('Begin'));
    press('2');
    press('ArrowUp');
    press('Escape');
    click(button('Book of Souls'));
    expect(text()).toContain('1 of 20 souls met');
    expect(text()).toContain('Hettie Marrow, 81');
    expect(text()).toContain('Not yet seen');
  });

  it('resumes where the player left off', async () => {
    await start();
    click(button('Begin'));
    press('3');
    press('ArrowUp');
    press('Enter');
    press('Enter');
    stop();

    await start();
    click(button('Continue'));
    expect(document.querySelector('h1')?.textContent).toBe('Dace Weller, 34');
  });
});
