/**
 * SYSTEM_AUDIT.md §96 — every email builder, every visitor-controlled field,
 * hostile input.
 *
 * THE GAP THIS CLOSES
 * -------------------
 * `lib/email/templates.ts` builds every transactional email this product sends —
 * lead acknowledgements, internal lead alerts, booking confirmations, delivered
 * roadmaps, follow-ups. Five exported builders, roughly 32 `escapeHtml()` call
 * sites, and **no gate of any kind touched the file**. A visitor-supplied
 * `<script>` in the "Primary Challenge" field would have been rendered into an
 * email body and nothing in `test:unit` would have said so.
 *
 * WHY BEHAVIOURAL, NOT LEXICAL
 * ----------------------------
 * The obvious cheaper check is to scan the source for `${data.x}` that is not
 * wrapped in `escapeHtml(`. It was measured before it was trusted: **101
 * interpolations, 69 of them unwrapped** — and inspecting them shows most are
 * correct. `subject` and `text` are PLAIN TEXT and must not be HTML-escaped; the
 * rest are `BRAND.*` constants, `score`, `i + 1`, and pre-encoded URLs.
 *
 * So a lexical rule has almost no separation between "an injection" and "the
 * plain-text half of the email", and §44 already established what happens to a
 * prose rule with no separation: it gets switched off within a day. Rather than
 * ship a heuristic that cries wolf 69 times, this calls each builder with a
 * hostile value in EVERY visitor-controlled field and asserts on the OUTPUT.
 *
 * That distinction is the whole design: this cannot tell you *where* the escaping
 * is missing, but it tells you definitively *whether* it is — which is the
 * property that matters and the one nothing else here checked.
 *
 * THE SHARED ESCAPER
 * ------------------
 * There were three copies of `escapeHtml` (§96). This file asserts the real one,
 * imported from `lib/html-escape.ts`, and asserts the real builders interpolate
 * through it rather than through a private copy.
 *
 * Run: node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *        lib/email/templates.selfcheck.mjs
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { escapeHtml } from "../html-escape.ts";
import {
  buildClientWelcomeAutoResponder,
  buildTeamNotificationEmail,
  buildBookingConfirmationEmail,
  buildRoadmapDeliveryEmail,
  buildConsultationFollowUpEmail,
} from "./templates.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
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

/* One payload whose every fragment is a UNIQUE, checkable token.
 *
 * The first version of this gate used a broad regex — /<script\b|onerror\s*=|\
 * <img\b|javascript:/i — over the whole document and reported ALL FIVE BUILDERS
 * FAILING. Every one of those five was correct.
 *
 * Two false-positive shapes, both instructive:
 *   • `<img` matched the company's OWN logo in the shared header, which is
 *     trusted markup the template is supposed to contain.
 *   • `onerror=` matched `&lt;img src=x onerror=alert(1)&gt;` — the FULLY ESCAPED
 *     form. The word survives as harmless text inside an entity; that is the
 *     escaper working, not an injection.
 *
 * So the rule is now exact and direction-specific: a token the VISITOR supplied
 * must not appear verbatim in the html, and its escaped form must. That has no
 * false positives, because it names the attacker's own string rather than
 * searching the document for anything that looks like markup. This is §90's
 * lesson — a probe that is not aimed at the real violation produces a confident
 * false claim — caught by insisting on evidence before believing the finding. */
const TOKENS = {
  name: "<n1>x</n1>",
  email: "<e1>x</e1>",
  company: "<c1>y</c1>",
  companySize: "<s1>z</s1>",
  industry: "<i1>z</i1>",
  currentSystem: "<u1>z</u1>",
  primaryChallenge: "<p1>z</p1>",
  preferredMethod: "<m1>z</m1>",
  interest: "<t1>z</t1>",
  message: "<g1>z</g1>",
  date: "<d1>z</d1>",
  time: "<h1>z</h1>",
  architectName: "<r1>z</r1>",
  solutionName: "<j1>z</j1>",
  summary: "<y1>z</y1>",
  nextStep: "<k1>z</k1>",
  solutionInterest: "<v1>z</v1>",
  notes: "<o1>z</o1>",
};
const token = (k) => TOKENS[k];
/* The escaped form must be present for every token that WAS interpolated. */
const esc = (v) => v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const LEAD = {
  name: token("name"),
  email: token("email"),
  company: token("company"),
  companySize: token("companySize"),
  industry: token("industry"),
  currentSystem: token("currentSystem"),
  primaryChallenge: token("primaryChallenge"),
  preferredMethod: token("preferredMethod"),
  interest: token("interest"),
  message: token("message"),
  leadScore: 91,
  submittedAt: "2026-10-09T00:00:00Z",
};

