/**
 * §106 — is the working tree what the last commit says it is?
 *
 *   Run:  node scripts/working-tree-integrity.mjs
 *
 * WHY THIS EXISTS
 * ---------------
 * SYSTEM_AUDIT.md §105.11: six gated source files were silently rewritten in the
 * working tree, outside git. `app/demo/page.tsx` came back as a pre-§101 version —
 * the page whose false claims §101 had corrected, reverted, committed and then
 * lost on disk. `git status` was clean for most of the phase, and nothing in
 * `test:unit` noticed. The only reason it surfaced at all is that
 * `docs-claims-drift.mjs` and `ai-disclosure.selfcheck.mjs` derive the same named
 * quantity from different code paths and disagreed on a documented number.
 *
 * That is luck, not a check. The signature of the event was distinctive and
 * checkable: **the working tree matched an OLDER COMMIT.** An ordinary edit does
 * not; the file is new content nobody has ever committed. So the detector can
 * tell corruption from work-in-progress by evidence rather than by guessing.
 *
 * WHY IT FAILS ON ONLY ONE OF THE TWO CASES
 * -----------------------------------------
 * A dirty working tree is NORMAL — someone is mid-edit. Failing on every
 * modification would make this gate cry wolf on the first honest edit, and a gate
 * that cries wolf gets switched off. So:
 *
 *   REVERTED (working tree == a commit IN HEAD's history)  -> FAIL, with the sha
 *   ordinary uncommitted edit                            -> reported, not failed
 *   file deleted from disk but present in HEAD            -> reported, not failed
 *   untracked file under a gated directory                -> reported, not failed
 *   matches a commit HEAD does not contain               -> reported, not failed
 *
 * The first is the only one with positive evidence of corruption. §100 measured
 * that `test:unit` writes 0 bytes, so a suite run does not itself dirty the tree.
 *
 * The last one matters more than it looks. The history scan uses `--all`, so it
 * sees commits on branches HEAD does not contain; treating a match there as a
 * revert would report damage that did not happen and tell the reader to
 * `git restore` away their real work. Only a commit in HEAD's own past proves
 * that HEAD held this content and lost it.
 *
 * WHAT IT DOES NOT CLAIM
 * ----------------------
 * It compares the working tree to HEAD. It cannot tell WHO wrote the file, and it
 * cannot detect a revert that git never saw — an attacker with write access who
 * also amends the commit. §105.11's cause was never established; this gate proves
 * the damage, not the culprit.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.env.BITS_ROOT || process.cwd();

/* §105's lesson, applied before the first git call: `git` must run INSIDE ROOT.
 * Without `-C ROOT` the override is decorative and this gate would confidently
 * report on the wrong repository — the §98 failure at full size. */
const git = (...a) =>
  execFileSync("git", ["-C", ROOT, ...a], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });

const refuse = (why) => {
  console.log("=== WORKING TREE INTEGRITY (§106) ===\n");
  console.error(`  ✖ VACUOUS: ${why}`);
  console.error("\n✖ working-tree-integrity: nothing to check — refusing to report a pass.");
  process.exit(1);
};

/* ── Preflight ─────────────────────────────────────────────────────────── */
let head = null;
try {
  head = git("rev-parse", "--verify", "HEAD").trim();
} catch {
  refuse(`no git repository under ${ROOT} (or no HEAD commit).`);
}
if (!/^[0-9a-f]{40}$/.test(head)) refuse(`HEAD did not resolve to a sha (got "${head}").`);

/* ── Paths whose working-tree content differs from HEAD ───────────────── */
let changed = [];
let deleted = [];
try {
  const raw = git("diff", "--name-only", "--diff-filter=M", head, "--");
  changed = raw.split("\n").filter(Boolean);
  deleted = git("diff", "--name-only", "--diff-filter=D", head, "--").split("\n").filter(Boolean);
} catch (e) {
  refuse(`git diff failed: ${String(e.stderr || e.message).split("\n")[0].slice(0, 200)}`);
}

/* ── Untracked files, which a revert can also leave behind ─────────────── */
const untracked = git("ls-files", "--others", "--exclude-standard")
  .split("\n")
  .filter(Boolean);

/* ── Classify each change ───────────────────────────────────────────────
 *
 * For a changed path, hash the working-tree content the way git would, then ask
 * whether that blob appears in the history of that path. If it does, the content
 * is not new — it is an OLD version that came back. */
const reverted = [];
const edited = [];
const foreign = [];

