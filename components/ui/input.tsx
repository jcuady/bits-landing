import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-xl border border-white/40 bg-white/50 backdrop-blur-md shadow-[inset_0_1px_4px_rgba(255,255,255,0.6)] px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1975f2] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-black/30 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
