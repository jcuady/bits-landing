/**
 * Secret scan across the FULL git history (SYSTEM_AUDIT.md §39).
 *
 * Why history and not just the tree: `git rm` leaves the blob reachable. The
 * working tree can be clean while every credential ever committed is still
 * retrievable from history by anyone who can fetch the repository.
 *
 * ── WHAT THIS TOOL REFUSES TO DO ───────────────────────────────────────────
 *
 * The first version reported a "CRITICAL Resend API key" in README history. It
 * was a placeholder. Reporting it would have been a confident false claim about
 * a credential that does not exist — the tenth instance of a failure shape this
 * audit has now hit ten times.
 *
 * The second version tried to fix that with entropy, and `entropy-calibration.mjs`
 * measured the result: entropy CANNOT separate a real token from a placeholder.
 *
 *   highest negative entropy : 5.23 bits/char
 *   lowest  positive entropy : 3.55 bits/char
 *   margin                   : -1.69 bits/char
 *
 * A 16-character real key scores BELOW a placeholder. Any threshold that
 * rejects the placeholder also rejects genuine short credentials — a false
 * negative on a critical finding, which is worse than a false positive.
 *
 * So there is no heuristic here. Findings are split by what can be established
 * DETERMINISTICALLY:
 *
 *   CONFIRMED  a real credential hardcoded in source. Proven by construction:
 *              the value is used to authenticate, regardless of how weak it is.
 *   NOT A SECRET  contains a placeholder marker. Deterministic, no statistics.
 *   CANDIDATE  everything else. Reported with what is unknown and exactly how
 *              to settle it. NEVER labelled critical.
 *
 * Values are redacted everywhere. A scanner that prints the secret it found has
 * moved the problem, not solved it.
 *
 * Run: node scripts/history-secret-scan.mjs
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

/* §105 — `BITS_ROOT` lets this run against a SYNTHETIC repository, which is what
 * makes a real negative suite possible instead of a mutated copy of this script.
 * A negative test that edits the thing it is testing is §102's defect shape; a
 * synthetic git repo with its own committed history is a genuine fixture. */
const ROOT = process.env.BITS_ROOT || join(dirname(fileURLToPath(import.meta.url)), "..");

/* Which local env var, if any, a given credential would be compared against.
 * Used only to answer "does this match the LIVE value", which is what separates
 * a historical artifact from an active exposure. Never printed. */
const ENV_FOR = {
  "Resend API key": "RESEND_API_KEY",
  "Supabase SERVICE ROLE key": "SUPABASE_SERVICE_ROLE_KEY",
  "Supabase anon key": "NEXT_PUBLIC_SUPABASE_ANON_KEY",
};

/* `git` always runs INSIDE ROOT. §105: without `-C ROOT` the override above would
 * scan the wrong repository entirely, which is the exact failure a fixture-based
 * negative suite exists to catch — and which would have been invisible, because
 * the scan would still have produced a confident, plausible report. */
const git = (...a) =>
  execFileSync("git", ["-C", ROOT, ...a], { encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });

/**
 * Fingerprint: a stable id for a secret that does not CONTAIN the secret.
 *
 * §105 — this was FNV-1a, 32-bit. Two problems, both specific to this tool:
 *
 *  1. **32 bits is a small space.** With thousands of blobs in history, two
 *     distinct secrets colliding on a fingerprint is not exotic. A fingerprint
 *     that silently conflates two credentials is worse than no fingerprint.
 *  2. **FNV is not a commitment.** Anyone holding this repository can compute
 *     FNV-1a over a guessed key and learn whether that guess matches something
 *     committed. In a tool whose entire purpose is handling secrets, publishing
 *     a cheap verification oracle for them is the wrong trade.
 *
 * SHA-256, first 8 hex chars: 32 bits of OUTPUT, but computed from a
 * preimage-resistant function, so it cannot be brute-forced as an oracle and a
 * collision requires breaking SHA-256 rather than birthday-matching FNV.
 * (Truncation still bounds collision resistance to 32 bits for ADVERSARIAL
 * input; the win is removing the cheap oracle, not claiming 256-bit identity.)
 */
