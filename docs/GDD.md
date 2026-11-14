# Verse & Verdict: Game Design

Version 0.2 · 14 November 2026 · Requirements: [PRD.md](PRD.md)

## 1. Concept

You are a young god, newly given a small river country called Lowmere. The god before you fell silent, and the dead have been waiting.

Souls arrive one at a time as small lights. For each one you see what the living say about them, open **one** of three Eyes to glimpse the truth, and decide: **Rise, Return or Fall**. The Scribe, a mortal who hears your verdicts in dreams, writes each one down as a Verse. Then you learn what you did not see, and what the living did with your words.

*Judge the dead. The living are taking notes.*

### Pillars
1. **You never see everything.** One Eye per soul. What you did not look at is shown only after you judge.
2. **Your verdicts become their rules.** Every verdict becomes a Verse, and the living act on Verses.
3. **Consequences come back.** Later souls arrive because of something you said, and the game tells you which Verse.
4. **Five minutes, no homework.** Single-click choices, short text, nothing to manage.

The game never scores morality. No verdict is ever marked right or wrong.

The setting is invented. It uses no real religion, scripture, symbol or person.

## 2. Core loop

One soul takes 30 to 45 seconds.

| Step | What the player does | What the game shows |
|---|---|---|
| 1. Arrival | Looks | The wisp glows in. Name, age, how they died, what people say, and the soul's own words in a speech bubble |
| 2. One Eye | Flips one of three cards: Deed, Heart or Ripple | One or two short sentences of hidden truth |
| 3. Verdict | Taps Rise, Return or Fall | The wisp rises, circles away or sinks, with sparks, rings or embers. The soul's fate appears |
| 4. Verse | Watches | The line the Scribe writes, typed onto a scroll |
| 5. Faith | Watches | The lamp flares or flickers, with a reaction from the living |
| 6. You missed | Watches | The other two cards flip over |

Steps 3 to 6 play by themselves in about 2.5 seconds. A tap, Enter or Space skips to the end. Then the next soul arrives. After the last soul of the Day comes The World Below (§3.7).

## 3. Rules

### 3.1 The soul card
Every soul shows:
- name and age;
- how they died;
- **People say**: what the living believe. It may be wrong, incomplete or exactly right;
- the soul's own words in a speech bubble (the Plea).

### 3.2 Eyes
Three face-down cards, each with an icon and a short hint:
- **Deed** (a hand): "what they did". Something the living never saw.
- **Heart** (a heart): "why". What they wanted or feared.
- **Ripple** (waves): "what it caused". What their life led to, including things they never knew.

The player flips exactly one. The other two dim and lock until after the verdict. The cards glow gently until one is opened, and the verdict buttons wake up once it is.

No Eye is "the right one". Each must change how the soul looks (§5.2).

### 3.3 Verdicts

| Verdict | Button shows | Where the soul goes | Limit |
|---|---|---|---|
| **Rise** | ↑ reward | The Lantern Fields: rest | None |
| **Return** | ↻ new life | The Wheel: a second life below | 2 per Day |
| **Fall** | ↓ punish | The Hollow: a reckoning | None |

Before the choice, the buttons show only the icon, the verdict and its plain meaning. The soul's own **fate** line, such as "Rest. You will never be hungry again.", appears after the choice, where the wisp was.

When both Returns are spent, the button is disabled and reads "No Returns left today".

### 3.4 After the verdict
The aftermath plays in beats:

| Beat | Time | What appears |
|---|---|---|
| 0 | 0 s | The verdict effect and the fate line |
| 1 | 0.5 s | **The Scribe writes**: the Verse, typed onto a scroll. The Scribe knows only what people say, so the Verse is what a village would take from the verdict, not what the player meant |
| 2 | 1.4 s | The Faith lamp changes, with "+1" or "−2" floating up, and a reaction line (§3.5) |
| 3 | 1.8 s | **You missed**: the two unopened cards flip over, one after the other |
| 4 | 2.4 s | The Next button |

