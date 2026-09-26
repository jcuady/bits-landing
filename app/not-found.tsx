import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowLeft, Home, Compass, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Boundless IT Solutions (BITS)",
  description: "The requested enterprise resource could not be found. Return to Boundless IT Solutions homepage or explore our core software engines.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(37,99,235,0.15),transparent)]" aria-hidden />

      <Container className="relative z-10 max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-6">
          <span>Error 404</span>
          <span className="size-1 rounded-full bg-blue-400" />
          <span>Resource Not Located</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
          The page or system endpoint you requested may have moved, been consolidated, or requires authenticated enterprise access.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20"
          >
            <Home className="size-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/bitscrm"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-900/80 hover:bg-slate-800 text-slate-200 px-5 py-3 font-semibold text-sm transition-colors"
          >
            <Compass className="size-4" />
            <span>Explore BITScrm Core</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">Flagships</span>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li><Link href="/bitscrm" className="hover:text-blue-400 transition-colors">BITScrm</Link></li>
              <li><Link href="/bitsagent" className="hover:text-blue-400 transition-colors">BITSagent</Link></li>
            </ul>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">Enterprise</span>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li><Link href="/products/sales" className="hover:text-blue-400 transition-colors">Sales CRM</Link></li>
              <li><Link href="/products/accounting" className="hover:text-blue-400 transition-colors">Accounting ERP</Link></li>
            </ul>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">Workforce</span>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li><Link href="/products/hrms" className="hover:text-blue-400 transition-colors">HRMS & Payroll</Link></li>
              <li><Link href="/products/support" className="hover:text-blue-400 transition-colors">Support Helpdesk</Link></li>
            </ul>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2">Governance</span>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li><Link href="/legal" className="hover:text-blue-400 transition-colors">Legal & Privacy</Link></li>
              <li><Link href="/brandbook" className="hover:text-blue-400 transition-colors">Brand Assets</Link></li>
            </ul>
          </div>
        </div>
      </Container>
    </main>
  );
}
