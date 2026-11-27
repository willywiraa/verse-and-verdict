<script lang="ts">
  import Building from '@lucide/svelte/icons/building';
  import type { Pictures } from '@shared/court/types';
  import { PICTURE_COLORS, PICTURE_ICONS } from './pictures';

  let { built }: { built: Pictures[] } = $props();

  const label = $derived(
    built.length === 0 ? 'Nothing built yet' : `Built: ${built.map((b) => `${b.count} ${b.picture}`).join(', ')}`,
  );
</script>

<div class="tally" role="img" aria-label={label}>
  {#if built.length === 0}
    <span class="item empty" aria-hidden="true"><Building size={18} strokeWidth={2.25} />0</span>
  {:else}
    {#each built as b (b.picture)}
      {@const Icon = PICTURE_ICONS[b.picture]}
      {#key b.count}
        <span class="item" style:color={PICTURE_COLORS[b.picture]} aria-hidden="true">
          <Icon size={18} strokeWidth={2.5} /><b>{b.count}</b>
        </span>
      {/key}
    {/each}
  {/if}
</div>

<style>
  .tally {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .item {
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
    font-weight: 900;
    animation: bump 0.45s cubic-bezier(0.3, 1.8, 0.5, 1);
  }

  .item b {
    color: var(--ink);
  }

  .empty {
    opacity: 0.45;
    animation: none;
  }

  @keyframes bump {
    40% {
      transform: scale(1.35);
    }
  }
</style>
