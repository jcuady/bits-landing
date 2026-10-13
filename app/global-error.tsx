"use client";

/**
 * Global error boundary — last-resort fallback for errors thrown by the root
 * layout itself, where `app/error.tsx` cannot catch them.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a2046",
          color: "#e2e8f0",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
            Application error
          </h1>
          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", lineHeight: 1.6, color: "#bae6fd" }}>
            An unexpected error stopped the site from rendering. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              minHeight: "2.75rem",
              padding: "0 1.25rem",
              borderRadius: "0.75rem",
              border: 0,
              background: "#2563eb",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}