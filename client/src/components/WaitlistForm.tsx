import { useState } from "react";
import { trpc } from "@/lib/trpc";

const BRASS = "#c9a84c";
const BLACK = "#080808";
const MUTED = "rgba(242,239,232,0.45)";
const BORDER = "rgba(201,168,76,0.12)";

interface WaitlistFormProps {
  entityType: string;
  source?: string;
  variant?: "default" | "hero";
}

export default function WaitlistForm({
  entityType,
  source = "entity-card",
  variant = "default",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const isHero = variant === "hero";

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
          marginTop: isHero ? "0" : "16px",
          padding: isHero ? "16px 20px" : "12px 16px",
          border: "1px solid rgba(74,222,128,0.3)",
          background: "rgba(74,222,128,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ color: "#4ade80", fontSize: isHero ? "16px" : "12px" }}>✓</span>
        <span
          style={{
            fontSize: isHero ? "13px" : "11px",
            color: "rgba(242,239,232,0.7)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
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
      style={{
        marginTop: isHero ? "0" : "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", gap: "0" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isHero ? "Enter your email address" : "your@email.com"}
          required
          disabled={subscribe.isPending}
          style={{
            flex: 1,
            background: "rgba(8,8,8,0.8)",
            border: `1px solid ${BORDER}`,
            borderRight: "none",
            color: "rgba(242,239,232,0.85)",
            fontFamily: "'DM Mono', monospace",
            fontSize: isHero ? "13px" : "11px",
            padding: isHero ? "14px 18px" : "10px 14px",
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
            fontSize: isHero ? "12px" : "10px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: isHero ? "14px 28px" : "10px 16px",
            cursor: subscribe.isPending ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (!subscribe.isPending) (e.currentTarget as HTMLElement).style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          {subscribe.isPending ? "..." : isHero ? "Get Early Access" : "Notify Me"}
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

      {!isHero && (
        <p style={{ fontSize: "9px", color: MUTED, margin: 0, fontFamily: "'DM Mono', monospace" }}>
          No spam. Launch notification only.
        </p>
      )}
    </form>
  );
}