for (const path of changed) {
  const abs = join(ROOT, path);
  if (!existsSync(abs) || !statSync(abs).isFile()) {
    deleted.push(path);
    continue;
  }
  let blob;
  try {
    blob = git("hash-object", "--", path).trim();
  } catch {
    edited.push({ path, why: "could not be hashed (binary, unreadable, or vanished mid-scan)" });
    continue;
  }
  let commits = [];
  try {
    commits = git("log", "--all", "--format=%H", "--", path).split("\n").filter(Boolean);
  } catch {
    edited.push({ path, why: "history for this path could not be read" });
    continue;
  }
  /* §106.1 — AND THE MATCH MUST BE AN ANCESTOR OF HEAD, OR IT PROVES NOTHING.
   *
   * The history scan runs with `--all`, so it reaches commits on branches HEAD
   * does not contain. A blob matching such a commit is not a LOST version:
   * HEAD never held it, so nothing was lost and the file is simply an edit that
   * happens to coincide with work elsewhere. Calling that a revert — and telling
   * the reader to `git restore` it — is a false alarm pointed at a real edit.
   *
   * Found by inverting the probe's own fixture. The probe built its sandbox
   * backwards (HEAD holding the OLD content, the disk the NEW), the gate still
   * printed REVERTED and exited 1, and the probe recorded that as a proof. Both
   * were wrong: the gate asserted "older" while only ever checking "somewhere in
   * history". The probe's inversion and the gate's missing check hid each other,
   * which is the only reason either survived review. This test is what makes them
   * independent — and it is also what will fail if the probe is ever inverted
   * again. */
  let match = null;
  let matchNotInHead = null;
  for (const c of commits) {
    let atCommit;
    try {
      atCommit = git("rev-parse", `${c}:${path}`).trim();
    } catch {
      continue; // the path did not exist in that commit
    }
    if (atCommit !== blob) continue;
    let inHeadHistory = false;
    try {
      git("merge-base", "--is-ancestor", c, head);
      inHeadHistory = true;
    } catch {
      inHeadHistory = false; // exit 1 means "not an ancestor" — expected, not an error
    }
    if (inHeadHistory) {
      match = c;
      break;
    }
    if (!matchNotInHead) matchNotInHead = c;
  }
  if (match) {
    const meta = git("show", "-s", "--format=%ad|%s", "--date=short", match).trim().split("|");
    reverted.push({ path, blob, commit: match, date: meta[0], subject: (meta[1] || "").slice(0, 90) });
  } else if (matchNotInHead) {
    const meta = git("show", "-s", "--format=%ad|%s", "--date=short", matchNotInHead)
      .trim()
      .split("|");
    foreign.push({
      path,
      commit: matchNotInHead,
      date: meta[0],
      subject: (meta[1] || "").slice(0, 90),
    });
  } else {
    edited.push({ path, why: "content is not in any commit — an ordinary uncommitted edit" });
  }
}

/* ── Report ────────────────────────────────────────────────────────────── */
console.log("=== WORKING TREE INTEGRITY (§106) ===\n");
console.log(`  repository                            ${ROOT}`);
console.log(`  HEAD                                  ${head.slice(0, 10)}`);
console.log(`  files differing from HEAD             ${changed.length}`);
console.log(`  deleted from disk but present in HEAD ${deleted.length}`);
console.log(`  untracked files                       ${untracked.length}`);
console.log(`  of those differing: REVERTED          ${reverted.length}`);
console.log(`  of those differing: ordinary edits    ${edited.length}`);
console.log(`  of those: match only outside HEAD     ${foreign.length}\n`);

if (reverted.length) {
  console.log("REVERTED — working tree content matches an OLDER COMMIT\n");
  for (const r of reverted) {
    console.log(`  ✖ ${r.path}`);
    console.log(`      working tree == the blob committed at ${r.commit.slice(0, 10)}  (${r.date})  ${r.subject}`);
  }
  console.log(
    "\n  This is not an edit. The file on disk is an older committed version,\n" +
      "  which means a change that was made, verified and committed has been LOST.\n" +
      "  Recover with `git restore -- <path>` unless you know why it came back.",
  );
  console.log();
}

if (deleted.length) {
  console.log("MISSING FROM DISK — tracked in HEAD, absent from the working tree\n");
  for (const d of deleted) console.log(`  · ${d}`);
  console.log();
}

if (foreign.length) {
  console.log("MATCHES A COMMIT HEAD DOES NOT CONTAIN — reported, not failed\n");
  for (const f of foreign) {
    console.log(`  · ${f.path}`);
    console.log(`      content == the blob committed at ${f.commit.slice(0, 10)}  (${f.date})  ${f.subject}`);
  }
  console.log(
    "\n  That commit is not in HEAD's history, so HEAD never held this content and\n" +
      "  nothing has been lost. This is an edit that matches work on another branch —\n" +
      "  or a branch or HEAD that has moved since. Check `git branch --contains " +
      "<sha>`\n" +
      "  before treating it as damage.\n",
  );
  console.log();
}

if (edited.length) {
  console.log("ORDINARY UNCOMMITTED EDITS — reported, not failed\n");
  for (const e of edited) console.log(`  · ${e.path}  (${e.why})`);
  console.log();
}

if (untracked.length) {
  console.log("UNTRACKED — present on disk, in no commit\n");
  for (const u of untracked.slice(0, 40)) console.log(`  · ${u}`);
  if (untracked.length > 40) console.log(`  … and ${untracked.length - 40} more`);
  console.log();
}

if (!changed.length && !deleted.length && !untracked.length) {
  console.log("✔ working tree matches HEAD exactly. Nothing to reconcile.");
  console.log("\n  NOT VERIFIED: that HEAD is correct. This gate compares the tree to the");
  console.log("  last commit; it cannot tell whether that commit is the right one.");
}

process.exit(reverted.length ? 1 : 0);