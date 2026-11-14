<script lang="ts">
  import type { Case, Mood } from '../court/types';
  import Defendant from './Defendant.svelte';
  import EvidenceTag from './EvidenceTag.svelte';
  import MoneyCounter from './MoneyCounter.svelte';
  import PictureRow from './PictureRow.svelte';

  let {
    file,
    number,
    mood,
    flipped,
    onflip,
  }: {
    file: Case;
    number: number;
    /** The face right now; it changes as the player handles the cards. */
    mood: Mood;
    flipped: readonly boolean[];
    onflip: (index: number) => void;
  } = $props();
</script>

<article class="file" aria-labelledby="case-name">
  <span class="tab" aria-hidden="true">Case file · No. {String(number).padStart(3, '0')}</span>
  <div class="sheet">
    <div class="mugshot">
      <Defendant look={file.person.look} {mood} />
    </div>

    <div class="who">
      <h1 id="case-name" class="name">{file.person.name}</h1>
      <p class="role">{file.person.role}</p>
      <p class="crime"><span>{file.crime}</span></p>
    </div>

    <div class="facts">
      <p class="money">
        <MoneyCounter amount={file.amount} />
        <span class="amount-label">{file.amountLabel}</span>
      </p>
      <p class="worth">
        <span class="equals" aria-hidden="true">=</span>
        <PictureRow picture={file.worth.picture} count={file.worth.count} tone="green" delay={0.9} />
        <span class="worth-label">{file.worth.count} {file.worth.label}</span>
      </p>
      <ul class="hurt" aria-label="Who got hurt">
        {#each file.hurt as h, i (i)}
          <li>
            <PictureRow picture={h.picture} count={h.count} tone="red" size={18} delay={1.2 + i * 0.3} />
            <span>{h.label}</span>
          </li>
        {/each}
      </ul>
    </div>

    <section class="evidence" aria-label="Evidence">
      <p class="eyebrow">Evidence <span class="tip">· tap to look</span></p>
      <div class="tags">
        {#each file.evidence as e, i (i)}
          <EvidenceTag evidence={e} index={i} flipped={flipped[i]} onflip={() => onflip(i)} />
        {/each}
      </div>
    </section>
  </div>
</article>

<style>
  .file {
    position: relative;
    padding-top: 1.4rem;
    animation: slide-in 0.45s cubic-bezier(0.2, 1.2, 0.4, 1) both;
  }

  .tab {
    position: absolute;
    top: 0;
    left: 1.25rem;
    padding: 0.2rem 0.9rem 0.5rem;
    border: var(--line);
    border-bottom: 0;
    border-radius: 10px 10px 0 0;
    background: var(--folder);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .sheet {
    display: grid;
    grid-template-columns: minmax(8rem, 11rem) 1fr;
    grid-template-areas:
      'mug who'
      'mug facts'
      'mug evidence';
    gap: 0.5rem 1.25rem;
    padding: 1rem 1.1rem 1.1rem;
    border: var(--line);
    border-radius: 4px 16px 16px 16px;
    background:
      linear-gradient(var(--paper), var(--paper)) padding-box,
      var(--folder);
    box-shadow:
      inset 0 0 0 7px var(--folder),
      var(--shadow);
  }

  /* A mugshot wall with height lines. */
  .mugshot {
    grid-area: mug;
    align-self: start;
    padding: 0.6rem 0.4rem 0;
    border: var(--line);
    border-radius: 8px;
    background:
      repeating-linear-gradient(180deg, transparent 0 15px, rgb(31 42 68 / 0.18) 15px 17px),
      #e4ecef;
    overflow: hidden;
  }

  .who {
    grid-area: who;
    min-width: 0;
  }

  .facts {
    grid-area: facts;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    min-width: 0;
  }

  .name {
    margin: 0;
    font-size: clamp(1.35rem, 4vw, 1.8rem);
    font-weight: 900;
    line-height: 1.05;
  }

  .role {
    margin: 0;
    font-weight: 600;
    color: var(--ink-soft);
  }

  .crime {
    margin: 0.35rem 0 0;
    animation: stamp 0.4s cubic-bezier(0.3, 1.6, 0.5, 1) 0.35s both;
  }

  .crime span {
    display: inline-block;
    padding: 0.15rem 0.6rem;
    border: 3px solid var(--red);
    border-radius: 6px;
    color: var(--red-deep);
    font-weight: 900;
    font-size: 1.05rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transform: rotate(-2deg);
  }

  .money {
    display: flex;
    align-items: baseline;
    gap: 0.45rem;
    margin: 0;
    font-size: clamp(1.4rem, 4.5vw, 1.9rem);
    line-height: 1.1;
  }

  .amount-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--ink-soft);
  }

  .worth {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
    margin: 0;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: #e3f1e7;
    font-weight: 800;
    color: var(--green-deep);
  }

  .equals {
    font-size: 1.2rem;
  }

  .hurt {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1rem;
    margin: 0.15rem 0 0;
    padding: 0;
    list-style: none;
  }

  .hurt li {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--red-deep);
  }

  .evidence {
    grid-area: evidence;
    margin-top: 0.3rem;
  }

  .evidence .eyebrow {
    margin-bottom: 0.4rem;
  }

  .tip {
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: none;
  }

  .tags {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-24px) rotate(-1.5deg);
    }
  }

  @keyframes stamp {
    from {
      opacity: 0;
      transform: scale(2.2) rotate(-8deg);
    }
  }

  @media (max-width: 560px) {
    .sheet {
      grid-template-columns: 6.5rem 1fr;
      grid-template-areas:
        'mug who'
        'facts facts'
        'evidence evidence';
      padding: 0.8rem;
    }

    .mugshot {
      align-self: center;
    }

    .tags {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
</style>
