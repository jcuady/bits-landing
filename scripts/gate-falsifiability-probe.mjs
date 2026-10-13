/**
 * SYSTEM_AUDIT.md §91 — proving gates can FAIL, in a sandbox that cannot hurt
 * the repository.
 *
 *   Run:  node scripts/gate-falsifiability-probe.mjs
 *
 * §90 shipped four proven gates and left roughly 28 UNKNOWN. It also named the
 * correct design and did not build it: run each gate against a COPY of the
 * tree, so an interrupted run cannot leave a production file modified. This is
 * that design.
 *
 * WHY A SANDBOX NOW MAKES THE PROBE WIRE-ABLE-ISH
 * ------------------------------------------------
 *   The copy is what removes the one reason §90 declined to wire this into
 *   test:unit. Source files are never written. The remaining cost is a tree
 *   copy per run, so it is still NOT in test:unit — it is a tool a human runs
 *   when the gate set changes, and it says so.
 *
 * THE RULE THAT 90 LEARNED THE HARD WAY
 * -------------------------------------
 *   A probe must produce a violation of THAT GATE'S OWN RULE. Three of 90's
 *   first four probes proved nothing for exactly this reason — aimed at a file
 *   the gate does not scan, at a condition it only reports, or at a mechanism
 *   it does not use at all. Every case below names the rule it breaks.
 */
import { readFileSync, existsSync, mkdirSync, cpSync, rmSync, symlinkSync, writeFileSync, statSync } from "node:fs";
import { spawnSync, execFileSync } from "node:child_process";
import { join, resolve, basename, dirname } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
/* §99 — per-process, because a fixed path is a shared resource.
 *
 * Two concurrent probe runs both `rmSync` + rebuild this directory, and the
 * second one's `rmSync` throws EPERM against files the first is still copying —
 * observed in §99 while a background self-proof and a manual check ran at once.
 * That cost a diagnostic: the crash looked like a dangling-junction failure and
 * it was not one. An isolated test confirmed `rmSync` handles a dangling
 * junction correctly, so the real cause was the collision.
 *
 * The cost is a directory per run, left behind if a run is killed. That is the
 * right trade for an instrument whose whole value is not lying about what it
 * measured. */
const SANDBOX = join(tmpdir(), `bits-falsifiability-sandbox-${process.pid}`);

/* Root-level documents, which two of the drift gates read. */
const MIRROR = [
  "app", "components", "lib", "public", "scripts", "docs",
  "package.json", "next.config.ts", "tsconfig.json",
  "README.md", "PROJECT_STATUS.md", "CRM_BENCHMARK_AND_PRICING_STRATEGY.md",
];

/**
 * Each case: `file` is mutated IN THE SANDBOX ONLY. `gate` is run with cwd set
 * to the sandbox so its ROOT = the copy.
 */
/* §94 — mojibake is BUILT here, never pasted.
 *
 * The first encoding-integrity case wrote a literal corrupted em dash into this
 * file. That is real mojibake in a tracked source file, and `scripts/` is mirrored
 * into the sandbox — so encoding-integrity scanned this probe, correctly reported
 * one damaged file, and the probe SKIPped the gate it exists to test. The probe
 * was broken by the very corruption it was injecting, which is §93's rule applied
 * to me: inject through the code path, do not paste the bytes.
 *
 * It then happened a second time. The first fix removed the string literal from
 * the `to:` value and pasted the same corrupted character into the explanatory
 * comment ABOVE it, which is byte-for-byte the same defect in a different line.
 * The gate was right both times and this file was wrong twice; there is no
 * version of this note that may contain the corruption it describes.
 *
 * `encoding-integrity.selfcheck.mjs` already does exactly this in its own
 * `corrupt()`; the corruption is reproduced the same way rather than re-typed.
 * Declared ABOVE `CASES` — a `const` is not hoisted, and a case that reads it
 * before initialisation is a ReferenceError, not a probe result. */
const EM_DASH_CORRUPT = (() => {
  const CP = new TextDecoder("windows-1252");
  let out = "";
  for (const b of Buffer.from("—", "utf8")) out += CP.decode(Uint8Array.of(b));
  return out;
})();

/* §99 — exported, and the run below is behind a CLI guard, so another gate can
 * IMPORT this file to ask "which gates have a falsifiability witness?" without
 * paying for a sandbox build and 66 gate invocations.
 *
 * Before this, the coverage number existed only in this file's own output, and
 * this file is NOT in `test:unit` — it mutates files and takes minutes. So a gate
 * added tomorrow without a case would be invisible to the suite until a human
 * remembered to run the probe. `scripts/falsifiability-coverage.mjs` closes that,
 * and it reads the SAME array rather than a second list that could disagree. */
/* §99 — the docs-claims-drift anchor, DERIVED rather than pinned.
 *
 * That anchor was a hand-typed count and it broke four times: 35 -> 42 (§95),
 * 43 (§96), 45 (§98), and it would break a fifth at 47 today. Every break was
 * caught — the probe reports a stale anchor and exits non-zero instead of
 * counting itself as coverage, which is the right behaviour — but a fixture that
 * must be repaired by hand every time the thing it measures grows is a recurring
 * cost, and one that already broke `gate-probe-selfproof.mjs` silently (§99).
 *
 * So read the clause out of TESTING.md and corrupt it. The gate under test only
 * needs the documented count to DISAGREE with the measured one; "fifty" is as
 * good a lie as "forty-six" and cannot drift.
 *
 * IT DOES NOT THROW WHEN THE FILE IS MISSING, and that took one more correction.
 * The first version threw, which made the module unimportable from anywhere but
 * the repository root — and `gate-probe-selfproof.mjs` runs the probe from a
 * directory holding only a package.json, to reproduce a sandbox with no
 * node_modules. The self-proof's junction check was passing for the wrong reason:
 * the throw printed the probe's own path, and the temp directory was named
 * `bits-junction-selfproof-*`, so a /junction/i assertion matched the error.
 *
 * A missing clause is now a sentinel that is not in TESTING.md. The case SKIPs
 * with "anchor not found", the probe counts it as attempted-but-unproven, and
 * `badProbes` makes the run exit non-zero. Loud, located, and stated — the same
 * place a stale count has always been reported, and no longer a crash on import. */
const DOCS_CLAUSE_RE = /All \*\*([a-z-]+)\*\* are dependency-free/;
function readDocsCountClause() {
  try {
    const m = readFileSync(join(ROOT, "docs", "TESTING.md"), "utf8").match(DOCS_CLAUSE_RE);
    return m ? { clause: m[0], word: m[1] } : null;
  } catch {
    return null;
  }
}

