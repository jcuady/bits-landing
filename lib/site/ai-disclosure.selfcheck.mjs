#!/usr/bin/env node
/**
 * Security-attestation integrity selfcheck.
 *
 * Part A — BROKEN REFERENCES. Every absolute URL and in-repo path cited by the
 *   files AI engines read (llms*.txt, index.md, bitscrm.md, bitsagent.md) must
 *   resolve to a real route. A citation to a 404 page is the most damaging
 *   possible AEO failure: it teaches assistants that BITS publishes dead links.
 *
 * Part B — UNSUBSTANTIATED SECURITY ATTESTATIONS. These files assert a security
 *   posture to machines and to customers. Claiming RBAC, tamper-proof audit
 *   logs, PII masking or SOC 2 Type II that the codebase does not implement is
 *   a factual misstatement with compliance consequences — and no unit test would
 *   ever catch it. See SYSTEM_AUDIT.md §28, §29.
 *
 * ── Two hard problems this gate has to survive ────────────────────────────────
 *
 * 1. A naive term scan is defeated by its own fix. After correcting these files
 *    they legitimately read "There is no WORM or immutable audit log" and "not
 *    implemented: server-side role-based access control" — both contain the very
 *    terms being banned. Findings are therefore scoped to the SENTENCE, and a
 *    sentence carrying a negation is not a claim.
 *
 * 2. A naive scan of TypeScript source is meaningless. Splitting `lib/site.ts`
 *    on ". " attributes matches to whatever code span happens to follow, and
 *    reports "SOC 2" against a product description containing neither. Every
 *    source file is therefore reduced to its string literals and JSX text
 *    BEFORE any sentence splitting happens. Comments are stripped first, or
 *    this file's own CORRECTION notes — which quote the old false strings to
 *    explain the fix — would trip it.
 *
 * It must also catch bare JSX text: the single worst string in the Phase-29
 * audit was `>Enforced<`, sitting between two tags in components/sections/
 * security.tsx. No string-literal scan can see it.
 *
 * Run: node lib/site/ai-disclosure.selfcheck.mjs
 */

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  SCOPED_OUT,
  visibleStrings,
  classLiteralRanges,
  stringsFor,
  exportRegion,
  findClaims,
  sentences,
  isNonCopyLiteral,
  stripComments,
  CHECKS,
  SECURITY_SURFACES as SECURITY_SURFACE_DEFS,
} from "./security-claims.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

/* ========================================================================== */
/* Part A — reference integrity                                               */
/* ========================================================================== */

const AI_FILES = [
  "public/llms.txt",
  "public/llms-full.txt",
  "public/index.md",
  "public/bitscrm.md",
  "public/bitsagent.md",
];

/**
 * Surfaces that describe the security posture of the deployment built from
 * THIS repository. The rules below apply only here.
 *
 * SYSTEM_AUDIT.md §44: this list now lives in lib/site/security-claims.mjs so
 * `scripts/scoping-regression.mjs` can pin the same surfaces without keeping a
 * second copy. See the note on the export.
 */
const SECURITY_SURFACES = SECURITY_SURFACE_DEFS;

const failures = [];
const unverifiedInventory = [];

function discoverRoutes() {
  const out = new Set(["/"]);
  const appDir = join(ROOT, "app");
  const walk = (dir, segs) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const abs = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
        const isGroup = /^\(.+\)$/.test(entry.name);
        walk(abs, isGroup ? segs : [...segs, entry.name]);
      } else if (entry.name === "page.tsx") {
        out.add("/" + segs.join("/"));
      }
    }
  };
  walk(appDir, []);
  return out;
}

const routes = discoverRoutes();
const PUBLIC_PAGES = new Set([
  "/llms.txt",
  "/llms-full.txt",
  "/index.md",
  "/bitscrm.md",
  "/bitsagent.md",
  "/brandbook",
  "/brandbook.html",
]);

