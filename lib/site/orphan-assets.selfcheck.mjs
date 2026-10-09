#!/usr/bin/env node
/**
 * Orphan asset sweep — the reverse direction of lib/site/asset-integrity.
 *
 * asset-integrity answers "does every asset the site references exist?".
 * This answers "does every asset in public/ get referenced at all?".
 *
 * Why it matters beyond disk space:
 *
 *  1. DEPLOY WEIGHT. Every file in public/ is copied into the build output and
 *     uploaded, whether or not it is used.
 *
 *  2. HIDDEN CLAIMS. An asset that nothing links to is not a live
 *     misrepresentation — but it is one re-link away. Phase 29 found
 *     public/images/features/admin-security.jpg sitting unused in the repo: a
 *     mockup of an admin console with a "Role Permissions Matrix", an "Audit
 *     Log Preview" and "BSP Aligned / NPC Compliant". Those are precisely the
 *     controls verified NOT to exist. Nothing referenced it, so no visitor saw
 *     it — but the next person to wire up a features gallery would have shipped
 *     it as a product screenshot.
 *
 * Next.js App Router auto-consumes a small set of filenames by CONVENTION
 * (app/favicon.ico, app/icon.png, app/apple-icon.png, app/opengraph-image.*),
 * and files under public/ are served at their path. Those conventions are
 * treated as references; everything else must be found in source.
 *
 * Run: node lib/site/orphan-assets.selfcheck.mjs
 */

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  "out",
  "coverage",
  ".turbo",
]);

/** Extensions that live in public/ but are never a requestable asset. */
const NON_ASSET = [".md", ".txt", ".prompt.txt"];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, out);
    else out.push(abs);
  }
  return out;
}

/**
 * Every file a browser can request that is not source. `/brandbook.html` and
 * `llms.txt` are documents served by the site, not decorative assets, and are
 * covered by the sitemap and link gates instead.
 */
function isServableAsset(abs) {
  const rel = relative(join(ROOT, "public"), abs).replace(/\\/g, "/");
  if (NON_ASSET.some((ext) => rel.endsWith(ext))) return false;
  return /\.(png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|otf|eot|mp4|webm|pdf)$/i.test(rel);
}

const publicFiles = walk(join(ROOT, "public")).filter(isServableAsset);

/** Source text corpus — everything that could plausibly reference an asset. */
/**
 * ONLY SHIPPED CODE COUNTS AS A REFERENCE.
 *
 * This is the sixth instance of one failure shape (see §30.5). Excluding
 * *.selfcheck.mjs from the corpus fixed the fifth, but writing about the asset
 * in docs/SYSTEM_AUDIT.md re-suppressed it — a .md file naming
 * "public/images/features/admin-security.jpg" made the asset count as referenced
 * again, and the orphan count silently fell from 70 back to 69.
 *
 * Documentation is not shipped. Neither are dev scripts. A file under docs/ or a
 * build tool under scripts/ mentioning an asset does not make a browser request
 * it, so it does not keep the asset alive.
 *
 * Corollary that makes this safe: an asset referenced ONLY from docs/ or
 * scripts/ is genuinely dead weight for the deployed site, and is reported as
 * such. That is the correct answer, not a false positive.
 */
const SHIPPED_SOURCE_EXT = /\.(ts|tsx|css|scss|json|webmanifest)$/;
const NON_SHIPPED_DIRS = ["docs", "scripts"];

const sourceFiles = walk(ROOT).filter((p) => {
  if (!SHIPPED_SOURCE_EXT.test(p)) return false;
  if (p.startsWith(join(ROOT, "public"))) return false;
  const rel = relative(ROOT, p).replace(/\\/g, "/");
  if (NON_SHIPPED_DIRS.some((d) => rel === d || rel.startsWith(`${d}/`))) return false;
  // A gate must never count itself as evidence.
  return !p.endsWith(".selfcheck.mjs");
});

const corpus = sourceFiles.map((p) => readFileSync(p, "utf8")).join("\n");

/**
 * Next.js metadata conventions are references the source never spells out.
 * An asset matching one of these names, in app/ or public/, is reachable
 * without appearing in any file.
 */
const CONVENTIONAL = [
  /^favicon\.ico$/,
  /^favicon\.png$/,
  /^icon(-\d+)?\.(png|ico|jpg|jpeg|svg|webp)$/,
  /^apple-icon(-\d+)?\.(png|jpg|jpeg|webp|svg)$/,
  /^opengraph-image(-\d+)?\.(png|jpg|jpeg|webp|svg)$/,
  /^twitter-image(-\d+)?\.(png|jpg|jpeg|webp|svg)$/,
  /^manifest\.webmanifest$/,
  /^robots\.txt$/,
  /^sitemap\.xml$/,
];

const orphans = publicFiles.filter((abs) => {
  const rel = relative(join(ROOT, "public"), abs).replace(/\\/g, "/");
  if (CONVENTIONAL.some((re) => re.test(rel))) return false;
  // Referenced by absolute public path ("/images/x.png") or by bare filename
  // from inside a directory ("hero.png" inside images/features/).
  const name = rel.split("/").pop();
  return !corpus.includes(`/${rel}`) && !corpus.includes(`"${rel}"`) && !corpus.includes(`'${rel}'`) && !corpus.includes(`/${name}`);
});

const totalBytes = publicFiles.reduce((n, p) => n + statSync(p).size, 0);
const orphanBytes = orphans.reduce((n, p) => n + statSync(p).size, 0);

console.log(
  `public/: ${publicFiles.length} servable assets (${(totalBytes / 1024 / 1024).toFixed(1)} MB), ` +
    `${orphans.length} unreferenced (${(orphanBytes / 1024 / 1024).toFixed(1)} MB)`
);
if (orphans.length) {
  console.log("\nUnreferenced assets:");
  for (const p of orphans.sort()) {
    console.log(`  ${relative(ROOT, p).replace(/\\/g, "/")}`);
  }
  console.log(
    "\nThese are not a build failure — nothing links to them, so no visitor sees\n" +
      "them. They are listed because each is dead deploy weight, and because an\n" +
      "asset showing a control that does not exist is one re-link away from\n" +
      "shipping. See SYSTEM_AUDIT.md §30."
  );
}

if (!existsSync(join(ROOT, "public"))) {
  console.error("public/ is missing");
  process.exit(1);
}