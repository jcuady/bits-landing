/**
 * SYSTEM_AUDIT.md §78 — negative test for `blog-claims-subject.mjs`.
 *
 * Two properties have to be demonstrated, and the second is the one that is
 * easy to skip:
 *
 *   1. A BITS-subject claim FAILS the gate. Without this the gate is a print
 *      statement. Per §70, the mutation is INJECTED — this repository's claims
 *      were all fixed in §78, so a fixture taken from disk could only ever be
 *      the passing case.
 *
 *   2. A third-party claim does NOT fail it. A gate scoped to "BITS" that
 *      fires on "Salesforce lacks a native predictive dialer" would be shut off
 *      within a day, and §44's outcome would be a report nobody reads. Testing
 *      only the failure case would have shipped that.
 *
 * Both run against the SHIPPED script by mutating the real file in place and
 * restoring it byte-for-byte.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const TARGET = join(ROOT, "lib/blog-data.ts");

let pass = 0;
let fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) { pass++; console.log(`PASS  ${label}`); }
  else { fail++; console.log(`FAIL  ${label}${detail ? `\n        ${detail}` : ""}`); }
};

function runGate() {
  try {
    const out = execFileSync("node", ["scripts/blog-claims-subject.mjs"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { failed: false, output: out };
  } catch (e) {
    return { failed: true, output: `${e.stdout || ""}${e.stderr || ""}` };
  }
}

console.log("=== BLOG-CLAIMS-SUBJECT — NEGATIVE TEST ===\n");

const original = readFileSync(TARGET, "utf8");

/* Precondition: the real repository passes. Without this, a gate that fails on
 * everything would satisfy every assertion below. */
const clean = runGate();
check("real repository passes the gate", !clean.failed, clean.output.slice(-300));

/* ── Property 1: a BITS-subject claim fails the gate ──────────────────────
 * Injected two ways, matching the two routes the gate uses:
 *   (a) inside an `isBits: true` row — caught by the row check
 *   (b) in post-body prose naming Operations 360 — caught by the entity check
 * A gate that only implemented one of the two would pass half of this. */
const BITS_CLAIM = "Built-in supervisor HUD: live listen, whisper coaching, live call barge-in, and automated audio QA";
const bitsRowAnchor = 'name: "Operations 360 (OMS)",\n        isBits: true,';
// Post-body prose: `executiveSummary` sits on the POST object, outside every
// `reviews[]` row, so it is reachable ONLY by the entity check. Using
// `verdict:` here would have put the fixture inside a row and tested the row
// check twice.
const proseAnchor = "    executiveSummary:";

const injectedA = original.replace(
  bitsRowAnchor,
  `${bitsRowAnchor}\n        //INJECT\n        injectedClaim: "${BITS_CLAIM}",`
);
check("injection (a) landed inside an isBits:true row", injectedA !== original && injectedA.includes("injectedClaim"));

const injectedB = original.replace(
  proseAnchor,
  `${proseAnchor}\n      //INJECT\n      "Operations 360 integrates an ultra-low-latency predictive dialer.",`
);
check("injection (b) landed in post-body prose", injectedB !== original && injectedB.includes("Operations 360 integrates an ultra-low-latency predictive dialer"));

for (const [label, mutated] of [["row", injectedA], ["prose", injectedB]]) {
  let r;
  try {
    writeFileSync(TARGET, mutated, "utf8");
    r = runGate();
  } finally {
    writeFileSync(TARGET, original, "utf8");
  }
  check(`injected BITS claim (${label}) FAILS the gate`, r.failed, `exit was 0 — the claim was not detected`);
  check(`…and it names lib/blog-data.ts (${label})`, /lib\/blog-data\.ts/.test(r.output), r.output.slice(-300));
  check(`…and it names the banned rule (${label})`, /\[(telephony|multitenant|soc2|contact-rules)\]/.test(r.output), r.output.slice(-300));
}

/* ── Property 2: a third-party claim must NOT fail the gate ───────────────
 * This is the precision half. Same banned vocabulary, different subject. */
const THIRD_PARTY = "Lacks native high-volume predictive dialer integration for aggressive BPO call floors";
// Into an `isBits: false` row — a competitor's cell. Injecting it into the BITS
// row would (correctly) fail the gate and would test nothing about precision.
const thirdPartyAnchor = 'badge: "Generic Finance CRM Tier",\n        isBits: false,';
const injectedC = original.replace(
  thirdPartyAnchor,
  `${thirdPartyAnchor}\n        //INJECT\n        injectedThirdParty: "${THIRD_PARTY}",`
);
check("third-party injection landed inside an isBits:false row", injectedC !== original && injectedC.includes("injectedThirdParty"));

{
  let r;
  try {
    writeFileSync(TARGET, injectedC, "utf8");
    r = runGate();
  } finally {
    writeFileSync(TARGET, original, "utf8");
  }
  check("a THIRD-PARTY claim does NOT fail the gate", !r.failed, `exit was non-zero: ${r.output.slice(-250)}`);
  check("…and it is still counted as a finding, not dropped", /findings in file\s+\d+/.test(r.output), r.output.slice(-250));
}

/* ── Property 3: cleanup ─────────────────────────────────────────────────── */
check("lib/blog-data.ts restored byte-for-byte", readFileSync(TARGET, "utf8") === original);

const after = runGate();
check("gate passes again after restore", !after.failed, after.output.slice(-300));

console.log(`\n${fail === 0 ? "✔" : "✖"} blog-claims-subject negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);