A tap, Enter or Space skips straight to beat 4. With the reduced-motion setting, everything appears at once. Reopening the page in the middle shows the finished state.

### 3.5 The Faith lamp
Faith is how much the living trust your judgment. It runs from 0 to 10 and starts at 5.

Each verdict carries a change from −2 to +2. The writer sets it from the Record alone. Rewarding someone the living admire, or punishing someone they despise, raises Faith. The reverse lowers it.

| Change | Reaction line |
|---|---|
| +2 | Lowmere cheers! |
| +1 | Lowmere approves. |
| 0 | Lowmere shrugs. |
| −1 | Lowmere is worried. |
| −2 | Lowmere is angry! |

Faith never ends the reign. It is read once, at the ending (§3.8).

Tuning target: a player who always sides with the Record ends at 9 or 10, and one who always defies it ends at 0 to 2.

### 3.6 Echoes
An **Echo** is a soul who arrives because of one of your Verses. A **root** is any soul who is not an Echo.

- Each root names one Echo and the verdicts that summon it, usually two of the three.
- A summoned Echo waits, then arrives on a later Day. Years pass below between your Days, so the Echo has lived a whole life under your Verse.
- Its card opens with "Because of your Verse on [name]:" and quotes the Verse.
- Its Record and Plea have a version for each verdict that can summon it. The person is the same; the angle differs. Its Eyes, verdicts and Faith changes are shared, so they must make sense with every version.
- An Echo never summons another Echo.
- Echoes still waiting when the reign ends are never shown.

One exception teaches the idea: the first soul of Day 1 summons its Echo on any verdict, and that Echo arrives the same Day (§4).

### 3.7 Days
A Day holds up to 6 souls. A reign has 3 Days:

| Day | Roots | Places for Echoes |
|---|---|---|
| 1 | 5 | 1 (the teaching Echo) |
| 2 | 4 | up to 2 |
| 3 | 3 | up to 3 |

- If fewer Echoes are waiting than there are places, the Day is shorter.
- In a player's first reign, Day 1 runs in a fixed order (§4). Everything else is shuffled by the reign's seed.
- Echoes never open a Day and never arrive back to back.
- The code can also run 1-Day and 5-Day reigns, depending on how many roots are written (§9.5).

**The World Below** ends each Day. One card per Verse slides in, one after another. Each card shows:
- the soul's emblem and name;
- the verdict;
- the Verse;
- a short "→" line showing what the living did with it.

The Scribe adds one remark, such as "Six Verses. People argue most about the second." A tap, Enter or Space shows everything at once. The player can begin the next Day or stop; the game is already saved.

### 3.8 The reign, endings and Temperament
A reign is 3 Days, up to 18 souls and about 15 minutes. Then the game picks one ending, checking in this order:

| Ending | Condition |
|---|---|
| **The Silent Sky** | Faith is 2 or lower |
| **The Unquestioned** | Faith is 9 or higher |
| **The Gentle Age** | Rise is at least 45% of verdicts and more common than Fall |
| **The Iron Age** | Fall is at least 45% of verdicts and more common than Rise |
| **The Weighed World** | Anything else |

The ending screen shows a short text of about 30 words, then two cards: the Verse the living **loved most** (highest Faith change) and the one they **hated most** (lowest). Ties go to the earlier Verse. No ending is the good one.

> **The Silent Sky.** Slowly, Lowmere stopped listening to you. The shrine lamps went out one by one. Nobody decided to stop believing. They just stopped asking. Now they judge each other.

> **The Unquestioned.** Lowmere trusts you completely. Your Verses are carved over every door. Children learn them before they can read. Nobody doubts you. Nobody doubts anything anymore.

> **The Gentle Age.** You opened the gate more often than you closed it. Lowmere became kind, then comfortable, then careless. Why try, if almost everyone rises? Some who were hurt are still waiting.

> **The Iron Age.** You closed the gate more often than you opened it. Lowmere became careful, then quiet, then afraid. Neighbours watch each other. The streets are safe. Nobody sleeps well.

> **The Weighed World.** You never chose one answer, so neither did they. Nobody can guess what you will do, so everyone has to think for themselves. Some love that. Some hate it.

