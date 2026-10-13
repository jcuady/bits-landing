/**
 * SYSTEM_AUDIT.md §98 — every host the browser contacts WITHOUT the visitor
 * choosing to, declared in one place.
 *
 * WHY THIS EXISTS
 * ---------------
 * §97 found, by running the application rather than reading it, that every
 * page load discloses the visitor's IP address and User-Agent to
 * `cdn.jsdelivr.net`. The site's consent checkbox binds visitors to a Privacy
 * Notice under Philippine RA 10173, and that notice said nothing about it.
 *
 * **No gate could have seen it.** `cookie-disclosure` reads cookies and
 * `localStorage`. `asset-integrity` reads `public/`. Nothing in this repository
 * had ever looked at an OUTBOUND request. That is the structural blind spot
 * this closes.
 *
 * THE CLASS IS "WITHOUT USER ACTION", NOT "ANY REMOTE URL"
 * --------------------------------------------------------
 * A static scan of the 195 shipped files finds 18 distinct hosts. They are not
 * one class, and treating them as one would produce a report nobody reads:
 *
 *   • user-clicked links — cal.com, github.com, facebook.com, instagram.com,
 *     linkedin.com, x.com. A visitor chooses these; nothing is disclosed until
 *     they click. Normal, and not a privacy question.
 *   • identifiers, not requests — schema.org (JSON-LD @context), www.w3.org
 *     (XML namespaces). Never fetched.
 *   • server-side services — api.resend.com (email), *.supabase.co (database).
 *     These run in Node, not in a browser, so the visitor's address is not
 *     disclosed to them.
 *   • test fixtures — bits.example, meet.example, evil.com, spam.example, all
 *     inside gate files that never ship.
 *   • our own brand — www.boundlessits.com.
 *
 * The rule is therefore positional, not lexical-by-host: only URLs the browser
 * FETCHES are in scope — CSS `@import`/`url()`, `<link href>`, `<script src>`,
 * `<img src>`, and `fetch(`. A URL inside an anchor is a navigation, and a
 * navigation is not a silent disclosure.
 *
 * MEASURED SEPARATION, NOT ASSUMED
 * ---------------------------------
 *   subresource positions : 11 URLs across 2 hosts
 *   anchor control        : 12 URLs across 6 hosts — none of them flagged
 *
 * That control is the part that matters. A rule that also fired on cal.com and
 * github.com would be indistinguishable from noise, and §44 measured what
 * happens to rules like that: they get switched off within a day.
 *
 * WHAT IS ASSERTED
 * ----------------
 *   1. Every subresource host is DECLARED below, with a scope and a purpose.
 *      An undeclared host FAILS — that is the §97 case, mechanically.
 *   2. A `client` scope host must actually be named in the page that discloses
 *      it. A declaration that no disclosure backs is a claim, not a fact.
 *   3. A `server` scope host must live in a module that is not a client module
 *      and that no `"use client"` file imports directly. This is a ONE-LEVEL
 *      check and is declared as such — a transitive reachability proof is not
 *      attempted, and the limitation is the gate's own stated boundary rather
 *      than a silent gap.
 *
 * Run: node scripts/external-requests.mjs
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.env.BITS_ROOT || process.cwd();
const ROOTS = ["app", "components", "lib", "public"];

/**
 * Every host this application may contact without a visitor choosing to.
 * Adding an entry is a DECISION, not a suppression — the reason is inline and
 * required, and a `client` entry additionally has to appear in `disclosedIn`.
 *
 * `BITS_DECLARATIONS` overrides this table with a JSON file of the same shape.
 * The negative test needs that: it cannot exercise "declared but not disclosed"
 * against a table hard-coded here, because the table would be the REAL one and
 * every fixture host would be undeclared for the wrong reason. The repository
 * itself never sets it.
 */
const INLINE_DECLARED = {
  "cdn.jsdelivr.net": {
    scope: "client",
    purpose:
      "Web fonts (Geist, Geist Mono, Instrument Serif) via CSS @import. Requested on every page load, so it sees the visitor's IP and User-Agent. §97: this was undiscovered for 97 phases because no gate looked at outbound requests. Self-hosting is the correct fix and is recorded as an owner decision; this declaration is the honest interim state.",
    disclosedIn: "app/(marketing)/cookies/page.tsx",
  },
  "api.resend.com": {
    scope: "server",
    purpose:
      "Transactional email API. Called from Node in the server action only — the visitor's address is never disclosed to Resend by this application.",
    declaredIn: "lib/email/service.ts",
  },
};

