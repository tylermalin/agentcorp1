import { useState } from "react";
import { trpc } from "@/lib/trpc";

const BRASS = "#c9a84c";
const BLACK = "#080808";
const MUTED = "rgba(242,239,232,0.45)";
const BORDER = "rgba(201,168,76,0.12)";

interface WaitlistFormProps {
  entityType: string;
  source?: string;
}

export default function WaitlistForm({ entityType, source = "entity-card" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const subscribe = trpc.waitlist.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setAlreadySubscribed(data.alreadySubscribed ?? false);
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ email: email.trim(), entityType, source });
  };

  if (submitted) {
    return (
      <div
        style={{
          marginTop: "16px",
          padding: "12px 16px",
          border: `1px solid rgba(74,222,128,0.3)`,
          background: "rgba(74,222,128,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ color: "#4ade80", fontSize: "12px" }}>✓</span>
        <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.7)", fontFamily: "'DM Mono', monospace" }}>
          {alreadySubscribed
            ? "You're already on the list — we'll be in touch."
            : "You're on the waitlist. We'll notify you at launch."}
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <div style={{ display: "flex", gap: "0" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={subscribe.isPending}
          style={{
            flex: 1,
            background: "rgba(8,8,8,0.8)",
            border: `1px solid ${BORDER}`,
            borderRight: "none",
            color: "rgba(242,239,232,0.85)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            padding: "10px 14px",
            outline: "none",
            minWidth: 0,
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
          onBlur={(e) => (e.target.style.borderColor = BORDER)}
        />
        <button
          type="submit"
          disabled={subscribe.isPending || !email.trim()}
          style={{
            background: subscribe.isPending ? "rgba(201,168,76,0.4)" : BRASS,
            color: BLACK,
            border: "none",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "10px 16px",
            cursor: subscribe.isPending ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
        >
          {subscribe.isPending ? "..." : "Notify Me"}
        </button>
      </div>

      {subscribe.isError && (
        <p
          style={{
            fontSize: "10px",
            color: "#f87171",
            fontFamily: "'DM Mono', monospace",
            margin: 0,
          }}
        >
          {subscribe.error?.message || "Something went wrong. Please try again."}
        </p>
      )}

      <p style={{ fontSize: "9px", color: MUTED, margin: 0, fontFamily: "'DM Mono', monospace" }}>
        No spam. Launch notification only.
      </p>
    </form>
  );
}
