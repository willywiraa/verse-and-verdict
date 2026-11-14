<script lang="ts">
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import { RETURN_SPENT } from '../content/scribe';
  import { canGive, type ReignState } from '../game/reign';
  import { VERDICTS, type Verdict } from '../game/types';
  import { VERDICT_LABELS, VERDICT_MEANINGS } from './labels';

  let { reign, onchoose }: { reign: ReignState; onchoose: (verdict: Verdict) => void } = $props();

  const ICONS = { rise: ArrowUp, return: RefreshCw, fall: ArrowDown } as const;
  const KEYS = { rise: '↑', return: '→', fall: '↓' } as const;
</script>

<nav class="verdicts" class:awake={reign.eye !== null} aria-label="Verdict">
  {#each VERDICTS as verdict, i (verdict)}
    {@const Icon = ICONS[verdict]}
    {@const spent = verdict === 'return' && reign.returnsLeft === 0}
    <button
      type="button"
      class="verdict {verdict}"
      style:--i={i}
      disabled={!canGive(reign, verdict)}
      onclick={() => onchoose(verdict)}
    >
      <span class="icon" aria-hidden="true"><Icon size={26} strokeWidth={2.25} /></span>
      <span class="name">{VERDICT_LABELS[verdict]}</span>
      <span class="meaning">{spent ? RETURN_SPENT : VERDICT_MEANINGS[verdict]}</span>
      <span class="key" aria-hidden="true">{KEYS[verdict]}</span>
    </button>
  {/each}
</nav>

<style>
  .verdicts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    margin-top: 1rem;
  }

  .verdict {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    padding: 0.75rem 0.4rem 0.65rem;
    border: none;
    border-radius: 16px;
    box-shadow: 0 8px 22px rgb(0 0 0 / 0.3);
    transition:
      transform 0.15s ease,
      filter 0.15s ease,
      opacity 0.25s ease;
  }

  .verdict:disabled {
    opacity: 0.45;
    box-shadow: none;
  }

  .awake .verdict:not(:disabled) {
    animation: wake 0.6s ease-out calc(var(--i) * 0.08s) both;
  }

  .verdict:hover:not(:disabled) {
    transform: translateY(-3px);
    filter: brightness(1.08);
  }

  .verdict:active:not(:disabled) {
    transform: translateY(1px) scale(0.98);
  }

  .icon {
    display: grid;
  }

  .name {
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  .meaning {
    font-size: 0.8rem;
    opacity: 0.9;
    text-align: center;
  }

  .key {
    position: absolute;
    top: 0.35rem;
    right: 0.55rem;
    font-size: 0.75rem;
    opacity: 0.6;
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

  @keyframes wake {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.06);
      filter: brightness(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
