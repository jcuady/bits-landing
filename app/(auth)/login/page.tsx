import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { loginAction, roleDemoLoginAction } from "@/app/actions/auth";
import { safeAppNext } from "@/lib/crm/safe-next";
import { getProductById } from "@/lib/products/registry";
import { PRODUCT_COUNT } from "@/lib/site";
import { ShieldCheck, UserCheck, Sparkles, Terminal, ArrowRight, Layers } from "lucide-react";

export const metadata = {
  title: "Sign in to BITS Enterprise",
  robots: { index: false, follow: false },
};

function alertMessage(error?: string) {
  if (error === "email") return "Enter a valid work email.";
  if (error === "password") return "Password must be at least 6 characters.";
  if (error === "invalid") return "Enter a valid work email and a password of at least 6 characters.";
  return null;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; product?: string }>;
}) {
  const params = await searchParams;
  const productConfig = params.product ? getProductById(params.product) : null;

  // Only route to a product sandbox when one is actually implemented.
  // Planned engines have no route, so redirecting to demoPath would 404 —
  // send the operator to the CRM workspace instead.
  const sandboxAvailable = productConfig?.sandboxStatus === "live";
  const defaultNext = sandboxAvailable
    ? productConfig.demoPath.replace("/(products)", "")
    : "/app/dashboard";
  const next = safeAppNext(params.next || defaultNext);
  const alert = alertMessage(params.error);
  const emailInvalid = params.error === "email" || params.error === "invalid";
  const passwordInvalid = params.error === "password" || params.error === "invalid";

  return (
    <main id="content" className="flex min-h-[100dvh] items-center justify-center bg-cloud px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg">
        {/* Header with Context Branding */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 inline-block hover:opacity-90 transition">
            <Logo variant="horizontal" className="h-9" priority />
          </Link>
          
          {productConfig ? (
            <div className="flex flex-col items-center">
              <Badge variant="outline" className="mb-2.5 bg-electric-500/10 text-electric-600 border-electric-500/30 font-semibold px-3 py-1">
                {productConfig.categoryLabel} •{" "}
                {sandboxAvailable ? "Live MVP Sandbox" : "Sandbox In Development"}
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Sign in to {productConfig.name}
              </h1>
              <p className="mt-2 text-sm text-slateblue max-w-md">
                {productConfig.tagline}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Badge variant="outline" className="mb-2.5 bg-navy-50 text-navy-800 border-navy-200 font-semibold px-3 py-1">
                {/*
                 SYSTEM_AUDIT.md §32 — this badge read "Universal Enterprise
                 SSO" and was served to every visitor on the live login page.
                 SSO is not implemented: authentication is Supabase Auth with
                 email + password, and lib/site/security-claims.mjs lists SSO as
                 a banned attestation for exactly that reason. A login page that
                 advertises a capability it does not have is the worst possible
                 place for the claim.
               */}
                Supabase Auth · Email &amp; Password
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Sign in to BITS Platform
              </h1>
              <p className="mt-2 text-sm text-slateblue max-w-md">
                Access your CRM, ERP, HRMS, and enterprise operations workspace.
              </p>
            </div>
          )}
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border border-linelight bg-white p-6 shadow-card sm:p-8">
          {alert ? (
            <p
              id="login-alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-[0.85rem] font-medium text-red-700"
              role="alert"
            >
              {alert}
            </p>
          ) : null}

          {/* 1-Click Role-Based Sandbox Access */}
          <div className="mb-6 rounded-xl border border-electric-500/20 bg-electric-50/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-electric-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-electric-900">
                1-Click Testing & Demo Presets
              </h2>
            </div>
            <p className="text-xs text-slateblue mb-3">
              Instantly explore with pre-seeded enterprise accounts, workflows, and Philippine corporate metrics:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Product-specific roles or Director default */}
              {productConfig && productConfig.testRoles ? (
                productConfig.testRoles.slice(0, 2).map((role) => (
                  <form key={role.id} action={roleDemoLoginAction}>
                    <input type="hidden" name="role" value={role.id} />
                    <input type="hidden" name="next" value={next} />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left border-linelight bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium py-2.5 h-auto"
                    >
                      <UserCheck className="h-3.5 w-3.5 mr-2 text-electric-600 shrink-0" />
                      <div className="truncate">
                        <div className="font-semibold text-ink">{role.label}</div>
                        <div className="text-[10px] text-slateblue truncate">{role.persona}</div>
                      </div>
                    </Button>
                  </form>
                ))
              ) : (
                <>
                  <form action={roleDemoLoginAction}>
                    <input type="hidden" name="role" value="sales_director" />
                    <input type="hidden" name="next" value={next} />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left border-linelight bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium py-2.5 h-auto"
                    >
                      <UserCheck className="h-3.5 w-3.5 mr-2 text-electric-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-ink">Sales Director</div>
                        <div className="text-[10px] text-slateblue">Executive Pipeline</div>
                      </div>
                    </Button>
                  </form>

                  <form action={roleDemoLoginAction}>
                    <input type="hidden" name="role" value="sales_rep" />
                    <input type="hidden" name="next" value={next} />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left border-linelight bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium py-2.5 h-auto"
                    >
                      <UserCheck className="h-3.5 w-3.5 mr-2 text-teal-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-ink">Sales Rep</div>
                        <div className="text-[10px] text-slateblue">Daily Deals & Leads</div>
                      </div>
                    </Button>
                  </form>
                </>
              )}

              {/* Stakeholder Presets */}
              <form action={roleDemoLoginAction}>
                <input type="hidden" name="role" value="po_demo" />
                <input type="hidden" name="next" value={next} />
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left border-linelight bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium py-2.5 h-auto"
                >
                  <ShieldCheck className="h-3.5 w-3.5 mr-2 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-ink">Product Owner</div>
                    <div className="text-[10px] text-slateblue">Showcase & Telemetry</div>
                  </div>
                </Button>
              </form>

              <form action={roleDemoLoginAction}>
                <input type="hidden" name="role" value="dev_admin" />
                <input type="hidden" name="next" value={next} />
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left border-linelight bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium py-2.5 h-auto"
                >
                  <Terminal className="h-3.5 w-3.5 mr-2 text-purple-600 shrink-0" />
                  <div>
                    <div className="font-semibold text-ink">Full-Stack Dev</div>
                    <div className="text-[10px] text-slateblue">Sandbox & Reset</div>
                  </div>
                </Button>
              </form>
            </div>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <span className="w-full border-t border-linelight" />
            <span className="absolute bg-white px-3 text-[0.72rem] font-medium uppercase tracking-wider text-slateblue">
              or sign in with password
            </span>
          </div>

          {/* Standard Authentication Form */}
          <form action={loginAction} className="space-y-4" noValidate>
            <input type="hidden" name="next" value={next} />
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                aria-invalid={emailInvalid || undefined}
                aria-describedby={alert ? "login-alert" : undefined}
                className="h-10 w-full cursor-text rounded-xl border border-linelight bg-white px-3.5 text-sm text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/15 aria-[invalid=true]:border-red-400"
                placeholder="name@enterprise.com"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-ink">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="cursor-pointer text-xs font-medium text-electric-600 hover:text-navy-700"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                maxLength={128}
                aria-invalid={passwordInvalid || undefined}
                aria-describedby={alert ? "login-alert" : undefined}
                className="h-10 w-full cursor-text rounded-xl border border-linelight bg-white px-3.5 text-sm text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/15 aria-[invalid=true]:border-red-400"
              />
            </div>
            <Button type="submit" size="default" className="w-full cursor-pointer h-10 font-medium">
              Sign in with Work Credentials
            </Button>
          </form>
        </div>

        {/* Footer Navigation Links */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center text-xs text-slateblue">
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 font-medium text-electric-600 hover:text-navy-800 transition"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Looking for another engine? View all {PRODUCT_COUNT} BITS product MVPs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/" className="cursor-pointer font-medium text-slateblue hover:text-ink transition">
            Back to main website
          </Link>
        </div>
      </div>
    </main>
  );
}
