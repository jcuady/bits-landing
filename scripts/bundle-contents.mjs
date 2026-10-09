/**
 * What is actually in the SHARED, DOWNLOADED client bundle (SYSTEM_AUDIT.md §42).
 *
 * §42 measured every route and found the same shape everywhere: 358-446 KB of
 * JavaScript, including 514 KB total on /login. The page content is a small
 * part of that. This attributes the cost.
 *
 * ── WHY THIS TOOK THREE VERSIONS ───────────────────────────────────────────
 * v1 listed every chunk in `.next/static/chunks` and reported that Zod occupied
 * a 392 KB client chunk. That sounded alarming — Zod is a server-side validator.
 * It was false. The chunk exists, but no browser requests it: nothing in the
 * client graph imports Zod, and `lib/contact.ts` is reached only through a
 * `"use server"` action. Measured directly, the chunk was downloaded by 0 of 3
 * pages.
 *
 * The bug was measuring what was EMITTED instead of what is DOWNLOADED. Turbopack
 * writes chunks it may need; the network only fetches the ones a route references.
 *
 * So this version asks a real browser which chunks it fetched, and attributes
 * markers only within THOSE. Emitted-but-unloaded code costs the visitor nothing.
 *
 * Attribution is by marker search, so it proves PRESENCE within a chunk, not an
 * exact byte cost. Chunk sizes are exact; a library's share of a chunk is not.
 * Both facts are reported separately rather than blended into one number.
 *
 * Run: node scripts/bundle-contents.mjs [route ...]
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { startServer } from "./lib/serve.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHUNK_DIR = join(ROOT, ".next", "static", "chunks");

const ROUTES = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const PAGES = ROUTES.length ? ROUTES : ["/", "/pricing", "/login"];

const LIBS = [
  { name: "react-dom", markers: ["Minified React error #", "onRecoverableError", "react-dom.production"] },
  { name: "next runtime", markers: ["__next_f", "app-bootstrap", "next/dist/client"] },
  { name: "motion (Framer Motion)", markers: ["framerAppearId", "MotionGlobalConfig", "dragElastic"] },
  { name: "gsap + ScrollTrigger", markers: ["ScrollTrigger", "scrubTween", "gsap.core"] },
  { name: "lucide-react icons", markers: ["createLucideIcon", "lucide"] },
  { name: "radix primitives", markers: ["DismissableLayer", "FocusScope", "Presence"] },
  { name: "zod", markers: ["$ZodAsyncError", "ZodError", "invalid_union"] },
  { name: "@supabase/supabase-js", markers: ["GoTrueClient", "PostgrestClient"] },
];

const KB = (n) => (n / 1024).toFixed(1);

const { base: BASE, stop } = await startServer({ label: "bundle-contents" });
const browser = await chromium.launch({ headless: true, channel: process.env.PW_CHANNEL || "msedge" });

/* Per page: the chunks the network actually fetched. */
const perPage = [];
for (const route of PAGES) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const js = [];
  page.on("response", async (res) => {
    const u = res.url();
    if (/\/_next\/static\/chunks\/.*\.js$/.test(u)) {
      try {
        const body = await res.body();
        js.push({ file: u.split("/").pop(), bytes: body.length, text: body.toString("utf8") });
      } catch {}
    }
  });
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(500);
  perPage.push({ route, js });
  await context.close();
}

await browser.close();
await stop();

console.log(`\n=== Chunks actually DOWNLOADED ===\n`);
for (const p of perPage) {
  const total = p.js.reduce((a, j) => a + j.bytes, 0);
  console.log(`  ${p.route.padEnd(16)} ${String(p.js.length).padStart(3)} chunk(s)   ${KB(total).padStart(8)} KB raw`);
}

console.log(`\n=== Libraries present in the DOWNLOADED set ===\n`);
for (const lib of LIBS) {
  const files = new Set();
  let bytes = 0;
  for (const p of perPage) {
    for (const j of p.js) {
      if (lib.markers.some((m) => j.text.includes(m))) {
        files.add(j.file);
        bytes += j.bytes;
      }
    }
  }
  console.log(
    `  ${lib.name.padEnd(26)} ${(files.size ? "present" : "ABSENT ").padEnd(9)} ` +
      `in ${String(files.size).padStart(2)} distinct chunk(s)`
  );
}

/* The shared baseline: chunks fetched by EVERY page measured. */
if (perPage.length > 1) {
  const counts = new Map();
  for (const p of perPage) for (const j of p.js) counts.set(j.file, (counts.get(j.file) || 0) + 1);
  const shared = [...counts.entries()].filter(([, n]) => n === perPage.length);
  const sharedBytes = shared.reduce((a, [f]) => {
    const j = perPage[0].js.find((x) => x.file === f);
    return a + (j ? j.bytes : 0);
  }, 0);
  console.log(`\n=== Shared baseline (fetched by all ${perPage.length} pages) ===\n`);
  console.log(`  ${shared.length} chunk(s), ${KB(sharedBytes)} KB raw`);
  console.log(`  This is the floor: a visitor pays it before any page content renders.\n`);
  for (const [f] of shared) {
    const j = perPage[0].js.find((x) => x.file === f);
    console.log(`    ${KB(j.bytes).padStart(8)} KB  ${f}`);
  }

  console.log(`\n  Libraries inside the shared baseline:`);
  for (const lib of LIBS) {
    const hits = [];
    for (const [f] of shared) {
      const j = perPage[0].js.find((x) => x.file === f);
      if (j && lib.markers.some((m) => j.text.includes(m))) hits.push(f);
    }
    if (hits.length) console.log(`    ${lib.name.padEnd(24)} in ${hits.length} chunk(s)`);
  }
}

console.log(`\nNote: library attribution is a marker search — it proves PRESENCE in a chunk,`);
console.log(`not an exact byte cost, because libraries share chunks. Chunk sizes are exact.`);