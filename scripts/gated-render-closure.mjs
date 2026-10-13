/**
 * SYSTEM_AUDIT.md §70 — RENDER CLOSURE.
 *
 * THE DEFECT THIS EXISTS TO CATCH
 * --------------------------------
 * A gated surface is checked by reading the string literals INSIDE it. That is
 * correct for a file that owns its copy and silently wrong for one that imports
 * it.
 *
 * `app/(marketing)/bitscrm/page.tsx` has been a gated surface since §50. It has
 * reported CLEAN on every run since. At line 388 it renders
 * `pricingTiers.features`, and that array was selling, on a public page:
 *
 *     "Built-in Browser SIP Softphone"
 *     "Predictive & Progressive Auto-Dialer"
 *     "Dedicated SIP Trunking & Telco Routing"
 *
 * None of those literals appear in `page.tsx`, so the gate read the file, found
 * nothing banned, and reported PASS. It was not a missed file. It was a gated
 * surface asserting a clean bill of health for copy it never looked at — a
 * stronger false statement than an ungated file would have made, because a
 * gated surface is a claim about itself that someone downstream trusts.
 *
 * The same shape hid in four more imports, and `site.description` is the worst
 * of them: `app/layout.tsx` publishes it into the Organization and
 * SoftwareApplication JSON-LD and `app/manifest.ts` into the PWA manifest, on
 * every page, and it read "predictive dialing".
 *
 * WHAT IS ASSERTED
 * ----------------
 * For every gated surface, every named import it takes from a TypeScript module
 * in this repo must either already be gated, or scan clean. An ungated import
 * carrying an affirmative banned attestation FAILS, naming the surface, the
 * import and the sentence.
 *
 * This is derived, not enumerated. The set of "copy modules" is not listed here
 * — it is whatever a gated surface actually imports. Adding a new content module
 * to a gated page brings it into scope automatically. §65 established that a
 * rule's vocabulary must cover its category; this applies the same discipline to
 * the gate's INPUTS rather than its vocabulary.
 *
 * Report-only for clean-but-ungated imports, because the boundary of the gate is
 * a product decision (§29/§50 for out-of-repo product lines). It hard-fails only
 * on a real attestation — the same line drawn everywhere else here.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { SECURITY_SURFACES, exportRegion, findClaims, stringsFor } from "../lib/site/security-claims.mjs";

const ROOT = process.cwd();

export const diskReader = (p) => {
  const abs = join(ROOT, p);
  try {
    // `existsSync` is true for directories too, and reading one throws.
    if (!existsSync(abs) || !statSync(abs).isFile()) return null;
    return readFileSync(abs, "utf8");
  } catch {
    return null;
  }
};

/** Resolve a TS import specifier to a repo-relative file path, or null. */
export function resolveSpecifier(spec) {
  if (!spec.startsWith("@/") && !spec.startsWith(".")) return null;
  const base = spec.startsWith("@/") ? spec.slice(2) : spec;
  const clean = base.replace(/^\.\//, "");
  const read = diskReader;
  for (const c of [clean, `${clean}.ts`, `${clean}.tsx`, join(clean, "index.ts"), join(clean, "index.tsx")]) {
    if (read(c) != null) return c;
  }
  return null;
}

/**
 * Every named import a source file takes.
 * `import type` is erased at build time and never renders, so it is flagged.
 * In `{ a as b }` the EXPORTED name is `a` — `b` is only a local alias.
 */
export function namedImports(src) {
  const out = [];
  const re = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const typeOnly = Boolean(m[1]);
    for (const raw of m[2].split(",")) {
      const spec = raw.trim().replace(/^type\s+/, "");
      if (!spec) continue;
      const name = spec.split(/\s+as\s+/)[0].trim();
      if (/^[A-Za-z_$][\w$]*$/.test(name)) out.push({ module: m[3], name, typeOnly });
    }
  }
  return out;
}

/**
 * The closure algorithm.
 *
 * `sources` lets a caller override one module's text in memory, which is how
 * `gated-render-closure-negative.mjs` injects a real attestation and proves this
 * function fires — without writing to the working tree.
 */
