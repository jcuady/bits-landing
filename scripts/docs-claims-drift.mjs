/**
 * SYSTEM_AUDIT.md §71 — DOC CLAIMS DRIFT.
 *
 * WHY THIS EXISTS
 * ---------------
 * Four documents were corrected this pass and all four were wrong in the same
 * way: a **measured number** that had gone stale.
 *
 *   docs/TESTING.md   "All nineteen … run in CI"   → 26 gates, and no CI exists
 *   docs/TESTING.md   "10 surfaces / 1,938 / 13"   → 21 / 4,441 / 15
 *   docs/README.md    "all 18 engines"             → 19
 *   MARKETING_PRODUCT_GUIDE.md "145 mentions … 25 files" → 38 / 20 in code
 *
 * None of these were found by reading. Each was found by a sweep that happened
 * to look. Correcting them fixes four lines and leaves the mechanism untouched,
 * so §72 will find the next four. **A correction applied to one document is not
 * a correction applied to the fact** — and here the fact is a moving number.
 *
 * WHAT IS ASSERTED
 * ----------------
 * Every markdown file, EXCEPT the audit record itself, must state the measured
 * value for any quantity it quotes. Values are DERIVED from the code — nothing
 * is typed in. A doc that says "13 banned attestations" while the code has 15
 * fails, naming the file, the line, the number it printed and the real one.
 *
 * THE EXEMPTION, AND WHY IT IS NOT A HOLE
 * ----------------------------------------
 * `docs/SYSTEM_AUDIT.md` is exempt. It is a chronological record in which "up
 * from 3,974" is the entire point; a drift gate would fire on nearly every
 * section and be turned off within a day. §44 measured that a prose rule which
 * cannot separate a live claim from a historical one has zero separation, and
 * this check is the successor to that lesson — the scope is narrowed on purpose
 * and the exclusion is declared in one place rather than smuggled into a regex.
 *
 * `docs/social/` and `docs/ads/` are publication copy and are checked too; they
 * are not exempt.
 *
 * REPORT-ONLY on the WebRTC-mention counter. It is a useful smell, but a
 * document may legitimately quote a count it measured under a different scope,
 * and there is no separation between "quoting today's number" and "quoting a
 * number from last week". It is printed so a human can judge.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { SECURITY_SURFACES, CHECKS, stringsFor, affirmativeClaims, isNonCopyLiteral, stripComments } from "../lib/site/security-claims.mjs";

const ROOT = process.cwd();

/* ── Live values, derived ─────────────────────────────────────────────────── */

function gatedStringCount() {
  let n = 0;
  for (const s of SECURITY_SURFACES) {
    const p = join(ROOT, s.file);
    if (!existsSync(p) || !statSync(p).isFile()) continue;
    const src = readFileSync(p, "utf8");
    // For a partially-gated file only the named exports are in scope — the same
    // rule the runner uses, so this cannot disagree with it.
    const text = s.exports
      ? s.exports
          .map((e) => {
            const start = src.search(new RegExp(`^export const ${e}\\b`, "m"));
            if (start === -1) return "";
            const rest = src.slice(start);
            const end = rest.search(/^\]( as const)?;\s*$/m);
            return end === -1 ? rest : rest.slice(0, end + 1);
          })
          .join("\n")
      : src;
    /* §87 — skip Tailwind class literals, exactly as ai-disclosure now does.
     * Two gates deriving one named quantity differently is a defect waiting to
     * be quoted (§82), and both of these print a line called "visible strings".
     * They must count the same set or the documentation cannot be trusted. */
    n += stringsFor(s.file, text).filter(
      (v) => v.kind !== "class" && !isNonCopyLiteral(stripComments(text), v.index, v.value),
    ).length;
  }
  return n;
}

function gateCount() {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  return (pkg.scripts["test:unit"].match(/[^ ]*\.mjs/g) || []).length;
}

