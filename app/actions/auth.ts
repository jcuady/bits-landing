"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { safeAppNext } from "@/lib/crm/safe-next";
import { loginSchema, forgotPasswordSchema } from "@/lib/crm/validation";

export async function loginAction(formData: FormData) {
  const next = safeAppNext(String(formData.get("next") ?? "/app/dashboard"));

  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? ""),
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

export async function demoLoginAction(formData: FormData) {
  const next = safeAppNext(String(formData.get("next") ?? "/app/dashboard"));

  const cookieStore = await cookies();
  cookieStore.set("bits_demo_role", "demo_user", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: "demo@boundlessitsolutions.com",
    password: "BITSdemo2024!",
  });

  if (error) {
    // If the remote Supabase demo account isn't seeded yet, allow demo role cookie to grant demo access
    redirect(next);
  }

  redirect(next);
}

export async function roleDemoLoginAction(formData: FormData) {
  const role = String(formData.get("role") ?? "sales_director");
  const next = safeAppNext(String(formData.get("next") ?? "/crm-sales"));

  const cookieStore = await cookies();
  cookieStore.set("bits_demo_role", role, {
    httpOnly: false,
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
  const parsed = forgotPasswordSchema.safeParse({
    email: String(formData.get("email") ?? ""),
  });

  if (!parsed.success) {
    redirect(`/forgot-password?error=email`);
  }

  const supabase = await createClient();
  // Send password reset email via Supabase Auth
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3847"}/app/settings?tab=password`,
  });

  const email = parsed.data.email.slice(0, 254);
  redirect(`/forgot-password?sent=1&email=${encodeURIComponent(email)}`);
}
