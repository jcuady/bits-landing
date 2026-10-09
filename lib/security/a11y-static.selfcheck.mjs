#!/usr/bin/env node
/**
 * Static accessibility self-check.
 *
 * Two defect classes that only surfaced during manual browser review, turned
 * into permanent gates:
 *
 *   1. Form controls with no programmatic label. A visual `<span>` next to a
 *      `<select>` is not a label — screen readers announce "combo box" with no
 *      name. This caught the contact form's engine picker and all six
 *      pipeline-stage selects on /crm-sales.
 *
 *   2. Heading-level skips. The hero product mockup used <h4> for simulated CRM
 *      records directly under the page <h1>, producing a broken document
 *      outline.
 *
 * This is a deliberately conservative static check — it only inspects JSX
 * literals, so it cannot see labels supplied at runtime. It is a floor, not a
 * ceiling: passing here does not mean the page is accessible.
 *
 * Run: node lib/security/a11y-static.selfcheck.mjs
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const files = [
  ...walk(join(ROOT, "app")),
  ...walk(join(ROOT, "components")),
];

const failures = [];

/**
 * Control tags, matched case-insensitively so that capitalised primitive usages
 * (`<Input>`, `<Textarea>`) are checked too. The previous case-sensitive
 * pattern silently skipped every usage of the shared primitives.
 */
const CONTROL_TAG_RE = /<(input|select|textarea|Input|Textarea|Select)\b/g;

/**
 * Extract a complete JSX open tag, honouring quoted attribute values.
 *
 * A naive `<(select)\b[^>]*>` stops at the first `>`, which is the `=>` inside
 * `onChange={(e) => ...}`. That truncated the tag and hid any `aria-label`
 * written after the handler, so correctly-labelled controls were reported as
 * defects. This scanner walks the tag one character at a time and only treats
 * `>` as the terminator when it is outside a quoted value.
 */
function scanOpenTags(src, tagPattern) {
  const out = [];
  tagPattern.lastIndex = 0;
  let m;
  while ((m = tagPattern.exec(src)) !== null) {
    let i = m.index;
    let quote = null;
    let depth = 0; // brace depth inside expression containers
    for (; i < src.length; i++) {
      const ch = src[i];
      if (quote) {
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        quote = ch;
        continue;
      }
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      else if (ch === ">" && depth === 0) break;
    }
    out.push({ index: m.index, text: src.slice(m.index, i + 1), name: m[1] });
    tagPattern.lastIndex = i + 1;
  }
  return out;
}

/** Extract the tag name from a JSX open tag. */
function tagName(openTag) {
  const m = openTag.match(/^<([A-Za-z][\w.-]*)/);
  return m ? m[1].toLowerCase() : null;
}