function dynamicSlugs() {
  const productSlugs = new Set();
  const blogSlugs = new Set();
  try {
    const site = read("lib/site.ts");
    for (const m of site.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)) productSlugs.add(m[1]);
    productSlugs.add("white-label");
  } catch { /* fall through to the segment check */ }
  try {
    const blog = read("lib/blog-data.ts");
    for (const m of blog.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)) blogSlugs.add(m[1]);
  } catch { /* ditto */ }
  return { productSlugs, blogSlugs };
}

const { productSlugs, blogSlugs } = dynamicSlugs();

function isKnownPath(clean) {
  if (routes.has(clean)) return true;
  if (PUBLIC_PAGES.has(clean)) return true;
  if (existsSync(join(ROOT, "public", clean))) return true;

  // /products/<slug> — validated against the real catalog, NOT a blanket
  // "anything under /products is fine" rule, which would make this check
  // unable to fail for the entire product surface.
  const p = clean.match(/^\/products\/([a-z0-9-]+)$/);
  if (p) {
    if (productSlugs.has(p[1])) return true;
    if (p[1] === "service" || p[1] === "sports-ai") return true;
  }
  const b = clean.match(/^\/blog\/([a-z0-9-]+)$/);
  if (b && blogSlugs.has(b[1])) return true;

  return false;
}

let refCount = 0;
for (const rel of AI_FILES) {
  if (!existsSync(join(ROOT, rel))) {
    failures.push(`${rel}: file is missing`);
    continue;
  }
  const src = read(rel);

  for (const m of src.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    refCount++;
    let path;
    if (target.startsWith("http://") || target.startsWith("https://")) {
      try {
        path = new URL(target).pathname.replace(/\/$/, "") || "/";
      } catch {
        failures.push(`${rel}: unparseable URL "${target}"`);
        continue;
      }
    } else if (target.startsWith("/")) {
      path = target.replace(/\/$/, "") || "/";
    } else {
      continue; // relative/doc-local
    }
    const clean = path.replace(/\.html$/, "") || "/";
    if (!isKnownPath(clean)) {
      failures.push(`${rel}: references "${path}" which is not a route and not a public file`);
    }
  }
}

/* ========================================================================== */
/* Part B — reduce source to its words, THEN judge the words                 */
/* ========================================================================== */
/* The scanning rules (visibleStrings, exportRegion, findClaims, CHECKS,
 * SCOPED_OUT) now live in lib/site/security-claims.mjs so they can be
 * negative-tested directly. A gate that has only ever been seen to PASS is not
 * evidence of anything — see its self-test below. */

/* ========================================================================== */
/* Part B2 — the gate's own negative test                                     */
/* ========================================================================== */

/**
 * Every rule must be shown to FAIL on a string that really is a false claim,
 * and must NOT fire on the honest ways of writing the same thing.
 *
 * The honest half matters more than it looks. This gate has been defeated by
 * its own fixes three times: by the denials ("there is no WORM log"), by the
 * "Target:" table cells, and by a `\b` after a colon that silently disabled a
 * marker. A rule that cannot be shown to fail is decoration; a rule that fires
 * on the correction is useless, because the correction is the fix.
 */
const NEGATIVE_TESTS = [
  // id, a string that MUST be flagged, and one that must NOT be
  ["soc2", "SOC 2 Type II Controls", "No SOC 2 Type II audit has been performed"],
  ["worm", "Immutable WORM log retention", "There is no WORM storage in this build"],
  ["hipaa", "HIPAA Security Rule Aligned", "HIPAA is not applicable to this product"],
  ["multitenant", "Built as a multi-tenant SaaS", "The application is single-tenant"],
  ["rbac", "Granular RBAC Permissions", "Per-Role Authorization is roadmap, not shipped"],
  ["sso-mfa", "Centralized SSO & MFA enforced", "Neither SSO nor MFA is implemented"],
  ["auditlog", "Exportable regulatory audit logs", "There is no audit-log table in this codebase"],
  ["immutable", "Immutable ledger posting history", "No immutable store exists"],
  ["masking", "Role-based PII masking", "Target: masked phone / SSN"],
  ["isolation", "Campaign-level data isolation", "The deployment is single-tenant"],
  ["crypto-enforced", "Cryptographically enforced role boundaries", "Authentication is a session check"],
  ["contact-rules", "Automated quiet-hour enforcement and DNC lists", "Contact rules are configured per engagement"],
  ["enforcement-badge", "Enforced", "The rate limit is enforced in code"],
];

