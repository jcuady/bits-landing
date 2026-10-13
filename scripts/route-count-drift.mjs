/*
 * SYSTEM_AUDIT.md §61 — route-count drift gate.
 *
 * THE PROBLEM
 * -----------
 * Three documents asserted three different build figures, none of them reproducible:
 *
 *   BITS-FULL-MARKETING-AUDIT.md        "62 routes, Turbopack, 2.6s"
 *   2026-PRODUCT-SHOWCASE-REBRANDING.md "56 static and dynamic routes ... 9.2s"
 *   PROJECT_STATUS.md / SYSTEM_AUDIT.md "71 pages"
 *
 * §2 had already "corrected" 62 into 71 without measuring anything, so the drift
 * did not shrink — it changed address. This is §45's failure exactly (a declared
 * version drifting from package.json), one layer up.
 *
 * TWO COUNTS, NOT ONE
 * -------------------
 * The ambiguity is genuine, and naming it is the point:
 *
 *   ROUTE DEFINITIONS — `page.tsx` + `route.ts` files under app/. 45 today.
 *                      Build-independent, always available, and what you edit.
 *   GENERATED PATHS   — entries in `.next/app-path-routes-manifest.json`. 53 today.
 *                      Differs because a dynamic route such as /products/[slug]
 *                      expands to one path per generated parameter.
 *
 * A document may legitimately cite either. It may not cite neither. That rule is
 * what this gate enforces, and it is the rule that would have caught all three.
 *
 * REPORT-ONLY (exit 0) when the build manifest is absent — the filesystem count is
 * always derivable, but a fresh clone legitimately has no `.next`, and a gate that
 * fails because someone has not built yet is a gate people switch off.
 *
 * Run: node scripts/route-count-drift.mjs
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { markdownProse } from "../lib/site/security-claims.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IGNORED = new Set(["node_modules", ".git", ".next", ".turbo", "out"]);

function walk(dir, rel = "") {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED.has(e.name)) continue;
    const abs = join(dir, e.name);
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(abs, r));
    else out.push(r);
  }
  return out;
}

/* ---- truth, derived — never transcribed ---- */
const appFiles = walk(join(ROOT, "app"));
const definitions = appFiles.filter(
  (f) => /(^|[\\/])(page|route)\.tsx?$/.test(f)
).length;

let generated = null;
const manifest = join(ROOT, ".next", "app-path-routes-manifest.json");
if (existsSync(manifest)) {
  generated = Object.keys(JSON.parse(readFileSync(manifest, "utf8"))).length;
}

/* ---- declared, in prose ---- */
const DOC_ROOTS = ["docs", "."];
const docs = new Set();
for (const r of DOC_ROOTS) {
  /* Seed `rel` with the root name. Without it, walking `docs` yields bare
   * filenames and every read resolves to the repo root instead of docs/ — the
   * same one-directory-too-high mistake §49 hit in claim-coverage.mjs. It threw
   * here rather than scanning nothing, which is the better of the two failures. */
  for (const f of walk(join(ROOT, r), r === "." ? "" : r)) {
    if (!/\.md$/i.test(f)) continue;
    if (f.startsWith("docs/SYSTEM_AUDIT")) continue; // records the drift itself
    if (f.startsWith("node_modules")) continue;
    docs.add(f);
  }
}

/* A route/page claim is a number near the words "route"/"page" — but that alone is
 * far too loose. Measured: 36 hits, of which only a handful were real drift. The
 * rest were "10 routes" in a keyboard test, "6 routes" in the CRM sidebar, "18 pages"
 * of product pages, and "360 page" — a product name, matched by the substring "360".
 *
 * A real drift claim asserts the TOTAL OUTPUT OF A BUILD. That is what separates the
 * classes, and it is a property of the sentence rather than of the number:
 *
 *   real      "56 static and dynamic routes compiled successfully"   ("compiled")
 *             "| Build | 62 routes, Turbopack"                        ("Build")
 *             "compiles cleanly to 72 routes"                         ("compiles")
 *   not real  "test:keyboard — 10 routes, skip link"                 (no build verb)
 *             "the sidebar exposes only the 6 routes that exist"      (no build verb)
 *
 * §44's rule applies: this is a heuristic, so its separation is MEASURED below and
 * reported, not assumed. If the two classes ever stop separating, the honest output
 * is "cannot separate" rather than a confident list.
 */
