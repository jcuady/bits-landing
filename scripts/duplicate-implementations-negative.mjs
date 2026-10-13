/**
 * SYSTEM_AUDIT.md §104 — negative test for `duplicate-implementations.mjs`.
 *
 * WHY A SYNTHETIC TREE
 * --------------------
 * This gate's whole subject is what the repository contains, so a negative suite
 * that injected a duplicate into `lib/` would be writing the very files it is
 * auditing, and restoring them afterwards (§96's write-window problem). The gate
 * honours `BITS_ROOT`, so every case below is a MINIMAL FIXTURE TREE built in
 * `%TEMP%` with invented module names. **Nothing in the repository is written,
 * restored, or read for its content by any case.**
 *
 * §93's rule applied to the fixture: a negative test whose fixture IS the bug it
 * exists to catch is alive only until the bug is fixed. `escapeHtml` here is a
 * synthetic name, so a future edit to the real `lib/html-escape.ts` cannot
 * silently un-teach this file.
 *
 * WHAT IS PROVED
 * --------------
 * POSITIVE — the gate must FAIL:
 *   1.  an undeclared duplicate inside a GATE
 *   2.  an undeclared duplicate inside a NEGATIVE SUITE  (§104.1 blind spot)
 *   3.  the `arrow const` shape — the one §103's sweep MISSED
 *   4.  the `function const` shape
 *   5.  an empty `test:unit` refuses
 *   6.  gates present but nothing indexed refuses            (§104.2 blind spot)
 *   7.  a missing package.json refuses
 * NEGATIVE — the gate must PASS, i.e. it must not fire by mistake:
 *   8.  CONTROL: the gate imports the shipped function
 *   9.  CONTROL: the duplicate is in DECLARED, with its reason
 *   10. CONTROL: a local name that shipped code does not export
 *   11. CONTROL: the real repository
 *
 * Every positive case also asserts the gate NAMES the offending file and
 * function, because a detector that exits 1 without saying why is not usable.
 *
 * Run: node scripts/duplicate-implementations-negative.mjs
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const GATE = join(process.cwd(), "scripts", "duplicate-implementations.mjs");
const SANDBOX = join(tmpdir(), `bits-duplicate-impls-negative-${process.pid}`);

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

/** Build a throwaway tree. `files` maps repo-relative path -> contents.
 *  `testUnit` is the script body package.json will carry. */
function fixture({ testUnit, files = {}, dirs = [] } = {}) {
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(SANDBOX, { recursive: true });
  if (testUnit !== undefined) {
    writeFileSync(
      join(SANDBOX, "package.json"),
      JSON.stringify({ name: "fixture", scripts: { "test:unit": testUnit } }, null, 2),
      "utf8",
    );
  }
  for (const d of dirs) mkdirSync(join(SANDBOX, d), { recursive: true });
  for (const [rel, body] of Object.entries(files)) {
    const abs = join(SANDBOX, rel);
    mkdirSync(join(abs, ".."), { recursive: true });
    writeFileSync(abs, body, "utf8");
  }
  return SANDBOX;
}

function runGate(root) {
  const r = spawnSync("node", [GATE], {
    cwd: process.cwd(),
    env: { ...process.env, BITS_ROOT: root },
    encoding: "utf8",
  });
  return { code: r.status, out: `${r.stdout || ""}${r.stderr || ""}` };
}

/* A synthetic shipped module exporting the two names the cases collide on. */
const SHIPPED_ESCAPE = `export function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;");
}
`;
const SHIPPED_STRIP = `export function stripComments(src) {
  return String(src).replace(/\\/\\*[\\s\\S]*?\\*\\//g, "");
}
`;

console.log("=== DUPLICATE IMPLEMENTATIONS — NEGATIVE TEST ===\n");

/* ------------------------------------------------------------------ *
 * 0. PRECONDITIONS
 * ------------------------------------------------------------------ */

// 0a. A baseline in which the gate does the RIGHT thing must PASS, or every
//     positive case below could be failing for an unrelated reason.
{
  const root = fixture({
    testUnit: "node lib/site/gate-a.mjs",
    files: {
      "lib/html-escape.mjs": SHIPPED_ESCAPE,
      "lib/site/gate-a.mjs":
        `import { escapeHtml } from "../html-escape.mjs";\n` +
        `const sample = "<b>&</b>";\n` +
        `export const out = escapeHtml(sample);\n`,
    },
  });
  const r = runGate(root);
  check("CONTROL: a gate that imports the shipped function PASSES", r.code === 0, `exit ${r.code}\n${r.out.slice(-500)}`);
  check("CONTROL: …and it actually scanned something", /exported names indexed\s+2/.test(r.out), r.out.slice(-400));
}

// 0b. The real repository must pass too.
{
  const r = spawnSync("node", [GATE], { cwd: process.cwd(), encoding: "utf8" });
  check("CONTROL: the real repository passes the gate", r.status === 0, `exit ${r.status}\n${(r.stderr || "").slice(0, 500)}`);
}

