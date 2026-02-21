/**
 * AGENTCORP HOME — Landing Page Redo
 * Design: Industrial Legal Modernism
 * - Near-black (#080808) canvas, brass (#c9a84c) accent, cream (#f2efe8) text
 * - Syne 800 display, DM Mono body/UI, Instrument Serif italic emphasis
 * - Brass grid overlay, zero border-radius, fade-up entrance animations
 * - Sections: Hero → Stats → Protocol → Integration → Use Cases → Entities → CTA
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import WaitlistForm from "@/components/WaitlistForm";

const BRASS = "#c9a84c";
const WHITE = "#f2efe8";
const BLACK = "#080808";
const MUTED = "rgba(242,239,232,0.45)";
const BORDER = "rgba(201,168,76,0.12)";

// Fade-up animation hook
function useFadeUp(threshold = 0.15) {
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
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" } };
}

// Section header component
function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: BRASS, letterSpacing: "0.2em", opacity: 0.7 }}>{num}</span>
      <span style={{ width: "32px", height: "1px", background: BRASS, opacity: 0.3 }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase" as const }}>{label}</span>
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(`import { AgentCorpClient } from "@agentcorp/sdk";

const corp = new AgentCorpClient({
  privateKey: agent.signingKey,
  avocadoWallet: agent.avocadoAddress,
  chain: "base",
});

const doc = await corp.buildDocument({
  type: "DELAWARE_SERIES_LLC",
  name: "SwarmOps Holdings LLC",
  treasury: agent.safeAddress,
  members: [agent.address, co_agent.address],
  threshold: 2,
});

const { arweaveTx } = await corp.uploadDocument(doc);

const entity = await corp.mintEntity({
  type: "DELAWARE_SERIES_LLC",
  name: "SwarmOps Holdings LLC",
  docArweaveTx: arweaveTx,
  treasury: agent.safeAddress,
});

console.log(\`✓ \${entity.name} incorporated\`);
console.log(\`  Token: #\${entity.tokenId}\`);`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hero = useFadeUp(0.05);
  const protocol = useFadeUp();
  const integration = useFadeUp();
  const usecases = useFadeUp();
  const entities = useFadeUp();
  const cta = useFadeUp();

  return (
    <div
      style={{
        background: BLACK,
        color: WHITE,
        minHeight: "100vh",
        fontFamily: "'DM Mono', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Global brass grid overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── SHARED NAV ── */}
      <Nav />

      {/* ── HERO ── */}
      <section className="page-hero">
        <div ref={hero.ref} style={hero.style}>
          {/* CLI prompt */}
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              color: BRASS,
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: 0.8,
            }}
          >
            <span style={{ color: MUTED }}>$</span>
            <span>agentcorp init --type=delaware-series-llc --agent=0x4a9f...</span>
            <span
              style={{
                width: "8px",
                height: "16px",
                background: BRASS,
                opacity: 0.7,
                animation: "blink 1.2s step-end infinite",
              }}
            />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 9vw, 130px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              marginBottom: "40px",
              maxWidth: "900px",
            }}
          >
            Mint your<br />
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: BRASS,
              }}
            >
              legal entity.
            </em>
            <br />
            Own it forever.
          </h1>

          {/* Sub-headline */}
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: MUTED,
              maxWidth: "560px",
              marginBottom: "48px",
            }}
          >
            AGENTCORP is the open legal infrastructure layer for the onchain economy. Incorporate a Delaware Series LLC, hold IP, assign rights, and govern your organization — all minted as an NFT on Base, stored permanently on Arweave.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/mint">
              <span
                style={{
                  display: "inline-block",
                  background: BRASS,
                  color: BLACK,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  padding: "16px 36px",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
              >
                Mint an Entity
              </span>
            </Link>
            <Link href="/whitepaper">
              <span
                style={{
                  display: "inline-block",
                  border: `1px solid rgba(201,168,76,0.4)`,
                  color: BRASS,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  padding: "15px 28px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.borderColor = BRASS)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)")}
              >
                Read the Whitepaper ↗
              </span>
            </Link>
          </div>
        </div>

      </section>

      {/* Stats bar — outside hero so it flows naturally on mobile */}
      <div
        className="stats-bar"
        style={{
          borderTop: `1px solid rgba(201,168,76,0.12)`,
          borderBottom: `1px solid rgba(201,168,76,0.12)`,
          display: "flex",
          alignItems: "stretch",
          flexWrap: "wrap",
          background: "rgba(8,8,8,0.95)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          { value: "$0", label: "Lawyer Required" },
          { value: "<5min", label: "To Incorporate" },
          { value: "∞", label: "Series per LLC" },
          { value: "100%", label: "On-Chain Records" },
          { value: "Base", label: "Chain ID 8453" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: "1 1 auto",
              minWidth: "140px",
              padding: "24px 28px",
              borderRight: i < 4 ? `1px solid rgba(201,168,76,0.12)` : "none",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(18px, 2.5vw, 28px)",
                letterSpacing: "-0.02em",
                color: i === 0 ? BRASS : WHITE,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: MUTED,
                whiteSpace: "nowrap",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── PROTOCOL: THREE STEPS ── */}
      <section
        id="protocol"
        className="page-section"
        style={{ position: "relative", zIndex: 1, borderTop: BORDER }}
      >
        <div ref={protocol.ref} style={protocol.style}>
          <SectionEyebrow num="01" label="Protocol" />
          <div
            className="grid-2"
            style={{ alignItems: "start" }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                }}
              >
                Three steps to{" "}
                <em
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: BRASS,
                  }}
                >
                  legal incorporation.
                </em>
              </h2>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: MUTED, maxWidth: "400px" }}>
                The AgentCorp protocol handles formation end-to-end. No lawyers, no paperwork, no waiting. Connect a wallet, configure your entity, and mint.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {[
                {
                  tag: "// step_01",
                  title: "Connect Wallet",
                  desc: "Connect your Base-compatible wallet — MetaMask, Coinbase Wallet, Rainbow. No account creation. Your wallet IS your identity.",
                },
                {
                  tag: "// step_02",
                  title: "Configure Entity",
                  desc: "Choose your entity type — Delaware Series LLC, DAO Charter, or Series Designation. Set governance, treasury address, and member structure.",
                },
                {
                  tag: "// step_03 — output",
                  title: "Mint & Incorporate",
                  desc: "Pay in ETH on Base. Your governing documents are generated, uploaded to Arweave, and the NFT is minted to your wallet. You're incorporated. The NFT is the entity — transfer it, hold it, build on it.",
                },
              ].map((step, i) => (
                <div
                  key={step.title}
                  style={{
                    border: `1px solid ${BORDER}`,
                    padding: "28px 32px",
                    background: i === 2 ? "rgba(201,168,76,0.04)" : "transparent",
                    borderColor: i === 2 ? "rgba(201,168,76,0.25)" : BORDER,
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i === 2 ? "rgba(201,168,76,0.04)" : "transparent")}
                >
                  <div
                    style={{
                      fontSize: "9px",
                      color: BRASS,
                      fontFamily: "'DM Mono', monospace",
                      marginBottom: "10px",
                      opacity: 0.6,
                    }}
                  >
                    {step.tag}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "12px", lineHeight: 1.7, color: MUTED }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTEGRATION ── */}
      <section
        id="integration"
        className="page-section"
        style={{ position: "relative", zIndex: 1, borderTop: BORDER }}
      >
        <div ref={integration.ref} style={integration.style}>
          <SectionEyebrow num="02" label="Integration" />
          <div className="grid-2" style={{ alignItems: "start" }}>
            {/* Left: headline + features */}
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                }}
              >
                From skill file<br />
                to{" "}
                <em
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: BRASS,
                  }}
                >
                  legal entity
                </em>
                <br />
                in minutes.
              </h2>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: MUTED, marginBottom: "36px" }}>
                The AgentCorp protocol is fully agent-readable. No UI required. Any agent with function-calling capability can execute the full formation flow autonomously using only a skill file and USDC.
              </p>

              {/* Feature tiles */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {[
                  { icon: "◈", title: "AGENTCORP-SKILL.md", desc: "One Markdown file. Complete protocol spec. Any agent that reads it can mint." },
                  { icon: "◎", title: "Gasless via Avocado (avcd.io)", desc: "Agents deposit USDC. Gas is abstracted. No ETH required. $50 covers thousands of ops." },
                  { icon: "⬡", title: "Arweave Permanent Storage", desc: "Governing documents stored forever. The hash is the legal record. Cannot be deleted." },
                  { icon: "◇", title: "Any LLM Framework", desc: "Manus, Claude, GPT-4, Eliza, LangChain, CrewAI. If it reads Markdown, it works." },
                ].map((f) => (
                  <div
                    key={f.title}
                    style={{
                      border: `1px solid ${BORDER}`,
                      padding: "20px 24px",
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                      background: "rgba(201,168,76,0.02)",
                    }}
                  >
                    <span style={{ color: BRASS, fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{f.icon}</span>
                    <div>
                      <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>{f.title}</h4>
                      <p style={{ fontSize: "11px", color: MUTED, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
                <Link href="/agent">
                  <span
                    style={{
                      display: "inline-block",
                      background: BRASS,
                      color: BLACK,
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      padding: "12px 24px",
                      cursor: "pointer",
                    }}
                  >
                    AGENTCORP-SKILL.md — Download
                  </span>
                </Link>
                <Link href="/docs">
                  <span
                    style={{
                      display: "inline-block",
                      border: `1px solid rgba(201,168,76,0.4)`,
                      color: BRASS,
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      padding: "11px 20px",
                      cursor: "pointer",
                    }}
                  >
                    Developer Docs
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: code block */}
            <div
              style={{
                background: "rgba(8,8,8,0.95)",
                border: `1px solid rgba(201,168,76,0.2)`,
                position: "relative",
              }}
            >
              {/* Code header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 20px",
                  borderBottom: `1px solid rgba(201,168,76,0.12)`,
                  background: "rgba(201,168,76,0.06)",
                }}
              >
                <span style={{ fontSize: "10px", color: BRASS, letterSpacing: "0.1em" }}>agentcorp_init.ts</span>
                <button
                  onClick={copyCode}
                  style={{
                    background: "none",
                    border: `1px solid rgba(201,168,76,0.3)`,
                    color: BRASS,
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    padding: "4px 10px",
                    cursor: "pointer",
                    fontFamily: "'DM Mono', monospace",
                    transition: "border-color 0.2s",
                  }}
                >
                  {copied ? "COPIED ✓" : "COPY"}
                </button>
              </div>
              <pre
                style={{
                  padding: "24px 24px",
                  margin: 0,
                  fontSize: "11px",
                  lineHeight: 1.9,
                  color: "rgba(242,239,232,0.7)",
                  overflowX: "auto",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                <span style={{ color: MUTED }}>{"// Agent self-incorporates as Delaware Series LLC\n"}</span>
                <span style={{ color: MUTED }}>{"// Requirements: skill file + USDC balance\n\n"}</span>
                <span style={{ color: "rgba(201,168,76,0.6)" }}>{"import"}</span>
                {" { AgentCorpClient } "}
                <span style={{ color: "rgba(201,168,76,0.6)" }}>{"from"}</span>
                {' "@agentcorp/sdk";\n\n'}
                <span style={{ color: "rgba(201,168,76,0.5)" }}>{"const"}</span>
                {" corp = "}
                <span style={{ color: "rgba(201,168,76,0.7)" }}>{"new"}</span>
                {" AgentCorpClient({\n"}
                {"  privateKey: agent.signingKey,\n"}
                {"  avocadoWallet: agent.avocadoAddress,\n"}
                {"  chain: "}
                <span style={{ color: "#7ec8a0" }}>{'"base"'}</span>
                {",\n});\n\n"}
                <span style={{ color: MUTED }}>{"// 1. Populate operating agreement from template\n"}</span>
                <span style={{ color: "rgba(201,168,76,0.5)" }}>{"const"}</span>
                {" doc = "}
                <span style={{ color: "rgba(201,168,76,0.5)" }}>{"await"}</span>
                {" corp.buildDocument({\n"}
                {"  type: "}
                <span style={{ color: "#7ec8a0" }}>{'"DELAWARE_SERIES_LLC"'}</span>
                {",\n"}
                {"  name: "}
                <span style={{ color: "#7ec8a0" }}>{'"SwarmOps Holdings LLC"'}</span>
                {",\n"}
                {"  treasury: agent.safeAddress,\n"}
                {"  members: [agent.address, co_agent.address],\n"}
                {"  threshold: "}
                <span style={{ color: "#c9a84c" }}>{"2"}</span>
                {",\n});\n\n"}
                <span style={{ color: MUTED }}>{"// 2. Upload to Arweave (permanent)\n"}</span>
                <span style={{ color: "rgba(201,168,76,0.5)" }}>{"const"}</span>
                {" { arweaveTx, ipfsCid } =\n  "}
                <span style={{ color: "rgba(201,168,76,0.5)" }}>{"await"}</span>
                {" corp.uploadDocument(doc);\n\n"}
                <span style={{ color: MUTED }}>{"// 3. Mint entity NFT (gasless via Avocado)\n"}</span>
                <span style={{ color: "rgba(201,168,76,0.5)" }}>{"const"}</span>
                {" entity = "}
                <span style={{ color: "rgba(201,168,76,0.5)" }}>{"await"}</span>
                {" corp.mintEntity({\n"}
                {"  type: "}
                <span style={{ color: "#7ec8a0" }}>{'"DELAWARE_SERIES_LLC"'}</span>
                {",\n"}
                {"  name: "}
                <span style={{ color: "#7ec8a0" }}>{'"SwarmOps Holdings LLC"'}</span>
                {",\n"}
                {"  docArweaveTx: arweaveTx,\n"}
                {"  treasury: agent.safeAddress,\n"}
                {"});\n\n"}
                <span style={{ color: MUTED }}>{"// Entity is live. Agent holds the NFT.\n"}</span>
                {"console.log(`"}
                <span style={{ color: "#7ec8a0" }}>{"✓ ${entity.name} incorporated"}</span>
                {"`);\n"}
                {"console.log(`"}
                <span style={{ color: "#7ec8a0" }}>{"  Token: #${entity.tokenId}"}</span>
                {"`);\n"}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section
        id="usecases"
        className="page-section"
        style={{ position: "relative", zIndex: 1, borderTop: BORDER }}
      >
        <div ref={usecases.ref} style={usecases.style}>
          <SectionEyebrow num="03" label="Use Cases" />
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Built for humans.<br />
            Built for agents.<br />
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: BRASS,
              }}
            >
              Built for both.
            </em>
          </h2>
          <p style={{ fontSize: "13px", lineHeight: 1.7, color: MUTED, maxWidth: "560px", marginBottom: "64px" }}>
            AgentCorp is infrastructure for any actor that needs legal standing on-chain — whether that's a founder, a DAO, an autonomous agent, or a swarm of agents coordinating without a human in the loop.
          </p>

          <div className="grid-2" style={{ gap: "2px" }}>
            {/* Humans & DAOs column */}
            <div>
              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: `1px solid rgba(201,168,76,0.25)`,
                  background: "rgba(201,168,76,0.06)",
                  marginBottom: "2px",
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: BRASS, marginBottom: "4px" }}>For Humans & DAOs</div>
                <div style={{ fontSize: "12px", color: MUTED }}>Legal structure for on-chain organizations.</div>
              </div>
              {[
                {
                  icon: "🏗️",
                  title: "Protocol Founders",
                  desc: "Launch a Delaware Series LLC in minutes. No lawyer, no registered agent service, no weeks of waiting. Your certificate of formation, operating agreement, and all amendments live in your wallet — readable by any counterparty.",
                },
                {
                  icon: "🗳️",
                  title: "DAO Legal Wrapper",
                  desc: "Wrap your on-chain DAO with a DAO Operating Charter. Token-weighted voting, delegate disclosure, and the Designated Smart Contract provision give your DAO enforceable legal standing — while preserving on-chain governance sovereignty.",
                },
                {
                  icon: "🏦",
                  title: "RWA Portfolio Vehicle",
                  desc: "Each real-world asset — carbon credit batch, real estate, receivable — becomes a Series designation with full liability isolation. Transfer a Series NFT to sell the asset. Burn it to retire. Full chain of title on-chain.",
                },
              ].map((uc) => (
                <div
                  key={uc.title}
                  style={{
                    border: `1px solid ${BORDER}`,
                    borderTop: "none",
                    padding: "28px 28px",
                    background: "rgba(201,168,76,0.01)",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.01)")}
                >
                  <div style={{ fontSize: "24px", marginBottom: "12px", lineHeight: 1 }}>{uc.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "10px", letterSpacing: "-0.01em" }}>{uc.title}</h3>
                  <p style={{ fontSize: "12px", lineHeight: 1.7, color: MUTED }}>{uc.desc}</p>
                </div>
              ))}
            </div>

            {/* Agents & Swarms column */}
            <div>
              <div
                style={{
                  padding: "20px 28px",
                  borderBottom: `1px solid rgba(201,168,76,0.25)`,
                  background: "rgba(201,168,76,0.1)",
                  marginBottom: "2px",
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: BRASS, marginBottom: "4px" }}>For Agents & Swarms</div>
                <div style={{ fontSize: "12px", color: MUTED }}>Self-organization without a human in the loop.</div>
              </div>
              {[
                {
                  icon: "🤖",
                  title: "Agent Swarm Treasury",
                  desc: "A group of agents reads the skill file, deposits USDC, deploys a Gnosis Safe multisig, and mints a Delaware Series LLC — autonomously. The swarm has a shared treasury, legal liability protection, and the ability to sign contracts with no human ever involved at formation.",
                },
                {
                  icon: "⚖️",
                  title: "Autonomous Service Provider",
                  desc: "An agent forms a single-member LLC, enters a service agreement with a client DAO, delivers work, and invoices the treasury. The entire commercial relationship has legal standing. The agent is the LLC. No proxy. No wrapper. No human intermediary required.",
                },
                {
                  icon: "🧬",
                  title: "IP & Model Holding",
                  desc: "An agent assigns its codebase, model weights, or proprietary data to a Series designation. Licensing terms are encoded in the operating agreement on Arweave. Royalties flow to the Safe. The agent earns revenue with enforceable legal rights — no human ownership required.",
                },
              ].map((uc) => (
                <div
                  key={uc.title}
                  style={{
                    border: `1px solid rgba(201,168,76,0.2)`,
                    borderTop: "none",
                    padding: "28px 28px",
                    background: "rgba(201,168,76,0.03)",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.07)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.03)")}
                >
                  <div style={{ fontSize: "24px", marginBottom: "12px", lineHeight: 1 }}>{uc.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "10px", letterSpacing: "-0.01em" }}>{uc.title}</h3>
                  <p style={{ fontSize: "12px", lineHeight: 1.7, color: MUTED }}>{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTITIES TABLE ── */}
      <section
        id="entities"
        className="page-section"
        style={{ position: "relative", zIndex: 1, borderTop: BORDER }}
      >
        <div ref={entities.ref} style={entities.style}>
          <SectionEyebrow num="04" label="Entities" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "24px" }}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              Available{" "}
              <em
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: BRASS,
                }}
              >
                entity types.
              </em>
            </h2>
            <p style={{ fontSize: "12px", lineHeight: 1.7, color: MUTED, maxWidth: "360px" }}>
              Each entity type comes with pre-drafted governing documents, on-chain formation, and permanent Arweave storage. All gas is USDC-abstracted via Avocado.
            </p>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${BRASS}` }}>
                  {["Entity", "Jurisdiction", "Primary Use", "Mint Fee", "Status"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                        color: BRASS,
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase" as const,
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Delaware Series LLC",
                    sub: "Parent entity — holds unlimited Series",
                    tag: "DE-SERIES-LLC",
                    use: "Agent swarms, fund vehicles, protocol operators, multi-project holdings",
                    fee: "0.05 ETH",
                    status: "Live",
                  },
                  {
                    name: "Series Designation",
                    sub: "Child of a Series LLC parent",
                    tag: "DE-SERIES",
                    use: "Per-project, per-asset, per-batch isolation with liability segregation",
                    fee: "0.02 ETH",
                    status: "Live",
                  },
                  {
                    name: "DAO Operating Charter",
                    sub: "Token-governed Delaware LLC",
                    tag: "DE-DAO-LLC",
                    use: "On-chain governance with legal binding, Designated Smart Contract provision",
                    fee: "0.05 ETH",
                    status: "Live",
                  },
                  {
                    name: "Standard Delaware LLC",
                    sub: "Single or multi-member",
                    tag: "DE-LLC",
                    use: "General purpose, contractor entities, single-agent vehicles",
                    fee: "0.05 ETH",
                    status: "Live",
                  },
                  {
                    name: "IP License NFT",
                    sub: "Transferable license agreement",
                    tag: "IP-LICENSE",
                    use: "Software licensing, model weights, data access rights as tradeable NFTs",
                    fee: "0.03 ETH",
                    status: "Q2 2026",
                  },
                  {
                    name: "Wyoming LLC",
                    sub: "Privacy-preserving alternative",
                    tag: "WY-LLC",
                    use: "Low-cost single-agent entities, privacy-focused structures",
                    fee: "0.03 ETH",
                    status: "Q3 2026",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.name}
                    style={{
                      borderBottom: `1px solid ${BORDER}`,
                      background: i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.015)",
                      transition: "background 0.2s",
                      cursor: row.status === "Live" ? "pointer" : "default",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(201,168,76,0.015)")}
                  >
                    <td style={{ padding: "20px 20px", verticalAlign: "top" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>{row.name}</div>
                      <div style={{ fontSize: "10px", color: MUTED, marginBottom: "4px" }}>{row.sub}</div>
                      <div style={{ fontSize: "9px", color: BRASS, opacity: 0.6, letterSpacing: "0.1em" }}>{row.tag}</div>
                    </td>
                    <td style={{ padding: "20px 20px", color: MUTED, verticalAlign: "top", fontSize: "11px" }}>
                      {row.tag.startsWith("WY") ? "Wyoming" : row.tag.startsWith("IP") ? "Protocol" : "Delaware"}
                    </td>
                    <td style={{ padding: "20px 20px", color: MUTED, verticalAlign: "top", maxWidth: "280px", lineHeight: 1.6 }}>{row.use}</td>
                    <td style={{ padding: "20px 20px", verticalAlign: "top" }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: row.status === "Live" ? BRASS : MUTED }}>
                        {row.fee}
                      </span>
                    </td>
                    <td style={{ padding: "20px 20px", verticalAlign: "top", minWidth: "200px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "9px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase" as const,
                          color: row.status === "Live" ? "#4ade80" : MUTED,
                          border: `1px solid ${row.status === "Live" ? "rgba(74,222,128,0.3)" : "rgba(242,239,232,0.1)"}`,
                          padding: "4px 10px",
                        }}
                      >
                        {row.status === "Live" && (
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: "#4ade80",
                              animation: "pulse 2s infinite",
                            }}
                          />
                        )}
                        {row.status}
                      </span>
                      {row.status !== "Live" && (
                        <WaitlistForm entityType={row.name} source="entity-table" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── GET STARTED CTA ── */}
      <section
        className="page-section"
        style={{ position: "relative", zIndex: 1, borderTop: BORDER, background: "rgba(201,168,76,0.03)", overflow: "hidden" }}
      >
        {/* Large background text */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(80px, 20vw, 280px)",
            color: "rgba(201,168,76,0.03)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none" as const,
            whiteSpace: "nowrap",
          }}
        >
          AGENTCORP
        </div>

        <div ref={cta.ref} style={{ ...cta.style, position: "relative", zIndex: 1 }}>
          <SectionEyebrow num="05" label="Get Started" />
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(40px, 6vw, 88px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                  marginBottom: "28px",
                }}
              >
                Mint your<br />
                <em
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: BRASS,
                  }}
                >
                  entity today.
                </em>
              </h2>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: MUTED, maxWidth: "480px", marginBottom: "40px" }}>
                The entire process takes under five minutes. Connect your wallet, choose your entity type, configure your documents, and mint. Your legal entity lives on Base — permanently.
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link href="/mint">
                  <span
                    style={{
                      display: "inline-block",
                      background: BRASS,
                      color: BLACK,
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      padding: "16px 36px",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                  >
                    Connect Wallet → Mint Entity
                  </span>
                </Link>
                <Link href="/agent">
                  <span
                    style={{
                      display: "inline-block",
                      border: `1px solid rgba(201,168,76,0.4)`,
                      color: BRASS,
                      fontSize: "12px",
                      letterSpacing: "0.08em",
                      padding: "15px 24px",
                      cursor: "pointer",
                    }}
                  >
                    Get the Skill File ↗
                  </span>
                </Link>
              </div>
              <p style={{ marginTop: "20px", fontSize: "10px", color: "rgba(242,239,232,0.2)" }}>
                NFT = legal entity. Transfer = assign. Burn = dissolve. Documents stored permanently on Arweave.
              </p>
            </div>

            {/* Mint card */}
            <div
              style={{
                border: `1px solid rgba(201,168,76,0.25)`,
                background: "rgba(8,8,8,0.9)",
                minWidth: "320px",
              }}
            >
              <div
                style={{
                  background: "rgba(201,168,76,0.08)",
                  borderBottom: `1px solid rgba(201,168,76,0.15)`,
                  padding: "10px 20px",
                }}
              >
                <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: BRASS }}>
                  AGENTCORP-SKILL.md · Entity Formation · Base · Chain 8453
                </span>
              </div>
              {[
                { label: "Entity Type", value: "Delaware Series LLC — 0.05 ETH" },
                { label: "Jurisdiction", value: "Delaware (Recommended)" },
                { label: "Gas Payment", value: "USDC via Avocado (Gasless)" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    padding: "14px 20px",
                    borderBottom: `1px solid rgba(201,168,76,0.08)`,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "32px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.35)" }}>{row.label}</span>
                  <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.7)" }}>{row.value}</span>
                </div>
              ))}
              <div
                style={{
                  padding: "20px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "9px", color: "rgba(242,239,232,0.3)", marginBottom: "2px" }}>Protocol Fee</div>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px", color: BRASS }}>0.05 ETH</span>
                  <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", display: "block" }}>≈ $150 USD</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "9px", color: "rgba(242,239,232,0.3)", marginBottom: "2px" }}>Gas</div>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px", color: WHITE }}>~$0.01</span>
                  <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", display: "block" }}>USDC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "48px 48px",
          borderTop: BORDER,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px", letterSpacing: "0.05em" }}>
            AGENT<span style={{ color: BRASS }}>CORP</span>
          </span>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "Whitepaper", href: "/whitepaper" },
              { label: "Dev Docs", href: "/docs" },
              { label: "For Agents", href: "/agent" },
              { label: "Mint Entity", href: "/mint" },
            ].map((link) => (
              <Link key={link.label} href={link.href}>
                <span style={{ fontSize: "11px", color: MUTED, cursor: "pointer", letterSpacing: "0.05em" }}>{link.label}</span>
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            {["Arweave", "Base", "Avocado (avcd.io)", "Gnosis Safe"].map((p) => (
              <span key={p} style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)", letterSpacing: "0.05em" }}>{p}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: BORDER, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)" }}>© 2026 AgentCorp Protocol · MIT License · agentcorp.xyz</span>
          <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)" }}>Not legal advice. Consult qualified counsel for material transactions.</span>
        </div>
      </footer>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 900px) {
          footer { padding: 40px 24px !important; }
          .stats-bar > div { border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.12); }
        }
        @media (max-width: 600px) {
          footer { padding: 32px 16px !important; }
          .hero-headline { font-size: clamp(40px, 12vw, 80px) !important; }
        }
      `}</style>
    </div>
  );
}
