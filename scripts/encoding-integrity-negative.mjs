/**
 * Negative test for the encoding-integrity gate.
 *
 * Restores each defect in a real file, asserts the gate goes red, then puts the
 * file back byte-for-byte.
 *
 * The point of this file: a gate that has never been seen to fail is not
 * evidence of anything. §37's predecessor detector was green on a tree that
 * contained 57 destroyed characters, partly because nothing ever showed it what
 * failure looks like.
 *
 * Run: node scripts/encoding-integrity-negative.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GATE = join(ROOT, "lib", "site", "encoding-integrity.selfcheck.mjs");

/* Two depths, so "the walk recurses" is a claim the test can actually make. */
const SHALLOW = join(ROOT, "docs", "TESTING.md");
const DEEP = join(ROOT, "docs", "social", "crm-support-facebook-post-prompt.md");

const originals = new Map();
const snapshot = (p) => {
  if (!originals.has(p)) originals.set(p, readFileSync(p));
  return originals.get(p);
};
const restoreAll = () => {
  for (const [p, buf] of originals) writeFileSync(p, buf);
};

const run = () => {
  try {
    execFileSync("node", [GATE], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { code: 0, out: "" };
  } catch (e) {
    return { code: e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
};

/** Produce real mojibake the way a bad write does, rather than pasting it. */
const corrupt = (text) => {
  const CP = new TextDecoder("windows-1252");
  let out = "";
  for (const b of Buffer.from(text, "utf8")) out += CP.decode(Uint8Array.of(b));
  return Buffer.from(out, "utf8");
};

const withDamage = (target, makeDamage) => () => {
  const base = snapshot(target);
  writeFileSync(target, Buffer.concat([base, makeDamage(), Buffer.from("\n")]));
};

const CASES = [
  [
    "mojibake: an em dash decoded as Windows-1252",
    withDamage(SHALLOW, () => corrupt(" — ")),
  ],
  [
    "mojibake: a 4-byte emoji decoded as Windows-1252",
    withDamage(SHALLOW, () => corrupt("🌱")),
  ],
  [
    "mojibake: an en dash and section sign (the sequence §37's old detector flagged)",
    withDamage(SHALLOW, () => corrupt("–§")),
  ],
  [
    "U+FFFD: a character destroyed at write time",
    withDamage(SHALLOW, () => Buffer.from("a \uFFFD b", "utf8")),
  ],
  [
    "UTF-8 BOM prepended to the file",
    () => {
      const base = snapshot(SHALLOW);
      writeFileSync(SHALLOW, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), base]));
    },
  ],
  [
    "invalid UTF-8 bytes (undecodable, truncated by any re-save)",
    withDamage(SHALLOW, () => Buffer.from([0xff, 0xfe, 0xfd])),
  ],
  [
    "damage two directories deep, proving the walk recurses",
    withDamage(DEEP, () => corrupt("—")),
  ],
];

let failed = false;
try {
  const baseline = run();
  console.log(`${baseline.code === 0 ? "PASS" : "FAIL"}  control: gate passes on the clean tree`);
  if (baseline.code !== 0) failed = true;

  for (const [label, mutate] of CASES) {
    mutate();

    // Prove the mutation landed. A write that silently matched nothing would
    // leave the gate green, and "FAIL - gate did not catch it" would be a lie.
    let mutatedSomething = false;
    for (const p of originals.keys()) {
      if (!readFileSync(p).equals(originals.get(p))) mutatedSomething = true;
    }

    const { code, out } = run();
    restoreAll();

    if (!mutatedSomething) {
      failed = true;
      console.log(`FAIL  ${label}  -> mutation was a no-op, so this proves nothing`);
      continue;
    }

    const ok = code !== 0;
    if (!ok) failed = true;
    const detail = out
      .split("\n")
      .filter((l) => l.includes("encoding damage in"))
      .slice(-1)[0]
      ?.trim();
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}  -> exit ${code}${detail ? `  [${detail}]` : ""}`);
  }
} finally {
  restoreAll();
}

let allRestored = true;
for (const [p, buf] of originals) {
  if (!readFileSync(p).equals(buf)) {
    allRestored = false;
    console.log(`  NOT RESTORED: ${relative(ROOT, p)}`);
  }
}
console.log(`${allRestored ? "PASS" : "FAIL"}  all ${originals.size} target(s) restored byte-for-byte`);
if (!allRestored) failed = true;

console.log(
  failed
    ? "\n✖ the gate did not catch a restored defect"
    : "\n✔ every restored defect was caught"
);
process.exit(failed ? 1 : 0);