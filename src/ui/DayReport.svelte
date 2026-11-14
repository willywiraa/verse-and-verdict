<script lang="ts">
  import type { DayState } from '../court/court';
  import { TITLES, dayReport, fairnessLine } from '../court/report';
  import { court } from './court.svelte';

  let { day }: { day: DayState } = $props();

  const report = $derived(dayReport(day, court.content));
</script>

<main class="report">
  <p class="eyebrow">Court is over</p>
  <h1>{TITLES[report.title].name}</h1>
  <p>{TITLES[report.title].line}</p>
  <p>Crowd: {report.crowd}/10</p>
  {#if report.fairness}<p>{fairnessLine(report.fairness)}</p>{/if}
  <div class="actions">
    <button type="button" class="btn primary" onclick={() => court.startDay()}>Play again</button>
  </div>
</main>

<style>
  .report {
    max-width: 40rem;
    margin: 0 auto;
    padding: 3rem 1rem;
    text-align: center;
  }

  h1 {
    margin: 0.3rem 0;
    font-family: var(--serif);
    font-size: 2.6rem;
  }
</style>
