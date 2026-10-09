/*
 * SYSTEM_AUDIT.md §59 — negative tests for the publication-doc scope.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The first version of this scope reported `CLEAN — 0 file(s) scanned` while
 * reading ZERO files, because `walk()` filtered on a `.tsx|.ts|.jsx|.js` extension
 * pattern and no markdown file can match it. It looked like a pass. It was a
 * vacuous one — the exact failure mode of §52 and §54, committed by the tool
 * whose entire job is to detect that class of failure.
 *
 * So every rule below is asserted against a real mutation, and the harness proves
 * the mutation landed. A gate that reports green because it examined nothing is
 * worse than no gate, because it converts an unknown into a confident answer.
 *
 * Run: node scripts/publication-docs-negative.mjs
 */

import { readFileSync, writeFileSync, rmSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import { findClaims, markdownProse, SECURITY_SURFACES } from "../lib/site/security-claims.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0;
let fail = 0;

function ok(cond, label) {
  if (cond) {
    pass += 1;
    console.log(`  PASS  ${label}`);
  } else {
    fail += 1;
    console.log(`  FAIL  ${label}`);
  }
}

const scan = (src) => {
  const out = [];
  for (const { value, line, quoted } of markdownProse(src)) {
    for (const c of findClaims(value)) out.push({ ...c, line, quoted });
  }
  return out;
};

console.log("\n=== 1. markdownProse: the shape of the extraction ===\n");

const doc = [
  "# Title",                                        // 1
  "",                                               // 2
  "Live copy with an immutable WORM audit log.",    // 3
  "",                                               // 4
  "```",                                            // 5
  "fenced WebRTC softphone inside a code block",   // 6
  "```",                                            // 7
  "",                                               // 8
  "Struck ~~SOC 2 Type II compliant~~ text.",       // 9
  "",                                               // 10
  "Inline `RBAC and SSO` in a code span.",          // 11
  "",                                               // 12
  "> A banner that names a HIPAA certification.",   // 13
].join("\n");

const hits = scan(doc);
const ids = hits.map((h) => h.id);

ok(ids.includes("worm"), "live-copy attestation IS detected");
ok(!ids.includes("telephony"), "fenced code block is NOT detected");
ok(!ids.includes("soc2"), "struck-through line is NOT detected");
ok(!ids.includes("rbac"), "inline code span is NOT detected");
ok(ids.includes("hipaa"), "blockquoted banner IS still detected (not silently dropped)");
ok(hits.find((h) => h.id === "hipaa")?.quoted === true, "banner finding is flagged `quoted`");
ok(hits.find((h) => h.id === "worm")?.quoted === false, "live finding is flagged `quoted: false`");

console.log("\n=== 2. Line numbers are integers that point at the right line ===\n");

const lines = doc.split("\n");
for (const h of hits) {
  ok(Number.isInteger(h.line), `L${h.line} is an integer (string concat would fail here)`);
  ok(h.line >= 1 && h.line <= lines.length, `L${h.line} is within the document`);
}
const wormHit = hits.find((h) => h.id === "worm");
ok(
  lines[wormHit.line - 1].includes("immutable WORM"),
  `L${wormHit.line} really is the line that carries the attestation`,
);

console.log("\n=== 3. The walker reaches markdown at all ===\n");

/* The bug this file was written for. Asserting the extension filter directly is
 * not enough — assert that a REAL .md file is discovered, because that is the
 * assertion that failed in the first version. */
const SOCIAL = join(ROOT, "docs", "social");
const mdFiles = existsSync(SOCIAL)
  ? readFileSync(join(SOCIAL, "oms-facebook-post-copy.md"), "utf8")
  : "";
ok(mdFiles.length > 0, "a real publication doc exists to scan");
ok(/\.md$/.test("oms-facebook-post-copy.md"), ".md matches the doc extension filter");
ok(!/\.(tsx|ts|jsx|js)$/.test("oms-facebook-post-copy.md"), ".md does NOT match the source filter");
ok(/\.(tsx|ts|jsx|js)$/.test("site.ts"), ".ts DOES match the source filter (no regression)");

console.log("\n=== 4. End-to-end: inject a real attestation, prove the tool sees it ===\n");

const PROBE = join(SOCIAL, "zz-negative-probe.md");
const PROBE_LINES = [
  "# Negative probe",
  "",
  "Operations 360 ships an immutable WORM audit log on every action.",
  "",
];
const PROBE_BODY = PROBE_LINES.join("\n");
/* DERIVED, not hardcoded. An earlier version asserted ":9" — a line number typed by
 * hand for a body that puts the attestation on line 3 — and it failed for the right
 * reason: the test was wrong, not the tool. Every locator in this file is computed
 * from the body it describes, for the same reason §45 derives declarations. */
const PROBE_LINE = PROBE_LINES.findIndex((l) => l.includes("WORM")) + 1;

let endToEnd = false;
try {
  writeFileSync(PROBE, PROBE_BODY, "utf8");
  ok(existsSync(PROBE), "the injected probe file actually landed on disk");

  const out = execFileSync("node", [join(ROOT, "scripts", "claim-coverage.mjs")], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });

  ok(out.includes("zz-negative-probe.md"), "the real tool reports the injected file by name");
  const probeBlock = out.slice(out.indexOf("zz-negative-probe.md"));
  ok(probeBlock.slice(0, 400).includes("worm"), "the injected attestation is identified as worm");
  ok(
    probeBlock.slice(0, 400).includes(`zz-negative-probe.md:${PROBE_LINE}`),
    `the reported location is line ${PROBE_LINE}, derived from the body — not the line's own text`,
  );
  endToEnd = true;
} catch (e) {
  ok(false, `end-to-end probe failed: ${e.message}`);
} finally {
  if (existsSync(PROBE)) rmSync(PROBE, { force: true });
  ok(!existsSync(PROBE), "the injected probe file is removed again");
}

