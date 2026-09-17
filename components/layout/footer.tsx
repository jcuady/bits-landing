import Link from "next/link";
import { footerColumns, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";

function SocialIcon({ d, label }: { d: string; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full bg-white/[0.06] text-white/60 ring-1 ring-white/10 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.12] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
    >
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <Logo variant="reverse" className="h-9" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-mist">
              {site.tagline} A modern collections CRM with built-in dialer, AI agents, and operational reporting.
            </p>

            {/* Newsletter signup */}
            <div className="mt-8">
              <p className="text-[0.8rem] font-semibold uppercase tracking-wider text-signal-300/80">
                Newsletter
              </p>
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-overline text-signal-300/90">{col.title}</h3>
                <ul className="mt-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          href={link.href}
                          className="inline-flex min-h-11 min-w-11 items-center text-[0.9rem] text-white/65 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="inline-flex min-h-11 min-w-11 items-center text-[0.9rem] text-white/65 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-[0.82rem] tracking-[0.14em] text-white/50 uppercase">
              People × Technology × Possibilities
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              <SocialIcon label="LinkedIn" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              <SocialIcon label="Twitter" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              <SocialIcon label="Facebook" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 text-[0.85rem] text-white/55">
            <li>
              <Link
                href="/legal#privacy"
                className="inline-flex min-h-11 min-w-11 items-center transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/legal#terms"
                className="inline-flex min-h-11 min-w-11 items-center transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
              >
                Terms
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                className="inline-flex min-h-11 min-w-11 items-center transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                href="/login"
                className="inline-flex min-h-11 min-w-11 items-center transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
              >
                CRM Sign in
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