function engineCount() {
  const src = readFileSync(join(ROOT, "lib/products/registry.ts"), "utf8");
  const start = src.indexOf("export const PRODUCT_REGISTRY");
  if (start === -1) return null;
  const region = src.slice(start);
  return (region.match(/^ {2}"[a-z0-9-]+":\s*\{/gm) || []).length;
}

/**
 * The SECOND engine count, and why it exists.
 *
 * There are two product catalogues and they are not the same size:
 *   • `PRODUCT_REGISTRY` (lib/products/registry.ts) — 19 engines, the registry
 *     that `/demo` filters and renders.
 *   • `bitsProducts` (lib/site.ts) — 18 products, the marketing catalogue that
 *     `/products` renders.
 * They overlap but are not nested: `crm-sales`, `operations-360`,
 * `crm-collections`, `crm-support`, `crm-marketing`, `crm-commerce` and
 * `bitsagent` are in the registry and not in `bitsProducts`.
 *
 * So "18 engines" is CORRECT in any document describing `/products`, and wrong
 * in one describing `/demo`. A check that asserted a single number would have
 * failed four correct sentences — which is §44's outcome exactly: a heuristic
 * that cannot separate the classes produces noise, and noise gets the gate
 * switched off. The rule therefore accepts EITHER count and fails only when a
 * document states a number that is neither.
 */
function marketingProductCount() {
  const src = readFileSync(join(ROOT, "lib/site.ts"), "utf8");
  const start = src.indexOf("export const bitsProducts");
  if (start === -1) return null;
  const end = src.slice(start).search(/^\]( as const)?;\s*$/m);
  const region = end === -1 ? src.slice(start) : src.slice(start, start + end + 1);
  return (region.match(/^\s{4}id:\s*"[a-z0-9-]+"/gm) || []).length;
}

/** Does any CI configuration exist at all? */
function ciExists() {
  return [".github/workflows", ".gitlab-ci.yml", ".circleci", "azure-pipelines.yml", "Jenkinsfile", ".drone.yml"]
    .filter((p) => existsSync(join(ROOT, p)))
    .map((p) => p);
}

const MARKETING_PRODUCTS = marketingProductCount();

const LIVE = {
  "security surfaces": SECURITY_SURFACES.length,
  "visible strings": gatedStringCount(),
  "banned attestations": CHECKS.length,
  "unit selfchecks": gateCount(),
  "registry engines (/demo)": engineCount(),
  "marketing products (/products)": MARKETING_PRODUCTS,
};

const ci = ciExists();

/* ── Corpus ───────────────────────────────────────────────────────────────── */

const EXEMPT = new Set(["docs/SYSTEM_AUDIT.md"]);

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".next") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith(".md")) acc.push(full);
  }
  return acc;
}

const files = [
  ...(existsSync(join(ROOT, "docs")) ? walk(join(ROOT, "docs")) : []),
  ...readdirSync(ROOT).filter((f) => f.endsWith(".md")).map((f) => join(ROOT, f)),
]
  .map((p) => relative(ROOT, p).replace(/\\/g, "/"))
  .filter((p) => !EXEMPT.has(p));

/* ── Rules ────────────────────────────────────────────────────────────────── */
/* Each rule names the live quantity and matches prose that asserts it.
 * The vocabulary is the DOCUMENT's, not the code's — a doc says "21 security
 * surfaces", so the pattern has to accept that phrasing. Anything looser starts
 * matching historical sentences, which §44 showed cannot be separated. */

