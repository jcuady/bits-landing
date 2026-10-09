/*
 * SYSTEM_AUDIT.md §49 — blind-spot report for the security-attestation gate.
 *
 * §48 found 35 banned attestations sitting on public surfaces that
 * `SECURITY_SURFACES` does not list — including a PAID ENTERPRISE TIER selling
 * RBAC and immutable WORM logs. It got there by hand-probing ten files. This
 * does it exhaustively.
 *
 * WHY REPORT-ONLY (exit 0, always)
 * ------------------------------
 * A finding here means "this file contains a banned attestation". It does NOT
 * mean "this claim is false". §29 established the distinction that matters:
 *
 *   • IN-REPO product claims (BITScrm, Operations 360) — this repository can
 *     adjudicate them. A finding is a real defect. Fix it and add the file to
 *     SECURITY_SURFACES.
 *   • OUT-OF-REPO product lines (ERP, HRMS, Payroll, Inventory, Logistics,
 *     GPS field app) — this repository CANNOT see whether they are real
 *     deployments. Absence of evidence is not evidence of absence. Those are
 *     reported as inventory and are an OWNER DECISION (§8).
 *
 * Failing the build would turn that open question into a broken build, which
 * pressures someone into deleting accurate descriptions of software they may
 * actually ship. So this prints a worklist and exits 0.
 *
 * It also prints the files that ARE gated and clean, because "the gate works on
 * what it covers" is the claim that needs evidence, and a report that only
 * prints failures cannot show it.
 *
 * Run: node scripts/claim-coverage.mjs
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  CHECKS,
  SECURITY_SURFACES,
  visibleStrings,
  markdownProse,
  exportRegion,
  findClaims,
} from "../lib/site/security-claims.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IGNORED = new Set(["node_modules", ".next", ".git", ".turbo", "out", "docs", "public"]);

const read = (p) => readFileSync(p.startsWith("\\") || p.includes(":\\") ? p : join(ROOT, p), "utf8");

/* Everything that renders to a visitor: app routes, shared components, and the
 * data modules that feed them.
 *
 * §54 added `lib`. The first version of this script walked only app/ and
 * components/, which meant it could not see lib/blog-data.ts — and blog posts
 * render on the public /blog/<slug> route. Asking "what does this NOT cover?"
 * about my own tool found the same class of gap §48 and §52 found in the gate.
 */
const ROOTS = ["app", "components", "lib"];
const EXT = /\.(tsx|ts|jsx|js)$/;

/* SYSTEM_AUDIT.md §59 — the publication scope.
 *
 * `ROOTS` above covers what RENDERS. It cannot see `docs/`, and that boundary cost
 * something real: §58 found nine documents of finished, ready-to-post ad and social
 * copy asserting an immutable audit trail, role-based access, a browser softphone
 * and a live voice agent — none of which exist. No build, typecheck or gate reads
 * markdown, so those files sat uncorrected for the life of the project.
 *
 * The scope is derived from what a document is FOR, not from which files I happened
 * to open. `docs/social/` and `docs/ads/` exist to be published: their sentences are
 * written for a customer, and a false sentence there is published rather than
 * rendered.
 *
 * `public/` is here for a second reason (SYSTEM_AUDIT.md §60). `llms.txt`,
 * `llms-full.txt`, `index.md` and the two per-product `.md` files are the
 * machine-readable surfaces a language model reads. Three of them were listed in
 * `SECURITY_SURFACES` from §52 and reported CLEAN for seven phases while the gate's
 * JS extractor was reading 20, 35 and 1 strings out of them and finding nothing —
 * `bitsagent.md` was read as ZERO strings and could not fail under any edit. They
 * are un-gated now (mixed in-repo and out-of-repo catalogue, §50's situation) and
 * reported here instead, which is strictly more than "clean" ever was. Everything else under `docs/` is internal analysis that legitimately
 * NAMES an attestation while denying it — SYSTEM_AUDIT.md alone quotes "SOC 2
 * Type II" hundreds of times in order to explain that it is absent. Scanning that
 * as if it were ad copy would bury the real findings in the noise, which is the
 * failure mode §54 already fixed once.
 *
 * REPORT-ONLY, like the rest of this file, and for the same reason: a plan document
 * describing a future build is not a false claim. See §59.3.
 */
