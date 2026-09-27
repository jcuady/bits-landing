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
  if (!/^\/(app|demo|products|\(products\)|dashboard|pipeline|leads|cpq)(\/|$)/.test(decoded) && decoded !== "/") {
    return fallback;
  }
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
