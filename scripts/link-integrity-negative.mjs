/**
 * SYSTEM_AUDIT.md §79 — negative test for the cross-page fragment check.
 *
 * WHAT IT PROVES, AND WHY IT NEEDS PROVING
 * ---------------------------------------
 * Section 6 of `link-integrity.selfcheck.mjs` used to skip every `/#frag`
 * target with `continue; // handled by the landing-page check`. That landing
 * check only iterates `linkSources` — SEVEN files. Every other file under
 * `app/` and `components/` was scanned and then ignored for exactly this link
 * shape.
 *
 * The consequence was live: `app/(marketing)/products/crm/page.tsx` carried a
 * breadcrumb and a BreadcrumbList JSON-LD entry both pointing at
 * `/#products-suite`, a section inside `ProductsSuite` — a component with no
 * importer anywhere in the repository. Both links went nowhere and the gate was
 * green.
 *
 * So the fixture below is injected into `app/(marketing)/products/crm/page.tsx`
 * specifically BECAUSE it is not one of the seven files the old path covered.
 * Injecting into `lib/site.ts` would pass on the old code and prove nothing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const TARGET = join(ROOT, "app/(marketing)/products/crm/page.tsx");

let pass = 0;
let fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) { pass++; console.log(`PASS  ${label}`); }
  else { fail++; console.log(`FAIL  ${label}${detail ? `\n        ${detail}` : ""}`); }
};

function runGate() {
  try {
    return { failed: false, output: execFileSync("node", ["lib/site/link-integrity.selfcheck.mjs"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }) };
  } catch (e) {
    return { failed: true, output: `${e.stdout || ""}${e.stderr || ""}` };
  }
}

console.log("=== LINK-INTEGRITY — FRAGMENT NEGATIVE TEST ===\n");

const original = readFileSync(TARGET, "utf8");

const clean = runGate();
check("real repository passes", !clean.failed, clean.output.slice(-300));

const BAD_ANCHOR = "/#section-that-does-not-exist-anywhere";
const anchor = 'href="/#product-families"';
const injected = original.replace(anchor, `href="${BAD_ANCHOR}"`);

check("fixture landed in a file OUTSIDE linkSources", injected !== original && injected.includes(BAD_ANCHOR));
check("…and the file is genuinely outside the 7-file list", !["lib/site.ts", "components/layout/footer.tsx", "components/layout/header.tsx", "components/products/product-shell.tsx", "components/products/demo-toolbar.tsx", "components/products/demo-ui.tsx", "app/demo/page.tsx", "app/(auth)/login/page.tsx"].includes("app/(marketing)/products/crm/page.tsx"));

let r;
try {
  writeFileSync(TARGET, injected, "utf8");
  r = runGate();
} finally {
  writeFileSync(TARGET, original, "utf8");
}

check("a dangling /#frag in an unchecked file FAILS the gate", r.failed, "exit was 0 — §79 coverage did not take effect");
check("…and it names the file", /products[\\/]crm[\\/]page\.tsx/.test(r.output), r.output.slice(-400));
check("…and it names the missing id", /section-that-does-not-exist-anywhere/.test(r.output), r.output.slice(-400));
check("the file is restored byte-for-byte", readFileSync(TARGET, "utf8") === original);

const after = runGate();
check("gate passes again after restore", !after.failed, after.output.slice(-300));

console.log(`\n${fail === 0 ? "✔" : "✖"} link-integrity fragment negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);