<script lang="ts">
  import { untrack } from 'svelte';
  import type { Verdict } from '../game/types';

  let { verdict }: { verdict: Verdict } = $props();

  const COUNT = 26;

  /** Start and end offsets in px. Rise drifts up, Fall sinks, Return scatters in a circle. */
  function makeParticles(kind: Verdict) {
    return Array.from({ length: COUNT }, (_, i) => {
      const x0 = (Math.random() - 0.5) * 90;
      const y0 = (Math.random() - 0.5) * 40;
      let ex: number;
      let ey: number;
      if (kind === 'rise') {
        ex = x0 + (Math.random() - 0.5) * 70;
        ey = -(90 + Math.random() * 130);
      } else if (kind === 'fall') {
        ex = x0 + (Math.random() - 0.5) * 50;
        ey = 70 + Math.random() * 110;
      } else {
        const angle = (i / COUNT) * Math.PI * 2;
        const radius = 70 + Math.random() * 60;
        ex = Math.cos(angle) * radius;
        ey = Math.sin(angle) * radius;
      }
      return {
        x0,
        y0,
        ex,
        ey,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 0.35,
        duration: 0.9 + Math.random() * 0.7,
      };
    });
  }

  const particles = untrack(() => makeParticles(verdict));
</script>

<div class="burst {verdict}" aria-hidden="true">
  {#if verdict === 'rise'}
    <span class="beam"></span>
  {:else if verdict === 'return'}
    {#each [0, 1, 2] as ring (ring)}
      <span class="ring" style:animation-delay="{ring * 0.18}s"></span>
    {/each}
  {/if}
  {#each particles as p, i (i)}
    <span
      class="p"
      style:--x0="{p.x0}px"
      style:--y0="{p.y0}px"
      style:--ex="{p.ex}px"
      style:--ey="{p.ey}px"
      style:--s="{p.size}px"
      style:animation-delay="{p.delay}s"
      style:animation-duration="{p.duration}s"
    ></span>
  {/each}
</div>

<style>
  .burst {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: visible;
  }

  .p {
    position: absolute;
    left: 50%;
    top: 55%;
    width: var(--s);
    height: var(--s);
    margin: calc(var(--s) / -2) 0 0 calc(var(--s) / -2);
    border-radius: 50%;
    opacity: 0;
    animation-name: fly;
    animation-timing-function: cubic-bezier(0.25, 0.6, 0.3, 1);
    animation-fill-mode: forwards;
  }

  .rise .p {
    background: #ffe7a8;
    box-shadow: 0 0 8px #e0b15a;
  }

  .return .p {
    background: #a9e4df;
    box-shadow: 0 0 8px #2f6f6d;
  }

  .fall .p {
    background: #ff9a6b;
    box-shadow: 0 0 8px #a63d2a;
  }

  .beam {
    position: absolute;
    left: 50%;
    bottom: 20%;
    width: 90px;
    height: 240px;
    margin-left: -45px;
    background: linear-gradient(to top, rgb(255 231 168 / 0.75), rgb(255 231 168 / 0));
    border-radius: 45px 45px 0 0;
    transform-origin: bottom;
    animation: beam 1.3s ease-out forwards;
  }

  .ring {
    position: absolute;
    left: 50%;
    top: 55%;
    width: 90px;
    height: 90px;
    margin: -45px 0 0 -45px;
    border: 2px solid #6fb7b2;
    border-radius: 50%;
    opacity: 0;
    animation: ring 1.2s ease-out forwards;
  }

  @keyframes fly {
    0% {
      opacity: 0;
      transform: translate(var(--x0), var(--y0)) scale(0.6);
    }
    15% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(var(--ex), var(--ey)) scale(1);
    }
  }

  @keyframes beam {
    0% {
      opacity: 0;
      transform: scaleY(0);
    }
    35% {
      opacity: 0.9;
      transform: scaleY(1);
    }
    100% {
      opacity: 0;
      transform: scaleY(1);
    }
  }

  @keyframes ring {
    0% {
      opacity: 0.85;
      transform: scale(0.2);
    }
    100% {
      opacity: 0;
      transform: scale(2.4);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .burst {
      display: none;
    }
  }
</style>