const BOOKING = {
  name: token("name"),
  email: token("email"),
  company: token("company"),
  date: token("date"),
  time: token("time"),
  meetingUrl: `https://meet.example/x?a=1&b=2`,
  agenda: [token("primaryChallenge"), `Plain agenda item`],
  architectName: token("architectName"),
};

const ROADMAP = {
  name: token("name"),
  email: token("email"),
  company: token("company"),
  solutionName: token("solutionName"),
  keyBottlenecks: [token("primaryChallenge"), `Plain bottleneck`],
  roadmapUrl: "https://bits.example/roadmap?x=1&y=2",
  summary: token("summary"),
  deliveredAt: "2026-10-09T00:00:00Z",
  nextStep: token("nextStep"),
  validUntil: "2026-12-31",
};

const FOLLOWUP = {
  name: token("name"),
  email: token("email"),
  company: token("company"),
  solutionInterest: token("solutionInterest"),
  notes: token("notes"),
  bookingUrl: "https://bits.example/book?a=1&b=2",
};

const BUILDERS = [
  ["buildClientWelcomeAutoResponder", () => buildClientWelcomeAutoResponder(LEAD)],
  ["buildTeamNotificationEmail", () => buildTeamNotificationEmail(LEAD)],
  ["buildBookingConfirmationEmail", () => buildBookingConfirmationEmail(BOOKING)],
  ["buildRoadmapDeliveryEmail", () => buildRoadmapDeliveryEmail(ROADMAP)],
  ["buildConsultationFollowUpEmail", () => buildConsultationFollowUpEmail(FOLLOWUP)],
];

/* ── 1. The escaper itself ───────────────────────────────────────────────── */

it("escapeHtml neutralises the five characters that open markup", () => {
  assert.equal(escapeHtml("<n1>x</n1>"), "&lt;n1&gt;x&lt;/n1&gt;");
  assert.equal(escapeHtml(`<img src=x onerror=alert(1)>`), "&lt;img src=x onerror=alert(1)&gt;");
  assert.equal(escapeHtml(`"C"`), "&quot;C&quot;");
  assert.equal(escapeHtml(`'C'`), "&#39;C&#39;");
});
it("escapeHtml escapes & FIRST so entities cannot be forged", () => {
  assert.equal(escapeHtml("&lt;script&gt;"), "&amp;lt;script&amp;gt;");
  assert.equal(escapeHtml("a & b"), "a &amp; b");
});
it("escapeHtml covers both quote characters", () => {
  assert.equal(escapeHtml(`"C"`), "&quot;C&quot;");
  assert.equal(escapeHtml(`'C'`), "&#39;C&#39;");
});
it("escapeHtml leaves plain text alone", () => {
  assert.equal(escapeHtml("Maria Santos — Santos Logistics"), "Maria Santos — Santos Logistics");
});

/* ── 2. Every builder, hostile input, asserted on the OUTPUT ─────────────── */

const INJECTION = /<script\b|onerror\s*=|<img\b|javascript:/i;

/* Every declared token is checked against every builder. The first version
 * hand-listed which fields each builder renders; that is the §88 defect — an
 * enumerated list that has to be maintained and is wrong the moment a template
 * changes. Checking ALL tokens against ALL builders is both stronger and
 * requires no list to keep in sync. */
const ALL_TOKENS = Object.values(TOKENS);

for (const [name, build] of BUILDERS) {
  it(`${name}: NO visitor token survives unescaped in html`, () => {
    const { html } = build();
    const raw = ALL_TOKENS.filter((t) => html.includes(t));
    assert.deepEqual(raw, [], `html contains these VERBATIM: ${raw.join(", ")}`);
  });

  /* The non-vacuity half. "Nothing survived" is also what an empty or
   * un-interpolated email would produce, so the payload must be PROVEN to have
   * reached the html before the assertion above means anything. The floor is 1,
   * not a number I preferred: the failure being guarded against is a builder that
   * ignores the payload entirely. The MEASURED count is printed so a drop from 6
   * to 1 is visible even though both pass. */
  it(`${name}: the visitor payload demonstrably reached the html`, () => {
    const { html } = build();
    const escaped = ALL_TOKENS.filter((t) => html.includes(esc(t)));
    assert.ok(
      escaped.length >= 1,
      `no visitor token appears escaped — the payload may not be reaching this template, which would make the check above vacuous`,
    );
    console.log(`      · ${escaped.length} visitor field(s) interpolated: ${escaped.map((t) => Object.keys(TOKENS).find((k) => TOKENS[k] === t)).join(", ")}`);
  });

  it(`${name}: returns non-empty subject, text and html`, () => {
    const out = build();
    assert.ok(out.subject.length > 0, "subject is empty");
    assert.ok(out.text.length > 0, "text is empty");
    assert.ok(out.html.length > 0, "html is empty");
  });
}

