/**
 * SYSTEM_AUDIT.md §96 — can the NEGATIVE SUITES fail?
 *
 * §94 proved every gate can fail. §95 proved a negative test can be dead: one of
 * them had been failing for phases and nobody ran it. Neither of those says the
 * eleven wired negative suites can tell the difference between a gate that works
 * and a gate that has stopped working — which is the only thing they are for.
 *
 * A negative suite that cannot notice its gate going blind is worse than no
 * negative suite: it is a standing green tick certifying a check nobody has
 * tested. So each one is run twice in a sandbox:
 *
 *   1. on the untouched copy   -> it must PASS  (a broken probe proves nothing)
 *   2. with its GATE blinded   -> it must FAIL
 *
 * The blinding mutation disables the gate's own failure path, not the negative
 * suite. That direction matters: disabling the suite would only prove the suite
 * has an assertion, which is trivially true. Disabling the GATE asks the real
 * question — if this gate stopped catching anything tonight, would this suite
 * say so?
 *
 * Everything happens in the same %TEMP% sandbox §91 built. The negative suites
 * write tracked files in place by design; running them here is what makes that
 * safe.
 *
 *   Run:  node scripts/negative-suite-falsifiability.mjs
 *
 * NOT WIRED INTO test:unit — it runs 11 negative suites twice. Run it when a
 * gate or a negative suite changes.
 */
