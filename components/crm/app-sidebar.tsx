"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { crmNav } from "@/lib/crm/nav";
import { cn } from "@/lib/utils";

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-[240px] shrink-0 flex-col border-r border-linelight bg-white",
        className
      )}
    >
      <div className="flex h-14 items-center border-b border-linelight px-4">
        <Link href="/app/dashboard" className="rounded-md" aria-label="BITS CRM home">
          <Logo variant="horizontal" className="h-7" />
        </Link>
      </div>
      <nav aria-label="CRM" className="flex-1 overflow-y-auto px-2.5 py-3">
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
                      className={cn(
                        "flex min-h-10 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.84rem] font-medium transition-colors active:scale-[0.99]",
                        active
                          ? "bg-electric-600/10 text-electric-700"
                          : "text-slateblue hover:bg-navy-700/[0.04] hover:text-ink"
                      )}
                    >
                      <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
