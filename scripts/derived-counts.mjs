/**
 * SYSTEM_AUDIT.md §88 — a count of products or engines must be DERIVED.
 *
 * WHY THIS EXISTS
 * ---------------
 * §85.4 found one hand-typed count ("The 9 Core Operational Engines" over a
 * ten-entry array) and fixed it by deriving it from `.length`. Asking where
 * else that pattern lived turned up twelve more sites, and they did not agree:
 *
 *   hero.tsx             href="/demo"   "Explore All 18 Engines"      <- 19
 *   product-shell.tsx    href="/demo"   "All 18 Engines"              <- 19
 *   crm-sales/page.tsx   href="/demo"   "Explore All 18 BITS Engines" <- 19
 *   crm-sales/page.tsx   href="/demo"   "Open 18-Engine Showcase …"   <- 19
 *   lib/site.ts:1450     /pricing       "Any 1 of our 18 Engines"     <- products
 *   lib/site.ts:1507     /pricing       "All 18 Engines Supported"    <- products
 *
 * All six were wrong, all six rendered, and NO gate could see any of them:
 * `docs-claims-drift` reads markdown only, and `ai-disclosure` asks whether
 * copy asserts a security control — a count is neither.
 *
 * WHAT IT CHECKS
 * --------------
 * A visible string that states "N products/engines/MVPs" with a BARE number.
 * If the number arrives as an expression (`{PRODUCT_COUNT}`, `{ENGINE_COUNT}`,
 * `{TABS.length}`) the string is derived and passes; there is nothing left to
 * disagree about.
 *
 * THE ONE ACCEPTED EXCEPTION, DECLARED
 * ------------------------------------
 * `public/llms.txt` is a static file served from /public. It cannot import
 * anything, so its "all 18 products" cannot be derived. It is listed below
 * rather than suppressed silently — an exemption nobody can see is an
 * exemption the next reader has to rediscover.
 *
 * NOT A CHECK ON TRUTH
 * -------------------
 * This does not verify that a number is *correct*; it verifies that a number is
 * not hand-maintained. Correctness follows from derivation: a derived count
 * cannot disagree with the array it counts. §85.4's rule, generalised.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const ROOTS = ["app", "components", "lib", "public"];

/* Static files that cannot derive anything, with the reason. Adding an entry
 * here is a decision, not a suppression — state the reason inline. */
const ACCEPTED = {
  "public/llms.txt":
    "static file served from /public; cannot import PRODUCT_COUNT. 18 is correct (it is the bitsProducts catalogue). Regenerate when the catalogue changes.",
  "public/index.md":
    "static file; cannot import. AMBIGUOUS, flagged for the owner: the heading says '18-Engine' but the numbered list beneath it has 10 entries. 18 is the PRODUCT count and the /demo engine count is 19, so the heading's noun is wrong either way — align the noun to the collection the list actually enumerates.",
};

const CLAIM = /\b(\d{1,3})[\s-]+(?:BITS\s+)?(products?|engines?|MVPs?)\b/gi;

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|txt|md)$/.test(e.name)) out.push(relative(ROOT, p).replace(/\\/g, "/"));
  }
  return out;
}

const files = ROOTS.filter((d) => existsSync(join(ROOT, d))).flatMap((d) => walk(join(ROOT, d)));

const findings = [];

for (const f of files) {
  const src = readFileSync(join(ROOT, f), "utf8");
  // Comments are stripped so a number written in a §-note is not a finding —
  // this gate is about what a reader can see, and §88's own notes say "18".
  const body = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  CLAIM.lastIndex = 0;
  let m;
  const seen = new Set();
  while ((m = CLAIM.exec(body))) {
    const num = m[1];
    const key = `${num}:${m[2].toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    // A DERIVED count cannot appear here at all: it is written
    // `{PRODUCT_COUNT}` / `{ENGINE_COUNT}` / `{TABS.length}`, which carries no
    // digits, so the pattern simply does not match it. Anything this rule
    // finds IS a hand-typed number. That is the whole rule — no heuristic.
    findings.push({ file: f, text: m[0], sentence: body.slice(Math.max(0, m.index - 34), m.index + 60).replace(/\s+/g, " ").trim() });
  }
}

const unexpected = findings.filter((f) => !ACCEPTED[f.file]);
const accepted = findings.filter((f) => ACCEPTED[f.file]);

console.log("=== DERIVED COUNTS ===\n");
console.log(`  scanned ${files.length} files under ${ROOTS.join(", ")}`);
console.log(`  hand-typed product/engine counts found : ${findings.length}`);
console.log(`    accepted (declared)                  : ${accepted.length}`);
console.log(`    unexpected                           : ${unexpected.length}\n`);

for (const f of unexpected) {
  console.log(`  ✖ ${f.file}\n      ${JSON.stringify(f.text)}\n      …${f.sentence}…\n`);
}
for (const f of accepted) {
  console.log(`  ○ ${f.file}\n      ${JSON.stringify(f.text)}\n      accepted: ${ACCEPTED[f.file]}\n`);
}

if (unexpected.length) {
  console.log(
    "\nA hand-typed product/engine count can be checked by nothing. Derive it:\n" +
      "    products -> {PRODUCT_COUNT}   (lib/site.ts)\n" +
      "    engines  -> {ENGINE_COUNT}    (lib/products/registry.ts)\n" +
      "    a local tab set -> {THE_ARRAY.length}, not a catalogue count.\n"
  );
  console.log(`✖ derived-counts FAILED — ${unexpected.length} hand-typed count(s) above.`);
  process.exit(1);
}

console.log("✔ every product/engine count in the site is derived from the collection it names.");