The ending also shows a **Temperament** badge, a title of the form "The [adjective] [noun]".

| Adjective | When |
|---|---|
| Gentle | Rise is at least 45% of verdicts and more common than Fall |
| Stern | Fall is at least 45% of verdicts and more common than Rise |
| Patient | Neither of the above, and at least 80% of the available Returns were used (5 of 6) |
| Even | Anything else |

| Noun | When |
|---|---|
| Keeper of Deeds | Deed was opened most often, at least 40% of the time |
| Weigher of Hearts | Heart was opened most often, at least 40% of the time |
| Reader of Ripples | Ripple was opened most often, at least 40% of the time |
| Wanderer of Eyes | No Eye reached 40%, or two tied for most |

That gives 16 titles, such as "The Gentle Weigher of Hearts".

A new reign uses a new seed and shuffles every root, including those of Day 1.

## 4. Day 1 script

Day 1 of a first reign is fixed, because it teaches the game without a tutorial.

| # | Soul | Its job |
|---|---|---|
| 1 | Hettie Marrow (root, §6.1) | Teaches Eyes and verdicts, with gentle stakes. Summons Orrin on any verdict. |
| 2 | Dace Weller (root, §6.3) | The first real gap between what people say and the truth. The lamp moves hard. |
| 3 | Pip Ardley (root) | Breathing room. What people say is roughly true, and it is funny. |
| 4 | Kit Mallow (root) | A young soul who went wrong. Makes Return tempting and shows the Wheel's limit. |
| 5 | Orrin Vale (Echo of 1, §6.2) | "Because of your Verse…" The loop closes about 4 minutes in. |
| 6 | Ilse Brann (root) | An ordinary life with one small kindness. Ends the Day softly. |

The Scribe gives every instruction in a small bubble of 8 words or fewer:

| When | The Scribe says |
|---|---|
| Soul 1 arrives | "Open one Eye. Only one." |
| After the first verdict | "I wrote it down. They will read it." |
| Soul 2 arrives | "They only know the story. Watch the lamp." |
| Soul 4 arrives | "Only two Returns each day." |
| Soul 5 arrives | "This one is here because of you." |
| The World Below | A remark about the Day, such as "Six Verses. People argue most about the second." |

## 5. Writing souls

### 5.1 Template and word limits

| Field | Limit in words | Notes |
|---|---|---|
| Death | 6 | Never suicide |
| Record (People say) | 14 | What the living believe |
| Plea | 8 | The soul's own words, no quotation marks |
| Each Eye | 14 | Three per soul |
| Each fate line | 8 | Three per soul, shown after choosing |
| Each Verse | 8 | Three per soul |
| Each "And so…" line | 12 | Three per soul |

Before the verdict the player reads the death, the Record, the Plea and one Eye: at most 45 words. The current souls need 35 to 42. An Echo also shows its "Because of your Verse…" line.

Each soul also has an emblem icon, a hue for its wisp, and a Faith change for each verdict.

### 5.2 Rules for writers
1. **Plain, everyday English.** Short sentences and common words, for players who are still learning English. Keep the dry humour and the twists. The validator warns about known hard words (`HARD_WORDS` in `src/content/validate.ts`).
2. **Three defensible verdicts.** If you cannot argue for all three, rewrite the soul.
3. **Each Eye stands alone and changes the picture.** No Eye repeats what people say. None needs another to make sense. None is always the most useful.
4. **Fate lines describe what happens, not the reason.** They are shown after the choice, so they can be specific.
5. **Verses come from what people say only.** The Scribe generalises. A good Verse sounds like a rule a village could misuse.
6. **"And so…" lines cut both ways.** Show a good thing with a cost, or a bad thing with a grace.
7. **Faith follows what people say alone**, never the hidden truth.
8. **An Echo is someone who acted on the Verse.** They used it as an excuse, obeyed it to their cost, or were hurt by people who did.
9. **Be specific.** "She sold every loaf a little light" beats "she cheated".
10. **Keep to the limits.** The validator enforces them.

