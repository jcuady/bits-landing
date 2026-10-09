/**
 * Live injection test for the contact selfcheck.
 *
 * The previous version of this gate re-declared the schema inline, so it could
 * not fail for any change to the real files. This proves the rewritten version
 * can: each case mutates a REAL source file, asserts a non-zero exit, and
 * restores the file byte-for-byte.
 *
 * Deliberately mutates app/actions/contact.ts and lib/contact-schema.ts rather
 * than feeding the gate strings — a gate that only accepts synthetic input can
 * still be disconnected from the thing it guards.
 *
 * Run: node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/contact-selfcheck-injection-test.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ACTION = join(ROOT, "app", "actions", "contact.ts");
const SCHEMA = join(ROOT, "lib", "contact-schema.ts");

const actionOriginal = readFileSync(ACTION, "utf8");
const schemaOriginal = readFileSync(SCHEMA, "utf8");

function run() {
  try {
    const out = execFileSync(
      "node",
      [
        "--experimental-strip-types",
        "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
        join(ROOT, "lib", "contact.selfcheck.mjs"),
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    );
    return { code: 0, out };
  } catch (e) {
    return { code: e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
}

/** [label, mutate(), restore() */
const CASES = [
  [
    "honeypot ordering inverted in the real action (the P0 regression)",
    () => {
      const src = actionOriginal;
      const honeypot = `  if (isHoneypotTripped(formData.get("website"))) {\n    return { ok: true, errors: {}, values: {} };\n  }\n\n`;
      const parse = `  const parsed = contactSchema.safeParse(raw);`;
      if (!src.includes(honeypot)) throw new Error("honeypot block not found verbatim");
      const stripped = src.replace(honeypot, "");
      writeFileSync(
        ACTION,
        stripped.replace(parse, `${parse}\n${honeypot}`),
        "utf8"
      );
    },
    () => writeFileSync(ACTION, actionOriginal, "utf8"),
  ],
  [
    "honeypot tightened back to z.string().max(0) (the original P0)",
    () => {
      writeFileSync(
        SCHEMA,
        schemaOriginal.replace(
          "website: z.string().optional(),",
          "website: z.string().max(0).optional(),"
        ),
        "utf8"
      );
    },
    () => writeFileSync(SCHEMA, schemaOriginal, "utf8"),
  ],
  [
    "name validation loosened to min(1)",
    () => {
      writeFileSync(
        SCHEMA,
        schemaOriginal.replace(
          'name: z.string().trim().min(2, "Enter your full name."),',
          'name: z.string().trim().min(1, "Enter your full name."),'
        ),
        "utf8"
      );
    },
    () => writeFileSync(SCHEMA, schemaOriginal, "utf8"),
  ],
  [
    "email format check removed",
    () => {
      writeFileSync(
        SCHEMA,
        schemaOriginal.replace(
          'email: z.string().trim().email("Enter a valid work email."),',
          "email: z.string().trim(),"
        ),
        "utf8"
      );
    },
    () => writeFileSync(SCHEMA, schemaOriginal, "utf8"),
  ],
];

let failed = false;

try {
  // Control first: the untouched tree must pass.
  const baseline = run();
  if (baseline.code !== 0) {
    console.log(`FAIL  control: untouched tree should pass but exited ${baseline.code}`);
    failed = true;
  } else {
    console.log("PASS  control: untouched tree passes");
  }

  for (const [label, mutate, restore] of CASES) {
    mutate();
    const { code, out } = run();
    restore();
    const ok = code !== 0;
    if (!ok) failed = true;
    const named = out
      .split("\n")
      .filter((l) => l.includes("✖"))
      .map((l) => l.replace(/^\s*✖\s*/, "").trim())
      .slice(0, 2)
      .join(" | ");
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}  -> exit ${code}${named ? `  [${named}]` : ""}`);
  }
} finally {
  writeFileSync(ACTION, actionOriginal, "utf8");
  writeFileSync(SCHEMA, schemaOriginal, "utf8");
}

const restored =
  readFileSync(ACTION, "utf8") === actionOriginal &&
  readFileSync(SCHEMA, "utf8") === schemaOriginal;
console.log(`${restored ? "PASS" : "FAIL"}  both source files restored byte-for-byte`);
if (!restored) failed = true;

process.exit(failed ? 1 : 0);