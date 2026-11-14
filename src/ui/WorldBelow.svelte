<script lang="ts">
  import { tick } from 'svelte';
  import { dayEndRemark } from '../content/scribe';
  import { isLastDay, versesOf, type ReignState } from '../game/reign';
  import { game } from './game.svelte';
  import MenuButton from './MenuButton.svelte';

  let { reign }: { reign: ReignState } = $props();

  const entries = $derived(versesOf(reign, game.content, reign.day));
  const last = $derived(isLastDay(reign));
  const remark = $derived(
    dayEndRemark(
      entries.map((e) => e.faith),
      last,
    ),
  );

  let heading = $state<HTMLHeadingElement>();
  $effect(() => {
    void reign.day;
    tick().then(() => heading?.focus({ preventScroll: true }));
  });
</script>

<div class="corner"><MenuButton /></div>

<main class="night-page">
  <p class="eyebrow">The World Below</p>
  <h1 tabindex="-1" bind:this={heading}>After Day {reign.day}</h1>

  <ol class="entries">
    {#each entries as entry (entry.soul)}
      <li>
        <p class="verse">“{entry.verse}”</p>
        <p class="on">on {entry.name}</p>
        <p class="and-so"><span>And so:</span> {entry.andSo}</p>
      </li>
    {/each}
  </ol>

  <p class="scribe">The Scribe: “{remark}”</p>

  <div class="actions">
    <button type="button" class="btn primary" onclick={() => game.nextDay()}>
      {last ? 'See how your reign ends' : `Begin Day ${reign.day + 1}`}
    </button>
    <button type="button" class="btn" onclick={() => game.toTitle()}>Rest here</button>
  </div>
</main>

<style>
  .entries {
    margin: 1.5rem 0 0;
    padding: 0;
    list-style: none;
    text-align: left;
  }

  li {
    padding: 1rem 0;
    border-bottom: 1px solid rgb(245 236 215 / 0.15);
    animation: appear 0.5s ease-out both;
  }

  li:nth-child(2) {
    animation-delay: 0.1s;
  }

  li:nth-child(3) {
    animation-delay: 0.2s;
  }

  li:nth-child(4) {
    animation-delay: 0.3s;
  }

  li:nth-child(n + 5) {
    animation-delay: 0.4s;
  }

  p {
    margin: 0;
  }

  .verse {
    font-family: var(--serif);
    font-size: 1.4rem;
    line-height: 1.25;
  }

  .on {
    font-size: 0.8rem;
    opacity: 0.75;
    margin-top: 0.15rem;
  }

  .and-so {
    margin-top: 0.4rem;
  }

  .and-so span {
    font-weight: 700;
    color: var(--gold);
  }

  .scribe {
    margin-top: 1.5rem;
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.2rem;
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }
</style>
