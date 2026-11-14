<script lang="ts">
  import { ENDINGS } from '../content/endings';
  import { EYES, type EndingId } from '../game/types';
  import { EMBLEM_ICONS } from './emblemIcons';
  import { game } from './game.svelte';
  import { EYE_LABELS } from './labels';

  const met = $derived(game.content.souls.filter((s) => game.book.soulsMet.includes(s.id)));
  const total = game.content.souls.length;
  const endingIds = Object.keys(ENDINGS) as EndingId[];
  const reigns = $derived(game.book.reignsCompleted);
</script>

<div class="souls">
  <p class="summary">
    {met.length} of {total} souls met · {reigns} reign{reigns === 1 ? '' : 's'} completed
  </p>

  <h3>Endings</h3>
  <ul class="endings">
    {#each endingIds as id (id)}
      {@const seen = game.book.endingsSeen.includes(id)}
      <li class:seen>{seen ? ENDINGS[id].title : 'Not yet seen'}</li>
    {/each}
  </ul>

  <h3>Souls</h3>
  {#each met as soul (soul.id)}
    {@const Icon = EMBLEM_ICONS[soul.emblem]}
    <details>
      <summary>
        <span class="icon" style:color="hsl({soul.hue}, 70%, 72%)"><Icon size={18} aria-hidden="true" /></span>
        {soul.name}, {soul.age}
      </summary>
      {#each EYES as eye (eye)}
        <p><strong>{EYE_LABELS[eye]}.</strong> {soul.eyes[eye]}</p>
      {/each}
    </details>
  {:else}
    <p>You have not judged anyone yet.</p>
  {/each}
</div>

<style>
  .souls {
    text-align: left;
  }

  .summary {
    margin: 0;
    text-align: center;
  }

  h3 {
    margin: 1.25rem 0 0.4rem;
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .endings {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .endings li {
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    border: 1px dashed rgb(245 236 215 / 0.35);
    font-size: 0.85rem;
    opacity: 0.7;
  }

  .endings li.seen {
    border: 1px solid var(--gold);
    color: var(--gold);
    opacity: 1;
  }

  details {
    border-bottom: 1px solid rgb(245 236 215 / 0.15);
    padding: 0.35rem 0;
  }

  summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-family: var(--serif);
    font-size: 1.15rem;
  }

  .icon {
    display: inline-grid;
  }

  details p {
    margin: 0.4rem 0 0;
    font-size: 0.9rem;
  }
</style>
