/**
 * Contrast self-check for BITS theme pairs (WCAG 2.1 relative luminance).
 * Run: node lib/theme-contrast.selfcheck.mjs
 */
function srgbToLin(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function lum(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16);
  const r = srgbToLin((n >> 16) & 255);
  const g = srgbToLin((n >> 8) & 255);
  const b = srgbToLin(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const L1 = lum(fg);
  const L2 = lum(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  // Light
  { mode: "light", role: "body", fg: "#0d1b2a", bg: "#f6f9fc", min: 4.5 },
  { mode: "light", role: "muted", fg: "#40536d", bg: "#f6f9fc", min: 4.5 },
  { mode: "light", role: "body-on-surface", fg: "#0d1b2a", bg: "#ffffff", min: 4.5 },
  { mode: "light", role: "cta-label", fg: "#ffffff", bg: "#0063db", min: 4.5 },
  { mode: "light", role: "overline", fg: "#0063db", bg: "#f6f9fc", min: 3 },
  // Dark
  { mode: "dark", role: "body", fg: "#eef4fb", bg: "#06162f", min: 4.5 },
  { mode: "dark", role: "muted", fg: "#a8bad0", bg: "#06162f", min: 4.5 },
  { mode: "dark", role: "body-on-surface", fg: "#eef4fb", bg: "#0a1f3d", min: 4.5 },
  { mode: "dark", role: "cta-label", fg: "#ffffff", bg: "#0063db", min: 4.5 },
  { mode: "dark", role: "overline", fg: "#2f93ff", bg: "#06162f", min: 3 },
  { mode: "dark", role: "muted-on-surface", fg: "#a8bad0", bg: "#0a1f3d", min: 4.5 },
];

let failed = 0;
for (const p of pairs) {
  const r = ratio(p.fg, p.bg);
  const ok = r + 1e-9 >= p.min;
  const line = `${p.mode}/${p.role}: ${r.toFixed(2)}:1 (need ≥${p.min}) ${p.fg} on ${p.bg}`;
  if (!ok) {
    console.error("FAIL " + line);
    failed++;
  } else {
    console.log("PASS " + line);
  }
}

if (failed) {
  console.error(`theme-contrast.selfcheck: ${failed} failing pair(s)`);
  process.exit(1);
}
console.log("theme-contrast.selfcheck: PASS");
