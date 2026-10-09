"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CopyButton — copy-to-clipboard primitive for code snippets and tokens.
 * Used in the colors, typography, and architecture chapters.
 */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch {}
      document.body.removeChild(ta);
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white/90 px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-700 transition-all hover:border-signal-300 hover:bg-white hover:text-slate-900 active:scale-[0.98]",
        copied && "border-emerald-400 bg-emerald-50 text-emerald-700",
        className
      )}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? (
        <>
          <Check className="size-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3" />
          {label}
        </>
      )}
    </button>
  );
}
