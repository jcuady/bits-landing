import assert from "node:assert/strict";

function safeAppNext(raw) {
  const fallback = "/app/dashboard";
  if (!raw) return fallback;
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return fallback;
  }
  if (!decoded.startsWith("/")) return fallback;
  if (decoded.startsWith("//")) return fallback;
  if (decoded.includes("://")) return fallback;
  if (decoded.includes("..")) return fallback;
  if (!/^\/app(\/|$)/.test(decoded)) return fallback;
  const pathOnly = decoded.split("?")[0] ?? decoded;
  if (!/^\/app(\/|$)/.test(pathOnly)) return fallback;
  return decoded;
}

assert.equal(safeAppNext("/app/dashboard"), "/app/dashboard");
assert.equal(safeAppNext("/app/leads/ld-1"), "/app/leads/ld-1");
assert.equal(safeAppNext("/application"), "/app/dashboard");
assert.equal(safeAppNext("//evil.com"), "/app/dashboard");
assert.equal(safeAppNext("https://evil.com"), "/app/dashboard");
assert.equal(safeAppNext("/login"), "/app/dashboard");
assert.equal(safeAppNext(undefined), "/app/dashboard");
assert.equal(safeAppNext("/app/../../evil"), "/app/dashboard");
assert.equal(safeAppNext("/app/%2e%2e/x"), "/app/dashboard");
console.log("safe-next.selfcheck: PASS");