### 5.3 Mix
Across the 12 roots:

| How the truth compares with what people say | Roots |
|---|---|
| Roughly the same | 5 |
| Kinder | 4 |
| Worse | 2 |
| Both | 1 |

About a third of the souls are wry, the rest serious. No soul is flagged heavy at the moment.

### 5.4 Content standard
- Implied, never shown. No graphic description.
- Harms, not identities. Nobody is judged for who they are or what they believe.
- No real religions, symbols or people.
- No soul died by suicide.
- No sexual violence.
- Children may be affected by a story, but never played for laughs.

## 6. Sample souls

These three are taken from the game.

### 6.1 Hettie Marrow (root; Day 1, soul 1)
- **Name, age:** Hettie Marrow, 81
- **Death:** Asleep, with flour on her hands.
- **Emblem, hue:** wheat, 38
- **People say:** The town baker for forty years. She gave bread to the poor.
- **Plea:** I just wanted everyone fed.
- **Deed:** She sold every loaf a little light. For forty years.
- **Heart:** She was a hungry child once. She swore no child would be.
- **Ripple:** An orphan she fed became a doctor. Poor customers paid for it.

| Verdict | Fate | Verse | And so… | Faith |
|---|---|---|---|---|
| Rise | Rest. You will never be hungry again. | Feed the hungry, and you will be rewarded. | Rich people start giving bread in public. Nobody checks their prices. | +1 |
| Return | Live again, as a poor customer. | Even good people must try again. | Bakers start weighing their bread twice, just in case. | −1 |
| Fall | Stay hungry until every loaf is paid for. | Good deeds will not save you. | The orphans' table closes. People are afraid to give bread. | −2 |

- **Echo:** Orrin Vale, on Rise, Return and Fall. He arrives the same Day; this is the teaching Echo.

### 6.2 Orrin Vale (Echo of Hettie Marrow; Day 1, soul 5)
- **Name, age:** Orrin Vale, 58
- **Death:** A fever, in his big bed.
- **Emblem, hue:** lock, 28
- **Header:** "Because of your Verse on Hettie Marrow:" followed by that Verse.

What people say, and his Plea, depend on the verdict that summoned him:

| Summoned by | People say | Plea |
|---|---|---|
| Rise | Grain seller. Gave free bread every feast day, with a man shouting about it. | I fed the hungry. Now reward me. |
| Return | Grain seller. Said everyone gets another life, so this one doesn't matter. | Send me back. I'll be good next time. |
| Fall | Grain seller. Never gave anything away. Good deeds don't save you, he said. | You said it yourself. So I kept mine. |

His Eyes are the same in every version:
- **Deed:** In the hungry winter, he locked his grain away until prices tripled.
- **Heart:** He didn't see hungry people. He saw customers who would pay more.
- **Ripple:** His grain kept the town alive. Nine families sold their boats for it.

| Verdict | Fate | Verse | And so… | Faith |
|---|---|---|---|---|
| Rise | Rest. A full life, a full rest. | The rich are rewarded too. | Grain stores grow bigger. So do the locks on them. | 0 |
| Return | Live again, poor and hungry. | The rich man returns with empty hands. | A poor boy is born with a head for prices. | 0 |
| Fall | Wait outside a locked door, like they did. | Riches will not save you. | Grain sellers open their stores early, out of fear. | −1 |

### 6.3 Dace Weller (root; Day 1, soul 2)
- **Name, age:** Dace Weller, 34
- **Death:** Hanged at the ferry dock.
- **Emblem, hue:** anchor, 205
- **People say:** Ferryman. In the flood he cut the rope, and eleven people drowned.
- **Plea:** I would do it again. Ask me why.
- **Deed:** He was pulling two boats. He let eleven adults go to save thirty children.
- **Heart:** His daughter was in the children's boat. Did he count, or just see her?
- **Ripple:** Thirty children grew up. But one of the eleven was the only midwife.

