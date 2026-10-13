#!/usr/bin/env node
/**
 * Cookie / client-storage disclosure integrity selfcheck.
 *
 * Guards the public compliance surfaces:
 *   - `app/(marketing)/cookies/page.tsx`  → `cookieAuditList`
 *   - `components/ui/cookie-consent.tsx`  → the consent dialog's prose
 *
 * THE DEFECT THIS GUARDS (8 Oct 2026)
 * -----------------------------------
 * `/cookies` disclosed three clients that the site never sets or reads:
 *
 *   - `bits_crm_session` — described as an "Encrypted authentication cookie
 *     holding the active tenant session token". The only definition was
 *     `lib/crm/auth.ts`, which had ZERO importers and was therefore dead code.
 *     Worse, its `encodeSession` was plain **base64url**, not encryption, so
 *     the "encrypted" claim was false twice: no cookie, and not encrypted.
 *     Anyone wiring that module up believing it was encrypted would have
 *     shipped a trivially forgeable session cookie.
 *   - `bits_hardware_scale` — zero references in the repository.
 *   - `bits_telemetry_perf` — zero references in the repository.
 *
 * It simultaneously failed to disclose NINE real localStorage keys, and
 * described `bits_demo_role` as "maintains the selected interactive demo
 * perspective" when no code reads it at all.
 *
 * A compliance page that names clients the site does not use is worse than no
 * page, because it invites reliance on a disclosure that is not true.
 *
 * Run: node lib/site/cookie-disclosure.selfcheck.mjs
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const failures = [];

/* -------------------------------------------------------------------------- */
/* 1. Source code that actually touches client storage                        */
/* -------------------------------------------------------------------------- */

/** Files whose storage access is real application behaviour. */
const RUNTIME_DIRS = ["app", "components", "lib"];

function walk(dir, out = []) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      // Never scan test/gate files — they legitimately mention key names as
      // string literals and would create a self-fulfilling pass.
      if (entry.name.includes("selfcheck") || entry.name === "node_modules") continue;
      walk(rel, out);
    } else if (/\.(ts|tsx|jsx|js)$/.test(entry.name)) {
      out.push(rel);
    }
  }
  return out;
}

const runtimeFiles = RUNTIME_DIRS.flatMap((d) => walk(d));
const runtimeSource = runtimeFiles.map((f) => read(f)).join("\n");

// localStorage keys, including ones assigned to a `const *_KEY = "..."` and
// then used (the constant indirection is the common shape in this codebase).
const literalKeys = new Set();
// Keys the site only ever DELETES (legacy purge targets). These are not
// storage — the site reads nothing and writes nothing into them — so they are
// excluded from the disclosure requirement to avoid listing keys in a policy
// that the site never populates.
const purgeOnlyKeys = new Set();