for (const [id, mustFail, mustPass] of NEGATIVE_TESTS) {
  const rule = CHECKS.find((c) => c.id === id);
  if (!rule) {
    failures.push(`self-test: no rule with id "${id}" — CHECKS and the test table have drifted apart`);
    continue;
  }
  const fired = findClaims(mustFail).some((c) => c.id === id);
  if (!fired) {
    failures.push(
      `self-test: rule "${id}" did NOT fire on its own known-bad string "${mustFail}". ` +
        `The gate cannot fail for this claim class, so it is not a check.`
    );
  }
  const stillFired = findClaims(mustPass).some((c) => c.id === id);
  if (stillFired) {
    failures.push(
      `self-test: rule "${id}" fired on the honest string "${mustPass}". ` +
        `The gate is defeated by its own correction.`
    );
  }
}

/**
 * Extraction itself must be proven, not assumed. These two are the exact shapes
 * that defeated v1 of this gate: `>Enforced<` is bare JSX text with no string
 * literal around it, and a CORRECTION comment quotes a false claim verbatim.
 */
const EXTRACTION_TESTS = [
  ["jsx text between tags", `<span className="x">Enforced</span>`, true],
  ["false claim quoted in a comment", `/* previously read "Immutable WORM log" */`, false],
  ["string literal", `const x = "Role-Based Access Control";`, true],
  ["class name only", `className="text-slate-500 grid gap-2"`, false],
  ["identifier only", `const requireCrmUser = () => rbacRole;`, false],
];

for (const [label, source, shouldMatch] of EXTRACTION_TESTS) {
  const hit = findClaims(visibleStrings(source).map((s) => s.value).join(" ")).length > 0;
  if (hit !== shouldMatch) {
    failures.push(
      `self-test: extraction ${label} expected ${shouldMatch ? "a match" : "no match"} but got ${hit ? "a match" : "none"}`
    );
  }
}

/**
 * SYSTEM_AUDIT.md §81 — `isNonCopyLiteral` must be proven in BOTH directions.
 *
 * This filter skips 13.6% of gated literals. §80 measured exactly what that
 * costs: 5 distinct skipped literals match a banned term, and all five are an
 * identifier, a DOM id, a React key, an asset path, or a ternary the `>…<`
 * JSX pass captured by mistake. No claim was traded away.
 *
 * That measurement is a point-in-time fact, not a property. Without these
 * probes, someone can widen this filter next year and the audit record will
 * still say "zero claims traded away".
 */
const NON_COPY_TESTS = [
  // ── must be treated as a NAME (skip) ──────────────────────────────────
  ["TS union member", `type ActiveTab = "cockpit" | "telephony" | "field";`, "telephony", true],
  ["DOM id", `const t = { id: "telephony-sla", label: "x" };`, "telephony-sla", true],
  ["React key", `<button key="tab-telephony">`, "tab-telephony", true],
  ["asset path", `imageSrc: "/images/features/telephony-console-specimen.webp",`, "/images/features/telephony-console-specimen.webp", true],
  ["lowercase token value", `const nextTab = "telephony";`, "telephony", true],
  ["ternary captured as JSX text", `<div>) : activeTab === "telephony" ? (</div>`, ') : activeTab === "telephony" ? (', true],

  // ── must be treated as COPY (scan) ───────────────────────────────────
  ["category label", `category: "Telephony & Communications",`, "Telephony & Communications", false],
  ["false SLA", `x: "99.9% Telephony uptime Service Level Agreement (SLA)",`, "99.9% Telephony uptime Service Level Agreement (SLA)", false],
  ["capitalised badge", `<span>Telephony</span>`, "Telephony", false],
];

