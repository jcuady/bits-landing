/**
 * Client bundle boundary gate (SYSTEM_AUDIT.md §42) — the 19th gate.
 *
 * The finding: `components/sections/hero-product.tsx` opened with a static
 * `import { gsap } from "gsap"`. GSAP + ScrollTrigger are 360 KB raw, and a
 * static import put them in the SHARED client bundle — so `/login` and `/pricing`
 * downloaded 360 KB of scroll-animation code they never execute. Measured on the
 * real build: every non-homepage route carried ~43 KB of it over the wire.
 *
 * The fix is `await import("gsap")` inside the effect, which makes it an async
 * chunk fetched only where the component mounts.
 *
 * WHY THIS IS A STATIC CHECK AND STILL SOUNDS LIKE A BUNDLE FACT
 * -----------------------------------------------------------------
 * "GSAP is not in the shared bundle" is a property of the build output, not of
 * the source. A source rule cannot see it, and a build-output rule would need a
 * browser to distinguish emitted from downloaded chunks.
 *
 * What the source CAN say is the thing that determines it: a top-level `import`
 * hoists into the shared graph, a dynamic `import()` does not. So the rule is
 * stated on the construct rather than the consequence, and the consequence is
 * what `scripts/page-weight.mjs` measures independently.
 *
 * The rule is derived, not enumerated: ANY bare `import ... from "<pkg>"` whose
 * specifier is a known heavy client library is the violation, so the list of
 * packages is one array below rather than a pattern per library.
 *
 * Run: node lib/site/bundle-boundary.selfcheck.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

let failed = 0;
const check = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond ? "" : `  [${detail}]`}`);
  if (!cond) failed++;
};

/*
 * Client libraries big enough that shipping them to a page that does not use them
 * is a real cost, measured in §42. `motion` and `lucide-react` are listed because
 * they are used on most pages anyway — they are here to be re-classified, not to
 * be banned, and the check says which rule applies.
 */
const HEAVY_CLIENT_LIBS = {
  gsap: "360 KB raw — used by the homepage hero only",
  "gsap/ScrollTrigger": "part of the gsap chunk",
  three: "600 KB+ — no current use",
  recharts: "charting — no current use",
};

/*
 * Libraries that legitimately belong in the shared bundle, because the shared
 * chrome (header, footer, dialogs) uses them on every page. Excluded explicitly
 * so the gate cannot be used to argue for removing them.
 */
const SHARED_CHROME_LIBS = new Set(["motion/react", "lucide-react", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"]);

const SRC_DIRS = ["app", "components", "lib"];
const CODE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (["node_modules", ".next", ".git"].includes(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (CODE.has(extname(e.name))) yield p;
  }
}

const files = SRC_DIRS.flatMap((d) => [...walk(join(ROOT, d))]);

/**
 * Split a source file into "dynamic import regions" and the rest.
 *
 * A naive scan for `import(` would also match a comment or a string, and a naive
 * scan for `from "gsap"` would miss `import "gsap"`. Both are handled by
 * stripping comments first and matching the two static forms explicitly.
 *
 * §104 — this used to declare its own `stripComments`, carrying §103's defective
 * `//` guard: it skipped the FIRST `//` after a colon but not the second, so a
 * string like "COLLECTIONS & FIELD // OPERATIONS" truncated the rest of its line
 * before any pattern ran. Measured across the 162 source files this gate scans,
 * the local copy and the shipped one disagree on 117.
 *
 * Its one deliberate difference — preserving newlines inside block comments —
 * is not load-bearing here, because the scan matches with a whole-string regex
 * (`staticRe.test(code)`) rather than anything line-anchored. So this is now the
 * shared implementation rather than a fourth copy of the same idea.
 */
import { stripComments } from "./security-claims.mjs";

const violations = [];
const dynamicUses = [];

for (const f of files) {
  const raw = readFileSync(f, "utf8");
  const code = stripComments(raw);
  const rel = relative(ROOT, f).replace(/\\/g, "/");

  for (const [pkg, why] of Object.entries(HEAVY_CLIENT_LIBS)) {
    const escaped = pkg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Static forms: `import ... from "pkg"`, `import "pkg"`, `require("pkg")`.
    const staticRe = new RegExp(
      `(?:import\\s[^;]*?from\\s*["']${escaped}["']|import\\s*["']${escaped}["']|require\\(\\s*["']${escaped}["']\\s*\\))`
    );
    if (staticRe.test(code)) {
      violations.push({ rel, pkg, why });
      continue;
    }

    // Dynamic form.
    //
    // The negative lookbehind is load-bearing, and was added because the negative
    // test found the gap: `type GsapModule = typeof import("gsap").gsap` is a
    // TYPE-POSITION import expression. It emits no runtime code and loads nothing,
    // but it matches `import("gsap")` exactly. Without the lookbehind the gate
    // could be satisfied by the type alias alone, so deleting the real dynamic
    // import — removing the feature entirely — still read as PASS.
    const dynRe = new RegExp(`(?<!typeof\\s)import\\(\\s*["']${escaped}["']\\s*\\)`);
    if (dynRe.test(code)) dynamicUses.push({ rel, pkg });
  }
}

console.log(
  `${violations.length === 0 ? "PASS" : "FAIL"}  no heavy client library is statically imported` +
    (violations.length
      ? `\n${violations.map((v) => `        ${v.rel} statically imports ${v.pkg}  (${v.why})`).join("\n")}`
      : "")
);
if (violations.length) failed++;

check(
  "the dynamic gsap import still exists (the fix has not been reverted)",
  dynamicUses.some((d) => d.pkg === "gsap"),
  "no await import(\"gsap\") anywhere — the boundary rule can pass while gsap is simply gone"
);
check(
  "gsap/ScrollTrigger is loaded through the same dynamic path",
  dynamicUses.some((d) => d.pkg === "gsap/ScrollTrigger"),
  "ScrollTrigger must not have been left as a static import"
);

/*
 * The gate must not be satisfiable by deleting the feature. Asserting that gsap
 * is still dynamically imported is what stops "remove the import" from reading as
 * "fix the boundary".
 */
check(
  "the hero still uses ScrollTrigger (the animation was not removed to pass this gate)",
  readFileSync(join(ROOT, "components/sections/hero-product.tsx"), "utf8").includes("ScrollTrigger.create"),
  "the hero no longer creates a ScrollTrigger"
);

/*
 * Report what is allowed through, so the exemption list is visible rather than
 * implied. A whitelist nobody can see is a whitelist nobody can review.
 */
console.log("\n  deliberately shared (used by chrome on every page):");
for (const p of SHARED_CHROME_LIBS) console.log(`    ${p}`);

console.log(`\n  dynamic imports in use: ${dynamicUses.map((d) => `${d.pkg} (${d.rel})`).join(", ") || "none"}`);

console.log(
  failed === 0
    ? "\n✔ bundle boundary verified"
    : `\n✖ ${failed} bundle boundary assertion(s) failed`
);
process.exit(failed === 0 ? 0 : 1);