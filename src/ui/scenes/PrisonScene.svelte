<script lang="ts">
  import type { Case, Option } from '../../court/types';
  import Defendant from '../Defendant.svelte';
  import Puff from './Puff.svelte';

  /** Prison: a puff, an orange uniform, the bars come down, and the years are scratched on the wall. */
  let { file, option }: { file: Case; option: Extract<Option, { scene: 'prison' }> } = $props();

  // Tally marks in groups of five, at most 50.
  const marks = $derived(
    Array.from({ length: Math.min(option.years, 50) }, (_, i) => {
      const group = Math.floor(i / 5);
      const inGroup = i % 5;
      return { i, group, inGroup, x: group * 22 + inGroup * 4 };
    }),
  );
  const groups = $derived(Math.ceil(marks.length / 5));
</script>

<div class="scene prison">
  <div class="wall"></div>
  <div class="floor"></div>

  <div class="tally" aria-hidden="true">
    <svg viewBox="0 0 {Math.max(groups * 22, 22)} 24" preserveAspectRatio="xMinYMid meet">
      {#each marks as m (m.i)}
        {#if m.inGroup === 4}
          <path class="mark" d="M{m.group * 22 - 2} 18 L{m.group * 22 + 16} 4" style:--d="{1.6 + m.i * 0.045}s" />
        {:else}
          <path class="mark" d="M{m.x} 2 L{m.x} 22" style:--d="{1.6 + m.i * 0.045}s" />
        {/if}
      {/each}
    </svg>
    <span class="years">{option.detail}</span>
  </div>

  <div class="person">
    <div class="before"><Defendant look={file.person.look} mood="shocked" /></div>
    <div class="after"><Defendant look={file.person.look} mood="sad" outfit="prison" /></div>
    <Puff at={0.4} />
  </div>

  <svg class="bars" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <g fill="#5b6478" stroke="var(--ink)" stroke-width="1.2" vector-effect="non-scaling-stroke">
      {#each [6, 22, 38, 54, 70, 86] as x (x)}
        <rect x={x} y="-2" width="7" height="104" rx="2" />
      {/each}
      <rect x="4" y="20" width="92" height="6" rx="2" />
    </g>
  </svg>
</div>

<style>
  .scene {
    position: absolute;
    inset: 0;
    container-type: inline-size;
    overflow: hidden;
  }

  .wall {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(0deg, transparent 0 22px, rgb(31 42 68 / 0.18) 22px 24px),
      repeating-linear-gradient(90deg, transparent 0 46px, rgb(31 42 68 / 0.12) 46px 48px),
      #b9c0cc;
  }

  .floor {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 14%;
    border-top: var(--line);
    background: #8e96a6;
  }

  .tally {
    position: absolute;
    top: 9%;
    left: 6%;
    width: 26%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .tally svg {
    width: 100%;
    height: auto;
    max-height: 3.5rem;
    overflow: visible;
  }

  .mark {
    fill: none;
    stroke: var(--ink);
    stroke-width: 2.5;
    stroke-linecap: round;
    animation: scratch 0.12s ease-out var(--d) both;
  }

  .years {
    font-weight: 900;
    font-size: clamp(0.9rem, 4cqi, 1.5rem);
    text-transform: uppercase;
    animation: appear 0.3s ease-out 1.5s both;
  }

  /* Sized by height, so the head always fits under the top of the cell. */
  .person {
    position: absolute;
    left: 50%;
    bottom: 6%;
    height: 80%;
    aspect-ratio: 120 / 130;
    transform: translateX(-50%);
  }

  .before,
  .after {
    width: 100%;
  }

  .before {
    position: absolute;
    inset: 0;
    opacity: 0;
    animation: hold-then-hide 0.6s step-end both;
  }

  .after {
    animation: appear 0.01s linear 0.6s both;
  }

  .bars {
    position: absolute;
    left: 28%;
    width: 44%;
    top: 0;
    height: 86%;
    animation: slam 0.5s cubic-bezier(0.5, 0, 0.6, 1.4) 1s both;
  }

  @keyframes hold-then-hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
  }

  @keyframes slam {
    from {
      transform: translateY(-105%);
    }
  }

  @keyframes scratch {
    from {
      opacity: 0;
      stroke-dasharray: 30;
      stroke-dashoffset: 30;
    }
    to {
      opacity: 1;
      stroke-dasharray: 30;
      stroke-dashoffset: 0;
    }
  }
</style>
