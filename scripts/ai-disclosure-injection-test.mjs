/**
 * Live injection test for the ai-disclosure gate.
 *
 * The gate's own self-test proves each RULE fires on a synthetic string. This
 * proves the whole pipeline fires on a real file: append a genuine false claim
 * to a scoped surface, confirm the gate exits non-zero and names it, then
 * restore the file byte-for-byte.
 *
 * Run: node scripts/ai-disclosure-injection-test.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { execFileSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = join(ROOT, "lib", "security-data.ts");

const CANARIES = [
  ['string literal: "SOC 2 Type II Controls"', 'export const CANARY = ["SOC 2 Type II Controls"];'],
  ['bare JSX badge: >Enforced<', 'export const CANARY2 = () => <span>Enforced</span>;'],
  ["negative control: honest denial", 'export const CANARY3 = "There is no WORM storage here.";'],
];

const original = readFileSync(TARGET, "utf8");
const run = () => {
  try {
    execFileSync("node", [join(ROOT, "lib", "site", "ai-disclosure.selfcheck.mjs")], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { code: 0, out: "" };
  } catch (e) {
    return { code: e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
};

let failed = false;

try {
  for (const [label, inject] of CANARIES) {
    writeFileSync(TARGET, `${original}\n${inject}\n`, "utf8");
    const { code, out } = run();
    const shouldFail = !label.startsWith("negative control");
    const ok = shouldFail ? code !== 0 : code === 0;
    if (!ok) failed = true;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ${label}  -> exit ${code}` +
        (shouldFail && out ? `  [${out.split("\n").filter((l) => l.includes("asserts")).map((l) => l.trim()).join(" | ").slice(0, 160)}]` : "")
    );
  }
} finally {
  writeFileSync(TARGET, original, "utf8");
}

const restored = readFileSync(TARGET, "utf8") === original;
console.log(`${restored ? "PASS" : "FAIL"}  target restored byte-for-byte`);
if (!restored) failed = true;

process.exit(failed ? 1 : 0);