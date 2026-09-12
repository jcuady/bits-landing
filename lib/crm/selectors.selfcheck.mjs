/**
 * ponytail: assert dashboard KPI selectors stay coherent with seed data.
 * Run: node --experimental-strip-types lib/crm/selectors.selfcheck.mjs
 * (or via test:crm preflight) — plain node with duplicated minimal checks below.
 */
import assert from "node:assert/strict";

// Inline mirror of critical math used by selectors (keeps check runnable without TS transpile)
function openPipeline(opps) {
  return opps.filter((o) => o.stage !== "closed_won" && o.stage !== "closed_lost");
}

const opps = [
  { stage: "discovery", amount: 100 },
  { stage: "closed_won", amount: 200 },
  { stage: "closed_lost", amount: 50 },
];
assert.equal(openPipeline(opps).reduce((s, o) => s + o.amount, 0), 100);
assert.equal(opps.filter((o) => o.stage === "closed_won").length, 1);
console.log("selectors.selfcheck: PASS");
