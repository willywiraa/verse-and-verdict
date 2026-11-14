<script lang="ts">
  import Gavel from '@lucide/svelte/icons/gavel';
  import { cityOf, crowdOf, currentCase, type DayState } from '../court/court';
  import type { Mood } from '../court/types';
  import CaseFile from './CaseFile.svelte';
  import { court } from './court.svelte';
  import CourtBar from './CourtBar.svelte';
  import PunishmentCard from './PunishmentCard.svelte';

  let { day }: { day: DayState } = $props();

  const CARD_KEYS = ['q', 'w', 'e', 'r'] as const;

  const file = $derived(currentCase(day, court.content));
  let flipped = $state([false, false, false]);
  let selected = $state<number | null>(null);

  // They sneak a nervous look while the judge holds a card.
  const mood = $derived<Mood>(selected !== null && file?.person.mood === 'smug' ? 'nervous' : (file?.person.mood ?? 'nervous'));

  function flip(index: number): void {
    if (flipped[index]) return;
    flipped[index] = true;
    court.cue('flip');
  }

  function select(index: number): void {
    if (!file || index >= file.options.length) return;
    selected = index;
    court.cue('select');
  }

  function sentence(): void {
    if (selected !== null) court.sentence(selected);
  }

  function onKeydown(event: KeyboardEvent): void {
    if (court.menuOpen || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === '1' || key === '2' || key === '3') {
      event.preventDefault();
      flip(Number(key) - 1);
    } else if ((CARD_KEYS as readonly string[]).includes(key)) {
      event.preventDefault();
      select(CARD_KEYS.indexOf(key as (typeof CARD_KEYS)[number]));
    } else if (key === 'enter' && selected !== null && !(event.target instanceof HTMLButtonElement)) {
      // A focused button handles Enter itself, so Enter on a card picks it rather than sentencing.
      event.preventDefault();
      sentence();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if file}
  <main class="screen">
    <CourtBar caseNumber={day.index + 1} total={day.day.length} crowd={crowdOf(day, court.content)} built={cityOf(day, court.content)} />

    <CaseFile {file} number={day.index + 1} {mood} {flipped} onflip={flip} />

    <section class="choose" aria-labelledby="choose-title">
      <h2 id="choose-title" class="eyebrow">Pick a punishment</h2>
      <div class="cards" class:four={file.options.length === 4}>
        {#each file.options as option, i (option.scene)}
          <PunishmentCard {option} keyHint={CARD_KEYS[i]} selected={selected === i} onselect={() => select(i)} />
        {/each}
      </div>
      <button type="button" class="btn primary sentence" disabled={selected === null} onclick={sentence}>
        <Gavel size={22} strokeWidth={2.5} aria-hidden="true" />
        {selected === null ? 'Pick a card' : 'Sentence'}
        {#if selected !== null}<span class="key-hint" aria-hidden="true">Enter</span>{/if}
      </button>
    </section>
  </main>
{/if}

<style>
  .screen {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 62rem;
    margin: 0 auto;
    padding: 0.9rem 1rem 2rem;
  }

  .choose {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .choose .eyebrow {
    align-self: flex-start;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    width: 100%;
  }

  .cards.four {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  /* Stays in view on short screens, so the verdict is always one tap away. */
  .sentence {
    position: sticky;
    bottom: 0.75rem;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 13rem;
    justify-content: center;
    padding: 0.75rem 1.6rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sentence:not(:disabled) {
    animation: ready 0.4s cubic-bezier(0.3, 1.8, 0.5, 1);
  }

  .sentence .key-hint {
    color: #fff;
  }

  @keyframes ready {
    50% {
      transform: scale(1.08);
    }
  }

  @media (max-width: 640px) {
    .cards,
    .cards.four {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }
</style>
