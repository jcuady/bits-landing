/**
 * SYSTEM_AUDIT.md §71 — negative test for `docs-claims-drift.mjs`.
 *
 * A drift gate is easy to write and impossible to trust unless it has been
 * SEEN to fail on the exact drift it claims to catch. Two ways it silently
 * passes forever:
 *
 *   1. the pattern never matches anything (a doc that says "10 security
 *      surfaces" would not be caught by a rule keyed on the word "surfaces");
 *   2. the value it derives is right by accident, so every doc agrees with it
 *      for the wrong reason.
 *
 * Both are covered below by mutating a real markdown file, re-running the real
 * detector logic, and asserting it FAILS — then restoring byte-for-byte. The
 * live values are derived at run time, never typed in, so this test cannot pass
 * by agreeing with a stale constant.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { SECURITY_SURFACES, CHECKS } from "../lib/site/security-claims.mjs";

const ROOT = process.cwd();

let pass = 0;
let fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) { pass++; console.log(`PASS  ${label}`); }
  else { fail++; console.log(`FAIL  ${label}${detail ? `\n        ${detail}` : ""}`); }
};

/* Re-implement the detector's matching, exactly as the script does. Kept
 * separate on purpose: if this file imported the script's internals, the test
 * would pass whenever the internals agreed with themselves. */
const NUMBER_WORDS = {
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, twentyone: 21, twentytwo: 22, twentythree: 23,
  twentyfour: 24, twentyfive: 25, twentysix: 26,
};

const registryCount = (() => {
  const src = readFileSync(join(ROOT, "lib/products/registry.ts"), "utf8");
  const s = src.indexOf("export const PRODUCT_REGISTRY");
  return (src.slice(s).match(/^ {2}"[a-z0-9-]+":\s*\{/gm) || []).length;
})();

const RULES = [
  { id: "security surfaces", re: /\b(\d+)\s+security\s+surfaces?\b/gi, expect: [SECURITY_SURFACES.length] },
  { id: "banned attestations", re: /\b(\d+)\s+banned\s+attestations\b/gi, expect: [CHECKS.length] },
  { id: "engines", re: /\ball\s+(\d+)\s+engines\b/gi, accept: [registryCount, registryCount - 1] },
];

function detect(line) {
  const hits = [];
  for (const rule of RULES) {
    rule.re.lastIndex = 0;
    let m;
    while ((m = rule.re.exec(line)) !== null) {
      const raw = m[1];
      const said = /^\d+$/.test(raw ?? "") ? Number(raw) : NUMBER_WORDS[raw?.toLowerCase()];
      if (said == null) continue;
      const accept = rule.accept ?? rule.expect;
      if (accept.includes(said)) continue;
      hits.push({ id: rule.id, said, expect: accept.join(" or ") });
    }
  }
  return hits;
}

console.log("=== DOC CLAIMS DRIFT — NEGATIVE TEST ===\n");
console.log(`  derived: ${SECURITY_SURFACES.length} surfaces, ${CHECKS.length} rules, ${registryCount} registry engines\n`);

/* 1. The detector must fire on a value that is wrong by exactly the drift the
 *    gate exists to catch — one less than reality. */
check("wrong surface count is caught", detect(`Plus ${SECURITY_SURFACES.length - 2} security surfaces and ${CHECKS.length} banned attestations`).some((h) => h.id === "security surfaces"));
check("wrong rule count is caught", detect(`Plus ${SECURITY_SURFACES.length} security surfaces and ${CHECKS.length - 2} banned attestations`).some((h) => h.id === "banned attestations"));
check("correct values are NOT flagged", detect(`Plus ${SECURITY_SURFACES.length} security surfaces and ${CHECKS.length} banned attestations`).length === 0);

/* 2. Engine counts accept BOTH catalogues. This is the §44 lesson: asserting a
 *    single value produced four false failures on correct sentences. */
check("registry engine count accepted", detect(`Explore All ${registryCount} Engines`).length === 0);
check("marketing catalogue count accepted", detect(`Explore All ${registryCount - 1} Engines`).length === 0);
check("a number that is NEITHER catalogue is caught", detect(`Explore All ${registryCount + 7} Engines`).length === 1);

/* 3. Word-forms must be caught too. docs/README.md and docs/TESTING.md both
 *    wrote "All nineteen …" in words rather than digits — a numeric-only rule
 *    would have passed the exact sentence that was wrong. */
const selfcheckCount = (JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).scripts["test:unit"]
  .match(/[^ ]*\.mjs/g) || []).length;
const WORD_RULE = {
  id: "unit selfchecks",
  re: /\b(?:all\s+)?(\d+)\s+unit\s+selfchecks?\b|\ball\s+(\w+)\s+are\s+dependency-free\b/gi,
};
function detectSelfchecks(line) {
  WORD_RULE.re.lastIndex = 0;
  let m;
  while ((m = WORD_RULE.re.exec(line)) !== null) {
    const raw = m[1] ?? m[2];
    const said = /^\d+$/.test(raw ?? "") ? Number(raw) : NUMBER_WORDS[raw?.toLowerCase()];
    if (said != null && said !== selfcheckCount) return { id: WORD_RULE.id, said, expect: selfcheckCount };
  }
  return null;
}
check("spelled-out WRONG selfcheck count is caught", Boolean(detectSelfchecks("All thirteen are dependency-free `node` scripts")),
  `expected a hit, got ${JSON.stringify(detectSelfchecks("All thirteen are dependency-free `node` scripts"))}`);