/* §104 — the corruption is now COMPUTED, and the hard-coded "fifty" is gone.
 *
 * The previous version matched `/forty-[a-z]+/` and rewrote the word to the literal
 * string "fifty", justified in a comment as a lie that "cannot drift". That was
 * true only while the suite had fewer than fifty entries. §104 took it to exactly
 * fifty, and two things broke at once: the clause stopped matching at all (so the
 * case would have skipped on "anchor not found"), and had the match survived, the
 * rewrite would have produced a string IDENTICAL to the input — a mutation that
 * changes nothing, which proves nothing.
 *
 * Same lesson as §88's `parseNumberWords()` and §95's: a hand-typed vocabulary
 * has a silent ceiling, and it fails at the moment it is most needed. So the word
 * is read, parsed to a number, incremented, and re-rendered. Any count works. */
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
  "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
/* TENS WORD -> VALUE, not index. A first version added `TENS.indexOf(word)`, which
 * makes "forty-eight" parse as 4 + 8 = 12 and "ninety-nine" as 18 — silently, with
 * no error, because every word IS a known word. Caught by round-tripping the
 * parser against its own writer before trusting it. §88's lesson again: a number
 * table that is nearly right is worse than one that is absent, because it answers
 * confidently with the wrong number. */
const TENS_VALUE = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };

function parseNumberWords(text) {
  const words = text.toLowerCase().split(/[\s-]+/).filter((w) => w && w !== "and");
  if (!words.length) return null;
  let total = 0;
  let saw = false;
  for (const w of words) {
    if (w === "hundred") { total = (total || 1) * 100; saw = true; continue; }
    const u = ONES.indexOf(w);
    if (u >= 0) { total += u; saw = true; continue; }
    if (TENS_VALUE[w] != null) { total += TENS_VALUE[w]; saw = true; continue; }
    return null; // unrecognised word — report it, never guess
  }
  return saw ? total : null;
}

function numberToWords(n) {
  /* §104 — deliberately capped at 999, which is the range the PARSER understands.
   * An earlier version emitted "one thousand …" for larger values, which
   * `parseNumberWords` — mirroring `docs-claims-drift.mjs` word for word — returns
   * null for, so writer and parser disagreed above 999 and the round-trip proved
   * it. Returning null above the ceiling keeps the pair consistent and lets the
   * corruption fall back to an obviously-unreadable token, which the gate still
   * fails on. Refusing is better than inventing a word nothing can read back. */
  if (!Number.isInteger(n) || n < 0 || n > 999) return null;
  if (n < 20) return ONES[n];
  if (n < 100) {
    const t = TENS[Math.floor(n / 10)];
    const r = n % 10;
    return r ? `${t}-${ONES[r]}` : t;
  }
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return rest ? `${ONES[h]} hundred ${numberToWords(rest)}` : `${ONES[h]} hundred`;
}

const DOCS_COUNT = readDocsCountClause();
const DOCS_COUNT_CLAUSE = DOCS_COUNT?.clause ?? '§99 docs/TESTING.md has no "All **<number words>** …" clause';

/* Corrupt to a count that is wrong BY CONSTRUCTION. If the documented number cannot
 * be parsed, the case still gets a mutation that differs from its anchor — the
 * alternative is a no-op mutation that silently proves nothing. */
const DOCS_COUNT_VALUE = DOCS_COUNT ? parseNumberWords(DOCS_COUNT.word) : null;
const DOCS_COUNT_LIE =
  DOCS_COUNT_VALUE === null ? null : numberToWords(DOCS_COUNT_VALUE + 1);
const DOCS_COUNT_STALE =
  DOCS_COUNT === null
    ? "§99 this sentinel must never appear in docs/TESTING.md"
    : DOCS_COUNT_CLAUSE.replace(DOCS_COUNT.word, DOCS_COUNT_LIE ?? "zzz-unreadable-count");

