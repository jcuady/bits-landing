import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

const DEFAULT_SUPABASE_URL = "https://jvseyttzlobelrnzmfyf.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c2V5dHR6bG9iZWxybnptZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNTE2OTQsImV4cCI6MjEwNTgyNzY5NH0.DzLLo0sJgzuGmtoqlWSNAwEj_nmh_EKXG4zkYTH0aKI";

/**
 * Refresh the Supabase session inside middleware.
 * Mutates the request/response cookies so the server client
 * always sees a fresh session on the next request.
 */
export async function updateSession(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  try {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    await supabase.auth.getUser();
  } catch {
    // Non-blocking fallback
  }

  return response;
}
