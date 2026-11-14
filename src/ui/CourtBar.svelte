<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Pictures } from '../court/types';
  import CityTally from './CityTally.svelte';
  import CrowdMeter from './CrowdMeter.svelte';

  let {
    caseNumber,
    total,
    crowd,
    built,
    end,
  }: { caseNumber: number; total: number; crowd: number; built: Pictures[]; end?: Snippet } = $props();
</script>

<header class="bar">
  <span class="case">Case <b>{caseNumber}</b>/{total}</span>
  <CrowdMeter {crowd} />
  <CityTally {built} />
  {#if end}<span class="end">{@render end()}</span>{/if}
</header>

<style>
  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem 1.25rem;
    padding: 0.55rem 0.9rem;
    border: var(--line);
    border-radius: 14px;
    background: var(--paper);
    box-shadow: var(--shadow-small);
  }

  .case {
    font-weight: 700;
  }

  .case b {
    font-size: 1.15rem;
  }

  .end {
    margin-left: auto;
  }
</style>