for (const [label, source, literal, shouldSkip] of NON_COPY_TESTS) {
  const stripped = stripComments(source);
  const v = visibleStrings(source).find((s) => s.value === literal);
  if (!v) {
    failures.push(`self-test: non-copy ${label} — the literal ${JSON.stringify(literal)} was not extracted from the fixture, so the probe proves nothing`);
    continue;
  }
  const skipped = isNonCopyLiteral(stripped, v.index, v.value);
  if (skipped !== shouldSkip) {
    failures.push(
      `self-test: non-copy ${label} expected ${shouldSkip ? "skip" : "scan"} but got ${skipped ? "skip" : "scan"}`
    );
  }
}

/* The filter must also not swallow the rule it exists to serve. */
if (!findClaims("99.9% Telephony uptime Service Level Agreement").some((c) => c.id === "telephony")) {
  failures.push("self-test: the telephony rule stopped firing on its own known-bad string — the bare term was lost");
}

/* ── §103 — stripComments must not delete copy ──────────────────────────────
 *
 * `stripComments` ran BEFORE extraction, so anything it removed was not
 * under-scanned — it was invisible. The old regex implementation guarded `//`
 * with a character class so the `//` in `http://` would not open a comment, but
 * it only guarded the FIRST one. A second `//` on the same line, preceded by an
 * ordinary character, matched, and everything from there to end-of-line was
 * deleted.
 *
 * Measured across the 34 gated surfaces: 2 files, 66 string literals the gate
 * could not see. None carried a banned term, so no verdict changed — a latent
 * blind spot rather than a live false negative, and exactly the kind that becomes
 * a false negative the day someone edits one of those strings.
 *
 * These fixtures pin it. The banned word sits AFTER the second `//` on the same
 * line, which is the shape that used to hide it. */
const SLASH_LOSS_TESTS = [
  [`const u = 'https://cdn.example/a//b'; const s = "SOC 2 Type II";`, "SOC 2 Type II"],
  [`<a href="https://x.dev/a//b">Immutable audit log</a>`, "Immutable audit log"],
  [`const u = "http://example.com"; const s = "HIPAA compliant";`, "HIPAA compliant"],
];
for (const [src, mustSurvive] of SLASH_LOSS_TESTS) {
  const stripped = stripComments(src);
  const found = visibleStrings(stripped).some((s) => s.value.includes(mustSurvive));
  if (!found) {
    failures.push(
      `self-test: stripComments DELETED ${JSON.stringify(mustSurvive)} — a "//" inside a string literal was ` +
      `read as a comment. Fixture: ${JSON.stringify(src)}`
    );
  }
}
/* And the guard must still work in the other direction: a real comment, and a
 * banned term inside one, are both still removed. Otherwise the fix would have
 * been to stop stripping comments at all. */
for (const [src, mustNotSurvive] of [
  [`// SOC 2 Type II\nconst s = 1;`, "SOC 2 Type II"],
  [`/* HIPAA compliant */ const s = 1;`, "HIPAA compliant"],
]) {
  const found = visibleStrings(stripComments(src)).some((s) => s.value.includes(mustNotSurvive));
  if (found) {
    failures.push(
      `self-test: stripComments KEPT ${JSON.stringify(mustNotSurvive)} from a real comment — it must be removed`
    );
  }
}

/**
 * SYSTEM_AUDIT.md §83 — the SENTENCE SPLITTER, negative-tested both ways.
 *
 * §82 changed how sentences are delimited and proved the change only by
 * observing that a previously-hidden claim became visible. That is the same gap
 * this audit has now closed four times: a detector behaviour altered without a
 * probe, where the proof depends on the very string that motivated it.
 *
 * Both directions matter. Refusing to split at `&amp;` is the fix; refusing to
 * split at a REAL semicolon would be a different bug — a page whose first
 * sentence denies a control and whose second asserts it would read as one
 * sentence, and `SCOPED_OUT` exempts whole sentences. That failure is silent and
 * would make the gate easier to pass, which is the direction that costs the most.
 */
