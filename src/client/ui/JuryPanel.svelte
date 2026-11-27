<script lang="ts">
  import Users from '@lucide/svelte/icons/users';
  import type { Case } from '@shared/court/types';
  import { majority, percent } from '@shared/progress';

  /** How everyone else ruled on this case, with the player's choice marked. */
  let { file, chosen, counts }: { file: Case; chosen: number; counts: readonly number[] | null } = $props();

  const total = $derived(counts ? counts.reduce((a, b) => a + b, 0) : 0);
  const top = $derived(counts ? majority(counts) : -1);
  const mine = $derived(counts ? percent(counts, chosen) : 0);
  const verdictLine = $derived(
    !counts || total <= 1
      ? 'You are the first judge on this case.'
      : chosen === top
        ? `You sided with ${mine}% of Reddit.`
        : `Only ${mine}% of Reddit agreed with you.`,
  );
</script>

<section class="jury" aria-label="How Reddit ruled">
  <header>
    <span class="title"><Users size={16} strokeWidth={2.5} aria-hidden="true" /> How Reddit ruled</span>
    {#if counts}<span class="total">{total.toLocaleString('en-US')} {total === 1 ? 'judge' : 'judges'}</span>{/if}
  </header>
  {#if counts}
    <ul>
      {#each file.options as option, i (option.scene)}
        {@const share = percent(counts, i)}
        <li class:mine={i === chosen} class:top={i === top}>
          <span class="label">{option.label}{#if i === chosen}<b class="you">You</b>{/if}</span>
          <span class="bar"><span class="fill" style:--w="{share}%" style:--d="{i * 0.08}s"></span></span>
          <span class="pct">{share}%</span>
        </li>
      {/each}
    </ul>
    <p class="line">{verdictLine}</p>
  {:else}
    <p class="line counting">Counting the votes…</p>
  {/if}
</section>

<style>
  .jury {
    width: min(100%, 30rem);
    padding: 0.55rem 0.8rem 0.6rem;
    border: var(--line);
    border-radius: 12px;
    background: var(--paper);
    box-shadow: var(--shadow-small);
    animation: rise 0.35s cubic-bezier(0.3, 1.5, 0.5, 1) both;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.35rem;
  }

  .title {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 900;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .total {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ink-soft);
  }

  ul {
    display: grid;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    grid-template-columns: 7.5rem 1fr 2.6rem;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 700;
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .you {
    padding: 0 0.35rem;
    border-radius: 999px;
    background: var(--red);
    color: #fff;
    font-size: 0.68rem;
    text-transform: uppercase;
  }

  .bar {
    height: 0.8rem;
    border: 2px solid var(--ink);
    border-radius: 999px;
    background: #fff;
    overflow: hidden;
  }

  .fill {
    display: block;
    width: var(--w);
    height: 100%;
    background: #9aa5b1;
    animation: grow 0.7s cubic-bezier(0.3, 1.1, 0.5, 1) var(--d) both;
  }

  .top .fill {
    background: var(--gold);
  }

  .mine .fill {
    background: var(--red);
  }

  .pct {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .line {
    margin: 0.4rem 0 0;
    font-weight: 800;
    font-size: 0.9rem;
  }

  .counting {
    color: var(--ink-soft);
  }

  @keyframes grow {
    from {
      width: 0;
    }
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  @media (max-width: 420px) {
    li {
      grid-template-columns: 6rem 1fr 2.4rem;
      font-size: 0.8rem;
    }
  }
</style>
