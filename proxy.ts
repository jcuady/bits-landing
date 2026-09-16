import { NextResponse, type NextRequest } from "next/server";
import { CRM_SESSION_COOKIE, decodeSession } from "@/lib/crm/auth";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = decodeSession(request.cookies.get(CRM_SESSION_COOKIE)?.value);

  if (pathname.startsWith("/app")) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      const nextPath = `${pathname}${search}`;
      url.search = "";
      url.searchParams.set("next", nextPath.startsWith("/app") ? nextPath.slice(0, 512) : "/app/dashboard");
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if ((pathname === "/login" || pathname === "/forgot-password") && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/app/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/forgot-password"],
};
