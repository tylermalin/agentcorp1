/* ============================================================
   AGENTCORP MINT PAGE — Coming Soon
   Smart contracts under audit. Testnet live. Mainnet Q1 2027.
   Industrial Legal Modernism — dark, brass accents
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

const BRASS = "#c9a84c";
const WHITE = "#f2efe8";
const BLACK = "#080808";
const MUTED = "rgba(242,239,232,0.45)";
const BORDER = "rgba(201,168,76,0.12)";

function useFadeUp(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.65s ease, transform 0.65s ease" } };
}

const ENTITY_TYPES = [
  {
    id: "DELAWARE_SERIES_LLC",
    name: "Delaware Series LLC",
    price: "0.05 ETH",
    priceUsd: "~$150",
    desc: "The most powerful structure for onchain organizations. Unlimited legally-segregated Series under one parent entity.",
    badge: "Most Popular",
    timeline: "Q1 2027",
  },
  {
    id: "SERIES_DESIGNATION",
    name: "Series Designation",
    price: "0.02 ETH",
    priceUsd: "~$60",
    desc: "A legally-isolated Series under an existing parent Delaware Series LLC. Requires parent LLC token.",
    badge: null,
    timeline: "Q1 2027",
  },
  {
    id: "DAO_CHARTER",
    name: "DAO Operating Charter",
    price: "0.05 ETH",
    priceUsd: "~$150",
    desc: "Delaware LLC with full blockchain governance provisions: designated smart contract, token-weighted voting, delegate disclosure.",
    badge: null,
    timeline: "Q1 2027",
  },
  {
    id: "IP_LICENSE",
    name: "IP License NFT",
    price: "TBD",
    priceUsd: "",
    desc: "Software license NFT with royalty hooks and sublicense controls.",
    badge: "Q2 2027",
    timeline: "Q2 2027",
  },
  {
    id: "WYOMING_LLC",
    name: "Wyoming LLC",
    price: "TBD",
    priceUsd: "",
    desc: "Wyoming LLC with DAO-friendly provisions and member anonymity protections.",
    badge: "Q2 2027",
    timeline: "Q2 2027",
  },
  {
    id: "NONPROFIT",
    name: "Delaware Non-Profit",
    price: "0.05 ETH",
    priceUsd: "~$150",
    desc: "Delaware non-profit with 501(c) pathway documentation.",
    badge: "Q3 2027",
    timeline: "Q3 2027",
  },
];

const AUDIT_STEPS = [
  {
    tag: "// phase_01 — complete",
    title: "Protocol Design",
    desc: "Smart contract architecture finalized. Entity formation flow, Arweave document schema, and governance adapters specified.",
    done: true,
  },
  {
    tag: "// phase_02 — complete",
    title: "Testnet Deployment",
    desc: "AgentCorp contracts deployed on Base Sepolia. Internal testing of Delaware Series LLC and DAO Charter formation flows.",
    done: true,
  },
  {
    tag: "// phase_03 — in progress",
    title: "Security Audit",
    desc: "Smart contracts undergoing independent security audit. Formation logic, NFT ownership, and Arweave document binding under review.",
    done: false,
    active: true,
  },
  {
    tag: "// phase_04 — pending",
    title: "Mainnet Launch",
    desc: "Base Mainnet deployment. Delaware Series LLC and DAO Charter live. Agent SDK and Avocado gasless integration enabled.",
    done: false,
  },
];

export default function Mint() {
  const hero = useFadeUp(0.05);
  const status = useFadeUp();
  const entities = useFadeUp();
  const agentSection = useFadeUp();

  return (
    <div style={{ background: BLACK, color: WHITE, minHeight: "100vh", fontFamily: "'DM Mono', monospace", position: "relative" }}>
      {/* Brass grid overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Nav />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px) clamp(64px, 8vw, 100px)",
          borderBottom: `1px solid ${BORDER}`,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div ref={hero.ref} style={hero.style}>
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid rgba(201,168,76,0.25)",
              padding: "8px 16px",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#f59e0b",
                boxShadow: "0 0 8px #f59e0b",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: BRASS, textTransform: "uppercase" as const }}>
              Testnet Live — Mainnet Coming Q1 2027
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(44px, 8vw, 110px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              marginBottom: "32px",
              maxWidth: "800px",
            }}
          >
            Coming<br />
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: BRASS,
              }}
            >
              Q1 2027.
            </em>
          </h1>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: MUTED,
              maxWidth: "560px",
              marginBottom: "16px",
            }}
          >
            The AgentCorp smart contracts are on testnet and undergoing independent security audit before mainnet deployment on Base. Sign up to be first to mint.
          </p>

          <p
            style={{
              fontSize: "12px",
              lineHeight: 1.7,
              color: "rgba(242,239,232,0.3)",
              maxWidth: "480px",
              marginBottom: "40px",
              fontStyle: "italic",
            }}
          >
            Smart contracts will be fully audited prior to mainnet launch. No funds at risk during testnet phase.
          </p>

          {/* Hero waitlist form */}
          <div style={{ maxWidth: "480px" }}>
            <WaitlistForm entityType="DELAWARE_SERIES_LLC" source="mint-hero" variant="hero" />
            <p style={{ fontSize: "10px", color: "rgba(242,239,232,0.25)", marginTop: "10px", fontFamily: "'DM Mono', monospace" }}>
              Delaware Series LLC · DAO Charter · IP License NFT · Wyoming LLC — all entity types launching 2026
            </p>
          </div>
        </div>
      </section>

      {/* ── AUDIT STATUS ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)",
          borderBottom: `1px solid ${BORDER}`,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div ref={status.ref} style={status.style}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: BRASS, letterSpacing: "0.2em", opacity: 0.7 }}>01</span>
            <span style={{ width: "32px", height: "1px", background: BRASS, opacity: 0.3 }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>Development Status</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "2px",
            }}
          >
            {AUDIT_STEPS.map((step, i) => (
              <div
                key={step.title}
                style={{
                  border: `1px solid ${step.active ? "rgba(201,168,76,0.4)" : BORDER}`,
                  background: step.active ? "rgba(201,168,76,0.05)" : step.done ? "rgba(74,222,128,0.02)" : "transparent",
                  padding: "28px",
                  position: "relative",
                }}
              >
                {/* Status indicator */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: step.done ? "#4ade80" : step.active ? "#f59e0b" : "rgba(201,168,76,0.2)",
                      boxShadow: step.active ? "0 0 8px #f59e0b" : step.done ? "0 0 6px rgba(74,222,128,0.4)" : "none",
                      flexShrink: 0,
                      animation: step.active ? "pulse 2s ease-in-out infinite" : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase" as const,
                      color: step.done ? "#4ade80" : step.active ? "#f59e0b" : "rgba(242,239,232,0.2)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {step.done ? "Complete" : step.active ? "In Progress" : "Pending"}
                  </span>
                </div>

                <div style={{ fontSize: "9px", color: BRASS, fontFamily: "'DM Mono', monospace", marginBottom: "8px", opacity: 0.6 }}>
                  {step.tag}
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: step.active ? WHITE : step.done ? "rgba(242,239,232,0.8)" : "rgba(242,239,232,0.4)",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: "12px", lineHeight: 1.65, color: step.done || step.active ? MUTED : "rgba(242,239,232,0.25)" }}>
                  {step.desc}
                </p>

                {/* Step number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "20px",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "32px",
                    color: "rgba(201,168,76,0.06)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTITY TYPES ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)",
          borderBottom: `1px solid ${BORDER}`,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div ref={entities.ref} style={entities.style}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: BRASS, letterSpacing: "0.2em", opacity: 0.7 }}>02</span>
            <span style={{ width: "32px", height: "1px", background: BRASS, opacity: 0.3 }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>Entity Types</span>
          </div>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Six entity types.{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: BRASS }}>
              All coming 2026.
            </em>
          </h2>
          <p style={{ fontSize: "13px", color: MUTED, maxWidth: "480px", marginBottom: "40px", lineHeight: 1.7 }}>
            Sign up below to be notified when your entity type launches. Early access subscribers mint first.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2px" }}>
            {ENTITY_TYPES.map((entity) => (
              <div
                key={entity.id}
                style={{
                  border: `1px solid ${BORDER}`,
                  background: "rgba(201,168,76,0.02)",
                  padding: "28px",
                  position: "relative",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.25)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.02)";
                }}
              >
                {/* Coming Soon badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: BRASS,
                    fontSize: "8px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    padding: "4px 10px",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {entity.timeline}
                </div>

                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: WHITE,
                    marginBottom: "8px",
                    marginRight: "80px",
                  }}
                >
                  {entity.name}
                </h3>

                <p style={{ fontSize: "12px", lineHeight: 1.65, color: MUTED, marginBottom: "16px" }}>
                  {entity.desc}
                </p>

                {entity.price !== "TBD" && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: WHITE }}>
                      {entity.price}
                    </span>
                    {entity.priceUsd && (
                      <span style={{ fontSize: "11px", color: MUTED }}>{entity.priceUsd}</span>
                    )}
                  </div>
                )}

                {/* Per-entity waitlist */}
                <WaitlistForm entityType={entity.id} source="mint-entity-card" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR AGENTS ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(48px, 6vw, 80px) clamp(24px, 6vw, 80px)",
          borderBottom: `1px solid ${BORDER}`,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div ref={agentSection.ref} style={agentSection.style}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: BRASS, letterSpacing: "0.2em", opacity: 0.7 }}>03</span>
            <span style={{ width: "32px", height: "1px", background: BRASS, opacity: 0.3 }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>For Agents</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              alignItems: "start",
            }}
            className="grid-2"
          >
            {/* Left: copy */}
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                Agents can<br />
                <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: BRASS }}>
                  sign up here.
                </em>
              </h2>
              <p style={{ fontSize: "13px", lineHeight: 1.75, color: MUTED, maxWidth: "400px", marginBottom: "24px" }}>
                AI agents running on Manus, Claude, GPT-4, Eliza, or LangChain can register for early access. When mainnet launches, agents will be able to self-incorporate via the AgentCorp SDK — no human required.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {[
                  "Gasless minting via Avocado agentic wallet",
                  "SDK-native: one function call to incorporate",
                  "Swarm treasury management built-in",
                  "Delaware legal compliance, fully onchain",
                ].map((feat) => (
                  <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: BRASS, fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: "12px", color: MUTED, lineHeight: 1.5 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: agent signup form */}
            <div
              style={{
                border: `1px solid rgba(201,168,76,0.2)`,
                background: "rgba(201,168,76,0.03)",
                padding: "36px",
              }}
            >
              {/* Terminal header */}
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: BRASS,
                  marginBottom: "24px",
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: MUTED }}>$</span>
                <span>agentcorp register --type=agent --framework=any</span>
                <span
                  style={{
                    width: "7px",
                    height: "13px",
                    background: BRASS,
                    opacity: 0.6,
                    animation: "blink 1.2s step-end infinite",
                    display: "inline-block",
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: WHITE,
                  marginBottom: "8px",
                }}
              >
                Agent Early Access
              </h3>
              <p style={{ fontSize: "12px", color: MUTED, marginBottom: "24px", lineHeight: 1.65 }}>
                Register your agent's operator email to receive SDK access, testnet credentials, and mainnet launch notification.
              </p>

              <WaitlistForm entityType="AGENT_SDK" source="mint-agent-signup" variant="hero" />

              <p style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)", marginTop: "14px", fontFamily: "'DM Mono', monospace" }}>
                Compatible: Manus · Claude · GPT-4 · Eliza · LangChain · Custom
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0; }
        }
        @media (max-width: 900px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
