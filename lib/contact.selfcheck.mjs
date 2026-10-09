#!/usr/bin/env node
/**
 * Contact-form validation + honeypot ordering selfcheck.
 *
 * ── Why this file was rewritten (SYSTEM_AUDIT.md §31) ────────────────────────
 *
 * The previous version re-declared `contactSchema` and `isHoneypotTripped`
 * inline. Every assertion below passed against a frozen duplicate, so the gate
 * could not fail for ANY edit to lib/contact.ts. Reverting the honeypot to
 * `z.string().max(0)` — the exact P0 regression it was written to catch — left
 * it green. That is the seventh instance of one failure shape across this
 * codebase: a check that quietly stops checking.
 *
 * It also never asserted the thing in its own header comment. "The honeypot
 * must be evaluated BEFORE safeParse" is a property of the CALL ORDER in
 * app/actions/contact.ts, and nothing tested it.
 *
 * Now: imports the real schema, and asserts the ordering structurally against
 * the real action file.
 *
 * Run directly:
 *   node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON lib/contact.selfcheck.mjs
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { contactSchema, isHoneypotTripped } from "./contact-schema.ts";
/* §96 — the REAL escaper, from the module that now holds the only copy. It cannot
 * be imported from `./contact.ts`: that module imports through the Next.js `@/`
 * alias, which plain `node` cannot resolve, and that resolution failure is very
 * likely why `scripts/contact-selfcheck.mjs` existed with its own private copy. */
import { escapeHtml } from "./html-escape.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const checks = [];
function it(name, fn) {
  try {
    fn();
    checks.push({ name, ok: true });
  } catch (err) {
    checks.push({ name, ok: false, err: err.message });
  }
}

const valid = {
  name: "Maria Santos",
  email: "maria@example.ph",
  company: "Santos Logistics",
  message: "We need automated PTP tracking for a 40-seat collections floor.",
};

/* -------------------------------------------------------------------------- */
/* escapeHtml — §96                                                           */
/* -------------------------------------------------------------------------- */
/*
 * §96. `scripts/contact-selfcheck.mjs` tested an `escapeHtml` it DEFINED ITSELF
 * and imported nothing from the application, so it could not fail for any edit to
 * `lib/contact.ts`. That is the failure shape this file's own header names for
 * §31 — "the gate could not fail for ANY edit to lib/contact.ts" — reproduced on
 * the one function where a silent false negative is an injection.
 *
 * `escapeHtml` is called in TEN places in `buildInquiryEmail`, interpolating
 * visitor-supplied name, email, company, interest, company size, industry,
 * current system, primary challenge, preferred method and message into an HTML
 * email body. Nothing tested the real one. These import it.
 *
 * The escaping itself is correct for where it is used: all ten call sites are
 * ELEMENT CONTENT, never an attribute value, so `& < >` is the security-relevant
 * set and `"`/`'` are belt-and-braces. That is asserted structurally below rather
 * than assumed — if a future edit moves an interpolation into an attribute, the
 * structural assertion is what notices.
 */

it("escapes the angle brackets that open a tag", () => {
  assert.equal(escapeHtml("<img src=x onerror=alert(1)>"), "&lt;img src=x onerror=alert(1)&gt;");
});
it("escapes & so an entity cannot be forged", () => {
  assert.equal(escapeHtml("A & B"), "A &amp; B");
  assert.equal(escapeHtml("&lt;script&gt;"), "&amp;lt;script&amp;gt;");
});
it("escapes both quote characters", () => {
  assert.equal(escapeHtml(`"C"`), "&quot;C&quot;");
  assert.equal(escapeHtml(`'C'`), "&#39;C&#39;");
});
it("leaves ordinary text alone", () => {
  assert.equal(escapeHtml("Maria Santos"), "Maria Santos");
});

/* `buildInquiryEmail` cannot be executed here — see the import note above — so
 * the template is checked STRUCTURALLY, and the scope is tight enough to have
 * real separation: only the region after `const html =` is examined. Everything
 * before it is `subject` and `text`, which are plain text and must NOT be
 * escaped. §89 measured that an unscoped version of this rule cannot tell those
 * two classes apart; scoping it to the html block is what makes it usable. */