| Verdict | Fate | Verse | And so… | Faith |
|---|---|---|---|---|
| Rise | Rise. Rest those rope-burned hands. | Save yourself, and you will be saved. | Ferry captains stop going down with their boats. Passengers learn to swim. | −2 |
| Return | Live again, as a passenger. | Leave the weak, and you will become weak. | Ferrymen make a promise: passengers first. They call it Weller's Promise. | 0 |
| Fall | Let the river take him, like the eleven. | He let them drown. Now he falls. | The town feels better. One of the thirty children knows the truth. | +1 |

- **Echo:** Nell Weller, his daughter, on Rise and Fall (`src/content/souls/nell-weller.ts`).

## 7. Screens and controls

### 7.1 Screens
1. **Title.** Begin or Continue, a Settings button, and one content note: "A game about death and judgment. Nothing graphic. Some stories are sad." The menu (also opened with Esc during play) holds text size, sound, the Book of Verses, the Book of Souls, Return to title and Reset progress.
2. **Soul.** The whole loop happens here (§7.2).
3. **The World Below.** The Day's summary.
4. **Ending.** The ending text, the Temperament, counts of each verdict and Eye, a button to read the Book of Verses, and Begin a new reign.

### 7.2 Layout
One column, at most 720 px wide, usable down to 360 px. On narrow screens the three Eye cards stack.

```
+------------------------------------------------------------+
| Day 1  2/6          (lamp) ●●●●●○○○○○        ↻ ↻        ☰  |
+------------------------------------------------------------+
|                          ( wisp )                          |
|                      Dace Weller, 34                       |
|                  Hanged at the ferry dock.                 |
|  [PEOPLE SAY] Ferryman. In the flood he cut the rope,      |
|               and eleven people drowned.                   |
|          ( I would do it again. Ask me why. )              |
|   +-----------+     +-----------+     +-----------+        |
|   |  (hand)   |     |  (heart)  |     |  (waves)  |        |
|   |   Deed    |     |   Heart   |     |  Ripple   |        |
|   | what they |     |    why    |     |  what it  |        |
|   |    did    |     |           |     |  caused   |        |
|   +-----------+     +-----------+     +-----------+        |
+------------------------------------------------------------+
    [  ↑ RISE  ]        [ ↻ RETURN ]        [  ↓ FALL  ]
       reward             new life             punish
```

After a verdict (Fall shown), the same card continues:

```
|   (embers sink)  FALL  Let the river take him, like the eleven.     |
|   ... name, People say, Plea ...                                     |
|   [Deed: He was pulling...] [You missed: Heart] [You missed: Ripple] |
|   +- THE SCRIBE WRITES ---------------------------+                  |
|   |   "He let them drown. Now he falls."          |                  |
|   +-----------------------------------------------+                  |
|                 (+1) Lowmere approves.                               |
|                      [ Next soul ]                                   |
```

The World Below:

```
| THE WORLD BELOW                                             |
| After Day 1                                                 |
| (wheat) Hettie Marrow  [RISE]                               |
|         "Feed the hungry, and you will be rewarded."        |
|         → Rich people start giving bread in public. ...     |
| (one card per verdict, sliding in one after another)        |
| The Scribe: "Six Verses. People argue most about the second." |
|          [ Begin Day 2 ]     [ Rest here ]                  |
```

### 7.3 Controls

| Action | Mouse or touch | Keyboard |
|---|---|---|
| Open an Eye | Click or tap it | 1, 2, 3 |
| Rise, Return, Fall | Click or tap the button | ↑, →, ↓ |
| Continue | Click or tap Next | Enter or Space |
| Menu | Click or tap the menu icon | Esc |

## 8. Look and sound

### 8.1 Palette

| Use | Colour |
|---|---|
| Night sky | `#1B1F3B` |
| Dawn sky | `#4A3F6B` |
| Dusk sky | `#D98C5F` |
| Card (parchment) | `#F5ECD7` |
| Text (ink) | `#2A2433` |
| Rise and accents (lantern gold) | `#E0B15A` |
| Return (river teal) | `#2F6F6D` |
| Fall (ember) | `#A63D2A` |

