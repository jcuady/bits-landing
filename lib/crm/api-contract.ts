/**
 * CRM API input/output contract.
 *
 * Pure logic only — no Next.js or Supabase imports — so it can be imported by a
 * plain Node selfcheck. The four CRM API routes under `app/api/crm/*` are
 * `"use server"`-style route handlers, which is precisely why the defects
 * described below survived every earlier pass.
 *
 * WHAT WAS WRONG
 * --------------
 * 1. Input validation was truthiness-only. `if (!body.name)` accepts
 *    `{}`, `[]`, `0` and `"x"` equally, so a POST could write
 *    `"[object Object]"` into `inbound_leads.name`. `email` was never checked
 *    to be an email at all, despite the website contact form using a Zod
 *    schema for exactly these fields.
 * 2. No response caching contract. All four GET handlers returned PII
 *    (names, addresses, message bodies, email recipients and subjects) through
 *    `NextResponse.json(...)` with no cache directives, so a browser or shared
 *    proxy is free to heuristically cache an authenticated response.
 * 3. `envelopeError` maps malformed JSON to 400 rather than letting it surface
 *    as a 500.
 */

import { z } from "zod";

/* -------------------------------------------------------------------------- */
/* Cache contract                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Headers that must accompany EVERY CRM API response.
 *
 * These endpoints are session-authenticated and return personal data, so a
 * cached copy is a copy of somebody's inbox and contact list.
 *
 * VERIFIED ON THE WIRE (8 Oct 2026): `Cache-Control`, `Pragma`, `Expires` and
 * `Vary` all arrive on every /api/crm/* response. Next.js emits its own
 * `vary: rsc, next-router-state-tree, next-router-prefetch, …` as a SEPARATE
 * header alongside ours rather than replacing it, so the session key survives.
 * `no-store, private` remains the primary control; `Vary: Cookie` is the
 * defence in depth that stops any intermediary from serving one session's
 * response to another.
 */
export function noStoreHeaders(): Record<string, string> {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, private, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
    Vary: "Cookie",
  };
}

/* -------------------------------------------------------------------------- */
/* Request-body schemas                                                        */
/* -------------------------------------------------------------------------- */

/** Longest values the DB columns and downstream email templates can hold. */
const MAX_SHORT = 200;
const MAX_MESSAGE = 5000;

/** Optional short string, coerced from a missing/undefined value. */
const optionalShort = (max: number) =>
  z.string().trim().max(max).optional();

export const leadPayloadSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(200),
  email: z.string().trim().email("must be a valid email address").max(320),
  company: z.string().trim().min(1, "company is required").max(MAX_SHORT),
  message: z.string().trim().min(1, "message is required").max(MAX_MESSAGE),
  companySize: optionalShort(MAX_SHORT),
  industry: optionalShort(MAX_SHORT),
  currentSystem: optionalShort(MAX_SHORT),
  primaryChallenge: optionalShort(MAX_SHORT),
  preferredMethod: optionalShort(MAX_SHORT),
  interest: optionalShort(MAX_SHORT),
  source: optionalShort(MAX_SHORT),
});

export const campaignPayloadSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(MAX_SHORT),
  channel: optionalShort(MAX_SHORT),
  subject: z.string().trim().max(500).optional(),
  status: z.enum(["draft", "active", "paused", "completed"]).optional(),
  owner: optionalShort(MAX_SHORT),
  target_audience: optionalShort(MAX_SHORT),
});

export const automationPayloadSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(MAX_SHORT),
  trigger_type: z.string().trim().min(1, "trigger_type is required").max(MAX_SHORT),
  action_type: z.string().trim().min(1, "action_type is required").max(MAX_SHORT),
  description: optionalShort(MAX_SHORT * 4),
  conditions: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(["active", "paused", "draft"]).optional(),
  /** Present only on the update branch. */
  id: z.string().trim().uuid("id must be a uuid").optional(),
});

/** Shape of a request body that could not be parsed as JSON at all. */
export function isUnparseableBody(err: unknown): boolean {
  return err instanceof SyntaxError || (err instanceof TypeError && /json/i.test(err.message));
}

/**
 * Turn a Zod failure into a flat, client-safe field-error map.
 *
 * Only the FIRST message per field is returned so the shape stays small and
 * stable, and no internal detail (paths, types, zod internals) leaks.
 */
export function fieldErrorsOf(error: {
  issues: { path: PropertyKey[]; message: string }[];
}): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}