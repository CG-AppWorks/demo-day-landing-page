// Shared HTTP helpers: CORS + JSON responses.
// Captions are public read; admin writes are gated by bearer token in index.js.

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export function json(data, init = {}) {
  const { headers, ...rest } = init;
  return new Response(JSON.stringify(data), {
    ...rest,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
      ...(headers || {}),
    },
  });
}
