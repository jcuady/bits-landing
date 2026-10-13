/**
 * Measures WCAG contrast for the exact token pairs used by the demo/product
 * surfaces, so no contrast value in this project is ever estimated.
 *
 * Run: node lib/security/contrast-check.mjs
 */

function srgb(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function lum([r, g, b]) {
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}
function ratio(fg, bg) {
  const L1 = lum(fg);
  const L2 = lum(bg);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}
const hex = (h) =>
  String(h)
    .replace("#", "")
    .match(/../g)
    .map((x) => parseInt(x, 16));

// Composed colors (bg alpha over white) for translucent surfaces.
const over = (fgHex, alpha, bgHex = "#ffffff") => {
  const f = hex(fgHex);
  const b = hex(bgHex);
  return f.map((c, i) => Math.round(c * alpha + b[i] * (1 - alpha)));
};

const PAIRS = [
  // label, foreground, background, min required
  ["Header sub-label slate-500 on white", "#64748b", "#ffffff", 4.5],
  ["Header sub-label slate-500 on 75% white glass", over("#64748b", 1), "#f7f9fc", 4.5],
  ["Hero eyebrow blue-700 on 80% white pill", "#1d4ed8", "#f8fafc", 4.5],
  ["Hero subhead slate-600 on white", "#475569", "#ffffff", 4.5],
  ["Unselected filter pill slate-600", "#475569", "#ffffff", 4.5],
  ["Selected filter pill white on blue-600", "#ffffff", "#2563eb", 4.5],
  ["'Showing N of 18' slate-500", "#64748b", "#ffffff", 4.5],
  ["Search placeholder slate-500", "#64748b", "#ffffff", 3.0],
  ["Card tagline slate-600", "#475569", "#ffffff", 4.5],
  ["Subdomain chip slate-600 on slate-100", "#475569", "#f1f5f9", 4.5],
  ["Flagship link emerald-700", "#047857", "#ffffff", 4.5],
  ["Pilot link blue-600", "#2563eb", "#ffffff", 4.5],
  ["Arch card body slate-600", "#475569", "#ffffff", 4.5],
  ["Arch card mono slate-900", "#0f172a", "#ffffff", 4.5],
  ["Dashboard KPI emerald-400 on navy-900", "#34d399", "#06162f", 4.5],
  ["Dashboard body sky-200 on navy-900", "#bae6fd", "#06162f", 4.5],
  ["Dashboard muted sky-300/80 on navy-900", over("#7dd3fc", 0.8, "#06162f"), "#06162f", 4.5],
  ["Sidebar label sky-100 on navy-800", "#e0f2fe", "#081f4d", 4.5],
  ["Sidebar active white on blue-600", "#ffffff", "#2563eb", 4.5],
  ["Body text slate-300 on navy-950", "#cbd5e1", "#030d1c", 4.5],
];

let failures = 0;
console.log(
  "ratio  min   verdict  pair"
);
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(Array.isArray(fg) ? fg : hex(fg), Array.isArray(bg) ? bg : hex(bg));
  const pass = r >= min;
  if (!pass) failures++;
  console.log(
    `${r.toFixed(2).padStart(5)}  ${min.toFixed(1)}  ${pass ? "PASS" : "FAIL"}   ${label}`
  );
}

console.log(
  `\n${PAIRS.length - failures}/${PAIRS.length} pairs meet their threshold.`
);
process.exit(failures > 0 ? 1 : 0);