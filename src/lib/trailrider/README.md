# TrailRider — prototype notes

A working prototype of the TrailRider app designed by **chicken.nugg** (Drew,
Lincoln and team). It lives at `/trailrider` inside the Garden Prayer site.

## What each user story turned into

| User story | Where it lives | Notes |
| --- | --- | --- |
| Log in / sign up (Lincoln) | `app/trailrider/login/page.tsx` | Sign up, log in, log out |
| Map of trails near you | `app/trailrider/map/page.tsx`, `components/trailrider/TrailMap.tsx` | Location, difficulty filter, length shown beside each trail name |
| Trail difficulty, reviews, what it improves | `app/trailrider/trails/[slug]/page.tsx` | Second scenario of the map story |
| Selling a bike | `app/trailrider/store/new/page.tsx` | Photo is required, exactly as the story says |
| Buying gear | `app/trailrider/store/[id]/page.tsx` | Message the seller, meet up, pay in person |
| Health & training AI (Drew) | `app/trailrider/coach/page.tsx`, `app/api/trailrider/coach/route.ts` | 5 questions, then locked for 48 hours |
| *(no story yet)* Messaging | `app/trailrider/messages/page.tsx` | Both the buy and sell stories depend on it, so it had to exist |

## What is deliberately not built

These are in the product plan but nobody wrote a user story for them, so they
are not in the prototype: the **events page**, the **music suggestion AI**, and
**posting your own trail review**. Write the story first, then build it — that
is the whole point of the exercise.

## How the data works

Everything is stored in the browser's `localStorage` and read and written
through **one file**, `store.ts`. Nothing is on a server, so:

- The app runs with no database, no accounts to set up and no API keys.
- Your listings and messages only exist in *your* browser. A friend opening the
  same link sees the sample data, not yours.
- Clearing your browser data resets the app.

Two accounts in the same browser *can* message each other. To see both sides of
a conversation: sign up, post a listing, log out, sign up a second account,
message that listing, then log back in as the first account.

## Things that are fine in a prototype and not fine in a real app

Worth understanding, because this is the difference between a demo and a
product:

1. **Passwords are stored in plain text.** Real sign-in sends the password to a
   server that stores only a hash it cannot reverse.
2. **The 5-question limit is enforced in the browser.** Anyone could clear their
   storage and get five more. Real limits are counted on the server against the
   account.
3. **Anyone could edit their own data.** There is no server checking that the
   person selling a bike is who they say they are.

The fix for all three is the same: move `store.ts` behind a real backend.

## Changing things

- **Different trails** — edit `seed.ts`. Keep the shape; everything else keeps
  working.
- **A real AI coach** — edit `app/api/trailrider/coach/route.ts` only. Keep the
  request (`{ question }`) and response (`{ answer }`) the same and the front
  end needs no changes.
- **Different question limit** — `QUESTION_LIMIT` and `WINDOW_MS` in `store.ts`.

## Running it

```bash
npm install
npm run dev     # then open http://localhost:3000/trailrider
```

The map needs an internet connection for its background tiles (OpenStreetMap,
free, no key needed). Without one the pins still work, the background is just
blank.
