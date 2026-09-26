"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CrmModalProps {
  open?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function CrmModal({
  open,
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}: CrmModalProps) {
  const isVisible = Boolean(open ?? isOpen);
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          "w-full rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl animate-in zoom-in-95 duration-200 dark:border-[#262626] dark:bg-[#141414]",
          maxWidthClasses[maxWidth]
        )}
      >
        <div className="flex items-start justify-between pb-3 border-b border-border/80 dark:border-[#222]">
          <div>
            <h2 id="modal-title" className="text-base font-bold text-foreground">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
