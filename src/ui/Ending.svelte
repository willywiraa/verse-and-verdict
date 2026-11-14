<script lang="ts">
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import Hand from '@lucide/svelte/icons/hand';
  import Heart from '@lucide/svelte/icons/heart';
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import Waves from '@lucide/svelte/icons/waves';
  import { tick } from 'svelte';
  import { ENDINGS } from '../content/endings';
  import { pickEnding, quotedVerses, tally, temperament } from '../game/outcome';
  import type { ReignState } from '../game/reign';
  import BookOfVerses from './BookOfVerses.svelte';
  import { game } from './game.svelte';
  import MenuButton from './MenuButton.svelte';

  let { reign }: { reign: ReignState } = $props();

  const ending = $derived(pickEnding(reign));
  const verses = $derived(quotedVerses(reign, game.content));
  const title = $derived(temperament(reign).title);
  const counts = $derived(tally(reign.history));

  const COUNTS = $derived([
    { label: 'Rise', value: counts.verdicts.rise, icon: ArrowUp, tone: 'rise' },
    { label: 'Return', value: counts.verdicts.return, icon: RefreshCw, tone: 'return' },
    { label: 'Fall', value: counts.verdicts.fall, icon: ArrowDown, tone: 'fall' },
    { label: 'Deed', value: counts.eyes.deed, icon: Hand, tone: 'eye' },
    { label: 'Heart', value: counts.eyes.heart, icon: Heart, tone: 'eye' },
    { label: 'Ripple', value: counts.eyes.ripple, icon: Waves, tone: 'eye' },
  ]);

  let showBook = $state(false);

  const shareText = $derived(
    [
      `Verse & Verdict · ${ENDINGS[ending].title}`,
      `I was ${title}.`,
      `Rise ${counts.verdicts.rise} · Return ${counts.verdicts.return} · Fall ${counts.verdicts.fall}`,
      `“${verses.loved}”`,
    ].join('\n'),
  );
  let share = $state<'idle' | 'copied' | 'manual'>('idle');

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(shareText);
      share = 'copied';
    } catch {
      share = 'manual';
    }
  }

  let heading = $state<HTMLHeadingElement>();
  $effect(() => {
    tick().then(() => heading?.focus({ preventScroll: true }));
  });
</script>

<div class="corner"><MenuButton /></div>

<main class="night-page">
  <p class="eyebrow">Your reign is over</p>
  <h1 tabindex="-1" bind:this={heading}>{ENDINGS[ending].title}</h1>
  <p class="ending-text">{ENDINGS[ending].text}</p>

  <div class="quoted">
    <figure class="loved">
      <figcaption>Loved most</figcaption>
      <blockquote>“{verses.loved}”</blockquote>
    </figure>
    <figure class="hated">
      <figcaption>Hated most</figcaption>
      <blockquote>“{verses.hated}”</blockquote>
    </figure>
  </div>

  <div class="badge">
    <span class="you">You were</span>
    <strong>{title}</strong>
  </div>

  <ul class="counts" aria-label="Your verdicts and Eyes">
    {#each COUNTS as item (item.label)}
      {@const Icon = item.icon}
      <li class={item.tone} aria-label="{item.label}: {item.value}">
        <Icon size={16} strokeWidth={2.4} aria-hidden="true" />
        <span aria-hidden="true">{item.value}</span>
      </li>
    {/each}
  </ul>

  <div class="actions">
    <button type="button" class="btn primary" onclick={() => game.beginReign()}>Begin a new reign</button>
    <button type="button" class="btn" aria-expanded={showBook} onclick={() => (showBook = !showBook)}>
      {showBook ? 'Close the Book of Verses' : 'Read the Book of Verses'}
    </button>
    <button type="button" class="btn" onclick={copyResult}>{share === 'copied' ? 'Copied' : 'Copy my result'}</button>
  </div>

  <p class="sr-only" aria-live="polite">{share === 'copied' ? 'Your result was copied.' : ''}</p>
  {#if share === 'manual'}
    <label class="share">
      Copy this to share:
      <textarea readonly rows="4" value={shareText} onfocus={(e) => e.currentTarget.select()}></textarea>
    </label>
  {/if}

  {#if showBook}
    <BookOfVerses {reign} />
  {/if}
</main>

<style>
  h1 {
    animation: glow-in 1.2s ease-out both;
  }

  .ending-text {
    margin: 1rem auto 0;
    max-width: 32rem;
    font-family: var(--serif);
    font-size: 1.3rem;
    line-height: 1.4;
    animation: fade-up 0.6s ease-out 0.5s both;
  }

  .quoted {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 1.4rem;
  }

  figure {
    margin: 0;
    padding: 0.8rem 0.9rem;
    border-radius: 14px;
    text-align: left;
    animation: fade-up 0.5s ease-out both;
  }

  .loved {
    background: rgb(224 177 90 / 0.14);
    box-shadow: inset 0 0 0 1px rgb(224 177 90 / 0.6);
    animation-delay: 0.9s;
  }

  .hated {
    background: rgb(166 61 42 / 0.2);
    box-shadow: inset 0 0 0 1px rgb(255 154 107 / 0.5);
    animation-delay: 1.1s;
  }

  figcaption {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  blockquote {
    margin: 0.25rem 0 0;
    font-family: var(--serif);
    font-size: 1.2rem;
    line-height: 1.25;
  }

  .badge {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.6rem;
    padding: 0.7rem 1.6rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #3d3560, #231e3c);
    box-shadow:
      inset 0 0 0 1.5px var(--gold),
      0 0 24px rgb(224 177 90 / 0.25);
    overflow: hidden;
    animation: fade-up 0.5s ease-out 1.4s both;
  }

  .badge::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 35%, rgb(255 244 214 / 0.35) 50%, transparent 65%);
    transform: translateX(-120%);
    animation: shine 1.4s ease-out 2s both;
  }

  .you {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  .badge strong {
    color: var(--gold);
    font-family: var(--serif);
    font-size: 1.45rem;
  }

  .counts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin: 1.2rem 0 0;
    padding: 0;
    list-style: none;
    animation: fade-up 0.5s ease-out 1.6s both;
  }

  .counts li {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    background: rgb(245 236 215 / 0.08);
    font-weight: 700;
  }

  .counts .rise {
    color: var(--gold);
  }

  .counts .return {
    color: var(--teal-light);
  }

  .counts .fall {
    color: #ff9a6b;
  }

  .actions {
    animation: fade-up 0.5s ease-out 1.8s both;
  }

  .share {
    display: grid;
    gap: 0.4rem;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  .share textarea {
    width: 100%;
    padding: 0.6rem;
    border-radius: 10px;
    border: 1px solid rgb(245 236 215 / 0.4);
    background: rgb(15 18 38 / 0.7);
    color: var(--parchment);
    font: inherit;
    resize: none;
  }

  @keyframes glow-in {
    from {
      opacity: 0;
      text-shadow: 0 0 0 transparent;
    }
    50% {
      opacity: 1;
      text-shadow: 0 0 28px rgb(224 177 90 / 0.8);
    }
    to {
      text-shadow: 0 0 12px rgb(224 177 90 / 0.35);
    }
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  @keyframes shine {
    to {
      transform: translateX(120%);
    }
  }

  @media (max-width: 480px) {
    .quoted {
      grid-template-columns: 1fr;
    }
  }
</style>
