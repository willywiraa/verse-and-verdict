<script lang="ts">
  /** A cartoon dust cloud that hides a costume change. `at` is when it bursts, in seconds. */
  let { at }: { at: number } = $props();
</script>

<svg class="puff tl" viewBox="0 0 100 80" aria-hidden="true" style:--at="{at}s">
  <g fill="#fffdf7" stroke="var(--ink)" stroke-width="2.5">
    <circle cx="30" cy="48" r="20" />
    <circle cx="52" cy="34" r="24" />
    <circle cx="72" cy="50" r="19" />
    <circle cx="50" cy="56" r="20" />
  </g>
</svg>

<style>
  .puff {
    position: absolute;
    inset: -10% -20%;
    width: 140%;
    height: 120%;
    opacity: 0;
    pointer-events: none;
    animation: puff 0.55s ease-out var(--at) both;
  }

  @keyframes puff {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    30% {
      opacity: 1;
      transform: scale(1.05);
    }
    100% {
      opacity: 0;
      transform: scale(1.3);
    }
  }
</style>
