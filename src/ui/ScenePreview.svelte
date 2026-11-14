<script lang="ts">
  import type { SceneId } from '../court/types';

  /** A tiny looping picture of each punishment. It rests on its key frame until `playing`. */
  let { scene, playing = false }: { scene: SceneId; playing?: boolean } = $props();
</script>

<svg class="preview {scene}" class:playing viewBox="0 0 100 64" aria-hidden="true">
  <g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
    {#if scene === 'prison'}
      <rect x="22" y="6" width="56" height="52" rx="4" fill="#bfe6ea" />
      <circle cx="64" cy="20" r="7" fill="var(--gold)" stroke-width="2" />
      <path d="M22 46 Q40 38 56 46 T78 44 L78 58 L22 58 Z" fill="#9bd0a8" stroke="none" />
      <rect x="22" y="6" width="56" height="52" rx="4" fill="none" />
      <g class="bars">
        {#each [33, 44, 56, 67] as x (x)}
          <rect x={x - 2.5} y="6" width="5" height="52" rx="2" fill="#5b6478" stroke-width="2" />
        {/each}
        <rect x="22" y="22" width="56" height="5" rx="2" fill="#5b6478" stroke-width="2" />
      </g>
    {:else if scene === 'ban'}
      <path d="M30 52 L70 52 L64 40 L36 40 Z" fill="#a0764a" />
      <rect x="16" y="14" width="68" height="28" rx="4" fill="var(--gold)" />
      <rect x="25" y="22" width="50" height="5" rx="2" fill="var(--ink)" stroke="none" />
      <rect x="31" y="31" width="38" height="4" rx="2" fill="var(--ink)" stroke="none" opacity="0.6" />
      <g class="x" stroke="var(--red)" stroke-width="7">
        <path class="x1" d="M30 10 L70 48" pathLength="1" />
        <path class="x2" d="M70 10 L30 48" pathLength="1" />
      </g>
    {:else if scene === 'seize'}
      <path d="M4 56 L96 56" />
      <g class="truck">
        <rect x="50" y="22" width="34" height="26" rx="2" fill="#e8eef2" />
        <path d="M84 30 L93 30 L97 39 L97 48 L84 48 Z" fill="var(--red)" />
        <circle cx="60" cy="50" r="5" fill="var(--ink)" />
        <circle cx="88" cy="50" r="5" fill="var(--ink)" />
      </g>
      <g class="house">
        <path d="M10 36 L22 25 L34 36 L34 50 L10 50 Z" fill="var(--gold)" />
        <rect x="19" y="40" width="7" height="10" fill="#fff" stroke-width="2" />
      </g>
    {:else if scene === 'repay'}
      <path d="M4 52 Q14 44 24 48 L28 56 L4 58 Z" fill="#e9be94" />
      <path d="M96 52 Q86 44 76 48 L72 56 L96 58 Z" fill="#d19a6a" />
      {#each [0, 1, 2] as i (i)}
        <g class="coin-x" style:animation-delay="{-i * 0.45}s">
          <g class="coin-y" style:animation-delay="{-i * 0.45}s">
            <circle cx="24" cy="44" r="6" fill="var(--gold)" stroke-width="2" />
            <path d="M24 41 L24 47" stroke-width="1.5" />
          </g>
        </g>
      {/each}
    {:else if scene === 'service'}
      <path d="M4 56 L96 56" />
      <g class="sparkles" fill="var(--gold)" stroke-width="1.5">
        <path d="M70 34 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" />
        <path d="M82 22 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5 Z" />
      </g>
      <g class="mop">
        <path d="M46 4 L46 46" stroke-width="3.5" stroke="#8a5a2b" />
        <path d="M34 46 L58 46 L62 56 L30 56 Z" fill="#f4f1ea" />
        <path d="M36 50 L35 56 M42 50 L41 56 M48 50 L48 56 M54 50 L55 56" stroke-width="1.5" />
      </g>
      <rect x="10" y="40" width="16" height="16" rx="2" fill="#6cc3c9" />
    {:else}
      <g class="shake">
        <path d="M2 30 L30 26 L36 40 L4 46 Z" fill="var(--teal)" />
        <path d="M98 30 L70 26 L64 40 L96 46 Z" fill="var(--green)" />
        <path d="M30 26 Q44 20 56 26 L68 30 Q72 36 64 40 L50 44 Q40 44 36 40 Z" fill="#e9be94" />
        <path d="M46 30 L60 33 M48 35 L60 37" stroke-width="2" />
      </g>
      <path class="heart" d="M50 14 Q46 8 42 12 Q38 16 50 24 Q62 16 58 12 Q54 8 50 14 Z" fill="var(--red)" stroke-width="2" />
    {/if}
  </g>
</svg>

<style>
  .preview {
    display: block;
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .preview * {
    transform-box: fill-box;
  }

  /* Rest on the first frame until played. It must beat the `animation` shorthand on each loop. */
  svg.preview:not(.playing) * {
    animation-play-state: paused;
  }

  /* Prison: the bars lift and slam back down. */
  .bars {
    animation: bars 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  @keyframes bars {
    0%,
    100% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-62px);
    }
    48% {
      transform: translateY(0);
    }
    54% {
      transform: translateY(-4px);
    }
    60% {
      transform: translateY(0);
    }
  }

  /* Ban: the red cross is drawn over the nameplate, one stroke at a time. */
  .x path {
    stroke-dasharray: 1;
  }

  .x1 {
    animation: draw1 2s ease-out infinite;
  }

  .x2 {
    animation: draw2 2s ease-out infinite;
  }

  /* Both strokes rest fully drawn, so the paused card shows the cross. */
  @keyframes draw1 {
    0%,
    10% {
      stroke-dashoffset: 0;
    }
    14% {
      stroke-dashoffset: 1;
    }
    34%,
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes draw2 {
    0%,
    10% {
      stroke-dashoffset: 0;
    }
    14%,
    34% {
      stroke-dashoffset: 1;
    }
    54%,
    100% {
      stroke-dashoffset: 0;
    }
  }

  /* Take wealth: the house slides into the truck, which drives off and comes back. */
  .house {
    transform-origin: center bottom;
    animation: house 2.4s ease-in-out infinite;
  }

  .truck {
    animation: truck 2.4s ease-in-out infinite;
  }

  @keyframes house {
    0%,
    10% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    40% {
      transform: translate(46px, -4px) scale(0.7);
      opacity: 1;
    }
    45%,
    100% {
      transform: translate(46px, -4px) scale(0.7);
      opacity: 0;
    }
  }

  @keyframes truck {
    0%,
    45% {
      transform: translateX(0);
    }
    70% {
      transform: translateX(70px);
      opacity: 1;
    }
    71% {
      transform: translateX(70px);
      opacity: 0;
    }
    72% {
      transform: translateX(-70px);
      opacity: 0;
    }
    73% {
      opacity: 1;
    }
    100% {
      transform: translateX(0);
    }
  }

  /* Repay: coins arc from one hand to the other. */
  .coin-x {
    animation: coin-x 1.35s linear infinite;
  }

  .coin-y {
    animation: coin-y 1.35s ease-in-out infinite;
  }

  @keyframes coin-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(52px);
    }
  }

  @keyframes coin-y {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
  }

  /* Community service: the mop swishes and the floor sparkles. */
  .mop {
    transform-origin: 50% 0;
    animation: mop 0.9s ease-in-out infinite alternate;
  }

  .sparkles {
    transform-origin: center;
    animation: sparkle 0.9s ease-in-out infinite alternate;
  }

  @keyframes mop {
    from {
      transform: rotate(-16deg);
    }
    to {
      transform: rotate(16deg);
    }
  }

  @keyframes sparkle {
    from {
      transform: scale(0.6);
      opacity: 0.4;
    }
    to {
      transform: scale(1.15);
      opacity: 1;
    }
  }

  /* Second chance: a firm handshake. */
  .shake {
    animation: shake 0.8s ease-in-out infinite;
  }

  .heart {
    transform-origin: center;
    animation: beat 0.8s ease-in-out infinite;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-4px);
    }
    75% {
      transform: translateY(4px);
    }
  }

  @keyframes beat {
    50% {
      transform: scale(1.2);
    }
  }
</style>
