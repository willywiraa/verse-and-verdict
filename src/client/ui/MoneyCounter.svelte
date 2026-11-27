<script lang="ts">
  import { formatRp } from '@shared/court/money';

  let { amount, duration = 0.9 }: { amount: number; duration?: number } = $props();

  // Rolls up from zero once, on arrival. With reduced motion it shows the amount at once.
  let shown = $state(0);

  $effect(() => {
    const target = amount;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || typeof requestAnimationFrame === 'undefined') {
      shown = target;
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      shown = t < 1 ? target * (1 - (1 - t) ** 3) : target;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });
</script>

<span class="money" class:done={shown === amount}>
  <span aria-hidden="true">{formatRp(shown)}</span>
  <span class="sr-only">{formatRp(amount)}</span>
</span>

<style>
  .money {
    display: inline-block;
    font-variant-numeric: tabular-nums;
    font-weight: 900;
  }

  .done {
    animation: settle 0.3s cubic-bezier(0.3, 1.7, 0.5, 1);
  }

  @keyframes settle {
    50% {
      transform: scale(1.08);
    }
  }
</style>
