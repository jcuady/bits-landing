/**
 * Authenticated CRM API regression check. READ-ONLY: only GETs are issued.
 * Signs in through the public demo persona, then exercises the four API routes
 * from inside the authenticated page context so session cookies are sent.
 */
import { chromium } from "playwright";

const BASE = process.env.RESPONSIVE_BASE_URL ?? "http://localhost:3847";

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

let failures = 0;
const fail = (m) => { console.log("  FAIL: " + m); failures++; };

console.log("signing in via demo persona…");
await page.goto(`${BASE}/login?next=%2Fapp%2Fdashboard`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Sales Director|Enter demo/i }).first().click();
await page.waitForURL("**/app/dashboard", { timeout: 20000 });
console.log("  signed in ->", page.url().split("/").pop());

console.log("\n=== authenticated GET responses ===");
for (const r of ["leads", "campaigns", "automations", "email-logs"]) {
  const res = await page.evaluate(async (route) => {
    const r = await fetch(`/api/crm/${route}`);
    const text = await r.text();
    let parsed = null;
    try { parsed = JSON.parse(text); } catch {}
    return {
      status: r.status,
      cc: r.headers.get("cache-control") ?? "",
      vary: r.headers.get("vary") ?? "",
      ok: parsed?.ok,
      bodyHead: text.slice(0, 160),
      count: parsed?.count,
      arrays: parsed ? Object.keys(parsed).filter(k => Array.isArray(parsed[k])) : [],
    };
  }, r);

  const noStore = /no-store/.test(res.cc);
  // Next.js emits its own `vary: rsc, …` header; ours must arrive SEPARATELY.
  // Checking this catches a silent framework change that would let a shared
  // cache serve one session's PII to another.
  const varyCookie = res.vary;
  if (res.status !== 200) fail(`GET /${r} -> ${res.status} (expected 200 when authenticated)`);
  else if (res.ok !== true) fail(`GET /${r} returned ok=${res.ok}`);
  else if (!noStore) fail(`GET /${r} 200 is missing no-store (got "${res.cc}")`);
  else if (!varyCookie) fail(`GET /${r} 200 is missing Vary: Cookie (got "${varyCookie || "none"}")`);
  console.log(
    `  ${res.status === 200 && res.ok === true && noStore && varyCookie ? "ok  " : "FAIL"} /${r}` +
      ` -> ${res.status}, no-store=${noStore}, vary-cookie=${varyCookie}` +
      (r === "leads" ? `, count=${res.count}, arrays=[${res.arrays}]` : `, arrays=[${res.arrays}]`)
  );
}

// The CRM store depends on the exact response shape of /api/crm/leads.
console.log("\n=== store contract: fields the CRM hydrates from ===");
const shape = await page.evaluate(async () => {
  const r = await fetch("/api/crm/leads");
  const j = await r.json();
  const s = j?.submissions?.[0];
  const m = j?.mapped;
  return {
    hasSubmissions: Array.isArray(j?.submissions),
    hasMapped: !!m,
    mappedKeys: m ? Object.keys(m) : [],
    mappedCounts: m
      ? Object.fromEntries(Object.entries(m).map(([k, v]) => [k, Array.isArray(v) ? v.length : null]))
      : {},
    sampleSubmissionKeys: s ? Object.keys(s) : [],
    leadSample: m?.leads?.[0] ? Object.keys(m.leads[0]) : [],
    contactSample: m?.contacts?.[0] ? Object.keys(m.contacts[0]) : [],
    oppSample: m?.opportunities?.[0] ? Object.keys(m.opportunities[0]) : [],
    phoneOfFirst: m?.contacts?.[0]?.phone,
    closeDateOfFirst: m?.opportunities?.[0]?.closeDate,
  };
});
console.log("  submissions is array :", shape.hasSubmissions);
console.log("  mapped keys          :", shape.mappedKeys.join(", "));
console.log("  mapped counts        :", JSON.stringify(shape.mappedCounts));
console.log("  lead keys            :", shape.leadSample.join(", "));
console.log("  contact phone (fixed):", JSON.stringify(shape.phoneOfFirst));
console.log("  opp closeDate (fixed):", shape.closeDateOfFirst);

// Re-fetch must be idempotent — the Phase-15 fix, proven through the live route.
const twice = await page.evaluate(async () => {
  const a = await (await fetch("/api/crm/leads")).json();
  const b = await (await fetch("/api/crm/leads")).json();
  const ids = (x) => [
    ...(x.mapped.companies || []).map((c) => c.id),
    ...(x.mapped.contacts || []).map((c) => c.id),
    ...(x.mapped.opportunities || []).map((o) => o.id),
  ];
  const A = ids(a), B = ids(b);
  return { stable: JSON.stringify(A) === JSON.stringify(B), n: A.length };
});
console.log("\n=== idempotence through the live route ===");
if (!twice.stable) fail("re-fetch produced different entity ids (Phase 15 regression)");
else console.log(`  ok: ${twice.n} entity ids identical across two fetches`);

await browser.close();
console.log(failures === 0 ? "\nAUTHED CRM API CHECK: PASS" : `\nAUTHED CRM API CHECK: ${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);