/* ── 3. The plain-text half must NOT be html-escaped ──────────────────────
 *
 * The other direction, and the one a naive "escape everything" fix would break.
 * `subject` and `text` are read by mail clients and by humans; `&amp;` in a
 * subject line is a bug, not a defence. If someone "fixes" this file by wrapping
 * the text block in escapeHtml, this fails.
 */
/* The rule is about ENTITIES, not about which fields a given builder happens to
 * interpolate. `buildClientWelcomeAutoResponder`'s subject is a FIXED string —
 * "We got your note — Let's talk about your system (BITS)" — with no visitor data
 * in it at all, so an assertion that "the subject must contain a raw token" was
 * wrong about the code rather than right about a bug. What is true of every
 * builder, without enumerating them, is that a plain-text header must never
 * contain an HTML entity. */
const ENTITIES = ["&lt;", "&gt;", "&amp;", "&quot;", "&#39;"];

it("plain-text subject and text never contain an HTML entity", () => {
  for (const [name, build] of BUILDERS) {
    const { subject, text } = build();
    for (const e of ENTITIES) {
      assert.ok(!subject.includes(e), `${name}: subject contains ${e}`);
      assert.ok(!text.includes(e), `${name}: text body contains ${e}`);
    }
  }
});

it("plain-text bodies show visitor fields verbatim, not escaped", () => {
  for (const [name, build] of BUILDERS) {
    const { subject, text } = build();
    const inSubject = ALL_TOKENS.filter((t) => subject.includes(t));
    const inText = ALL_TOKENS.filter((t) => text.includes(t));
    for (const t of [...inSubject, ...inText]) {
      assert.ok(!subject.includes(esc(t)) && !text.includes(esc(t)), `${name}: a plain-text body shows ${t} escaped`);
    }
  }
});

/* ── 4. The duplication this file exists to prevent ─────────────────────── */

/* A re-exporting wrapper is not a second implementation. The rule is therefore
 * about the BODY, not the name: a file that still contains the `.replaceAll`
 * chain has its own copy, and the wrapper in contact.ts does not. */
it("there is exactly ONE escapeHtml IMPLEMENTATION in lib/", () => {
  const files = ["contact.ts", "email/templates.ts", "email/outcome.ts", "email/service.ts"];
  const defined = files.filter((f) =>
    /function\s+escapeHtml\b[\s\S]{0,400}?\.replaceAll\(/.test(read(`lib/${f}`)),
  );
  assert.deepEqual(defined, [], `duplicate escapeHtml implementations in: ${defined.join(", ")}`);
});

it("both call sites import the shared escaper", () => {
  assert.ok(/from\s+["'][^"']*html-escape(\.ts)?["']/.test(read("lib/contact.ts")), "contact.ts does not import the shared escaper");
  assert.ok(/from\s+["'][^"']*html-escape(\.ts)?["']/.test(read("lib/email/templates.ts")), "templates.ts does not import the shared escaper");
});

/* ── 5. The dead stub is gone ───────────────────────────────────────────── */

it("the §96 stub scripts/contact-selfcheck.mjs no longer exists", () => {
  let exists = true;
  try {
    read("scripts/contact-selfcheck.mjs");
  } catch {
    exists = false;
  }
  assert.equal(exists, false, "the self-copied escapeHtml stub is still present");
});

/* ── Report ─────────────────────────────────────────────────────────────── */

const failed = checks.filter((c) => !c.ok);
for (const c of checks) {
  console.log(`${c.ok ? "  ✔" : "  ✖"} ${c.name}${c.ok ? "" : `\n      ${c.err}`}`);
}

if (failed.length) {
  console.error(`\n✖ email templates selfcheck FAILED (${failed.length}/${checks.length})`);
  process.exit(1);
}
console.log(`\n✔ email templates selfcheck passed (${checks.length} assertions across ${BUILDERS.length} builders)`);