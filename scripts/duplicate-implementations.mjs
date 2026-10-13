/**
 * §104 — does any wired gate test a COPY of the code it claims to protect?
 *
 *   Run:  node scripts/duplicate-implementations.mjs
 *
 * THE DEFECT CLASS
 * ----------------
 * §96 found three copies of `escapeHtml`, one of them a dead stub wired to
 * nothing. §102 found `safe-next.selfcheck.mjs` defining its OWN `safeAppNext`
 * while the shipped one allowed nine prefixes and the copy allowed one — and
 * proved the gate stayed green when the shipped file was deleted outright.
 * §103 found `stripComments` re-implemented, defectively, in two places.
 *
 * The common shape: **a gate re-declares the logic it is supposed to be testing.**
 * The tests keep passing, against the wrong code, indefinitely.
 *
 * WHY THIS IS A GATE AND NOT A SCRIPT
 * -----------------------------------
 * §103 ran the sweep as a throwaway file in %TEMP%. That is a snapshot, not a
 * witness: the next duplicate is found only if somebody remembers to re-run it.
 * §95's lesson — a check nobody runs is not a check.
 *
 * WHAT IT DOES NOT CLAIM
 * ----------------------
 * It matches DEFINED NAMES. A copy that was renamed, inlined, or rewritten into
 * a different shape escapes it, and so does a near-duplicate with a different
 * name. §103 proved that limit by missing a second instance of its own defect.
 * This is a detector for the named case, not a duplicate-detection oracle.
 *
 * A KNOWN FALSE POSITIVE, measured and left standing
 * -------------------------------------------------
 * Definition-shaped SOURCE inside a template literal is reported as a
 * redefinition. A test:unit entry like
 *
 *     export const FIXTURE = `
 *     function escapeHtml(v) { return String(v) }
 *     ` + 1;
 *
 * is a string, not code, and this reports it anyway.
 *
 * The obvious fix — mask template literals before scanning — was BUILT and
 * MEASURED, and then withdrawn. A quote-aware scanner produced five false
 * "unterminated" refusals on real files, all from regex literals containing
 * quotes (`body.matchAll(/^\s+id: "([^"]+)"/gm)`). Adding regex/division
 * tracking made it worse: 130 of 286 source files failed to mask, because JSX
 * self-closing tags (`<br />`) make `/` look like a regex. TypeScript 7.0.2 — the
 * version in this repository — exposes no parser, only `unstable/*` AST pieces
 * without `createSourceFile`. So an exact implementation is not available here,
 * and a lexer that misparses 45% of the tree would be a far worse trade than the
 * false positive it removes.
 *
 * What makes this survivable instead: no file in `test:unit` contains such a
 * fixture today, and the gate's own control — it must report 0 on the real
 * repository — goes RED the moment one is introduced, naming the file. The
 * negative suite's fixtures all sit inside template literals whose lines begin
 * with a quote or backtick, so no line starts with a definition keyword.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, dirname, resolve } from "node:path";
const ROOT = process.env.BITS_ROOT || process.cwd();

const refuse = (why) => {
  console.log("=== DUPLICATE IMPLEMENTATIONS (§104) ===\n");
  console.error(`  ✖ VACUOUS: ${why}`);
  console.error("\n✖ duplicate-implementations: nothing to check — refusing to report a pass.");
  process.exit(1);
};

if (!existsSync(join(ROOT, "package.json"))) refuse(`no package.json under the root (${ROOT}).`);

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const entries = [...new Set(pkg.scripts?.["test:unit"]?.match(/[\w./-]+\.mjs/g) || [])].sort();

/* §70 — a check that reads an empty list has proved nothing. `test:unit` losing
 * every entry would make this file report a clean 0-of-0. */
if (entries.length === 0) refuse('no entries parsed out of package.json "test:unit".');

/* EVERYTHING in `test:unit` is scanned, negative suites included.
 *
 * §104.1 originally excluded `*-negative.mjs`, on the theory that a negative
 * suite has a licence to define its own helpers. Measured before changing it: the
 * exclusion costs nothing today (0 findings either way) and it hid a real class —
 * a negative suite that re-declares the shipped function is testing a copy of it,
 * which is §102's defect with the sign flipped. §93's rule — fixing a blind spot
 * without covering it only buys time. */
const gates = entries;

/* A missing scan directory is reported, not thrown. `readdirSync` on an absent
 * path produced a raw ENOENT stack, which reads like a broken tool rather than a
 * broken tree. */
const SCAN_DIRS = ["lib", "app", "components"];
const missingDirs = SCAN_DIRS.filter((d) => !existsSync(join(ROOT, d)));
if (missingDirs.length === SCAN_DIRS.length) {
  refuse(`none of the scan roots exist under the root (${missingDirs.join(", ")} missing).`);
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|mjs)$/.test(e.name)) out.push(relative(ROOT, p).replace(/\\/g, "/"));
  }
  return out;
}
const shipped = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));

/* name -> files that export it. Excludes scripts/ on purpose: a gate comparing
 * itself against other gates would flag every shared helper. */
