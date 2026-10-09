/**
 * Empirical RLS probe against the LIVE Supabase project (SYSTEM_AUDIT.md §39).
 *
 * Why: §29 established the ground truth by reading `scripts/supabase-schema.sql`.
 * That is a file describing an intended schema. It is not proof of what the
 * deployed database actually enforces, and every security conclusion in this
 * audit rests on that file being accurate. Nobody had checked.
 *
 * THE HONEST VERSION OF THIS TEST
 * ------------------------------
 * "anon got 0 rows" is ambiguous. It means one of two very different things:
 *
 *   (a) RLS filtered anon out, and the table really does hold the owner's data
 *   (b) the table is empty, and anon was never challenged at all
 *
 * Those look identical from the outside. So every table is counted twice: once
 * as anon, once with the service-role key held locally, which is the ground
 * truth for how many rows exist. Only a table where anon < service has proved
 * anything; an empty table proves nothing and is reported as inconclusive.
 *
 * ── WHY THIS FILE CARRIES A PARSER TEST SUITE ─────────────────────────────
 * The first version of this probe was wrong in exactly the way that matters
 * here. Supabase answers 206 when a Range header is sent; the parser only
 * handled 200; and every unparseable result was coerced to zero with `?? 0`.
 *
 * The output was therefore "0 rows — table is empty" for all four tables, and
 * the script still exited 0 printing "✔ no table exposed data to the public anon
 * key". `inbound_leads` actually holds 10 rows, which §18 had recorded correctly
 * all along. The probe contradicted a correct earlier finding, on the strength
 * of a null that had been laundered into a zero.
 *
 * Two rules come out of that, and they are the whole fix:
 *   1. A count that cannot be read is null. Null is an ERROR, never zero.
 *   2. 206 is success, not failure.
 * Both are asserted below before a single request is made.
 *
 * The service-role key is read from .env.local, used only to COUNT rows, and
 * never printed. The anon key is the one that matters: it is public by design,
 * so testing with it proves the boundary using an already-public secret.
 *
 * Run: node scripts/anon-access-probe.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ── 0. The count parser, and its test ──────────────────────────────────── */
function parseCount(status, contentRange, bodyLength) {
  if (status === 200 || status === 206) {
    if (contentRange) {
      const total = contentRange.split("/")[1];
      if (total !== undefined && total !== "*" && total !== "") {
        const n = Number(total);
        if (Number.isFinite(n)) return { n, ok: true };
      }
    }
    if (Number.isFinite(bodyLength)) return { n: bodyLength, ok: true };
  }
  if (status === 401 || status === 403) return { n: 0, ok: true, denied: true };
  return { n: null, ok: false };
}

let parserFail = 0;
const ptest = (name, got, wantN, wantOk) => {
  const pass = got.n === wantN && got.ok === wantOk;
  if (!pass) parserFail++;
  console.log(
    `  ${pass ? "ok  " : "FAIL"}  ${name}` +
      (pass ? "" : `  [got n=${got.n} ok=${got.ok}, want n=${wantN} ok=${wantOk}]`)
  );
};

console.log("Count-parser self-test (runs before any request):");
ptest("200 with a total", parseCount(200, "0-9/10", 10), 10, true);
ptest("206 from a Range header — the bug that made this probe wrong", parseCount(206, "0-0/10", 1), 10, true);
ptest("200 with an unknown total falls back to body length", parseCount(200, "0-9/*", 10), 10, true);
ptest("no content-range falls back to body length", parseCount(200, null, 3), 3, true);
ptest("401 is a clean denial, not an empty table", parseCount(401, null, 0), 0, true);
ptest("500 is an ERROR, never zero", parseCount(500, null, 0), null, false);
ptest("418 is an ERROR, never zero", parseCount(418, null, 0), null, false);
if (parserFail) {
  console.error(`\n✖ the count parser failed its own test (${parserFail}). Refusing to probe.`);
  console.error("  A probe that cannot read a response must report nothing about RLS.");
  process.exit(2);
}
console.log();

/* ── Credentials ────────────────────────────────────────────────────────── */
const env = {};
for (const line of readFileSync(join(ROOT, ".env.local"), "utf8").split(/\r?\n/)) {
  const i = line.indexOf("=");
  if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
}
const SERVICE = env.SUPABASE_SERVICE_ROLE_KEY;

/* From source, not .env.local: the point is to test the key that actually ships
 * to browsers. */
const clientSrc = readFileSync(join(ROOT, "lib", "supabase", "client.ts"), "utf8");
const URL_ = clientSrc.match(/https:\/\/[a-z0-9]+\.supabase\.co/)?.[0];
const ANON = clientSrc.match(/eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/)?.[0];

if (!URL_ || !ANON) {
  console.error("Could not read the public Supabase url/anon key from lib/supabase/client.ts");
  process.exit(2);
}
if (env.NEXT_PUBLIC_SUPABASE_URL !== URL_) {
  console.error("env NEXT_PUBLIC_SUPABASE_URL does not match the URL compiled into source.");
  console.error("Probing one project while counting another would prove nothing.");
  process.exit(2);
}
if (!SERVICE) {
  console.error("SUPABASE_SERVICE_ROLE_KEY is not set in .env.local.");
  console.error("Without it, 'anon saw 0 rows' cannot be distinguished from 'the table is");
  console.error("empty', so the probe would be reporting an unknown as a result.");
  process.exit(2);
}

