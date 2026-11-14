<script lang="ts">
  /** Faint motes of light drifting up behind every screen. Purely decorative. */
  const motes = Array.from({ length: 16 }, () => ({
    left: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 14 + Math.random() * 16,
    delay: -Math.random() * 30,
    drift: (Math.random() - 0.5) * 60,
  }));
</script>

<div class="motes" aria-hidden="true">
  {#each motes as m, i (i)}
    <span
      style:left="{m.left}%"
      style:--size="{m.size}px"
      style:--drift="{m.drift}px"
      style:animation-duration="{m.duration}s"
      style:animation-delay="{m.delay}s"
    ></span>
  {/each}
</div>

<style>
  .motes {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  }

  span {
    position: absolute;
    bottom: -10px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: #fff4d6;
    box-shadow: 0 0 6px #e0b15a;
    opacity: 0;
    animation: drift linear infinite;
  }

  @keyframes drift {
    0% {
      opacity: 0;
      transform: translate(0, 0);
    }
    15% {
      opacity: 0.35;
    }
    85% {
      opacity: 0.25;
    }
    100% {
      opacity: 0;
      transform: translate(var(--drift), -105vh);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .motes {
      display: none;
    }
  }
</style>
