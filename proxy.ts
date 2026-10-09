import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Subdomain-to-Product-ID routing registry
const SUBDOMAIN_PRODUCT_MAP: Record<string, string> = {
  ops: "operations-360",
  operations: "operations-360",
  sales: "crm-sales",
  collections: "operations-360",
  support: "crm-support",
  marketing: "crm-marketing",
  commerce: "crm-commerce",
  accounting: "accounting",
  erp: "accounting",
  payroll: "payroll",
  hrms: "hrms",
  logistics: "logistics",
  inventory: "inventory",
  construction: "construction",
  pickleball: "pickleball",
  sports: "sports-hub",
  booking: "booking",
  queuing: "queuing",
  agent: "bitsagent",
  rag: "rag-engine",
  nfc: "nfc-card",
};

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // 0. Fast-path bypass: never run Supabase auth or edge logic on SEO metadata & static feeds
  if (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/brandbook" ||
    pathname.startsWith("/.well-known") ||
    pathname.endsWith(".xml") ||
    pathname.endsWith(".txt") ||
    pathname.endsWith(".md")
  ) {
    return NextResponse.next();
  }

  // 1. Detect Subdomain (e.g. "sales.boundlessits.com", "sales.localhost:3000")
  let subdomain: string | null = null;
  const cleanHost = host.split(":")[0]; // remove port
  const parts = cleanHost.split(".");

  if (parts.length > 2 && !cleanHost.includes("localhost")) {
    subdomain = parts[0].toLowerCase();
  } else if (cleanHost.includes("localhost") && parts.length > 1) {
    subdomain = parts[0].toLowerCase();
  }

  // Ignore standard non-product subdomains
  if (subdomain === "www" || subdomain === "localhost" || subdomain === "boundlessits") {
    subdomain = null;
  }

  const productId = subdomain ? SUBDOMAIN_PRODUCT_MAP[subdomain] : null;

  // 3. Supabase Auth + Demo Role Cookie Validation
  const response = NextResponse.next({ request });
  const demoRoleCookie = request.cookies.get("bits_demo_role")?.value;

  // Safe fallback to production BITS Supabase project if environment variables are not injected
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jvseyttzlobelrnzmfyf.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c2V5dHR6bG9iZWxybnptZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNTE2OTQsImV4cCI6MjEwNTgyNzY5NH0.DzLLo0sJgzuGmtoqlWSNAwEj_nmh_EKXG4zkYTH0aKI";

  let user = null;
  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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

    const authResult = await supabase.auth.getUser();
    user = authResult?.data?.user ?? null;
  } catch (err) {
    // Graceful offline / uninitialized fallback: never block public marketing routes with 500
    user = null;
  }

  const isAuthenticated = Boolean(user || demoRoleCookie);

  // 4. Subdomain-Specific Routing (e.g. sales.boundlessits.com)
  if (productId) {
    // If user is at /login on the subdomain
    if (pathname === "/login") {
      if (isAuthenticated) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
      return response;
    }

    // Require auth or demo session to access product workspace
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("product", productId);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // Rewrite internally to the product workspace directory (e.g. /crm-sales/pipeline)
    const url = request.nextUrl.clone();
    url.pathname = `/${productId}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // 5. Dual-Path Demo Routing on Main Domain: /demo/:product/:subpath* -> /:product/:subpath*
  if (pathname.startsWith("/demo/")) {
    const demoSegments = pathname.split("/").filter(Boolean); // ['demo', 'crm-sales', 'pipeline']
    const requestedProduct = demoSegments[1];
    if (requestedProduct && SUBDOMAIN_PRODUCT_MAP[requestedProduct] || Object.values(SUBDOMAIN_PRODUCT_MAP).includes(requestedProduct)) {
      const targetProduct = SUBDOMAIN_PRODUCT_MAP[requestedProduct] || requestedProduct;
      const remainingPath = demoSegments.slice(2).join("/");
      const url = request.nextUrl.clone();
      url.pathname = `/${targetProduct}${remainingPath ? `/${remainingPath}` : ""}`;
      return NextResponse.rewrite(url);
    }
  }

  // 6. Traditional Core App Guard (/app/*)
  if (pathname.startsWith("/app")) {
    if (!isAuthenticated) {
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

  // 7. Redirect authenticated users away from /login and /forgot-password on main domain
  if ((pathname === "/login" || pathname === "/forgot-password") && isAuthenticated) {
    const nextParam = request.nextUrl.searchParams.get("next");
    const productParam = request.nextUrl.searchParams.get("product");
    const url = request.nextUrl.clone();
    url.search = "";
    if (productParam && productParam !== "crm-collections") {
      url.pathname = `/demo/${productParam}`;
    } else {
      url.pathname = nextParam && nextParam.startsWith("/app") ? nextParam : "/app/dashboard";
    }
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|llms\\.txt|llms-full\\.txt|index\\.md|bitscrm\\.md|bitsagent\\.md|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|xml|txt|md|webmanifest)$).*)",
  ],
};

export { proxy as middleware };
export default proxy;