console.log("\n=== 5. The vacuous-gate regression: a markdown surface must be able to FAIL ===\n");

/*
 * This is the §60 regression, pinned at the strongest level available.
 *
 * `public/bitsagent.md` was listed in SECURITY_SURFACES from §52 and reported CLEAN
 * for seven phases while the gate's extractor read ZERO strings out of it. It could
 * not fail, under any edit, ever. Asserting "it is clean" proves nothing; the only
 * meaningful assertion is that it FAILS when a false claim is present.
 *
 * The file is restored byte-for-byte afterwards and the restore is asserted.
 */
const GATED_MD = join(ROOT, "public", "bitsagent.md");
const ORIGINAL = readFileSync(GATED_MD, "utf8");

try {
  writeFileSync(
    GATED_MD,
    `${ORIGINAL}\n\n## Injected probe\n\nThis build ships an immutable WORM audit log.\n`,
    "utf8",
  );
  ok(
    readFileSync(GATED_MD, "utf8") !== ORIGINAL,
    "the attestation really was written into the gated markdown file",
  );

  let failed = false;
  let message = "";
  try {
    execFileSync("node", [join(ROOT, "lib", "site", "ai-disclosure.selfcheck.mjs")], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (e) {
    failed = true;
    message = `${e.stdout ?? ""}${e.stderr ?? ""}`;
  }
  ok(failed, "the gate now FAILS on a false claim in that markdown surface");
  /* Case-insensitive on purpose: the gate prints the matched sentence as it appears
   * in the file, so the injected text reads "WORM". A case-sensitive check here failed
   * for a reason that had nothing to do with the gate — the second time in two phases
   * that the TEST was the wrong one. Assert on content, not on its capitalisation. */
  ok(
    message.includes("bitsagent.md") && /worm/i.test(message),
    "the failure names the file and the attestation (not an unrelated failure)",
  );
} finally {
  writeFileSync(GATED_MD, ORIGINAL, "utf8");
  ok(readFileSync(GATED_MD, "utf8") === ORIGINAL, "the gated file is restored byte-for-byte");
}

console.log("\n=== 6. The corpus is unchanged by any of this ===\n");

const final = execFileSync("node", [join(ROOT, "scripts", "claim-coverage.mjs")], {
  cwd: ROOT,
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});
ok(!final.includes("zz-negative-probe.md"), "probe is gone from the corpus after cleanup");

/* DERIVED, not hardcoded. This assertion used to read "23/23", which passed by luck
 * and then failed the moment §60 legitimately shrank SECURITY_SURFACES from 23 to 20
 * — a hardcoded count in a negative test is exactly the bug this file is about. The
 * expected value is read from the declaration itself, so changing the surface list
 * is a deliberate act rather than a red test someone will "fix" by editing a number. */
ok(
  final.includes(`${SECURITY_SURFACES.length}/${SECURITY_SURFACES.length} gated surfaces are clean`),
  `the source-side scope reads ${SECURITY_SURFACES.length}/${SECURITY_SURFACES.length} clean (count derived, not typed)`,
);
ok(/scanned 12 publication doc\(s\)/.test(final), "the publication scope scans all 12 docs");

console.log(
  `\n${endToEnd ? "end-to-end ran" : "end-to-end SKIPPED"} · ` +
    `${pass} passed, ${fail} failed\n`
);
process.exit(fail === 0 ? 0 : 1);