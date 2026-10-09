/**
 * SYSTEM_AUDIT.md §106 — negative test for `working-tree-integrity.mjs`.
 *
 * WHY A SYNTHETIC REPOSITORY
 * --------------------------
 * This gate's subject is the relationship between a working tree and its git
 * history. The only faithful fixtures are real repositories with real commits —
 * a mutation of a copy of the gate would test the copy (§102's defect shape), and
 * committing a synthetic revert to THIS repository to have something to find
 * would manufacture the exact damage the gate exists to catch.
 *
 * So each case builds a throwaway repo in `%TEMP%` with its own two-commit
 * history, and the gate runs against it via `BITS_ROOT`. Nothing in this
 * repository is written.
 *
 * WHAT IS PROVED
 * --------------
 *   1. CONTROL: a clean tree passes
 *   2. a REVERT (disk holds an older committed version) FAILS, and names the
 *      commit it came back from — the §105.11 event, reproduced
 *   3. CONTROL: an ORDINARY uncommitted edit does NOT fail, and is reported
 *      (a gate that cried wolf on every honest edit would be switched off)
 *   4. a file deleted from disk but present in HEAD is reported
 *   5. an untracked file is reported
 *   6. a tree that is not a repository REFUSES, rather than reporting a clean
 *   7. §106.1 CONTROL: content that matches a commit OUTSIDE HEAD's history is
 *      reported, not failed — and, in the SAME repository, an ancestor revert
 *      still fails, so the two outcomes are distinguishable
 *
 * Run: node scripts/working-tree-integrity-negative.mjs
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const GATE = join(process.cwd(), "scripts", "working-tree-integrity.mjs");
const SANDBOX = join(tmpdir(), `bits-wt-integrity-negative-${process.pid}`);

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

/**
 * A repository with exactly the history this gate is about:
 *   commit 1  "first version"   v1
 *   commit 2  "second version"  v2      <- HEAD
 * Returns the directory and the two shas.
 */
function fixtureRepo() {
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(join(SANDBOX, "lib"), { recursive: true });
  git(SANDBOX, "init", "-q");
  git(SANDBOX, "config", "user.email", "fixture@example.test");
  git(SANDBOX, "config", "user.name", "Fixture");

  writeFileSync(join(SANDBOX, "lib", "page.ts"), "export const v = 1;\n", "utf8");
  git(SANDBOX, "add", "-A");
  git(SANDBOX, "commit", "-q", "-m", "first version");
  const first = git(SANDBOX, "rev-parse", "HEAD").stdout.trim();

  writeFileSync(join(SANDBOX, "lib", "page.ts"), "export const v = 2;\n", "utf8");
  git(SANDBOX, "add", "-A");
  git(SANDBOX, "commit", "-q", "-m", "second version");
  const second = git(SANDBOX, "rev-parse", "HEAD").stdout.trim();

  return { dir: SANDBOX, first, second };
}

