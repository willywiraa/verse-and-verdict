> **Outdated.** This document describes the earlier prototype, *Verse & Verdict*, a game about judging souls. The current game, *Fit the Crime*, is described in the [README](../README.md).

# Verse & Verdict: Product Requirements

Version 0.2 · 14 November 2026 · Design details: [GDD.md](GDD.md)

## 1. What we are making

Verse & Verdict is a small, free browser game for short breaks. You play a young god who judges the souls of the dead.

For each soul you see what the living believe about them, open one of three Eyes to glimpse the truth, and choose Rise, Return or Fall. A Scribe writes your verdict down as a one-line Verse, and the living act on it. Some of them later arrive as souls themselves, because of what you said.

A Day takes about 5 minutes. A full reign of 3 Days takes about 15.

*Judge the dead. The living are taking notes.*

## 2. Goals and non-goals

**Goals**
1. A core loop that is fun in the first minute and needs no instructions.
2. Interesting decisions: partial truth, a scarce second chance, and a world that reacts.
3. Consequences the player can trace back to their own verdicts.
4. A game one person can finish: 20 handcrafted souls in roughly 12 weeks of part-time work.
5. A page that loads fast and plays comfortably in any modern browser.

**Non-goals**
- Steam, desktop or app-store builds.
- Monetization of any kind.
- Accounts, servers, analytics or anything else that needs a backend.
- Multiplayer or community features.
- Procedurally generated stories.
- A long campaign or layered progression.

## 3. Who it is for

- **People with five minutes.** A break at work or school, on a laptop or a phone.
- **People who like a dilemma.** Fans of Reigns, Papers, Please, trolley problems and short stories with a twist.

How they play: a link opens straight into the game, one sitting is one Day, and progress saves in the browser.

## 4. Experience principles

1. **One click, one thought.** Every step is a single clear choice.
2. **Short text, sharp twist.** At most 45 words to read before a verdict, in plain, everyday English. Pictures and motion carry the rest.
3. **Never graded.** The game shows what happened. It never says a verdict was right or wrong.
4. **Everything traces back.** Each consequence names the verdict that caused it.

## 5. Scope

| | Prototype | Version 1.0 |
|---|---|---|
| Days per reign | 1 | 3 |
| Souls written | 6 | 20 (12 roots, 8 Echoes) |
| Souls shown per reign | up to 6 | up to 18 |
| Endings | none | 5 |
| Look | plain | full visual pass with animation |
| Published | no, playtest link only | yes |

A root is a soul who arrives regardless of what you do. An Echo is a soul who arrives because of one of your Verses.

The plan once grew to 40 souls over 5 Days. After a playtest found the game too text-heavy, it was cut back to 20 souls, every line was rewritten in simpler English, and the screens gained cards, icons and animation (§13).

## 6. Functional requirements

Tier: **P** = prototype, **R** = version 1.0, **Opt** = only if time allows.

