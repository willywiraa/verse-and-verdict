<script lang="ts">
  import { lastVerdict, type DayState } from '../court/court';
  import { court } from './court.svelte';

  let { day }: { day: DayState } = $props();

  const verdict = $derived(lastVerdict(day, court.content));

  function onKeydown(event: KeyboardEvent): void {
    if (court.menuOpen) return;
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target instanceof HTMLButtonElement) return;
      event.preventDefault();
      court.next();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if verdict}
  <main class="verdict">
    <p class="stamp">Sentenced</p>
    <h1>{verdict.option.label}: {verdict.option.detail}</h1>
    <p class="headline">{verdict.option.headline}</p>
    {#if verdict.option.note}<p class="note">{verdict.option.note}</p>{/if}
    <button type="button" class="btn go" onclick={() => court.next()}>Next case →</button>
  </main>
{/if}

<style>
  .verdict {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    max-width: 40rem;
    margin: 0 auto;
    padding: 3rem 1rem;
    text-align: center;
  }

  .stamp {
    margin: 0;
    padding: 0.2rem 1rem;
    border: 4px solid var(--red);
    border-radius: 8px;
    color: var(--red);
    font-weight: 900;
    font-size: 1.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transform: rotate(-4deg);
  }

  h1 {
    margin: 0;
  }

  .headline {
    margin: 0;
    font-family: var(--serif);
    font-size: 1.8rem;
    font-weight: 600;
  }

  .note {
    margin: 0;
    font-weight: 700;
  }
</style>