for (const m of runtimeSource.matchAll(/localStorage\.(setItem|getItem)\(\s*["'`]([a-z0-9_-]+)["'`]/gi)) {
  literalKeys.add(m[2]);
}
for (const m of runtimeSource.matchAll(/const\s+[A-Z0-9_]*KEY\s*=\s*["'`]([a-z0-9_-]+)["'`]/g)) {
  literalKeys.add(m[1]);
}
// Keys reached only through a removeItem call.
for (const m of runtimeSource.matchAll(/localStorage\.removeItem\(\s*["'`]([a-z0-9_-]+)["'`]/gi)) {
  purgeOnlyKeys.add(m[1]);
}
for (const k of [...purgeOnlyKeys]) {
  if (!literalKeys.has(k)) literalKeys.delete(k);
}

// Cookies explicitly set or deleted by the app.
const cookieNames = new Set();
for (const m of runtimeSource.matchAll(/cookieStore\.(?:set|delete)\(\s*["'`]([a-z0-9_*-]+)["'`]/gi)) {
  cookieNames.add(m[1]);
}

// The Supabase auth cookie is written by the SDK, not by name in our source.
cookieNames.add("sb-*-auth-token");

/* -------------------------------------------------------------------------- */
/* 2. The disclosure table must match reality — both directions               */
/* -------------------------------------------------------------------------- */

const cookiesPage = read("app/(marketing)/cookies/page.tsx");
const tableStart = cookiesPage.indexOf("const cookieAuditList = [");
if (tableStart === -1) failures.push("cookies page: cookieAuditList not found");
const tableEnd = cookiesPage.indexOf("];", tableStart);
const table = cookiesPage.slice(tableStart, tableEnd);

const disclosed = [...table.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);

if (disclosed.length === 0) failures.push("cookies page: disclosure table is empty");

// Disclosed -> must exist somewhere in real runtime code.
const realClients = new Set([...literalKeys, ...cookieNames]);
for (const name of disclosed) {
  if (!realClients.has(name)) {
    failures.push(
      `cookies page discloses "${name}" but no runtime code sets or reads it`
    );
  }
}

// Real -> must be disclosed (client storage the visitor can clear in devtools).
for (const name of literalKeys) {
  if (!disclosed.includes(name)) {
    failures.push(
      `runtime code uses localStorage key "${name}" but /cookies does not disclose it`
    );
  }
}

/* -------------------------------------------------------------------------- */
/* 3. No security claim may exceed what the code does                         */
/* -------------------------------------------------------------------------- */

// The old entry described a base64url payload as encrypted. Guard the specific
// class of overclaim: any disclosure claiming encryption must name a client
// that is actually encrypted, and there must be no encoder that is only
// base64 sitting behind such a claim.
const claimsEncryption = /encrypt/i.test(table);
const hasBase64OnlyEncoder =
  /toBase64Url|btoa\(|Buffer\.from\([^)]*\)\.toString\(["']base64/.test(runtimeSource);

if (claimsEncryption && hasBase64OnlyEncoder) {
  failures.push(
    "cookies page claims an 'encrypted' client but the only encoder present is base64 (not encryption)"
  );
}

// bits_demo_role must never be described as controlling anything.
if (/bits_demo_role/.test(table) && /maintains|controls|grants access/i.test(
    table.slice(table.indexOf("bits_demo_role"), table.indexOf("bits_demo_role") + 400)
  )) {
  failures.push(
    'bits_demo_role is disclosed as controlling behaviour, but no code reads it — it must be described as an unused persona hint'
  );
}

// The consent dialog may only name clients that the policy discloses. Scoped
// to identifiers it actually stores, NOT every `bits_*` token in the file —
// `bits_open_cookie_preferences` and `bits_cookie_consent_update` are DOM
// CustomEvent names, not storage, and matching them was a false positive.
const consent = read("components/ui/cookie-consent.tsx");
const consentStorageKeys = new Set();
for (const m of consent.matchAll(/localStorage\.(setItem|getItem)\(\s*["'`]([a-z0-9_-]+)["'`]/gi)) {
  consentStorageKeys.add(m[2]);
}
for (const m of consent.matchAll(/const\s+[A-Z0-9_]*KEY\s*=\s*["'`]([a-z0-9_-]+)["'`]/g)) {
  consentStorageKeys.add(m[1]);
}
for (const k of consentStorageKeys) {
  if (!disclosed.includes(k)) {
    failures.push(
      `cookie-consent.tsx stores "${k}" but the /cookies policy does not disclose it`
    );
  }
}

/* -------------------------------------------------------------------------- */
/* 3b. A collection claim must be backed by a tracker                         */
/* -------------------------------------------------------------------------- */

// Both public compliance surfaces used to describe collection that does not
// exist: a "Performance & Telemetry" category claiming to measure page load
// times and dialer websocket stability, and an opt-in toggle for it. Verified
// on 8 Oct 2026 that the repository contains NO analytics or telemetry code
// whatsoever. If a tracker is ever added, this rule stops complaining.
//
// Strip JSX/JS comments first. An explanatory comment that *quotes* the old
// wording ("formerly claimed to measure…") must not be mistaken for a live
// claim, and must not be able to neutralise the detector either.
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");

// Match trackers by CALL SHAPE, not by bare name.
//
// A bare-name pattern is defeated by its own fix: the corrected /cookies copy
// reads "no Google Analytics, PostHog, Plausible, Clarity or Hotjar, and no
// sendBeacon call anywhere", which contains every vendor name and made
// `hasTracker` true — silently disabling the entire check.
//
// Each pattern below is anchored to the vendor's actual invocation, because
// even `clarity(` alone was matched by marketing prose about "call audio
// clarity (< 20ms LAN jitter)". Honest copy must never be able to suppress this
// rule, and product copy must never be able to trip it.
const TRACKER_USAGE = [
  /\bgtag\s*\(/,
  /googletagmanager\.com\/gtag/,
  /\bposthog\s*[.[]/i,
  /\bplausible\s*\(\s*['"]/i,
  /\bclarity\s*\(\s*['"]set['"]/i, // Microsoft Clarity's documented entry point
  /\bhj\s*\(\s*['"]/,
  /\bmixpanel\s*[.[]/i,
  /\btrackEvent\s*\(/,
  /navigator\.sendBeacon\s*\(/,
  /from\s+["'][^"']*web-vitals/i,
];

const hasTracker = TRACKER_USAGE.some((re) => re.test(runtimeSource));
const cookiesLive = stripComments(cookiesPage);
const consentLive = stripComments(consent);

if (!hasTracker) {
  // Rule 3b-1: no interactive opt-in may exist for a category that collects
  // nothing. Scoped to the analytics category's own markup so an unrelated
  // checkbox elsewhere cannot satisfy or break it.
  const analyticsBlock =
    consentLive.match(/id="cookie-cat-analytics"[\s\S]{0,900}/)?.[0] ?? "";
  if (/<input[^>]*type="checkbox"/i.test(analyticsBlock)) {
    failures.push(
      'cookie-consent.tsx offers an interactive opt-in for "Performance & Telemetry", but no telemetry exists — a switch that gates nothing is a false affordance'
    );
  }

  // Rule 3b-2: no individual paragraph may assert collection. The check is
  // scoped PER PARAGRAPH, not per file: a file-wide denial ("no analytics
  // script…") would otherwise silently excuse any other paragraph claiming we
  // "measure page load times".
  const deniesCollection =
    /nothing is collected|is not collected|no analytics script|no third-party tracker|do not record|no marketing cookies|not tracked|nothing is tracked|previously described|claim has been removed/i;
  const assertsCollection =
    /(measures|collects|tracks|records|benchmarks)\s+(api|page|dialer|visitor|usage|performance|latency|load)/i;

  for (const [label, text] of [
    ["cookies page", cookiesLive],
    ["cookie-consent.tsx", consentLive],
  ]) {
    const paragraphs = text.match(/<p\b[\s\S]*?<\/p>/g) ?? [];
    for (const p of paragraphs) {
      if (assertsCollection.test(p) && !deniesCollection.test(p)) {
        const snippet = p.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 70);
        failures.push(
          `${label} asserts that it measures or collects data, but the repository contains no analytics or telemetry code — "${snippet}…"`
        );
      }
    }
  }
}

/* -------------------------------------------------------------------------- */
/* 4. Report                                                                    */
/* -------------------------------------------------------------------------- */

if (failures.length > 0) {
  console.error("✖ cookie-disclosure selfcheck FAILED:\n");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `✔ cookie-disclosure selfcheck passed (${disclosed.length} clients disclosed, ` +
    `${literalKeys.size} localStorage keys + ${cookieNames.size} cookies found in code, both directions verified)`
);