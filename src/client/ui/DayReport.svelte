<script lang="ts">
  import Flame from '@lucide/svelte/icons/flame';
  import MessageSquare from '@lucide/svelte/icons/message-square';
  import Tag from '@lucide/svelte/icons/tag';
  import Users from '@lucide/svelte/icons/users';
  import type { DayState } from '@shared/court/court';
  import { TITLES, dayReport, fairnessLine } from '@shared/court/report';
  import { secondsUntilNextDay, shortDate } from '@shared/daily';
  import { majority, percent } from '@shared/progress';
  import { onMount } from 'svelte';
  import { api, askToLogIn, toast } from '../platform';
  import CityTally from './CityTally.svelte';
  import { court } from './court.svelte';
  import CrowdFace from './CrowdFace.svelte';
  import Character from './rig/Character.svelte';

  /** The result card: the day's verdicts against Reddit's, the judge's title, and what to do next. */
  let { day }: { day: DayState } = $props();

  const report = $derived(dayReport(day, court.content!));
  const title = $derived(TITLES[report.title]);
  const today = $derived(court.today);
  const rows = $derived(
    report.verdicts.map(({ case: file, option }, i) => {
      const counts = court.jury[file.id];
      const chosen = day.verdicts[i]?.option ?? 0;
      return {
        file,
        option,
        share: counts ? percent(counts, chosen) : null,
        agreed: counts ? majority(counts) === chosen : null,
      };
    }),
  );
  const agreed = $derived(rows.filter((r) => r.agreed).length);
  const streak = $derived(court.finished?.streak ?? today?.streak ?? 0);
  const judges = $derived(court.finished?.judges ?? today?.judges ?? 0);

  let seconds = $state(secondsUntilNextDay(new Date()));
  onMount(() => {
    const id = setInterval(() => (seconds = secondsUntilNextDay(new Date())), 30_000);
    return () => clearInterval(id);
  });
  const countdown = $derived(`${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`);

  let sharing = $state<'idle' | 'busy' | 'done'>('idle');
  let flaired = $state<'idle' | 'busy' | 'done'>('idle');

  function shareText(): string {
    const lines = rows.map((r) => `- ${r.file.person.name} (${r.file.crime.toLowerCase()}): **${r.option.label}**${r.share === null ? '' : ` (${r.share}% agreed)`}`);
    return [
      `⚖️ My verdicts for Docket #${today?.dayNumber ?? ''}:`,
      '',
      ...lines,
      '',
      `I'm the **${title.name}**: I agreed with Reddit on ${agreed} of ${rows.length} cases.`,
    ].join('\n');
  }

  async function share(): Promise<void> {
    if (today?.username === null) return askToLogIn();
    sharing = 'busy';
    try {
      const result = await api.share(shareText());
      sharing = result.ok ? 'done' : 'idle';
      void toast(result.message ?? (result.ok ? 'Shared' : 'Could not share'));
    } catch {
      sharing = 'idle';
      void toast('Could not share');
    }
  }

  async function wearTitle(): Promise<void> {
    if (today?.username === null) return askToLogIn();
    flaired = 'busy';
    try {
      const result = await api.flair(title.name);
      flaired = result.ok ? 'done' : 'idle';
      void toast(result.message ?? (result.ok ? 'Flair set' : 'Could not set flair'));
    } catch {
      flaired = 'idle';
      void toast('Could not set flair');
    }
  }
</script>