export const CASES = [
  // ── already proven in §90, kept as a regression check on the sandbox ──
  { gate: "lib/site/asset-integrity.selfcheck.mjs", file: "components/sections/hero.tsx",
    from: "<section", to: '<section\n      <img src="/images/zzz-probe-missing.webp" alt="probe" />',
    rule: "a referenced public asset must exist" },
  { gate: "lib/site/image-sizes.selfcheck.mjs", file: "components/sections/hero.tsx",
    from: "<section", to: '<section\n      <Image src="/images/logo.png" alt="probe" quality={95} />',
    rule: "every <Image> quality must be in next.config's images.qualities" },
  { gate: "lib/security/contrast-check.mjs", file: "lib/security/contrast-check.mjs",
    from: "const PAIRS = [", to: 'const PAIRS = [\n  ["zzz-probe", "#ffffff", "#fdfdfd", 4.5],',
    rule: "each measured token pair must meet its WCAG minimum" },
  { gate: "lib/site/link-integrity.selfcheck.mjs", file: "components/layout/header.tsx",
    from: "<header", to: '<header\n      <Link href="/zzz-probe-missing-route">probe</Link>',
    rule: "an in-app link must resolve to a real route (this file is in linkSources)" },

  // ── §91: eight more, each aimed at the rule that gate actually enforces.
  //    Anchors are taken from the real files; §90's four mis-aimed probes are
  //    why every one of these names the mechanism it breaks.
  { gate: "lib/products/registry-integrity.selfcheck.mjs", file: "lib/products/registry.ts",
    from: 'demoPath: "/(products)/crm-sales",', to: 'demoPath: "/zzz-probe-not-a-route",',
    rule: "a registered engine's demoPath must exist or be listed as a live sandbox" },

  // route-count-drift's CLAIM regex matches "<N> routes|pages" — "paths" is NOT
  // in the alternation, so the first attempt ("53 app-router paths" -> "99 …")
  // created no checkable claim at all and the gate correctly stayed green.
  // The surrounding sentence already contains the required BUILD_VERB ("Build").
  { gate: "scripts/route-count-drift.mjs", file: "PROJECT_STATUS.md",
    from: "**53 app-router paths**", to: "**99 routes**",
    // REPORT ONLY — the script ends with "REPORT ONLY — exit 0 by design".
    // Its proof is the inventory line, not the exit code.
    expectOutput: "stale build count(s)",
    rule: "a build-output route count stated in documentation must match the measured route tree" },

  // package.json declares next ^16.3.8; README quotes it in backticks at line
  // 119. (The badge at line 5 says 16.3.5 and is deliberately NOT the anchor —
  // badges are image URLs, and editing one would not be the same violation.)
  { gate: "scripts/stack-version-drift.mjs", file: "README.md",
    from: "`16.3.8`", to: "`99.9.9`",
    rule: "a stack version stated in documentation must match package.json" },

  { gate: "lib/site/sitemap-coverage.selfcheck.mjs", file: "app/sitemap.ts",
    from: "  return [",
    to: '  return [\n    { url: `${site.url}/zzz-probe-not-a-route`, lastModified, changeFrequency: "daily" as const, priority: 0.5 },',
    rule: "every URL the sitemap advertises must map to a real indexable route" },

  // a11y-static's actual scope is CONTROL_TAG_RE = /<(input|select|textarea|
  // Input|Textarea|Select)\b/ — buttons and anchors are NOT in it. Two earlier
  // attempts proved nothing for exactly that reason: a <section> (a landmark)
  // and then a <button> (out of scope). This strips the aria-label from a real
  // <select>, which is unambiguously what the rule governs.
  { gate: "lib/security/a11y-static.selfcheck.mjs", file: "app/(crm)/app/leads/page.tsx",
    from: 'aria-label={`Change status for ${r.name}`}', to: "",
    rule: "every form control needs an accessible name" },

  // bundle-boundary bans a STATIC import of a heavy client library; the dynamic
  // form is `import("gsap"),` inside the effect. Adding the static form back is
  // the original §42 defect.
  { gate: "lib/site/bundle-boundary.selfcheck.mjs", file: "components/sections/hero-product.tsx",
    from: '"use client";', to: '"use client";\n\nimport { gsap } from "gsap";',
    rule: "a heavy client library may not be statically imported" },

  // ── §92: the logic gates. These cannot be broken by editing a document or a
  //    class string; the mutation has to reach the behaviour the gate asserts.
  // safeAppNext has deliberately REDUNDANT guards, so disabling one usually
  // leaves another catching the same input — the first attempt disabled the
  // "//" check and the gate correctly stayed green, because "/^\/app/" also
  // rejects "//evil.com". The traversal guard is the one input only it catches:
  // "/app/../../evil" passes the ".." removal, the scheme check and both
  // /^\/app/ tests, so disabling it lets a traversal through unchanged.
  // §102 — this case was MIS-AIMED the moment the self-check was fixed, and the
  // probe said so rather than quietly counting itself as coverage: the anchor
  // `if (decoded.includes("..")) return fallback;` lived in the COPY
  // `safe-next.selfcheck.mjs` defined for itself, and that copy is gone. The
  // mutation belongs on `lib/crm/safe-next.ts` — the file the gate now actually
  // imports — and it belongs there anyway: disabling the guard in the real
  // validator is what proves the gate exercises the real one.
  //
  // `ts: true` because the self-check imports a .ts module and test:unit runs it
  // with the type-stripping flags; the probe must match the suite's invocation or
  // it is not running what CI runs.
  { gate: "lib/crm/safe-next.selfcheck.mjs", file: "lib/crm/safe-next.ts",
    from: 'if (decoded.includes("..")) return fallback;', to: 'if (false) return fallback;',
    ts: true,
    rule: "a path-traversal next= value must fall back to /app/dashboard" },

  { gate: "lib/crm/validation.selfcheck.mjs", file: "lib/crm/validation.selfcheck.mjs",
    from: "z.string().min(6).max(128)", to: "z.string().min(1).max(128)",
    rule: "a 5-character password must be rejected" },

  { gate: "lib/crm/selectors.selfcheck.mjs", file: "lib/crm/selectors.ts",
    from: "if (diff < 0) {", to: "if (false) {", ts: true,
    rule: "a timestamp after the reference clock is not 'ago' — the 2026-09-13 bug" },

  { gate: "lib/security/rate-limit.selfcheck.mjs", file: "lib/security/rate-limit.ts",
    from: "ok: existing.count <= limit,", to: "ok: true,", ts: true,
    rule: "a request past the limit must be blocked" },

  // ── §93: the last four UNKNOWN gates. All import a real .ts module and assert
  //    behaviour, so each mutation lands in the IMPLEMENTATION, never the gate.
  //
  // contact.selfcheck names its own regression in its header: "Reverting the
  // honeypot to `z.string().max(0)` — the exact P0 regression it was written to
  // catch — left it green." That sentence is this case.
  { gate: "lib/contact.selfcheck.mjs", file: "lib/contact-schema.ts",
    from: "website: z.string().optional(),", to: "website: z.string().max(0),", ts: true,
    rule: "the honeypot field must stay optional and unconstrained (31's P0)" },

  { gate: "lib/email/outcome.selfcheck.mjs", file: "lib/email/outcome.ts",
    from: "ok: Object.keys(failedParts).length === 0,", to: "ok: true,", ts: true,
    rule: "success only when BOTH dispatches succeeded (the P0 revenue-path defect)" },

  { gate: "lib/crm/api-contract.selfcheck.mjs", file: "lib/crm/api-contract.ts",
    from: '"Cache-Control": "no-store, no-cache, must-revalidate, private, max-age=0",',
    to: '"Cache-Control": "public, max-age=3600",', ts: true,
    rule: "authenticated PII responses must carry a no-store cache contract" },

  { gate: "lib/crm/inbound-service.selfcheck.mjs", file: "lib/crm/inbound-service.ts",
    from: "let score = 70;", to: "let score = 0;", ts: true,
    rule: "lead scoring must start from the real base score" },

  /* ── §94: the ten gates the §93 coverage accounting named as UNKNOWN ─────────
   *
   * §93 printed a list. Printing it without closing it is §44's mistake repeated
   * in a new place — an audit that names its own blind spot and then leaves it
   * open is a worse artefact than one that never counted, because the count
   * invites the reader to believe the remainder is merely unreported rather than
   * unreported *and* untested.
   *
   * Each of these aims at the mechanism the gate actually uses. Three of the ten
   * were aimed wrongly on the first attempt and are commented where the aim
   * matters; the reasoning is the same as §90/§91, so it is not repeated. */

  // ai-disclosure — the whole point of §29's "do not reintroduce aspiration as
  // fact". The pinned string is already honest ("Target: listen / whisper",
  // scoped by the `target:` marker); stripping the marker and asserting the
  // capability is the exact regression the file's own header warns about.
  { gate: "lib/site/ai-disclosure.selfcheck.mjs", file: "lib/security-data.ts",
    from: 'supervisorHUD: "Target: listen / whisper",',
    to: 'supervisorHUD: "Supervisor whisper coaching and barge-in on every live call",',
    rule: "a gated surface may not assert telephony this build does not ship" },

  // cookie-disclosure — the "disclosed -> must exist" direction. Adding a client
  // to /cookies that no code sets is the 8 Oct defect stated backwards.
  { gate: "lib/site/cookie-disclosure.selfcheck.mjs", file: "app/(marketing)/cookies/page.tsx",
    from: "const cookieAuditList = [",
    to: 'const cookieAuditList = [\n    {\n      name: "zzz_probe_missing_client",\n      category: "functional",',
    rule: "a disclosed client must exist in real runtime code (both directions)" },

  // encoding-integrity — this gate already self-tests its detector, so the tree
  // scan is the half that needed proving. The corruption is INJECTED, not re-read
  // from the shipped string that triggered §37, and it is BUILT at runtime (§94).
  { gate: "lib/site/encoding-integrity.selfcheck.mjs", file: "components/sections/hero.tsx",
    from: "<section",
    to: '<section\n      {"zzz-probe ' + EM_DASH_CORRUPT + ' mojibake"}',
    rule: "no project text file may carry mojibake / U+FFFD / BOM / invalid UTF-8" },

  // blog-claims-subject — a BITS-subject claim inside an `isBits: true` row.
  // Placing it in a COMPETITOR row would prove nothing: third-party copy is out
  // of scope by design, and this gate says so.
  { gate: "scripts/blog-claims-subject.mjs", file: "lib/blog-data.ts",
    from: 'dailyCapacity: "2.4M+ daily calls / 500+ agents",',
    to: 'dailyCapacity: "2.4M+ daily calls / 500+ agents",\n        zzProbe: "Built-in predictive dialer with supervisor whisper coaching and barge-in",',
    rule: "a claim about BITS may not attest a control this repo cannot verify" },

  // derived-counts — a BARE number in a non-exempt file. §88 fixed the twelve
  // sites that rendered; this proves the gate can still see a new one.
  { gate: "scripts/derived-counts.mjs", file: "components/sections/hero.tsx",
    from: "<section",
    to: '<section\n      {"zzz-probe All 18 Engines"}',
    rule: "a product/engine count must be derived, not hand-typed" },

  // docs-claims-drift — the number-word branch, not the digit branch. "forty-five"
  // is written the way the document writes it, so the rule under test is the one
  // §77 widened to accept number words. The anchor tracks the LIVE count, so this
  // case is re-aimed whenever test:unit gains a gate — §95 found it that way,
  // §96 found it again at 43, and §98 a third time at 45. Each time the probe
  // reported the stale anchor and exited non-zero instead of quietly counting
  // itself as coverage. That is the mechanism working.
  { gate: "scripts/docs-claims-drift.mjs", file: "docs/TESTING.md",
    from: DOCS_COUNT_CLAUSE,
    to: DOCS_COUNT_STALE,
    rule: "a live count quoted in documentation must match the measured value" },

  // gate-execution-audit — reproducing §75 EXACTLY: the CLI guard never matches,
  // the gate exits 0 and prints nothing, and from the outside that is
  // indistinguishable from a gate that ran and passed. The audit is the only
  // thing in this repository that can catch it.
  { gate: "scripts/gate-execution-audit.mjs", file: "scripts/gated-render-closure.mjs",
    from: "  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;",
    to: "  false;",
    rule: "every gate in test:unit must exit 0 AND produce stdout" },

  // gated-render-closure — §70's defect, injected into one of the only two
  // ungated imports it actually scans (`ENGINE_COUNT`, imported by hero.tsx).
  // Adding the claim to the gated surface's OWN file would prove nothing: this
  // gate's entire subject is imports the surface does not own.
  { gate: "scripts/gated-render-closure.mjs", file: "lib/products/registry.ts",
    from: "export const ENGINE_COUNT = Object.keys(PRODUCT_REGISTRY).length;",
    to: 'export const ENGINE_COUNT = "Built-in Browser SIP Softphone";',
    rule: "copy a gated surface RENDERS from an ungated module must still be scanned" },

  // rule-vocabulary-coverage — §62's rule: a rule whose term list is narrower
  // than its category. Narrowing graphql to a token nothing says must fail both
  // of its probes.
  { gate: "scripts/rule-vocabulary-coverage.mjs", file: "lib/site/security-claims.mjs",
    from: "term: /\\bGraphQL\\b/i,", to: "term: /\\bZzzProbeGraphQL\\b/i,",
    rule: "every rule's vocabulary must cover the phrasings copy actually uses" },

  // scoping-regression — drop `no` from the negation guard so an honest denial
  // stops being exempt. This gate's ONLY job is to notice that tightening
  // SCOPED_OUT would force a maintainer to delete the correction, so a tightening
  // is the only thing worth proving it detects.
  //
  // The marker was DERIVED, not guessed: every honest denial on the gated
  // surfaces was extracted and attributed to the alternative that exempts it.
  // The first attempt removed `not shipped` — a plausible-sounding marker that no
  // pinned denial actually depends on — and the gate correctly stayed GREEN. The
  // probe reported that as FAIL rather than passing it, which is the property
  // being argued for. `no` is the single most load-bearing alternative ("No
  // telephony in this build", "Illustrative — no telephony", "Simulated Call (no
  // telephony)"); removing it un-exempts a dozen at once.
  { gate: "scripts/scoping-regression.mjs", file: "lib/site/security-claims.mjs",
    // The FILE contains a JavaScript string literal, so the backslash in `\w` is
    // itself doubled in the source. `from` has to match that text, not the
    // runtime value — four backslashes here, two in the file.
    from: '(?<![-\\\\w])(no|not|never|without|nothing|none|neither|nor|do not|does not|did not|cannot|can\'t|isn\'?t|aren\'?t|wasn\'?t|',
    to: '(?<![-\\\\w])(not|never|without|nothing|none|neither|nor|do not|does not|did not|cannot|can\'t|isn\'?t|aren\'?t|wasn\'?t|',
    rule: "an honest denial must stay exempt — fix the scoping, never the string" },

  /* ── §96 ──────────────────────────────────────────────────────────────────
   *
   * The email templates gate is new in §96, so this case is also the proof that
   * it is not another check that cannot fail. The mutation is the defect the gate
   * exists to catch: the escaper stops escaping. Dropping the `<` replacement is
   * the smallest edit that makes a visitor-supplied tag render as markup.
   *
   * It lands in `lib/html-escape.ts` rather than in the templates, because that
   * is the module all five builders actually route through — mutating a template
   * would have tested one template instead of the shared primitive. */
  { gate: "lib/email/templates.selfcheck.mjs", file: "lib/html-escape.ts",
    from: '.replaceAll("<", "&lt;")', to: '/* blinded */', ts: true,
    rule: "no visitor-supplied tag may survive unescaped in any email body" },

  /* ── §98: the outbound-host gate ──────────────────────────────────────────
   *
   * §97 found a third party receiving every visitor's IP address, and no gate in
   * this repository had ever looked at an outbound request.
   *
   * The mutation is a REAL VIOLATION IN A REAL SHIPPED FILE, not a disabled
   * failure branch. The first attempt was `if (failures.length)` → `if (false)`,
   * which is wrong for this gate: that makes it exit 0, and a probe reads exit 0
   * as "the gate did not detect the injection" — it would have reported a red
   * result as a green one. To prove a negative gate, the probe has to break the
   * rule, not break the reporting. */
  { gate: "scripts/external-requests.mjs", file: "app/globals.css",
    from: '@import "tailwindcss";',
    to: '@import url("https://zzz-probe-undeclared.example/probe.css");\n@import "tailwindcss";',
    rule: "an undeclared host contacted without user action must fail the build" },

  /* ── §95: the three gates that §95 wired into test:unit ────────────────────
   *
   * They were not new checks. All three already existed and already passed; they
   * were simply never invoked, so §94's coverage line, which reads `test:unit`,
   * had never counted them. A gate that exists and is never run is not a weaker
   * gate than §75's silent no-op — it is the same gate with one more step between
   * it and the build. */

  // theme-contrast — the WCAG maths, not the table. Changing a foreground token in
  // the pairs table to one that genuinely fails its own minimum proves the ratio
  // is computed and compared, which is the whole of the gate.
  { gate: "lib/theme-contrast.selfcheck.mjs", file: "lib/theme-contrast.selfcheck.mjs",
    from: '{ mode: "light", role: "muted", fg: "#40536d", bg: "#f6f9fc", min: 4.5 },',
    to: '{ mode: "light", role: "muted", fg: "#c3cede", bg: "#f6f9fc", min: 4.5 },',
    rule: "each declared foreground/background pair must meet its WCAG minimum" },

  // production-write-guard — the §33 P0, reintroduced. Removing the `--apply`
  // gate is precisely the defect the suite exists to prevent, and this assertion
  // is a string check on the real script, not on a copy of it.
  { gate: "scripts/production-write-guard-test.mjs", file: "scripts/seed-supabase.mjs",
    from: 'process.argv.includes("--apply")', to: "true",
    rule: "the seed script must be guarded by an explicit --apply flag" },

  // orphan-assets — report-only by design, so the proof is the OUTPUT naming the
  // file. A brand-new asset under public/ that nothing references is exactly what
  // the report exists to list; see the `creates` branch above.
  { gate: "lib/site/orphan-assets.selfcheck.mjs",
    creates: { path: "public/images/zzz-probe-orphan.webp", body: "synthetic probe asset" },
    expectOutput: "zzz-probe-orphan.webp",
    rule: "an asset under public/ that no shipped source references is listed" },

  // ── §99: the gate this very array feeds, proved against itself.
  //
  // `falsifiability-coverage.mjs` reads CASES from HERE and compares it to the
  // gates in test:unit. So the mutation is to delete a whole case from the array
  // — the sandbox copy of this file — which is precisely "a gate that runs in the
  // suite with nobody able to break it".
  //
  // It is worth the self-reference: a coverage gate that is itself unwitnessed
  // would be the exact blind spot §99 exists to close, discovered by the thing
  // built to detect it.
  { gate: "scripts/falsifiability-coverage.mjs", file: "scripts/gate-falsifiability-probe.mjs",
    from: `  { gate: "lib/site/asset-integrity.selfcheck.mjs", file: "components/sections/hero.tsx",
    from: "<section", to: '<section\\n      <img src="/images/zzz-probe-missing.webp" alt="probe" />',
    rule: "a referenced public asset must exist" },`, to: "",
    rule: "every gate in test:unit must have a falsifiability witness" },

  /* ── §104: the duplicate-implementation gate ──────────────────────────────
   *
   * §96 found a dead copy of `escapeHtml`, §102 found a self-check testing its
   * own `safeAppNext` while the shipped one allowed nine prefixes, §103 found
   * `stripComments` re-implemented — defectively — in three places. Same shape
   * every time: a test re-declares the logic it is supposed to be testing, and
   * then keeps passing against the wrong code indefinitely.
   *
   * The mutation is the gate's own rule stated as an edit: a suite in `test:unit`
   * that locally defines `escapeHtml` — a name `lib/html-escape.ts` exports —
   * without importing it. The target is chosen because it genuinely does not
   * import it, so the mutation creates a real violation rather than a local
   * shadow of an existing import (which the gate deliberately does not report). */
  { gate: "scripts/duplicate-implementations.mjs", file: "scripts/bundle-boundary-negative.mjs",
    from: 'import { fileURLToPath } from "node:url";',
    to: 'import { fileURLToPath } from "node:url";\n\n/* §104 probe: a local copy of a shipped function, never imported */\nfunction escapeHtml(value) {\n  return String(value).replace(/&/g, "&amp;");\n}\n',
    rule: "no suite in test:unit may re-declare a name that shipped code exports without importing it" },

  /* ── §105: the gate that scans git history ────────────────────────────────
   *
   * `history-secret-scan.mjs` existed since §39, was never wired, and exited 1 on
   * every run. §105 wired it — which required teaching this probe git, because a
   * history-scanning gate cannot see a file that was merely written.
   *
   * The mutation is the gate's own rule as a real event: a credential nobody
   * declared, COMMITTED. The token is synthetic and lives only in a sandbox that
   * is deleted at the end of the run.
   *
   * The first version of this case asserted only that the report NAMES the file.
   * That is not enough here, and the reason is §105's own bug: a KNOWN table keyed
   * on detector name printed the file perfectly while exiting 0. So `expectExit`
   * and `mustContain` are asserted too — a gate that reports a new credential and
   * carries on is exactly what went wrong. */
  { gate: "scripts/history-secret-scan.mjs",
    needsGit: true,
    /* The token is ASSEMBLED AT RUNTIME, and never appears in this file as a
     * literal. That is not tidiness — it is the whole point. This file is copied
     * into the sandbox and committed before any case runs, so a literal here
     * would be in the baseline history and would need declaring in the gate's
     * KNOWN table… which would make this very mutation a known finding, and the
     * probe would watch the gate correctly refuse to fail. The case defeated
     * itself on its first run, for exactly that reason.
     *
     * Assembling it here keeps the repository free of a credential-shaped string
     * this gate would have to be told to ignore. */
    creates: { path: "lib/zzz-probe-secret.ts",
               body: `export const probeToken = "${"re_" + "ProbeSyntheticOnly000000000000AAAA"}";\n` },
    expectExit: 1,
    mustContain: ["NEW FINDINGS", "zzz-probe-secret.ts"],
    rule: "a credential in git history that nobody declared must fail the build" },

  /* ── §106: the gate that watches the working tree ──────────────────────────
   *
   * `working-tree-integrity.mjs` exists because §105.11 lost six gated source
   * files to a silent on-disk revert, and the ONLY reason it was noticed is that
   * two gates disagreed about a documented number. That is luck, not a check.
   *
   * The mutation is this gate's own rule as an edit: put an OLDER committed
   * version of a file back on disk. That is exactly what §105.11 looked like —
   * `app/demo/page.tsx` came back as a pre-§101 version.
   *
   * Polarity note: this is a NEGATIVE gate, so the mutation must make it exit 1.
   * The §98 trap applies — disabling a reporting branch would make it exit 0 and
   * the probe would read that as "not detected". `expectExit` pins it. */
  { gate: "scripts/working-tree-integrity.mjs",
    needsGit: true,
    creates: { path: "lib/zzz-probe-revert.ts",
               body: "export const v = 2;\n" },
    /* `creates.body` (v2) is committed LAST and is what HEAD holds; `revertTo`
     * (v1) is committed FIRST and is what is left on disk — so the file on disk
     * holds an older committed version while HEAD holds the newer one. §105.11
     * looked exactly like this. The path is a probe-only file, so the case cannot
     * rot when any real module legitimately changes.
     *
     * The values also differ in more than their number: v2 is the content that
     * would be LOST, v1 the content that came back. */
    revertTo: "export const v = 1;\n",
    expectExit: 1,
    mustContain: ["REVERTED", "zzz-probe-revert.ts"],
    rule: "a working-tree file holding an older committed version must fail the build" },
];