const fingerprint = (t) => createHash("sha256").update(t).digest("hex").slice(0, 8);

const redact = (v) => {
  const t = v.trim();
  const fp = fingerprint(t);
  return t.length <= 12 ? `sha:${fp} (len ${t.length})` : `${t.slice(0, 4)}…${t.slice(-4)} sha:${fp}`;
};

/* ── Deterministic placeholder markers ────────────────────────────────────
 * This is the ONLY filter. It is a word list, and that is a deliberate,
 * acknowledged limitation: it catches placeholders people thought to label and
 * does not pretend to catch the rest. Those become CANDIDATEs.
 *
 * The alternative — a statistical test — was measured and does not work.
 */
const PLACEHOLDER = /(?:^|[^a-z])(your|youre|example|placeholder|sample|dummy|changeme|replace[_-]?me|insert[_-]?here|put[_-]?here|xxx+|<[^>]*>|\$\{[^}]*\}|todo|fixme|abc123|foobar|lorem)/i;

const jwtRole = (v) => {
  try {
    return JSON.parse(Buffer.from(v.split(".")[1], "base64url").toString("utf8")).role;
  } catch {
    return null;
  }
};

const JWT = /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g;

/**
 * `inSource` matters: a credential-shaped string in a .ts/.tsx file is far more
 * likely to be load-bearing than one in a README, and the two deserve different
 * confidence in the report.
 */
