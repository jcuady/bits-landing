/**
 * API route authentication guard.
 *
 * Any CRM API route that reads or writes privileged data MUST call
 * `requireCrmUser()` before touching Supabase with a privileged client.
 *
 * Security model:
 * - `createServiceClient()` uses the service-role key, which BYPASSES RLS.
 *   Calling it before an auth check exposes the underlying table to anonymous
 *   callers.
 * - This guard resolves the caller's identity through the *anon-key* client
 *   (`auth.getUser()`), which only succeeds for a real, signed-in Supabase user.
 * - Returning the guard means "authenticated". It deliberately does NOT
 *   authorize by role: role enforcement is currently UI-only (see
 *   `roleForEmail` in lib/crm/store.tsx and docs/SECURITY.md). Route-level
 *   role enforcement is tracked as follow-up work.
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { noStoreHeaders } from "@/lib/crm/api-contract";

export type CrmApiUser = {
  id: string;
  email: string | null;
};

/**
 * Resolves the current user or returns a 401 NextResponse.
 *
 * Usage:
 * ```ts
 * const auth = await requireCrmUser();
 * if (auth instanceof NextResponse) return auth; // 401
 * // auth.user is now safe to trust
 * ```
 */
export async function requireCrmUser(): Promise<
  { ok: true; user: CrmApiUser } | NextResponse
> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // The 401 is no-store too. A cached "Unauthorized" would be replayed to a
    // user who has since signed in, which is a confusing and hard-to-diagnose
    // failure mode behind any shared proxy.
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401, headers: noStoreHeaders() }
    );
  }

  return { ok: true, user: { id: user.id, email: user.email ?? null } };
}