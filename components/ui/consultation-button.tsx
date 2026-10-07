"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { cn } from "@/lib/utils";

/**
 * Server-render-safe trigger for the consultation modal.
 * Lets page-level server components (which own metadata + JSON-LD) ship a
 * working primary CTA without becoming client components themselves.
 */
export function ConsultationButton({
  interest,
  label = "Book a Consultation",
  className,
  variant = "primary",
  size = "lg",
}: {
  interest: string;
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "light";
  size?: "md" | "lg";
}) {
  const { openModal } = useConsultationModal();

  return (
    <button
      type="button"
      onClick={() => openModal(interest)}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 active:scale-[0.98] cursor-pointer",
        size === "lg" ? "min-h-[3rem] px-7 text-sm" : "min-h-[2.75rem] px-5 text-xs",
        variant === "primary" &&
          "bg-electric-600 text-white shadow-[0_10px_28px_-10px_rgb(0_99_219/0.55)] hover:bg-electric-500 hover:shadow-[0_14px_32px_-10px_rgb(0_123_255/0.6)]",
        variant === "secondary" &&
          "border border-linelight bg-white text-ink shadow-xs hover:border-electric-400 hover:bg-skywash",
        variant === "light" &&
          "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
        className
      )}
    >
      <span>{label}</span>
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  );
}