/* Only the browser FETCHES a subresource. Everything else is a navigation, an
 * identifier, or server-side. Measured separation is in the file header. */
const SUBRESOURCE_RULES = [
  ["css @import url()", /@import\s+url\(\s*["']?(https?:\/\/[^"')]+)/g],
  ["css @import bare", /@import\s+["'](https?:\/\/[^"']+)/g],
  ["css url()", /url\(\s*["']?(https?:\/\/[^"')]+)/g],
  /* CASE-SENSITIVE, and that is load-bearing. The first version of this rule was
   * `/<link\b[^>]*\bhref=…/gi` and it matched `<Link href="…">` — Next.js's Link
   * component, which renders an ANCHOR. The negative test's anchor control
   * caught it, which is precisely what that control was written for. A false
   * positive here is not cosmetic: it puts cal.com, github.com and every social
   * link into the "undeclared subresource" failure list. Lowercase `<link>` is
   * the real HTML void element and is what a subresource looks like. */
  ["<link href>", /<link\b[^>]*\bhref\s*=\s*["'](https?:\/\/[^"']+)/g],
  ["<script src>", /<script\b[^>]*\bsrc\s*=\s*["'](https?:\/\/[^"']+)/g],
  ["<img src>", /<img\b[^>]*\bsrc\s*=\s*["'](https?:\/\/[^"']+)/g],
  ["fetch(", /\bfetch\(\s*["'`](https?:\/\/[^"'`]+)/g],
];

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

/* The site's own host is DERIVED from the fallback literal in lib/site.ts, not
 * typed here — a duplicated domain is a third copy to forget to update. A tree
 * without `lib/site.ts` (the negative test's fixtures) simply has no own host. */
const sitePath = join(ROOT, "lib/site.ts");
const ownHostMatch = existsSync(sitePath)
  ? readFileSync(sitePath, "utf8").match(/NEXT_PUBLIC_SITE_URL\s*\|\|\s*"(https?:\/\/[^/"]+)"/)
  : null;
const ownHost = ownHostMatch ? new URL(ownHostMatch[1]).host : null;

const files = ROOTS.flatMap((d) => (existsSync(join(ROOT, d)) ? walk(join(ROOT, d)) : []));

const DECLARED = process.env.BITS_DECLARATIONS
  ? JSON.parse(readFileSync(process.env.BITS_DECLARATIONS, "utf8"))
  : INLINE_DECLARED;

/** host -> { rule, where[], file[] } */
const found = new Map();
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const rel = relative(ROOT, f).replace(/\\/g, "/");
  for (const [label, re] of SUBRESOURCE_RULES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) !== null) {
      let host;
      try {
        host = new URL(m[1]).host;
      } catch {
        continue;
      }
      if (!found.has(host)) found.set(host, { rules: new Set(), where: [], files: new Set() });
      found.get(host).rules.add(label);
      found.get(host).where.push(`${rel}:${src.slice(0, m.index).split("\n").length}`);
      found.get(host).files.add(rel);
    }
  }
}

const failures = [];
const hosts = [...found.keys()].filter((h) => h !== ownHost).sort();

/* §70 — a gate that examined nothing must not report that everything is fine.
 * The negative test's empty-tree control caught the first version printing its
 * green tick over zero scanned URLs. This is the same warning `gated-render-
 * closure` prints, and it exists for the same reason: "I found nothing" and
 * "there is nothing" are different answers and only one of them is a pass. */
let totalUrls = 0;
for (const info of found.values()) totalUrls += info.where.length;

console.log("=== EXTERNAL REQUESTS (no user action) ===\n");
console.log(`  scanned ${files.length} shipped files under ${ROOTS.join(", ")}`);
console.log(`  own host (derived from lib/site.ts): ${ownHost}`);
console.log(`  subresource URLs found: ${totalUrls}   hosts: ${hosts.length}\n`);

if (totalUrls === 0) {
  console.log(
    "⚠ NO SUBRESOURCE URLS FOUND — the scan path did not execute.\n" +
      "  Vacuous pass: this run could not have failed. Either the ROOTS are wrong or\n" +
      "  every external reference moved out of subresource position."
  );
}

for (const h of hosts) {
  const d = DECLARED[h];
  const info = found.get(h);
  if (!d) {
    failures.push(
      `${h} is requested without user action and is NOT declared.\n` +
        `      seen at ${info.where.slice(0, 3).join(", ")}\n` +
        `      §97: an undeclared subresource host discloses every visitor's IP to that\n` +
        `      operator. Declare it in scripts/external-requests.mjs with a scope and a\n` +
        `      reason, or remove it.`
    );
    console.log(`  ✖ ${h}\n      UNDECLARED — ${info.rules.size} position(s): ${[...info.rules].join(", ")}`);
    console.log(`      ${info.where.slice(0, 3).join("\n      ")}\n`);
    continue;
  }
  console.log(`  ✔ ${h}  [${d.scope} scope]`);
  console.log(`      ${d.purpose.split("\n").join("\n      ")}`);
  console.log(`      positions: ${[...info.rules].join(", ")}  in  ${[...info.files].join(", ")}\n`);

  /* 2 — a client-scope declaration must be backed by an actual disclosure. */
  if (d.scope === "client") {
    const disclosure = d.disclosedIn;
    if (!disclosure) {
      failures.push(`${h} is declared client-scope with no \`disclosedIn\` — a declaration with no disclosure behind it is a claim, not a fact.`);
    } else if (!existsSync(join(ROOT, disclosure))) {
      failures.push(`${h} claims to be disclosed in ${disclosure}, which does not exist.`);
    } else if (!readFileSync(join(ROOT, disclosure), "utf8").includes(h)) {
      failures.push(
        `${h} is declared client-scope and claims to be disclosed in ${disclosure},\n` +
          `      but that file does not mention it. This is the §97 defect mechanically:\n` +
          `      the request happens on every page load and the notice does not say so.`
      );
    }
  }

  /* 3 — a server-scope host must not be reachable from a client module. */
  if (d.scope === "server") {
    for (const f of info.files) {
      const src = readFileSync(join(ROOT, f), "utf8");
      if (/^\s*["']use client["']/m.test(src)) {
        failures.push(`${h} is declared server-scope but appears in ${f}, which is a "use client" module.`);
      }
    }
    for (const f of files) {
      if (info.files.has(relative(ROOT, f).replace(/\\/g, "/"))) continue;
      const src = readFileSync(f, "utf8");
      if (!/^\s*["']use client["']/m.test(src)) continue;
      const base = relative(ROOT, f).split("/").pop();
      for (const hostFile of info.files) {
        const stem = hostFile.split("/").pop().replace(/\.(ts|tsx|mjs)$/, "");
        if (new RegExp(`from\\s+["'][^"']*${stem}["']`).test(src)) {
          failures.push(
            `${h} is declared server-scope, but the client module ${relative(ROOT, f).replace(/\\/g, "/")} imports ${hostFile}.\n` +
              `      NOTE: this is a ONE-LEVEL check (direct imports only); transitive reachability is not attempted.`
          );
        }
      }
      void base;
    }
  }
}

/* Stale declarations: a host declared but no longer requested is not an error —
 * it is dead config. Reported so the list cannot quietly rot. */
const stale = Object.keys(DECLARED).filter((h) => !found.has(h));

console.log(`  declared: ${Object.keys(DECLARED).length}   found: ${hosts.length}   undeclared: ${failures.length ? "see above" : "none"}`);
if (stale.length) console.log(`  declared but not found in any subresource position: ${stale.join(", ")} (stale, not fatal)\n`);

if (failures.length) {
  console.error(`\n✖ external-requests FAILED (${failures.length})`);
  for (const f of failures) console.error(`    ✖ ${f}`);
  process.exit(1);
}
console.log(
  `\n${totalUrls === 0 ? "⚠ (nothing scanned — see above)" : "✔"} every host contacted without user action is declared, and every client-scope one is disclosed.`
);