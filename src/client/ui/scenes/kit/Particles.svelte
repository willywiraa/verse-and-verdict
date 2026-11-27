<script lang="ts">
  /**
   * A one-off burst of small things at a point in the scene: dust, sparkles,
   * ink, coins, confetti or sweat. Positions are in stage units (cqw across, cqh down); `at` is when
   * it bursts, in seconds. Purely decorative, and gone once skipped.
   */
  let {
    kind,
    x,
    y,
    at,
    count = 10,
    spread = 6,
  }: {
    kind: 'dust' | 'sparkle' | 'ink' | 'coin' | 'confetti' | 'drop';
    x: number;
    y: number;
    at: number;
    count?: number;
    /** How far they fly, in % of the scene width. */
    spread?: number;
  } = $props();

  const COLORS = {
    dust: ['#e8dcc0', '#d9c9a3', '#f4efe2'],
    sparkle: ['#fff6c8', '#ffe27a', '#ffffff'],
    ink: ['#d2433a', '#b0322a'],
    coin: ['#e3b341'],
    confetti: ['#d2433a', '#e3b341', '#3e9b5f', '#6cc3c9', '#f08a24'],
    drop: ['#9ed3f0'],
  } as const;

  const bits = $derived.by(() => {
    const colors = COLORS[kind];
    const rise = kind === 'dust' ? -0.4 : kind === 'confetti' ? 0.6 : kind === 'coin' ? -1 : -0.2;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
      const reach = spread * (0.5 + Math.random() * 0.6);
      return {
        dx: Math.cos(angle) * reach,
        dy: Math.sin(angle) * reach * 0.6 + rise * spread * 0.6,
        size: (kind === 'dust' ? 1.6 : kind === 'confetti' ? 0.8 : 0.9) * (0.6 + Math.random() * 0.7),
        color: colors[i % colors.length],
        spin: (Math.random() - 0.5) * 540,
        delay: at + Math.random() * 0.08,
        duration: (kind === 'dust' ? 0.7 : kind === 'confetti' ? 1.2 : 0.55) + Math.random() * 0.3,
      };
    });
  });
</script>

<div class="burst tl {kind}" aria-hidden="true" style:left="{x}cqw" style:top="{y}cqh">
  {#each bits as b, i (i)}
    <span
      class="bit tl"
      style:--dx="{b.dx}cqw"
      style:--dy="{b.dy}cqw"
      style:--size="{b.size}cqw"
      style:--spin="{b.spin}deg"
      style:background={b.color}
      style:animation-delay="{b.delay}s"
      style:animation-duration="{b.duration}s"
    ></span>
  {/each}
</div>

<style>
  .burst {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .bit {
    position: absolute;
    left: calc(var(--size) / -2);
    top: calc(var(--size) / -2);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    opacity: 0;
    animation-name: fly;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.4, 1);
    animation-fill-mode: both;
  }

  .sparkle .bit {
    border-radius: 0;
    clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  }

  .ink .bit,
  .dust .bit {
    border-radius: 45% 55% 50% 50%;
  }

  .coin .bit {
    box-shadow: inset 0 0 0 0.18cqw var(--ink);
  }

  .confetti .bit {
    width: calc(var(--size) * 0.7);
    height: calc(var(--size) * 1.4);
    border-radius: 1px;
  }

  .drop .bit {
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }

  @keyframes fly {
    0% {
      opacity: 0;
      transform: translate(0, 0) scale(0.4) rotate(0);
    }
    12% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--spin));
    }
  }
</style>
