<script lang="ts">
  import { onMount } from 'svelte';
  import CaseScreen from './ui/CaseScreen.svelte';
  import { TEXT_SIZES, court } from './ui/court.svelte';
  import DayReport from './ui/DayReport.svelte';
  import VerdictSequence from './ui/VerdictSequence.svelte';

  /** The full-size game: today's docket, case by case, then the result card. */
  onMount(() => {
    void court.load();
  });

  const day = $derived(court.status === 'ready' ? court.state : null);

  $effect(() => {
    document.documentElement.style.fontSize = TEXT_SIZES[court.settings.textSize];
  });
</script>

<div class="court">
  {#if court.status === 'error'}
    <main class="notice">
      <p>The courtroom doors are stuck.</p>
      <button type="button" class="btn primary" onclick={() => court.load()}>Try again</button>
    </main>
  {:else if !day}
    <main class="notice" aria-busy="true"><p class="opening">Opening court…</p></main>
  {:else if day.phase === 'case'}
    {#key day.index}
      <CaseScreen {day} />
    {/key}
  {:else if day.phase === 'verdict'}
    <VerdictSequence {day} />
  {:else}
    <DayReport {day} />
  {/if}
</div>

<style>
  .notice {
    display: grid;
    place-items: center;
    align-content: center;
    gap: 1rem;
    min-height: 100vh;
    min-height: 100dvh;
    font-weight: 800;
  }

  .opening {
    animation: breathe 1.2s ease-in-out infinite alternate;
  }

  @keyframes breathe {
    from {
      opacity: 0.4;
    }
  }
</style>
