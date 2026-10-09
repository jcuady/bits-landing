/**
 * CRM API surface verification. READ-ONLY with respect to the database:
 * every mutating attempt below is made ANONYMOUSLY and must be rejected with
 * 401 before any validation or write is reached. Nothing is persisted.
 */
const BASE = process.env.RESPONSIVE_BASE_URL ?? "http://localhost:3847";
const ROUTES = ["leads", "campaigns", "automations", "email-logs"];

let failures = 0;
const fail = (m) => { console.log("  FAIL: " + m); failures++; };
const ok = (m) => console.log("  ok:   " + m);

console.log("=== 1. anonymous GET must be 401 AND no-store ===");
for (const r of ROUTES) {
  const res = await fetch(`${BASE}/api/crm/${r}`);
  const cc = res.headers.get("cache-control") ?? "";
  if (res.status !== 401) fail(`GET /${r} -> ${res.status}, expected 401`);
  else if (!/no-store/.test(cc)) fail(`GET /${r} 401 missing no-store (got "${cc}")`);
  else ok(`GET /${r} -> 401, no-store present`);
}

console.log("\n=== 2. anonymous POST must be 401 (guard runs BEFORE validation) ===");
const bodies = {
  leads: JSON.stringify({ name: "x", email: "not-an-email", company: "x", message: "y" }),
  campaigns: JSON.stringify({ name: "x" }),
  automations: JSON.stringify({ name: "x", trigger_type: "t", action_type: "a" }),
};
for (const [r, body] of Object.entries(bodies)) {
  const res = await fetch(`${BASE}/api/crm/${r}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  // Must be 401 — never 400 (validation) and never 500.
  if (res.status !== 401) fail(`POST /${r} -> ${res.status}, expected 401 (guard must precede validation)`);
  else ok(`POST /${r} -> 401 (rejected before validation)`);
}

console.log("\n=== 3. anonymous POST with malformed JSON must still be 401 ===");
for (const r of Object.keys(bodies)) {
  const res = await fetch(`${BASE}/api/crm/${r}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{ this is not json",
  });
  if (res.status !== 401) fail(`POST /${r} malformed -> ${res.status}, expected 401`);
  else ok(`POST /${r} malformed -> 401`);
}

console.log("\n=== 4. unsupported methods must not leak ===");
for (const r of ROUTES) {
  for (const m of ["PUT", "DELETE", "PATCH"]) {
    const res = await fetch(`${BASE}/api/crm/${r}`, { method: m });
    if (res.status === 200) fail(`${m} /${r} returned 200 anonymously`);
  }
}
ok("no anonymous PUT/DELETE/PATCH returned 200");

console.log(failures === 0 ? "\nCRM API CHECK: PASS" : `\nCRM API CHECK: ${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);