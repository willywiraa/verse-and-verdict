<script lang="ts">
  /** A moving truck facing right, with an open back. `driveAt` starts the wheels and exhaust, in seconds. */
  let { driveAt }: { driveAt: number } = $props();
</script>

<svg class="prop" viewBox="0 0 200 112" aria-hidden="true" style:--drive="{driveAt}s">
  <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
    <path d="M6 10 H132 V88 H6 Z" fill="#e8eef2" />
    <path d="M6 10 H18 V88 H6 Z" fill="#3a4258" />
    <path d="M30 30 H110 M30 50 H110 M30 70 H110" fill="none" stroke-width="2" opacity="0.35" />
    <path d="M132 34 H164 L188 60 V88 H132 Z" fill="var(--red)" />
    <path d="M140 40 H160 L178 60 H140 Z" fill="#bfe6ea" stroke-width="2.4" />
    <path d="M186 74 H194 V82 H186 Z" fill="var(--gold)" stroke-width="2" />
    <g class="wheel tl"><circle cx="40" cy="92" r="14" fill="var(--ink)" /><path d="M40 82 V102 M30 92 H50" stroke="#8f9aa8" stroke-width="3" /></g>
    <g class="wheel tl"><circle cx="160" cy="92" r="14" fill="var(--ink)" /><path d="M160 82 V102 M150 92 H170" stroke="#8f9aa8" stroke-width="3" /></g>
  </g>
  {#each [0, 0.22, 0.44] as d (d)}
    <circle class="exhaust tl" cx="2" cy="84" r="6" fill="#e8eef2" stroke="var(--ink)" stroke-width="2" style:--d="{d}s" />
  {/each}
</svg>

<style>
  .prop {
    display: block;
    width: 100%;
    overflow: visible;
  }

  .wheel {
    transform-box: fill-box;
    transform-origin: center;
    animation: spin 0.32s linear var(--drive) infinite;
  }

  .exhaust {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: exhaust 0.7s ease-out calc(var(--drive) + var(--d)) 2 both;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes exhaust {
    from {
      opacity: 1;
      transform: translate(0, 0) scale(0.5);
    }
    to {
      opacity: 0;
      transform: translate(-14px, -10px) scale(1.6);
    }
  }
</style>
