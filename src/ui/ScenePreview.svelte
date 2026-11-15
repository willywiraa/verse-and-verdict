<script lang="ts">
  import type { SceneId } from '../court/types';

  /**
   * A tiny looping cartoon of each punishment.
   * - idle: rests on its key frame, with one small living detail;
   * - active (hovered or focused): the whole loop plays;
   * - selected: the loop plays a little larger.
   */
  let { scene, level = 'idle' }: { scene: SceneId; level?: 'idle' | 'active' | 'selected' } = $props();

  /** How far into each loop the resting frame sits, in seconds. */
  const REST: Readonly<Record<SceneId, number>> = {
    prison: 1.9,
    seize: 0.3,
    service: 1.05,
    ban: 1.2,
    repay: 0.5,
    chance: 0,
  };
</script>

<svg class="preview {scene} {level}" viewBox="0 0 100 64" aria-hidden="true" style:--rest="-{REST[scene]}s">
  <g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
    {#if scene === 'prison'}
      <!-- A cell: the bars drop, then a padlock snaps shut. -->
      <rect x="14" y="4" width="72" height="56" rx="4" fill="#c9ced8" />
      <rect x="40" y="10" width="20" height="13" rx="2" fill="#bfe6ea" stroke-width="2" />
      <circle class="amb sun" cx="54" cy="15" r="3.2" fill="var(--gold)" stroke="none" />
      <path d="M45 10 V23 M50 10 V23 M55 10 V23" stroke-width="1.6" />
      <path d="M38 60 Q38 44 50 44 Q62 44 62 60 Z" fill="var(--orange)" stroke-width="2" />
      <circle cx="50" cy="36" r="9" fill="#d19a6a" stroke-width="2" />
      <path d="M46 34.5 h.01 M54 34.5 h.01" stroke-width="3" />
      <path d="M46.5 40.5 Q50 37.5 53.5 40.5" fill="none" stroke-width="1.6" />
      <g class="loop bars">
        {#each [22, 33, 44, 56, 67, 78] as x (x)}
          <rect x={x - 2.4} y="2" width="4.8" height="60" rx="2" fill="#5b6478" stroke-width="1.8" />
        {/each}
        <rect x="14" y="27" width="72" height="4.5" rx="2" fill="#5b6478" stroke-width="1.8" />
      </g>
      <g class="loop lock">
        <path d="M46 47 V43 Q46 38.5 50 38.5 Q54 38.5 54 43 V47" fill="none" stroke-width="2.2" />
        <rect x="43.5" y="46" width="13" height="10" rx="2" fill="var(--gold)" stroke-width="2" />
        <circle cx="50" cy="50.5" r="1.4" fill="var(--ink)" stroke="none" />
      </g>
      <path class="loop clink" d="M38 42 l-5 -3 M38 48 h-6 M62 42 l5 -3 M62 48 h6" stroke-width="2" />
    {:else if scene === 'seize'}
      <!-- A truck carries the house away, wheels spinning. -->
      <path d="M2 56 H98" stroke-width="2" />
      <g class="amb puff"><circle cx="20" cy="45" r="3" fill="#e8eef2" stroke-width="1.5" /></g>
      <g class="loop truck">
        <g class="loop dust" fill="#e8dcc0" stroke-width="1.5">
          <circle cx="16" cy="52" r="3.2" />
          <circle cx="10" cy="49" r="2.4" />
        </g>
        <path d="M22 44 H64 V49 H22 Z" fill="#8f9aa8" />
        <path d="M64 49 V32 H75 L83 41 V49 Z" fill="var(--red)" />
        <path d="M67 35 H74 L79 41 H67 Z" fill="#bfe6ea" stroke-width="1.8" />
        <g transform="translate(26 21)">
          <path d="M3 12 L16 2 L29 12 V23 H3 Z" fill="var(--gold)" />
          <path d="M0 13 L16 0.5 L32 13" fill="none" stroke="var(--red)" stroke-width="3.5" />
          <path d="M13 14 H19 V23 H13 Z" fill="#fff" stroke-width="1.8" />
        </g>
        <g class="loop wheel">
          <circle cx="31" cy="51" r="5.5" fill="var(--ink)" />
          <path d="M31 47.5 V54.5 M27.5 51 H34.5" stroke="#8f9aa8" stroke-width="1.6" />
        </g>
        <g class="loop wheel">
          <circle cx="73" cy="51" r="5.5" fill="var(--ink)" />
          <path d="M73 47.5 V54.5 M69.5 51 H76.5" stroke="#8f9aa8" stroke-width="1.6" />
        </g>
      </g>
    {:else if scene === 'service'}
      <!-- A mop sweeps the dirty floor clean, leaving a shine. -->
      <rect x="2" y="38" width="96" height="24" fill="#cdb98f" stroke="none" />
      <g class="dirt" fill="#8a6a3e" stroke="none" opacity="0.75">
        <ellipse class="loop spot s1" cx="28" cy="50" rx="7" ry="3" />
        <ellipse class="loop spot s2" cx="54" cy="54" rx="6" ry="2.6" />
        <ellipse class="loop spot s3" cx="78" cy="49" rx="7.5" ry="3" />
      </g>
      <rect class="loop clean" x="2" y="38" width="96" height="24" fill="#f3ead6" stroke="none" />
      <path class="loop clean shine" d="M2 44 H98" stroke="#fff" stroke-width="2" opacity="0.8" />
      <path d="M2 38 H98" stroke-width="2" />
      <g class="sparkles" fill="#fff6c8" stroke-width="1.4">
        <path class="loop sp p1" d="M28 40 l1.6 3.6 3.6 1.6 -3.6 1.6 -1.6 3.6 -1.6 -3.6 -3.6 -1.6 3.6 -1.6 Z" />
        <path class="loop sp p2" d="M54 44 l1.6 3.6 3.6 1.6 -3.6 1.6 -1.6 3.6 -1.6 -3.6 -3.6 -1.6 3.6 -1.6 Z" />
        <path class="loop sp p3" d="M78 39 l1.6 3.6 3.6 1.6 -3.6 1.6 -1.6 3.6 -1.6 -3.6 -3.6 -1.6 3.6 -1.6 Z" />
      </g>
      <g class="loop mop">
        <g class="scrub">
          <path d="M0 -40 V12" stroke="#8a5a2b" stroke-width="3.5" />
          <path d="M-12 12 H12 L14 17 H-14 Z" fill="#6f8fb3" stroke-width="2" />
          <path d="M-12 17 L-14 24 M-6 17 L-7 25 M0 17 V25 M6 17 L7 25 M12 17 L14 24" stroke="#e9e4d6" stroke-width="3" />
        </g>
      </g>
      <path class="amb twinkle" d="M14 44 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 Z" fill="#fff6c8" stroke-width="1.2" />
    {:else if scene === 'ban'}
      <!-- A red marker crosses out the nameplate, which tips off the desk. -->
      <path d="M2 46 H98 V62 H2 Z" fill="#a0764a" />
      <path d="M2 46 H98" stroke-width="2" />
      <g class="loop plate">
        <path d="M32 46 L36 38 H64 L68 46 Z" fill="#7a5530" stroke-width="2" />
        <rect x="26" y="20" width="48" height="19" rx="2.5" fill="var(--gold)" />
        <rect x="32" y="26" width="36" height="3.5" rx="1.5" fill="var(--ink)" stroke="none" />
        <rect x="37" y="32" width="26" height="3" rx="1.5" fill="var(--ink)" stroke="none" opacity="0.6" />
        <path class="amb glint" d="M34 21 L28 38 H32 L38 21 Z" fill="#fff" stroke="none" opacity="0.55" />
        <g stroke="var(--red)" stroke-width="5">
          <path class="loop x1" d="M30 20 L70 39" pathLength="1" />
          <path class="loop x2" d="M70 20 L30 39" pathLength="1" />
        </g>
      </g>
      <g class="loop pen">
        <path d="M0 0 L5 -5 L22 -22 L17 -27 L0 -10 Z" fill="var(--red)" stroke-width="2" />
        <path d="M0 0 L5 -5 L0 -10 Z" fill="#fff" stroke-width="1.6" />
      </g>
    {:else if scene === 'repay'}
      <path d="M4 52 Q14 44 24 48 L28 56 L4 58 Z" fill="#e9be94" />
      <path d="M96 52 Q86 44 76 48 L72 56 L96 58 Z" fill="#d19a6a" />
      {#each [0, 1, 2] as i (i)}
        <g class="loop coin-x" style:--d="{-i * 0.45}s">
          <g class="loop coin-y" style:--d="{-i * 0.45}s">
            <circle cx="24" cy="44" r="6" fill="var(--gold)" stroke-width="2" />
            <path d="M24 41 L24 47" stroke-width="1.5" />
          </g>
        </g>
      {/each}
    {:else}
      <g class="loop shake">
        <path d="M2 30 L30 26 L36 40 L4 46 Z" fill="var(--teal)" />
        <path d="M98 30 L70 26 L64 40 L96 46 Z" fill="var(--green)" />
        <path d="M30 26 Q44 20 56 26 L68 30 Q72 36 64 40 L50 44 Q40 44 36 40 Z" fill="#e9be94" />
        <path d="M46 30 L60 33 M48 35 L60 37" stroke-width="2" />
      </g>
      <path class="amb heart" d="M50 14 Q46 8 42 12 Q38 16 50 24 Q62 16 58 12 Q54 8 50 14 Z" fill="var(--red)" stroke-width="2" />
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

  /* The loop rests on its key frame, and runs only when the card is active or selected. */
  .loop {
    animation-delay: calc(var(--rest) + var(--d, 0s)) !important;
  }

  svg.preview.idle .loop {
    animation-play-state: paused;
  }

  /* Prison (2.6 s): the bars lift away and slam down, then the lock snaps shut. */
  .bars {
    animation: bars 2.6s cubic-bezier(0.5, 0, 0.6, 1) infinite;
  }

  .lock {
    transform-origin: 50% 100%;
    animation: lock 2.6s ease-out infinite;
  }

  .clink {
    animation: clink 2.6s ease-out infinite;
  }

  .sun {
    transform-origin: center;
    animation: pulse 2.8s ease-in-out infinite;
  }

  @keyframes bars {
    0%,
    8% {
      transform: translateY(0);
    }
    22%,
    26% {
      transform: translateY(-64px);
    }
    40% {
      transform: translateY(0);
    }
    44% {
      transform: translateY(-4px);
    }
    48%,
    100% {
      transform: translateY(0);
    }
  }

  @keyframes lock {
    0%,
    6% {
      transform: scale(1);
      opacity: 1;
    }
    10%,
    50% {
      transform: scale(0);
      opacity: 0;
    }
    56% {
      transform: scale(1.35);
      opacity: 1;
    }
    62%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes clink {
    0%,
    54%,
    70%,
    100% {
      opacity: 0;
    }
    57%,
    64% {
      opacity: 1;
    }
  }

  @keyframes pulse {
    50% {
      transform: scale(1.25);
    }
  }

  /* Take wealth (2.8 s): the truck drives off with the house and comes back for more. */
  .truck {
    animation: truck 2.8s ease-in-out infinite;
  }

  .wheel {
    transform-origin: center;
    animation: spin 0.45s linear infinite;
  }

  .dust {
    animation: dust 0.45s ease-out infinite;
  }

  .puff {
    animation: exhaust 2.4s ease-out infinite;
  }

  @keyframes truck {
    0%,
    18% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(105px);
    }
    51% {
      transform: translateX(-105px);
    }
    84% {
      transform: translateX(2px);
    }
    90%,
    100% {
      transform: translateX(0);
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes dust {
    from {
      opacity: 1;
      transform: translateX(0) scale(0.6);
    }
    to {
      opacity: 0;
      transform: translateX(-8px) scale(1.3);
    }
  }

  @keyframes exhaust {
    0%,
    60% {
      opacity: 0;
      transform: translate(0, 0) scale(0.4);
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-10px, -6px) scale(1.4);
    }
  }

  /* Clean hospitals (2.4 s): the mop crosses the floor, the dirt goes and the floor shines. */
  .mop {
    animation: mop 2.4s linear infinite;
  }

  .scrub {
    transform-origin: 50% 0;
    animation: scrub 0.3s ease-in-out infinite alternate;
  }

  .clean {
    animation: clean 2.4s linear infinite;
  }

  .spot {
    animation: spot 2.4s linear infinite;
  }

  .sp {
    transform-origin: center;
    animation: sparkle 2.4s ease-out infinite;
  }

  .s2,
  .p2 {
    animation-delay: calc(var(--rest) + 0.62s) !important;
  }

  .s3,
  .p3 {
    animation-delay: calc(var(--rest) + 1.2s) !important;
  }

  .twinkle {
    transform-origin: center;
    animation: twinkle 2.2s ease-in-out infinite;
  }

  @keyframes mop {
    0% {
      transform: translate(12px, 38px);
    }
    80% {
      transform: translate(94px, 38px);
    }
    81%,
    100% {
      transform: translate(-16px, 38px);
    }
  }

  @keyframes scrub {
    from {
      transform: rotate(-12deg);
    }
    to {
      transform: rotate(12deg);
    }
  }

  @keyframes clean {
    0% {
      clip-path: inset(0 96% 0 0);
    }
    80% {
      clip-path: inset(0 0 0 0);
    }
    81%,
    100% {
      clip-path: inset(0 100% 0 0);
    }
  }

  @keyframes spot {
    0%,
    10% {
      opacity: 1;
    }
    16%,
    84% {
      opacity: 0;
    }
    90%,
    100% {
      opacity: 1;
    }
  }

  @keyframes sparkle {
    0%,
    12% {
      opacity: 0;
      transform: scale(0.2);
    }
    18% {
      opacity: 1;
      transform: scale(1.3);
    }
    34%,
    100% {
      opacity: 0;
      transform: scale(0.6);
    }
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.2;
      transform: scale(0.6);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  /* Ban (2.6 s): the marker draws an X, the plate tips off the desk, a new one appears. */
  .x1,
  .x2 {
    stroke-dasharray: 1;
  }

  .x1 {
    animation: draw1 2.6s ease-out infinite;
  }

  .x2 {
    animation: draw2 2.6s ease-out infinite;
  }

  .pen {
    animation: pen 2.6s ease-in-out infinite;
  }

  .plate {
    transform-origin: 100% 100%;
    animation: plate 2.6s ease-in infinite;
  }

  .glint {
    animation: glint 3s ease-in-out infinite;
  }

  @keyframes draw1 {
    0%,
    10% {
      stroke-dashoffset: 1;
    }
    24%,
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes draw2 {
    0%,
    26% {
      stroke-dashoffset: 1;
    }
    40%,
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes pen {
    0%,
    6% {
      opacity: 0;
      transform: translate(30px, 20px);
    }
    10% {
      opacity: 1;
      transform: translate(30px, 20px);
    }
    24% {
      transform: translate(70px, 39px);
    }
    26% {
      transform: translate(70px, 20px);
    }
    40% {
      opacity: 1;
      transform: translate(30px, 39px);
    }
    46%,
    100% {
      opacity: 0;
      transform: translate(20px, 10px);
    }
  }

  @keyframes plate {
    0%,
    52% {
      transform: translate(0, 0) rotate(0);
      opacity: 1;
    }
    66% {
      transform: translate(14px, 6px) rotate(35deg);
      opacity: 1;
    }
    78% {
      transform: translate(34px, 40px) rotate(80deg);
      opacity: 0;
    }
    86% {
      transform: translate(0, 0) scale(0.2);
      opacity: 0;
    }
    94% {
      transform: scale(1.12);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes glint {
    0%,
    70%,
    100% {
      transform: translateX(0);
      opacity: 0;
    }
    74% {
      opacity: 0.55;
    }
    90% {
      transform: translateX(44px);
      opacity: 0;
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

  /* Second chance: a firm handshake. */
  .shake {
    animation: shake 0.8s ease-in-out infinite;
  }

  .heart {
    transform-origin: center;
    animation: beat 1.6s ease-in-out infinite;
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

  @media (prefers-reduced-motion: reduce) {
    .preview * {
      animation-play-state: paused !important;
    }
  }
</style>
