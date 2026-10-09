/**
 * Negative test for scripts/derived-counts.mjs.
 *
 * The gate is only worth running if it CAN fail. This injects hand-typed
 * counts into real gated files, runs the REAL gate, asserts a non-zero exit,
 * and restores every file byte-for-byte.
 *
 * §83: the fixture must be synthetic, not the shipped string that exposed the
 * bug — otherwise the test dies the day the bug is fixed and silently stops
 * testing anything. Each probe below invents its own count.
 *
 * Both directions are asserted:
 *   - a TYPED count fails (the rule fires)
 *   - a DERIVED count passes (the rule does not fire on expressions)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const GATE = "scripts/derived-counts.mjs";

/* Where to inject, what to inject, and why that string must trip the rule. */
const PROBES = [
  {
    id: "a typed product count in a gated page FAILS the gate",
    file: "components/layout/header.tsx",
    from: "View All {PRODUCT_COUNT} Products →",
    to: "View All 17 Products →", // typed, and not the real count either
  },
  {
    id: "a typed engine count in a gated component FAILS the gate",
    file: "app/demo/page.tsx",
    from: "{ENGINE_COUNT}-Engine Modular Micro-Frontend",
    to: "18-Engine Modular Micro-Frontend", // the exact 18-vs-19 defect of §88
  },
  {
    // A no-op here would be a test that cannot fail (§81). This removes the
    // count entirely, which is a REAL edit, and asserts the rule stays silent:
    // the rule keys on the digits, not on the word "Engine".
    id: "a count REMOVED entirely does NOT fail the gate (control)",
    file: "app/demo/page.tsx",
    from: "{ENGINE_COUNT}-Engine Modular Micro-Frontend",
    to: "Modular Micro-Frontend", // still mentions architecture, has no number
  },
  {
    // Proves the noun list is narrow: a number that is not a catalogue count
    // must not be reported, or the gate would fire on every number on the site.
    id: "an unrelated number does NOT fail the gate (control)",
    file: "components/layout/header.tsx",
    from: "View All {PRODUCT_COUNT} Products →",
    to: "View All {PRODUCT_COUNT} Products → 3 shortcuts",
  },
];

function runGate() {
  const r = spawnSync("node", [GATE], { encoding: "utf8" });
  return { code: r.status, out: (r.stdout || "") + (r.stderr || "") };
}

// Baseline: the gate must be green before we mutate anything, or a failure
// below proves nothing about the probe.
const base = runGate();
if (base.code !== 0) {
  console.error("✖ derived-counts negative test: the gate is not green BEFORE mutation.");
  console.error(base.out);
  process.exit(1);
}

let passed = 0;
let failed = 0;
const originals = new Map();

const restore = () => {
  for (const [f, s] of originals) writeFileSync(f, s, "utf8");
};

try {
  for (const probe of PROBES) {
    const current = readFileSync(probe.file, "utf8");
    if (!originals.has(probe.file)) originals.set(probe.file, current);

    if (!current.includes(probe.from)) {
      console.log(`  FAIL  ${probe.id}\n          anchor not found in ${probe.file}: ${JSON.stringify(probe.from)}\n          the probe proves nothing`);
      failed++;
      continue;
    }
    if (current === current.replace(probe.from, probe.to)) {
      console.log(`  FAIL  ${probe.id}\n          injection was a no-op — the probe proves nothing`);
      failed++;
      continue;
    }

    writeFileSync(probe.file, current.replace(probe.from, probe.to), "utf8");
    const r = runGate();
    restore();

    const shouldFail = !probe.id.includes("does NOT");
    const ok = shouldFail ? r.code !== 0 : r.code === 0;
    if (ok) {
      passed++;
      console.log(`  PASS  ${probe.id}  (gate exit ${r.code})`);
    } else {
      failed++;
      console.log(`  FAIL  ${probe.id}  (gate exit ${r.code}, expected ${shouldFail ? "non-zero" : "0"})`);
    }
  }
} finally {
  restore();
}

// The files must be byte-identical to how we found them.
for (const [f, s] of originals) {
  if (readFileSync(f, "utf8") !== s) {
    console.log(`  FAIL  restoration of ${f} did not restore the file byte-for-byte`);
    failed++;
  }
}

const after = runGate();
if (after.code !== 0) {
  console.log("  FAIL  the gate is not green after every probe was reverted");
  failed++;
} else {
  passed++;
  console.log("  PASS  gate is green again after every probe was reverted");
}

console.log(`\nderived-counts negative test: ${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);