"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastTone = "success" | "error" | "info" | "warning";

export type ToastMessage = {
  id: string;
  text: string;
  tone?: ToastTone;
};

const ToastContext = React.createContext<{
  showToast: (text: string, tone?: ToastTone) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const showToast = React.useCallback((text: string, tone: ToastTone = "success") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, text, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-top-2 dark:border-neutral-800 dark:bg-neutral-950"
          >
            {t.tone === "success" && <CheckCircle2 className="size-4 text-[#00b153] shrink-0" />}
            {t.tone === "error" && <AlertCircle className="size-4 text-rose-500 shrink-0" />}
            {t.tone === "info" && <Info className="size-4 text-[#1975f2] shrink-0" />}
            {t.tone === "warning" && <AlertTriangle className="size-4 text-amber-400 shrink-0" />}
            <span>{t.text}</span>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="ml-2 rounded p-0.5 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    // Graceful fallback if used outside provider
    return { showToast: (text: string) => console.log("Toast:", text) };
  }
  return ctx;
}