export function runClosure({ surfaces = SECURITY_SURFACES, read = diskReader, resolve = resolveSpecifier } = {}) {
  const files = new Set();
  const exportsOf = new Map();
  for (const s of surfaces) {
    files.add(s.file);
    if (s.exports) exportsOf.set(s.file, new Set(s.exports));
  }

  const stats = { totalImports: 0, alreadyGated: 0, typeOnly: 0, unresolved: 0, notAConstExport: 0, scanned: 0 };
/* §88 — the identities behind stats.scanned, so "4 scanned" says WHICH four. */
const scannedExports = [];
  const uncovered = [];
  const failures = [];

  for (const surface of surfaces.map((s) => s.file)) {
    const src = read(surface);
    if (src == null) {
      failures.push({ surface, module: "-", name: "-", rule: "unreadable", sentence: `surface unreadable: ${surface}` });
      continue;
    }

    for (const imp of namedImports(src)) {
      if (imp.typeOnly) { stats.typeOnly++; continue; }
      stats.totalImports++;
      const mod = resolve(imp.module);
      if (mod == null) { stats.unresolved++; continue; }

      const gatedExports = exportsOf.get(mod);
      if (files.has(mod) && !gatedExports) { stats.alreadyGated++; continue; }
      if (gatedExports?.has(imp.name)) { stats.alreadyGated++; continue; }

      const modSrc = read(mod);
      if (modSrc == null) { stats.unresolved++; continue; }
      const region = exportRegion(modSrc, imp.name);
      if (region == null) { stats.notAConstExport++; continue; }

      stats.scanned++;
      /* §88 — record WHICH export was scanned, not just how many. The count
       * alone let scripts/gated-render-closure-negative.mjs assert
       * `scanned === 0`, which silently encoded whatever the whole repository
       * happened to import at the time: adding two legitimate derived-count
       * exports (§88) broke a test that was really asserting "the repository
       * is empty", not "this gated export is treated as gated". The set is the
       * property; the count was a proxy for it. */
      scannedExports.push(`${mod}#${imp.name}`);
      let hit = null;
      for (const s of stringsFor(mod, region)) {
        const claims = findClaims(s.value);
        if (claims.length) { hit = { rule: claims[0].id, sentence: s.value }; break; }
      }
      if (hit) failures.push({ surface, module: mod, name: imp.name, ...hit });
      else uncovered.push({ surface, module: mod, name: imp.name });
    }
  }

  return { failures, uncovered, stats, scannedExports };
}

/* ── CLI ─────────────────────────────────────────────────────────────────── */
/* §75 — this guard was hand-rolled as
 *     `import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}``
 * which NEVER matches on Windows: `import.meta.url` is `file:///C:/…` (three
 * slashes) and the hand-built string is `file://C:/…` (two). The script then
 * imported cleanly, exported its functions, and printed NOTHING — a gate that
 * looks like it ran and did not. `test:unit` did not catch it because the next
 * gate in the chain is the negative test for this same script, whose output was
 * what I read.
 *
 * `pathToFileURL` is the supported way to do this and is correct on every
 * platform. A hand-assembled file URL is precisely the kind of clever shortcut
 * that §59's lesson is about. */
const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (invokedDirectly) {
  const { failures, uncovered, stats, scannedExports } = runClosure();
  const surfaceCount = SECURITY_SURFACES.length;

  console.log("=== GATED RENDER CLOSURE ===\n");
  console.log(`${surfaceCount} gated surfaces; ${stats.totalImports} named runtime imports examined.`);
  console.log(
    `  already gated: ${stats.alreadyGated}   scanned: ${stats.scanned}   type-only: ${stats.typeOnly}   ` +
      `external/unresolved: ${stats.unresolved}   not a const export: ${stats.notAConstExport}`
  );
  /* §88 — name them. A count of what was examined is how §70's vacuous pass hid
   * for so long; the identities make "4 scanned" auditable in one line. */
  if (scannedExports.length) {
    console.log(`  scanned exports: ${[...new Set(scannedExports)].join(", ")}`);
  }

  /* §70 — the first run of this script printed "0 scanned" and a green tick.
   * The code was fine; every import was legitimately gated, so the scan path
   * simply never executed. A gate that reports success without having looked at
   * anything is §59's failure mode exactly: it converts "I found nothing" into
   * "there is nothing". Say so loudly instead of printing green. */
  if (stats.scanned === 0) {
    console.log(
      "\n⚠ NO UNGATED IMPORTS — the scan path did not execute.\n" +
        "  Vacuous pass: this run could not have failed. The detector is proved by\n" +
        "  scripts/gated-render-closure-negative.mjs, which injects a real attestation\n" +
        "  and asserts this code fails."
    );
  }
  console.log("");

  if (uncovered.length) {
    console.log("  Imported copy that is NOT gated but is currently clean");
    console.log("  (shown so the coverage claim is visible, not to force a product decision):");
    const seen = new Set();
    for (const u of uncovered) {
      const key = `${u.module}#${u.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`    ${u.module}  ${u.name}  (imported by ${u.surface})`);
    }
    console.log("");
  }

  if (failures.length) {
    console.log(`  ${failures.length} FAILURE(S) — a gated surface renders ungated copy that attests a control this build lacks:\n`);
    for (const f of failures) {
      console.log(`  ✖ ${f.surface}`);
      console.log(`      renders ${f.name} from ${f.module}   [${f.rule}]`);
      console.log(`      "${String(f.sentence).slice(0, 180)}"`);
    }
    console.log(`\n✖ gated-render-closure FAILED (${failures.length})`);
    process.exit(1);
  }

  console.log("✔ every copy export a gated surface renders is either gated or clean.");
}