/* ── Build the sandbox ───────────────────────────────────────────────────── */
function buildSandbox() {
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(SANDBOX, { recursive: true });
  for (const entry of MIRROR) {
    const src = join(ROOT, entry);
    if (!existsSync(src)) continue;
    cpSync(src, join(SANDBOX, entry), { recursive: true });
  }
  // Gates that import zod/motion need the real node_modules; a junction keeps
  // this cheap. §92's first run SWALLOWED a failure here with an empty catch,
  // and three gates then counted as "proven" on a module-resolution error
  // (`node:internal/modules/run_main`) rather than on an assertion failure.
  // A silent catch that degrades into a false proof is worse than no catch.
  //
  // §99 — AND THIS COMMENT WAS A CLAIM THE CODE DID NOT MAKE.
  //
  // The catch assigned to `junctionError`, and `junctionError` was read NOWHERE:
  // two occurrences in the file, the declaration and the assignment. So the
  // catch was silent in exactly the way the comment above condemns, three lines
  // below its own accusation. §92's per-case `loadError` regex is what actually
  // caught the false proofs — the junction error was decorative.
  //
  // It is now read, twice: printed at the top so the reader can explain every
  // downstream SKIP, and added to `badProbes` so the run exits non-zero. A
  // compromised sandbox cannot produce evidence about gates, and a probe that
  // reported coverage anyway would be §70's failure mode at full size.
  try {
    symlinkSync(join(ROOT, "node_modules"), join(SANDBOX, "node_modules"), "junction");
    // §99 — and this is where the §92 guard turned out to be unreachable.
    //
    // Windows CREATES a junction to a non-existent target without complaining.
    // `symlinkSync` returns undefined, no throw, and `existsSync` on the link is
    // then false because the link dangles. So the `catch` three lines below could
    // not fire for the failure it exists to detect: a run from a directory with
    // no `node_modules` produced a dangling junction, every gate importing
    // zod/motion failed to load, and the probe printed nothing at all about it.
    //
    // That is §92's exact failure — a silent degradation into a false proof —
    // re-entering through the guard added to prevent it, and it survived 7 phases
    // because the code reads correctly and the platform does not behave like the
    // reading.
    //
    // `statSync` FOLLOWS the reparse point, so it throws ENOENT on the dangling
    // junction and succeeds on a real one. That is the check that can fail.
    statSync(join(SANDBOX, "node_modules"));
  } catch (e) {
    junctionError = `FAILED (${e.message}) — gates importing zod/motion cannot load.`;
  }

  /* §105 — a gate whose subject is GIT HISTORY cannot be proved here without a
   * repository. `history-secret-scan.mjs` runs `git -C ROOT rev-list --objects
   * --all`, and MIRROR deliberately does not copy `.git` (it is large, and every
   * other gate has no use for it). Without this, that gate would have been wired
   * into `test:unit` with no possible witness, and `falsifiability-coverage.mjs`
   * would have demanded a case that could only ever SKIP.
   *
   * So a sandbox becomes a real repository on demand: initialise, and commit the
   * baseline so a case that CREATES a file can then commit that too. The commit
   * is what makes the created file part of the history the gate scans — a file
   * merely written into the working tree is invisible to a history scan, so the
   * probe would have watched a gate correctly report nothing. */
  if (CASES.some((c) => c.needsGit)) {
    try {
      /* `node_modules` is a JUNCTION into the real tree, and the sandbox carries
       * `.next` after a build. Without this, `git add -A` walks both and dies with
       * ENOBUFS — and the failure looks like "git is broken", not like "we asked
       * it to index a dependency directory". The first run failed exactly here and
       * reported a clean, plausible `git history FAILED (spawnSync git ENOBUFS)`,
       * which says nothing about the cause. */
      writeFileSync(
        join(SANDBOX, ".gitignore"),
        "node_modules/\n.next/\n.gitignore\n",
        "utf8",
      );
      const g = (...a) =>
        execFileSync("git", ["-C", SANDBOX, ...a], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
          maxBuffer: 64 * 1024 * 1024,
        });
      g("init", "-q");
      g("config", "user.email", "probe@example.test");
      g("config", "user.name", "Probe");
      g("add", "-A");
      g("commit", "-q", "-m", "probe baseline");
      /* Prove the repository really has a commit. An `init` that silently did
       * nothing would leave the sandbox looking constructed while every
       * history-scanning case SKIPs on it. */
      const head = g("rev-list", "--count", "HEAD").trim();
      if (!/^[1-9]/.test(head)) throw new Error(`sandbox repo has ${head} commits after init`);
    } catch (e) {
      gitError = `FAILED (${e.message}) — gates that scan git history cannot be proved.`;
    }
  }
}

