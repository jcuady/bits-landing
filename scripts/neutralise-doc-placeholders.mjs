/**
 * Rewrite credential-SHAPED placeholders in documentation so they stop matching
 * secret scanners (SYSTEM_AUDIT.md §39).
 *
 * A placeholder like `re_your_api_key_here` is not a secret, but it is
 * indistinguishable from one to every scanner that has not solved the
 * placeholder problem — including other people's, including CI. Every future
 * scan of this repository will flag it again, and each false positive costs
 * somebody's attention.
 *
 * The fix is to make the shape unambiguous: `re_<your-resend-api-key>`, which
 * cannot match `re_[A-Za-z0-9_-]{20,}`.
 *
 * Prints counts only, never a matched value.
 *
 * Run: node scripts/neutralise-doc-placeholders.mjs [--apply]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APPLY = process.argv.includes("--apply");

/* Shapes that are credentials-looking but are documentation. Each maps to a
 * replacement that cannot itself match the shape. */
const PATTERNS = [
  { re: /\bre_[A-Za-z0-9_-]{20,}\b/g, to: "re_<your-resend-api-key>", why: "Resend key placeholder" },
  { re: /\bsk_live_[A-Za-z0-9]{16,}\b/g, to: "sk_live_<your-stripe-key>", why: "Stripe secret placeholder" },
  { re: /\bpk_live_[A-Za-z0-9]{16,}\b/g, to: "pk_live_<your-stripe-key>", why: "Stripe publishable placeholder" },
];

const files = [
  join(ROOT, "README.md"),
  join(ROOT, "docs", "FULL_SYSTEM_DOCUMENTATION.md"),
];

let changed = 0;
for (const f of files) {
  let text;
  try {
    text = readFileSync(f, "utf8");
  } catch {
    continue;
  }
  let out = text;
  const hits = [];
  for (const p of PATTERNS) {
    const n = (text.match(p.re) || []).length;
    if (n) {
      hits.push(`${n}× ${p.why}`);
      out = out.replace(p.re, p.to);
    }
  }
  if (out === text) {
    console.log(`${f.replace(ROOT + "\\", "")}: clean`);
    continue;
  }
  console.log(`${f.replace(ROOT + "\\", "")}: ${hits.join(", ")}`);
  if (APPLY) {
    writeFileSync(f, out, "utf8");
    // Verify by re-reading: a claim the write worked is worth nothing without it.
    const after = readFileSync(f, "utf8");
    const still = PATTERNS.some((p) => p.re.test(after));
    console.log(still ? `  FAILED — a shaped placeholder survived` : `  rewritten`);
    if (still) process.exitCode = 1;
    changed++;
  } else {
    console.log(`  DRY RUN — re-run with --apply`);
  }
}

console.log(`\n${APPLY ? changed : 0} file(s) rewritten`);