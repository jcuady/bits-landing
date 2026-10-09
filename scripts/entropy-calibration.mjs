/**
 * Calibrate the entropy threshold for "is this a real credential token?".
 *
 * A threshold chosen by feel is a threshold that will eventually exclude a real
 * key. This measures the actual distribution on both sides and reports the
 * margin, so the threshold is chosen from data.
 *
 * Run: node scripts/entropy-calibration.mjs
 */
import { randomBytes } from "node:crypto";

function entropy(s) {
  if (!s.length) return 0;
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  let h = 0;
  for (const n of counts.values()) {
    const p = n / s.length;
    h -= p * Math.log2(p);
  }
  return h;
}
const distinctRatio = (s) => new Set(s).size / s.length;

const B64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const token = (n) => {
  const b = randomBytes(n);
  let s = "";
  for (const x of b) s += B64URL[x % B64URL.length];
  return s;
};

/* NEGATIVES: things that must never be reported. */
const NEGATIVES = [
  ["re_your_api_key_here (the false positive)", "re_your_api_key_here"],
  ["re_example_key_goes_here_now", "re_example_key_goes_here_now"],
  ["re_xxxx-xxxx-xxxx", "re_xxxx-xxxx-xxxx"],
  ["sk_live_xxxxxxxxxxxxxxxx", "sk_live_xxxxxxxxxxxxxxxx"],
  ["re_" + "a".repeat(40), "re_" + "a".repeat(40)],
  ["password123", "password123"],
  ["re_your-resend-api-key", "re_your-resend-api-key"],
  ["AIzaSyD-1234567890abcdefghijklmnopqrstu", "AIzaSyD-1234567890abcdefghijklmnopqrstu"],
];

/* POSITIVES: the shapes real providers issue. */
const POSITIVES = [];
for (const n of [16, 20, 24, 32, 43, 64]) {
  // 20 samples each, so the reported minimum is a real minimum, not one draw.
  const samples = Array.from({ length: 20 }, () => token(n));
  POSITIVES.push([`random base64url, ${n} chars (20 samples)`, samples]);
}
POSITIVES.push(["Supabase JWT, 2 segments + padding (20 samples)",
  Array.from({ length: 20 }, () => token(40) + "." + token(40) + ".x".repeat(43))]);

const stripPrefix = (v) => v.replace(/^[a-z]+[_-]/, "");

console.log("\nNEGATIVES (must be rejected)\n");
let worstNeg = 0;
for (const [label, s] of NEGATIVES) {
  const body = stripPrefix(s);
  const h = entropy(body);
  worstNeg = Math.max(worstNeg, h);
  console.log(`  ${h.toFixed(2)} bits/char  ratio ${distinctRatio(body).toFixed(2)}  ${label}`);
}

console.log("\nPOSITIVES (must be accepted)\n");
const mins = [];
for (const [label, samples] of POSITIVES) {
  const hs = samples.map((s) => entropy(stripPrefix(s)));
  const rs = samples.map((s) => distinctRatio(stripPrefix(s)));
  const minH = Math.min(...hs);
  const minR = Math.min(...rs);
  mins.push({ label, minH, minR });
  console.log(
    `  min ${minH.toFixed(2)} bits/char, min ratio ${minR.toFixed(2)}  ${label}`
  );
}

const minPosH = Math.min(...mins.map((m) => m.minH));
const minPosR = Math.min(...mins.map((m) => m.minR));

console.log(`\nSEPARATION`);
console.log(`  highest negative entropy : ${worstNeg.toFixed(2)} bits/char`);
console.log(`  lowest  positive entropy : ${minPosH.toFixed(2)} bits/char`);
console.log(`  margin                   : ${(minPosH - worstNeg).toFixed(2)} bits/char`);
console.log(`  lowest positive ratio    : ${minPosR.toFixed(2)}`);
console.log(`\n  A threshold of 4.0 sits ${(minPosH - 4).toFixed(2)} above the worst positive`);
console.log(`  and ${(4 - worstNeg).toFixed(2)} below the best negative.`);

if (minPosH <= worstNeg) {
  console.log("\n  ✖ NO SEPARATION — entropy alone cannot separate these classes.");
  console.log("    A character-class or length rule would be needed, and this is the");
  console.log("    point at which a detector should admit it cannot decide.");
  process.exit(1);
}
console.log("\n  ✔ separation exists");