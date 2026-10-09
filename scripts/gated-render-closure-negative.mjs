/**
 * SYSTEM_AUDIT.md §70 — negative test for `gated-render-closure.mjs`.
 *
 * WHY THIS EXISTS, AND WHY IT INJECTS RATHER THAN PICKING A KNOWN BAD FILE
 * ------------------------------------------------------------------------
 * The closure check's first run printed "0 ungated imports scanned" and a green
 * tick. The code was correct; every import was legitimately gated by then, so
 * the scan path had never executed. It could not have failed and said nothing
 * about it. That is §59's failure mode — a check that turns "I looked at
 * nothing" into "there is nothing to find".
 *
 * An earlier draft of this file tried to fix that by ungating a known-bad
 * export. That cannot work, and the failure is the point: §70 FIXED all three
 * of those exports, so by the time the test ran there was nothing left to
 * detect. A negative test whose fixture is the bug it is meant to catch is only
 * alive until the bug is fixed — which is precisely when you need it most.
 *
 * So the mutation is injected. A real attestation is written into a REAL gated
 * export's text, in memory, and the REAL closure function is asked to judge it.
 * Every assertion below must FAIL the check; if any passes, the check is
 * decorative. No file on disk is written or modified.
 */
import { readFileSync } from "node:fs";
import { SECURITY_SURFACES, exportRegion } from "../lib/site/security-claims.mjs";
import { runClosure, diskReader, namedImports, resolveSpecifier } from "./gated-render-closure.mjs";

let pass = 0;
let fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) { pass++; console.log(`PASS  ${label}`); }
  else { fail++; console.log(`FAIL  ${label}${detail ? `\n        ${detail}` : ""}`); }
};

/* Attestations chosen because each was a REAL finding in this repository before
 * §70 corrected it. `multi-tenancy` is the §70 discovery that `multi-?tenant`
 * cannot match; if a future edit narrows that term again, case 2 catches it. */
const INJECTIONS = [
  { claim: "Built-in Browser SIP Softphone with predictive dialing", expectRule: "telephony" },
  { claim: "Unlimited agent seats & multi-tenancy", expectRule: "multitenant" },
];

console.log("=== GATED RENDER CLOSURE — NEGATIVE TEST ===\n");

/* ── Derive a real (gated surface, gated export) pair ────────────────────────
 * Derived, not hardcoded: if the import graph changes, this follows it, and if
 * no such pair exists the test fails loudly instead of asserting against a
 * fixture that no longer describes the code. */
const candidates = [];
for (const surface of SECURITY_SURFACES) {
  const src = diskReader(surface.file);
  if (src == null) continue;
  for (const imp of namedImports(src)) {
    if (imp.typeOnly) continue;
    const mod = resolveSpecifier(imp.module);
    if (mod == null) continue;
    const entry = SECURITY_SURFACES.find((s) => s.file === mod);
    if (entry?.exports?.includes(imp.name)) candidates.push({ surface: surface.file, mod, name: imp.name });
  }
}

check(`derived at least one real gated surface→gated export edge (${candidates.length} found)`, candidates.length > 0);
if (candidates.length === 0) {
  console.log("\n✖ cannot inject: no gated surface imports a gated export.");
  process.exit(1);
}

const target = candidates[0];

