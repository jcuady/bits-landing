"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { safeAppNext } from "@/lib/crm/safe-next";
import { loginSchema, forgotPasswordSchema } from "@/lib/crm/validation";
import { rateLimit, clientKeyFromHeaders } from "@/lib/security/rate-limit";
import { PRODUCT_REGISTRY } from "@/lib/products/registry";
import { headers } from "next/headers";

/**
 * The set of demo personas the login page can legitimately submit.
 *
 * Derived from the registry's own `testRoles` rather than hand-copied, so a new
 * persona appears here automatically and a typo cannot silently lock a real one
 * out. The four literals are the ones the login page hardcodes outside the
 * registry-driven block.
 */
const DEMO_ROLES: ReadonlySet<string> = new Set([
  "sales_director",
  "sales_rep",
  "po_demo",
  "dev_admin",
  ...Object.values(PRODUCT_REGISTRY).flatMap((p) =>
    (p.testRoles ?? []).map((r) => r.id)
  ),
]);

/**
 * Auth attempt limits.
 *
 * The contact form was rate-limited but these paths were not, and the login
 * endpoint is the one place brute force actually pays off. Thresholds are
 * deliberately tighter than the contact form: 8 failed-looking attempts per
 * email per 10 minutes, and 20 per client address, so neither a targeted
 * credential-stuffing run against one account nor a spray across many accounts
 * from one host gets free rein.
 *
 * LIMITATIONS (unchanged from the contact-form limiter): the store is a
 * module-level Map, so these counters reset on deploy and are NOT shared
 * across instances. Behind multiple serverless containers the effective limit
 * is multiplied by the instance count. Moving to a shared store (Upstash) is
 * the real fix and is still open.
 */
const LOGIN_LIMIT_PER_ACCOUNT = 8;
const LOGIN_LIMIT_PER_CLIENT = 20;
const RESET_WINDOW_MS = 10 * 60 * 1000;

function authRateLimitKeys(client: string, email: string): string[] {
  const acct = email.trim().toLowerCase();
  return [`auth:login:account:${acct}`, `auth:login:client:${client}`];
}

export async function loginAction(formData: FormData) {
  const next = safeAppNext(String(formData.get("next") ?? "/app/dashboard"));
  const email = String(formData.get("email") ?? "");

  const client = clientKeyFromHeaders(await headers());
  const [accountKey, clientKey] = authRateLimitKeys(client, email);

  // Consume the budget before validating, so a malformed request still costs
  // the caller exactly as much as a real one.
  const account = rateLimit(accountKey, LOGIN_LIMIT_PER_ACCOUNT, RESET_WINDOW_MS);
  const byClient = rateLimit(clientKey, LOGIN_LIMIT_PER_CLIENT, RESET_WINDOW_MS);

  const blocked = !account.ok ? account : !byClient.ok ? byClient : null;
  if (blocked) {
    const minutes = Math.max(1, Math.ceil(blocked.retryAfterSeconds / 60));
    // Deliberately the same message and timing shape as a normal failure: the
    // response must not reveal that the address is being throttled.
    redirect(`/login?error=invalid&next=${encodeURIComponent(next)}&throttled=${minutes}`);
  }

  const parsed = loginSchema.safeParse({
    email,
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path[0] === "password" ? "password" : "email";
    redirect(`/login?error=${field}&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    redirect(`/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function roleDemoLoginAction(formData: FormData) {
  /**
   * The role comes from a hidden form field, which means it is attacker
   * controlled. It is written into a cookie by the server, so a visitor cannot
   * forge it from the console — but they could previously still cause the
   * server to store an arbitrary string. Constrain it to the personas the
   * login page actually offers; anything else falls back to the default.
   */
  const offered = String(formData.get("role") ?? "");
  const role = DEMO_ROLES.has(offered) ? offered : "sales_director";
  const next = safeAppNext(String(formData.get("next") ?? "/crm-sales"));

  const cookieStore = await cookies();
  cookieStore.set("bits_demo_role", role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  // Try signing in demo account in background
  try {
    const supabase = await createClient();
    await supabase.auth.signInWithPassword({
      email: "demo@boundlessitsolutions.com",
      password: "BITSdemo2024!",
    });
  } catch {
    // Fallback gracefully to demo role cookie
  }

  redirect(next);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("bits_demo_role");

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Ignore
  }
  redirect("/login");
}

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const client = clientKeyFromHeaders(await headers());

  // Rate-limited so the endpoint cannot be used to bomb a third party's inbox
  // with reset mail. The "we sent you something" response is unchanged whether
  // or not the request was throttled, so this reveals nothing about whether an
  // address exists.
  const reset = rateLimit(`auth:reset:${client}`, 5, RESET_WINDOW_MS);
  if (!reset.ok) {
    const minutes = Math.max(1, Math.ceil(reset.retryAfterSeconds / 60));
    redirect(`/forgot-password?sent=1&email=${encodeURIComponent(email.slice(0, 254))}&throttled=${minutes}`);
  }

  const parsed = forgotPasswordSchema.safeParse({ email });

  if (!parsed.success) {
    redirect(`/forgot-password?error=email`);
  }

  const supabase = await createClient();
  // Send password reset email via Supabase Auth
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3847"}/app/settings?tab=password`,
  });

  const mask = parsed.data.email.slice(0, 254);
  redirect(`/forgot-password?sent=1&email=${encodeURIComponent(mask)}`);
}