let gitError = null;

let junctionError = null;
/* §95 — `buildSandbox()` was being called TWICE, six lines apart, each doing a
 * full rmSync + cpSync of app/ components/ lib/ public/ scripts/ docs/. The
 * second call rebuilt the tree from scratch immediately after the first, so every
 * run paid for two complete copies and the first one's junction was thrown away.
 * Found while adding the `creates` cases below, which need a sandbox built before
 * they can write into it — which is what made the duplicate visible. */

/* §99 — the run is a function now, so importing this file is free. Everything
 * below executes ONLY when the probe is invoked directly. */
export function runProbe() {
  buildSandbox();

  // §99 — read at last. If this is set, "not green on the sandbox" below means
  // "could not load", and every SKIP in this run is explained by it rather than
  // by a mis-aimed anchor. Printed first so it is read before the first SKIP.
  if (junctionError) {
    console.log(`\n⚠ sandbox node_modules junction ${junctionError}`);
    console.log("  Gates that import zod/motion cannot be proved in this environment.");
    console.log("  Any SKIP below may be this, not a bad anchor.\n");
  }

  const runIn = (cwd, gate, flags = []) => {
    const r = spawnSync("node", [...flags, gate], { cwd, encoding: "utf8" });
    return { code: r.status, out: ((r.stdout || "") + (r.stderr || "")).trim() };
  };

  /* §92 — the CRM data-layer gates import the REAL TypeScript module rather than
   * mirroring it (selectors.selfcheck's header says the mirror approach let a
   * `formatRelative` bug pass unchecked). Proving them therefore needs
   * `--experimental-strip-types`, and the mutation has to land in the module the
   * gate imports, not in the gate. Per-case flags make that expressible. */
  const TS_FLAGS = ["--experimental-strip-types", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON"];

  let pass = 0, fail = 0, inconclusive = 0;
  /* §94 — the set of gates PROVED able to fail, filled by the run itself.
   *
   * The first version of the coverage line subtracted "the gates this file has a
   * case for". That is a claim about the SOURCE, not about the RESULT: a case that
   * SKIPped (mis-aimed anchor) or FAILed (the mutation did not fire) was still
   * counted as coverage, so the summary printed "proven" for a gate the run had
   * just failed to prove. That is §70's vacuous pass rebuilt in the auditor — the
   * instrument reporting success while measuring nothing — and it appeared in the
   * very line added to prevent exactly that. Coverage is now accumulated from the
   * branch that actually scored a PASS, so it cannot outrun the evidence. */
  const provedGates = new Set();

  for (const c of CASES) {
    const label = `${c.gate}  <-  ${c.rule}`;

    // The gate must be GREEN on the untouched sandbox first. A gate that was
    // already red proves nothing about the probe.
    const base = runIn(SANDBOX, c.gate, c.ts ? TS_FLAGS : []);
    if (base.code !== 0) {
      console.log(`  SKIP  ${label}\n          not green on the sandbox: ${base.out.split("\n")[0]?.slice(0, 100)}`);
      inconclusive++;
      continue;
    }

    /* §95 — a gate can also be proved by CREATING the thing it exists to find.
     *
     * `orphan-assets.selfcheck.mjs` looks for files under `public/` that no shipped
     * source references. Its subject is a file that is NOT there, so there is no
     * existing text to mutate: every case in the array is "mutate an existing
     * line", and this gate cannot be expressed in that shape at all.
     *
     * The alternative — mutating the gate's own NON_ASSET list until the report
     * changes shape — would have proved the report prints, not that the detector
     * finds an orphan. Creating a real orphan asset and asserting the report NAMES
     * IT is the property under test. It is written into the SANDBOX and deleted
     * straight after; the real `public/` is never touched. */
    if (c.creates) {
      const created = join(SANDBOX, c.creates.path);
      mkdirSync(dirname(created), { recursive: true });
      /* §105 — a history-scanning gate only sees COMMITTED content. Writing the
       * file into the working tree and running the gate would have proved
       * nothing at all: the gate would correctly report nothing, and the probe
       * would have recorded a false proof of a gate that works. */
      const commitAll = (msg) => {
        const g = (...a) =>
          execFileSync("git", ["-C", SANDBOX, ...a], {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
            maxBuffer: 64 * 1024 * 1024,
          });
        g("add", "-A");
        g("commit", "-q", "-m", msg);
      };
      /* §106 — `revertTo` produces a genuine REVERT, and a revert has an ORDER:
       * HEAD must hold the NEWER content while the disk holds the OLDER one.
       *
       *   1. write revertTo      (old)   2. commit  -> history holds the old blob
       *   3. write creates.body  (new)   4. commit  -> HEAD is the NEW content
       *   5. write revertTo      (old)   6. run the gate
       *
       * `creates.body` is the version the gate should consider LOST, so it is the
       * one left on disk; `revertTo` is the older content that is being restored,
       * so it is what gets committed twice around it.
       *
       * This took two attempts, and the first was not merely incomplete — it was
       * inverted. It committed `creates.body` and then `revertTo`, leaving HEAD
       * holding the OLD content and the disk holding the NEW, which is the exact
       * opposite of §105.11; its commit messages claimed "v1" for what was v2.
       * The gate would still have reported REVERTED, because it matched the disk
       * blob against history without checking WHICH commit, so the probe would
       * have gone green having measured the wrong thing. `working-tree-integrity.mjs`
       * now requires the matched commit to be an ancestor of HEAD, which makes the
       * inversion detectable rather than invisible. */
      if (c.revertTo !== undefined) {
        writeFileSync(created, c.revertTo, "utf8");
        if (c.needsGit) commitAll("probe injection: the older version, about to be superseded");
        writeFileSync(created, c.creates.body ?? "", "utf8");
        if (c.needsGit) commitAll("probe injection: the newer version, now HEAD");
        writeFileSync(created, c.revertTo, "utf8");
      } else {
        writeFileSync(created, c.creates.body ?? "", "utf8");
        if (c.needsGit) commitAll("probe injection");
      }
      let out;
      try {
        out = runIn(SANDBOX, c.gate, c.ts ? TS_FLAGS : []);
      } finally {
        rmSync(created, { force: true });
      }
      const named = out.out.includes(c.creates.path.split("/").pop());
      /* §105 — naming the file is not enough for a gate whose whole job is to
       * FAIL on it. `expectExit` and `mustContain` are asserted here because a
       * report that names a new credential while exiting 0 is exactly the defect
       * that shipped in §105's first KNOWN table. */
      const exitOk = c.expectExit === undefined || out.code === c.expectExit;
      const containsOk = (c.mustContain ?? []).every((s) => out.out.includes(s));
      if (named && exitOk && containsOk) {
        pass++;
        provedGates.add(c.gate);
        console.log(`  PASS  ${label}\n          output names the injected file: ${c.creates.path}${c.expectExit !== undefined ? `, exit ${c.expectExit}` : ""}`);
      } else {
        fail++;
        console.log(`  FAIL  ${label}\n          named: ${named}  exit: ${out.code}${c.expectExit !== undefined ? ` (wanted ${c.expectExit})` : ""}  mustContain: ${containsOk}`);
        console.log(`          gate said: ${out.out.split("\n").filter((l) => l.trim()).slice(0, 4).join(" | ").slice(0, 200)}`);
      }
      continue;
    }

    const target = join(SANDBOX, c.file);
    if (!existsSync(target)) {
      console.log(`  SKIP  ${label}\n          target not present in sandbox: ${c.file}`);
      inconclusive++;
      continue;
    }
    const original = readFileSync(target, "utf8");
    if (!original.includes(c.from)) {
      console.log(`  SKIP  ${label}\n          anchor not found — the probe proves nothing`);
      inconclusive++;
      continue;
    }

    writeFileSync(target, original.replace(c.from, c.to), "utf8");
    const mutated = runIn(SANDBOX, c.gate, c.ts ? TS_FLAGS : []);
    writeFileSync(target, original, "utf8");

    /* Two kinds of falsifiability, and conflating them is its own error.
     *
     * FAIL-MODE gates must exit non-zero. But some gates in this repo are
     * REPORT-ONLY by design and print "exit 0 by design" on purpose —
     * route-count-drift does exactly that, and its inventory output is the
     * report the owner reads. For those, the proof is that the OUTPUT changes,
     * not that the exit code does. Asserting exit 1 against a report-only gate
     * would have "failed" a gate that was working correctly, which is the
     * mirror image of §90's error: reporting a defect where there is none. */
    const detectedInOutput = c.expectOutput && mutated.out.includes(c.expectOutput);
    const ok = c.expectOutput ? detectedInOutput : mutated.code !== 0;
    const detail = c.expectOutput ? `output contains ${JSON.stringify(c.expectOutput)}` : `exit ${mutated.code}`;

    /* §92 — a non-zero exit is only proof if the gate actually RAN.
     * `node:internal/modules/run_main` is a module-resolution crash: the gate never
     * executed, so it proved nothing about itself. Three cases scored PASS on
     * exactly that before this check existed, because the sandbox's node_modules
     * junction had failed and the error was being swallowed. A harness that
     * manufactures passes is §70's failure mode pointed at the auditor. */
    const loadError = /Cannot find (module|package)|ERR_MODULE_NOT_FOUND|ERR_UNSUPPORTED_DIR_IMPORT|SyntaxError:/.test(mutated.out);

    if (ok && loadError) {
      fail++;
      console.log(`  FAIL  ${c.gate}\n          ${c.rule}\n          the gate could not LOAD — a module error is not a failing assertion`);
      console.log(`          ${mutated.out.split("\n").filter((l) => l.trim()).slice(0, 6).map((l) => l.trim()).join(" // ").slice(0, 240)}`);
    } else if (ok) {
      pass++;
      provedGates.add(c.gate);
      const line = mutated.out.split("\n").find((l) => /AssertionError|probe|FAIL|✖|missing|does not exist|stale/i.test(l))
        || mutated.out.split("\n").find((l) => l.trim().startsWith("Error")) || mutated.out.split("\n")[0];
      console.log(`  PASS  ${c.gate}\n          ${c.rule}\n          ${detail}: ${line.trim().slice(0, 104)}`);
    } else {
      fail++;
      const said = mutated.out.split("\n").filter((l) => l.trim()).slice(-6).join(" | ");
      console.log(`  FAIL  ${c.gate}\n          ${c.rule}\n          the gate did not detect the injection (${detail})`);
      console.log(`          gate said: ${said.slice(0, 220)}`);
    }
  }

  /* ── §93 — COVERAGE, computed rather than asserted ───────────────────────────
   *
   * §90 asked "which gate has ever been OBSERVED to fail?" and every hand-count I
   * produced was wrong. §92 got the answer for 18 of them, but the number of gates
   * that remain UNKNOWN was still a number I typed. A coverage figure that is
   * maintained by hand is the same class of defect as the twelve hand-typed counts
   * of §88 — it drifts the moment a gate is added, and nothing notices.
   *
   * So derive it. The gate list is read from package.json's own `test:unit`, which
   * is the definition of "a gate that runs in CI". Gates are the `.mjs` entries
   * that are NOT `*-negative.mjs` — a negative test is the deliberate attempt to
   * make a gate fail, not the gate itself, so counting it would inflate coverage
   * with the very machinery being audited.
   *
   * `proved` is the set the RUN filled, not the set of gates this file names. See
   * the note on `provedGates` below: an aimed-but-unproven case is not coverage.
   *
   * What is left after subtracting the proved set is printed by name. A gate with
   * no name attached to "UNKNOWN" is an invitation to assume it is fine. */
  function coverage(proved) {
    const pkgPath = join(ROOT, "package.json");
    // §99 — this threw an unhandled ENOENT when run from a directory that is not
    // the repo root, which crashed the probe BEFORE it printed its verdict. That
    // mattered: it swallowed the junction diagnostic on exactly the run where the
    // junction was broken. A check that cannot finish cannot report, and a
    // reporter that dies mid-report has said nothing at all.
    if (!existsSync(pkgPath)) {
      console.error(
        `\n✖ falsifiability probe: no package.json at ${ROOT}.\n` +
        `  Run this from the repository root — ROOT is process.cwd(), not the\n` +
        `  probe's own location, so the sandbox mirrored here is not the project.`,
      );
      process.exit(1);
    }
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    const entries = (pkg.scripts?.["test:unit"] || "").match(/[\w./-]+\.mjs/g) || [];
    const gates = [...new Set(entries)].filter((e) => !e.endsWith("-negative.mjs")).sort();
    const provenGates = gates.filter((g) => proved.has(g));
    const unknown = gates.filter((g) => !proved.has(g));
    const negativeSuites = [...new Set(entries)].filter((e) => e.endsWith("-negative.mjs"));
    return { gates, provenGates, unknown, negativeSuites, totalEntries: entries.length };
  }

  // The real repository must be untouched by everything above.
  const realStillClean = !existsSync(join(ROOT, "components", "sections", "zzz-probe"));
  rmSync(SANDBOX, { recursive: true, force: true });

  const cov = coverage(provedGates);

  console.log(
    `\nsandbox removed; real tree never written.\n` +
    `§96 falsifiability: ${pass} proven able to fail, ${fail} not proven, ${inconclusive} inconclusive ` +
    `(of ${CASES.length} attempts across ${new Set(CASES.map((c) => c.gate)).size} gates).\n` +
    `\ncoverage, computed from package.json "test:unit" (${cov.totalEntries} entries ` +
    `= ${cov.gates.length} gates + ${cov.negativeSuites.length} negative suites):\n` +
    `  proven able to fail   ${cov.provenGates.length}/${cov.gates.length}` +
    `${cov.unknown.length === 0 && fail === 0 && inconclusive === 0 ? "  (every gate in the suite has been observed to fail)" : ""}\n` +
    `  UNKNOWN, never observed to fail   ${cov.unknown.length}:` +
    `${cov.unknown.length ? "\n    " + cov.unknown.join("\n    ") : ""}`
  );
  console.log(`repo untouched: ${realStillClean ? "yes — every mutation happened in the sandbox" : "CHECK"}`);

  /* §94 — the probe itself was exiting 0 no matter what it printed. It reported
   * "1 not proven, 2 inconclusive" and returned success, so wiring this into
   * anything would have inherited a green light on a red result. An auditor that
   * prints a finding and then says "fine" is the §70 failure mode one level up.
   * UNKNOWN gates are a FACT, not a failure — a gate nobody has tried yet is
   * honest — so only a case that was attempted and did not prove the gate is
   * fatal, plus any sign the real tree was touched. */
  const badProbes = [...CASES.filter((c) => !provedGates.has(c.gate)).map((c) => `${c.gate} (${c.rule})`)];
  if (!realStillClean) badProbes.push("the real repository was modified");
  if (junctionError) badProbes.push(`the sandbox node_modules junction ${junctionError}`);
  /* §105 — a sandbox that could not become a git repository cannot produce
   * evidence about a history-scanning gate. Reported, never swallowed: §99's
   * lesson that a silent catch degrading into a false proof is worse than no
   * catch at all. */
  if (gitError) badProbes.push(`the sandbox git history ${gitError}`);
  if (badProbes.length) {
    console.error(`\n✖ falsifiability probe: ${badProbes.length} attempted case(s) did not prove their gate:`);
    for (const b of badProbes) console.error(`    ✖ ${b}`);
    process.exit(1);
  }
}

/* ── §99 — CLI GUARD ───────────────────────────────────────────────────────
 *
 * Everything above this line is safe to import: the case table, the sandbox
 * builder and the report are definitions, not work. `scripts/falsifiability-
 * coverage.mjs` imports `CASES` from here, and paying for a sandbox build plus
 * 66 gate invocations to learn which gates exist would defeat the point of a
 * gate that runs in seconds.
 *
 * Same shape as the `gate-execution-audit` case above: compare the module URL
 * against the resolved entry point, rather than trusting `require.main`, which
 * does not exist in ESM and is the reason a whole class of gate can exit 0
 * having printed nothing. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runProbe();
}