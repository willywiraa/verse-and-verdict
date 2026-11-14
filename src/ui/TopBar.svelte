<script lang="ts">
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import { RETURNS_PER_DAY } from '../game/config';
  import type { ReignState } from '../game/reign';
  import Lamp from './Lamp.svelte';
  import MenuButton from './MenuButton.svelte';

  /** `faith` can lag behind the reign so the lamp changes in step with the aftermath. */
  let { reign, faith }: { reign: ReignState; faith: number } = $props();
</script>

<header class="topbar">
  <p class="where" aria-label="Day {reign.day}, soul {reign.index + 1} of {reign.docket.length}">
    <span>Day {reign.day}</span>
    <span class="count" aria-hidden="true">{reign.index + 1}/{reign.docket.length}</span>
  </p>
  <Lamp {faith} />
  <p class="returns" aria-label="{reign.returnsLeft} of {RETURNS_PER_DAY} Returns left today" title="Returns left today">
    {#each { length: RETURNS_PER_DAY } as _, i (i)}
      <span class="ring" class:spent={i >= reign.returnsLeft} aria-hidden="true"><RefreshCw size={16} strokeWidth={2.4} /></span>
    {/each}
  </p>
  <MenuButton />
</header>

<style>
  .topbar {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.5rem max(1rem, calc((100% - 720px) / 2));
    background: rgb(15 18 38 / 0.72);
    backdrop-filter: blur(6px);
    font-size: 0.85rem;
  }

  p {
    margin: 0;
  }

  .where {
    display: flex;
    gap: 0.5rem;
    font-weight: 600;
  }

  .count {
    opacity: 0.75;
    font-weight: 400;
  }

  .returns {
    display: flex;
    gap: 0.25rem;
  }

  .ring {
    display: grid;
    color: var(--teal-light);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .ring.spent {
    opacity: 0.25;
    transform: scale(0.85);
  }
</style>