const urlRef = URL_.replace(/^https:\/\//, "");
const schemaRef = readFileSync(join(ROOT, "scripts", "supabase-schema.sql"), "utf8")
  .match(/[a-z0-9]{15,}\.supabase\.co/)?.[0];
if (schemaRef && schemaRef !== urlRef) {
  console.error(`REF MISMATCH: source points at ${urlRef}, schema file describes ${schemaRef}.`);
  process.exit(2);
}

console.log(`Probing ${urlRef}`);
console.log("env URL, source URL and schema-file ref all agree.");
console.log("Service-role key present locally; used only to COUNT rows, never printed.\n");

const TABLES = ["inbound_leads", "email_logs", "marketing_automations", "marketing_campaigns"];

async function countWith(key, table) {
  try {
    const res = await fetch(`${URL_}/rest/v1/${table}?select=id`, {
      method: "GET",
      headers: { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact", Range: "0-0" },
    });
    const text = await res.text();
    let len = null;
    try {
      const j = JSON.parse(text);
      len = Array.isArray(j) ? j.length : null;
    } catch {}
    const parsed = parseCount(res.status, res.headers.get("content-range"), len);
    return { ...parsed, status: res.status };
  } catch (e) {
    return { n: null, ok: false, error: String(e.message).slice(0, 60) };
  }
}

const results = [];
let anyLeak = false;
let anyProven = false;
let anyError = false;

console.log("table                     anon    service   verdict");
console.log("-".repeat(74));

for (const t of TABLES) {
  const anon = await countWith(ANON, t);
  const svc = await countWith(SERVICE, t);

  if (!anon.ok || !svc.ok) {
    anyError = true;
    const why = !anon.ok ? `anon HTTP ${anon.status ?? anon.error}` : `service HTTP ${svc.status ?? svc.error}`;
    results.push({ t, anon, svc, verdict: `NOT TESTED — ${why}`, conclusive: false });
    console.log(`${t.padEnd(25)} ${"-".padEnd(7)} ${"-".padEnd(9)} NOT TESTED — ${why}`);
    continue;
  }

  const truth = svc.n;
  let verdict;
  let conclusive;
  if (anon.denied) {
    verdict = `denied for anon (HTTP ${anon.status}) — RLS holds`;
    conclusive = true;
    anyProven = true;
  } else if ((anon.n ?? 0) > 0) {
    verdict = `LEAK — anon received ${anon.n} row(s)  <-- RLS NOT ENFORCED`;
    conclusive = true;
    anyLeak = true;
  } else if (truth > 0) {
    verdict = `PROVEN — ${truth} rows exist, anon saw 0`;
    conclusive = true;
    anyProven = true;
  } else {
    verdict = "INCONCLUSIVE — table is empty, anon was never challenged";
    conclusive = false;
  }
  results.push({ t, anon, svc, verdict, conclusive });
  console.log(
    `${t.padEnd(25)} ${String(anon.n).padEnd(7)} ${String(truth).padEnd(9)} ${verdict}`
  );
}

/* ── Sanity check: could this probe have detected a leak at all? ────────── */
console.log("\nProbe sanity check:");
const protectedCount = results.filter((r) => r.conclusive && (r.svc?.n ?? 0) > 0 && (r.anon?.n ?? 0) === 0).length;
const testedCount = results.filter((r) => r.conclusive).length;

if (testedCount === 0) {
  console.log("  No table produced a conclusive result — this probe established NOTHING.");
  console.log("  Seeding deliberately, then re-running, is required before claiming RLS holds.");
} else {
  console.log(`  Conclusive tables                        : ${testedCount}`);
  console.log(`  …of those, rows existed AND anon saw none : ${protectedCount}`);
  console.log(
    protectedCount > 0
      ? "  => The probe demonstrably told the two roles apart, so the results above are meaningful."
      : "  => Every conclusive result was a flat denial. RLS holds, but no row was ever at risk,\n" +
        "     so this run did not actually exercise the filtering path."
  );
}

const inconclusive = results.filter((r) => !r.conclusive).length;
console.log(
  `\nleak=${anyLeak ? "YES" : "no"}  proven=${anyProven ? "yes" : "no"}  ` +
    `inconclusive=${inconclusive}  untested=${anyError ? "yes" : "no"}`
);

if (anyLeak) {
  console.log("\n✖ RLS is not enforced on at least one table. Treat as a P0.");
  process.exit(1);
}
if (anyError || inconclusive) {
  console.log(
    "\n! PARTIAL RESULT. The tables above are fine; the ones marked inconclusive or\n" +
      "  untested were NOT proven safe. Do not read this as a clean bill of health."
  );
  process.exit(2);
}
console.log("\n✔ every table was conclusively tested; none exposed data to the public anon key");
process.exit(0);