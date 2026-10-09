/**
 * Rate limiter regression selfcheck.
 *
 * Guards the public lead-capture abuse control added in
 * `lib/security/rate-limit.ts`.
 *
 * Run: node lib/security/rate-limit.selfcheck.mjs
 */

import assert from "node:assert/strict";
import { rateLimit, clientKeyFromHeaders } from "./rate-limit.ts";

// --- Allows up to the limit, then blocks -----------------------------------
const LIMIT = 5;
for (let i = 1; i <= LIMIT; i++) {
  const r = rateLimit("unit-test-key", LIMIT, 60_000);
  assert.equal(r.ok, true, `request ${i} of ${LIMIT} should be allowed`);
}
const blocked = rateLimit("unit-test-key", LIMIT, 60_000);
assert.equal(blocked.ok, false, "request past the limit must be blocked");
assert.equal(blocked.remaining, 0, "blocked response should report 0 remaining");
assert.ok(blocked.retryAfterSeconds > 0, "blocked response must include retryAfterSeconds");

// --- Keys are isolated from one another -------------------------------------
const other = rateLimit("unit-test-key-different", LIMIT, 60_000);
assert.equal(other.ok, true, "a different client must have its own bucket");

// --- Window expiry resets the bucket ----------------------------------------
const shortWindow = rateLimit("expiry-test-key", 2, 50);
assert.equal(shortWindow.ok, true);
assert.equal(rateLimit("expiry-test-key", 2, 50).ok, true);
assert.equal(rateLimit("expiry-test-key", 2, 50).ok, false, "third call should block");
await new Promise((r) => setTimeout(r, 80));
assert.equal(
  rateLimit("expiry-test-key", 2, 50).ok,
  true,
  "bucket must reset after the window elapses"
);

// --- Client key derivation ---------------------------------------------------
assert.equal(
  clientKeyFromHeaders(new Headers({ "x-forwarded-for": "203.0.113.7, 70.41.3.18" })),
  "203.0.113.7",
  "must use the first forwarded address"
);
assert.equal(
  clientKeyFromHeaders(new Headers({ "x-real-ip": "198.51.100.4" })),
  "198.51.100.4",
  "must fall back to x-real-ip"
);
assert.equal(
  clientKeyFromHeaders(new Headers()),
  "anonymous",
  "must degrade to anonymous when no headers are present"
);

console.log("rate-limit.selfcheck: PASS");