/* ------------------------------------------------------------------ *
 * 1-4. POSITIVE — an undeclared duplicate must FAIL, whatever its shape
 *        and wherever it lives.
 * ------------------------------------------------------------------ */

// 1. The classic: a gate re-declaring what shipped code exports.
{
  const root = fixture({
    testUnit: "node lib/site/gate-a.mjs",
    files: {
      "lib/html-escape.mjs": SHIPPED_ESCAPE,
      "lib/site/gate-a.mjs":
        `// a self-contained copy — the §96/§102/§103 defect shape\n` +
        `function escapeHtml(s) {\n` +
        `  return String(s).replace(/&/g, "&amp;");\n` +
        `}\n` +
        `export const out = escapeHtml("<b>&</b>");\n`,
    },
  });
  const r = runGate(root);
  check("an undeclared duplicate in a GATE FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and it names the gate file", /lib\/site\/gate-a\.mjs/.test(r.out), r.out.slice(-400));
  check("…and it names the function", /defines escapeHtml/.test(r.out), r.out.slice(-400));
  check("…and it names the module that owns the real one", /also exported by lib\/html-escape\.mjs/.test(r.out), r.out.slice(-400));
}

// 2. §104.1 — the same defect inside a NEGATIVE SUITE used to be skipped.
{
  const root = fixture({
    testUnit: "node lib/site/gate-a.mjs && node scripts/gate-b-negative.mjs",
    files: {
      "lib/html-escape.mjs": SHIPPED_ESCAPE,
      "lib/site/gate-a.mjs": `export const ok = 1;\n`,
      "scripts/gate-b-negative.mjs":
        `function escapeHtml(s) {\n` +
        `  return String(s).replace(/&/g, "&amp;");\n` +
        `}\n` +
        `export const out = escapeHtml("<b>&</b>");\n`,
    },
  });
  const r = runGate(root);
  check("an undeclared duplicate in a NEGATIVE SUITE FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and it names the negative suite", /scripts\/gate-b-negative\.mjs/.test(r.out), r.out.slice(-400));
  check("…and the scan counted it", /\(1 gates \+ 1 negative suites\)/.test(r.out), r.out.slice(-400));
}

// 3. §103's blind spot: a NON-exported arrow const. Its own sweep matched
//    `function NAME` and `export const NAME` and MISSED this — which is how a
//    second copy of its target defect survived.
{
  const root = fixture({
    testUnit: "node lib/site/gate-a.mjs",
    files: {
      "lib/scanner.mjs": SHIPPED_STRIP,
      "lib/site/gate-a.mjs":
        `const stripComments = (src) => String(src).replace(/\\/\\*[\\s\\S]*?\\*\\//g, "");\n` +
        `export const out = stripComments("/* x */ a");\n`,
    },
  });
  const r = runGate(root);
  check("a non-exported ARROW CONST duplicate FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and reports the shape as 'arrow const'", /\(arrow const\)/.test(r.out), r.out.slice(-400));
}

// 4. The third shape, for the same reason.
{
  const root = fixture({
    testUnit: "node lib/site/gate-a.mjs",
    files: {
      "lib/scanner.mjs": SHIPPED_STRIP,
      "lib/site/gate-a.mjs":
        `const stripComments = function (src) {\n` +
        `  return String(src).replace(/\\/\\*[\\s\\S]*?\\*\\//g, "");\n` +
        `};\n` +
        `export const out = stripComments("/* x */ a");\n`,
    },
  });
  const r = runGate(root);
  check("a FUNCTION CONST duplicate FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and reports the shape as 'function const'", /\(function const\)/.test(r.out), r.out.slice(-400));
}

/* ------------------------------------------------------------------ *
 * 5-7. VACUITY — a detector must not report "nothing found" from a tree
 *        in which it could not have found anything. (§70)
 * ------------------------------------------------------------------ */

// 5. `test:unit` with nothing in it.
{
  const root = fixture({
    testUnit: "echo nothing to check",
    files: { "lib/html-escape.mjs": SHIPPED_ESCAPE },
  });
  const r = runGate(root);
  check("an EMPTY test:unit refuses", r.code !== 0, `exit was ${r.code}`);
  check("…and says it is refusing to report a pass", /refusing to report a pass/.test(r.out), r.out.slice(-400));
  check("…and does NOT print the green tick", !/No gate re-declares/.test(r.out), r.out.slice(-400));
}