const RULES = [
  // Every numeric capture accepts a thousands separator. §77 found the rule that
  // did NOT: "1,234 security surfaces" was matched as "234" and reported as a
  // confidently wrong figure. A gate that misreads the number it is checking is
  // worse than one that cannot parse it, because its output looks authoritative.
  { id: "security surfaces", re: /\b(\d[\d,]*)\s+security\s+surfaces?\b/gi, expect: LIVE["security surfaces"] },
  { id: "visible strings", re: /\b(\d[\d,]*)\s+visible\s+strings?\b/gi, expect: LIVE["visible strings"] },
  { id: "banned attestations", re: /\b(\d[\d,]*)\s+banned\s+attestations\b/gi, expect: LIVE["banned attestations"] },
  // The word-form must tolerate markdown emphasis: TESTING.md wrote
  // "All **twenty-six** are dependency-free", and a pattern that stops at the
  // asterisks silently stops matching the very sentence it was written for.
  { id: "unit selfchecks", re: /\b(?:all\s+)?(\d[\d,]*)\s+(?:are\s+)?unit\s+selfchecks?\b|\ball\s+\**\s*([\w-]+?)\s*\**\s+are\s+dependency-free\b/gi, expect: LIVE["unit selfchecks"] },
  // Accepts either catalogue — see `marketingProductCount` for why a single
  // expected value would produce four false failures.
  { id: "engines", re: /\ball\s+(\d[\d,]*)\s+engines\b|\b(\d[\d,]*)\s+engines\s+in\s+`lib\/products\/registry\.ts`|\b(\d[\d,]*)[\s-]Engine\b/gi, accept: [LIVE["registry engines (/demo)"], LIVE["marketing products (/products)"]] },
];

/* Number words, COMPOSED rather than listed.
 *
 * §77 added this as a hand-typed map running `twelve … thirty-nine, forty`.
 * That map has a silent ceiling: it is correct on every count up to forty and
 * wrong on every count above it, and nothing says so. §95 wired six checks that
 * already existed but were never run, taking `test:unit` to 42 entries; TESTING.md
 * wrote "forty-two"; this gate reported `UNREADABLE, says "forty-two"` — which is
 * the gate behaving exactly as §77 designed, refusing to pass a number it cannot
 * read. The vocabulary was the defect, not the document.
 *
 * §88's rule applies to a table of words the same way it applies to a hand-typed
 * count: derive it, and it cannot fall behind the thing it measures. English
 * numbers are compositional — tens, units, "hundred" — so this composes them. An
 * unrecognised word still returns null and is still reported as UNREADABLE,
 * because "I could not read this claim" and "this claim is correct" must stay
 * different answers. */
const UNIT_WORDS = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
};
const TENS_WORDS = {
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};

/**
 * "forty-two" -> 42, "thirty-five" -> 35, "one hundred and six" -> 106.
 * Returns null for anything containing a word that is not a number word — the
 * signal §77 needs in order to say UNREADABLE instead of guessing.
 */
function parseNumberWords(text) {
  if (typeof text !== "string") return null;
  const words = text.toLowerCase().split(/[\s-]+/).filter((w) => w && w !== "and");
  if (!words.length) return null;
  let total = 0;
  let sawNumber = false;
  for (const w of words) {
    if (w === "hundred") {
      total = (total || 1) * 100;
      sawNumber = true;
    } else if (UNIT_WORDS[w] != null) {
      total += UNIT_WORDS[w];
      sawNumber = true;
    } else if (TENS_WORDS[w] != null) {
      total += TENS_WORDS[w];
      sawNumber = true;
    } else {
      return null;
    }
  }
  return sawNumber ? total : null;
}

const failures = [];
const webRTCNotes = [];