const DOC_ROOTS = ["docs/social", "docs/ads", "public"];
const DOC_EXT = /\.(md|txt)$/i;

function walk(dir, rel = "", ext = EXT) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED.has(e.name)) continue;
    const abs = join(dir, e.name);
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(abs, r, ext));
    else if (ext.test(e.name) && !e.name.includes(".selfcheck")) out.push(r);
  }
  return out;
}

/**
 * SYSTEM_AUDIT.md §59 — the markdown extractor itself lives in
 * `lib/site/security-claims.mjs`, beside `visibleStrings`, so that `findClaims`
 * stays a single detector serving both the JavaScript and the markdown surface.
 * Importing it from here rather than defining it twice is deliberate: §45's lesson
 * was that a second declaration of a rule quietly stops being checked.
 */

const covered = new Set(SECURITY_SURFACES.map((s) => s.file));

/* lib/site.ts is only partially covered — named exports. */
function coveredExports(file) {
  const s = SECURITY_SURFACES.find((x) => x.file === file);
  return s?.exports ? new Set(s.exports) : null;
}

const findings = []; // { file, id, sentence }
let scannedFiles = 0;
let stringCount = 0;

for (const r of ROOTS) {
  /* Seed `rel` with the root name, or returned paths lose the "app/" prefix and
   * every read resolves one directory too high. */
  for (const file of walk(join(ROOT, r), r)) {
  scannedFiles += 1;
  const raw = read(file);
  const exportFilter = coveredExports(file);

  /* If the file is partially covered, only its named exports are gated; the rest
   * of the file is blind spot exactly as an unlisted file would be. */
  let regions;
  if (exportFilter) {
    regions = [...exportFilter].map((name) => ({ name, src: exportRegion(raw, name) })).filter((x) => x.src);
    // Scan the whole file anyway — we want every claim, gated or not.
    regions.push({ name: null, src: raw });
  } else {
    regions = [{ name: null, src: raw }];
  }

  for (const region of regions) {
    for (const { value } of visibleStrings(region.src)) {
      stringCount += 1;
      for (const claim of findClaims(value)) {
        findings.push({ file, region: region.name, id: claim.id, sentence: claim.sentence });
      }
    }
  }
  }
}