Every text and background pair must be checked for AA contrast before release.

### 8.2 Shapes and type
- **Wisp.** One SVG flame shape, tinted by the soul's hue, with the soul's emblem icon inside and a slow bob.
- **Emblems.** Lucide icons (ISC licence, credited in the menu). A soul's emblem is the icon's name, such as `wheat` or `lock`. The allowed names live in `src/content/emblems.ts`, and only the icons listed there are bundled.
- **Sky.** A CSS gradient that shifts with each soul, from pre-dawn indigo at soul 1 to dusk gold at soul 6. The World Below is night.
- **Lamp.** A small lantern whose glow grows with Faith. Ten pips beneath it give the exact value, and screen readers hear "Faith 5 of 10".
- **Type.** One self-hosted serif under the SIL Open Font License, such as Cormorant Garamond or EB Garamond, for names and Verses. The system font for everything else. Body text is at least 18 px, and the player can step it up twice.

### 8.3 Motion
All motion is CSS and SVG, with no animation library.

| Moment | Motion | Length |
|---|---|---|
| A soul arrives | The wisp glows in from a blur; the name, People say and the speech bubble rise in one after another | 0.8 s |
| Eye cards | Glow gently until one is opened, and lift on hover | — |
| An Eye opens | The card flips over; the others dim and show a lock | 0.55 s |
| Verdict buttons | Pulse once when an Eye opens | 0.6 s |
| Rise | The wisp floats up and brightens; gold sparks drift up past a light beam | 1.3 s |
| Return | The wisp circles away and shrinks; three teal rings ripple out | 1.2 s |
| Fall | The wisp sinks and greys; embers sink; the card shakes slightly | 1 s |
| Verse | The scroll unrolls and the line types in | up to 0.9 s |
| Faith | The lamp flares (up) or flickers (down); "+1" or "−2" floats up | 1.3 s |
| You missed | The two remaining cards flip, 0.25 s apart | 0.8 s |
| The World Below | Cards slide in one by one; each result line fades in after its Verse | 0.55 s per card |
| Ending | The title glows in; the Verse cards, the badge (with a shine) and the counts follow | about 2.5 s |
| Background | Faint motes of light drift up behind every screen | 14–30 s each |

With the reduced-motion setting on, particles, card flips, the shake and the motes are switched off, the aftermath appears at once, and everything else becomes a short fade.

### 8.4 Sound (optional)
Synthesized in the browser with Web Audio, so there are no sound files. Each cue is a bell-like tone made of three sine partials with a fading tail:
- a soft tick when an Eye opens;
- a bright bell for Rise, a middle one for Return and a low one for Fall;
- a two-note chime at the end of a Day.

Sound is on by default, and the On/Off setting is remembered.

## 9. Technical design

### 9.1 Stack
- **Vite, TypeScript and Svelte 5** for the app. **Vitest** for tests.
- A static site with no backend and no network requests after load.
- Why: DOM text is sharp, accessible and easy to lay out. Svelte compiles to a small bundle. TypeScript catches content mistakes at build time.

### 9.2 Project layout

```
src/
  content/
    souls/          one file per soul (typed data)
    index.ts        every soul, and the fixed Day 1 order
    emblems.ts      allowed emblem ids (Lucide icon names)
    endings.ts      the five ending texts
    scribe.ts       Day 1 hints, reaction lines, Day-end remarks
    validate.ts     content checks and the random-reign simulation
  game/             plain TypeScript, no DOM
    types.ts        souls, verdicts, Eyes
    config.ts       numbers from §3, and the reign plan for each tier
    rng.ts          small seeded integer PRNG (mulberry32) and shuffle
    reign.ts        building Days, opening an Eye, giving a verdict, Echoes
    outcome.ts      endings, quoted Verses, Temperament
  lib/
    storage.ts      versioned localStorage
  ui/               Svelte components, the game store, sound
tests/              Vitest: logic, outcomes, storage, content, interface
scripts/
  vitest.mjs        runs Vitest with an upper-case drive letter on Windows
```

### 9.3 Soul data

