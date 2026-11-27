<script lang="ts">
  import { onMount } from 'svelte';
  import { cityOf, crowdOf, lastVerdict, type DayState } from '@shared/court/court';
  import { court } from './court.svelte';
  import CourtBar from './CourtBar.svelte';
  import CrowdStrip from './CrowdStrip.svelte';
  import JuryPanel from './JuryPanel.svelte';
  import Newspaper from './Newspaper.svelte';
  import Character from './rig/Character.svelte';
  import type { Take } from './rig/parts';
  import BanScene from './scenes/BanScene.svelte';
  import FallbackScene from './scenes/FallbackScene.svelte';
  import { SCENE_LENGTH } from './scenes';
  import PrisonScene from './scenes/PrisonScene.svelte';
  import SeizeScene from './scenes/SeizeScene.svelte';
  import ServiceScene from './scenes/ServiceScene.svelte';
  import { crowdShout } from './words';

  let { day }: { day: DayState } = $props();

  /** The beats of a verdict, in order. */
  const GAVEL = 0;
  const STAMP = 1;
  const SCENE = 2;
  const REACTION = 3;
  const HEADLINE = 4;
  const DONE = 5;

  const verdict = $derived(lastVerdict(day, court.content!));
  const before = $derived<DayState>({ ...day, verdicts: day.verdicts.slice(0, -1) });

  let beat = $state(GAVEL);
  let skipped = $state(false);
  let nextButton = $state<HTMLButtonElement | null>(null);
  /** The defendant jumps when the gavel lands. */
  let gavelTake = $state<Take | null>(null);
  const timers: ReturnType<typeof setTimeout>[] = [];

  function at(seconds: number, run: () => void): void {
    timers.push(setTimeout(run, seconds * 1000));
  }

  function skip(): void {
    for (const id of timers) clearTimeout(id);
    timers.length = 0;
    skipped = true;
    beat = DONE;
  }

  /** The crowd reacts once the scene has played out, then the paper arrives. */
  function sceneEnded(): void {
    if (beat !== SCENE || !verdict) return;
    const option = verdict.option;
    beat = REACTION;
    court.cue(option.crowd > 0 ? 'cheer' : option.crowd < 0 ? 'boo' : 'murmur');
    at(0.8, () => {
      beat = HEADLINE;
      court.cue('whoosh');
    });
    at(1.4, () => (beat = DONE));
  }

  onMount(() => {
    const replay = court.fresh;
    court.fresh = false;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!verdict || !replay || still) {
      skip();
      return;
    }
    const scene = 1.3;
    at(0.3, () => {
      court.cue('gavel');
      gavelTake = { name: 'jolt', id: 1 };
    });
    at(0.6, () => {
      beat = STAMP;
      court.cue('stamp');
    });
    at(scene, () => (beat = SCENE));
    // Drawn scenes say when they are done, and this is only a safety net; the stand-in has no clock.
    const drawn = ['prison', 'seize', 'service', 'ban'].includes(verdict.option.scene);
    at(scene + SCENE_LENGTH[verdict.option.scene] + (drawn ? 1.5 : 0), sceneEnded);
    return () => {
      for (const id of timers) clearTimeout(id);
    };
  });

  $effect(() => {
    if (beat === DONE && !skipped) nextButton?.focus({ preventScroll: true });
  });

  function onKeydown(event: KeyboardEvent): void {
    if (court.menuOpen || (event.key !== 'Enter' && event.key !== ' ')) return;
    if (event.target instanceof HTMLButtonElement) return;
    event.preventDefault();
    if (beat < DONE) skip();
    else court.next();
  }

  function onClick(event: MouseEvent): void {
    if (beat < DONE && !(event.target instanceof Element && event.target.closest('button'))) skip();
  }

  const last = $derived(day.index + 1 >= day.day.length);
</script>

<svelte:window onkeydown={onKeydown} />

