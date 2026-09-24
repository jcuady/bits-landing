import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  let response = NextResponse.next({ request });

  // Create a Supabase client that can read/write session cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write refreshed session cookies to both the request and the response
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Always use getUser() — not getSession() — for server-side validation
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Guard /app/* routes — redirect unauthenticated users to /login
  if (pathname.startsWith("/app")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      const nextPath = `${pathname}${search}`;
      url.search = "";
      url.searchParams.set(
        "next",
        nextPath.startsWith("/app") ? nextPath.slice(0, 512) : "/app/dashboard"
      );
      return NextResponse.redirect(url);
    }
    return response;
  }

  // Redirect authenticated users away from /login and /forgot-password
  if ((pathname === "/login" || pathname === "/forgot-password") && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/app/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Strip RSC query param from brandbook (static HTML file)
  if (pathname === "/brandbook.html" && request.nextUrl.searchParams.has("_rsc")) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("_rsc");
    return NextResponse.redirect(url, 308);
  }

  return response;
}

export const config = {
  matcher: ["/app/:path*", "/login", "/forgot-password", "/brandbook.html"],
};
