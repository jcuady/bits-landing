import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  tight = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 overflow-x-clip",
        tight ? "py-14 md:py-20" : "py-20 md:py-28 lg:py-32",
        className
      )}
    >
      {children}
    </section>
  );
}
