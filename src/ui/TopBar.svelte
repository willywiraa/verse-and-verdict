<script lang="ts">
  import { RETURNS_PER_DAY } from '../game/config';
  import type { ReignState } from '../game/reign';
  import Lamp from './Lamp.svelte';
  import MenuButton from './MenuButton.svelte';

  let { reign }: { reign: ReignState } = $props();
</script>

<header class="topbar">
  <p class="where">Day {reign.day} · Soul {reign.index + 1} of {reign.docket.length}</p>
  <Lamp faith={reign.faith} />
  <p class="returns" aria-label="{reign.returnsLeft} of {RETURNS_PER_DAY} Returns left today">
    <span aria-hidden="true">Returns</span>
    {#each { length: RETURNS_PER_DAY } as _, i (i)}
      <span class="ring" class:spent={i >= reign.returnsLeft} aria-hidden="true"></span>
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    padding: 0.5rem max(1rem, calc((100% - 720px) / 2));
    background: rgb(15 18 38 / 0.72);
    backdrop-filter: blur(6px);
    font-size: 0.85rem;
  }

  p {
    margin: 0;
  }

  .returns {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .ring {
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    border: 2px solid var(--teal-light);
    background: var(--teal-light);
    transition: background-color 0.3s ease;
  }

  .ring.spent {
    background: transparent;
  }

  @media (max-width: 480px) {
    .where {
      flex-basis: 100%;
      order: -1;
    }
  }
</style>
