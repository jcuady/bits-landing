import { z } from "zod";

/**
 * Contact-form validation rules — pure, with no path-alias imports.
 *
 * Extracted from lib/contact.ts so lib/contact.selfcheck.mjs can import the REAL
 * schema instead of a copy of it (SYSTEM_AUDIT.md §31).
 *
 * Why that matters: the previous selfcheck re-declared `contactSchema` and
 * `isHoneypotTripped` inline. Every assertion passed against a frozen duplicate
 * frozen at authoring time, so the gate could not fail for any change to this
 * file. Changing `name` to min(1), or reverting the honeypot to
 * `z.string().max(0)` — the exact P0 regression the gate was written to catch —
 * left it green.
 *
 * Keep this module free of `@/` imports. Node resolves relative specifiers under
 * --experimental-strip-types; it does not resolve the `@/` alias.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(2, "Enter your company name."),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  currentSystem: z.string().optional(),
  primaryChallenge: z.string().optional(),
  preferredMethod: z.string().optional(),
  interest: z.string().optional(),
  termsConsent: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your operational requirements or challenges.")
    .max(2000, "Keep the message under 2000 characters."),
  /**
   * Honeypot. This field is hidden from humans and must stay empty.
   *
   * NOTE: this is intentionally typed as a permissive optional string so that a
   * bot filling it does NOT fail `safeParse` — the caller checks it separately
   * (see `isHoneypotTripped`) and returns a silent success. Previously it was
   * `z.string().max(0)`, which rejected non-empty values during validation and
   * surfaced a confusing field error to the bot instead of silently absorbing
   * the submission.
   *
   * The selfcheck asserts this directly: `website` must remain optional and
   * unconstrained, and a filled honeypot must still parse.
   */
  website: z.string().optional(),
});

/**
 * True when the hidden honeypot field was filled in.
 *
 * Must be evaluated BEFORE `contactSchema.safeParse()` so that automated
 * submitters receive a neutral success response rather than a validation error
 * that reveals the trap.
 */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export type ContactFields = z.infer<typeof contactSchema>;