| ID | Requirement | Tier | Done when | GDD |
|---|---|---|---|---|
| FR-1 | Each soul card shows name, age, cause of death, the Record and the Plea. | P | All five are readable without scrolling at 1280×720. | §3.1 |
| FR-2 | The player opens exactly one of three Eyes: Deed, Heart or Ripple. Verdicts unlock once an Eye is open. | P | The other two Eyes cannot be opened before the verdict. | §3.2 |
| FR-3 | Three verdict buttons (Rise, Return, Fall), each with an icon and a plain meaning (reward, new life, punish). The soul's own fate line appears after the choice. | P | Every soul has three distinct fate lines. | §3.3 |
| FR-4 | Return can be used at most 2 times per Day. | P | After the second Return the button is disabled and says why. | §3.3 |
| FR-5 | After a verdict, the Scribe's Verse is shown and added to the reign's Book of Verses. | P | The Verse matches the soul and the verdict chosen. | §3.4 |
| FR-6 | After a verdict, the two unopened Eyes flip over ("You missed"). | P | Both appear before the player can move on. | §3.4 |
| FR-7 | A Faith lamp runs from 0 to 10, starts at 5, and moves by each verdict's authored change. | R | The value never leaves 0–10, and a reaction line names the change. | §3.5 |
| FR-8 | Some verdicts summon an Echo, which arrives later headed "Because of your Verse on [name]" and quoting that Verse. | P | The Day 1 teaching Echo arrives on Day 1 for all three verdicts. | §3.6 |
| FR-9 | Each Day is built from new souls plus waiting Echoes, up to 6 souls. | R | Days follow the counts in the GDD, and two Echoes never arrive back to back. | §3.7 |
| FR-10 | Day 1 of a first reign runs in a fixed order with one-line hints from the Scribe. | P | A first-time player reaches a verdict without any tutorial screen. | §4 |
| FR-11 | Each Day ends with The World Below: that Day's Verses, each with its "And so…" line. | P | Every verdict given that Day is listed once. | §3.7 |
| FR-12 | A reign lasts 3 Days and then ends. | R | The ending appears after the last Day's summary. | §3.8 |
| FR-13 | 5 endings, chosen by final Faith and the balance of verdicts, shown with the player's most loved and most hated Verses. | R | Each ending is reached in a test run. | §3.8 |
| FR-14 | The ending shows a Temperament title built from the player's most-used verdict and Eye. | R | The logic tests produce all 16 titles. | §3.8 |
| FR-15 | The game saves after every verdict and offers Continue and Reset. | R | Closing the tab mid-Day and reopening resumes at the next soul. | §9.4 |
| FR-16 | A new reign reshuffles the souls using a new seed. | R | Two reigns with different seeds show a different order. | §9.5 |
| FR-17 | Fully playable by mouse, touch or keyboard. | R | A whole Day can be played with the keyboard alone. | §7.3 |
| FR-18 | The layout works from 360 px to 1920 px wide. | R | No horizontal scrolling at 360 px. | §7.2 |
| FR-19 | A validator script checks every soul and fails the build on errors. | P | A soul with a missing Eye or an over-long field stops the build. | §9.6 |
| FR-20 | The title screen carries a one-line content note. | R | It is visible before play begins. | §7.1 |
| FR-21 | Book of Souls: a page listing souls met and endings seen across reigns. | Opt | It persists after a new reign begins. | §10.1 |
| FR-22 | Share card: copy the Temperament and a Verse as text, or save them as an image made in the browser. | Opt | It works with no network request. | §10.1 |
| FR-23 | Sound cues with a mute toggle. | Opt | The muted state is remembered. | §8.4 |
| FR-24 | A gentler-content toggle that leaves out souls flagged as heavy. | Opt | Every Day can still be filled with the toggle on. | §10.1 |
| FR-25 | After a verdict, the fate, the Verse, the Faith change and the missed Eyes appear in short beats (about 2.5 s). A tap, Enter or Space skips to the end. | R | With reduced motion everything appears at once. | §3.4 |
| FR-26 | Each verdict has its own visual effect, and Eye cards flip when opened. | R | Rise, Return and Fall look clearly different. | §8.3 |

## 7. Content requirements

- **Counts:** as in the scope tiers above.
- **Size:** each soul fits the template and word limits in GDD §5.1, with at most 45 words to read before a verdict.
- **Plain English:** short sentences and everyday words, readable by players still learning English.
- **Three defensible verdicts.** If one verdict is obviously correct, the soul is rewritten.
- **Mix across the 12 roots:**
  - 5 where what people say is roughly true;
  - 4 where the truth is kinder;
  - 2 where the truth is worse;
  - 1 where it is both.
- **Content standard:**
  - Implied, never shown.
  - Harms, not identities.
  - No real religions, symbols or people.
  - No suicide.
  - No sexual violence.

## 8. Quality requirements

