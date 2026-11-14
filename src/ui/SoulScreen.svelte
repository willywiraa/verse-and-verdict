<script lang="ts">
  import { tick } from 'svelte';
  import { DAY_ONE_HINTS, FIRST_VERDICT_HINT, REACTIONS, RETURN_SPENT } from '../content/scribe';
  import { canGive, echoCause, faceOf, soulById, type ReignState } from '../game/reign';
  import { EYES, VERDICTS, type Verdict } from '../game/types';
  import { game } from './game.svelte';
  import { EYE_LABELS, VERDICT_LABELS } from './labels';
  import TopBar from './TopBar.svelte';
  import Wisp from './Wisp.svelte';

  let { reign }: { reign: ReignState } = $props();

  const soul = $derived(soulById(game.content, reign.docket[reign.index]));
  const face = $derived(faceOf(soul, reign));
  const cause = $derived(echoCause(soul, reign, game.content));
  const firstDay = $derived(reign.firstReign && reign.day === 1);
  const hint = $derived(firstDay ? DAY_ONE_HINTS[reign.index] : undefined);
  const outcome = $derived(reign.verdict ? soul.verdicts[reign.verdict] : null);
  const unseen = $derived(EYES.filter((e) => e !== reign.eye));
  const lastOfDay = $derived(reign.index === reign.docket.length - 1);

  let nameEl = $state<HTMLHeadingElement>();
  let nextEl = $state<HTMLButtonElement>();

  // Move focus to each new soul, and to the Next button once judged.
  $effect(() => {
    void soul.id;
    tick().then(() => nameEl?.focus({ preventScroll: true }));
  });
  $effect(() => {
    if (reign.verdict) tick().then(() => nextEl?.focus({ preventScroll: true }));
  });

  const VERDICT_KEYS: Readonly<Record<string, Verdict>> = { ArrowUp: 'rise', ArrowRight: 'return', ArrowDown: 'fall' };

  /** Enter and Space on a focused button already click it; don't handle them twice. */
  function onControl(target: EventTarget | null): boolean {
    return target instanceof Element && target.closest('button, a, input') !== null;
  }

  function onKeydown(event: KeyboardEvent) {
    if (game.overlay || event.altKey || event.ctrlKey || event.metaKey) return;
    if (reign.eye === null) {
      const i = ['1', '2', '3'].indexOf(event.key);
      if (i >= 0) {
        event.preventDefault();
        game.openEye(EYES[i]);
      }
    } else if (reign.verdict === null) {
      const verdict = VERDICT_KEYS[event.key];
      if (verdict && canGive(reign, verdict)) {
        event.preventDefault();
        game.giveVerdict(verdict);
      }
    } else if ((event.key === 'Enter' || event.key === ' ') && !onControl(event.target)) {
      event.preventDefault();
      game.nextSoul();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<TopBar {reign} />

<main class="stage">
  <article class="card" aria-labelledby="soul-name">
    {#if hint}
      <p class="scribe"><span>The Scribe</span>{hint}</p>
    {/if}

    {#key soul.id}
      <Wisp hue={soul.hue} emblem={soul.emblem} verdict={reign.verdict} />
    {/key}

    {#if cause}
      <p class="cause">Because of your Verse on {cause.rootName}: <q>{cause.verse}</q></p>
    {/if}

    <h1 id="soul-name" class="name" tabindex="-1" bind:this={nameEl}>{soul.name}, {soul.age}</h1>
    <p class="death">{soul.death}</p>

    <section class="record" aria-label="The Record">
      <h2>The Record</h2>
      <p>{face.record}</p>
    </section>
    <p class="plea">{face.plea}</p>

    {#if outcome && reign.eye}
      <section class="aftermath" aria-live="polite">
        <h2>The Verse</h2>
        <p class="verse"><span>{outcome.verse}</span></p>
        <p class="reaction">{REACTIONS[outcome.faith]}</p>

        <h2>What you saw</h2>
        <p class="eye-text"><strong>{EYE_LABELS[reign.eye]}.</strong> {soul.eyes[reign.eye]}</p>

        <h2>What you did not see</h2>
        {#each unseen as eye (eye)}
          <p class="eye-text unveiled"><strong>{EYE_LABELS[eye]}.</strong> {soul.eyes[eye]}</p>
        {/each}

        {#if firstDay && reign.index === 0}
          <p class="scribe"><span>The Scribe</span>{FIRST_VERDICT_HINT}</p>
        {/if}
      </section>
      <button type="button" class="btn primary next" bind:this={nextEl} onclick={() => game.nextSoul()}>
        {lastOfDay ? 'End the Day' : 'Next soul'}
      </button>
    {:else}
      <div class="eyes" role="group" aria-label="Open one Eye">
        {#each EYES as eye, i (eye)}
          <button
            type="button"
            class="eye"
            class:open={reign.eye === eye}
            aria-pressed={reign.eye === eye}
            disabled={reign.eye !== null && reign.eye !== eye}
            onclick={() => game.openEye(eye)}
          >
            <span class="key" aria-hidden="true">{i + 1}</span>{EYE_LABELS[eye]}
          </button>
        {/each}
      </div>
      <div class="eye-panel" aria-live="polite">
        {#if reign.eye}
          <p class="eye-text"><strong>{EYE_LABELS[reign.eye]}.</strong> {soul.eyes[reign.eye]}</p>
        {:else}
          <p class="eye-hint">Open one Eye before you judge: what they did, why, or what it caused.</p>
        {/if}
      </div>
    {/if}
  </article>

  {#if reign.verdict === null}
    <nav class="verdicts" aria-label="Verdict">
      {#each VERDICTS as verdict (verdict)}
        {@const spent = verdict === 'return' && reign.returnsLeft === 0}
        <button
          type="button"
          class="verdict {verdict}"
          disabled={!canGive(reign, verdict)}
          onclick={() => game.giveVerdict(verdict)}
        >
          <span class="verdict-name">{VERDICT_LABELS[verdict]}</span>
          <span class="verdict-sentence">{spent ? RETURN_SPENT : soul.verdicts[verdict].fate}</span>
        </button>
      {/each}
    </nav>
  {/if}
</main>

<style>
  .stage {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem 1rem 2rem;
  }

  .card {
    background: var(--parchment);
    color: var(--ink);
    border-radius: 18px;
    padding: 1.25rem clamp(1rem, 4vw, 2rem) 1.5rem;
    box-shadow:
      0 18px 50px rgb(0 0 0 / 0.35),
      inset 0 0 0 1px var(--parchment-edge);
  }

  .scribe {
    margin: 0 0 0.75rem;
    padding-left: 0.75rem;
    border-left: 3px solid var(--gold);
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.15rem;
    color: var(--ink-soft);
  }

  .scribe span {
    display: block;
    font-family: var(--sans);
    font-style: normal;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .cause {
    margin: 0 0 0.5rem;
    text-align: center;
    font-size: 0.85rem;
    color: var(--ink-soft);
  }

  .cause q {
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.05rem;
    color: var(--ink);
  }

  .name {
    margin: 0;
    text-align: center;
    font-family: var(--serif);
    font-weight: 600;
    font-size: 2rem;
    line-height: 1.1;
    outline: none;
  }

  .death {
    margin: 0.25rem 0 1rem;
    text-align: center;
    color: var(--ink-soft);
  }

  h2 {
    margin: 1rem 0 0.25rem;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  .record p {
    margin: 0;
  }

  .plea {
    margin: 0.75rem 0 0;
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.25rem;
  }

  .eyes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-top: 1.25rem;
  }

  .eye {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 0.5rem;
    border-radius: 999px;
    border: 1.5px solid var(--ink-soft);
    background: transparent;
    color: var(--ink);
    font-weight: 600;
    transition:
      background-color 0.2s ease,
      opacity 0.2s ease;
  }

  .eye:hover:not(:disabled) {
    background: rgb(42 36 51 / 0.08);
  }

  .eye.open {
    background: var(--ink);
    color: var(--parchment);
  }

  .eye:disabled:not(.open) {
    opacity: 0.4;
  }

  .key {
    display: inline-grid;
    place-items: center;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    border: 1px solid currentColor;
    font-size: 0.7rem;
  }

  .eye-panel {
    min-height: 4.5rem;
  }

  .eye-text {
    margin: 0.75rem 0 0;
    animation: open-eye 0.3s ease-out both;
  }

  .eye-hint {
    margin: 0.75rem 0 0;
    color: var(--ink-soft);
    font-size: 0.9rem;
    text-align: center;
  }

  .unveiled {
    animation-delay: 0.35s;
  }

  .unveiled:last-of-type {
    animation-delay: 0.55s;
  }

  .verse {
    margin: 0;
    font-family: var(--serif);
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.25;
  }

  .verse span {
    background: linear-gradient(var(--gold), var(--gold)) no-repeat left bottom / 0% 2px;
    animation: quill 0.6s ease-out 0.2s forwards;
    padding-bottom: 2px;
  }

  .reaction {
    margin: 0.4rem 0 0;
    font-weight: 600;
  }

  .aftermath .scribe {
    margin-top: 1rem;
  }

  .next {
    display: block;
    margin: 1.25rem auto 0;
    min-width: 12rem;
  }

  .verdicts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    margin-top: 1rem;
  }

  .verdict {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.8rem 0.9rem;
    border: none;
    border-radius: 14px;
    text-align: left;
    box-shadow: 0 8px 22px rgb(0 0 0 / 0.3);
    transition:
      transform 0.15s ease,
      filter 0.15s ease,
      opacity 0.2s ease;
  }

  .verdict:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.06);
  }

  .verdict:disabled {
    opacity: 0.55;
    box-shadow: none;
  }

  .verdict-name {
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.85rem;
  }

  .verdict-sentence {
    font-size: 0.9rem;
    line-height: 1.35;
  }

  .rise {
    background: var(--gold);
    color: var(--ink);
  }

  .return {
    background: var(--teal);
    color: var(--parchment);
  }

  .fall {
    background: var(--ember);
    color: var(--parchment);
  }

  @keyframes open-eye {
    from {
      opacity: 0;
      transform: scaleY(0.85);
    }
  }

  @keyframes quill {
    to {
      background-size: 100% 2px;
    }
  }

  @media (max-width: 560px) {
    .verdicts {
      grid-template-columns: 1fr;
    }

    .verdict {
      flex-direction: row;
      align-items: baseline;
      gap: 0.75rem;
    }

    .verdict-name {
      flex: 0 0 4.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .verse span {
      animation: none;
      background-size: 100% 2px;
    }
  }
</style>
