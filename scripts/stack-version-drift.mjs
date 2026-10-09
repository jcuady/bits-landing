/*
 * SYSTEM_AUDIT.md §45 — stack versions stated in docs must match package.json.
 *
 * Version drift in documentation is not a hypothetical. It has now happened three
 * times in this repository, and twice in the same commit:
 *
 *   §41  upgraded next 16.3.5 -> 16.3.8 to clear 1 critical + 6 high advisories,
 *        and wrote "the README also pinned next@16.3.5; updated to 16.3.8".
 *   §43  PROJECT_STATUS.md still said "Next.js 16.3.5" — and cited §8 as authority.
 *   §45  SYSTEM_AUDIT.md's own header STILL said 16.3.5, on the one line every
 *        reader sees before anything else, while §41's correction sat 3500 lines
 *        below it. docs/FULL_SYSTEM_DOCUMENTATION.md said 16.3.5 too.
 *
 * The pattern is identical to §43: a document states a fact that was true when
 * written, and the code moves on. Unlike §43's, this one is mechanically
 * checkable, so it should not be left to memory.
 *
 * WHY THIS IS NOT A TEXT SCAN FOR ANY VERSION ANYWHERE
 * ----------------------------------------------------
 * SYSTEM_AUDIT.md §44 measured exactly this problem: a gate that scans prose for
 * a pattern and needs an escape hatch for historical mentions has, in the
 * general case, no separation between the classes. That section proved it with a
 * sweep — two strings at identical distance that no threshold could split.
 *
 * So this gate matches ONLY the lines that are explicitly the stack declaration:
 * the version table rows and the "Stack (verified…)" header. Those have no
 * historical mentions to exclude. `SYSTEM_AUDIT.md` also narrates the 16.3.5
 * history in §41 and §43, and a looser rule would either false-positive on the
 * audit trail or need an escape hatch that becomes a loophole.
 *
 * Values come from package.json. Only the LOCATIONS are declared here — the same
 * shape as the negative-test table: the list of places to look is stated, the
 * correct answer is derived, never copied.
 *
 * Run: node scripts/stack-version-drift.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const pkg = JSON.parse(read("package.json"));
const declared = { ...pkg.dependencies, ...pkg.devDependencies };

/** package name -> the exact version installed (range prefix stripped). */
function installed(name) {
  const spec = declared[name];
  if (!spec) throw new Error(`package.json has no "${name}" — the gate cannot verify it`);
  return spec.replace(/^[\^~>=<\s]+/, "");
}

/* Slot label -> package.json name. */
const SLOT_TO_PACKAGE = {
  Framework: "next",
  Runtime: "react",
  Library: "react",
  Language: "typescript",
  Styling: "tailwindcss",
};

/*
 * The declarations this gate is responsible for. Each entry is a line matcher.
 * Keep these NARROW — §44 is the reason.
 */
const DECLARATIONS = [
  {
    file: "README.md",
    // | **Framework** | Next.js (App Router) | `16.3.8` | … |
    re: /^\|\s*\*\*(Framework|Runtime|Language|Styling)\*\*\s*\|[^|]*\|\s*`?(\d+\.\d+\.\d+)`?\s*\|/,
    slots: ["Framework", "Runtime", "Language", "Styling"],
  },
  {
    file: "docs/FULL_SYSTEM_DOCUMENTATION.md",
    re: /^\|\s*\*\*(Framework|Runtime|Language|Styling)\*\*\s*\|[^|]*\|\s*`?(\d+\.\d+\.\d+)`?\s*\|/,
    slots: ["Framework", "Runtime", "Language", "Styling"],
  },
  {
    file: "PROJECT_STATUS.md",
    // * **Framework**: Next.js 16.3.8 (App Router with Turbopack)
    re: /^\*\s*\*\*(Framework|Library)\*\*:\s*\S+\s+(\d+\.\d+\.\d+)/,
    slots: ["Framework", "Library"],
  },
  {
    file: "docs/SYSTEM_AUDIT.md",
    // > **Stack (verified 8 Oct 2026):** Next.js 16.3.8 | React 19.3.0 | …
    re: /^>\s*\*\*Stack \(verified[^)]*\):\*\*\s*(.+)$/,
    // Single header line; the required packages are asserted as the NAMES map below.
    slots: null,
  },
];

