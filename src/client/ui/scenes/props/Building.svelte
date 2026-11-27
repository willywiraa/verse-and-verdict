<script lang="ts">
  import type { Picture } from '@shared/court/types';
  import { PICTURE_COLORS, PICTURE_ICONS } from '../../pictures';
  import Hospital from './Hospital.svelte';

  /** Something the city builds or repairs: a hospital, or a small building marked with what it is. */
  let { picture }: { picture: Picture } = $props();

  const Icon = $derived(PICTURE_ICONS[picture]);
</script>

{#if picture === 'hospital'}
  <Hospital />
{:else}
  <div class="building" style:--tone={PICTURE_COLORS[picture] ?? 'var(--teal)'}>
    <svg viewBox="0 0 60 72" aria-hidden="true">
      <g stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round">
        <path d="M4 22 H56 V70 H4 Z" fill="#fffdf7" />
        <path d="M1 22 L30 4 L59 22 Z" fill="var(--tone)" />
        <path d="M24 52 H36 V70 H24 Z" fill="#c9a26b" stroke-width="2" />
        <path d="M8 54 H18 V62 H8 Z M42 54 H52 V62 H42 Z" fill="#bfe6ea" stroke-width="2" />
      </g>
    </svg>
    <span class="sign"><Icon size="100%" strokeWidth={2.4} /></span>
  </div>
{/if}

<style>
  .building {
    position: relative;
  }

  svg {
    display: block;
    width: 100%;
    overflow: visible;
  }

  .sign {
    position: absolute;
    left: 31%;
    top: 34%;
    width: 38%;
    aspect-ratio: 1;
    display: grid;
    color: var(--tone);
  }
</style>