function runGate(root) {
  const r = spawnSync("node", [GATE], {
    cwd: process.cwd(),
    env: { ...process.env, BITS_ROOT: root },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return { code: r.status, out: `${r.stdout || ""}${r.stderr || ""}` };
}

console.log("=== WORKING TREE INTEGRITY — NEGATIVE TEST ===\n");

// 1. CONTROL — clean tree.
{
  const { dir } = fixtureRepo();
  const r = runGate(dir);
  check("CONTROL: a clean tree PASSES", r.code === 0, `exit ${r.code}\n${r.out.slice(-500)}`);
  check("CONTROL: …and says it matches HEAD", /matches HEAD exactly/.test(r.out), r.out.slice(-400));
  check("CONTROL: …and states what it does NOT verify", /NOT VERIFIED/.test(r.out), r.out.slice(-400));
}

// 2. THE DEFECT — disk holds an older committed version. This is §105.11.
{
  const { dir, first } = fixtureRepo();
  writeFileSync(join(dir, "lib", "page.ts"), "export const v = 1;\n", "utf8");
  const r = runGate(dir);
  check("a REVERTED file FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and it is labelled REVERTED, not merely as a difference", /REVERTED/.test(r.out), r.out.slice(-500));
  check("…and it names the file", /lib\/page\.ts/.test(r.out), r.out.slice(-500));
  check("…and it names the commit the content came back from", new RegExp(first.slice(0, 10)).test(r.out), r.out.slice(-500));
  check("…and it prints that commit's subject", /first version/.test(r.out), r.out.slice(-500));
  check("…and it does not count it as an ordinary edit", !/ordinary uncommitted edit/.test(r.out), r.out.slice(-500));
}

// 3. CONTROL — an ordinary uncommitted edit is REPORTED, not failed.
{
  const { dir } = fixtureRepo();
  writeFileSync(join(dir, "lib", "page.ts"), "export const v = 999; // brand new work\n", "utf8");
  const r = runGate(dir);
  check("CONTROL: an ordinary uncommitted edit does NOT fail", r.code === 0, `exit ${r.code}\n${r.out.slice(-500)}`);
  check("CONTROL: …but it IS reported", /ORDINARY UNCOMMITTED EDITS/.test(r.out), r.out.slice(-400));
  check("CONTROL: …and named", /lib\/page\.ts/.test(r.out), r.out.slice(-400));
}

// 4. A tracked file missing from disk is reported.
{
  const { dir } = fixtureRepo();
  rmSync(join(dir, "lib", "page.ts"), { force: true });
  const r = runGate(dir);
  check("a file MISSING FROM DISK is reported", /MISSING FROM DISK/.test(r.out), r.out.slice(-500));
  check("CONTROL: …and it does not fail the build", r.code === 0, `exit was ${r.code}`);
}

// 5. An untracked file is reported.
{
  const { dir } = fixtureRepo();
  writeFileSync(join(dir, "lib", "scratch.ts"), "export const scratch = 1;\n", "utf8");
  const r = runGate(dir);
  check("an UNTRACKED file is reported", /UNTRACKED/.test(r.out), r.out.slice(-500));
  check("CONTROL: …and it does not fail the build", r.code === 0, `exit was ${r.code}`);
}

// 6. A directory that is not a repository must REFUSE, not report a clean pass.
{
  const notRepo = join(tmpdir(), `bits-wt-integrity-notrepo-${process.pid}`);
  rmSync(notRepo, { recursive: true, force: true });
  mkdirSync(notRepo, { recursive: true });
  const r = runGate(notRepo);
  check("a tree with NO git repository REFUSES", r.code !== 0, `exit was ${r.code}`);
  check("…and it says it is refusing to report a pass", /refusing to report a pass/.test(r.out), r.out.slice(-400));
  check("…and it does not print the green tick", !/matches HEAD exactly/.test(r.out), r.out.slice(-400));
  rmSync(notRepo, { recursive: true, force: true });
}

/* §106.1 — a repository with a commit on a side branch. `--all` reaches it, but
 * HEAD never held that content, so a match there is NOT a lost version. */
function fixtureRepoWithSideBranch() {
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(join(SANDBOX, "lib"), { recursive: true });
  git(SANDBOX, "init", "-q");
  git(SANDBOX, "config", "user.email", "fixture@example.test");
  git(SANDBOX, "config", "user.name", "Fixture");
  writeFileSync(join(SANDBOX, "lib", "page.ts"), "export const v = 1;\n", "utf8");
  git(SANDBOX, "add", "-A");
  git(SANDBOX, "commit", "-q", "-m", "first version");
  writeFileSync(join(SANDBOX, "lib", "page.ts"), "export const v = 2;\n", "utf8");
  git(SANDBOX, "add", "-A");
  git(SANDBOX, "commit", "-q", "-m", "second version");
  const head = git(SANDBOX, "rev-parse", "HEAD").stdout.trim();
  const branch = git(SANDBOX, "rev-parse", "--abbrev-ref", "HEAD").stdout.trim();
  git(SANDBOX, "checkout", "-q", "-b", "side");
  writeFileSync(join(SANDBOX, "lib", "page.ts"), "export const v = 3;\n", "utf8");
  git(SANDBOX, "add", "-A");
  git(SANDBOX, "commit", "-q", "-m", "side branch version");
  const side = git(SANDBOX, "rev-parse", "side").stdout.trim();
  git(SANDBOX, "checkout", "-q", branch);
  return { dir: SANDBOX, head, side, branch };
}

// 7. §106.1 — a blob that exists ONLY outside HEAD's history is not a lost version.
{
  const { dir, side } = fixtureRepoWithSideBranch();
  writeFileSync(join(dir, "lib", "page.ts"), "export const v = 3;\n", "utf8");
  const r = runGate(dir);
  check("a blob matching only a commit OUTSIDE HEAD does not fail the build", r.code === 0, `exit was ${r.code}\n${r.out.slice(-600)}`);
  check("…it is reported as matching a commit HEAD does not contain", /MATCHES A COMMIT HEAD DOES NOT CONTAIN/.test(r.out), r.out.slice(-600));
  check("…it is NOT given the revert remedy", !/Recover with/.test(r.out), r.out.slice(-600));
  check("…and it names the commit it coincidentally matches", new RegExp(side.slice(0, 10)).test(r.out), r.out.slice(-600));
}

// 8. CONTROL — same repository, an IN-ANCESTOR revert still fails. Without this the
// case above would also pass against a gate that had simply stopped detecting
// anything, which is §98's failure mode. Two disk contents, one repo, opposite
// verdicts: the check can tell them apart, or it is decoration.
{
  const { dir } = fixtureRepoWithSideBranch();
  writeFileSync(join(dir, "lib", "page.ts"), "export const v = 1;\n", "utf8");
  const r = runGate(dir);
  check("CONTROL: the SAME repo with an ancestor revert still FAILS", r.code !== 0, `exit was ${r.code}`);
  check("CONTROL: …and is called REVERTED", /REVERTED —/.test(r.out), r.out.slice(-600));
}

rmSync(SANDBOX, { recursive: true, force: true });

console.log(`\n${fail === 0 ? "✔" : "✖"} working-tree-integrity negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);