/* ── Case 1: the injected attestation must be caught ────────────────────────*/
for (const { claim, expectRule } of INJECTIONS) {
  const realSrc = diskReader(target.mod);
  const region = exportRegion(realSrc, target.name);
  check(`fixture is real: ${target.surface} imports ${target.name} from ${target.mod}`, region != null);

  // Inject a property carrying the attestation as the first element of the
  // export's array/object literal. In memory only.
  const mutatedRegion = region.replace(/=\s*(\[|\{)/, `= $1\n  __injected: ${JSON.stringify(claim)},`);
  const mutatedSrc = realSrc.replace(region, mutatedRegion);
  check(`  mutation landed (${target.name} now contains the injected string)`, mutatedSrc.includes("__injected") && mutatedSrc.includes(claim));

  // Ungate the export so the closure check must scan it, exactly reproducing
  // the §70 defect (gated surface renders ungated copy).
  const brokenGate = SECURITY_SURFACES.map((s) =>
    s.file === target.mod && s.exports ? { ...s, exports: s.exports.filter((e) => e !== target.name) } : s
  );

  const readWithMutation = (p) => (p === target.mod ? mutatedSrc : diskReader(p));
  const result = runClosure({ surfaces: brokenGate, read: readWithMutation });

  const hit = result.failures.find((f) => f.surface === target.surface && f.name === target.name);
  check(`  ungated + injected "${claim}" makes the check FAIL`, Boolean(hit),
    `expected a failure; got ${result.failures.length}: ${result.failures.map((f) => `${f.surface}#${f.name}`).join(", ") || "none"}`);
  check(`  …and it names the banned rule [${expectRule}]`, hit?.rule === expectRule, `got [${hit?.rule}]`);
}

/* ── Case 2: the SAME mutation must be caught even while still gated ─────────
 * Guards the other half of the mechanism: if a gated surface renders an
 * EXPORT that was added to SECURITY_SURFACES after its copy was written, the
 * closure check must still fail, because the copy is genuinely bad. This is
 * what catches a gate list that is right by accident. */
{
  const { claim } = INJECTIONS[0];
  const realSrc = diskReader(target.mod);
  const region = exportRegion(realSrc, target.name);
  const mutatedSrc = realSrc.replace(region, region.replace(/=\s*(\[|\{)/, `= $1\n  __injected: ${JSON.stringify(claim)},`));
  const result = runClosure({ read: (p) => (p === target.mod ? mutatedSrc : diskReader(p)) });

  /* §88 — this used to assert `stats.scanned === 0`, which was a proxy for
   * "this gated export is treated as gated". The proxy silently encoded the
   * whole repository's import list: adding §88's two derived-count exports made
   * four legitimate ungated imports exist, and the probe failed without any
   * behaviour under test changing. Assert the property instead — the target
   * module/export must NOT be in the scanned set — plus the original claim,
   * which is that a GATED export's bad copy is not reported as uncovered. */
  const targetKey = `${target.mod}#${target.name}`;
  const targetWasScanned = (result.scannedExports || []).includes(targetKey);
  const clean = result.failures.length === 0 && !targetWasScanned;
  check(
    `with the export correctly GATED, injected bad copy is not reported as an uncovered import`,
    clean,
    `failures=${result.failures.length} targetScanned=${targetWasScanned} scanned=${result.stats.scanned}`
  );
  check(
    "the closure scan path actually executed somewhere in this fixture set (not vacuous)",
    result.stats.scanned > 0 || result.stats.alreadyGated > 0,
    `scanned=${result.stats.scanned} alreadyGated=${result.stats.alreadyGated}`
  );
}

/* ── Case 3: the real, unmutated repository must pass ──────────────────────*/
{
  const result = runClosure();
  check(`real repository passes (${result.stats.totalImports} imports, ${result.stats.scanned} ungated scanned)`,
    result.failures.length === 0,
    result.failures.map((f) => `${f.surface}#${f.name} [${f.rule}]`).join("; "));
}

/* ── Case 4: type-only imports must never be scanned ────────────────────────*/
{
  const parsed = namedImports('import type { site } from "@/lib/site";\nimport { pricingTiers } from "@/lib/site";\n');
  check("type-only import is flagged typeOnly and skipped", parsed.length === 2 && parsed[0].typeOnly === true && parsed[1].typeOnly === false);
}

/* ── Case 5: a gated surface reading an UNGATED module with bad copy fails ──*/
{
  const src = 'import { injectedBad } from "@/__fixture_missing__";\n';
  const read = (p) => (p === "virtual.ts" ? 'export const injectedBad = [{ x: "Built-in Browser SIP Softphone" }];\n' : null);
  const result = runClosure({
    surfaces: [{ file: "virtual-surface.tsx" }],
    read: (p) => (p === "virtual-surface.tsx" ? src : read(p)),
    resolve: (spec) => (spec === "@/__fixture_missing__" ? "virtual.ts" : null),
  });
  check("an ungated module rendered by a gated surface FAILS the check",
    result.failures.length === 1 && result.failures[0].rule === "telephony",
    `got ${JSON.stringify(result.failures)}`);
}

console.log(`\n${fail === 0 ? "✔" : "✖"} gated-render-closure negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);