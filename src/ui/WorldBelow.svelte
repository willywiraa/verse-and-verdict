<script lang="ts">
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import { tick } from 'svelte';
  import { dayEndRemark } from '../content/scribe';
  import { isLastDay, soulById, versesOf, type ReignState } from '../game/reign';
  import { EMBLEM_ICONS } from './emblemIcons';
  import { game } from './game.svelte';
  import { VERDICT_LABELS } from './labels';
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
  const VERDICT_ICONS = { rise: ArrowUp, return: RefreshCw, fall: ArrowDown } as const;

  // Cards appear one by one. A tap, Enter or Space shows them all at once.
  const STEP = 0.55;
  let all = $state(false);
  let heading = $state<HTMLHeadingElement>();
  let primary = $state<HTMLButtonElement>();

  function showAll() {
    if (all) return;
    all = true;
    tick().then(() => primary?.focus({ preventScroll: true }));
  }

  $effect(() => {
    void reign.day;
    tick().then(() => heading?.focus({ preventScroll: true }));
    const id = setTimeout(showAll, (0.6 + entries.length * STEP + 0.4) * 1000);
    return () => clearTimeout(id);
  });

  function onKeydown(event: KeyboardEvent) {
    if (all || game.overlay) return;
    const onControl = event.target instanceof Element && event.target.closest('button, a, input') !== null;
    if ((event.key === 'Enter' || event.key === ' ') && !onControl) {
      event.preventDefault();
      showAll();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} onpointerdown={showAll} />

<div class="corner"><MenuButton /></div>

<main class="night-page" class:all>
  <p class="eyebrow">The World Below</p>
  <h1 tabindex="-1" bind:this={heading}>After Day {reign.day}</h1>

  <ol class="entries">
    {#each entries as entry, i (entry.soul)}
      {@const soul = soulById(game.content, entry.soul)}
      {@const Emblem = EMBLEM_ICONS[soul.emblem]}
      {@const VerdictIcon = VERDICT_ICONS[entry.verdict]}
      <li style:--d="{0.6 + i * STEP}s">
        <span class="emblem" style:color="hsl({soul.hue}, 75%, 72%)" aria-hidden="true"><Emblem size={22} /></span>
        <div class="body">
          <p class="who">
            {entry.name}
            <span class="verdict {entry.verdict}"><VerdictIcon size={12} strokeWidth={3} aria-hidden="true" />{VERDICT_LABELS[entry.verdict]}</span>
          </p>
          <p class="verse">“{entry.verse}”</p>
          <p class="result"><span aria-hidden="true">→</span> {entry.andSo}</p>
        </div>
      </li>
    {/each}
  </ol>

  <p class="scribe" style:--d="{0.6 + entries.length * STEP}s">The Scribe: “{remark}”</p>

  <div class="actions" style:--d="{0.6 + entries.length * STEP + 0.2}s">
    <button type="button" class="btn primary" bind:this={primary} onclick={() => game.nextDay()}>
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
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
    margin-bottom: 0.6rem;
    padding: 0.8rem 0.9rem;
    border-radius: 14px;
    background: rgb(245 236 215 / 0.07);
    box-shadow: inset 0 0 0 1px rgb(245 236 215 / 0.12);
    animation: card-in 0.45s ease-out var(--d) both;
  }

  .emblem {
    display: grid;
    place-items: center;
    flex: 0 0 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background: rgb(15 18 38 / 0.6);
  }

  .body {
    flex: 1;
  }

  p {
    margin: 0;
  }

  .who {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    opacity: 0.85;
  }

  .verdict {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0 0.45rem;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .verdict.rise {
    background: var(--gold);
    color: var(--ink);
  }

  .verdict.return {
    background: var(--teal);
  }

  .verdict.fall {
    background: var(--ember);
  }

  .verse {
    margin-top: 0.15rem;
    font-family: var(--serif);
    font-size: 1.35rem;
    line-height: 1.2;
  }

  .result {
    margin-top: 0.3rem;
    color: #f0d9a8;
    animation: fade-in 0.4s ease-out calc(var(--d) + 0.3s) both;
  }

  .scribe {
    margin-top: 1.2rem;
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.2rem;
    animation: fade-in 0.4s ease-out var(--d) both;
  }

  .actions {
    animation: fade-in 0.4s ease-out var(--d) both;
  }

  .all li,
  .all .result,
  .all .scribe,
  .all .actions {
    animation: none;
  }

  @keyframes card-in {
    from {
      opacity: 0;
      transform: translateX(-14px);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }
</style>
