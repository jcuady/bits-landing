/*
 * SYSTEM_AUDIT.md §47 — REPORT TOOL, NOT A GATE. Exit code is always 0.
 *
 * WHY IT IS NOT A GATE
 * -------------------
 * It found a real defect (`app/actions/lead.ts`, a server action that never
 * existed, cited as live in the README architecture diagram and in the RLS
 * section of FULL_SYSTEM_DOCUMENTATION.md — fixed).
 *
 * But on the same run it flagged `scripts/fetch-bionis.mjs`,
 * `lib/crm/auth.ts` and `components/crm/pipeline-board.tsx` — all three
 * **correct**: those files were deleted by commit f50417c, and every document
 * citing them says so in the past tense ("were deleted", "the dead CRM auth
 * shim", "Deleted … with them").
 *
 * Telling those two cases apart requires knowing whether a sentence is
 * historical or current. That is the SAME semantic wall §44 measured for the
 * security-claims gate, hit here from a completely different direction: a
 * filesystem check is perfectly decidable, but "is this citation live?" is not.
 * A hard-failing gate would therefore be roughly 80% false positives, and a
 * gate that cries wolf gets deleted or ignored — both outcomes worse than an
 * honest report.
 *
 * So this prints a WORKLIST. Read it, and use git history to decide each entry:
 * `git log --oneline -1 --all -- <path>` distinguishes "deleted, citation is
 * correct history" from "never existed, citation is wrong".
 *
 *  * how to read the output: entries are sorted by how many documents cite them.
 *
 * `.agents/` is deliberately NOT scanned. Those are installed skill bundles whose
 * `references/*.md` paths are relative to the skill directory, not the repo root
 * — including them produced ~20 false positives from one file.
 *
 * Run: node scripts/doc-path-integrity.mjs
 */

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/* Accepts repo-relative or absolute — the walker below produces absolute paths. */
const read = (p) => readFileSync(p.startsWith("\\") || p.includes(":\\") ? p : join(ROOT, p), "utf8");

const IGNORED_DIRS = new Set(["node_modules", ".next", ".git", ".turbo", "out"]);

/* Extensions that make a token unambiguously a source path. */
const CODE_EXT = /\.(ts|tsx|mjs|js|jsx|css|json|md|sql|prisma)$/;

/*
 * Root-level files that are commonly cited without a directory. Kept as an
 * explicit list because `existsSync(token)` at the repo root would otherwise let
 * any single word through; a word is not a path.
 */
const ROOT_FILES = new Set([
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "middleware.ts",
  "proxy.ts",
  "eslint.config.mjs",
  "biome.json",
  "components.json",
  "vitest.config.ts",
]);

const missing = new Map(); // token -> Set(files)

function walkMarkdown(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || IGNORED_DIRS.has(e.name)) continue;
    const abs = join(dir, e.name);
    if (e.isDirectory()) walkMarkdown(abs, out);
    else if (e.name.endsWith(".md")) out.push(abs);
  }
  return out;
}

const files = [
  ...walkMarkdown(join(ROOT, "docs")),
  join(ROOT, "README.md"),
  join(ROOT, "PROJECT_STATUS.md"),
  join(ROOT, "newfeatures.md"),
].filter((f) => existsSync(f));

/**
 * Pull candidate paths out of document text.
 * Backticked spans are the primary signal; bare spans only count when they carry
 * a code extension, which is what keeps ordinary prose out.
 */
function extractCandidates(line) {
  const out = [];
  const BACKTICKED = /`([^`\n]+)`/g;
  for (const m of line.matchAll(BACKTICKED)) {
    const raw = m[1].trim();
    // Strip a trailing glob or punctuation and any " (comment)" suffix.
    const token = raw.split(/\s+\(/)[0].replace(/[.,;:]+$/, "");
    out.push(token);
  }
  return out;
}

function looksLikePath(token) {
  if (!token || token.length > 120) return false;
  if (token.startsWith("http") || token.startsWith("/") || token.startsWith("@")) return false;
  /* Not repo-relative: home dirs, drive letters, env vars. */
  if (token.startsWith("~") || /^[A-Za-z]:/.test(token) || token.startsWith("$")) return false;
  if (token.includes(" ") && !token.includes("/")) return false;
  if (token.includes("*") || token.includes("(") || token.includes("<")) return false;
  if (CODE_EXT.test(token)) return true;
  if (ROOT_FILES.has(token)) return true;
  if (token.includes("/") && CODE_EXT.test(token.split("/").pop() ?? "")) return true;
  return false;
}

/**
 * Resolve a cited token.
 *
 * The two cases are deliberately different, because they mean different things:
 *
 *   • Token has a DIRECTORY (`lib/crm/auth.ts`) — the citation is specific, so
 *     it must resolve exactly. Falling back to "some auth.ts exists somewhere"
 *     would hide a moved file, which is the failure this gate exists for.
 *   • Token is a BARE FILENAME (`pricing.tsx`) — docs legitimately cite a
 *     component by name alone. It resolves if that basename exists anywhere.
 *
 * The first version of this gate checked every token at the repo root and
 * reported 30+ false positives, because `pricing.tsx` is really
 * `components/sections/pricing.tsx`. It also missed nothing real; the volume of
 * noise was the bug.
 */
const INDEX = new Map(); // basename -> [relative paths]
function buildIndex(dir, rel = "") {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(e.name)) continue;
    const abs = join(dir, e.name);
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      buildIndex(abs, r);
    } else {
      if (!INDEX.has(e.name)) INDEX.set(e.name, []);
      INDEX.get(e.name).push(r);
    }
  }
}
buildIndex(ROOT);

/** Strip a command wrapper so "node scripts/x.mjs" yields "scripts/x.mjs". */
function stripCommand(token) {
  const parts = token.split(/\s+/);
  return parts.length > 1 ? parts[parts.length - 1] : token;
}

function pathExists(token) {
  const t = stripCommand(token);

  if (t.includes("/")) {
    if (existsSync(join(ROOT, t))) return true;
    if (t.includes("/**") && existsSync(join(ROOT, t.split("/**")[0]))) return true;
    if (t.includes("*")) {
      const dir = t.split("*")[0].replace(/\/$/, "");
      if (dir && existsSync(join(ROOT, dir))) return true;
    }
    return false;
  }

  // Bare filename: accept it if the basename exists anywhere in the repo.
  const base = t.split("/").pop();
  return INDEX.has(base);
}

let scannedTokens = 0;

for (const file of files) {
  const rel = file.replace(`${ROOT}\\`, "");
  const lines = read(file).split(/\r?\n/);
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    for (const token of extractCandidates(line)) {
      if (!looksLikePath(token)) continue;
      scannedTokens += 1;
      if (pathExists(token)) continue;
      if (!missing.has(token)) missing.set(token, new Set());
      missing.get(token).add(rel);
    }
  }
}

/* Report. Sorted by blast radius so the worst offender is first. */
const sorted = [...missing.entries()].sort((a, b) => b[1].size - a[1].size);
for (const [token, where] of sorted) {
  console.log(`${token}`);
  console.log(`    cited in ${[...where].slice(0, 4).join(", ")}${where.size > 4 ? ` +${where.size - 4} more` : ""}`);
}

console.log("");
console.log(
  `${sorted.length} cited path(s) do not resolve (${scannedTokens} path-like tokens across ${files.length} files).`
);
console.log("REPORT ONLY — exit 0 by design. See the header for why this cannot be a gate.");
console.log("Decide each entry with: git log --oneline -1 --all -- <path>");
console.log("  deleted in history + past-tense citation  -> correct, ignore");
console.log("  no history at all                         -> the citation is wrong");