// 6. §104.2 — gates present, but nothing to compare them against. Before the
//    guard this exited 0 with a clean 0-of-0, which is indistinguishable from a
//    repository that genuinely has no duplicates.
//
//    The gate under test is deliberately in `scripts/`, not `lib/`. A first
//    attempt put it in `lib/site/`, where it indexed ITSELF and the tree was no
//    longer empty — the fixture hid the very condition it was meant to create.
{
  const root = fixture({
    testUnit: "node scripts/gate-a.mjs",
    dirs: ["lib", "app", "components"],
    files: { "scripts/gate-a.mjs": `function whatever() { return 1; }\nexport const x = whatever();\n` },
  });
  const r = runGate(root);
  check("gates present but NO shipped modules refuses", r.code !== 0, `exit was ${r.code}\n${r.out.slice(-400)}`);
  check("…and explains that every comparison would trivially pass", /trivially pass/.test(r.out), r.out.slice(-400));
  check("…and does NOT print the green tick", !/No gate re-declares/.test(r.out), r.out.slice(-400));

  // The other half of the same condition: modules exist, but none of them export
  // anything, so every name lookup would miss just as vacuously.
  const root2 = fixture({
    testUnit: "node scripts/gate-a.mjs",
    files: {
      "scripts/gate-a.mjs": `function whatever() { return 1; }\nexport const x = whatever();\n`,
      "lib/no-exports.ts": `// this module exports nothing at all\nconst internal = 1;\n`,
      "app/.keep.ts": `// app root exists but contributes no export either\n`,
    },
  });
  const r2 = runGate(root2);
  check("…and modules present but ZERO exported names also refuses", r2.code !== 0, `exit was ${r2.code}\n${r2.out.slice(-400)}`);
}

// 7. A root with no package.json at all.
{
  const root = fixture({ dirs: ["lib"], files: { "lib/html-escape.mjs": SHIPPED_ESCAPE } });
  check("a root with NO package.json refuses", !existsSync(join(root, "package.json")), "fixture accidentally wrote one");
  const r = runGate(root);
  check("…and the gate FAILS rather than passing or throwing a raw stack", r.code !== 0, `exit was ${r.code}`);
  check("…and it says the file is missing", /no package\.json/.test(r.out), r.out.slice(-400));
}

/* ------------------------------------------------------------------ *
 * 8-10. NEGATIVE CONTROLS — the gate must NOT fire.
 * ------------------------------------------------------------------ */

// 8. Already shown by 0a, restated where a failure would be ambiguous: the
//    import resolution must survive being written with a relative specifier.
{
  const root = fixture({
    testUnit: "node lib/site/gate-a.mjs",
    files: {
      "lib/html-escape.mjs": SHIPPED_ESCAPE,
      "lib/site/gate-a.mjs":
        `import { escapeHtml } from "../html-escape.mjs";\n` +
        `function escapeHtmlUnused() { return 0; }\n` +
        `export const out = escapeHtml("<b>&</b>") + escapeHtmlUnused();\n`,
    },
  });
  const r = runGate(root);
  check("CONTROL: a same-named local helper alongside a real import still PASSES", r.code === 0, `exit ${r.code}\n${r.out.slice(-400)}`);
}

// 9. The DECLARED escape hatch must still work, and must be honoured only for
//    the exact file+name it names.
{
  const root = fixture({
    testUnit: "node lib/security/a11y-static.selfcheck.mjs",
    files: {
      "lib/scanner.mjs": SHIPPED_STRIP,
      "lib/security/a11y-static.selfcheck.mjs":
        `function stripComments(src) {\n` +
        `  return String(src).replace(/\\/\\/[\\s\\S]*/g, "");\n` +
        `}\n` +
        `export const out = stripComments("// x");\n`,
    },
  });
  const r = runGate(root);
  check("CONTROL: a DECLARED duplicate PASSES", r.code === 0, `exit ${r.code}\n${r.out.slice(-400)}`);
  check("…and the exemption table is still the one the gate documents", /declared exemptions\s+2/.test(r.out), r.out.slice(-400));

  // …and the same collision in a DIFFERENT file is not covered by that exemption.
  const root2 = fixture({
    testUnit: "node lib/site/gate-a.mjs",
    files: {
      "lib/scanner.mjs": SHIPPED_STRIP,
      "lib/site/gate-a.mjs": `function stripComments(src) { return src; }\nexport const out = stripComments("// x");\n`,
    },
  });
  const r2 = runGate(root2);
  check("CONTROL: the exemption does NOT generalise to another file", r2.code !== 0, `exit was ${r2.code}`);
}

// 10. The gate must not fire on a name nothing else owns — that would make every
//     local fixture helper an unexplained build failure.
{
  const root = fixture({
    testUnit: "node lib/site/gate-a.mjs",
    files: {
      "lib/html-escape.mjs": SHIPPED_ESCAPE,
      "lib/site/gate-a.mjs":
        `function fixtureOnlyHelper() { return 42; }\n` +
        `const otherLocal = (n) => n + 1;\n` +
        `export const out = fixtureOnlyHelper() + otherLocal(1);\n`,
    },
  });
  const r = runGate(root);
  check("CONTROL: unshared local names do NOT fail", r.code === 0, `exit ${r.code}\n${r.out.slice(-400)}`);
}

rmSync(SANDBOX, { recursive: true, force: true });

console.log(`\n${fail === 0 ? "✔" : "✖"} duplicate-implementations negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);