```ts
type Eye = 'deed' | 'heart' | 'ripple';
type Verdict = 'rise' | 'return' | 'fall';
type FaithChange = -2 | -1 | 0 | 1 | 2;

interface Outcome {
  fate: string;       // shown after choosing
  verse: string;      // what the Scribe writes
  andSo: string;      // The World Below line
  faith: FaithChange;
}

interface Face {
  record: string;     // what the living believe
  plea: string;       // the soul's own words
}

interface SoulBase {
  id: string;
  name: string;
  age: number;
  death: string;
  emblem: EmblemId;   // a Lucide icon name listed in content/emblems.ts
  hue: number;        // 0–359, tints the wisp
  eyes: Record<Eye, string>;
  verdicts: Record<Verdict, Outcome>;
  heavy?: boolean;    // left out by the gentler-content setting
}

interface RootSoul extends SoulBase, Face {
  kind: 'root';
  echo?: { soul: string; on: Verdict[]; sameDay?: boolean };
}

interface EchoSoul extends SoulBase {
  kind: 'echo';
  origin: string;                                  // the root that summons it
  versions: Partial<Record<Verdict, Face>>;        // one per summoning verdict
}

type Soul = RootSoul | EchoSoul;
```

### 9.4 State and saving

```ts
interface ReignState {
  version: 1;
  seed: number;
  firstReign: boolean;         // fixed Day 1 and the Scribe's hints
  gentle: boolean;
  plan: 'prototype' | 'firstRelease' | 'full';
  roots: string[];             // this reign's roots, in arrival order
  day: number;                 // 1–5
  docket: string[];            // today's soul ids, in order
  index: number;               // the current soul in the docket
  phase: 'soul' | 'dayEnd' | 'ended';
  faith: number;               // 0–10
  returnsLeft: number;         // 0–2
  eye: Eye | null;             // the Eye opened for the current soul
  verdict: Verdict | null;     // set while the aftermath is showing
  history: { soul: string; day: number; eye: Eye; verdict: Verdict }[];
  waiting: { soul: string; summonedBy: Verdict; readyDay: number }[];
  summons: Record<string, Verdict>;  // which verdict summoned each Echo
}
```

- Three `localStorage` keys: `vv.save.v1` for the current reign, `vv.book.v1` for souls met and endings seen across reigns, and `vv.settings.v1` for text size and sound.
- The game saves after every action, including opening an Eye, so reloading cannot reveal a second Eye.
- If the stored version does not match, or the save names a soul that no longer exists, the game starts fresh. At this size there are no migrations.
- Reset clears the reign and the book after a confirmation. Settings stay.
- If the browser blocks storage, the game keeps working in memory.

### 9.5 Building a Day

```
startReign(seed, firstReign):
  plan  = the largest tier the root count can fill:
          5 roots → 1 Day [5]; 12 → 3 Days [5, 4, 3]; 20 → 5 Days [5, 4, 4, 4, 3]
  roots = firstReign ? day1Fixed + shuffle(otherRoots, seed)
                     : shuffle(allRoots, seed)
  keep only as many roots as the plan needs

startDay(d):
  todays  = the next rootsPerDay[d] roots
  places  = 6 - todays.length
  echoes  = the first `places` waiting Echoes whose readyDay <= d
  docket  = todays with the echoes spread evenly after roots,
            never first and never two Echoes in a row
  returnsLeft = 2

giveVerdict(soul, verdict):
  faith = clamp(faith + soul.verdicts[verdict].faith, 0, 10)
  if verdict is 'return': returnsLeft -= 1
  if soul.echo and verdict is in soul.echo.on:
    if soul.echo.sameDay and today's docket has a free place:
      insert the Echo at least three souls later, away from other Echoes
    else: add it to waiting with readyDay = day + 1
```

In a first reign, Day 1 follows §4 exactly, with the teaching Echo fifth. The same seed always gives the same order, on every browser, because the shuffle uses integer maths only.