const SPLIT_TESTS = [
  // ── must NOT split: the §82 bug ──────────────────────────────────────
  ["HTML entity", "BSP 857 &amp; NPC RA 10173 Aligned", 1],
  ["named entity with digits", "Costs &pound;50 &mdash; per seat", 1],
  ["numeric entity", "SLA &#8594; 99.9% uptime", 1],
  // ── MUST still split: a real boundary ────────────────────────────────
  ["full stop", "No audit log exists. We export audit logs daily.", 2],
  ["sentence semicolon", "Step one; then two.", 2],
  ["abbreviation is not a boundary", "Contact us at ops@bits.com. We reply daily.", 2],
];

for (const [label, text, expected] of SPLIT_TESTS) {
  const got = sentences(text).length;
  if (got !== expected) {
    failures.push(
      `self-test: sentence split ${label} expected ${expected} sentence(s) but got ${got} — ${JSON.stringify(sentences(text))}`
    );
  }
}

/* The §82 miss itself, end to end through the real rule. */
if (!findClaims("BSP 857 &amp; NPC RA 10173 Aligned").some((c) => c.id === "contact-rules")) {
  failures.push(
    "self-test: a BSP alignment claim containing &amp; is no longer detected — the sentence splitter is splitting on the entity again"
  );
}
/* …and the counterpart: a real sentence boundary must still split, so a denial
 * in the first sentence cannot exempt the contradicting claim in the second.
 * This is the failure the fix could have INTRODUCED, and it runs the opposite
 * way to the entity case: refusing to split at a real `;`/`.` would make the
 * gate easier to pass, which is the direction that costs the most. */
const splitPair = "No audit logging exists. We export immutable WORM audit logs daily.";
if (sentences(splitPair).length !== 2) {
  failures.push(
    `self-test: a real sentence boundary stopped splitting — a denial would exempt a contradicting claim. Got ${JSON.stringify(sentences(splitPair))}`
  );
} else if (!findClaims(splitPair).some((c) => c.id === "worm")) {
  failures.push(
    "self-test: the claim after a genuine sentence boundary is no longer detected — the splitter stopped splitting real sentences"
  );
}

/* SYSTEM_AUDIT.md §87 — the class-literal filter's own tests.
 *
 * A filter that only ever removes things is a filter nobody can trust, and the
 * direction that matters is the one that makes the gate EASIER to pass: if the
 * classifier over-reached, a real claim hiding in an attribute value would go
 * silent. §83's lesson — a negative test whose fixture is the bug it exists to
 * catch is only alive until the bug is fixed — applies, so every fixture here is
 * SYNTHETIC and none is the shipped string that exposed the bug in §85/§87.
 *
 * Four assertions, two per direction:
 *   SKIP  — a class value is not copy (this is the intended loss)
 *   SCAN  — the attribute values that DO carry reader-visible words are not
 *           classes, so a claim in one of them still fails the gate
 */
const CLASS_FILTER_PROBES = [
  {
    id: "a banned term inside a className is not treated as copy",
    expect: "class",
    src: `const A = () => <div className="border-telephony-500 bg-slate-100" />;`,
    value: "border-telephony-500 bg-slate-100",
  },
  {
    id: "a banned term inside a cn() expression is not treated as copy",
    expect: "class",
    src: `const B = () => <div className={cn("text-worm-700", on && "p-2")} />;`,
    value: "text-worm-700",
  },
  {
    id: "a banned term in an aria-label IS still scanned (the filter must not over-reach)",
    expect: "string",
    src: `const C = () => <button aria-label="Start a WebRTC softphone call" />;`,
    value: "Start a WebRTC softphone call",
  },
  {
    id: "a banned term in a title attribute IS still scanned",
    expect: "string",
    src: `const D = () => <a title="Immutable WORM audit trail" href="/x">x</a>;`,
    value: "Immutable WORM audit trail",
  },
];

