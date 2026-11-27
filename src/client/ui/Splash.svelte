<script lang="ts">
  import Flame from '@lucide/svelte/icons/flame';
  import Gavel from '@lucide/svelte/icons/gavel';
  import Users from '@lucide/svelte/icons/users';
  import type { TodayResponse } from '@shared/api';
  import { CASES } from '@shared/cases';
  import { shortDate } from '@shared/daily';
  import { onMount } from 'svelte';
  import { api, openGame } from '../platform';
  import Character from './rig/Character.svelte';

  /** The card in the Reddit feed: today's three defendants and one tap into court. */
  let today = $state.raw<TodayResponse | null>(null);
  let failed = $state(false);

  onMount(async () => {
    try {
      today = await api.today();
    } catch (error) {
      console.error(error);
      failed = true;
    }
  });

  const defendants = $derived(
    (today?.docket ?? []).map((id) => CASES.find((c) => c.id === id)).filter((c) => c !== undefined),
  );
  const done = $derived(!!today && today.verdicts.length >= today.docket.length);
  const started = $derived(!!today && today.verdicts.length > 0 && !done);
</script>

<main class="splash">
  <header class="top">
    <span class="logo"><Gavel size={20} strokeWidth={2.5} aria-hidden="true" /> Fit the Crime</span>
    {#if today}
      <span class="docket">Docket #{today.dayNumber} · {shortDate(today.date)}{today.isToday ? '' : ' · past'}</span>
    {/if}
  </header>

  <ol class="lineup" aria-label="Today's defendants">
    {#if today}
      {#each defendants as file, i (file.id)}
        <li class="defendant" style:--d="{i * 0.12}s">
          <div class="mug">
            <Character look={file.person.look} mood={file.person.mood} framing="bust" />
          </div>
          <span class="name">{file.person.name}</span>
          <span class="crime">{file.crime}</span>
        </li>
      {/each}
    {:else}
      {#each [0, 1, 2] as i (i)}
        <li class="defendant ghost" aria-hidden="true"><div class="mug"></div></li>
      {/each}
    {/if}
  </ol>

  <p class="pitch">Three cases. You pick the punishment.<br />Watch what happens, then see how Reddit ruled.</p>

  <button type="button" class="btn primary open" onclick={(event) => openGame(event)} disabled={!today && !failed}>
    <Gavel size={20} strokeWidth={2.5} aria-hidden="true" />
    {done ? 'See your verdicts' : started ? 'Back to court' : 'Open court'}
  </button>

  <footer class="stats">
    {#if today}
      <span><Users size={16} aria-hidden="true" /> {today.judges.toLocaleString('en-US')} {today.judges === 1 ? 'judge' : 'judges'} ruled</span>
      {#if today.streak > 0}
        <span class="streak"><Flame size={16} aria-hidden="true" /> {today.streak}-day streak</span>
      {/if}
    {:else if failed}
      <span>Could not reach the court. Tap to try anyway.</span>
    {/if}
  </footer>
</main>

<style>
  .splash {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 0.8rem 0.9rem 0.9rem;
    background:
      radial-gradient(ellipse 80% 45% at 50% 0%, rgb(255 255 255 / 0.6), transparent 70%),
      repeating-linear-gradient(90deg, transparent 0 46px, rgb(31 42 68 / 0.035) 46px 48px),
      linear-gradient(180deg, var(--wall), var(--wall-deep));
    text-align: center;
  }

  .top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.3rem 1rem;
    width: 100%;
  }

  .logo {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--serif);
    font-size: 1.45rem;
    font-weight: 600;
    color: var(--ink);
  }

  .logo :global(svg) {
    color: var(--red);
  }

  .docket {
    padding: 0.15rem 0.6rem;
    border: 2px solid var(--ink);
    border-radius: 999px;
    background: var(--paper);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .lineup {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.6rem;
    width: 100%;
    max-width: 30rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .defendant {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    animation: drop-in 0.45s cubic-bezier(0.3, 1.4, 0.5, 1) var(--d, 0s) both;
  }

  .mug {
    width: 100%;
    aspect-ratio: 108 / 122;
    padding: 0.3rem 0.2rem 0;
    border: var(--line);
    border-radius: 8px;
    background:
      repeating-linear-gradient(180deg, transparent 0 11px, rgb(31 42 68 / 0.16) 11px 13px),
      #e4ecef;
    box-shadow: var(--shadow-small);
    overflow: hidden;
  }

  .ghost .mug {
    opacity: 0.5;
  }

  .name {
    margin-top: 0.2rem;
    font-weight: 900;
    font-size: 0.92rem;
    line-height: 1.1;
  }

  .crime {
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--red-deep);
  }

  .pitch {
    margin: 0;
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--ink-soft);
  }

  .open {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.8rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    animation: nudge 2.6s ease-in-out 1.2s infinite;
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem 1rem;
    min-height: 1.3rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--ink-soft);
  }

  .stats span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .streak {
    color: var(--orange);
  }

  @keyframes drop-in {
    from {
      opacity: 0;
      transform: translateY(-14px) rotate(-3deg);
    }
  }

  @keyframes nudge {
    0%,
    86%,
    100% {
      transform: none;
    }
    92% {
      transform: scale(1.05);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .open {
      animation: none;
    }
  }
</style>
