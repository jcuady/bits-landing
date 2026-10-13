/**
 * The single HTML escaper in this codebase.
 *
 * §96. There were THREE copies of this function and none of them was tested:
 *
 *   lib/contact.ts              exported,   10 call sites
 *   lib/email/templates.ts      private,    ~32 call sites
 *   scripts/contact-selfcheck.mjs its OWN COPY, wired to nothing
 *
 * The third is the failure shape `lib/contact.selfcheck.mjs` names in its header
 * for §31 — "re-declared the implementation inline… the gate could not fail for
 * ANY edit to" the real code — reproduced on the one function where a silent
 * false negative is an injection. Two copies of a security primitive is one copy
 * plus a copy nobody reads.
 *
 * It lives in its own dependency-free module for a concrete reason: `contact.ts`
 * imports through the Next.js `@/` alias, which plain `node` cannot resolve, so a
 * gate could not import it. That resolution failure is very likely WHY the
 * duplicate was written in the first place. Extracting the primitive removes the
 * obstacle rather than documenting it.
 *
 * WHAT IS AND IS NOT ESCAPED
 * --------------------------
 * `& < >` are the security-relevant set for ELEMENT CONTENT, which is where every
 * current call site uses this. `"` and `'` are escaped as well, which is what
 * makes the function safe if a call site ever moves into an attribute — but that
 * is defence in depth, not a licence: an attribute needs `&#96;` and a URL
 * context needs `encodeURIComponent`, and neither is done here. Callers in an
 * attribute must not rely on this function alone.
 *
 * Verified by `lib/email/templates.selfcheck.mjs` against the real builders, and
 * by `lib/contact.selfcheck.mjs` against the real escaper.
 */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}