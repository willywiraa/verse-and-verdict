<script lang="ts">
  import type { Picture } from '../court/types';
  import { PICTURE_ICONS } from './pictures';

  let {
    picture,
    count,
    tone = 'ink',
    size = 22,
    delay = 0,
    step = 0.08,
  }: {
    picture: Picture;
    count: number;
    tone?: 'ink' | 'green' | 'red' | 'grey' | 'gold';
    size?: number;
    /** Seconds before the first picture pops in. */
    delay?: number;
    /** Seconds between pictures. */
    step?: number;
  } = $props();

  const Icon = $derived(PICTURE_ICONS[picture]);
</script>

<span class="row {tone}" aria-hidden="true">
  {#each Array.from({ length: count }, (_, i) => i) as i (i)}
    <span class="pic" style:animation-delay="{delay + i * step}s"><Icon {size} strokeWidth={2.25} /></span>
  {/each}
</span>

<style>
  .row {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.15rem;
    vertical-align: middle;
  }

  .pic {
    display: grid;
    animation: pop 0.35s cubic-bezier(0.3, 1.7, 0.5, 1) both;
  }

  .ink {
    color: var(--ink);
  }

  .green {
    color: var(--green-deep);
  }

  .red {
    color: var(--red-deep);
  }

  .grey {
    color: #8a93a6;
  }

  .gold {
    color: #b98a17;
  }

  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.2);
    }
  }
</style>
