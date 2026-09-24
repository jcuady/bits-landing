"use server";

import { redirect } from "next/navigation";
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

  const supabase = await createClient();

  // Demo account — try to sign in with the preset credentials.
  // The account must exist in Supabase Auth (seeded separately).
  const { error } = await supabase.auth.signInWithPassword({
    email: "demo@boundlessitsolutions.com",
    password: "BITSdemo2024!",
  });

  if (error) {
    // Fallback: send the user to login with an error so they can try manually
    redirect(`/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
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
