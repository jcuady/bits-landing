import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { PRODUCT_REGISTRY } from "@/lib/products/registry";

// Subdomain-to-Product-ID routing registry.
//
// NOTE: most of these products are roadmap entries with no sandbox route yet.
// They are still listed so the host is recognised, but `resolveProductPath`
// below refuses to rewrite to a path that would 404 — it sends the visitor to
// the CRM workspace instead.
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

/**
 * Products that have a real sandbox route under `app/(products)/<id>`.
 * Anything not listed here has no sandbox — routing to it would 404.
 */
const IMPLEMENTED_PRODUCT_ROUTES = new Set([
  "crm-sales",
  "crm-support",
  "crm-marketing",
  "crm-commerce",
]);

/** OPERATIONS 360 ships as the authenticated CRM workspace at `/app`. */
const WORKSPACE_PRODUCT_IDS = new Set(["operations-360", "crm-collections"]);

/**
 * Resolve a product id to the real path that serves it.
 * Returns `/app` for the workspace products, the `/<product>` sandbox when it
 * exists, and null when the product has no route (caller should not rewrite).
 */
function resolveProductPath(productId: string): string | null {
  if (WORKSPACE_PRODUCT_IDS.has(productId)) return "/app";
  if (IMPLEMENTED_PRODUCT_ROUTES.has(productId)) return `/${productId}`;
  return null;
}

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

  // 3. Supabase Auth Validation
  const response = NextResponse.next({ request });

  // Safe fallback to the public project URL/anon key if environment variables
  // are not injected (see lib/supabase/server.ts for the rationale).
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

  // SECURITY: Authorization is based ONLY on a verified Supabase session.
  //
  // The `bits_demo_role` cookie is intentionally NOT treated as proof of
  // identity. It is written `httpOnly: true` (app/actions/auth.ts), so a visitor
  // cannot forge it from the console, and the role is constrained to the
  // registry's known demo personas. It is still excluded from authorization:
  // it is a marketing-demo persona hint and nothing more.
  const isAuthenticated = Boolean(user);

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
    const base = resolveProductPath(productId);
    if (!base) {
      // Product is a roadmap entry with no sandbox yet — send to the CRM
      // workspace rather than rewriting to a path that would 404.
      const url = request.nextUrl.clone();
      url.pathname = "/app";
      url.search = "";
      return NextResponse.redirect(url);
    }

    const url = request.nextUrl.clone();
    const suffix = pathname === "/" || pathname === `/${productId}` ? "" : pathname;
    url.pathname = `${base}${suffix}`;
    return NextResponse.rewrite(url);
  }

  // 5. Dual-Path Demo Routing on Main Domain: /demo/:product/:subpath* -> /:product/:subpath*
  if (pathname.startsWith("/demo/")) {
    const demoSegments = pathname.split("/").filter(Boolean); // ['demo', 'crm-sales', 'pipeline']
    const requestedProduct = demoSegments[1];

    // Recognise a product by subdomain alias OR by its registry id. Reading the
    // id list from PRODUCT_REGISTRY (rather than repeating it here) is what stops
    // this proxy drifting out of sync with the catalogue again.
    const targetProduct = requestedProduct
      ? SUBDOMAIN_PRODUCT_MAP[requestedProduct] ?? requestedProduct
      : undefined;

    if (targetProduct && PRODUCT_REGISTRY[targetProduct]) {
      const base = resolveProductPath(targetProduct);
      if (base) {
        const remainingPath = demoSegments.slice(2).join("/");
        const url = request.nextUrl.clone();
        url.pathname = `${base}${remainingPath ? `/${remainingPath}` : ""}`;
        return NextResponse.rewrite(url);
      }
      // Recognised roadmap product with no sandbox yet. Falling through would
      // leave the request at `/demo/<id>`, which has no page — i.e. a 404. Send
      // the visitor to the showcase, which lists the engine as "planned".
      const url = request.nextUrl.clone();
      url.pathname = "/demo";
      url.search = "";
      return NextResponse.redirect(url);
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

