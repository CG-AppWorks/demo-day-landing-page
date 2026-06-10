#!/usr/bin/env bash
# Watch the SSE caption stream. Usage: ./stream-listen.sh [openai|gemini|active]
# Run this in its own terminal, then run ./post-fake-segments.sh to see events.
BASE="${BASE:-http://localhost:8787}"
CH="${1:-active}"
echo "Listening: ${BASE}/api/stream?channel=${CH}   (Ctrl-C to stop)"
curl -N -sS "${BASE}/api/stream?channel=${CH}"