{#if verdict}
  {@const { case: file, option } = verdict}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
  <main class="screen" onclick={onClick}>
    <CourtBar
      caseNumber={day.index + 1}
      total={day.day.length}
      crowd={crowdOf(beat >= REACTION ? day : before, court.content!)}
      built={cityOf(beat >= REACTION ? day : before, court.content!)}
    />

    <div class="stage" class:skip={skipped} class:shake={beat < SCENE && !skipped}>
      {#if beat < SCENE}
        <div class="intro">
          <div class="mug">
            <Character
              look={file.person.look}
              mood={beat >= STAMP ? 'shocked' : file.person.mood}
              take={gavelTake}
              gaze={beat >= STAMP ? null : { x: 0.9, y: -0.2 }}
              framing="bust"
            />
            <p class="who">{file.person.name}</p>
          </div>
          <svg class="gavel" viewBox="0 0 100 100" aria-hidden="true">
            <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
              <rect x="44" y="40" width="10" height="56" rx="4" fill="#a0764a" transform="rotate(-45 49 68)" />
              <rect x="12" y="14" width="56" height="28" rx="6" fill="#8a5a2b" transform="rotate(-45 40 28)" />
              <rect x="18" y="12" width="6" height="32" rx="2" fill="var(--gold)" transform="rotate(-45 40 28)" />
              <rect x="56" y="12" width="6" height="32" rx="2" fill="var(--gold)" transform="rotate(-45 40 28)" />
            </g>
          </svg>
          <svg class="block" viewBox="0 0 100 30" aria-hidden="true">
            <rect x="8" y="8" width="84" height="18" rx="5" fill="#8a5a2b" stroke="var(--ink)" stroke-width="3" />
            <g class="impact" stroke="var(--ink)" stroke-width="3" stroke-linecap="round">
              <path d="M4 6 L-6 -2 M50 2 L50 -10 M96 6 L106 -2" />
            </g>
          </svg>
          {#if beat >= STAMP}
            <div class="sentenced">
              <span class="word">Sentenced</span>
              <span class="what">{option.label} · {option.detail}</span>
            </div>
          {/if}
        </div>
      {:else}
        {#if option.scene === 'prison'}
          <PrisonScene {file} {option} skip={skipped} onend={sceneEnded} />
        {:else if option.scene === 'seize'}
          <SeizeScene {file} {option} skip={skipped} onend={sceneEnded} />
        {:else if option.scene === 'service'}
          <ServiceScene {file} {option} skip={skipped} onend={sceneEnded} />
        {:else if option.scene === 'ban'}
          <BanScene {file} {option} skip={skipped} onend={sceneEnded} />
        {:else}
          <FallbackScene {file} {option} skip={skipped} />
        {/if}
        {#if beat >= REACTION && option.note}
          <p class="note">{option.note}</p>
        {/if}
      {/if}
    </div>

    <div class="after">
      {#if beat >= REACTION}
        <CrowdStrip change={option.crowd} shout={crowdShout(option)} />
      {/if}
      {#if beat >= HEADLINE}
        <Newspaper headline={option.headline} scene={option.scene} caseNumber={day.index + 1} />
      {/if}
      {#if beat >= DONE}
        <JuryPanel {file} chosen={day.verdicts.at(-1)?.option ?? 0} counts={court.jury[file.id] ?? null} />
      {/if}
    </div>

    <div class="foot">
      {#if beat >= DONE}
        <button type="button" class="btn go next" bind:this={nextButton} onclick={() => court.next()}>
          {last ? 'See your verdicts' : 'Next case'} →
        </button>
      {:else}
        <p class="skip-hint">Tap to skip</p>
      {/if}
    </div>
  </main>
{/if}

<style>
  .screen {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    max-width: 62rem;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0 auto;
    padding: 0.9rem 1rem 1.5rem;
  }

  /*
   * The stage is always 16:9, as wide as the screen's height allows, so every
   * scene is composed once. It is a size container: scenes use cqw and cqh.
   */
  .stage {
    position: relative;
    container-type: size;
    width: min(100%, calc((100dvh - 22rem) * 16 / 9));
    min-width: min(100%, 20rem);
    aspect-ratio: 16 / 9;
    margin-inline: auto;
    border: var(--line);
    border-radius: 16px;
    background: var(--paper-deep);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .stage.shake {
    animation: shake 0.28s ease-out 0.3s;
  }

  /* Skipping jumps every timeline animation to its end; idle breathing and blinking carry on. */
  .skip :global(.tl) {
    animation: none !important;
  }

  .intro {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4%;
    background:
      radial-gradient(ellipse at 50% 40%, rgb(255 255 255 / 0.6), transparent 70%),
      var(--paper-deep);
  }

  .mug {
    width: min(26%, 13rem);
    padding: 0.5rem 0.5rem 0;
    border: var(--line);
    border-radius: 10px;
    background:
      repeating-linear-gradient(180deg, transparent 0 15px, rgb(31 42 68 / 0.18) 15px 17px),
      #e4ecef;
    text-align: center;
  }

  .who {
    margin: 0 -0.5rem;
    padding: 0.15rem;
    border-top: var(--line);
    background: var(--paper);
    font-weight: 900;
  }

  .gavel {
    position: absolute;
    left: 58%;
    top: 12%;
    width: 22%;
    max-width: 10rem;
    transform-origin: 85% 85%;
    animation: swing 0.32s cubic-bezier(0.6, 0, 0.9, 0.5) both;
  }

  .block {
    position: absolute;
    left: 60%;
    top: 62%;
    width: 18%;
    max-width: 8rem;
    overflow: visible;
  }

  .impact {
    opacity: 0;
    animation: impact 0.3s ease-out 0.3s;
  }

  .sentenced {
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3rem 1.2rem 0.4rem;
    border: 5px solid var(--red);
    border-radius: 10px;
    background: rgb(255 255 255 / 0.82);
    color: var(--red-deep);
    transform: translate(-50%, -50%) rotate(-8deg);
    animation: stamp 0.3s cubic-bezier(0.3, 1.6, 0.5, 1) both;
  }

  .word {
    font-size: clamp(1.6rem, 6vw, 3rem);
    font-weight: 900;
    letter-spacing: 0.1em;
    line-height: 1.1;
    text-transform: uppercase;
  }

  .what {
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .note {
    position: absolute;
    right: 3%;
    top: 6%;
    margin: 0;
    padding: 0.25rem 0.8rem;
    border: var(--line);
    border-radius: 8px;
    background: var(--gold);
    font-weight: 900;
    box-shadow: var(--shadow-small);
    transform: rotate(3deg);
    animation: tag 0.35s cubic-bezier(0.3, 1.7, 0.5, 1) both;
  }

  .after {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
    min-height: 3rem;
  }

  .foot {
    display: flex;
    justify-content: center;
    min-height: 3rem;
  }

  .next {
    font-size: 1.1rem;
    animation: tag 0.35s cubic-bezier(0.3, 1.7, 0.5, 1) both;
  }

  .skip-hint {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--ink-soft);
  }

  @keyframes swing {
    from {
      transform: rotate(-70deg);
    }
  }

  @keyframes impact {
    0% {
      opacity: 1;
      transform: scale(0.6);
    }
    100% {
      opacity: 0;
      transform: scale(1.4);
    }
  }

  @keyframes shake {
    20% {
      transform: translate(-6px, 3px);
    }
    40% {
      transform: translate(5px, -3px);
    }
    60% {
      transform: translate(-4px, 2px);
    }
    80% {
      transform: translate(2px, -1px);
    }
  }

  @keyframes stamp {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-8deg) scale(2.8);
    }
  }

  @keyframes tag {
    from {
      opacity: 0;
      transform: scale(0.4);
    }
  }

  @media (max-width: 640px) {
    .mug {
      width: 38%;
    }

    .gavel {
      left: 56%;
      width: 34%;
    }

    .block {
      left: 60%;
      width: 30%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stage.shake {
      animation: none;
    }
  }
</style>