it("every ${data.x} inside the html block is wrapped in escapeHtml()", () => {
  const src = read("lib/contact.ts");
  const start = src.indexOf("const html = `");
  assert.ok(start > -1, "could not locate the html template in lib/contact.ts");
  const block = src.slice(start);
  const interps = [...block.matchAll(/\$\{([\s\S]*?)\}/g)].map((m) => m[1]);
  assert.ok(interps.length > 0, "no interpolations found — the rule would be vacuous");
  const unescaped = interps.filter((e) => !/^\s*escapeHtml\(/.test(e));
  assert.deepEqual(unescaped, [], `unescaped interpolation(s) in the html block: ${unescaped.join(" | ")}`);
});

it("lib/contact.ts imports the shared escaper rather than defining its own", () => {
  const src = read("lib/contact.ts");
  assert.ok(/from\s+["'][^"']*html-escape(\.ts)?["']/.test(src), "contact.ts does not import the shared escaper");
  assert.ok(
    !/function\s+escapeHtml\b[\s\S]{0,400}?\.replaceAll\(/.test(src),
    "contact.ts still contains its own escapeHtml implementation",
  );
});

/* -------------------------------------------------------------------------- */
/* Honeypot detection                                                         */
/* -------------------------------------------------------------------------- */

it("filled honeypot is detected", () => {
  assert.equal(isHoneypotTripped("http://spam.example"), true);
});
it("empty honeypot does not trip", () => assert.equal(isHoneypotTripped(""), false));
it("whitespace honeypot does not trip", () => assert.equal(isHoneypotTripped("   "), false));
it("absent honeypot does not trip", () => assert.equal(isHoneypotTripped(null), false));
it("undefined honeypot does not trip", () =>
  assert.equal(isHoneypotTripped(undefined), false)
);
it("non-string honeypot does not trip", () =>
  assert.equal(isHoneypotTripped({ website: "x" }), false)
);

/* -------------------------------------------------------------------------- */
/* The P0: a bot payload must still PARSE                                     */
/* -------------------------------------------------------------------------- */

it("honeypot payload parses cleanly so the silent-success branch is reachable", () => {
  assert.equal(contactSchema.safeParse({ ...valid, website: "http://spam.example" }).success, true);
});

it("website field stays optional and unconstrained", () => {
  // If someone "tightens" this back to z.string().max(0), a bot payload fails
  // validation and the action returns a field error that reveals the trap.
  const bot = contactSchema.safeParse({ ...valid, website: "anything at all" });
  assert.equal(bot.success, true, "a filled honeypot must not fail safeParse");
  assert.equal(
    contactSchema.safeParse({ ...valid, website: undefined }).success,
    true,
    "an absent honeypot must not fail safeParse"
  );
});

/* -------------------------------------------------------------------------- */
/* Field rules                                                                */
/* -------------------------------------------------------------------------- */

it("rejects a one-character name", () =>
  assert.equal(contactSchema.safeParse({ ...valid, name: "A" }).success, false));
it("rejects a malformed email", () =>
  assert.equal(contactSchema.safeParse({ ...valid, email: "nope" }).success, false));
it("rejects an empty company", () =>
  assert.equal(contactSchema.safeParse({ ...valid, company: "" }).success, false));
it("rejects a too-short message", () =>
  assert.equal(contactSchema.safeParse({ ...valid, message: "too short" }).success, false));
it("rejects an over-length message", () =>
  assert.equal(contactSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success, false));
it("accepts a message at exactly the 2000 boundary", () =>
  assert.equal(contactSchema.safeParse({ ...valid, message: "x".repeat(2000) }).success, true));
it("accepts a valid submission", () =>
  assert.equal(contactSchema.safeParse(valid).success, true));
it("keeps every optional field optional", () =>
  assert.equal(
    contactSchema.safeParse({
      name: valid.name,
      email: valid.email,
      company: valid.company,
      message: valid.message,
    }).success,
    true
  ));
it("trims surrounding whitespace before validating", () =>
  assert.equal(contactSchema.safeParse({ ...valid, name: "  Maria Santos  " }).success, true));

/* -------------------------------------------------------------------------- */
/* The ordering the header always claimed to guard                            */
/* -------------------------------------------------------------------------- */

/**
 * A static call-order assertion over the real action file.
 *
 * Not a stylistic preference: if safeParse ran first, a bot that filled the
 * honeypot would receive a field-level validation error, which both reveals the
 * trap and gets the submission rejected instead of silently absorbed.
 */
const action = read("app/actions/contact.ts");

it("app/actions/contact.ts exists", () => {
  assert.ok(action.length > 0);
});

it("honeypot check is evaluated BEFORE safeParse in the real action", () => {
  const honeypotAt = action.indexOf("isHoneypotTripped(");
  const parseAt = action.indexOf("contactSchema.safeParse(");
  assert.ok(honeypotAt > -1, "the action must call isHoneypotTripped");
  assert.ok(parseAt > -1, "the action must call contactSchema.safeParse");
  assert.ok(
    honeypotAt < parseAt,
    `isHoneypotTripped must appear before safeParse (found at offset ${honeypotAt} vs ${parseAt})`
  );
});

it("the honeypot branch returns a neutral success, not a validation error", () => {
  const start = action.indexOf("if (isHoneypotTripped(");
  assert.ok(start > -1, "the action must contain the honeypot branch");
  // The return statement is single-line. Slicing to the next "}" would stop
  // inside `errors: {}` and find nothing — an earlier version of this
  // assertion did exactly that and failed against correct code.
  const window = action.slice(start, start + 300);
  const returned = window.match(/return\s*\{[^\n]*\};/);
  assert.ok(returned, "the honeypot branch must return something");
  assert.ok(
    /ok:\s*true/.test(returned[0]),
    `a tripped honeypot must return ok:true so the bot learns nothing — got: ${returned[0]}`
  );
  assert.ok(
    !/formError/.test(returned[0]),
    "a tripped honeypot must not surface a formError to the bot"
  );
});

it("the rate limiter runs before any persistence", () => {
  const rateAt = action.indexOf("rateLimit(");
  // Match the CALL, not the import. Searching for the bare identifier matches
  // `import { recordInboundLead, ... }` on line 6, which sits above everything
  // and made this assertion fail against correct code on its first run.
  const persistAt = action.indexOf("recordInboundLead(");
  assert.ok(rateAt > -1, "the action must rate limit this public write path");
  assert.ok(persistAt > -1, "the action must persist the lead somewhere");
  assert.ok(
    rateAt < persistAt,
    `the rate limit must run before anything is persisted (rate at ${rateAt}, persist at ${persistAt})`
  );
});

/* -------------------------------------------------------------------------- */
/* The gate must be able to fail — asserted against a mutated copy           */
/* -------------------------------------------------------------------------- */

/**
 * A gate that cannot be shown to fail is decoration. Rather than assert that
 * about itself, this asserts the ORDERING RULE is real: given a hypothetical
 * action source where safeParse comes first, the same comparison rejects it.
 */
function orderingWouldPass(src) {
  const h = src.indexOf("isHoneypotTripped(");
  const p = src.indexOf("contactSchema.safeParse(");
  return h > -1 && p > -1 && h < p;
}

it("the ordering rule rejects an action with safeParse first", () => {
  const inverted = [
    'const parsed = contactSchema.safeParse(raw);',
    'if (isHoneypotTripped(raw.website)) { return { ok: true }; }',
  ].join("\n");
  assert.equal(orderingWouldPass(inverted), false, "an inverted action must fail the rule");
});

it("the ordering rule accepts the real action", () => {
  assert.equal(orderingWouldPass(action), true);
});

/* -------------------------------------------------------------------------- */

const failed = checks.filter((c) => !c.ok);
for (const c of checks) {
  console.log(`${c.ok ? "  ✔" : "  ✖"} ${c.name}${c.ok ? "" : `\n      ${c.err}`}`);
}

if (failed.length) {
  console.error(`\n✖ contact selfcheck FAILED (${failed.length}/${checks.length})`);
  process.exit(1);
}
console.log(`\n✔ contact selfcheck passed (${checks.length} assertions against the real schema and the real action)`);