import { readFileSync, existsSync, mkdirSync, cpSync, rmSync, symlinkSync, writeFileSync, statSync } from "node:fs";
import { spawnSync, execFileSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
/* §100 — per-process, for the same reason as gate-falsifiability-probe.mjs: a
 * fixed %TEMP% path is a shared resource and two concurrent runs corrupt each
 * other's tree. */
const SANDBOX = join(tmpdir(), `bits-negative-falsifiability-sandbox-${process.pid}`);

const MIRROR = [
  "app", "components", "lib", "public", "scripts", "docs",
  "package.json", "next.config.ts", "tsconfig.json",
  "README.md", "PROJECT_STATUS.md", "CRM_BENCHMARK_AND_PRICING_STRATEGY.md",
];

/**
 * `suite` is what is being audited. `file`/`from`/`to` blind the GATE it audits,
 * never the suite itself.
 */
export const CASES = [
  {
    suite: "scripts/link-integrity-negative.mjs",
    file: "lib/site/link-integrity.selfcheck.mjs",
    from: "if (failures.length > 0) {", to: "if (false) {",
    rule: "a dangling link must fail link-integrity",
  },
  {
    suite: "scripts/derived-counts-negative.mjs",
    file: "scripts/derived-counts.mjs",
    from: "if (unexpected.length) {", to: "if (false) {",
    rule: "a hand-typed count must fail derived-counts",
  },
  {
    suite: "scripts/blog-claims-subject-negative.mjs",
    file: "scripts/blog-claims-subject.mjs",
    from: "if (subjectClaims.length) {", to: "if (false) {",
    rule: "a BITS-subject claim must fail blog-claims-subject",
  },
  {
    suite: "scripts/docs-claims-drift-negative.mjs",
    file: "scripts/docs-claims-drift.mjs",
    from: "if (failures.length) {", to: "if (false) {",
    rule: "a stale documented count must fail docs-claims-drift",
  },
  {
    suite: "scripts/gate-execution-audit-negative.mjs",
    file: "scripts/gate-execution-audit.mjs",
    from: "if (failing.length || silent.length) {", to: "if (false) {",
    rule: "a silent gate must fail gate-execution-audit",
  },
  // The audit and encoding-integrity gate on an EXPRESSION rather than a branch,
  // so the blind spot is the exit itself.
  {
    suite: "scripts/encoding-integrity-negative.mjs",
    file: "lib/site/encoding-integrity.selfcheck.mjs",
    from: "process.exit(failed === 0 ? 0 : 1);", to: "process.exit(0);",
    rule: "a corrupted file must fail encoding-integrity",
  },
  {
    suite: "scripts/bundle-boundary-negative.mjs",
    file: "lib/site/bundle-boundary.selfcheck.mjs",
    from: "process.exit(failed === 0 ? 0 : 1);", to: "process.exit(0);",
    rule: "a static heavy import must fail bundle-boundary",
  },
  {
    suite: "scripts/image-sizes-negative.mjs",
    file: "lib/site/image-sizes.selfcheck.mjs",
    from: "if (failures.length) {", to: "if (false) {",
    rule: "an unconfigured image quality must fail image-sizes",
  },
  {
    suite: "scripts/stack-version-drift-negative.mjs",
    file: "scripts/stack-version-drift.mjs",
    from: "if (failures > 0) {", to: "if (false) {",
    rule: "a stale documented version must fail stack-version-drift",
  },
  /* This suite imports `runClosure` and asserts on its RETURN VALUE, not on an
   * exit code, so blinding the CLI branch would have proved nothing at all — the
   * §90 error of aiming at a mechanism the test does not use. The detection is
   * the `hit` assignment inside the scan. */
  {
    suite: "scripts/gated-render-closure-negative.mjs",
    file: "scripts/gated-render-closure.mjs",
    from: "if (claims.length) { hit = { rule: claims[0].id, sentence: s.value }; break; }",
    to: "if (false) { hit = { rule: claims[0].id, sentence: s.value }; break; }",
    rule: "an attestation in ungated imported copy must be found by runClosure",
  },
  /* §59's negative suite audits the EXTRACTOR, not a separate gate: the defect it
   * exists to catch is `markdownProse` returning an empty list while the report
   * prints "CLEAN — 0 file(s) scanned". Blinding the `cleaned.length > 3` guard
   * reproduces exactly that. */
  {
    suite: "scripts/publication-docs-negative.mjs",
    file: "lib/site/security-claims.mjs",
    from: "if (cleaned.length > 3 && /[A-Za-z]/.test(cleaned)) {",
    to: "if (false) {",
    rule: "markdownProse must not silently return zero lines",
  },

  /* ── §100 — the three suites this file had no case for ───────────────────────
   *
   * §100's measurement found 2 of 13 negative suites in `test:unit` with no
   * falsifiability witness, and the closing line of this very file claimed every
   * one was covered. The two were `external-requests-negative` (§98) and
   * `falsifiability-coverage-negative` (§99) — both added in phases that added a
   * coverage gate for GATES and did not extend this audit to negative suites.
   *
   * Polarity, stated because §98 found it backwards once: here the harness runs
   * the NEGATIVE SUITE and requires it to fail. Blinding the gate's failure
   * branch makes the gate exit 0, the suite notices its subject stopped working,
   * and the suite exits non-zero. That is the wanted direction, and it is the
   * opposite of §98's gate probe, where `if (failures.length)` → `if (false)` made
   * the probe read exit 0 as "not detected". */
  {
    suite: "scripts/external-requests-negative.mjs",
    file: "scripts/external-requests.mjs",
    from: "if (failures.length) {",
    to: "if (false) {",
    rule: "an undeclared host must still fail external-requests",
  },
  {
    /* Two `process.exit(1)` sites: the §98 vacuity refusal and the failures
     * report. Blinding the first — the vacuity refusal — is enough, because the
     * suite's VACUOUS case expects that branch to exit non-zero. Blinding only
     * the failures report would leave that case passing and prove less. */
    suite: "scripts/falsifiability-coverage-negative.mjs",
    file: "scripts/falsifiability-coverage.mjs",
    from: "process.exit(1);",
    to: "process.exit(0);",
    rule: "an empty test:unit must still be refused, not passed",
  },
  {
    suite: "scripts/production-write-guard-negative.mjs",
    file: "scripts/production-write-guard-test.mjs",
    from: "process.exit(failed === 0 ? 0 : 1);",
    to: "process.exit(0);",
    rule: "an unguarded production-write script must still fail the guard suite",
  },

  /* ── §104 — the suite added alongside the duplicate-implementation gate ──────
   *
   * Polarity is the §100 one: blind the GATE's failure branch and the negative
   * suite must notice. Blinding `if (findings.length)` makes the gate exit 0 even
   * with a duplicate present, so the suite's first positive case — "an undeclared
   * duplicate in a GATE FAILS" — stops holding and the suite goes red.
   *
   * The anchor is the findings branch specifically, not a `process.exit(1)`:
   * this gate has two exit-1 paths and the vacuity refusal is separately witnessed
   * by the suite's own empty-`test:unit` case. */
  {
    suite: "scripts/duplicate-implementations-negative.mjs",
    file: "scripts/duplicate-implementations.mjs",
    from: "if (findings.length) {",
    to: "if (false) {",
    rule: "an undeclared duplicate must still fail the gate",
  },

  /* ── §105 — the secret-scan pair ───────────────────────────────────────────
   *
   * `history-secret-scan.mjs` existed since §39, was never wired, and exited 1 on
   * every run — which is exactly why nobody noticed: a check that is red for a
   * reason nobody can action and that nothing runs is indistinguishable from a
   * check that does not exist.
   *
   * Blinding `process.exit(ok ? 0 : 1)` is the correct polarity here. This gate
   * is a NEGATIVE gate — a finding means exit 1 — so blinding its failure branch
   * makes it exit 0 on a real credential, the negative suite's "an UNDECLARED
   * credential FAILS" case stops holding, and the suite goes red. That is the
   * wanted direction, the same one §100 established for the other negative gates. */
  {
    suite: "scripts/history-secret-scan-negative.mjs",
    file: "scripts/history-secret-scan.mjs",
    from: "process.exit(ok ? 0 : 1);",
    to: "process.exit(0);",
    rule: "an undeclared credential must still fail the secret scan",
  },

  /* ── §106 — the working-tree-integrity pair ────────────────────────────────
   *
   * `working-tree-integrity.mjs` exists because §105.11 lost six gated files to a
   * silent revert that no gate was watching for. Its negative suite has to be
   * able to see it stop working, or the fix is decoration.
   *
   * Polarity is §100's: this is a NEGATIVE gate — a reverted file means exit 1 —
   * so blinding the failure branch makes it exit 0 on a real revert, and the
   * suite's "a REVERTED file FAILS" case stops holding. */
  {
    suite: "scripts/working-tree-integrity-negative.mjs",
    file: "scripts/working-tree-integrity.mjs",
    from: "process.exit(reverted.length ? 1 : 0);",
    to: "process.exit(0);",
    rule: "a file reverted to an older commit must still fail the build",
  },
];

/* ── §100 — the run is a function now, so this file is importable ───────────
 *
 * `falsifiability-coverage.mjs` reads CASES from here for negative suites, the
 * same way §99 made it read them from the gate probe. Importing must not build
 * a sandbox or spawn anything, hence the guard at the bottom. */
export function runAudit() {
  let junctionError = null;
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(SANDBOX, { recursive: true });
  for (const entry of MIRROR) {
    const src = join(ROOT, entry);
    if (!existsSync(src)) continue;
    cpSync(src, join(SANDBOX, entry), { recursive: true });
  }
  try {
    symlinkSync(join(ROOT, "node_modules"), join(SANDBOX, "node_modules"), "junction");
    /* §100 — §99.6's finding applies here too, unfixed for seven phases.
     *
     * Windows creates a junction to a NON-EXISTENT target without complaint, so
     * the `catch` below could not fire for the failure it exists to detect. The
     * dangling junction would leave every suite importing zod/motion unable to
     * load, and this file — whose whole subject is "did the suite actually run?" —
     * would have reported the module-resolution crash as the answer.
     *
     * `statSync` FOLLOWS the reparse point, so it throws where the junction dangles
     * and succeeds where it resolves. */
    statSync(join(SANDBOX, "node_modules"));
  } catch (e) {
    junctionError = `FAILED (${e.message}) — any suite importing zod/motion cannot load.`;
  }

  /* §105 — this sandbox becomes a real repository too, because one suite audits a
   * gate that reads GIT HISTORY. Without it, `history-secret-scan.mjs` refused
   * (exit 2, "nothing scanned") and `gate-execution-audit-negative.mjs` — which
   * runs the whole chain, including that gate — went red for a reason that had
   * nothing to do with either subject.
   *
   * Both were reported as "not green on the sandbox", which is this file's way of
   * saying it proved nothing. That is the honest outcome for a sandbox that cannot
   * support the subject, so the fix is to make the sandbox able to, rather than to
   * relax what the suites require.
   *
   * `node_modules` is excluded for the same reason as in the gate probe: it is a
   * JUNCTION into the real tree, and `git add -A` walking it dies with ENOBUFS. */
  let gitError = null;
  if (CASES.some((c) => c.suite === "scripts/history-secret-scan-negative.mjs")) {
    try {
      writeFileSync(join(SANDBOX, ".gitignore"), "node_modules/\n.next/\n.gitignore\n", "utf8");
      const g = (...a) =>
        execFileSync("git", ["-C", SANDBOX, ...a], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
          maxBuffer: 64 * 1024 * 1024,
        });
      g("init", "-q");
      g("config", "user.email", "probe@example.test");
      g("config", "user.name", "Probe");
      g("add", "-A");
      g("commit", "-q", "-m", "sandbox baseline");
      const head = g("rev-list", "--count", "HEAD").trim();
      if (!/^[1-9]/.test(head)) throw new Error(`sandbox repo has ${head} commits after init`);
    } catch (e) {
      gitError = `FAILED (${e.message}) — suites auditing a history-scanning gate cannot run.`;
    }
  }

  const runIn = (cwd, script) => {
    const r = spawnSync("node", [script], { cwd, encoding: "utf8" });
    return { code: r.status, out: ((r.stdout || "") + (r.stderr || "")).trim() };
  };

  let pass = 0, fail = 0, inconclusive = 0;
  const provedSuites = new Set();

  for (const c of CASES) {
    const label = `${c.suite}  <-  ${c.rule}`;

    /* 1. The suite must be GREEN on the untouched sandbox. A suite that was
     * already failing cannot demonstrate that it detects anything. */
    const clean = runIn(SANDBOX, c.suite);
    if (clean.code !== 0) {
      console.log(`  SKIP  ${label}\n          not green on the sandbox: ${clean.out.split("\n").find((l) => /FAIL|✖/.test(l))?.trim()?.slice(0, 110) || clean.out.split("\n")[0]?.slice(0, 100)}`);
      inconclusive++;
      continue;
    }

    const target = join(SANDBOX, c.file);
    if (!existsSync(target)) {
      console.log(`  SKIP  ${label}\n          target not present in sandbox: ${c.file}`);
      inconclusive++;
      continue;
    }
    const original = readFileSync(target, "utf8");
    if (!original.includes(c.from)) {
      console.log(`  SKIP  ${label}\n          anchor not found — the probe proves nothing`);
      inconclusive++;
      continue;
    }

    /* 2. Blind the gate and require the suite to notice. */
    writeFileSync(target, original.replace(c.from, c.to), "utf8");
    const blinded = runIn(SANDBOX, c.suite);
    writeFileSync(target, original, "utf8");

    const restored = readFileSync(target, "utf8") === original;

    /* §92 — a non-zero exit is only proof if the suite actually RAN. A module
     * resolution crash is not a failing assertion. */
    const loadError = /Cannot find (module|package)|ERR_MODULE_NOT_FOUND|ERR_UNSUPPORTED_DIR_IMPORT|SyntaxError:/.test(
      blinded.out,
    );

    if (blinded.code === 0) {
      fail++;
      console.log(`  FAIL  ${label}\n          the suite stayed GREEN with its gate blinded — it does not test what it claims`);
      console.log(`          gate said: ${blinded.out.split("\n").filter((l) => l.trim()).slice(-4).join(" | ").slice(0, 200)}`);
    } else if (loadError) {
      fail++;
      console.log(`  FAIL  ${label}\n          the suite could not LOAD — a module error is not a failing assertion`);
    } else if (!restored) {
      fail++;
      console.log(`  FAIL  ${label}\n          ${c.file} was not restored byte-for-byte`);
    } else {
      pass++;
      provedSuites.add(c.suite);
      const line = blinded.out
        .split("\n")
        .find((l) => /FAIL/.test(l) && !/real repository|control|baseline|precondition/i.test(l))
        || blinded.out.split("\n").find((l) => l.trim())
        || "";
      console.log(`  PASS  ${label}\n          exit ${blinded.code}: ${line.trim().slice(0, 104)}`);
    }
  }

  /* Coverage, computed from package.json the same way the gate probe does it.
   * §95 measured that 21 of 31 gates have no negative suite; the question here is
   * the mirror one — are the suites that DO exist able to notice? */
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const negatives = [...new Set(pkg.scripts["test:unit"].match(/[\w./-]+\.mjs/g) || [])]
    .filter((e) => e.endsWith("-negative.mjs"))
    .sort();
  const unknown = negatives.filter((n) => !provedSuites.has(n));

  rmSync(SANDBOX, { recursive: true, force: true });

  console.log(
    `\nsandbox removed; real tree never written.\n` +
    `§96 negative-suite falsifiability: ${pass} proven able to catch a blinded gate, ` +
    `${fail} not proven, ${inconclusive} inconclusive (of ${CASES.length} suites).`
  );
  console.log(
    `coverage, computed from package.json "test:unit": ` +
    `${provedSuites.size}/${negatives.length} negative suites demonstrated able to fail.`
  );
  if (unknown.length) {
    console.log(`  not demonstrated here:\n    ${unknown.join("\n    ")}`);
  }
  if (junctionError) console.log(`  ⚠ node_modules junction: ${junctionError}`);
  if (gitError) console.log(`  ⚠ sandbox git history: ${gitError}`);

  const bad = CASES.filter((c) => !provedSuites.has(c.suite)).map((c) => `${c.suite} (${c.rule})`);
  /* §105 — a sandbox that could not become a repository cannot produce evidence
   * about a suite whose subject is git history. Named, never swallowed: a silent
   * degradation into an unproven suite reads as "this suite is fine". */
  if (gitError) bad.push(`sandbox git history ${gitError}`);
  if (bad.length) {
    console.error(`\n✖ ${bad.length} negative suite(s) could not be shown to catch a blinded gate:`);
    for (const b of bad) console.error(`    ✖ ${b}`);
    process.exit(1);
  }

  /* §100 — this line was a FALSE CLAIM, and it is worth keeping the correction.
   *
   * It read `✔ every negative suite in test:unit detects its gate stopping
   * working` while the run two lines above had just printed
   * "not demonstrated here: external-requests-negative, falsifiability-coverage-negative".
   *
   * `bad` only covers suites that HAVE a case. A suite with no case cannot appear
   * in `bad`, because there is nothing to have failed — so the one-way check was
   * structurally incapable of noticing the gap, and the closing sentence asserted
   * a universal it had not tested. §92's error one level down: converting an
   * unknown into a confident claim.
   *
   * Both directions are now checked. `unknown` is a suite nobody has tried to
   * break, which is an honest gap rather than a failure — but it is NOT a pass,
   * and it must not be described as one. */
  if (unknown.length) {
    console.error(`\n✖ ${unknown.length} negative suite(s) in test:unit have no falsifiability witness:`);
    for (const u of unknown) console.error(`    ✖ ${u} — add a case to CASES naming what it blinds`);
    process.exit(1);
  }
  console.log(
    `\n✔ all ${negatives.length} negative suites in test:unit detect their gate stopping working.`,
  );
}

/* Same shape as §99: compare the module URL against the resolved entry point.
 * `require.main` does not exist in ESM, and trusting it is the reason a whole
 * class of gate can exit 0 having printed nothing. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runAudit();
}