| Area | Requirement |
|---|---|
| Speed | First load under 500 KB. Playable within 2 seconds on an ordinary laptop. |
| Offline | No network requests after the page has loaded. |
| Privacy | Nothing leaves the browser. No cookies, no analytics, no accounts. |
| Accessibility | Every action reachable by keyboard. AA colour contrast. Reduced-motion setting respected. Adjustable text size. Labels on all controls for screen readers. |
| Browsers | Current Chrome, Edge, Firefox and Safari, on desktop and phone. |
| Licences | Fonts and icons are open-licensed, with credits where the licence asks for them. |

## 9. How we will know it works

There are no analytics, so success is judged in playtests with about 10 people who have not seen the game.

1. A new player gives their first verdict within 90 seconds of the page loading, without being told how.
2. At least 8 of 10 finish Day 1.
3. At least 5 of 10 start Day 2 without being asked.
4. After Day 1, at least 7 of 10 can explain the rules in a sentence or two and name one consequence of their own verdict.
5. For at least half the souls, playtesters disagree on the verdict.

**Prototype gate (end of week 2):** checks 1, 3 and 4 with 3–5 people. If it fails, fix the loop before writing more souls.

## 10. Milestones and effort

| Weeks | Milestone | Gate |
|---|---|---|
| 1–2 | **Prototype.** Write the 6 souls of Day 1 and read them aloud to 3–5 people. Then build a rough playable Day. | The prototype gate in §9. |
| 3–6 | **First release.** 3 Days, 20 souls, the lamp, 3 endings, saving, the full visual pass. Publish on GitHub Pages or itch.io. | All five checks in §9. |
| 7–12 | **Version 1.0.** 3 Days, 20 souls, 5 endings, animation and polish, and optional items as time allows. | The checks again, and no Day feels thin. |

| Work | Hours |
|---|---|
| Writing and editing 20 souls | 30–40 |
| Code | 40–60 |
| Look and sound | 15–25 |
| Playtests and fixes | 15–20 |
| **Total** | **130–185** |

At 10–15 hours a week that is somewhere between 9 and 18 weeks. The plan targets 12. Writing is the long pole: about 1.5–2 hours per soul.

## 11. Risks

| Risk | What we do about it |
|---|---|
| Writing good souls takes longer than planned. | Every soul is an independent addition, and a 1-Day prototype needs only 6. |
| The "You missed" reveal feels like a trick ("I couldn’t have known"). | Nothing is graded, every Eye stands alone, and the Scribe never scolds. Check 4 in §9 tests this. |
| Players treat the Faith lamp as a score and always please the living. | The high-Faith ending has its own sting, and no ending is called good. If playtests still show it, hide the number and keep only the glow. |
| Too few Echoes are waiting, so Days run short. | Most roots summon an Echo on two of three verdicts. The validator plays random reigns and warns when Days come up short. |
| Scope creeps back. | Anything not in §6 goes to GDD §10.2 and waits until version 1.0 is out. |

## 12. Out of scope

Steam and desktop builds, monetization, accounts, analytics, multiplayer, and procedural generation are out. Ideas worth revisiting after version 1.0 are listed in GDD §10.2.

## 13. Status (14 November 2026)

- **Built:** FR-1 to FR-20, FR-25 and FR-26.
  - 20 souls: 12 roots and 8 Echoes, rewritten in short, plain English. A player reads 35 to 42 words before each verdict, down from up to about 110.
  - Three-Day reigns with all 5 endings.
  - Eye cards that flip, icon verdict buttons, an effect for each verdict, and a staged aftermath that can be skipped.
  - The World Below and the ending reveal their cards one by one.
  - Saving and resuming, keyboard and touch controls, reduced-motion support.
  - The validator, run before every build, which also warns about hard words.
- **Optional extras built:**
  - FR-21, the Book of Souls.
  - FR-22, the share card, as copied text only; saving an image is not built.
  - FR-23, sound, synthesized in the browser so no audio files are needed.
- **Not built:** FR-24, the gentler-content toggle. No soul is flagged heavy, so it isn't needed yet.
- **Size:** about 46 KB of gzipped JavaScript, 6 KB of CSS and 70 KB of fonts, well under the 500 KB budget.
- **Still to do:** the playtests in §9, now with the simpler version.