for (const probe of CLASS_FILTER_PROBES) {
  const found = visibleStrings(probe.src).find((s) => s.value === probe.value);
  if (!found) {
    failures.push(
      `§87 class-filter probe could not be evaluated — the extractor did not return ` +
        `${JSON.stringify(probe.value)} from ${JSON.stringify(probe.src)}. The probe proves nothing.`
    );
    continue;
  }
  if (found.kind !== probe.expect) {
    failures.push(
      `§87 class-filter probe failed: "${probe.id}" — expected kind "${probe.expect}", ` +
        `got "${found.kind}". ${found.kind === "class" ? "A reader-visible attribute value was treated as a class, which would hide real claims." : "A class value is being scanned as copy, so the 39.1% overstatement is still present."}`
    );
  }
}

/* The two halves above assert the CLASSIFIER. This one asserts the consequence
 * that actually matters: a planted claim in an aria-label must still fail the
 * real rule, or the filter has taken coverage with it. */
const OVERREACH_SRC = `export function X(){ return <button aria-label="Bundled WebRTC softphone with predictive dialing" />; }`;
const overreachHit = findClaims(
  visibleStrings(OVERREACH_SRC)
    .filter((s) => s.kind !== "class")
    .map((s) => s.value)
    .join(" ")
).length;
if (overreachHit === 0) {
  failures.push(
    "§87 class filter over-reaches: a planted claim in an aria-label is no longer detected. " +
      "Skipping class literals must not remove coverage of reader-visible attributes."
  );
}

/* ========================================================================== */
let scannedUnits = 0;
/* §87 — counted, never used to decide. Printed so the class literals the gate
 * now skips are visible rather than silently dropped: a number that disappears
 * without a line item is how a gate starts reporting less than it checks. */
let classLiterals = 0;

for (const surface of SECURITY_SURFACES) {
  if (!existsSync(join(ROOT, surface.file))) {
    failures.push(`${surface.file}: security surface file is missing`);
    continue;
  }
  const raw = read(surface.file);

  const regions = surface.exports
    ? surface.exports.map((name) => {
        const region = exportRegion(raw, name);
        if (!region) {
          failures.push(
            `${surface.file}: export "${name}" not found — the gate cannot verify it, so it cannot pass`
          );
          return null;
        }
        return { name, src: region };
      }).filter(Boolean)
    : [{ name: null, src: raw }];

  for (const region of regions) {
    const where = `${surface.file}${region.name ? ` (${region.name})` : ""}`;
    /* SYSTEM_AUDIT.md §60 — extractor chosen by file type. Running the JS/JSX
     * extractor over a markdown surface read almost none of it and reported the
     * file as clean. Five surfaces were in that state from §52 until here. */
    for (const { kind, value, index } of stringsFor(surface.file, region.src)) {
      /* §81 — a literal in an identifier or path position is a name, not copy.
       * Offsets are into the comment-stripped text, so the context must be read
       * from the same text. This runs FIRST so that the two counters below
       * partition one set: previously class literals were counted before this
       * filter, so "3,947 visible + 2,765 class" summed to 6,712 and the header
       * carried two numbers that could not both be true. */
      if (isNonCopyLiteral(stripComments(region.src), index, value)) continue;
      /* §87 — a Tailwind className value is not copy. Skipping it here is what
       * makes the reported "visible strings" mean visible strings: 39.1% of the
       * scanned units were class values, so the headline overstated real copy
       * by that much. Measured: ZERO banned-term matches live inside a class
       * literal today, so this removes no verdict on any current input — the
       * negative tests above prove the filter cannot over-reach. */
      if (kind === "class") {
        classLiterals++;
        continue;
      }
      scannedUnits++;
      for (const claim of findClaims(value)) {
        failures.push(
          `${where}: ${kind ?? "prose"} asserts ${claim.why}. String: "${claim.sentence.slice(0, 120)}"`
        );
      }
    }
  }
}

