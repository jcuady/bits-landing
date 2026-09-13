"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CRM_SESSION_COOKIE, encodeSession } from "@/lib/crm/auth";
import { safeAppNext, sessionCookieOptions, clearSessionCookieOptions } from "@/lib/crm/safe-next";
import { forgotPasswordSchema, loginSchema } from "@/lib/crm/validation";

function displayNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "User";
  return (
    local
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim()
      .slice(0, 80) || "BITS User"
  );
}

export async function loginAction(formData: FormData) {
  const next = safeAppNext(String(formData.get("next") ?? "/app/dashboard"));
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path[0] === "password" ? "password" : "email";
    // ponytail: fixed error codes only — never reflect free-text `message` (phishing surface)
    redirect(`/login?error=${field}&next=${encodeURIComponent(next)}`);
  }

  const jar = await cookies();
  jar.set(
    CRM_SESSION_COOKIE,
    encodeSession({
      email: parsed.data.email,
      name: displayNameFromEmail(parsed.data.email),
      signedInAt: new Date().toISOString(),
    }),
    sessionCookieOptions()
  );

  redirect(next);
}

export async function demoLoginAction(formData: FormData) {
  const next = safeAppNext(String(formData.get("next") ?? "/app/dashboard"));
  const jar = await cookies();
  jar.set(
    CRM_SESSION_COOKIE,
    encodeSession({
      email: "malcolm@boundlessitsolutions.com",
      name: "Malcolm Cuady",
      signedInAt: new Date().toISOString(),
    }),
    sessionCookieOptions()
  );
  redirect(next);
}

export async function logoutAction() {
  const jar = await cookies();
  jar.set(CRM_SESSION_COOKIE, "", { ...clearSessionCookieOptions(), maxAge: 0 });
  redirect("/login");
}

export async function forgotPasswordAction(formData: FormData) {
  const parsed = forgotPasswordSchema.safeParse({
    email: String(formData.get("email") ?? ""),
  });
  if (!parsed.success) {
    redirect(`/forgot-password?error=email`);
  }
  // Cap reflected email length in the URL for the simulated success screen.
  const email = parsed.data.email.slice(0, 254);
  redirect(`/forgot-password?sent=1&email=${encodeURIComponent(email)}`);
}
