import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase server clients (session/cookie backed).
 *
 * NOTE ON THE PUBLIC FALLBACKS BELOW: the Supabase project URL and the
 * `anon` key are *public by design* — the anon key ships to every browser via
 * `NEXT_PUBLIC_*` variables, and all real access control happens through Row
 * Level Security. They are kept as a resilience fallback for preview/dev
 * environments. The genuinely secret credential is `SUPABASE_SERVICE_ROLE_KEY`
 * (see `createServiceClient`), which has no fallback and fails closed.
 *
 * Before deploy, verify the Vercel project defines
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY so these
 * fallbacks are never the production source of truth.
 */
const DEFAULT_SUPABASE_URL = "https://jvseyttzlobelrnzmfyf.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c2V5dHR6bG9iZWxybnptZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNTE2OTQsImV4cCI6MjEwNTgyNzY5NH0.DzLLo0sJgzuGmtoqlWSNAwEj_nmh_EKXG4zkYTH0aKI";

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component — cookie mutations are ignored,
          // but the middleware handles refreshing sessions.
        }
      },
    },
  });
}

/**
 * Service-role client — server only, never expose to the browser.
 *
 * SECURITY: This client uses the service-role key, which BYPASSES Row Level
 * Security. Every caller MUST verify the requester's identity first (see
 * `requireCrmUser` in lib/crm/api-auth.ts). Never call this from an
 * unauthenticated code path.
 *
 * The service-role key deliberately has NO fallback. Previously this function
 * silently degraded to the anon key when the env var was missing, which masked
 * a broken deploy and produced confusing RLS errors. It now fails closed.
 */
export async function createServiceClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. Set it in the environment " +
        "before using privileged server operations."
    );
  }

  return createServerClient(url, serviceKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // ignore in RSC
        }
      },
    },
  });
}

