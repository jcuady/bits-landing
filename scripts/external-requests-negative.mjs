/**
 * SYSTEM_AUDIT.md §98 — negative test for `external-requests.mjs`.
 *
 * WHY A SYNTHETIC TREE
 * ---------------------
 * §96 found that four negatives in `test:unit` write tracked files in place,
 * which puts the repository inside the blast radius of an interrupted run. This
 * one does not. `external-requests.mjs` honours `BITS_ROOT`, so every case here
 * is a MINIMAL FIXTURE TREE built in `%TEMP%`. **Nothing in the repository is
 * written, read for its content, or restored.**
 *
 * That is §93's rule applied to the fixture: a negative test whose fixture IS
 * the bug it exists to catch is alive only until the bug is fixed. The fixtures
 * below are invented hosts and invented CSS, so they keep working after any
 * future edit to the real application.
 *
 * WHAT IS PROVED
 * --------------
 *   1. an UNDECLARED subresource host fails        (the §97 defect)
 *   2. a declared client host with NO disclosure fails (the same defect, later)
 *   3. a server-scope host inside a "use client" module fails
 *   4. CONTROL: an ANCHOR to an undeclared host does NOT fail
 *   5. CONTROL: a non-vacuity guard — a gate that scans nothing must not pass
 *
 * Run: node scripts/external-requests-negative.mjs
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const GATE = join(process.cwd(), "scripts", "external-requests.mjs");

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

/** Build a throwaway tree. `files` maps repo-relative path -> contents. */
function fixture(files) {
  const dir = join(tmpdir(), "bits-external-requests-negative");
  rmSync(dir, { recursive: true, force: true });
  for (const [rel, body] of Object.entries(files)) {
    const abs = join(dir, rel);
    mkdirSync(join(abs, ".."), { recursive: true });
    writeFileSync(abs, body, "utf8");
  }
  return dir;
}

function runGate(root, declarations) {
  const env = { ...process.env, BITS_ROOT: root };
  if (declarations) {
    const p = join(root, "declarations.json");
    writeFileSync(p, JSON.stringify(declarations, null, 2), "utf8");
    env.BITS_DECLARATIONS = p;
  } else {
    delete env.BITS_DECLARATIONS;
  }
  const r = spawnSync("node", [GATE], { cwd: process.cwd(), env, encoding: "utf8" });
  return { code: r.status, out: `${r.stdout || ""}${r.stderr || ""}` };
}

/* A declared-and-disclosed baseline: exactly the §97 state, which must PASS.
 * `declares` and `discloses` let a case mutate either side independently, and
 * the table is passed through `BITS_DECLARATIONS` — the gate's table is hard
 * coded for the real repository, and a fixture run against it would report every
 * fixture host as undeclared for entirely the wrong reason. */
function baseline({ declares, discloses, css, extra = {} } = {}) {
  const decl = declares ?? {
    "cdn.example": {
      scope: "client",
      purpose: "fixture font CDN",
      disclosedIn: "app/(marketing)/cookies/page.tsx",
    },
  };
  const dir = fixture({
    "lib/site.ts": `export const site = { url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.fixture-own.test" };\n`,
    "app/globals.css": css ?? `@import url("https://cdn.example/f.css");\n`,
    "app/(marketing)/cookies/page.tsx": discloses ?? `We load fonts from cdn.example.\n`,
    ...extra,
  });
  return { dir, decl };
}

console.log("=== EXTERNAL REQUESTS — NEGATIVE TEST ===\n");

// 0. Precondition: the baseline (declared AND disclosed) must PASS, and the real
//    repository must PASS. Without the first, every case below could be failing
//    for a reason unrelated to what it claims to test.
{
  const { dir, decl } = baseline();
  const r = runGate(dir, decl);
  check("the §97 state (declared AND disclosed) PASSES", r.code === 0, `exit ${r.code}\n${r.out.slice(-400)}`);
  rmSync(dir, { recursive: true, force: true });

  const real = spawnSync("node", [GATE], { cwd: process.cwd(), encoding: "utf8" });
  check("real repository passes the gate", real.status === 0, `exit ${real.status}\n${(real.stderr || "").slice(0, 400)}`);
}

