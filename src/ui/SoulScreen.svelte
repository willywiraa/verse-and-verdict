<script lang="ts">
  import MessageCircle from '@lucide/svelte/icons/message-circle';
  import { tick, untrack } from 'svelte';
  import { DAY_ONE_HINTS } from '../content/scribe';
  import { canGive, echoCause, faceOf, soulById, type ReignState } from '../game/reign';
  import { EYES, type Eye, type Verdict } from '../game/types';
  import Aftermath from './Aftermath.svelte';
  import Burst from './Burst.svelte';
  import EyeCard from './EyeCard.svelte';
  import { game } from './game.svelte';
  import { EYE_LABELS, VERDICT_LABELS, type CardState } from './labels';
  import TopBar from './TopBar.svelte';
  import VerdictBar from './VerdictBar.svelte';
  import Wisp from './Wisp.svelte';

  let { reign }: { reign: ReignState } = $props();

  const soul = $derived(soulById(game.content, reign.docket[reign.index]));
  const face = $derived(faceOf(soul, reign));
  const cause = $derived(echoCause(soul, reign, game.content));
  const firstDay = $derived(reign.firstReign && reign.day === 1);
  const hint = $derived(firstDay && reign.verdict === null ? DAY_ONE_HINTS[reign.index] : undefined);
  const outcome = $derived(reign.verdict ? soul.verdicts[reign.verdict] : null);
  const lastOfDay = $derived(reign.index === reign.docket.length - 1);
  const unseen = $derived(EYES.filter((e) => e !== reign.eye));

  // After a verdict the screen plays in beats: 0 fate, 1 Verse, 2 Faith, 3 missed Eyes, 4 done.
  // Reopening the page mid-aftermath shows everything at once.
  const BEAT_TIMES = [500, 1400, 1800, 2400];
  const resumed = untrack(() => reign.verdict !== null);
  let beat = $state(resumed ? 4 : 0);
  let fast = $state(resumed);
  let live = $state(false);
  let faithBefore = $state(untrack(() => reign.faith));
  let timers: ReturnType<typeof setTimeout>[] = [];

  /** The lamp changes on beat 2, together with the reaction. */
  const shownFaith = $derived(reign.verdict !== null && beat < 2 ? faithBefore : reign.faith);

  function reducedMotion(): boolean {
    return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function choose(verdict: Verdict) {
    if (!canGive(reign, verdict)) return;
    faithBefore = reign.faith;
    game.giveVerdict(verdict);
    live = true;
    clearTimers();
    if (reducedMotion()) {
      beat = 4;
      fast = true;
      return;
    }
    beat = 0;
    fast = false;
    BEAT_TIMES.forEach((ms, i) => timers.push(setTimeout(() => (beat = i + 1), ms)));
  }

  function skip() {
    clearTimers();
    beat = 4;
    fast = true;
  }

  function next() {
    clearTimers();
    game.nextSoul();
  }

  $effect(() => () => clearTimers());

  function cardState(eye: Eye): CardState {
    if (reign.eye === eye) return 'open';
    if (reign.verdict !== null) return beat >= 3 ? 'missed' : 'locked';
    return reign.eye === null ? 'closed' : 'locked';
  }

  let nameEl = $state<HTMLHeadingElement>();
  $effect(() => {
    void soul.id;
    tick().then(() => nameEl?.focus({ preventScroll: true }));
  });

  const VERDICT_KEYS: Readonly<Record<string, Verdict>> = { ArrowUp: 'rise', ArrowRight: 'return', ArrowDown: 'fall' };

  /** Enter and Space on a focused button already click it; don't handle them twice. */
  function onControl(target: EventTarget | null): boolean {
    return target instanceof Element && target.closest('button, a, input') !== null;
  }

  function onKeydown(event: KeyboardEvent) {
    if (game.overlay || event.altKey || event.ctrlKey || event.metaKey) return;
    if (reign.eye === null) {
      const i = ['1', '2', '3'].indexOf(event.key);
      if (i >= 0) {
        event.preventDefault();
        game.openEye(EYES[i]);
      }
    } else if (reign.verdict === null) {
      const verdict = VERDICT_KEYS[event.key];
      if (verdict && canGive(reign, verdict)) {
        event.preventDefault();
        choose(verdict);
      }
    } else if ((event.key === 'Enter' || event.key === ' ') && !onControl(event.target)) {
      event.preventDefault();
      if (beat < 4) skip();
      else next();
    }
  }

  /** A tap anywhere during the aftermath skips to its end. */
  function onPointerDown() {
    if (reign.verdict !== null && beat < 4 && !game.overlay) skip();
  }
</script>

<svelte:window onkeydown={onKeydown} onpointerdown={onPointerDown} />

<TopBar {reign} faith={shownFaith} />

<main class="stage">
  <article class="card" class:hit={reign.verdict === 'fall' && live && !fast} aria-labelledby="soul-name">
    {#if hint}
      <p class="scribe-bubble"><span>The Scribe</span>{hint}</p>
    {/if}

    <div class="wisp-area">
      {#key soul.id}
        <Wisp hue={soul.hue} emblem={soul.emblem} verdict={reign.verdict} />
      {/key}
      {#if reign.verdict && live}
        <Burst verdict={reign.verdict} />
      {/if}
      {#if reign.verdict && outcome}
        <p class="fate {reign.verdict}" class:fast>
          <span>{VERDICT_LABELS[reign.verdict]}</span>
          {outcome.fate}
        </p>
      {/if}
    </div>

    {#key soul.id}
      <div class="intro">
        {#if cause}
          <p class="cause">Because of your Verse on {cause.rootName}: <q>{cause.verse}</q></p>
        {/if}
        <h1 id="soul-name" class="name" tabindex="-1" bind:this={nameEl}>{soul.name}, {soul.age}</h1>
        <p class="death">{soul.death}</p>
        <p class="says">
          <span class="tag"><MessageCircle size={14} strokeWidth={2.2} aria-hidden="true" /> People say</span>
          {face.record}
        </p>
        <p class="plea"><span class="sr-only">{soul.name} says: </span>{face.plea}</p>
      </div>

      <div class="eyes" role="group" aria-label="Eyes: open one">
        {#each EYES as eye, i (eye)}
          <EyeCard
            {eye}
            text={soul.eyes[eye]}
            state={cardState(eye)}
            index={i}
            delay={reign.verdict !== null && !fast ? unseen.indexOf(eye) * 0.25 : 0}
            onopen={() => game.openEye(eye)}
          />
        {/each}
      </div>
    {/key}

    <p class="sr-only" aria-live="polite">
      {reign.eye && reign.verdict === null ? `${EYE_LABELS[reign.eye]}: ${soul.eyes[reign.eye]}` : ''}
    </p>

    {#if reign.verdict && outcome}
      <Aftermath
        verse={outcome.verse}
        faith={outcome.faith}
        {beat}
        {fast}
        firstHint={firstDay && reign.index === 0}
        {lastOfDay}
        onnext={next}
      />
    {/if}
  </article>

  {#if reign.verdict === null}
    <VerdictBar {reign} onchoose={choose} />
  {/if}
</main>

<style>
  .stage {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem 1rem 2rem;
  }

  .card {
    position: relative;
    background: var(--parchment);
    color: var(--ink);
    border-radius: 18px;
    padding: 1rem clamp(1rem, 4vw, 1.75rem) 1.4rem;
    box-shadow:
      0 18px 50px rgb(0 0 0 / 0.35),
      inset 0 0 0 1px var(--parchment-edge);
  }

  .card.hit {
    animation: hit 0.5s ease-out 0.15s;
  }

  .scribe-bubble {
    position: relative;
    margin: 0 auto 0.4rem;
    width: fit-content;
    max-width: 100%;
    padding: 0.4rem 0.9rem;
    border-radius: 12px;
    background: #2a2433;
    color: var(--parchment);
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.1rem;
    text-align: center;
    animation: pop-in 0.4s ease-out 0.5s both;
  }

  .scribe-bubble span {
    display: block;
    font-family: var(--sans);
    font-style: normal;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .wisp-area {
    position: relative;
    height: 122px;
  }

  .fate {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.2rem;
    margin: 0 auto;
    max-width: 30rem;
    text-align: center;
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.2rem;
    animation: pop-in 0.45s ease-out 0.45s both;
  }

  .fate span {
    margin-right: 0.3rem;
    font-family: var(--sans);
    font-style: normal;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .fate.rise span {
    color: #9a7428;
  }

  .fate.return span {
    color: var(--teal);
  }

  .fate.fall span {
    color: var(--ember);
  }

  .fate.fast {
    animation: none;
  }

  .intro {
    text-align: center;
  }

  .cause {
    margin: 0 auto 0.5rem;
    width: fit-content;
    max-width: 100%;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    background: rgb(224 177 90 / 0.18);
    font-size: 0.85rem;
    animation: rise-in 0.45s ease-out both;
  }

  .cause q {
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.02rem;
  }

  .name {
    margin: 0;
    font-family: var(--serif);
    font-weight: 600;
    font-size: 2rem;
    line-height: 1.1;
    outline: none;
    animation: rise-in 0.45s ease-out 0.1s both;
  }

  .death {
    margin: 0.15rem 0 0.75rem;
    color: var(--ink-soft);
    animation: rise-in 0.45s ease-out 0.15s both;
  }

  .says {
    margin: 0;
    font-size: 1.05rem;
    animation: rise-in 0.45s ease-out 0.2s both;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-right: 0.35rem;
    padding: 0.05rem 0.5rem;
    border-radius: 999px;
    background: rgb(42 36 51 / 0.08);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-soft);
    vertical-align: 0.1em;
  }

  .plea {
    position: relative;
    margin: 0.85rem auto 0;
    width: fit-content;
    max-width: 92%;
    padding: 0.45rem 1rem;
    border-radius: 16px;
    background: #fffaf0;
    box-shadow: inset 0 0 0 1px #e6d9b8;
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.25rem;
    animation: pop-in 0.4s ease-out 0.45s both;
  }

  .plea::before {
    content: '';
    position: absolute;
    top: -7px;
    left: 50%;
    width: 12px;
    height: 12px;
    margin-left: -6px;
    background: #fffaf0;
    box-shadow: inset 1px 1px 0 #e6d9b8;
    transform: rotate(45deg);
  }

  .eyes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    margin-top: 1.1rem;
    animation: rise-in 0.45s ease-out 0.55s both;
  }

  @keyframes rise-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }

  @keyframes pop-in {
    from {
      opacity: 0;
      transform: translateY(6px) scale(0.95);
    }
  }

  @keyframes hit {
    0%,
    100% {
      transform: none;
      filter: none;
    }
    20% {
      transform: translateX(-3px);
      filter: brightness(0.85);
    }
    40% {
      transform: translateX(3px);
      filter: brightness(0.85);
    }
    60% {
      transform: translateX(-2px);
    }
    80% {
      transform: translateX(1px);
    }
  }

  @media (max-width: 520px) {
    .eyes {
      grid-template-columns: 1fr;
    }
  }
</style>
