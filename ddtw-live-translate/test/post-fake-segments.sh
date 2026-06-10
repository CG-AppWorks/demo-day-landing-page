#!/usr/bin/env bash
# Step-1 smoke test: post fake caption segments, flip the switch, read back.
#
#   Terminal A:  cd ../worker && cp .dev.vars.example .dev.vars && npm install && npm run dev
#   Terminal B:  ./post-fake-segments.sh
#   (optional)   ./stream-listen.sh active     # watch SSE while this runs
#
# Override host/token via env:  BASE=https://ddtw-captions.<acct>.workers.dev ADMIN_TOKEN=... ./post-fake-segments.sh
set -euo pipefail

BASE="${BASE:-http://localhost:8787}"
TOKEN="${ADMIN_TOKEN:-dev-secret-change-me}"
AUTH=(-H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json")

post_seg() { # channel seq en zh final
  curl -fsS "${BASE}/api/segment" "${AUTH[@]}" \
    -d "{\"channel\":\"$1\",\"seq\":$2,\"en\":\"$3\",\"zh\":\"$4\",\"final\":$5}"
  echo
}

echo "== health =="
curl -fsS "${BASE}/health"; echo

echo "== openai: interim then final on seq 1 (final replaces interim) =="
post_seg openai 1 "At AppWorks we"               "在 AppWorks 我們"           false
post_seg openai 1 "At AppWorks we back founders." "在 AppWorks，我們支持創辦人。" true
post_seg openai 2 "Demo Day has 14 teams."        "Demo Day 有 14 組團隊。"      true

echo "== gemini channel =="
post_seg gemini 1 "Welcome to Demo Day."          "歡迎來到 Demo Day。"         true

echo "== latest openai =="
curl -fsS "${BASE}/api/latest?channel=openai"; echo
echo "== latest active (should resolve to openai) =="
curl -fsS "${BASE}/api/latest?channel=active"; echo

echo "== switch active -> gemini =="
curl -fsS "${BASE}/api/switch" "${AUTH[@]}" -d '{"active":"gemini"}'; echo
echo "== latest active (now gemini) =="
curl -fsS "${BASE}/api/latest?channel=active"; echo

echo "== latest openai since=1 (should return only seq 2) =="
curl -fsS "${BASE}/api/latest?channel=openai&since=1"; echo

echo "== auth check: missing token should 401 =="
curl -s -o /dev/null -w "  status=%{http_code}\n" "${BASE}/api/segment" \
  -H "Content-Type: application/json" -d '{"channel":"openai","seq":99,"en":"x","zh":"x"}'

echo "Done."