// 1. The §97 defect: a host the browser fetches that nobody declared.
{
  const { dir, decl } = baseline({ declares: {}, css: `@import url("https://undeclared.example/f.css");\n` });
  const r = runGate(dir, decl);
  check("an UNDECLARED subresource host FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and it names the host", /undeclared\.example/.test(r.out), r.out.slice(-400));
  check("…and says UNDECLARED", /UNDECLARED/.test(r.out), r.out.slice(-400));
  rmSync(dir, { recursive: true, force: true });
}

// 2. The same defect, one stage later: declared, but the notice does not say so.
{
  const { dir, decl } = baseline({ discloses: "We do not contact anyone.\n" });
  const r = runGate(dir, decl);
  check("a client-scope host with NO disclosure FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and says the declaration is not backed by a disclosure", /disclosed in|does not mention it/.test(r.out), r.out.slice(-400));
  rmSync(dir, { recursive: true, force: true });
}

// 3. A server-scope host must not be reachable from a client module.
{
  const { dir, decl } = baseline({
    declares: {
      "api.fixture.test": { scope: "server", purpose: "fixture email API", declaredIn: "lib/mail.ts" },
    },
    css: `:root { color: red; }\n`,
    extra: {
      "lib/mail.ts": `"use client";\nexport const send = () => fetch("https://api.fixture.test/send");\n`,
    },
  });
  const r = runGate(dir, decl);
  check("a server-scope host inside a \"use client\" module FAILS", r.code !== 0, `exit was ${r.code}`);
  check("…and names the module", /use client/.test(r.out), r.out.slice(-400));
  rmSync(dir, { recursive: true, force: true });
}

// 4. CONTROL — the rule must NOT fire on a link the visitor chose to click.
//    This control is what caught the case-insensitive `<link>` regex matching
//    Next's `<Link>` component, so it earns its place rather than being a
//    formality.
{
  const { dir, decl } = baseline({
    declares: {},
    css: `:root { color: red; }\n`,
    extra: {
      "components/links.tsx":
        `export const Links = () => (<>\n` +
        `  <a href="https://cal.example/book">Book</a>\n` +
        `  <Link href="https://social.example/x">Social</Link>\n` +
        `</>);\n`,
    },
  });
  const r = runGate(dir, decl);
  check("CONTROL: anchors AND <Link> to undeclared hosts do NOT fail", r.code === 0, `exit was ${r.code}\n${r.out.slice(-500)}`);
  rmSync(dir, { recursive: true, force: true });
}

// 5. CONTROL — namespaces and JSON-LD contexts are identifiers, not requests.
{
  const { dir, decl } = baseline({
    declares: {},
    css: `:root { color: red; }\n`,
    extra: {
      "app/page.tsx":
        `export const ld = { "@context": "https://schema.org", "@type": "SoftwareApplication" };\n` +
        `export const svg = "http://www.w3.org/2000/svg";\n`,
    },
  });
  const r = runGate(dir, decl);
  check("CONTROL: schema.org / w3.org namespaces do NOT fail", r.code === 0, `exit was ${r.code}\n${r.out.slice(-400)}`);
  rmSync(dir, { recursive: true, force: true });
}

// 6. CONTROL — a tree with nothing to scan must not report success.
//    §70: a gate that examined nothing looks identical to one that passed.
{
  const empty = fixture({ "lib/site.ts": `export const site = { url: "https://www.fixture-own.test" };\n` });
  const r = runGate(empty, {});
  check("CONTROL: an empty tree is reported as 0 URLs, not as coverage", /subresource URLs found: 0/.test(r.out), r.out.slice(-300));
  check("CONTROL: an empty tree warns that the scan path did not execute", /did not execute/.test(r.out), r.out.slice(-300));
  check("CONTROL: an empty tree does NOT print the green tick", !/✔ every host contacted/.test(r.out), r.out.slice(-300));
  rmSync(empty, { recursive: true, force: true });
}

rmSync(join(tmpdir(), "bits-external-requests-negative"), { recursive: true, force: true });

console.log(`\n${fail === 0 ? "✔" : "✖"} external-requests negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);