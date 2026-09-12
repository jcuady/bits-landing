"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { crmNav } from "@/lib/crm/nav";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="CRM navigation">
      <button type="button" className="absolute inset-0 bg-navy-900/40" aria-label="Close menu" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 flex w-[min(100%,280px)] flex-col bg-white shadow-xl">
        <div className="flex h-14 items-center justify-between border-b border-linelight px-4">
          <Logo variant="horizontal" className="h-7" />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-lg text-ink hover:bg-cloud"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>
        <nav aria-label="Mobile CRM" className="flex-1 overflow-y-auto px-2.5 py-3">
          {crmNav.map((section) => (
            <div key={section.title} className="mb-4">
              <p className="mb-1.5 px-2.5 text-[0.65rem] font-semibold tracking-[0.08em] text-slateblue/80 uppercase">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-[0.88rem] font-medium",
                          active ? "bg-electric-600/10 text-electric-700" : "text-slateblue hover:bg-cloud hover:text-ink"
                        )}
                      >
                        <Icon className="size-4" aria-hidden />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