/* De-duplicate: partial coverage means a gated export can be scanned twice. */
const seen = new Set();
const unique = findings.filter((f) => {
  const k = `${f.file}|${f.region ?? ""}|${f.id}|${f.sentence}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const gated = [];
const blind = [];
for (const f of unique) {
  /*
   * Attribution must respect PARTIAL coverage. lib/site.ts is gated by NAMED
   * EXPORTS (securityArchitecture, securityPrinciples, deploymentModels,
   * pricingComparisonMatrix) and nothing else, so a finding anywhere else in
   * that 2,000-line file is a blind spot, not a gated-surface hit.
   *
   * The first version of this got it wrong and reported 11 findings "inside a
   * gated surface" while the build was green — it compared `file` only and
   * ignored `region`. A reporting tool that cries wolf is worse than none.
   */
  const exportFilter = coveredExports(f.file);
  const inGatedRegion = Boolean(exportFilter && f.region && exportFilter.has(f.region));
  (inGatedRegion ? gated : blind).push(f);
}

/* ---- gated files: the evidence that the gate works where it applies ---- */
console.log("=== GATED SURFACES ===\n");
let gatedClean = 0;
for (const file of SECURITY_SURFACES) {
  const hits = gated.filter((f) => f.file === file.file).length;
  if (hits === 0) gatedClean += 1;
  console.log(`  ${hits === 0 ? "clean " : "HITS  "} ${file.file}${file.exports ? ` (exports: ${file.exports.join(", ")})` : ""}`);
}
console.log(`\n${gatedClean}/${SECURITY_SURFACES.length} gated surfaces are clean.\n`);

/* A gated file with a finding means someone added it and the build should have
 * failed — surface that loudly, because it is the real regression signal. */
if (gated.length > 0) {
  console.log("!! FINDINGS INSIDE GATED SURFACES — these should be failing the build:\n");
  for (const f of gated) {
    console.log(`  [${f.id}] ${f.file}${f.region ? ` (${f.region})` : ""}: ${f.sentence.slice(0, 110)}`);
  }
  console.log("");
}

/* ---- the blind spot ---- */
console.log("=== BLIND SPOT: files NOT in SECURITY_SURFACES that contain attestations ===\n");
const byFile = new Map();
for (const f of blind) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}
const sorted = [...byFile.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [file, hits] of sorted) {
  const ids = [...new Set(hits.map((h) => h.id))].sort();
  console.log(`  ${String(hits.length).padStart(2)}  ${file}`);
  console.log(`      attestations: ${ids.join(", ")}`);
}
console.log(
  `\n${sorted.length} file(s), ${blind.length} finding(s) — outside gate coverage.`
);
console.log(
  "\nTRIAGE (see header): in-repo product claims are real defects — fix and add the"
);
console.log("file to SECURITY_SURFACES. Out-of-repo product lines are an OWNER DECISION.");
console.log("\nREPORT ONLY — exit 0 by design.");

/* ---- per-product attribution (SYSTEM_AUDIT.md §55) ----
 *
 * A flat file count is not actionable. The open owner decision is "are the
 * out-of-repo product lines real deployments?", and answering it needs a list
 * of WHICH products carry claims — not a list of files.
 *
 * Each lib/site.ts finding is attributed to the export it came from and, for
 * `bitsProducts`, to the individual product whose data contains it. The
 * catalogue is parsed from the source of truth, never transcribed.
 */
const SITE = read("lib/site.ts");

function productRegions(src) {
  const start = src.search(/^export const bitsProducts/m);
  if (start === -1) return [];
  const rest = src.slice(start);
  /*
   * Bound the array FIRST, then parse inside it.
   *
   * Both bounding mistakes were made and both changed the answer:
   *   • the last product ran to end-of-file, swallowing every later export; and
   *   • the id/name matcher was applied to that whole span, so objects in
   *     crmModules and elsewhere became "products" and became the terminator
   *     for the real last product.
   * §55 reported 13 findings against `growing-businesses` on the strength of
   * the first bug, and the second kept it there after the first was fixed.
   * Parse the array, then parse its entries — not the other way round.
   */
  const arrayEnd = rest.search(/^\] as const;/m);
  if (arrayEnd === -1) return [];
  const arrayText = rest.slice(0, arrayEnd);

  const marks = [...arrayText.matchAll(/^\s{2}\{\s*\n\s*id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)"/gm)];
  return marks.map((m, i) => {
    const from = m.index;
    const to = i + 1 < marks.length ? marks[i + 1].index : arrayText.length;
    return { id: m[1], name: m[2], text: arrayText.slice(from, to) };
  });
}

const PRODUCTS = productRegions(SITE);

/*
 * Everything else in lib/site.ts — crmModules, securityPrinciples, and the rest —
 * is attributed by EXPORT, using the same "parse the array first" discipline.
 * Without this, 31 findings sat in an unlabelled "(whole file)" bucket, which is
 * where §55's wrong conclusion hid: the tool looked like it had attributed
 * everything, and had not.
 */
function exportRegions(src) {
  const re = /^export const (\w+)\s*(?::[^=]+)?=\s*\[/gm;
  const marks = [...src.matchAll(re)];
  return marks.map((m, i) => {
    const from = m.index;
    const next = src.indexOf("\n] as const;", from);
    const to = next !== -1 && (i + 1 >= marks.length || next < marks[i + 1].index) ? next : i + 1 < marks.length ? marks[i + 1].index : src.length;
    return { id: m[1], text: src.slice(from, to) };
  });
}
const EXPORTS = exportRegions(SITE);

console.log("\n=== ATTRIBUTION: lib/site.ts findings by product ===\n");
const byProduct = new Map();
for (const f of blind.filter((x) => x.file === "lib/site.ts")) {
  let key = f.region ?? null;
  if (!key) {
    const owner = PRODUCTS.find((p) => p.text.includes(f.sentence));
    if (owner) key = `product:${owner.id}`;
  }
  if (!key) {
    const exp = EXPORTS.find((e) => e.id !== "bitsProducts" && e.text.includes(f.sentence));
    key = exp ? `export:${exp.id}` : "(unattributed)";
  }
  if (!byProduct.has(key)) byProduct.set(key, { ids: new Set(), n: 0 });
  const row = byProduct.get(key);
  row.ids.add(f.id);
  row.n += 1;
}
for (const [key, row] of [...byProduct.entries()].sort((a, b) => b[1].n - a[1].n)) {
  const id = key.split(":")[1];
  const owner = id ? PRODUCTS.find((p) => p.id === id) : null;
  console.log(`  ${String(row.n).padStart(2)} finding(s)  ${key}${owner ? ` — ${owner.name}` : ""}`);
  console.log(`      ${[...row.ids].sort().join(", ")}`);
}
console.log(
  `\n${PRODUCTS.length} products parsed from bitsProducts, ${EXPORTS.length} exports parsed.`
);
console.log("Products and exports absent from this list are clean.");

console.log(
  `\nscanned ${scannedFiles} files / ${stringCount} visible string instances; ` +
    `${SECURITY_SURFACES.length} gated surfaces.`
);

/* ---- SYSTEM_AUDIT.md §59: drafted-for-publication markdown ---- */
console.log("\n=== PUBLICATION DOCS (docs/social, docs/ads) ===\n");

const docFindings = [];
let docFiles = 0;
let docLines = 0;

for (const r of DOC_ROOTS) {
  for (const file of walk(join(ROOT, r), r, DOC_EXT)) {
    docFiles += 1;
    for (const { value, line, quoted } of markdownProse(read(file))) {
      docLines += 1;
      for (const claim of findClaims(value)) {
        docFindings.push({ file, line, id: claim.id, sentence: claim.sentence, quoted });
      }
    }
  }
}

/*
 * A blockquote at the top of a publication doc is this project's CORRECTION BANNER
 * convention — §58 added them, and they exist precisely to name the attestation
 * that was removed. They are separated rather than scoped out, and the difference
 * matters: `SCOPED_OUT` would drop the sentence before the detector ever saw it,
 * which is the shape of bug this file exists to catch. Reporting is what proves the
 * detector still fires; suppressing is what would let it rot silently.
 *
 * A quoted finding is therefore EXPECTED and informative. An unquoted finding is
 * live copy a customer would read, and is the actionable bucket.
 */
const docLive = docFindings.filter((f) => !f.quoted);
const docNoted = docFindings.filter((f) => f.quoted);

const docByFile = new Map();
for (const f of docLive) {
  if (!docByFile.has(f.file)) docByFile.set(f.file, []);
  docByFile.get(f.file).push(f);
}

if (docLive.length === 0) {
  console.log(
    `  CLEAN — 0 attestation(s) in live copy across ${docFiles} file(s) / ${docLines} prose line(s).`
  );
} else {
  console.log(`  ${docLive.length} finding(s) in LIVE COPY — each needs adjudication:`);
  for (const h of docLive) {
    console.log(`      ${h.file}:${h.line}  [${h.id}]`);
    console.log(`        ${h.sentence}`);
  }
  console.log(
    "\nThese are sentences a customer would read. Some will be real defects; some will"
  );
  console.log("be the detector being wrong rather than the copy — §50 records three such");
  console.log(
    "cases. Adjudicate BEFORE editing: a finding is not proof, and deleting a correct"
  );
  console.log("sentence is the failure this tool exists to prevent.");
}

if (docNoted.length > 0) {
  const ids = [...new Set(docNoted.map((f) => f.id))].sort();
  console.log(
    `\n  ${docNoted.length} further finding(s) inside correction banners (>) — EXPECTED, not defects.`
  );
  console.log(`      attestations named in banners: ${ids.join(", ")}`);
}
console.log(
  `\nscanned ${docFiles} publication doc(s) / ${docLines} prose line(s); ` +
    `${docLive.length} live, ${docNoted.length} banner.`
);

/* ---- SYSTEM_AUDIT.md §73: INTERNAL docs/ — the exclusion, measured ----
 *
 * The rationale for NOT scanning the rest of `docs/` (comment at the top of this
 * file) is that internal analysis legitimately NAMES an attestation in order to
 * deny it — "SYSTEM_AUDIT.md alone quotes SOC 2 Type II hundreds of times in
 * order to explain that it is absent".
 *
 * §71 partly disproved that. §52's correction of OPERATIONS-360-CRO-AUDIT §2.3
 * was sound; the same claims then sat live in five other sections of the same
 * file, because correcting one section is not correcting the document. If the
 * reasoning that exempts a whole directory can be defeated inside one file, the
 * exemption is a guess.
 *
 * But the guess may still be the right call, and the only way to know is to
 * MEASURE rather than argue. §44: a heuristic that cannot be shown to separate
 * the classes must be measured, and reported rather than guessed at.
 *
 * So this scans every remaining `docs/*.md` and prints the split. It does NOT
 * gate, and it does not assert that these are defects. What it establishes is
 * whether "internal analysis naming an attestation" is in fact the dominant
 * class — a claim about this corpus that has never been tested. */
console.log("\n=== INTERNAL DOCS (docs/, excluding docs/social + docs/ads) ===\n");

const INTERNAL_ROOTS = ["docs"];
const internalFindings = [];
let internalFiles = 0;
let internalLines = 0;

for (const root of INTERNAL_ROOTS) {
  for (const file of walk(join(ROOT, root), root, DOC_EXT)) {
    if (file.startsWith("docs/social/") || file.startsWith("docs/ads/")) continue;
    internalFiles += 1;
    for (const { value, line, quoted } of markdownProse(read(file))) {
      internalLines += 1;
      for (const claim of findClaims(value)) {
        internalFindings.push({ file, line, id: claim.id, sentence: claim.sentence, quoted });
      }
    }
  }
}

const internalQuoted = internalFindings.filter((f) => f.quoted);
const internalLive = internalFindings.filter((f) => !f.quoted);

/* `SYSTEM_AUDIT.md` is the one file whose entire purpose is to quote an
 * attestation in order to deny it, and §54 already established that scanning it
 * as if it were ad copy buries real findings in noise. It is measured separately
 * rather than excluded, so the exemption is visible instead of assumed. */
const auditFindings = internalLive.filter((f) => f.file === "docs/SYSTEM_AUDIT.md");
const otherLive = internalLive.filter((f) => f.file !== "docs/SYSTEM_AUDIT.md");

console.log(
  `  ${internalFindings.length} finding(s) across ${internalFiles} file(s) / ${internalLines} prose line(s).`
);
console.log(
  `    in correction banners (>):        ${internalQuoted.length}   EXPECTED — that is what a banner is for`
);
console.log(
  `    in SYSTEM_AUDIT.md (the record):  ${auditFindings.length}   EXPECTED — it quotes each attestation to deny it`
);
console.log(`    in other internal docs:           ${otherLive.length}   ADJUDICATE — see the note below`);
console.log("");

if (otherLive.length) {
  const byFile = new Map();
  for (const f of otherLive) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  for (const [file, list] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${file} — ${list.length} finding(s)`);
    for (const h of list.slice(0, 6)) {
      console.log(`      L${h.line}  [${h.id}]  ${h.sentence.slice(0, 160)}`);
    }
    if (list.length > 6) console.log(`      …and ${list.length - 6} more in this file`);
  }
  console.log(
    "\n  These are analysis documents, not ad copy. A sentence here may be a defect\n" +
      "  (§71 found six of them that were), or it may be analysis correctly describing a\n" +
      "  control that does not exist. Adjudicate per file, not per line."
  );
} else {
  console.log("  No findings in internal docs outside the audit record.");
}