### 9.6 Validator
`src/content/validate.ts`, run by `tests/content.test.ts`. `npm run validate` runs it on its own, and `npm run build` runs it first and stops on any error:
- Every soul has all fields, three Eyes and three verdicts.
- Every field is within its word limit (§5.1), and the words read before a verdict total at most 45.
- Ids are unique.
- Every `echo.soul` exists, points back with `origin`, and has a version for each summoning verdict.
- No Echo has an `echo` of its own.
- The Day 1 souls exist, and the first one summons its Echo on all three verdicts with `sameDay`.
- Every emblem is in the allowed list, and every hue and age is in range.
- No two fate lines or Verses of a soul are the same.

It warns, without failing, when a soul uses a known hard word, when the root count falls between tiers, or when leaving out heavy souls would shorten gentle reigns. It also plays 1,000 random reigns and warns if more than 1 Day in 10 has fewer than 5 souls.

### 9.7 Tests
Vitest covers the logic in `game/`:
- the Return limit;
- Faith clamping;
- Echoes summoned, not summoned, and arriving on the right Day;
- Day sizes and the no-back-to-back rule;
- each ending's condition;
- all 16 Temperament titles;
- a save round trip;
- the same seed giving the same order.

Interface smoke tests mount the real app in happy-dom and play it with clicks and keys: the first-soul onboarding, the plain verdict meanings, the staged aftermath (skipped with Enter), a whole reign, the teaching Echo, the Return limit, the Book of Souls and resuming after a reload.

On Windows, `npm test` goes through `scripts/vitest.mjs`, because a terminal opened as `d:\` instead of `D:\` makes Vitest load two copies of itself.

### 9.8 Hosting
`vite build` produces static files for GitHub Pages or an itch.io HTML5 upload. itch.io serves many games from one domain, so the storage keys keep their `vv.` prefix.

## 10. Optional features

### 10.1 If time allows in version 1.0
- **Book of Souls.** Done: a menu page listing souls met, with all three Eyes shown, and endings seen. It persists across reigns.
- **Share card.** Done as text: "Copy my result" on the ending screen copies the ending, Temperament, verdict counts and the most loved Verse. Saving an image is not built.
- **Sound.** Done (§8.4).
- **Gentler-content toggle.** Not needed for now: no soul is flagged heavy. The logic still supports it (`gentle` leaves out souls flagged `heavy`).

### 10.2 Later, only if the game earns it
- A second Eye once per Day.
- A "Reveal the truth" miracle: the living learn what you saw, so Faith does not fall.
- Linked pairs: two souls from the same event, one after the other.
- A date-seeded Soul of the Day.
- More soul packs, or a second country.
- Localization.
- Offline install.
- Anonymous "how others judged" percentages. This is the only item that needs a backend.

## 11. Glossary

| Term | Meaning |
|---|---|
| **Soul** | One person to judge. Shown as a wisp. |
| **Root** | A soul who arrives regardless of the player's verdicts. |
| **Echo** | A soul who arrives because of one of the player's Verses. |
| **Record** | What the living believe about a soul, shown as "People say". |
| **Plea** | One line in the soul's own voice. |
| **Eye** | A glimpse of hidden truth: Deed, Heart or Ripple. One per soul. |
| **Verdict** | Rise, Return or Fall. |
| **Fate** | The soul-specific line shown after a verdict, such as "Rest. You will never be hungry again." |
| **Verse** | The one-line rule the Scribe writes from a verdict. |
| **You missed** | The two unopened Eyes, flipped over after the verdict. |
| **Faith** | How much the living trust the god's judgment, 0 to 10. Shown as a lamp. |
| **Day** | Up to 6 souls, about 5 minutes. |
| **The World Below** | The end-of-Day list of Verses and what the living did with them. |
| **Reign** | 3 Days, then an ending. About 15 minutes. |
| **Temperament** | The two-part title shown at the ending. |
| **Book of Verses** | Every Verse written in the current reign. |
| **Book of Souls** | Optional page of souls met and endings seen across reigns. |
| **The Scribe** | The mortal who writes the Verses, and the game's only guiding voice. |
| **Lowmere** | The river country the god watches over. |
