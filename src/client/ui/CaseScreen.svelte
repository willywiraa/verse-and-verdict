<script lang="ts">
  import Gavel from '@lucide/svelte/icons/gavel';
  import { untrack } from 'svelte';
  import { cityOf, crowdOf, currentCase, type DayState } from '@shared/court/court';
  import type { Mood } from '@shared/court/types';
  import CaseFile from './CaseFile.svelte';
  import { court } from './court.svelte';
  import CourtBar from './CourtBar.svelte';
  import PunishmentCard from './PunishmentCard.svelte';
  import { gazeAtCard, reactionTo } from './reactions';
  import type { Gaze, Take } from './rig/parts';

  let { day }: { day: DayState } = $props();

  const CARD_KEYS = ['q', 'w', 'e', 'r'] as const;

  const file = $derived(currentCase(day, court.content!));
  let flipped = $state([false, false, false]);
  let selected = $state<number | null>(null);
  /** The card under the mouse or keyboard focus. */
  let active = $state<number | null>(null);
  /** A brief reaction to evidence: a nervous look away from a twist, or a glance at the tag. */
  let evidence = $state<'twist' | 'look' | null>(null);
  let take = $state<Take | null>(null);
  let evidenceTimer: ReturnType<typeof setTimeout> | undefined;

  // The defendant watches the card the judge is considering, and reacts to how harsh it is.
  const considered = $derived(active ?? selected);
  const reaction = $derived(file && considered !== null ? reactionTo(file.options[considered].scene) : null);
  const mood = $derived<Mood>(evidence === 'twist' ? 'nervous' : (reaction?.mood ?? file?.person.mood ?? 'neutral'));
  const gaze = $derived<Gaze | null>(
    evidence === 'twist'
      ? { x: -0.9, y: -0.2 }
      : evidence === 'look'
        ? { x: 0.7, y: 1 }
        : considered !== null && file
          ? gazeAtCard(considered, file.options.length)
          : null,
  );

  function react(name: Take['name']): void {
    take = { name, id: (untrack(() => take?.id) ?? 0) + 1 };
  }

  // A new card under consideration gets its reaction once: a gulp at prison, a shiver at a ban, a nod at mercy.
  $effect(() => {
    const r = reaction;
    if (r) untrack(() => react(r.take));
  });

  function flip(index: number): void {
    if (flipped[index] || !file) return;
    flipped[index] = true;
    court.cue('flip');
    clearTimeout(evidenceTimer);
    const twist = file.evidence[index]?.twist ?? false;
    evidence = twist ? 'twist' : 'look';
    if (twist) react('shiver');
    evidenceTimer = setTimeout(() => (evidence = null), twist ? 1600 : 900);
  }

  $effect(() => () => clearTimeout(evidenceTimer));

  function select(index: number, byKeyboard = false): void {
    if (!file || index >= file.options.length) return;
    // Enter on the card that is already chosen passes sentence, so the keyboard never has to leave the cards.
    if (byKeyboard && selected === index) {
      sentence();
      return;
    }
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
    <CourtBar caseNumber={day.index + 1} total={day.day.length} crowd={crowdOf(day, court.content!)} built={cityOf(day, court.content!)} />

    <CaseFile {file} number={day.index + 1} {mood} {gaze} {take} {flipped} onflip={flip} />

    <section class="choose" aria-labelledby="choose-title">
      <h2 id="choose-title" class="eyebrow">Pick a punishment</h2>
      <div class="cards" class:four={file.options.length === 4}>
        {#each file.options as option, i (option.scene)}
          <PunishmentCard
            {option}
            keyHint={CARD_KEYS[i]}
            selected={selected === i}
            dimmed={selected !== null && selected !== i}
            onselect={(byKeyboard) => select(i, byKeyboard)}
            onactive={(on) => (active = on ? i : active === i ? null : active)}
          />
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
    gap: 0.75rem;
    max-width: 62rem;
    margin: 0 auto;
    padding: 0.9rem 1rem 2rem;
  }

  .choose {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
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

  .sentence {
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

  /* Once a card is chosen, the button stays in view on short screens, so the verdict is one tap away. */
  .sentence:not(:disabled) {
    position: sticky;
    bottom: 0.75rem;
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
