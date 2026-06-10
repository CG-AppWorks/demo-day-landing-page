// ddtw-captions — Worker entry / router.
//
// Step 1 scope (build-order §4.1): segment ingest, SSE fan-out, polling
// fallback, channel switch. All stateful routes forward to the single
// CaptionHub Durable Object instance ("event").
//
// Later steps add: POST /api/translate, POST /api/ephemeral/openai,
// POST /api/ephemeral/gemini (return 501 for now so the contract is visible).

import { CaptionHub } from "./caption-hub.js";
import { CORS_HEADERS, json } from "./http.js";

export { CaptionHub };

// Routes the broadcaster posts to — require the admin bearer token.
const ADMIN_ROUTES = new Set([
  "/api/segment",
  "/api/switch",
  "/api/translate",
  "/api/ephemeral/openai",
  "/api/ephemeral/gemini",
]);

// Stateful routes handled by the Durable Object.
const DO_ROUTES = new Set([
  "/api/segment",
  "/api/stream",
  "/api/latest",
  "/api/switch",
]);

// Implemented in later build steps.
const NOT_YET = new Set([
  "/api/translate",
  "/api/ephemeral/openai",
  "/api/ephemeral/gemini",
]);

function isAdmin(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  // Constant-ish comparison; tokens are short and this isn't a timing-critical surface.
  return Boolean(env.ADMIN_TOKEN) && token === env.ADMIN_TOKEN;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (pathname === "/" || pathname === "/health") {
      return json({
        ok: true,
        service: "ddtw-captions",
        step: 1,
        channels: ["openai", "gemini"],
        routes: ["/api/segment", "/api/stream", "/api/latest", "/api/switch"],
      });
    }

    if (ADMIN_ROUTES.has(pathname) && !isAdmin(request, env)) {
      return json({ error: "unauthorized" }, { status: 401 });
    }

    if (NOT_YET.has(pathname)) {
      return json({ error: "not_implemented", note: "added in a later build step" }, { status: 501 });
    }

    if (DO_ROUTES.has(pathname)) {
      const id = env.CAPTION_HUB.idFromName("event");
      const stub = env.CAPTION_HUB.get(id);
      return stub.fetch(request);
    }

    return json({ error: "not_found" }, { status: 404 });
  },
};
