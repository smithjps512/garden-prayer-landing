# BMS Club Night

Standalone landing pages + signup form for Blacksburg Middle School Club Night (TSA and FFA).
Deployed as its own Vercel project (`bms-club-night`, root directory `clubnight/`). It shares
nothing with the Garden Prayer site except this repository.

## Pages

| Path        | What                                                          |
|-------------|---------------------------------------------------------------|
| `/`         | Chooser: TSA or FFA                                           |
| `/tsa`      | TSA Leadership Team page + signup form (poster QR code)       |
| `/ffa`      | FFA page + signup form (poster QR code)                       |
| `/admin?key=ADMIN_KEY` | View all signups, download CSV, send digest now    |

## How signups flow

1. Form posts to `/api/signup`, which validates and inserts into Supabase (`public.clubnight_signups`).
   The site only holds the anon key; row-level security allows INSERT only.
2. A Vercel cron hits `/api/digest` every morning (12:00 UTC = 8 a.m. Eastern). Once today is after
   `CLUB_NIGHT_DATE`, every signup not yet emailed is sent to that club's advisor as an HTML table + CSV,
   and marked `digest_sent_at`. New signups after that go out in a daily follow-up.
3. After `SITE_CLOSES_AT` (defaults to club night + 14 days) the form is closed and the pages show a notice.

Reads happen only through `clubnight_list_signups(key)` / `clubnight_mark_sent(key, ids)`, security-definer
functions that check the key stored in `public.clubnight_config`.

## Environment variables

See `.env.example`. Set in the Vercel project (Production + Preview).

## Take-down

Delete the Vercel project, then in Supabase:

```sql
drop function if exists public.clubnight_list_signups(text, boolean);
drop function if exists public.clubnight_mark_sent(text, uuid[]);
drop table if exists public.clubnight_signups;
drop table if exists public.clubnight_config;
```
