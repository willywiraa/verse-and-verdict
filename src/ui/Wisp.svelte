<script lang="ts">
  import type { EmblemId } from '../content/emblems';
  import type { Verdict } from '../game/types';
  import { EMBLEM_ICONS } from './emblemIcons';

  let { hue, emblem, verdict = null }: { hue: number; emblem: EmblemId; verdict?: Verdict | null } = $props();

  const Icon = $derived(EMBLEM_ICONS[emblem]);
  const uid = $props.id();
</script>

<div class="wisp {verdict ?? 'idle'}" aria-hidden="true" style:--glow="hsla({hue}, 90%, 65%, 0.55)">
  <svg class="flame" viewBox="0 0 100 120">
    <defs>
      <radialGradient id="wisp-{uid}" cx="50%" cy="64%" r="58%">
        <stop offset="0" stop-color="hsl({hue}, 100%, 96%)" />
        <stop offset="0.45" stop-color="hsl({hue}, 85%, 72%)" />
        <stop offset="1" stop-color="hsla({hue}, 80%, 55%, 0)" />
      </radialGradient>
    </defs>
    <path
      d="M50 4c10 18 30 30 30 58a30 30 0 0 1-60 0c0-17 9-27 17-36 2 11 7 17 13 19-3-15 0-28 0-41z"
      fill="url(#wisp-{uid})"
    />
  </svg>
  <span class="emblem" style:color="hsl({hue}, 45%, 22%)">
    <Icon size={32} strokeWidth={1.75} />
  </span>
</div>

<style>
  .wisp {
    position: relative;
    width: 96px;
    height: 116px;
    margin: 0 auto 0.25rem;
    filter: drop-shadow(0 0 18px var(--glow));
  }

  .wisp.idle {
    animation:
      arrive 0.6s ease-out both,
      bob 3.2s ease-in-out 0.6s infinite;
  }

  .wisp.rise {
    animation: rise 0.8s ease-in forwards;
  }

  .wisp.return {
    animation: wheel 0.8s ease-in-out forwards;
  }

  .wisp.fall {
    animation: sink 0.8s ease-in forwards;
  }

  .flame {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .emblem {
    position: absolute;
    left: 50%;
    top: 62%;
    transform: translate(-50%, -50%);
    display: grid;
  }

  @keyframes arrive {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.9);
    }
  }

  @keyframes bob {
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes rise {
    to {
      opacity: 0.2;
      transform: translateY(-60px) scale(1.15);
      filter: drop-shadow(0 0 28px var(--glow)) brightness(1.5);
    }
  }

  @keyframes wheel {
    50% {
      transform: translate(48px, -16px) rotate(140deg) scale(0.85);
    }
    to {
      opacity: 0.2;
      transform: translate(0, -8px) rotate(360deg) scale(0.65);
    }
  }

  @keyframes sink {
    to {
      opacity: 0.25;
      transform: translateY(44px) scale(0.85);
      filter: brightness(0.45) saturate(0.5);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0.2;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .wisp.idle {
      animation: fade-in 0.15s both;
    }

    .wisp.rise,
    .wisp.return,
    .wisp.fall {
      animation: fade-out 0.15s forwards;
    }
  }
</style>
