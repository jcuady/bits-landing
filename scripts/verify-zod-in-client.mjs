/**
 * Does the browser actually download the zod chunk, and is it really zod?
 *
 * §42's marker search suggested a 392 KB client chunk contained Zod. Zod is a
 * server-side validator and nothing in the client graph imports it, so either the
 * marker matched something else, or something pulls it in. This settles it by
 * asking the two questions that cannot be argued with:
 *
 *   1. Is the chunk requested by the browser at all?
 *   2. Does it contain Zod's own distinctive strings, or not?
 *
 * Run: node scripts/verify-zod-in-client.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { startServer } from "./lib/serve.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHUNK = process.argv[2] || "3qklwc-177ye-.js";
const path = join(ROOT, ".next", "static", "chunks", CHUNK);

let text;
try {
  text = readFileSync(path, "utf8");
} catch {
  console.error(`chunk not found: ${CHUNK} (build output changed?)`);
  process.exit(2);
}

console.log(`\nchunk: ${CHUNK}   raw ${(Buffer.byteLength(text) / 1024).toFixed(1)} KB`);

/* Strings that Zod emits and nothing else plausibly does. */
const ZOD_STRINGS = [
  "invalid_type",
  "too_small",
  "ZodError",
  "ZodIssue",
  "ZodSchema",
  "invalid_union",
  "ZodParsedType",
];
console.log("\nZod-specific strings present in the chunk:");
for (const s of ZOD_STRINGS) {
  const n = text.split(s).length - 1;
  console.log(`  ${n > 0 ? "YES" : " no"}  ${s} (${n} occurrence${n === 1 ? "" : "s"})`);
}

/* What ELSE is in it — a 392 KB chunk is mostly not one library. */
console.log("\nFirst 200 characters of the chunk:");
console.log("  " + text.slice(0, 200).replace(/\s+/g, " "));

/* Is it requested by a real browser? */
const { base: BASE, stop } = await startServer({ label: "zod-check" });
const browser = await chromium.launch({ headless: true, channel: process.env.PW_CHANNEL || "msedge" });
const context = await browser.newContext();
const page = await context.newPage();

const fetched = new Set();
page.on("request", (r) => fetched.add(new URL(r.url()).pathname));

for (const route of ["/", "/login", "/pricing"]) {
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
}

await browser.close();
await stop();

const requested = fetched.has(`/ _next/static/chunks/${CHUNK}`.replace("/ ", "/"));
console.log(`\nRequested by the browser while loading /, /login and /pricing: ${requested ? "YES" : "NO"}`);
console.log(`Total chunk requests across those three pages: ${[...fetched].filter((u) => u.includes("/_next/static/chunks/")).length}`);

if (requested) {
  const bytes = [...fetched]
    .filter((u) => u.includes("/_next/static/chunks/"))
    .reduce((a, u) => a + readFileSync(join(ROOT, ".next", "static", "chunks", u.split("/").pop())).length, 0);
  console.log(`Raw bytes of chunk JS pulled by those pages: ${(bytes / 1024).toFixed(1)} KB`);
}