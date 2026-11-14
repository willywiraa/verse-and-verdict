<script lang="ts">
  import CaseScreen from './ui/CaseScreen.svelte';
  import { TEXT_SIZES, court } from './ui/court.svelte';
  import CourtTitle from './ui/CourtTitle.svelte';
  import DayReport from './ui/DayReport.svelte';
  import VerdictSequence from './ui/VerdictSequence.svelte';

  const day = $derived(court.screen === 'play' ? court.state : null);

  $effect(() => {
    document.documentElement.style.fontSize = TEXT_SIZES[court.settings.textSize];
  });
</script>

<div class="court">
  {#if !day}
    <CourtTitle />
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
