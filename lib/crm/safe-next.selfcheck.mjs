/**
 * `safeAppNext` — the validator that decides where a signed-in user is sent.
 *
 *   Run:  node lib/crm/safe-next.selfcheck.mjs
 *
 * §102 — THIS FILE USED TO TEST A COPY.
 *
 * It defined its own `safeAppNext` at the top rather than importing the shipped
 * one, and the copy had drifted to be STRICTER: it allowed only `/app`, while
 * `lib/crm/safe-next.ts` allows nine prefixes (`app`, `demo`, `products`,
 * `(products)`, `dashboard`, `pipeline`, `leads`, `cpq`, and `/`).
 *
 * Proved, not argued. In a sandbox, with this file alone and no `safe-next.ts`
 * at all, the gate passed. Replacing `safeAppNext` with one that returns
 * `https://evil.example/` also passed. A wired gate in `test:unit` that stays
 * green when the function it claims to protect is deleted is a false witness,
 * and eight of the nine prefixes the real function allows were untested.
 *
 * This is §96's `escapeHtml` defect in a security-critical function: the code
 * under test was duplicated, the duplicate diverged, and the tests kept passing
 * against the wrong one.
 *
 * The fix is to test the REAL function. Its extra allowances are now asserted
 * explicitly, because "the shipped function is exercised" is only half the
 * property — the allowed prefixes have to be pinned too, or relaxing one later
 * would change behaviour with nothing watching.
 */
import assert from "node:assert/strict";
import { safeAppNext } from "./safe-next.ts";

/* The default every rejected value falls back to. */
const FALLBACK = "/app/dashboard";

/* -- 1. Same-origin paths inside the CRM are preserved ---------------------- */
assert.equal(safeAppNext("/app/dashboard"), "/app/dashboard");
assert.equal(safeAppNext("/app/leads/ld-1"), "/app/leads/ld-1");

/* -- 2. Prefix confusion: "/application" must NOT pass "/app" -------------- */
assert.equal(safeAppNext("/application"), FALLBACK);

/* -- 3. The off-site shapes a redirect abuse actually takes ----------------- */
assert.equal(safeAppNext("//evil.com"), FALLBACK);
assert.equal(safeAppNext("https://evil.com"), FALLBACK);
assert.equal(safeAppNext("http://evil.com/"), FALLBACK);
assert.equal(safeAppNext("/\\evil.com"), FALLBACK);
assert.equal(safeAppNext("javascript:alert(1)"), FALLBACK);

/* -- 4. Traversal, raw and encoded ------------------------------------------ */
assert.equal(safeAppNext("/app/../../evil"), FALLBACK);
assert.equal(safeAppNext("/app/%2e%2e/x"), FALLBACK);
assert.equal(safeAppNext("/app/..%2f..%2fevil"), FALLBACK);

/* -- 5. Empty / absent ------------------------------------------------------ */
assert.equal(safeAppNext(undefined), FALLBACK);
assert.equal(safeAppNext(null), FALLBACK);
assert.equal(safeAppNext(""), FALLBACK);

/* -- 6. Paths outside the allowlist are refused ----------------------------- */
assert.equal(safeAppNext("/login"), FALLBACK);
assert.equal(safeAppNext("/etc/passwd"), FALLBACK);

/* -- 7. The prefixes the SHIPPED function allows and this file previously did
 *      not test at all. Each must survive, or the gate would fail on a change
 *      that is legitimate rather than a regression. ---------------------------- */
for (const p of ["/app", "/demo", "/products", "/(products)", "/dashboard", "/pipeline", "/leads", "/cpq", "/"]) {
  assert.equal(safeAppNext(p), p, `prefix ${p} should be allowed`);
}
assert.equal(safeAppNext("/app/leads/ld-1?tab=x"), "/app/leads/ld-1?tab=x");

/* §102 — a query string directly on a bare prefix falls back, because the
 * shipped regex ends each prefix with `(\/|$)` and a `?` satisfies neither.
 *
 * This was written the other way round first, on the assumption that `/demo?x=1`
 * should survive. It does not, and that is SAFE rather than broken: the only
 * producers of `next` are `proxy.ts` (`searchParams.set("next", pathname)` — a
 * pathname, never a query) and the two login actions, whose own default is a
 * bare path. So nothing depends on it. Asserting what the function does rather
 * than what I assumed it ought to is the point.
 *
 * NOTE the same regex is why `/crm-sales` — a REAL route in this app, since
 * `app/(products)/crm-sales` serves `/crm-sales` — falls back, while the list
 * contains `(products)`, a route-group segment that can never appear in a URL.
 * That allowlist is stale against the current route structure. Reported, not
 * changed: guessing the intended policy is not this audit's call. */
assert.equal(safeAppNext("/demo?x=1"), FALLBACK);
assert.equal(safeAppNext("/crm-sales"), FALLBACK);
assert.equal(safeAppNext("/crm-sales/pipeline"), FALLBACK);

/* -- 8. ANTI-VACUITY: the assertions above must be able to fail.
 *
 * A list of `assert.equal` calls proves nothing on its own — if the validator
 * returned the fallback for everything, cases 1 and 7 would still pass while
 * every real path stopped working. So the fixture is checked in both directions:
 * an always-fallback stand-in must NOT satisfy this file. ---------------------------- */
function alwaysFallback() {
  return FALLBACK;
}
const assertSuite = (fn) => {
  // Same expectations, run against the broken stand-in.
  try {
    assert.equal(fn("/app/dashboard"), "/app/dashboard");
    assert.equal(fn("/demo"), "/demo");
    return "PASSED";
  } catch {
    return "FAILED";
  }
};
const brokenResult = assertSuite(alwaysFallback);
assert.equal(
  brokenResult,
  "FAILED",
  "anti-vacuity: a validator that always returns the fallback must NOT satisfy these assertions",
);

console.log("safe-next.selfcheck: PASS (tests the SHIPPED safeAppNext, not a copy)");