const exportedBy = new Map();
const note = (name, file) => {
  if (!exportedBy.has(name)) exportedBy.set(name, new Set());
  exportedBy.get(name).add(file);
};
for (const f of shipped) {
  const src = readFileSync(join(ROOT, f), "utf8");
  for (const m of src.matchAll(/export\s+(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g)) note(m[1], f);
  for (const m of src.matchAll(/export\s+(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g)) note(m[1], f);
  for (const m of src.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of m[1].split(",")) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim();
      if (name && /^[A-Za-z_$][\w$]*$/.test(name)) note(name, f);
    }
  }
}

/* §104.2 — the second vacuity hole, found by building the negative suite.
 *
 * The `test:unit`-empty guard catches a tree that has no gates. It does NOT catch
 * a tree that HAS gates and indexes nothing: `exportedBy` would be empty, every
 * lookup would miss, and the gate would print a clean 0-of-0 with a green tick —
 * indistinguishable from a repository with genuinely no duplicates. A detector
 * that reports "nothing found" must first have found something. */
if (shipped.length === 0 || exportedBy.size === 0) {
  refuse(
    `scanned ${shipped.length} shipped module(s) and indexed ${exportedBy.size} exported name(s); ` +
      `with nothing indexed every comparison would trivially pass`,
  );
}

/* §104 — every DEFINITION shape, not just `function NAME`.
 *
 * §103's sweep matched `function NAME` and `export const NAME`, and therefore
 * MISSED `production-write-guard-test.mjs`'s non-exported
 * `const stripComments = (src) => …` — which turned out to hold a second copy of
 * the very defect the sweep was looking for. That is the whole argument for
 * enumerating shapes rather than patterns that happen to match today. */
const DEFINITION_SHAPES = [
  [/(?:^|\n)\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/g, "function"],
  [/(?:^|\n)\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/g, "arrow const"],
  [/(?:^|\n)\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function\b/g, "function const"],
];

function localDefinitions(src) {
  const found = new Map();
  for (const [re, shape] of DEFINITION_SHAPES) {
    for (const m of src.matchAll(re)) {
      if (!found.has(m[1])) found.set(m[1], shape);
    }
  }
  return found;
}

function importedRepoModules(gateFile, src) {
  const set = new Set();
  for (const m of src.matchAll(/from\s+["'](\.[^"']+)["']/g)) {
    const abs = resolve(dirname(join(ROOT, gateFile)), m[1]);
    set.add(abs.replace(/\\/g, "/"));
    // `@/x` aliases and extensionless specifiers resolve to a sibling file too;
    // record the candidate so an aliased import is not reported as a missing one.
    for (const ext of [".ts", ".tsx", ".mjs", "/index.ts", "/index.tsx"]) {
      set.add((abs + ext).replace(/\\/g, "/"));
    }
  }
  return set;
}

/* Declared exemptions, each with a reason. A table that is merely empty would
 * make the next legitimate local helper an unexplained build failure, and an
 * unexplained failure is how a gate gets switched off. */
const DECLARED = {
  "lib/security/a11y-static.selfcheck.mjs:stripComments":
    "this gate IS the scanner for the a11y rule; it imports no repo module by design and its implementation is now behaviourally identical to security-claims.stripComments (measured across all 34 gated surfaces, §103.6)",
  "lib/site/cookie-disclosure.selfcheck.mjs:stripComments":
    "deliberately DIFFERENT and correct: line-anchored (^\\s*\\/\\/.*$ with the m flag), so it cannot match a // inside a URL at all — the exact class §103 found broken in three other copies. Measured, not assumed; left as-is because sharing would replace a safe variant with another variant",
};

const findings = [];
for (const g of gates) {
  const src = readFileSync(join(ROOT, g), "utf8");
  const imported = importedRepoModules(g, src);
  for (const [name, shape] of localDefinitions(src)) {
    const homes = exportedBy.get(name);
    if (!homes) continue;
    for (const h of homes) {
      if (imported.has(h)) continue; // it imports it — testing the real one
      const key = `${g}:${name}`;
      if (DECLARED[key]) continue;
      findings.push({ gate: g, name, shape, exportedBy: h });
    }
  }
}

console.log("=== DUPLICATE IMPLEMENTATIONS (§104) ===\n");
console.log(`  test:unit entries checked            ${gates.length} (${gates.filter((g) => !g.endsWith("-negative.mjs")).length} gates + ${gates.filter((g) => g.endsWith("-negative.mjs")).length} negative suites)`);
console.log(`  shipped modules scanned              ${shipped.length}`);
console.log(`  exported names indexed               ${exportedBy.size}`);
console.log(`  declared exemptions                 ${Object.keys(DECLARED).length}`);
console.log(`  undeclared same-name redefinitions   ${findings.length}\n`);

if (findings.length) {
  for (const f of findings) {
    console.log(`  ✖ ${f.gate}`);
    console.log(`      defines ${f.name} (${f.shape}) — also exported by ${f.exportedBy}, which it does NOT import`);
  }
  console.error(
    `\n✖ ${findings.length} undeclared duplicate implementation(s).\n` +
    `  Either import the shipped one, or — if the local copy is genuinely the subject —\n` +
    `  record it in DECLARED above with the reason. A duplicate that is not declared\n` +
    `  is how §96, §102 and §103 each found the same class of defect.`,
  );
  process.exit(1);
}

console.log("  No gate re-declares a name that shipped code exports without importing it.");
console.log(
  "\n  NOT DETECTED: a copy that was renamed, inlined, or rewritten into a different\n" +
  "  shape. This finds same-name redefinitions, not duplicate code in general.",
);