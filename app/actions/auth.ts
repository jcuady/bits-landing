"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CRM_SESSION_COOKIE, encodeSession } from "@/lib/crm/auth";

function displayNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "User";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || "BITS User";
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/app/dashboard");

  if (!email.includes("@") || password.length < 6) {
    redirect(`/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  const jar = await cookies();
  jar.set(CRM_SESSION_COOKIE, encodeSession({
    email,
    name: displayNameFromEmail(email),
    signedInAt: new Date().toISOString(),
  }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(next.startsWith("/app") ? next : "/app/dashboard");
}

export async function demoLoginAction(formData: FormData) {
  const next = String(formData.get("next") ?? "/app/dashboard");
  const jar = await cookies();
  jar.set(CRM_SESSION_COOKIE, encodeSession({
    email: "malcolm@boundlessitsolutions.com",
    name: "Malcolm Cuady",
    signedInAt: new Date().toISOString(),
  }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect(next.startsWith("/app") ? next : "/app/dashboard");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(CRM_SESSION_COOKIE);
  redirect("/login");
}

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email.includes("@")) {
    redirect("/forgot-password?error=invalid");
  }
  redirect(`/forgot-password?sent=1&email=${encodeURIComponent(email)}`);
}
