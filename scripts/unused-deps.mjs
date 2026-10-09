/**
 * Unused dependency check (SYSTEM_AUDIT.md §41).
 *
 * A declared package nobody imports costs install time, CI time, audit surface
 * and reviewer attention, and it is invisible: nothing breaks when it stops
 * being used, so nothing ever removes it.
 *
 * HOW USAGE IS ESTABLISHED — and why that matters
 * ------------------------------------------------
 * The naive version greps for the package name in source. That is wrong in both
 * directions:
 *
 *   - `tailwindcss` is used by `@import "tailwindcss"` inside a CSS file and by
 *     the PostCSS plugin name, never by a JS import.
 *   - `postcss.config.mjs` references plugins by string.
 *   - `@types/*` packages are consumed by the compiler, never imported.
 *   - A substring match for `zod` also fires inside `zodOutput`.
 *
 * So every package is checked against the specific places it can legitimately be
 * referenced, and the exemptions are derived from package.json's own dependency
 * categories rather than from a hand-written list.
 *
 * Run: node scripts/unused-deps.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

const SKIP = new Set(["node_modules", ".git", ".next", "out", ".vercel", ".agents", ".h3-source", "coverage"]);
const CODE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".mts"]);

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const files = [...walk(ROOT)];
const sources = new Map();
for (const f of files) {
  const ext = extname(f);
  if (!CODE.has(ext) && ![".css", ".json", ".mjs", ".yml", ".yaml"].includes(ext)) continue;
  const base = f.split("\\").pop();
  /*
   * A LOCKFILE IS NOT A USE.
   *
   * The first version of this script reported "0 unused" for a repository that
   * has at least four packages nothing imports. package-lock.json contains the
   * name of every installed package, so the "referenced in a config file" rule
   * matched all of them and no package could ever look unused.
   *
   * A detector that cannot report a finding is not a detector. package.json and
   * the lockfile are excluded, and the exclusion is here rather than inside the
   * regex so it cannot be forgotten.
   */
  if (base === "package-lock.json" || base === "pnpm-lock.yaml" || base === "yarn.lock" || base === "bun.lockb") continue;
  try {
    if (statSync(f).size > 1_500_000) continue;
    sources.set(f, readFileSync(f, "utf8"));
  } catch {}
}

/**
 * Where a package can legitimately be referenced. Each is a regex over the
 * file's text, chosen to match how that kind of package is actually consumed.
 */
const REASONS = [
  { label: "ESM/CJS import or require", re: (p) => new RegExp(`(?:from\\s*["']${esc(p)}["']|require\\(\\s*["']${esc(p)}["']\\s*\\))`) },
  { label: "side-effect import", re: (p) => new RegExp(`import\\s*["']${esc(p)}["']`) },
  { label: "dynamic import", re: (p) => new RegExp(`import\\(\\s*["']${esc(p)}["']`) },
  { label: "CSS @import / @plugin", re: (p) => new RegExp(`@import\\s+["']${esc(p)}(?:/[^"']*)?["']|@plugin\\s+["']${esc(p)}["']`) },
  { label: "referenced in a config file", re: (p) => new RegExp(`["']${esc(p)}(?:/[^"']*)?["']`) },
  { label: "subpath import", re: (p) => new RegExp(`["']${esc(p)}/`) },
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const declared = {
  ...(pkg.dependencies || {}),
  ...(pkg.devDependencies || {}),
};

let lockPeerReq = new Map();
try {
  const lock = JSON.parse(readFileSync(join(ROOT, "package-lock.json"), "utf8"));
  for (const [path, meta] of Object.entries(lock.packages || {})) {
    const name = path.replace(/^node_modules\//, "");
    if (!name || path.includes("/node_modules/")) continue;
    for (const peer of Object.keys(meta.peerDependencies || {})) {
      if (!lockPeerReq.has(peer)) lockPeerReq.set(peer, []);
      lockPeerReq.get(peer).push(`${name} requires ${peer}@${meta.peerDependencies[peer]}`);
    }
  }
} catch {}

/** @types/* is consumed by the compiler, never imported. That is not "unused". */
const isTypes = (name) => name.startsWith("@types/");

/** Tools invoked as CLIs have no import site by definition. */
const CLI_TOOLS = new Set(["typescript", "tailwindcss", "postcss", "eslint", "prettier"]);

/** Next.js resolves these at runtime without the app importing them. */
const FRAMEWORK_PROVIDED = new Set(["react-dom", "react", "next"]);

console.log(`Scanning ${sources.size} source/config file(s) for ${Object.keys(declared).length} declared package(s).\n`);

const unused = [];
const used = [];

for (const [name, range] of Object.entries(declared)) {
  if (isTypes(name)) {
    used.push({ name, range, where: "@types/* — consumed by the compiler, not imported" });
    continue;
  }
  if (CLI_TOOLS.has(name)) {
    used.push({ name, range, where: "CLI tool — invoked, never imported" });
    continue;
  }
  if (FRAMEWORK_PROVIDED.has(name)) {
    used.push({ name, range, where: "framework runtime — resolved by Next.js, not imported" });
    continue;
  }

  /*
   * A PACKAGE CAN BE REQUIRED WITHOUT BEING IMPORTED.
   *
   * The first version flagged `@supabase/supabase-js` as unused, because no
   * source file imports it — `@supabase/ssr`'s createClient wraps it. It is a
   * peer dependency: deleting it would have broken every authenticated page,
   * and the only evidence that it is needed is in the lockfile.
   *
   * So the lockfile, which was just excluded as evidence of USE, is read as the
   * source of truth for what is REQUIRED. Two different questions, two different
   * files, and the distinction is what keeps this script from recommending a
   * removal that breaks production.
   */
  const peers = lockPeerReq.get(name);
  if (peers && peers.length) {
    used.push({ name, range, where: `peer dependency — ${peers[0]}` });
    continue;
  }

  const hits = [];
  for (const [file, text] of sources) {
    // Skip package.json: it declares the name, which proves nothing.
    if (file.endsWith("package.json")) continue;
    // Skip this script: it contains every package name by construction.
    if (file.endsWith("unused-deps.mjs")) continue;

    for (const r of REASONS) {
      if (r.re(name).test(text)) {
        hits.push({ file: file.replace(ROOT + "\\", ""), label: r.label });
        break;
      }
    }
  }

  if (hits.length) {
    const uniq = [...new Set(hits.map((h) => h.label))];
    used.push({ name, range, where: `${hits.length} file(s) — ${uniq.join(", ")}` });
  } else {
    unused.push({ name, range });
  }
}

console.log("USED\n");
for (const u of used.sort((a, b) => a.name.localeCompare(b.name))) {
  console.log(`  ${u.name.padEnd(30)} ${u.where}`);
}

console.log(`\nNOT FOUND (${unused.length})\n`);
if (!unused.length) console.log("  none — every declared package is referenced somewhere");
for (const u of unused) console.log(`  ${u.name.padEnd(30)} ${u.range}`);

console.log(
  `\n${used.length} used, ${unused.length} unreferenced.` +
    (unused.length
      ? "\nAn unreferenced package is not automatically wrong — a CLI-only or plugin-loaded\n" +
        "  dependency can be used with no import anywhere — but each one is a candidate for\n" +
        "  removal and should be confirmed by a human, not by this script."
      : "")
);