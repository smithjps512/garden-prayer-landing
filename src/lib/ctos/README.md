# CTOS — prototype notes

A working prototype of the Encyclopedia and Quiz half of the app designed by
**team CTOS**. It lives at `/ctos` inside the Garden Prayer site.

The app does not have a name yet — that field in the product plan is blank — so
everything currently says CTOS. Pick a name and it can be renamed everywhere in
about five minutes.

## What each user story turned into

| User story | Where it lives | Notes |
| --- | --- | --- |
| Gamified or Traditional quizzing | `app/ctos/quiz/[id]/page.tsx` | Both modes, plus the results screen |
| The grading scale | `lib/ctos/grading.ts` | All seven bands, your labels |
| The builder layout | `app/ctos/quiz/new/page.tsx` | `+`, `−`, `→` on the left, exactly as written |
| Public / private | `lib/ctos/store.ts` | Public quizzes are listed; private ones need their link |
| *(from the plan)* Encyclopedia | `app/ctos/topics/[slug]/page.tsx` | Five topics with sources |
| Adding a video | — | **Not built.** See below. |

## Why the video feature is not here

Video was the other user story, and it is the one feature that turns a weekend
prototype into a months-long project: storing files, converting them into
formats every phone can play, paying to deliver them, and reviewing what people
upload before other people see it. None of that would teach you anything about
*your* idea — it is the same plumbing every video app has.

The quiz was the better first build because your own spec for it was so much
more detailed. That is not a consolation prize; it is a lesson about what
specifying something well earns you.

## Two places we had to guess

Both are worth deciding as a team:

1. **Does speed count in Gamified mode?** Your story says "like Blooket, Gimkit,
   or Kahoot" — but Kahoot rewards answering fast and Blooket mostly does not.
   We went with rewarding speed: 100 points for a correct answer, up to 100 more
   for answering quickly, and 25 more for each answer in a streak. Change it in
   `scoreAnswer()` in `store.ts`.
2. **The third column of your grading table.** The first row reads "Impressive —
   Doesn't need to" and then runs off the page. We read it as "doesn't need to
   study". If that is wrong, `grading.ts` is the one place to fix it.

## What we kept exactly as you wrote it

- The seven grade bands, their ranges, and their labels — Awesome, Impressive,
  Great, Decent, Moderate, Substandard, Terrible.
- The builder's tools: `+` adds a question, `−` deletes the selected ones, `→`
  finalizes. Including the cap: you can select at most five at a time, or use
  "Select all" to clear the lot.
- Traditional means all questions at once with no clock. Gamified means one at a
  time against a timer.

## How the data works

Quizzes, scores and your name live in this browser's `localStorage`, and every
read and write goes through `store.ts`. That means the prototype runs with no
database and no setup — and also that a quiz you build only exists on the device
you built it on. A private quiz's link works on your own device; it is not
really hidden from anyone else, because there is no server to check. A real
version moves `store.ts` behind a backend and that changes.

**There is no sign-in.** That is on purpose: no CTOS user story covers accounts,
so the app does not pretend to have them. It just asks for a name.

## Changing things

- **Different topics** — edit `topics.ts`. Keep the shape and the rest keeps
  working. Real photos and videos would go here too.
- **Different scoring** — `scoreAnswer()` and `QUESTION_SECONDS` in `store.ts`.
- **Different grading** — `BANDS` in `grading.ts`.

## Running it

```bash
npm install
npm run dev     # then open http://localhost:3000/ctos
```
