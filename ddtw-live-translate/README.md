# ddtw-live-translate

Real-time EN ↔ zh-TW (Taiwan usage) caption system for AppWorks #32 + Wistron #10
Demo Day — a glossary-controlled alternative to the Wordly plugin on
[ddtw.appworks.tw](https://ddtw.appworks.tw).

Full design in [`../demoday-live-translation-spec.md`](../demoday-live-translation-spec.md).
One broadcaster laptop runs STT → text-LLM translation pipelines (OpenAI and/or
Gemini); a Cloudflare Worker fans the resulting caption segments out to ~400
guest phones over SSE (with a polling fallback).

## Build status

| Step | Scope | Status |
|---|---|---|
| **1** | Worker + Durable Object + KV: segment ingest, SSE, polling, switch | ✅ built (this commit) |
| 2 | Viewer embed on staging + SSE load test | ⬜ |
| 3 | `/api/translate` with glossary prompt | ⬜ |
| 4 | Broadcaster page + OpenAI STT pipeline | ⬜ |
| 5 | Gemini pipeline + `/compare` + switch UI | ⬜ |
| 6 | Rehearsal with recorded + live audio | ⬜ |

## Layout

```
ddtw-live-translate/
  worker/            Cloudflare Worker + CaptionHub Durable Object
    src/
      index.js         router, CORS, admin-token gate
      caption-hub.js   Durable Object: state, SSE fan-out, polling, switch
      http.js          shared CORS/JSON helpers
    wrangler.toml
    package.json
    .dev.vars.example  copy to .dev.vars for local dev
  test/              curl smoke tests for step 1
  public/            broadcast.html / compare.html / viewer embed   (later steps)
  glossary.js        proper-noun glossary                           (later steps)
```

## API (step 1)

| Route | Auth | Purpose |
|---|---|---|
| `POST /api/segment` | bearer `ADMIN_TOKEN` | `{channel, seq, en, zh, ts?, final?}` — store + broadcast. Re-posting the same `seq` replaces the segment (interim → final). |
| `GET /api/stream?channel=openai\|gemini\|active` | none | SSE. Events: `hello`, `backlog`, `segment`, `switch`, plus `: ping` heartbeats every 20s. `active` follows the switch. |
| `GET /api/latest?channel=...&since=seq` | none | Polling fallback. Returns `{channel, active, segments}`. |
| `POST /api/switch` | bearer `ADMIN_TOKEN` | `{active:"openai"\|"gemini"}` — flips what `active` subscribers see; emits a `switch` event. |
| `POST /api/translate`, `POST /api/ephemeral/*` | bearer | `501` until later steps. |

`channel` is `openai` or `gemini`. `active` is a virtual stream channel that
relays whichever engine the switch currently points at.

## Run locally

Requires Node ≥ 18 (for `wrangler`).

```bash
cd worker
cp .dev.vars.example .dev.vars     # sets ADMIN_TOKEN=dev-secret-change-me
npm install
npm run dev                        # serves on http://localhost:8787
```

In a second terminal:

```bash
cd test
./stream-listen.sh active          # optional: watch SSE live
./post-fake-segments.sh            # posts fake segments, flips switch, reads back
```

Expected: the listener prints `hello`/`backlog`, then `segment` events; the
`seq 1` openai caption updates from interim to final; after the switch, `active`
emits a `switch` event and starts relaying the gemini channel. The poster's
final line confirms a missing token returns `status=401`.

## Deploy (Cloudflare)

```bash
cd worker
npx wrangler kv namespace create captions_kv   # paste the id into wrangler.toml
npx wrangler secret put ADMIN_TOKEN
npx wrangler deploy
```

Then smoke-test against the live URL:

```bash
BASE=https://ddtw-captions.<account>.workers.dev ADMIN_TOKEN=<token> ./test/post-fake-segments.sh
```

## Event-day runbook (to be expanded in later steps)

- Broadcaster laptop on wired Ethernet (phone hotspot as backup); **line-level
  feed from the FOH mixer** into a USB audio interface — not a room mic.
- Pre-event: load final glossary, start both engines 15 min early, verify on
  `/compare`, confirm the active channel.
- During: watch the level meter + reconnect lights; flip engines if quality
  degrades. **Wordly stays running in parallel** as the final fallback (its
  plugin remains one click away on the landing page).
- Cost: ~STT $2–4 + translation $1–3 per engine over 2h; budget < US$20 total.
