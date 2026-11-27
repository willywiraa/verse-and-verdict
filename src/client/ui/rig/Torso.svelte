<svelte:options namespace="svg" />

<script lang="ts">
  import type { Look, Outfit } from '@shared/court/types';
  import { BUILDS, SKIN, type Holding, type OutfitStyle } from './parts';

  let {
    look,
    outfit,
    style,
    holding,
    uid,
  }: { look: Look; outfit: Outfit; style: OutfitStyle; holding: Holding; uid: string } = $props();

  const build = $derived(BUILDS[look.build ?? 'average']);
  const skin = $derived(SKIN[look.skin]);
  const clip = $derived(`torso-${uid}`);
  const pearls = [46, 50.5, 55, 60, 65, 69.5, 74];
</script>

<g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">
  <defs>
    <clipPath id={clip}><path d={build.torso} /></clipPath>
  </defs>

  <path d={build.torso} fill={outfit === 'singlet' ? skin : style.top} stroke="none" />

  <g clip-path="url(#{clip})">
    {#if outfit === 'suit' || outfit === 'blazer'}
      <path d={outfit === 'suit' ? 'M52 88 L60 112 L68 88 Z' : 'M53 88 L60 104 L67 88 Z'} fill="#fff" stroke-width="2" />
      {#if outfit === 'suit'}
        <path d="M57.8 92 L62.2 92 L63.6 110 L60 115 L56.4 110 Z" fill="var(--red)" stroke-width="1.8" />
      {/if}
      <path d="M52 88 L57 108 L54 152 M68 88 L63 108 L66 152" fill="none" stroke-width="2" />
      <circle cx="60" cy="126" r="1.6" fill="var(--ink)" stroke="none" />
      <circle cx="60" cy="137" r="1.6" fill="var(--ink)" stroke="none" />
    {:else if outfit === 'uniform'}
      <path d="M50 88 L60 101 L70 88" fill="#a8875a" stroke-width="2" />
      <path d="M44 104 H55 V111 H44 Z" fill="none" stroke-width="1.6" />
      <path d="M71 102 l2.2 4.4 4.8 .7 -3.5 3.4 .8 4.8 -4.3 -2.3 -4.3 2.3 .8 -4.8 -3.5 -3.4 4.8 -.7 Z" fill="var(--gold)" stroke-width="1.4" />
      <path d="M30 138 H90 V144 H30 Z" fill="#3a2a1d" stroke-width="1.6" />
      <path d="M60 101 V138" fill="none" stroke-width="1.4" />
    {:else if outfit === 'shirt' || outfit === 'vest'}
      <path d="M50 88 L57 99 L60 90 Z M70 88 L63 99 L60 90 Z" fill="#f4f8f8" stroke-width="1.8" />
      <path d="M60 94 V152" fill="none" stroke-width="1.4" />
      {#if outfit === 'vest'}
        <path d="M30 98 L49 91 L53 152 L28 152 Z M90 98 L71 91 L67 152 L92 152 Z" fill="var(--orange)" stroke-width="2" />
        <path d="M30 124 H51 M69 124 H90" fill="none" stroke="#fff6c8" stroke-width="4" />
      {/if}
    {:else if outfit === 'tee' || outfit === 'overalls'}
      <path d="M52 87 Q60 95 68 87" fill={skin} stroke-width="2" />
      {#if outfit === 'overalls'}
        <path d="M45 105 H75 L80 152 H40 Z" fill="#6f8fb3" stroke-width="2" />
        <path d="M47 106 L44 88 M73 106 L76 88" fill="none" stroke="#6f8fb3" stroke-width="5" />
        <path d="M47 106 L44 88 M73 106 L76 88" fill="none" stroke-width="1.2" opacity="0.6" />
        <circle cx="47" cy="107" r="2" fill="var(--gold)" stroke-width="1.2" />
        <circle cx="73" cy="107" r="2" fill="var(--gold)" stroke-width="1.2" />
        <path d="M53 114 H67 V123 H53 Z" fill="none" stroke-width="1.5" />
      {/if}
    {:else if outfit === 'blouse'}
      <path d="M47 87 Q60 101 73 87" fill={skin} stroke-width="2" />
    {:else if outfit === 'apron'}
      <path d="M44 108 H76 L80 152 H40 Z" fill="#fffdf7" stroke-width="2" />
      <path d="M46 108 V88 M74 108 V88" fill="none" stroke-width="2" />
      <path d="M53 122 H67 V132 H53 Z" fill="none" stroke-width="1.5" />
    {:else if outfit === 'hoodie'}
      <path d="M41 92 Q60 81 79 92 Q60 102 41 92 Z" fill="#646b7c" stroke-width="2" />
      <path d="M55 97 L54 113 M65 97 L66 113" fill="none" stroke-width="1.8" />
      <path d="M46 127 H74 L71 140 H49 Z" fill="none" stroke-width="1.6" />
    {:else if outfit === 'boss'}
      <path d="M51 88 L60 104 L69 88 Z" fill={skin} stroke-width="2" />
      <path d="M51 88 L57 108 L54 152 M69 88 L63 108 L66 152" fill="none" stroke-width="2" />
      <path d="M53 95 Q60 103 67 95" fill="none" stroke="var(--gold)" stroke-width="2" />
    {:else if outfit === 'scrubs'}
      <path d="M53 87 L60 99 L67 87 Z" fill="#4a9a89" stroke-width="2" />
      <path d="M65 106 H76 V115 H65 Z" fill="none" stroke-width="1.5" />
      <path d="M68 106 V101" fill="none" stroke="var(--red)" stroke-width="2" />
    {:else if outfit === 'gown'}
      {#each [[48, 104], [66, 100], [56, 116], [72, 122], [46, 128], [62, 134], [52, 144], [74, 142]] as [x, y] (x * 1000 + y)}
        <circle cx={x} cy={y} r="1.8" fill="#8fb4d3" stroke="none" />
      {/each}
      <path d="M53 88 Q60 94 67 88" fill="none" stroke-width="2" />
    {:else if outfit === 'prison'}
      <path d="M50 88 L60 103 L70 88" fill="#d9761a" stroke-width="2" />
      <path d="M64 110 H80 V118 H64 Z" fill="#fff" stroke-width="1.5" />
      <path d="M67 114 H77" fill="none" stroke-width="1.5" />
    {:else if outfit === 'singlet'}
      <path d="M47 92 Q60 105 73 92 L82 152 H38 Z" fill="#f4f1ea" stroke-width="2" />
    {/if}

    {#if look.extras?.includes('pearls')}
      {#each pearls as x (x)}
        <circle cx={x} cy={96 - Math.abs(x - 60) * 0.22} r="2.5" fill="#fffdf2" stroke-width="1.1" />
      {/each}
    {/if}
  </g>

  <path d={build.torso} fill="none" />

  <!-- Things held in front of the body; the hands are drawn on top. -->
  {#if holding === 'box'}
    <g transform="translate(60 121)">
      <path d="M-9 -12 Q-16 -28 -5 -31 Q-2 -21 -6 -12 Z M-6 -12 Q-1 -26 6 -26 Q4 -18 -2 -12 Z" fill="var(--green)" stroke-width="1.8" />
      <path d="M3 -24 L15 -21 L12 -9 L0 -12 Z" fill="#fffdf7" stroke-width="1.8" />
      <path d="M-19 -13 H19 V14 H-19 Z" fill="#c9a26b" />
      <path d="M-19 -13 L-23 -19 M19 -13 L23 -19 M-8 -1 H8" fill="none" stroke-width="2" />
    </g>
  {:else if holding === 'cashbag'}
    <g transform="translate(60 120)">
      <path d="M-13 7 Q-18 -9 -7 -13 L-5 -18 H5 L7 -13 Q18 -9 13 7 Q0 12 -13 7 Z" fill="#cdb67a" />
      <path d="M-6 -15 H6" fill="none" stroke-width="2.5" />
      <circle cx="0" cy="-1" r="5.5" fill="var(--gold)" stroke-width="1.8" />
      <path d="M0 -4 V2" fill="none" stroke-width="1.6" />
    </g>
  {:else if holding === 'clipboard'}
    <g transform="translate(57 117) rotate(-8)">
      <path d="M-10 -13 H10 V13 H-10 Z" fill="#b9895a" />
      <path d="M-7 -9 H7 V10 H-7 Z" fill="#fffdf7" stroke-width="1.5" />
      <path d="M-4 -4 H4 M-4 0 H4 M-4 4 H2" fill="none" stroke-width="1.2" />
      <path d="M-4 -15 H4 V-11 H-4 Z" fill="#8f9aa8" stroke-width="1.5" />
    </g>
  {/if}
</g>
