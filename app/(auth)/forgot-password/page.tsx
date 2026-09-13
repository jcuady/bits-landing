import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { forgotPasswordAction } from "@/app/actions/auth";
import { emailSchema } from "@/lib/crm/validation";

export const metadata = {
  title: "Forgot password | BITS CRM",
  robots: { index: false, follow: false },
};

function alertMessage(error?: string) {
  if (error === "email" || error === "invalid") return "Enter a valid email address.";
  return null;
}

function safeDisplayEmail(raw?: string) {
  if (!raw) return null;
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return null;
  }
  const parsed = emailSchema.safeParse(decoded);
  return parsed.success ? parsed.data : null;
}

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; email?: string; error?: string }>;
}) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const alert = alertMessage(params.error);
  const displayEmail = safeDisplayEmail(params.email);

  return (
    <main id="content" className="flex min-h-[100dvh] items-center justify-center bg-cloud px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo variant="horizontal" className="h-9" priority />
          <h1 className="mt-6 text-[1.6rem] font-bold tracking-[-0.02em] text-ink">Reset password</h1>
          <p className="mt-2 text-[0.92rem] text-slateblue">
            Simulated flow for this demo. No email is sent.
          </p>
        </div>

        <div className="rounded-2xl border border-linelight bg-white p-6 shadow-card sm:p-8">
          {sent ? (
            <div className="space-y-4 text-center">
              <p className="text-[0.95rem] leading-relaxed text-ink">
                {displayEmail ? (
                  <>
                    If an account exists for <span className="font-semibold">{displayEmail}</span>, a reset
                    link would appear here in production.
                  </>
                ) : (
                  <>If an account exists for that address, a reset link would appear here in production.</>
                )}
              </p>
              <Button asChild variant="secondary" className="w-full cursor-pointer">
                <Link href="/login">Return to sign in</Link>
              </Button>
            </div>
          ) : (
            <form action={forgotPasswordAction} className="space-y-4" noValidate>
              {alert ? (
                <p
                  id="forgot-alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[0.85rem] font-medium text-red-700"
                  role="alert"
                >
                  {alert}
                </p>
              ) : null}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[0.82rem] font-semibold text-ink">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  aria-invalid={Boolean(alert) || undefined}
                  aria-describedby={alert ? "forgot-alert" : undefined}
                  className="h-11 w-full cursor-text rounded-xl border border-linelight bg-white px-3.5 text-[0.92rem] text-ink outline-none transition focus:border-electric-600 focus:ring-4 focus:ring-electric-600/15 aria-[invalid=true]:border-red-400"
                  placeholder="you@company.com"
                />
              </div>
              <Button type="submit" size="lg" className="w-full cursor-pointer">
                Send reset link
              </Button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-[0.82rem] text-slateblue">
          <Link href="/login" className="cursor-pointer font-medium text-electric-600 hover:text-navy-700">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
