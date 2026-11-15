<svelte:options namespace="svg" />

<script lang="ts">
  import { MOP_TILT } from './parts';

  let {
    side,
    x,
    y,
    angles,
    sleeve,
    fore,
    skin,
    watch = false,
    mop = false,
    thumb = false,
    swing = 'none',
    wave = false,
  }: {
    side: 'l' | 'r';
    /** The shoulder. */
    x: number;
    y: number;
    /** [upper arm, forearm] in degrees, outwards from hanging down. */
    angles: readonly [number, number];
    sleeve: string;
    /** Forearm colour: the sleeve, or skin for short sleeves. */
    fore: string;
    skin: string;
    watch?: boolean;
    mop?: boolean;
    thumb?: boolean;
    swing?: 'none' | 'walk' | 'run';
    wave?: boolean;
  } = $props();

  // The right arm is the left arm mirrored, so poses are written once.
  const place = $derived(side === 'l' ? `translate(${x} ${y})` : `translate(${120 - x} ${y}) scale(-1 1)`);
  // Held things keep their own angle, whatever the arm does.
  const mopAngle = $derived(MOP_TILT - angles[0] - angles[1]);
  const thumbAngle = $derived(180 - angles[0] - angles[1]);
</script>

<g transform={place} stroke-linecap="round" stroke-linejoin="round">
  <g class="swing {swing}" class:right={side === 'r'}>
    <g class="upper" style:--a="{angles[0]}deg">
      <line y2="21" stroke="var(--ink)" stroke-width="13" />
      <line y2="21" stroke={sleeve} stroke-width="9.5" />
      <g transform="translate(0 21)">
        <g class="fore" class:wave style:--a="{angles[1]}deg">
          <line y2="19" stroke="var(--ink)" stroke-width="12.5" />
          <line y2="19" stroke={fore} stroke-width="9" />
          <g transform="translate(0 19)">
            {#if mop}
              <g class="held" style:--a="{mopAngle}deg">
                <line y1="-32" y2="52" stroke="var(--ink)" stroke-width="5" />
                <line y1="-32" y2="52" stroke="#a8743d" stroke-width="2.6" />
                <path d="M-11 52 H11 L13 57 H-13 Z" fill="#6f8fb3" stroke="var(--ink)" stroke-width="2" />
                <path d="M-12 57 L-14 66 M-7 57 L-8 67 M-2 57 L-2 67 M3 57 L4 67 M8 57 L10 66 M12 57 L15 64" stroke="#e9e4d6" stroke-width="3.2" />
                <path d="M-12 57 L-14 66 M-7 57 L-8 67 M-2 57 L-2 67 M3 57 L4 67 M8 57 L10 66 M12 57 L15 64" stroke="var(--ink)" stroke-width="0.8" opacity="0.5" />
              </g>
            {/if}
            {#if thumb}
              <g class="held" style:--a="{thumbAngle}deg">
                <rect x="-3" y="-1" width="6" height="13" rx="3" fill={skin} stroke="var(--ink)" stroke-width="1.8" />
              </g>
            {/if}
            {#if watch}
              <rect x="-6.2" y="-8.5" width="12.4" height="4.6" rx="1.6" fill="var(--gold)" stroke="var(--ink)" stroke-width="1.5" />
            {/if}
            <circle r="5.6" fill={skin} stroke="var(--ink)" stroke-width="2" />
          </g>
        </g>
      </g>
    </g>
  </g>
</g>

<style>
  .upper,
  .fore,
  .held {
    transform: rotate(var(--a));
    transition: transform 0.38s cubic-bezier(0.3, 1.25, 0.5, 1);
  }

  /* Arms swing a little while walking; the right arm swings half a step later. */
  .swing.walk {
    animation: swing 0.56s ease-in-out infinite alternate;
  }

  .swing.run {
    animation: swing-run 0.36s ease-in-out infinite alternate;
  }

  .swing.right {
    animation-delay: -0.28s;
  }

  .swing.run.right {
    animation-delay: -0.18s;
  }

  .fore.wave {
    animation: wave 0.5s ease-in-out infinite alternate;
  }

  @keyframes swing {
    from {
      transform: rotate(-10deg);
    }
    to {
      transform: rotate(12deg);
    }
  }

  @keyframes swing-run {
    from {
      transform: rotate(-18deg);
    }
    to {
      transform: rotate(20deg);
    }
  }

  @keyframes wave {
    from {
      transform: rotate(calc(var(--a) - 14deg));
    }
    to {
      transform: rotate(calc(var(--a) + 14deg));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .swing,
    .fore.wave {
      animation: none;
    }
  }
</style>