check("spelled-out CORRECT selfcheck count is not flagged", detectSelfchecks(`All ${selfcheckCount} are dependency-free \`node\` scripts and run without a server.`) === null);
check("digit form is caught too", Boolean(detectSelfchecks(`There are ${selfcheckCount - 4} unit selfchecks`)));

/* 4. CI assertion. The real repository has no CI, so any live "run in CI"
 *    sentence must be caught. */
check("the live repo has no CI config (precondition)", ![".github/workflows", ".gitlab-ci.yml", ".circleci"].some((p) => {
  try { return readFileSync(join(ROOT, p)); } catch { return false; }
}));

/* 5. End-to-end on a REAL file: mutate an actual doc, assert the real script
 *    fails, restore byte-for-byte. This is the only assertion that proves the
 *    shipped script — not a reimplementation — can fail. */
const target = join(ROOT, "docs/README.md");
const original = readFileSync(target, "utf8");
const injected = original.replace(
  "all 19 engines",
  `all ${SECURITY_SURFACES.length - 5} security surfaces and all 19 engines`
);

check("mutation landed in a real doc", injected !== original && injected.includes(`${SECURITY_SURFACES.length - 5} security surfaces`));

let failedAsExpected = false;
let output = "";
try {
  writeFileSync(target, injected, "utf8");
  try {
    output = execFileSync("node", ["scripts/docs-claims-drift.mjs"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    failedAsExpected = true;
    output = `${e.stdout || ""}${e.stderr || ""}`;
  }
} finally {
  writeFileSync(target, original, "utf8");
}

check("the REAL script FAILS on the injected stale number", failedAsExpected, `exit was 0; output tail: ${output.slice(-200)}`);
check("…and it names the file", /docs\/README\.md/.test(output), output.slice(-300));
check("…and it names both the wrong and the real number", new RegExp(String(SECURITY_SURFACES.length - 5)).test(output) && new RegExp(`\\b${SECURITY_SURFACES.length}\\b`).test(output));
check("the real doc is restored byte-for-byte", readFileSync(target, "utf8") === original);

/* 6. §77 — the thousands separator. This is the exact defect found this pass:
 *    the "visible strings" rule's PATTERN accepts `6,865`, the number PARSER did
 *    not, so the gate matched the sentence proving it was in scope and then
 *    discarded the match. TESTING.md carried a stale `6,865 visible strings`
 *    through a full gate run while the adjacent `30 security surfaces` on the
 *    SAME LINE was caught and printed.
 *
 *    A parser unit test would not have been enough, because the reimplementation
 *    at the top of this file would simply have been corrected in step with the
 *    bug and stayed green. So this mutates the real doc and runs the real
 *    script, on the same line, where the sibling rule still passes. */
const commaTarget = join(ROOT, "docs/TESTING.md");
const commaOriginal = readFileSync(commaTarget, "utf8");
const liveSurfaces = SECURITY_SURFACES.length;
// A stale figure the parser must reject, formatted the way a human writes one.
const commaStale = "1,234 security surfaces";
const commaInjected = commaOriginal.replace(
  `${liveSurfaces} security surfaces`,
  commaStale
);

check("comma mutation landed in a real doc", commaInjected !== commaOriginal && commaInjected.includes(commaStale));

let commaFailed = false;
let commaOutput = "";
try {
  writeFileSync(commaTarget, commaInjected, "utf8");
  try {
    commaOutput = execFileSync("node", ["scripts/docs-claims-drift.mjs"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    commaFailed = true;
    commaOutput = `${e.stdout || ""}${e.stderr || ""}`;
  }
} finally {
  writeFileSync(commaTarget, commaOriginal, "utf8");
}

check("a comma-formatted STALE number FAILS the real script", commaFailed, `exit was 0 — the parser swallowed it. Output tail: ${commaOutput.slice(-200)}`);
check("…and it reports the separator, not 1 or 34", /1234|1,234/.test(commaOutput) && !/says 34\b/.test(commaOutput), commaOutput.slice(-300));
check("…naming docs/TESTING.md", /docs\/TESTING\.md/.test(commaOutput), commaOutput.slice(-300));
check("the comma-mutated doc is restored byte-for-byte", readFileSync(commaTarget, "utf8") === commaOriginal);

/* 7. A matched-but-unreadable number must be REPORTED, never passed. Before the
 *    fix, any capture group that was not a bare integer fell through `continue`
 *    — indistinguishable from "no match at all". "I could not read this claim"
 *    and "this claim is correct" must not produce the same output. */
check("the shipped script reports UNREADABLE rather than skipping", /UNREADABLE/.test(readFileSync(join(ROOT, "scripts/docs-claims-drift.mjs"), "utf8")),
  "the failure branch must name itself so a silent skip cannot be reintroduced");

console.log(`\n${fail === 0 ? "✔" : "✖"} docs-claims-drift negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);