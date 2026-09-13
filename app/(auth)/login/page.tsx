import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { demoLoginAction, loginAction } from "@/app/actions/auth";
import { safeAppNext } from "@/lib/crm/safe-next";

export const metadata = {
  title: "Sign in | BITS CRM",
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
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeAppNext(params.next);
  const alert = alertMessage(params.error);
  const emailInvalid = params.error === "email" || params.error === "invalid";
  const passwordInvalid = params.error === "password" || params.error === "invalid";

  return (
    <main id="content" className="flex min-h-[100dvh] items-center justify-center bg-cloud px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo variant="horizontal" className="h-9" priority />
          <h1 className="mt-6 text-[1.6rem] font-bold tracking-[-0.02em] text-ink">Sign in to BITS CRM</h1>
          <p className="mt-2 text-[0.92rem] text-slateblue">Sales, pipeline, and marketing operations.</p>
        </div>

        <div className="rounded-2xl border border-linelight bg-white p-6 shadow-card sm:p-8">
          {alert ? (
            <p
              id="login-alert"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[0.85rem] font-medium text-red-700"
              role="alert"
            >
              {alert}
            </p>
          ) : null}

          <form action={loginAction} className="space-y-4" noValidate>
            <input type="hidden" name="next" value={next} />
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[0.82rem] font-semibold text-ink">
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
                className="h-11 w-full cursor-text rounded-xl border border-linelight bg-white px-3.5 text-[0.92rem] text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/15 aria-[invalid=true]:border-red-400"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-[0.82rem] font-semibold text-ink">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="cursor-pointer text-[0.78rem] font-medium text-electric-600 hover:text-navy-700"
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
                className="h-11 w-full cursor-text rounded-xl border border-linelight bg-white px-3.5 text-[0.92rem] text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/15 aria-[invalid=true]:border-red-400"
              />
            </div>
            <Button type="submit" size="lg" className="w-full cursor-pointer">
              Sign in
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-linelight" />
            <span className="text-[0.72rem] font-medium tracking-wide text-slateblue uppercase">or</span>
            <span className="h-px flex-1 bg-linelight" />
          </div>

          <form action={demoLoginAction}>
            <input type="hidden" name="next" value={next} />
            <Button type="submit" variant="secondary" size="lg" className="w-full cursor-pointer">
              Enter demo
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-[0.82rem] text-slateblue">
          <Link href="/" className="cursor-pointer font-medium text-electric-600 hover:text-navy-700">
            Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
