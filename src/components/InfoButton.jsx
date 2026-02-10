import React, { useEffect, useRef, useState } from "react";

export default function InfoButton({ text, compact = false, label = "Info" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
    >
      <button
        type="button"
        className="pill"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-expanded={open}
        aria-label={label}
        style={{
          cursor: "help",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          fontSize: 12,
          fontWeight: 800,
          lineHeight: 1,
          userSelect: "none",
          background: "rgba(255,255,255,0.04)",
        }}
        title="Info"
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border)",
            background: "rgba(0,0,0,0.18)",
            color: "var(--text)",
            fontSize: 12,
          }}
        >
          i
        </span>
        <span style={{ color: "var(--muted)", fontWeight: 800 }}>
          {compact ? "Rule" : label}
        </span>
      </button>

      {open && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            width: compact ? 280 : 360,
            maxWidth: "90vw",
            background: "rgba(17, 26, 51, 0.98)", // var(--panel) with opacity
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "10px 12px",
            zIndex: 100,
            boxShadow: "0 12px 28px rgba(0,0,0,0.45)",
            color: "var(--muted)",
            fontSize: 12,
            lineHeight: 1.45,
          }}
        >
          <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(122,162,255,0.14)",
                border: "1px solid rgba(122,162,255,0.25)",
                color: "var(--text)",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              i
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--text)", fontWeight: 900, marginBottom: 4 }}>
                {label}
              </div>
              <div>{text}</div>
            </div>

            <button
              type="button"
              className="btn ghost"
              onClick={() => setOpen(false)}
              style={{
                padding: "6px 8px",
                height: 28,
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 900,
                lineHeight: 1,
              }}
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* little pointer */}
          <div
            style={{
              position: "absolute",
              top: -6,
              right: 18,
              width: 10,
              height: 10,
              transform: "rotate(45deg)",
              background: "rgba(17, 26, 51, 0.98)",
              borderLeft: "1px solid var(--border)",
              borderTop: "1px solid var(--border)",
            }}
          />
        </div>
      )}
    </div>
  );
}