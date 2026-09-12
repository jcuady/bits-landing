import Link from "next/link";
import { footerColumns, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <Logo variant="reverse" className="h-9" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-mist">
              {site.tagline} Secure, scalable systems for organizations ready to operate smarter.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-overline text-signal-300/90">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link
                          href={link.href}
                          className="text-[0.9rem] text-white/65 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-[0.9rem] text-white/65 transition-colors hover:text-white"
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
          <p className="text-[0.82rem] tracking-[0.14em] text-white/50 uppercase">
            People × Technology × Possibilities
          </p>
          <ul className="flex items-center gap-6 text-[0.85rem] text-white/55">
            <li>
              <Link href="/legal#privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/legal#terms" className="transition-colors hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <Link href="/login" className="transition-colors hover:text-white">
                CRM Sign in
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
