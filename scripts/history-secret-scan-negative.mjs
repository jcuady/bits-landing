/**
 * SYSTEM_AUDIT.md §105 — negative test for `history-secret-scan.mjs`.
 *
 * WHY A SYNTHETIC GIT REPOSITORY
 * ------------------------------
 * This gate's subject is git HISTORY, which cannot be redirected at the file
 * level. Two other options were considered and rejected:
 *
 *   - Mutating a copy of the gate (§102's shape: the test then exercises a copy,
 *     and dies the moment the copy drifts).
 *   - Committing a real credential to this repository to have something to find.
 *     Absolutely not — that would manufacture the exact defect the gate exists
 *     to catch, in the repository that matters most.
 *
 * So each case builds a THROWAWAY git repository in `%TEMP%` with its own
 * history, and the gate runs against it via `BITS_ROOT`. The credential strings
 * below are SYNTHETIC and exist only inside a temporary directory that is
 * deleted at the end of the run. **Nothing in this repository is written, and no
 * real credential is ever committed anywhere.**
 *
 * §105 added the `BITS_ROOT` override AND the `git -C ROOT` it depends on. The
 * second case below is the one that matters: without `-C`, the scan silently
 * reads THIS repository and returns a confident, plausible report about the
 * wrong tree — the §98 failure mode, and one a passing run would never reveal.
 *
 * WHAT IS PROVED
 * --------------
 *   1. CONTROL: the real repository passes (every finding declared, none new)
 *   2. a credential that is NOT declared FAILS, and is named
 *   3. CONTROL: BITS_ROOT is honoured — a tree with no credential finds none,
 *      which proves the override actually redirects the scan
 *   4. a declared credential that has been REMOVED FAILS as a stale expectation,
 *      so removing a credential cannot turn this gate silently green
 *
 * Run: node scripts/history-secret-scan-negative.mjs
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const GATE = join(process.cwd(), "scripts", "history-secret-scan.mjs");
const SANDBOX = join(tmpdir(), `bits-secret-scan-negative-${process.pid}`);

/* Synthetic, shaped like a provider token so the detector fires. Not a key. */
const SYNTHETIC_RESEND = "re_SyntheticFixtureOnly0000000000000AAAA";
const SYNTHETIC_STRIPE = "sk_live_" + "SyntheticFixtureOnly0000000000";

let pass = 0;
let fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) {
    pass++;
    console.log(`PASS  ${label}`);
  } else {
    fail++;
    console.log(`FAIL  ${label}${detail ? `\n        ${detail}` : ""}`);
  }
};

function git(cwd, ...args) {
  return spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" });
}

/** Build a throwaway repo whose history contains `files`. */
function fixtureRepo(files) {
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(SANDBOX, { recursive: true });
  git(SANDBOX, "init", "-q");
  git(SANDBOX, "config", "user.email", "fixture@example.test");
  git(SANDBOX, "config", "user.name", "Fixture");
  for (const [rel, body] of Object.entries(files)) {
    const abs = join(SANDBOX, rel);
    mkdirSync(join(abs, ".."), { recursive: true });
    writeFileSync(abs, body, "utf8");
  }
  git(SANDBOX, "add", "-A");
  git(SANDBOX, "commit", "-q", "-m", "fixture");
  return SANDBOX;
}

function runGate(root, extraEnv = {}) {
  const r = spawnSync("node", [GATE], {
    cwd: process.cwd(),
    env: { ...process.env, BITS_ROOT: root, ...extraEnv },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return { code: r.status, out: `${r.stdout || ""}${r.stderr || ""}` };
}

console.log("=== SECRET HISTORY SCAN — NEGATIVE TEST ===\n");

// 1. CONTROL — the real repository must pass: every finding is declared.
{
  const r = spawnSync("node", [GATE], { cwd: process.cwd(), encoding: "utf8" });
  check("CONTROL: the real repository PASSES", r.status === 0, `exit ${r.status}\n${(r.stderr || "").slice(-500)}`);
  check("CONTROL: …and says 0 new", /0 new/.test(`${r.stdout}`), (r.stdout || "").slice(-300));
  check("CONTROL: …and still says the demo credential is committed", /STILL COMMITTED/.test(`${r.stdout}`), (r.stdout || "").slice(-300));
}

// 2. A credential nobody declared must FAIL and be named.
//
//    THIS IS THE CASE THAT CAUGHT THE REAL DEFECT. The first version of the
//    gate's KNOWN table keyed on the DETECTOR NAME alone, so this exact token —
//    a Resend-shaped string nothing had ever declared — was absorbed into the
//    calibration entry and the gate reported "0 new", exit 0. A brand-new key of
//    a known provider would have passed silently forever.
{
  const root = fixtureRepo({
    "app/config.ts": `export const key = "${SYNTHETIC_RESEND}";\n`,
  });
  const r = runGate(root);
  check("an UNDECLARED credential FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and it is reported under NEW FINDINGS", /NEW FINDINGS/.test(r.out), r.out.slice(-600));
  check("…and it names the file", /app\/config\.ts/.test(r.out), r.out.slice(-600));
  check("…and it does NOT print the raw value", !r.out.includes(SYNTHETIC_RESEND), "the secret leaked into the report");
  check(
    "…and it is NOT absorbed by the KNOWN entry for the same detector",
    !/known\/declared[^\n]*\n[\s\S]{0,200}$/.test(r.out.split("NEW FINDINGS")[0]) || /1 new/.test(r.out),
    r.out.slice(-600),
  );
}

// 3. CONTROL — BITS_ROOT is honoured. A tree with no credential must find none.
//    Without this, case 2 could pass simply because the scan read THIS repo.
{
  const root = fixtureRepo({ "app/config.ts": `export const port = 3000;\n` });
  const r = runGate(root);
  check("CONTROL: BITS_ROOT is honoured — a clean synthetic repo finds nothing", r.code === 0, `exit ${r.code}\n${r.out.slice(-600)}`);
  // Assert on the marker, not the words: the classifier self-test always prints
  // a line containing "demo password", so matching that string proved nothing.
  check("CONTROL: …and no KNOWN finding was reported from the real repo", !/\[KNOWN\]/.test(r.out), r.out.slice(-600));
  check("CONTROL: …and it really scanned 1 blob, not 1628", /over 1 blob/.test(r.out), r.out.slice(-300));
}

// 4. A DECLARED credential that has been removed must FAIL, not go quietly green.
//    BITS_KNOWN_STRICT makes the home-repo scoping apply to a synthetic tree —
//    without it, every KNOWN expectation would be "stale" in any fixture, which
//    is §100's rule about a test failing for a reason that is not a defect.
{
  const root = fixtureRepo({
    "lib/scanner.mjs": `const token = "${SYNTHETIC_STRIPE}";\nexport default token;\n`,
  });
  const r = runGate(root, { BITS_KNOWN_STRICT: "1" });
  check("a declared finding that STOPPED occurring is reported", /STALE EXPECTATION/.test(r.out), r.out.slice(-800));
  check("…and it FAILS", r.code !== 0, `exit was ${r.code}`);

  // CONTROL: the same tree WITHOUT the strict flag must not report staleness,
  // proving the scoping is what suppressed it and not something incidental.
  const loose = runGate(root);
  check("CONTROL: without the flag a foreign tree is not judged on our KNOWN table", !/STALE EXPECTATION/.test(loose.out), loose.out.slice(-600));
}

rmSync(SANDBOX, { recursive: true, force: true });

console.log(`\n${fail === 0 ? "✔" : "✖"} history-secret-scan negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);