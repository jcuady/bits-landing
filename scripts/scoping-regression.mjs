/*
 * SYSTEM_AUDIT.md §44 — pins the SCOPED_OUT exemptions.
 *
 * `lib/site/security-claims.mjs` exempts a whole sentence from a banned
 * attestation when it carries a denial marker. §44 established that this
 * exemption is BROADER THAN SOUND: one denial licenses every claim in the
 * sentence, so "… are built in, not bolted on" slips through. Three tightenings
 * were built and measured, and all three broke honest copy that ships in this
 * repo — the sentence-level rule stayed.
 *
 * The consequence is that the exemption is load-bearing for real user-facing
 * text. It is what lets these ship:
 *
 *   "Not shipped: per-role authorization and audit logging."
 *   "Call-frequency and cease-and-desist handling is not part of this build."
 *   "HIPAA is not applicable to this product"
 *   "Target: full, access-logged"
 *   "Immutable audit logging — roadmap"
 *
 * If a future edit tightens SCOPED_OUT — even correctly, even as a security
 * improvement — those strings start failing the build, and the tempting fix is
 * to delete or soften the honest denial. That is how a correction gets lost,
 * and it has happened to this gate three times already (§29).
 *
 * THIS IS THE PROTECTION AGAINST THAT. Every honest denial currently on the
 * security surfaces is discovered from the source files at runtime, not copied
 * into a list here, so it cannot drift: add a new honest denial and it is
 * pinned automatically. Break the scoping and this fails, naming the exact
 * string and file.
 *
 * It asserts one-sided on purpose — the honest corpus must stay passing. The
 * known false-negative is tracked separately, in scripts/probe-proposed-copy.mjs,
 * because asserting "this false claim still gets through" is a strange thing to
 * make a test require and it would look like an endorsement.
 *
 * Run: node scripts/scoping-regression.mjs
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  SCOPED_OUT,
  CHECKS,
  SECURITY_SURFACES,
  visibleStrings,
  exportRegion,
  findClaims,
} from "../lib/site/security-claims.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

let failures = 0;
let pinned = 0;
const seen = new Set();

function assert(cond, label) {
  if (cond) {
    console.log(`PASS  ${label}`);
  } else {
    failures += 1;
    console.log(`FAIL  ${label}`);
  }
}

/* A string is "honest copy" if it names a banned term AND carries a marker. */
function isExemptCandidate(value) {
  if (!SCOPED_OUT.test(value)) return false;
  return CHECKS.some((c) => c.term.test(value));
}

/* ---------------------------------------------------------------------------
 * Collect from the real surfaces.
 * ------------------------------------------------------------------------ */
const missing = [];
for (const surface of SECURITY_SURFACES) {
  if (!existsSync(join(ROOT, surface.file))) {
    missing.push(surface.file);
    continue;
  }
  const raw = read(surface.file);
  const regions = surface.exports
    ? surface.exports.map((name) => {
        const region = exportRegion(raw, name);
        if (!region) {
          missing.push(`${surface.file} (${name})`);
          return null;
        }
        return { name, src: region };
      }).filter(Boolean)
    : [{ name: null, src: raw }];

  for (const region of regions) {
    const where = `${surface.file}${region.name ? ` (${region.name})` : ""}`;
    for (const { value } of visibleStrings(region.src)) {
      const flat = value.replace(/\s+/g, " ").trim();
      if (!isExemptCandidate(flat)) continue;
      if (seen.has(flat)) continue;
      seen.add(flat);
      pinned += 1;
      const flagged = findClaims(flat);
      if (flagged.length > 0) {
        failures += 1;
        console.log(
          `FAIL  ${where}: an honest denial is no longer exempt. ` +
            `The scoping rules now flag "${flat.slice(0, 110)}" ` +
            `(attestations: ${flagged.map((c) => c.id).join(", ")}).\n` +
            `      Fix the scoping, NOT this string. See SYSTEM_AUDIT.md §44.`
        );
      } else {
        console.log(`PASS  ${where}: "${flat.slice(0, 92)}"`);
      }
    }
  }
}

console.log("");
assert(missing.length === 0, `all ${SECURITY_SURFACES.length} security surfaces were readable (${missing.join(", ") || "none missing"})`);

/* The corpus must be non-empty. A vacuous pass here would mean the discovery
 * above silently stopped finding anything — e.g. visibleStrings changed shape —
 * and the net would protect nothing while reporting success.
 *
 * PINNED_FLOOR is the number actually discovered on 8 October 2026, not a
 * round number picked for looks. A guess of 15 was tried first and failed; the
 * honest corpus is 10 strings. Raise the floor when honest copy is added, and
 * the assertion will tell you to. */
const PINNED_FLOOR = 10;

assert(pinned > 0, `honest denials were discovered from source (${pinned} pinned)`);
assert(
  pinned >= PINNED_FLOOR,
  `corpus has not silently shrunk below the measured baseline ` +
    `(${pinned} pinned, floor ${PINNED_FLOOR})`
);

if (failures > 0) {
  console.error(`FAILED  ${failures} assertion(s)`);
  process.exitCode = 1;
} else {
  console.log(`scoping regression verified (${pinned} honest denials pinned)`);
}