function attr(tag, name) {
  // Quoted form: allow backticks too, since template-literal aria-labels are common.
  const quoted = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`));
  if (quoted) return quoted[2];
  // Expression container, matched with brace balancing so nested braces survive.
  const re = new RegExp(`\\b${name}\\s*=\\s*\\{`, "g");
  let m2;
  while ((m2 = re.exec(tag)) !== null) {
    let depth = 1;
    let i = m2.index + m2[0].length;
    for (; i < tag.length && depth > 0; i++) {
      if (tag[i] === "{") depth++;
      else if (tag[i] === "}") depth--;
    }
    return tag.slice(m2.index + m2[0].length, i - 1).trim();
  }
  return null;
}

/**
 * Prop-forwarding form primitives. These render a bare control and spread the
 * caller's props; the accessible name is the CALLER's responsibility, and the
 * real usage sites are checked on their own pages. Flagging the definition
 * would be a false positive by construction.
 */
const PRIMITIVE_COMPONENTS = new Set([
  "components/ui/input.tsx",
  "components/ui/textarea.tsx",
  "components/ui/input-group.tsx",
]);

/**
 * Remove comments before scanning.
 *
 * Prose and commented-out JSX routinely contain tag-like text (`<input>` in a
 * note, an old element left behind in a `/* ... *\/` block). Matching those
 * produces false positives that train people to ignore the gate.
 */
function stripComments(src) {
  // Character-wise so that "//" inside a string literal (e.g. a URL) is safe.
  let out = "";
  let i = 0;
  while (i < src.length) {
    const two = src.slice(i, i + 2);
    if (two === "/*") {
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      out += " ";
      continue;
    }
    if (two === "//") {
      const end = src.indexOf("\n", i);
      i = end === -1 ? src.length : end;
      out += " ";
      continue;
    }
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === quote) { j++; break; }
        // A `//` inside a URL string must not start a comment.
        if (quote !== "`" && src[j] === "\n") break;
        j++;
      }
      out += src.slice(i, j);
      i = j;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

for (const file of files) {
  const rel = file
    .slice(ROOT.length + 1)
    .replace(/\\/g, "/");
  if (PRIMITIVE_COMPONENTS.has(rel)) continue;
  const raw = readFileSync(file, "utf8");
  const src = stripComments(raw);

  // ---- 1. Unlabelled form controls -------------------------------------
  // Collect every label target declared in this file.
  const labelFor = new Set();
  const labelForExpr = [];
  for (const t of scanOpenTags(src, /<label\b/g)) {
    const hf = attr(t.text, "htmlFor");
    if (hf) labelFor.add(hf);
    else if (/htmlFor\s*=\s*\{/.test(t.text)) labelForExpr.push(t.text);
  }

  for (const c of scanOpenTags(src, CONTROL_TAG_RE)) {
    const tag = c.text;
    const name = tagName(tag);
    if (name === "input" && attr(tag, "type") === "hidden") continue;

    const id = attr(tag, "id");
    const ariaLabel = attr(tag, "aria-label");
    const ariaLabelledby = attr(tag, "aria-labelledby");

    if (ariaLabel || ariaLabelledby) continue;
    if (id && labelFor.has(id)) continue;

    // Wrapped in an ancestor <label> (covers sr-only toggles inside a label).
    const before = src.slice(0, c.index);
    const lastOpenLabel = before.lastIndexOf("<label");
    const lastCloseLabel = before.lastIndexOf("</label>");
    if (lastOpenLabel > lastCloseLabel) continue;

    // Label associated by an expression we cannot statically resolve.
    if (id && labelForExpr.length > 0) continue;

    // Presentational: hidden from AT entirely.
    if (/aria-hidden\s*=\s*["']true["']/.test(tag)) continue;
    if (/\btype\s*=\s*["']hidden["']/.test(tag)) continue;

    failures.push(
      `${rel}:${src.slice(0, c.index).split("\n").length}: <${name}${id ? ` id="${id}"` : ""}> has no <label htmlFor>, aria-label or aria-labelledby`
    );
  }

  // ---- NOTE: icon-only buttons are deliberately NOT checked statically -------
  // An attempt was made to flag `<button><Icon/></button>` (the dashboard's
  // per-row email button had no accessible name). Detecting "does this JSX
  // render text" without a JSX parser produced 163 findings of which 6 were
  // real — because a button whose content is `{label}`, `{tier.price}` or any
  // bare expression looks identical to an icon-only button to a regex. A gate
  // with a 96% false-positive rate is worse than no gate, so it was removed.
  //
  // Unnamed buttons are caught by inspecting the RENDERED DOM instead, where
  // the computed accessible name is available.

  // ---- 2. Heading level skips ------------------------------------------
  // Only meaningful within a single component file, where the JSX order is the
  // render order. Skips are reported, not fatal, for nested sub-trees we
  // cannot separate — so this uses the file's own heading sequence.
  const headings = [...src.matchAll(/<(h[1-6])\b/g)].map((m) => ({
    level: Number(m[1][1]),
    at: m.index,
  }));
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].level;
    const cur = headings[i].level;
    if (cur - prev > 1) {
      const line = src.slice(0, headings[i].at).split("\n").length;
      failures.push(
        `${rel}:${line}: heading jumps h${prev} -> h${cur} (skip of ${cur - prev - 1})`
      );
    }
  }
}

if (failures.length > 0) {
  console.error("✖ a11y-static selfcheck FAILED:\n");
  for (const f of failures) console.error(`  - ${f}`);
  console.error(`\n  ${failures.length} issue(s) across ${files.length} files.`);
  process.exit(1);
}

console.log(
  `✔ a11y-static selfcheck passed (${files.length} TSX files: every labelled control has an accessible name, no heading skips)`
);