for (const file of files) {
  const lines = readFileSync(join(ROOT, file), "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    // Strip fenced code and blockquote correction banners: SYSTEM_AUDIT's own
    // markers are quoted inside docs, and a quoted historical value is not a
    // live claim.
    if (/^\s*```/.test(line)) return;

    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line)) !== null) {
        const raw = m[1] ?? m[2] ?? m[3];
        /* §77 — a matched number that cannot be parsed used to be skipped
         * silently, which is the worst possible failure for this gate: the
         * regex proved the sentence was in scope, the parser then threw the
         * evidence away, and the doc printed a stale figure forever. TESTING.md
         * wrote "6,865 visible strings" and the rule that exists for exactly
         * that sentence matched it and ignored it.
         *
         * Thousands separators are the only gap that mattered — the "visible
         * strings" rule already accepts `\d[\d,]*` in its pattern, so the two
         * halves disagreed about what a number looks like. Normalise before
         * testing, and never let an unparseable match pass as a pass: it is
         * reported instead, because "I could not read this claim" and "this
         * claim is correct" are different answers. */
        const bare = typeof raw === "string" ? raw.replace(/,/g, "") : raw;
        const said = /^\d+$/.test(bare ?? "") ? Number(bare) : parseNumberWords(raw);
        if (said == null) {
          failures.push({
            file, line: i + 1, id: `${rule.id} (UNREADABLE)`, said: `"${raw}"`,
            expect: String(rule.accept ? rule.accept.join(" or ") : rule.expect),
            text: line.trim().slice(0, 150),
          });
          continue;
        }
        const accept = rule.accept ?? (rule.expect == null ? null : [rule.expect]);
        if (accept == null) continue;
        if (accept.includes(said)) continue;
        failures.push({
          file, line: i + 1, id: rule.id, said,
          expect: accept.length === 1 ? String(accept[0]) : `${accept.join(" or ")}`,
          text: line.trim().slice(0, 150),
        });
      }
    }

    // `/demo` renders the REGISTRY; `/products` renders bitsProducts. A
    // document that points at `/demo` and quotes the other count is decidable,
    // so it is a failure rather than a report — this is the one place the two
    // catalogues can be told apart by context instead of guessed at.
    if (/\/demo\b/.test(line)) {
      const r = /\ball\s+(\d[\d,]*)\s+engines\b/gi;
      let m;
      while ((m = r.exec(line)) !== null) {
        const said = Number(m[1].replace(/,/g, ""));
        if (said !== LIVE["registry engines (/demo)"]) {
          failures.push({
            file, line: i + 1, id: "engines (/demo)", said,
            expect: String(LIVE["registry engines (/demo)"]),
            text: line.trim().slice(0, 150),
          });
        }
      }
    }

    // CI existence is a boolean claim and is decidable outright. It reuses
    // `affirmativeClaims` so the denial vocabulary is the SAME tested one the
    // main gate uses — writing a second, looser notion of "denial" here is how
    // a document ends up passing a check that a different document fails.
    if (ci.length === 0) {
      for (const claim of affirmativeClaims(line, /\brun\s+in\s+CI\b|\bruns\s+in\s+CI\b|\bin\s+CI\b/i)) {
        failures.push({ file, line: i + 1, id: "CI exists", said: "asserts a CI run", expect: "no CI config in repo", text: claim.slice(0, 150) });
      }
    }
  });

  const webrtc = (readFileSync(join(ROOT, file), "utf8").match(/WebRTC/gi) || []).length;
  if (webrtc) webRTCNotes.push({ file, webrtc });
}

console.log("=== DOC CLAIMS DRIFT ===\n");
console.log("  Live values, derived from code:");
for (const [k, v] of Object.entries(LIVE)) console.log(`    ${String(k).padEnd(22)} ${v}`);
console.log(`    ${"CI configs present".padEnd(22)} ${ci.length ? ci.join(", ") : "NONE — .github, .gitlab-ci.yml, .circleci, azure-pipelines.yml, Jenkinsfile, .drone.yml all absent"}`);
console.log(`\n  Scanned ${files.length} markdown file(s); exempt: ${[...EXEMPT].join(", ")}\n`);

if (webRTCNotes.length) {
  console.log("  REPORT ONLY — files still mentioning WebRTC (a human should judge each):");
  for (const w of webRTCNotes.sort((a, b) => b.webrtc - a.webrtc).slice(0, 12)) console.log(`    ${String(w.webrtc).padStart(3)}  ${w.file}`);
  console.log("");
}

if (failures.length) {
  console.log(`  ${failures.length} STALE CLAIM(S):\n`);
  for (const f of failures) {
    console.log(`  ✖ ${f.file}:${f.line}  [${f.id}] says ${f.said}, measured ${f.expect}`);
    console.log(`      "${f.text}"`);
  }
  console.log("\n✖ docs-claims-drift FAILED");
  process.exit(1);
}

console.log("✔ every measured quantity quoted in documentation matches the code.");