const DETECTORS = [
  {
    name: "Supabase SERVICE ROLE key",
    re: JWT,
    extract: (m) => m[0],
    classify: (v) => (jwtRole(v) === "service_role" ? "CONFIRMED" : "not a service_role token"),
    note: "A service_role key bypasses every RLS policy in §29's ground truth.",
  },
  {
    name: "Supabase anon key",
    re: JWT,
    extract: (m) => m[0],
    classify: (v) => (jwtRole(v) === "anon" ? "CANDIDATE" : "not an anon token"),
    note: "Public by design. Listed so its presence in history is a recorded decision, not a surprise.",
  },
  {
    name: "Resend API key",
    re: /\bre_[A-Za-z0-9_-]{20,}\b/g,
    extract: (m) => m[0],
    classify: (v) => (PLACEHOLDER.test(v) ? "NOT A SECRET" : "CANDIDATE"),
    note: "To settle: authenticate it against Resend's API in a throwaway call. Do not paste it anywhere.",
  },
  {
    name: "Stripe LIVE secret",
    re: /\bsk_live_[A-Za-z0-9]{16,}\b/g,
    extract: (m) => m[0],
    classify: (v) => (PLACEHOLDER.test(v) ? "NOT A SECRET" : "CANDIDATE"),
    note: "Rotate immediately if confirmed; it can move money.",
  },
  { name: "AWS access key id", re: /\bAKIA[0-9A-Z]{16}\b/g, extract: (m) => m[0],
    classify: () => "CANDIDATE", note: "A 20-char uppercase+digit token cannot be a word." },
  { name: "Google API key", re: /\bAIza[0-9A-Za-z_-]{35}\b/g, extract: (m) => m[0],
    classify: (v) => (PLACEHOLDER.test(v) ? "NOT A SECRET" : "CANDIDATE"), note: "" },
  { name: "Slack token", re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g, extract: (m) => m[0],
    classify: (v) => (PLACEHOLDER.test(v) ? "NOT A SECRET" : "CANDIDATE"), note: "" },
  { name: "Private key block", re: /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/g,
    extract: (m) => m[0], classify: () => "CONFIRMED", note: "A private key in history is never a placeholder." },
  {
    name: "Demo account password",
    re: /BITSdemo\d{4}!/g,
    extract: (m) => m[0],
    classify: () => "CONFIRMED",
    note: "Real by construction: it authenticates the demo account. See §32 — disabling that account is an owner action.",
  },
  {
    name: "Hardcoded credential literal in source",
    re: /\b(?:password|passwd|pwd|secret|api[_-]?key|service_role_key|auth_token)\b\s*[:=]\s*["'`]([^"'`\n]{8,})["'`]/gi,
    capture: 1,
    extract: (m) => m[1],
    classify: (v) => (PLACEHOLDER.test(v) ? "NOT A SECRET" : "CONFIRMED"),
    note: "A credential assigned in source is load-bearing regardless of how weak it looks.",
  },
];

/* ── 0. Prove the classifier before trusting it ─────────────────────────── */
let selfFail = 0;
const self = (name, cond) => {
  if (!cond) selfFail++;
  console.log(`${cond ? "  ok  " : "  FAIL"}  ${name}`);
};
console.log("Classifier self-test (runs before every scan):");
self("rejects the placeholder that caused the original false positive",
  PLACEHOLDER.test("re_your_api_key_here"));
self("rejects an angle-bracket placeholder", PLACEHOLDER.test("sk_live_<>"));
self("rejects a ${ENV_VAR} reference", PLACEHOLDER.test("re_${RESEND_KEY}"));
self("does NOT reject a wordless random-looking token",
  !PLACEHOLDER.test("re_9Kd2mQx7Lp4Zr8Tv1Wn6Yb3Hc5Jd"));
self("does NOT reject the demo password (confirmed by construction, not by words)",
  !PLACEHOLDER.test("BITSdemo2024!"));
if (selfFail) {
  console.error(`\n✖ classifier failed its own self-test (${selfFail}). Refusing to scan.`);
  process.exit(2);
}

console.log("\nScanning every unique blob in git history…\n");

/* ── Enumerate blobs ─────────────────────────────────────────────────────── */
const TEXT = /\.(md|mdx|tsx?|jsx?|mjs|cjs|json|ya?ml|toml|env|config|txt|css|html|sql|sh|ps1)$/i;
const SOURCE = /\.(tsx?|jsx?|mjs|cjs|js)$/i;

/* §105 — wiring this gate surfaced a crash it had always had.
 *
 * `git rev-list --objects --all` throws when ROOT is not a repository, and the
 * throw was uncaught, so the tool died with a raw ENOENT stack. That is the §98
 * failure at its smallest: an unknown converted into a confident-looking
 * failure with no statement of what was or was not checked.
 *
 * It matters in practice. This gate now runs inside sandboxes that are not
 * repositories, inside shallow clones, and inside distributed copies — all
 * places where "no history to scan" is a real and legitimate state.
 *
 * So: report it, name the condition, and use a DISTINCT exit code (2, matching
 * the classifier self-test refusal) so "I checked nothing" can never be mistaken
 * for "I checked and it is clean" — which is what exit 0 would mean. */
let raw;
try {
  raw = git("rev-list", "--objects", "--all");
} catch (e) {
  console.log("=== SECRET HISTORY SCAN ===\n");
  console.error(`  ✖ NO GIT HISTORY UNDER ${ROOT}`);
  console.error(`    ${String(e.stderr || e.message).split("\n")[0].slice(0, 300)}`);
  console.error(
    "\n  This tool reads COMMIT history, which a shallow clone, an export, or a\n" +
      "  directory that is not a repository does not have. Nothing was scanned,\n" +
      "  so this is NOT a clean result and NOT a finding.\n" +
      "  Exit 2 = refused, so it can never be read as exit 0 = clean.",
  );
  process.exit(2);
}

const blobs = new Map();
for (const line of raw.split("\n")) {
  const sp = line.indexOf(" ");
  if (sp === -1) continue;
  const sha = line.slice(0, sp);
  const path = line.slice(sp + 1);
  if (!TEXT.test(path) || path.startsWith(".git/")) continue;
  if (!blobs.has(sha)) blobs.set(sha, path);
}
console.log(`${blobs.size} text blob(s) across all reachable history.`);

/* ── Read them all in one batch ──────────────────────────────────────────── */
const shas = [...blobs.keys()];
const batch = spawnSync("git", ["-C", ROOT, "cat-file", "--batch"], {
  input: shas.join("\n") + "\n",
  maxBuffer: 512 * 1024 * 1024,
});
if (batch.status !== 0) {
  console.error("git cat-file --batch failed:", batch.stderr?.toString().slice(0, 400));
  process.exit(2);
}

const buf = batch.stdout;
let pos = 0;
const findings = new Map();
let scanned = 0;

for (const sha of shas) {
  const nl = buf.indexOf(0x0a, pos);
  if (nl === -1) break;
  const header = buf.toString("utf8", pos, nl);
  pos = nl + 1;
  const [, type, sizeStr] = header.split(" ");
  const size = Number(sizeStr);
  if (type !== "blob" || !Number.isFinite(size)) {
    pos += size + 1;
    continue;
  }
  const content = buf.toString("utf8", pos, pos + size);
  pos += size + 1;
  scanned++;
  const path = blobs.get(sha);

  for (const det of DETECTORS) {
    const re = new RegExp(det.re.source, det.re.flags);
    for (const m of content.matchAll(re)) {
      const value = det.extract(m);
      if (!value) continue;
      const verdict = det.classify(value);
      if (verdict === "not a service_role token" || verdict === "not an anon token") continue;
      const key = `${det.name}|${redact(value)}`;
      const prev = findings.get(key);
      const where = { path, blob: sha.slice(0, 8), inSource: SOURCE.test(path) };
      if (!prev) findings.set(key, { detector: det.name, verdict, note: det.note, value, sites: [where] });
      else if (!prev.sites.some((s) => s.path === where.path)) prev.sites.push(where);
    }
  }
}

console.log(`${scanned} blob(s) decoded and scanned.\n`);

const results = [...findings.values()];
const by = (v) => results.filter((r) => r.verdict === v);
const confirmed = by("CONFIRMED");
const candidates = by("CANDIDATE");
const notSecret = by("NOT A SECRET");

console.log("SUMMARY");
console.log(`  CONFIRMED (real credential in history) : ${confirmed.length}`);
console.log(`  CANDIDATE (cannot be decided locally)  : ${candidates.length}`);
console.log(`  NOT A SECRET (placeholder)             : ${notSecret.length}\n`);

const show = (r) => {
  console.log(`  [${r.verdict}] ${r.detector}`);
  for (const s of r.sites) console.log(`      ${s.path}${s.inSource ? "  (source)" : ""}  blob ${s.blob}`);
  console.log(`      fingerprint: ${redact(r.value)}`);

  // Folded in from the triage pass: is it still in the working tree, and does
  // it match the live credential? Those two answers decide severity, and
  // keeping them in one tool avoids a second copy of every detector regex
  // drifting away from the first.
  const stillThere = r.sites.filter((s) => {
    try {
      return readFileSync(join(ROOT, s.path), "utf8").includes(r.value);
    } catch {
      return false;
    }
  });
  console.log(
    `      in the WORKING TREE now: ${
      stillThere.length ? `YES — ${stillThere.map((s) => s.path).join(", ")}` : "no"
    }`
  );

  const envKey = ENV_FOR[r.detector];
  if (envKey) {
    let live;
    try {
      const line = readFileSync(join(ROOT, ".env.local"), "utf8")
        .split(/\r?\n/)
        .find((l) => l.startsWith(envKey + "="));
      live = line ? line.slice(envKey.length + 1).trim() : undefined;
    } catch {}
    // Phrased as a fact, not an alarm. Whether a match is alarming is the
    // detector's `note`, not the fact of matching: a Supabase anon key ships to
    // every browser by design, so "matches the live key" there is expected,
    // while the same sentence about a Resend key would be a P0.
    console.log(
      `      vs live ${envKey.padEnd(26)}: ${
        live === undefined
          ? "(not set locally)"
          : live === r.value
            ? "identical to the locally configured value"
            : "differs from the locally configured value"
      }`
    );
  }
  if (r.note) console.log(`      ${r.note}`);
  console.log();
};

if (confirmed.length) console.log("CONFIRMED\n"), confirmed.forEach(show);
if (candidates.length) {
  console.log("CANDIDATE — reported, NOT claimed as exposed\n");
  candidates.forEach(show);
  console.log("  Settling a candidate is a deliberate step, not something this tool\n");
  console.log("  can decide: only the provider can say whether a key is still valid.\n");
}
if (notSecret.length) {
  console.log("NOT A SECRET — listed so the classification is auditable\n");
  notSecret.forEach((r) => {
    console.log(`  ${r.detector}: ${r.sites.map((s) => s.path).join(", ")}  (${redact(r.value)})`);
  });
  console.log();
}

/* ── §105 — KNOWN findings: reported every run, failing on anything NEW ──────
 *
 * This tool exited 1 on every run since it was written, which is why it was never
 * wired: a gate that is red for a reason nobody can action gets ignored, and an
 * ignored gate is not a gate. But "red for a known reason" and "red for a new
 * reason" must not look the same.
 *
 * So the filed findings are declared here BY `detector` **AND** fingerprint, and
 * the exit code becomes: NEW findings fail, KNOWN findings are reported in their
 * own section and do not.
 *
 * ── CORRECTION, caught by the negative suite on its first run ────────────────
 * The first version keyed KNOWN on the DETECTOR NAME ALONE and carried a comment
 * asserting that "a new credential can never match a KNOWN key. The fingerprints
 * are content-derived, so an unrelated key lands in `newFindings` by
 * construction."
 *
 * **That was false, and the assertion was the only thing hiding it.** The
 * fingerprint was computed, printed, and never compared. The negative suite's
 * synthetic Resend token was therefore absorbed into the calibration entry and
 * the gate reported `0 new, 1 known/declared` — exit 0. In a gate whose entire
 * job is noticing a credential nobody declared, that is the worst possible
 * defect: a brand-new key of a known provider, committed anywhere, passing
 * silently.
 *
 * The key is now the PAIR. Two keys with the same detector and different
 * contents are different secrets, and only one of them can be the declared one.
 *
 * The key is content-derived, so editing a calibration fixture makes its entry
 * stop matching — which is correct: the table must be updated deliberately,
 * never drift into describing a credential that is no longer there.
 */
const KNOWN = [
  {
    detector: "Demo account password",
    fingerprint: "7d5c976c",
    expectPresentInTree: true,
    reason:
      "Owner decision, still OPEN (§32). The credential authenticates a publicly reachable demo account in live Supabase; it is load-bearing in app/actions/auth.ts and scripts/seed-supabase.mjs. Disabling the account is the owner's action and cannot be automated here. While it is present, this is expected; once removed, delete this entry and the gate goes green.",
  },
  {
    detector: "Hardcoded credential literal in source",
    fingerprint: "7d5c976c",
    expectPresentInTree: true,
    reason:
      "Same VALUE as the demo password, reached by a second detector. Declared by fingerprint so the pair cannot drift apart: fixing the source removes both, and a new password-shaped literal would NOT match either entry.",
  },
  {
    detector: "Supabase anon key",
    fingerprint: "d7494d6e",
    expectPresentInTree: true,
    reason:
      "Public by design — this key ships to every browser. Listed so its presence in history is a recorded decision rather than a surprise.",
  },
  {
    detector: "Resend API key",
    fingerprint: "c7a92b97",
    expectPresentInTree: true,
    reason:
      "CALIBRATION FIXTURE, not a live key: it is the literal inside this tool's own classifier self-test (`!PLACEHOLDER.test(<token>)`), which must use a wordless token of the right shape to prove the placeholder filter does not over-reject. It differs from the locally configured RESEND_API_KEY. Credential-shaped test data is indistinguishable to any scanner — including third-party push protection — so this is recorded rather than left to look like an accident.",
  },
  {
    detector: "Google API key",
    fingerprint: "6b27ee41",
    expectPresentInTree: true,
    reason:
      "CALIBRATION FIXTURE, not a live key: a POSITIVE sample in scripts/entropy-calibration.mjs, whose whole purpose is to measure the detector threshold against the shapes real providers issue. Same caveat as the Resend entry — shape-identical to a real key by construction.",
  },

  /* ── §105 — the fixtures this gate's OWN tests commit ──────────────────────
   *
   * Found by wiring the gate: `test:unit` copies the tree into a sandbox, and the
   * negative suite commits a synthetic Resend token and a synthetic Stripe key,
   * while the gate probe commits a synthetic Resend token. The gate then reported
   * 3 NEW findings against its own test suite.
   *
   * The tempting response was to stop the scanner looking at `scripts/`. That
   * would be exactly backwards: these are real, committed, credential-SHAPED
   * strings, and a scanner that cannot see the test suite cannot be trusted on
   * the source. They are declared instead, with the reason, so a FOURTH fixture
   * still fails the build.
   *
   * Each is synthetic and provider-invalid by construction — the words are
   * spelled out rather than generated, because a fixture nobody can read is a
   * fixture nobody can audit. */
  {
    detector: "Resend API key",
    fingerprint: "48757375",
    expectPresentInTree: true,
    reason:
      "SYNTHETIC FIXTURE in scripts/history-secret-scan-negative.mjs (`SYNTHETIC_RESEND`), committed into a throwaway git repo so this gate's negative suite has an undeclared credential to find. Reads as a word, so it is obviously not a key.",
  },
  {
    detector: "Stripe LIVE secret",
    fingerprint: "7415d41b",
    expectPresentInTree: true,
    reason:
      "SYNTHETIC FIXTURE in scripts/history-secret-scan-negative.mjs (`SYNTHETIC_STRIPE`), used for the stale-expectation case. Reads as a word; a Stripe live key would move money and this is not one.",
  },

  /* The gate PROBE's token is deliberately NOT declared here.
   *
   * It exists only as an assembled string inside `gate-falsifiability-probe.mjs`,
   * written into a sandbox file at mutation time and committed there. Declaring
   * it would be self-defeating: the mutation would become a known finding and the
   * probe would watch the gate correctly refuse to fail — which is exactly what
   * happened on the first run. An entry here would have "fixed" the failure by
   * disabling the very thing being tested. */
];

/* detector -> fingerprint -> declaration. Two entries may share a value under
 * different detectors (the demo password does), which is why the key is a pair
 * and not the value alone. */
const KNOWN_INDEX = new Map(KNOWN.map((d) => [`${d.detector}|${d.fingerprint}`, d]));

const keyOf = (r) => `${r.detector}|${fingerprint(r.value.trim())}`;

/* The stale-expectation rule below only means anything for the repository this
 * script ships with. Scanning a synthetic tree (a fixture, or another project)
 * legitimately finds none of the declared credentials, and calling that "stale"
 * would make every fixture red for a reason that is not a defect — §100's rule
 * about tests that fail for unrelated causes.
 *
 * Derived from the roots rather than an env flag, so it cannot be switched off
 * to hide a stale expectation in the repository that matters. The negative suite
 * sets BITS_KNOWN_STRICT precisely so this path has a standing witness. */
const HOME_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IS_HOME_REPO = resolve(ROOT) === resolve(HOME_ROOT) || process.env.BITS_KNOWN_STRICT === "1";
const stillInTree = (r) => {
  try {
    return r.sites.some((s) => existsSync(join(ROOT, s.path)) && readFileSync(join(ROOT, s.path), "utf8").includes(r.value));
  } catch {
    return false;
  }
};

const all = [...confirmed, ...candidates];
const known = [];
const newFindings = [];
const staleExpectations = [];

/* §105 — KNOWN describes THIS repository, so it applies only to THIS repository.
 *
 * The first version matched KNOWN everywhere, by `detector|fingerprint`. That was
 * wrong in a way the synthetic-tree tests exposed: a throwaway repository is not
 * this repository, and "the demo password is present in this project" says nothing
 * about a fixture that happens to contain a credential-shaped string.
 *
 * Scanning any OTHER tree is therefore STRICT — every finding is new, nothing is
 * excused — which is also what a caller scanning a different project should get
 * from a tool like this. The cost of being wrong in this direction is a red gate
 * on a fixture; the cost of being wrong in the other direction is a credential
 * passing silently, and §105 found that direction is real. */
for (const r of all) {
  const k = keyOf(r);
  const decl = IS_HOME_REPO ? KNOWN_INDEX.get(k) : undefined;
  if (!decl) {
    newFindings.push(r);
    continue;
  }
  known.push({ r, k, decl });
  /* A declared finding that has STOPPED occurring means the credential was
   * removed. That is good news, and it must not be silent: the expectation has
   * to be retired deliberately, or the gate goes quietly green — looking exactly
   * like a repository where the problem was never there. */
  if (decl.expectPresentInTree && !stillInTree(r)) {
    staleExpectations.push(r);
  }
}

/* A KNOWN key that no longer matches ANY finding means the expectation points at
 * something that is gone — the table is stale, not the repo clean. Detected by
 * key-set difference rather than trusting the loop above. */
const matchedKeys = new Set(known.map(({ k }) => k));
if (IS_HOME_REPO) {
  for (const decl of KNOWN) {
    if (!matchedKeys.has(`${decl.detector}|${decl.fingerprint}`) && decl.expectPresentInTree) {
      staleExpectations.push({
        detector: decl.detector,
        note: `declared KNOWN finding ${decl.fingerprint} did not occur at all`,
      });
    }
  }
}

if (known.length) {
  console.log("KNOWN — DECLARED, reported every run, NOT failing\n");
  for (const { r, decl } of known) {
    console.log(`  [KNOWN] ${r.detector}  fingerprint ${fingerprint(r.value.trim())}`);
    console.log(`      ${decl.reason}\n`);
  }
}

if (staleExpectations.length) {
  console.error("STALE EXPECTATION — a declared credential is no longer present\n");
  for (const s of staleExpectations) {
    console.error(`  ✖ ${s.detector}${s.note ? ` (${s.note})` : ""}`);
  }
  console.error(
    "\n  Good news if this is the demo password: it means the credential was removed.\n" +
      "  Update KNOWN in this script — an expectation that outlives its finding\n" +
      "  is a table that will one day describe a credential that never existed.",
  );
}

if (newFindings.length) {
  console.error(`NEW FINDINGS — not in KNOWN, not failing before, no action filed : ${newFindings.length}\n`);
  for (const r of newFindings) {
    console.error(`  ✖ [${r.verdict}] ${r.detector}  fingerprint ${fingerprint(r.value.trim())}`);
    for (const s of r.sites) console.error(`      ${s.path}${s.inSource ? "  (source)" : ""}  blob ${s.blob}`);
    console.error(`      ${redact(r.value)}\n`);
  }
  console.error("  Settle each one, then add it to KNOWN with a reason if it is expected.\n");
}

const ok = newFindings.length === 0 && staleExpectations.length === 0;
console.log(
  `\n${ok ? "✔" : "✖"} secret history: ${newFindings.length} new, ${known.length} known/declared, ` +
    `${staleExpectations.length} stale expectation(s), over ${scanned} blob(s).`,
);
if (ok) {
  console.log(
    "  The demo credential is STILL COMMITTED — declared, not fixed. See §32/§105:\n" +
      "  disabling that account is an owner action and no gate can do it for you.",
  );
}
process.exit(ok ? 0 : 1);