/* ========================================================================== */
/* Part C — out-of-repo product lines: reported, never a build failure        */
/* ========================================================================== */

/**
 * The site markets product lines that are not built in this repository. We
 * cannot verify them here, so the gate does not pretend to. It prints an
 * inventory so the owner can confirm each claim against its actual deployment.
 */
const PRODUCT_CONTENT_FILES = [
  "lib/site.ts",
  "lib/blog-data.ts",
  "lib/products",
  "components/sections",
  "app/(marketing)",
];

function walkFiles(rel) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return [];
  if (!statSync(abs).isDirectory()) return [rel];
  return readdirSync(abs, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walkFiles(join(rel, e.name)) : [join(rel, e.name)]
  );
}

const inventory = new Map();
for (const entry of PRODUCT_CONTENT_FILES) {
  for (const rel of walkFiles(entry)) {
    if (!/\.(ts|tsx|md|txt)$/.test(rel)) continue;
    const alreadyScoped = SECURITY_SURFACES.some((s) => s.file === rel);
    const src = read(rel);
    /* §82 — the inventory applies the SAME identifier filter as the main loop.
     *
     * Without it this report listed seven files with "1 finding" that the main
     * gate had already ruled clean, because every one of them was a tab id or an
     * asset path containing the word `telephony`. A residual report that
     * contradicts the gate it belongs to trains the reader to ignore both —
     * the same defect as §81.6, where two gates derived one named quantity
     * differently and one of them was always wrong in a document. */
    const stripped = stripComments(src);
    const classRanges = /\.tsx?$/.test(rel) ? classLiteralRanges(stripped) : [];
    for (const { kind, value, index } of stringsFor(rel, src)) {
      /* §87 — same class-literal skip as the main loop, so the two halves of
       * this report cannot disagree about what a "string" is (§82). */
      if (kind === "class") continue;
      if (isNonCopyLiteral(stripped, index, value)) continue;
      for (const { term } of CHECKS) {
        if (!term.test(value) || SCOPED_OUT.test(value)) continue;
        const key = `${rel}`;
        if (!inventory.has(key)) inventory.set(key, new Set());
        inventory.get(key).add(value.replace(/\s+/g, " ").trim().slice(0, 90));
      }
    }
  }
}

/* ========================================================================== */
/* Report                                                                    */
/* ========================================================================== */

if (failures.length > 0) {
  console.error("✖ ai-disclosure selfcheck FAILED:\n");
  for (const f of failures) console.error(`  - ${f}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✔ ai-disclosure selfcheck passed (${AI_FILES.length} AI files, ${refCount} references resolved, ` +
    `${SECURITY_SURFACES.length} security surfaces / ${scannedUnits} visible strings ` +
    `(${classLiterals} class literals excluded, §87), ` +
    `${CHECKS.length} banned attestations negative-tested, none affirmative)`
);

if (inventory.size > 0) {
  /* §85 — the report printed how many FILES had findings but never how many
   * findings there were, so every audit section that quoted a total was quoting
   * a hand-sum of a per-file list the report itself truncates at 4 rows. §77
   * found the same failure inside a gate's own arithmetic: "6,865" was matched,
   * parsed as 6 by a rule that rejected separators, and then discarded. The
   * number is now computed here, by the loop that produced the findings, from
   * the same Set the rows come from. It cannot disagree with the list. */
  const findingTotal = [...inventory.values()].reduce((n, claims) => n + claims.size, 0);
  console.log(
    `\n⚠ NOT VERIFIED — ${findingTotal} findings across ${inventory.size} content files assert controls ` +
      `that cannot be checked against this repository. These describe product lines built outside this repo; ` +
      `confirm each against its actual deployment before publishing (SYSTEM_AUDIT.md §29):`
  );
  for (const [file, claims] of [...inventory].sort()) {
    console.log(`\n  ${file}`);
    for (const c of [...claims].slice(0, 4)) console.log(`    · ${c}`);
    if (claims.size > 4) console.log(`    · …and ${claims.size - 4} more`);
  }
}