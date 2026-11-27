<script lang="ts">
  /**
   * A big rubber stamp that drops onto a spot, squashes, and lifts away.
   * `x`, `y` are where it lands (cqw, cqh); `at` is the moment of impact.
   */
  let { x, y, at, size = 9 }: { x: number; y: number; at: number; size?: number } = $props();
</script>

<div class="tool tl" aria-hidden="true" style:left="{x}cqw" style:top="{y}cqh" style:width="{size}cqw" style:--start="{at - 0.24}s">
  <svg viewBox="0 0 60 80">
    <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
      <ellipse cx="30" cy="12" rx="13" ry="10" fill="#a8743d" />
      <rect x="25" y="18" width="10" height="26" rx="3" fill="#a8743d" />
      <rect x="6" y="42" width="48" height="22" rx="4" fill="#3a4258" />
      <rect x="4" y="64" width="52" height="12" rx="2" fill="var(--red)" />
    </g>
  </svg>
</div>

<style>
  .tool {
    position: absolute;
    opacity: 0;
    transform: translate(-50%, -100%);
    transform-origin: 50% 100%;
    animation: press 0.62s linear var(--start) both;
    pointer-events: none;
  }

  .tool svg {
    display: block;
    width: 100%;
  }

  /* Down fast, squash on impact, lift away. Impact is at 0.24 s. */
  @keyframes press {
    0% {
      opacity: 0;
      transform: translate(-50%, -100%) translateY(-26cqh);
      animation-timing-function: cubic-bezier(0.6, 0, 1, 0.6);
    }
    10% {
      opacity: 1;
    }
    39% {
      transform: translate(-50%, -100%) translateY(0) scale(1, 1);
    }
    48% {
      transform: translate(-50%, -100%) translateY(0) scale(1.08, 0.86);
    }
    58% {
      opacity: 1;
      transform: translate(-50%, -100%) translateY(0) scale(1, 1);
      animation-timing-function: ease-in;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -100%) translateY(-24cqh);
    }
  }
</style>
