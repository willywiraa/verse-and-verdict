<script lang="ts">
  import { tick } from 'svelte';
  import { ENDINGS, endingText } from '../content/endings';
  import { pickEnding, quotedVerses, tally, temperament } from '../game/outcome';
  import type { ReignState } from '../game/reign';
  import BookOfVerses from './BookOfVerses.svelte';
  import { game } from './game.svelte';
  import MenuButton from './MenuButton.svelte';

  let { reign }: { reign: ReignState } = $props();

  const ending = $derived(pickEnding(reign));
  const text = $derived(endingText(ending, quotedVerses(reign, game.content)));
  const title = $derived(temperament(reign).title);
  const counts = $derived(tally(reign.history));

  let showBook = $state(false);
  let heading = $state<HTMLHeadingElement>();
  $effect(() => {
    tick().then(() => heading?.focus({ preventScroll: true }));
  });
</script>

<div class="corner"><MenuButton /></div>

<main class="night-page">
  <p class="eyebrow">Your reign is over</p>
  <h1 tabindex="-1" bind:this={heading}>{ENDINGS[ending].title}</h1>
  <p class="ending-text">{text}</p>

  <p class="temperament">You were <strong>{title}</strong>.</p>

  <dl class="counts">
    <div><dt>Rise</dt><dd>{counts.verdicts.rise}</dd></div>
    <div><dt>Return</dt><dd>{counts.verdicts.return}</dd></div>
    <div><dt>Fall</dt><dd>{counts.verdicts.fall}</dd></div>
    <div><dt>Deed</dt><dd>{counts.eyes.deed}</dd></div>
    <div><dt>Heart</dt><dd>{counts.eyes.heart}</dd></div>
    <div><dt>Ripple</dt><dd>{counts.eyes.ripple}</dd></div>
  </dl>

  <div class="actions">
    <button type="button" class="btn primary" onclick={() => game.beginReign()}>Begin a new reign</button>
    <button type="button" class="btn" aria-expanded={showBook} onclick={() => (showBook = !showBook)}>
      {showBook ? 'Close the Book of Verses' : 'Read the Book of Verses'}
    </button>
  </div>

  {#if showBook}
    <BookOfVerses {reign} />
  {/if}
</main>

<style>
  .ending-text {
    margin: 1.25rem 0 0;
    font-family: var(--serif);
    font-size: 1.3rem;
    line-height: 1.45;
    text-align: left;
  }

  .temperament {
    margin: 1.5rem 0 0;
    font-size: 1.1rem;
  }

  .temperament strong {
    color: var(--gold);
    font-family: var(--serif);
    font-size: 1.35rem;
  }

  .counts {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    margin: 1.5rem 0 0;
  }

  .counts div {
    padding: 0.5rem 0;
    border-radius: 10px;
    background: rgb(245 236 215 / 0.08);
  }

  dt {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  dd {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
  }

  @media (max-width: 480px) {
    .counts {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
