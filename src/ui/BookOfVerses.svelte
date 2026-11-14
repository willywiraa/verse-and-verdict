<script lang="ts">
  import { versesOf, type ReignState, type VerseEntry } from '../game/reign';
  import { game } from './game.svelte';
  import { VERDICT_LABELS } from './labels';

  let { reign }: { reign: ReignState } = $props();

  const days = $derived.by(() => {
    const byDay = new Map<number, VerseEntry[]>();
    for (const entry of versesOf(reign, game.content)) {
      byDay.set(entry.day, [...(byDay.get(entry.day) ?? []), entry]);
    }
    return [...byDay.entries()];
  });
</script>

<div class="book">
  {#each days as [day, entries] (day)}
    <section>
      <h3>Day {day}</h3>
      <ol>
        {#each entries as entry (entry.soul)}
          <li>
            <span class="verse">“{entry.verse}”</span>
            <span class="on">{VERDICT_LABELS[entry.verdict]} · {entry.name}</span>
          </li>
        {/each}
      </ol>
    </section>
  {:else}
    <p>No Verses yet.</p>
  {/each}
</div>

<style>
  .book {
    text-align: left;
  }

  h3 {
    margin: 1rem 0 0.25rem;
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 0.4rem 0;
    border-bottom: 1px solid rgb(245 236 215 / 0.15);
  }

  .verse {
    display: block;
    font-family: var(--serif);
    font-size: 1.15rem;
  }

  .on {
    font-size: 0.8rem;
    opacity: 0.75;
  }
</style>
