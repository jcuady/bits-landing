/** Safe post-login path: only same-origin /app routes. */
export function safeAppNext(raw: string | null | undefined): string {
  const fallback = "/app/dashboard";
  if (!raw) return fallback;
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return fallback;
  }
  if (!decoded.startsWith("/")) return fallback;
  if (decoded.startsWith("//")) return fallback;
  if (decoded.includes("://")) return fallback;
  if (decoded.includes("..")) return fallback;
  if (!/^\/app(\/|$)/.test(decoded)) return fallback;
  // Normalize trailing junk but keep query if present under /app
  const pathOnly = decoded.split("?")[0] ?? decoded;
  if (!/^\/app(\/|$)/.test(pathOnly)) return fallback;
  return decoded;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  };
}

export function clearSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  };
}