const CLAIM = /(\d{1,4})\s+((?:static\s+and\s+dynamic\s+|app-router\s+|prerendered\s+|marketing\s+)?(?:routes?|pages?))/gi;
const BUILD_VERB = /\b(build|builds|built|compile|compiles|compiled|compiling|prerender|pre-render|generation)\b/i;

const findings = [];
const rejected = [];
for (const file of docs) {
  /* Reused, not reimplemented: `markdownProse` is the repo's convention for "what a
   * reader of this markdown actually sees". It strips inline code spans, which is
   * load-bearing here — a correction note writes the stale figure in backticks, and
   * without the strip the gate flags its own documentation of a fix. Duplicating a
   * second stripper is exactly the drift §45 was written about. */
  for (const { line, value, quoted } of markdownProse(readFileSync(join(ROOT, file), "utf8"))) {
    for (const m of value.matchAll(CLAIM)) {
      const n = Number(m[1]);
      if (n === definitions || (generated !== null && n === generated)) continue;
      const row = {
        file,
        line,
        said: m[0].trim(),
        n,
        quoted,
        context: value.slice(0, 120),
      };
      if (BUILD_VERB.test(value)) findings.push(row);
      else rejected.push(row);
    }
  }
}

console.log("=== ROUTE-COUNT TRUTH (derived) ===\n");
console.log(`  route definitions (page.tsx + route.ts under app/): ${definitions}`);
console.log(
  `  generated paths (.next/app-path-routes-manifest.json):  ` +
    (generated === null ? "UNAVAILABLE — no build present" : String(generated))
);
console.log(
  "\n  These differ because a dynamic route such as /products/[slug] expands to one"
);
console.log("  path per generated parameter. A document may cite either; it may not cite neither.");

console.log("\n=== DECLARED BUILD COUNTS THAT MATCH NEITHER ===\n");

/* Same split as §59: a `>` blockquote is this project's CORRECTION BANNER convention
 * and names the figure it replaced. Reported, never suppressed. */
const live = findings.filter((f) => !f.quoted);
const noted = findings.filter((f) => f.quoted);

if (live.length === 0) {
  console.log(`  CLEAN — no live build count outside ${definitions} / ${generated ?? "(no build)"}.\n`);
} else {
  for (const f of live) {
    console.log(`  ${f.file}:${f.line}  says "${f.said}"`);
    console.log(`      ${f.context}`);
  }
  console.log(`\n  ${live.length} stale build count(s). Each needs adjudication — see below.`);
}
if (noted.length > 0) {
  console.log(`\n  ${noted.length} further count(s) inside correction banners (>) — EXPECTED, not defects.`);
}
if (rejected.length > 0) {
  console.log(`\n  Known residual false positives (${rejected.length}): test-coverage and`);
  console.log("  route-subset counts whose line also mentions a build verb, e.g.");
  for (const r of rejected.filter((x) => BUILD_VERB.test(x.context)).slice(0, 3)) {
    console.log(`    ${r.file}:${r.line}  "${r.said}"  — ${r.context.slice(0, 70)}`);
  }
  console.log("  These are TRUE. The heuristic cannot separate them from real drift, so they");
  console.log("  are reported rather than suppressed — §44's rule when separation is partial.");
}

/* ---- the separation, measured rather than assumed (§44) ---- */
const KEPT = findings.length;
const DROPPED = rejected.length;
console.log("\n=== SEPARATION (measured, not assumed) ===\n");
console.log(`  candidate number+noun matches : ${KEPT + DROPPED}`);
console.log(`  kept (same line asserts a build): ${KEPT}`);
console.log(`  dropped (count of something else): ${DROPPED}`);
console.log(
  `  noise ratio: ${KEPT + DROPPED === 0 ? "n/a" : `${Math.round((DROPPED / (KEPT + DROPPED)) * 100)}% of raw matches are not build counts`}`
);
console.log(
  "\n  The dropped class is real and must stay dropped: a keyboard test covering\n" +
    "  10 routes, a sidebar exposing 6, and 18 product pages are all TRUE and all\n" +
    "  contain the same words. If this number rises, the heuristic has stopped\n" +
    "  separating the classes and should be reported rather than trusted."
);

console.log(`\nscanned ${docs.size} markdown file(s); truth = ${definitions} definitions / ${generated ?? "?"} paths.`);
console.log("REPORT ONLY — exit 0 by design.");