/**
 * Lines of a file that are DOCUMENT TEXT, not code samples.
 *
 * A line inside a ``` fence is quoted source, not a live declaration — this file
 * quotes the old header verbatim in §45.1 to show what it said, and that quote
 * was being reported as live drift. Found by running the gate while writing the
 * section about it.
 *
 * This is not an escape hatch for prose. A fence is unambiguous: whatever is
 * inside it is an illustration. Prose that merely *mentions* a version still
 * gets matched, because that is the drift we want.
 */
function documentLines(src) {
  const out = [];
  let inFence = false;
  for (const line of src.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) out.push(line);
  }
  return out;
}

let failures = 0;
const checked = [];

function fail(message) {
  failures += 1;
  console.log(`FAIL  ${message}`);
}

for (const { file, re, slots } of DECLARATIONS) {
  const lines = documentLines(read(file));
  const foundSlots = new Set();
  let headerMatched = false;

  for (let i = 0; i < lines.length; i += 1) {
    const m = re.exec(lines[i]);
    if (!m) continue;

    if (file === "docs/SYSTEM_AUDIT.md") {
      headerMatched = true;
      // The header states every package on one line: "Next.js 16.3.8 | React 19.3.0 | …"
      const header = m[1];
      const entries = [...header.matchAll(/(Next\.js|React|TypeScript|Tailwind)\s+(\d+\.\d+\.\d+)/g)];
      if (entries.length === 0) {
        fail(`${file}:${i + 1}: the Stack header matched but no versions were parsed from it — the gate cannot see this line`);
        continue;
      }
      const NAMES = { "Next.js": "next", React: "react", TypeScript: "typescript", Tailwind: "tailwindcss" };
      // A matchAll entry is [fullMatch, group1, group2] — skip fullMatch, or the
      // label reads "Next.js 16.3.8" and every lookup misses.
      for (const [, label, version] of entries) {
        const name = NAMES[label];
        if (!name) {
          fail(`${file}:${i + 1}: unknown package label "${label}" in the Stack header`);
          continue;
        }
        checked.push({ where: `${file}:${i + 1}`, label, version });
        const want = installed(name);
        if (version !== want) {
          fail(
            `${file}:${i + 1}: header says ${label} ${version}, package.json says ${want}. ` +
              `Update the doc — or upgrade the dependency.`
          );
        }
      }
      continue;
    }

    const [, slot, version] = m;
    foundSlots.add(slot);
    const name = SLOT_TO_PACKAGE[slot];
    if (!name) {
      fail(`${file}:${i + 1}: unknown stack slot "${slot}"`);
      continue;
    }
    checked.push({ where: `${file}:${i + 1}`, label: slot, version });
    const want = installed(name);
    if (version !== want) {
      fail(`${file}:${i + 1}: says ${slot} ${version}, package.json says ${want} (${name})`);
    }
  }

  /* ANTI-VACUITY, PER SLOT. A doc restructure that renamed the Framework row
   * would otherwise leave the other three rows matching, the file looking
   * "covered", and `next`'s version in that file silently unchecked. Found by
   * the negative test's first attempt, which renamed one row and expected the
   * gate to notice — it did not. Every declared slot must still be found. */
  if (slots === null) {
    if (!headerMatched) {
      fail(`${file}: the Stack header line is no longer matched — package.json versions are unchecked here.`);
    }
  } else {
    for (const slot of slots) {
      if (!foundSlots.has(slot)) {
        fail(
          `${file}: the "${slot}" stack row is missing. Its version is no longer checked anywhere in this file.`
        );
      }
    }
  }
}

/* Guard the guard: the comparison must be able to fail. */
if (installed("next") === "0.0.0") fail("installed('next') looks wrong — the comparison is not real");

console.log("");
if (failures > 0) {
  console.error(`FAILED  ${failures} drift finding(s) across ${checked.length} declared versions`);
  process.exitCode = 1;
} else {
  console.log(
    `stack versions verified (${checked.length} declared versions across ${DECLARATIONS.length} files match package.json)`
  );
}