<main class="report">
  <header class="head">
    <p class="eyebrow">Docket #{today?.dayNumber} · {today ? shortDate(today.date) : ''} · Court is adjourned</p>
    <h1>{title.name}</h1>
    <p class="motto">{title.line}</p>
  </header>

  <ul class="stats">
    <li><CrowdFace mood={report.mood} size={26} /> Crowd {report.crowd}/10</li>
    <li><CityTally built={report.built} /></li>
    {#if streak > 0}<li class="streak"><Flame size={18} aria-hidden="true" /> {streak}-day streak</li>{/if}
    <li><Users size={18} aria-hidden="true" /> {judges.toLocaleString('en-US')} judges today</li>
  </ul>

  <ol class="verdicts">
    {#each rows as row, i (row.file.id)}
      <li style:--d="{0.15 + i * 0.12}s">
        <span class="mug"><Character look={row.file.person.look} mood="neutral" framing="bust" idle={false} /></span>
        <span class="who">
          <b>{row.file.person.name}</b>
          <span class="crime">{row.file.crime}</span>
        </span>
        <span class="stamp">{row.option.label}</span>
        <span class="agree" class:yes={row.agreed} class:no={row.agreed === false}>
          {row.share === null ? '—' : row.agreed ? `with ${row.share}%` : `only ${row.share}%`}
        </span>
      </li>
    {/each}
  </ol>

  <p class="summary">
    You agreed with Reddit on <b>{agreed} of {rows.length}</b> cases.
    {#if report.fairness}<br />{fairnessLine(report.fairness)}{/if}
  </p>

  <div class="actions">
    <button type="button" class="btn primary" onclick={share} disabled={sharing !== 'idle'}>
      <MessageSquare size={18} aria-hidden="true" />
      {sharing === 'done' ? 'Shared in comments' : sharing === 'busy' ? 'Sharing…' : 'Share in comments'}
    </button>
    <button type="button" class="btn" onclick={wearTitle} disabled={flaired !== 'idle'}>
      <Tag size={18} aria-hidden="true" />
      {flaired === 'done' ? 'Wearing your title' : 'Wear as flair'}
    </button>
  </div>

  <p class="next">Next docket in <b>{countdown}</b>. Three new cases every day.</p>
</main>

<style>
  .report {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    max-width: 40rem;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0 auto;
    padding: 1rem 1rem 1.5rem;
    text-align: center;
  }

  .head h1 {
    margin: 0.1rem 0 0;
    font-family: var(--serif);
    font-size: clamp(2.2rem, 9vw, 3rem);
    font-weight: 600;
    line-height: 1;
    animation: stamp 0.45s cubic-bezier(0.3, 1.6, 0.5, 1) both;
  }

  .motto {
    margin: 0.2rem 0 0;
    font-weight: 700;
    color: var(--ink-soft);
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem 1rem;
    margin: 0;
    padding: 0.4rem 0.8rem;
    border: var(--line);
    border-radius: 12px;
    background: var(--paper);
    box-shadow: var(--shadow-small);
    list-style: none;
    font-weight: 800;
    font-size: 0.88rem;
  }

  .stats li {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  .streak {
    color: var(--orange);
  }

  .verdicts {
    display: grid;
    gap: 0.45rem;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .verdicts li {
    display: grid;
    grid-template-columns: 3.2rem 1fr auto auto;
    align-items: center;
    gap: 0.6rem;
    padding: 0.35rem 0.6rem 0.35rem 0.35rem;
    border: var(--line);
    border-radius: 12px;
    background: #fffdf7;
    box-shadow: var(--shadow-small);
    text-align: left;
    animation: slide 0.4s cubic-bezier(0.3, 1.4, 0.5, 1) var(--d) both;
  }

  .mug {
    display: block;
    border: 2px solid var(--ink);
    border-radius: 6px;
    background: #e4ecef;
    overflow: hidden;
  }

  .who {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.15;
  }

  .crime {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--ink-soft);
  }

  .stamp {
    padding: 0.1rem 0.5rem;
    border: 2.5px solid var(--red);
    border-radius: 6px;
    color: var(--red-deep);
    font-weight: 900;
    font-size: 0.78rem;
    text-transform: uppercase;
    transform: rotate(-4deg);
    white-space: nowrap;
  }

  .agree {
    min-width: 4.6rem;
    font-weight: 800;
    font-size: 0.8rem;
    text-align: right;
  }

  .agree.yes {
    color: var(--green-deep);
  }

  .agree.no {
    color: var(--red-deep);
  }

  .summary {
    margin: 0;
    font-weight: 700;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
  }

  .actions .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .next {
    margin: 0;
    font-size: 0.85rem;
    color: var(--ink-soft);
  }

  @keyframes stamp {
    from {
      opacity: 0;
      transform: scale(1.8) rotate(-6deg);
    }
  }

  @keyframes slide {
    from {
      opacity: 0;
      transform: translateX(-16px);
    }
  }

  @media (max-width: 460px) {
    .verdicts li {
      grid-template-columns: 2.6rem 1fr auto;
    }

    .agree {
      grid-column: 2 / -1;
      text-align: left;
      min-width: 0;
    }
  }
</style>
