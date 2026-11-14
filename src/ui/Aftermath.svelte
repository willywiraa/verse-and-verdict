<script lang="ts">
  import { tick } from 'svelte';
  import { FIRST_VERDICT_HINT, REACTIONS } from '../content/scribe';
  import type { FaithChange } from '../game/types';
  import Typewriter from './Typewriter.svelte';

  /** What follows a verdict, shown in beats: 1 the Verse, 2 the reaction, 4 the Next button. */
  let {
    verse,
    faith,
    beat,
    fast,
    firstHint,
    lastOfDay,
    onnext,
  }: {
    verse: string;
    faith: FaithChange;
    beat: number;
    fast: boolean;
    firstHint: boolean;
    lastOfDay: boolean;
    onnext: () => void;
  } = $props();

  const tone = $derived(faith > 0 ? 'good' : faith < 0 ? 'bad' : 'flat');

  let nextEl = $state<HTMLButtonElement>();
  $effect(() => {
    if (beat >= 4) tick().then(() => nextEl?.focus({ preventScroll: true }));
  });
</script>

<section class="aftermath" aria-live="polite">
  {#if beat >= 1}
    <div class="scroll" class:fast>
      <span class="scroll-label">The Scribe writes</span>
      <p class="verse"><Typewriter text={verse} instant={fast} /></p>
    </div>
  {/if}

  {#if beat >= 2}
    <p class="reaction {tone}" class:fast>
      {#if faith !== 0}<span class="delta">{faith > 0 ? '+' : '−'}{Math.abs(faith)}</span>{/if}
      {REACTIONS[faith]}
    </p>
  {/if}

  {#if beat >= 4}
    {#if firstHint}
      <p class="scribe-bubble"><span>The Scribe</span>{FIRST_VERDICT_HINT}</p>
    {/if}
    <button type="button" class="btn primary next" bind:this={nextEl} onclick={onnext}>
      {lastOfDay ? 'End the Day' : 'Next soul'}
    </button>
  {/if}
</section>

<style>
  .aftermath {
    margin-top: 1rem;
    text-align: center;
  }

  .scroll {
    position: relative;
    margin: 0 auto;
    padding: 0.9rem 1.2rem 1rem;
    max-width: 34rem;
    background: linear-gradient(#fdf6e6, #f3e6c8);
    border-radius: 10px;
    box-shadow:
      inset 0 0 0 1px #e2cf9f,
      0 6px 18px rgb(0 0 0 / 0.18);
    animation: unroll 0.45s ease-out both;
  }

  .scroll-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  .verse {
    margin: 0.3rem 0 0;
    font-family: var(--serif);
    font-size: 1.55rem;
    font-weight: 600;
    line-height: 1.25;
  }

  .reaction {
    margin: 0.8rem 0 0;
    font-weight: 700;
    animation: pop 0.35s ease-out both;
  }

  .delta {
    display: inline-block;
    min-width: 2.2rem;
    margin-right: 0.35rem;
    padding: 0.05rem 0.45rem;
    border-radius: 999px;
    color: var(--parchment);
  }

  .good .delta {
    background: #9a7428;
  }

  .bad .delta {
    background: var(--ember);
  }

  .scribe-bubble {
    margin: 1rem auto 0;
    max-width: 26rem;
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.15rem;
    color: var(--ink-soft);
    animation: pop 0.35s ease-out both;
  }

  .scribe-bubble span {
    display: block;
    font-family: var(--sans);
    font-style: normal;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .next {
    display: block;
    margin: 1.1rem auto 0;
    min-width: 12rem;
    animation: pop 0.35s ease-out both;
  }

  .fast {
    animation: none;
  }

  @keyframes unroll {
    from {
      opacity: 0;
      transform: scaleX(0.2);
    }
  }

  @keyframes pop {
    from {
      opacity: 0;
      transform: translateY(6px) scale(0.97);
    }
  }
</style>
