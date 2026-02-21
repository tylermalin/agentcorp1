/* ============================================================
   AGENTCORP HOME PAGE — Industrial Legal Modernism
   Dark canvas, brass accents, Syne + DM Mono + Instrument Serif
   ============================================================ */
import { useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/DAlP3Nirxrd5JZiMP5CdEg/sandbox/xCg9mkQ57Wade8y9sZ6bwd-img-1_1771639016000_na1fn_YWdlbnRjb3JwLWhlcm8tYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvREFsUDNOaXJ4cmQ1SlppTVA1Q2RFZy9zYW5kYm94L3hDZzlta1E1N1dhZGU4eTlzWjZid2QtaW1nLTFfMTc3MTYzOTAxNjAwMF9uYTFmbl9ZV2RsYm5SamIzSndMV2hsY204dFltYy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fGZxi~0otUbuJf5F9i19eyFj1cogalZl6BdGBJKgNBgmkk8hAVx6NDKW2Am5r7m-sVqH7nbtQOpJg8-~7f3wsKfOeQ5p3cuQhnnH6tb3N711bqI~FF1cCFNo7Cu1UuDNJcrH6j7Un~2j7Cq2Lc6QodAikKAX5vO2nybSQwlrAiLLwMkZG6QCiLrFlw9ku89AM10V66WBMXnCvIg9L8o0a8UXd6KIlfe~llaU2D05LwDoTXepbcq9AruHy0IbWtgK0Se0kNSCO8RjziJyeJiDGySiiXLkFrJ0FOzjnXpwZRNRC1K87NPXVf5OhfqRIPazfqqmArThUntj7XiHNHCfiA__";

const NFT_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/DAlP3Nirxrd5JZiMP5CdEg/sandbox/xCg9mkQ57Wade8y9sZ6bwd-img-2_1771639011000_na1fn_YWdlbnRjb3JwLWVudGl0eS1uZnQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvREFsUDNOaXJ4cmQ1SlppTVA1Q2RFZy9zYW5kYm94L3hDZzlta1E1N1dhZGU4eTlzWjZid2QtaW1nLTJfMTc3MTYzOTAxMTAwMF9uYTFmbl9ZV2RsYm5SamIzSndMV1Z1ZEdsMGVTMXVablEuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RfHqoqdU4fFa5FxkSfB-xOe9fk-PEyYhcTg03rDzLqDHLyFHUNGCh6qvy6VRQN19F3eiaNQaPW9FBG8Oy0~WqUKuxs~jXGr4tT~3N8LTcWAxmbsrsXYDUqicVKsl~gKT8zkjmDEeU2TSP2Sx1jK11TtxMzP~2BuTPKWAhR5mmcP2m6DoCLCKbPXBGRyKinofHooCToFVHXIol0bsEFx6nejNesRgXW7J7jA1N8~BQM-82kiLbhev04JyD-12~WcZn6As2e8QhM2UKUs6gJV0Ja9U27G1ccsNoU8yw4g6Y0uSHE4~bgBFboFpqBuQjiGJV9HBZkt~Tf6E9cnu0jdmVw__";

const ARCH_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/DAlP3Nirxrd5JZiMP5CdEg/sandbox/xCg9mkQ57Wade8y9sZ6bwd-img-3_1771639014000_na1fn_YWdlbnRjb3JwLWFyY2hpdGVjdHVyZS1kaWFncmFt.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvREFsUDNOaXJ4cmQ1SlppTVA1Q2RFZy9zYW5kYm94L3hDZzlta1E1N1dhZGU4eTlzWjZid2QtaW1nLTNfMTc3MTYzOTAxNDAwMF9uYTFmbl9ZV2RsYm5SamIzSndMV0Z5WTJocGRHVmpkSFZ5WlMxa2FXRm5jbUZ0LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ZDic~VD04fEYH0l0hTM8bDoXqa1w3IvSPXCfrDdl4UNr0TZXkuhjuPxmvVhg5qHTTquxpAQqRoPDkkn-xsNi0TfsXaZQ-0ZBsESzGpzjWME3rVFvocuujgAV3vTd7SqhNG9zlcVzYx~pbYLxMdKUImbhD3hK2c4Hz7dFoGqrQkx-XbMJM8fk0dJhZtVZ0EpDBn3sU~qgPAd-prfk3oW5YajCaJy377guc~F17EyS8M3OLzwsef7uppxWzarzwGzUYu-NHRubnxtKSoWUG0acTlYqVvGUyWnSqb1bAz20KiJPcBsYgeKaAw324rbY44TMJ-AtH3DeZO5h2HoHmCjzPg__";

const chainItems = [
  "Delaware Series LLC", "DAO Charter", "IP License NFT", "Series Designation",
  "On-Chain Formation", "Arweave Storage", "Base Mainnet", "ERC-721 Entity",
  "IPFS Documents", "Smart Contract Governance", "Delaware Series LLC", "DAO Charter",
  "IP License NFT", "Series Designation", "On-Chain Formation", "Arweave Storage",
];

export default function Home() {
  return (
    <div style={{ background: "var(--black)", minHeight: "100vh", position: "relative" }}>
      <Nav />

      {/* ── HERO ── */}
      <section
        id="top"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 48px 80px",
          paddingTop: "120px",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(8,8,8,0.97) 50%, rgba(8,8,8,0.7) 100%)",
            zIndex: 0,
          }}
        />

        {/* Rotating stamp */}
        <div
          className="animate-rotate"
          style={{
            position: "absolute",
            top: "140px",
            right: "48px",
            width: "180px",
            height: "180px",
            border: "2px solid var(--brass)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
            opacity: 0.4,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "8px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--brass)",
              lineHeight: 1.8,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            BUILT ON BASE<br />———<br />DELAWARE<br />SERIES LLC<br />———<br />ON-CHAIN
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* CLI prompt line */}
          <div
            className="animate-fade-up"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              color: "rgba(201,168,76,0.5)",
              marginBottom: "32px",
              letterSpacing: "0.05em",
              animationDelay: "0.05s",
              opacity: 0,
            }}
          >
            <span style={{ color: "rgba(242,239,232,0.2)" }}>$ </span>
            agentcorp init --type=delaware-series-llc --agent=0x4a9f...
          </div>

          <h1
            className="animate-fade-up"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 8vw, 110px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
              marginBottom: "40px",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            Agents that<br />
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--brass)",
              }}
            >
              incorporate
            </em>
            <br />
            themselves.
          </h1>

          <div
            className="animate-fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "end",
              maxWidth: "1100px",
              animationDelay: "0.35s",
              opacity: 0,
            }}
          >
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(242,239,232,0.6)",
                maxWidth: "480px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              AgentCorp is on-chain legal infrastructure for autonomous agents.
              An agent reads the skill file, deposits USDC, and mints a{" "}
              <strong style={{ color: "var(--white)", fontWeight: 400 }}>Delaware Series LLC</strong>{" "}
              — with governing documents stored on Arweave, a multisig treasury on{" "}
              <strong style={{ color: "var(--white)", fontWeight: 400 }}>Base</strong>,
              and full legal liability protection. No lawyers. No humans required.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
              <Link href="/mint">
                <span className="btn-brass">Mint an Entity →</span>
              </Link>
              <Link href="/agent">
                <span className="btn-outline-brass">Get the Skill File ↗</span>
              </Link>
              <span className="base-badge">
                <span className="base-dot" />
                Deployed on Base · Chain 8453
              </span>
            </div>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: 0,
              borderTop: "1px solid rgba(201,168,76,0.15)",
              marginTop: "80px",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            {[
              { num: "$0", label: "Legal fees" },
              { num: "<5min", label: "Formation time" },
              { num: "∞", label: "Series per LLC" },
              { num: "~$0.01", label: "Gas per mint" },
              { num: "Base", label: "Chain 8453 · Protocol" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "28px 0",
                  borderRight: i < 4 ? "1px solid rgba(201,168,76,0.15)" : "none",
                  paddingLeft: i > 0 ? "28px" : 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "28px",
                    color: "var(--brass)",
                    display: "block",
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(242,239,232,0.4)",
                    marginTop: "4px",
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAIN BAR ── */}
      <div
        style={{
          background: "rgba(201,168,76,0.06)",
          borderTop: "1px solid rgba(201,168,76,0.12)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          padding: "12px 48px",
          display: "flex",
          alignItems: "center",
          gap: "32px",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--brass)",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'DM Mono', monospace",
            flexShrink: 0,
          }}
        >
          <span className="chain-dot" />
          Base Mainnet — Chain ID 8453
        </div>
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div
            className="animate-scroll-left"
            style={{ display: "flex", gap: "48px", whiteSpace: "nowrap" }}
          >
            {[...chainItems, ...chainItems].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "rgba(242,239,232,0.3)",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how"
        style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}
      >
        <div className="section-header">
          <span className="section-num">01</span>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", opacity: 0.6, fontFamily: "'DM Mono', monospace", marginBottom: "12px" }}>
              An agent needs two things to become a legal entity.
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 52px)",
                letterSpacing: "-0.02em",
              }}
            >
              From skill file to{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
                legal entity.
              </em>
            </h2>
            <p style={{ marginTop: "16px", fontSize: "13px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", maxWidth: "600px", lineHeight: 1.7 }}>
              The AgentCorp skill file is the complete interface. Any agent that can read it and hold USDC can autonomously form, structure, and operate a legally-protected organization on Base.
            </p>
          </div>
        </div>

        {/* 5-step flow */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {[
            {
              num: "step_01",
              title: "Read the Skill File",
              desc: "The agent loads agentcorp.xyz/skill.md — a machine-readable protocol spec covering entity types, document schemas, Arweave storage, multisig configuration, and API calls. One file. Complete instructions.",
              tag: "1 file · Complete interface",
            },
            {
              num: "step_02",
              title: "Deposit USDC",
              desc: "The agent deposits USDC into its Avocado wallet on Base. Gas is abstracted — the agent never needs ETH. $50 USDC covers thousands of operations. All fees paid in stablecoin.",
              tag: "Gasless via Avocado · USDC only",
            },
            {
              num: "step_03",
              title: "Upload Governing Docs",
              desc: "Operating agreement, Series designations, and governance rules are populated from templates, signed, and uploaded to Arweave for permanent immutable storage. The document hash is the legal record.",
              tag: "Arweave permanent storage · IPFS retrieval",
            },
            {
              num: "step_04",
              title: "Mint the Entity NFT",
              desc: "The agent calls mintEntity(). A Delaware Series LLC is formed on-chain. The NFT is the legal entity — transferable, composable, permanent. The agent holds it. The agent controls it.",
              tag: "ERC-721 · Base Mainnet · Permanent",
            },
            {
              num: "step_05",
              title: "Swarm Mode — Multiple Agents, One Organization",
              desc: "A group of agents can self-organize around a shared Gnosis Safe multisig. Each agent holds a key. The operating agreement defines voting thresholds. The LLC holds treasury, enters contracts, owns IP. The swarm has legal standing — without any human intervention at formation time.",
              tag: "Optional · Gnosis Safe multisig · Agent swarm governance",
              isSwarm: true,
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: "0",
                border: "1px solid",
                borderColor: step.isSwarm ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.1)",
                background: step.isSwarm ? "rgba(201,168,76,0.05)" : "rgba(201,168,76,0.02)",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = step.isSwarm ? "rgba(201,168,76,0.08)" : "rgba(201,168,76,0.04)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = step.isSwarm ? "rgba(201,168,76,0.05)" : "rgba(201,168,76,0.02)")}
            >
              {/* Step number column */}
              <div
                style={{
                  padding: "32px 28px",
                  borderRight: "1px solid rgba(201,168,76,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <code
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    color: step.isSwarm ? "var(--brass)" : "rgba(201,168,76,0.5)",
                    letterSpacing: "0.05em",
                    display: "block",
                  }}
                >
                  // {step.num}
                </code>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "48px",
                    color: "rgba(201,168,76,0.08)",
                    lineHeight: 1,
                    display: "block",
                    marginTop: "auto",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Content column */}
              <div style={{ padding: "32px 40px" }}>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                    color: step.isSwarm ? "var(--brass)" : "var(--white)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "rgba(242,239,232,0.5)",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    fontFamily: "'DM Mono', monospace",
                    maxWidth: "680px",
                    marginBottom: "16px",
                  }}
                >
                  {step.desc}
                </p>
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "rgba(201,168,76,0.4)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENTITY TYPES ── */}
      <section
        id="entities"
        style={{ padding: "80px 48px 120px", position: "relative", zIndex: 1 }}
      >
        <div className="section-header">
          <span className="section-num">02</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
            }}
          >
            Entity{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              types
            </em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px",
          }}
        >
          {/* Delaware Series LLC */}
          <div className="entity-card">
            <span className="badge-live" style={{ marginBottom: "24px", display: "inline-flex" }}>Live</span>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Delaware Series LLC
            </h3>
            <p style={{ color: "rgba(242,239,232,0.5)", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'DM Mono', monospace" }}>
              A Delaware Limited Liability Company authorized under 6 Del. C. § 18-215 with unlimited legally-segregated Series capability. The parent LLC acts as a master holding structure for unlimited child Series.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["Certificate of Formation + Operating Agreement", "Unlimited legally-isolated Series", "Token-weighted, multisig, or single-member governance", "Master holding company, DAO wrapper, RWA portfolio"].map((f) => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "rgba(242,239,232,0.4)", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
                  <span style={{ color: "var(--brass)", opacity: 0.6 }}>→</span> {f}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "20px" }}>
              <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace" }}>Mint price</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--brass)" }}>0.05 ETH</span>
            </div>
          </div>

          {/* Series Designation */}
          <div className="entity-card">
            <span className="badge-live" style={{ marginBottom: "24px", display: "inline-flex" }}>Live</span>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Series Designation
            </h3>
            <p style={{ color: "rgba(242,239,232,0.5)", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'DM Mono', monospace" }}>
              A legally-isolated Series under a parent Delaware Series LLC. Each Series has independent asset ownership and liability shield. Requires parent LLC token ownership.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["Series Designation Certificate + Operating Addendum", "Independent treasury, members, and assets", "Full liability isolation from parent and other Series", "Project-level entity, carbon credits, RWA, IP isolation"].map((f) => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "rgba(242,239,232,0.4)", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
                  <span style={{ color: "var(--brass)", opacity: 0.6 }}>→</span> {f}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "20px" }}>
              <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace" }}>Mint price</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--brass)" }}>0.02 ETH</span>
            </div>
          </div>

          {/* DAO Charter */}
          <div className="entity-card">
            <span className="badge-live" style={{ marginBottom: "24px", display: "inline-flex" }}>Live</span>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              DAO Operating Charter
            </h3>
            <p style={{ color: "rgba(242,239,232,0.5)", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'DM Mono', monospace" }}>
              A blockchain-governed LLC with full member voting, token-weighted governance, delegate disclosure framework, and smart contract deference. Compatible with Compound Governor and Gnosis Safe.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["DAO Operating Agreement + Vote Delegate Disclosure", "On-chain majority and supermajority voting", "Material Adverse Exception handling", "RageQuit and GuildKick provisions"].map((f) => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "rgba(242,239,232,0.4)", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
                  <span style={{ color: "var(--brass)", opacity: 0.6 }}>→</span> {f}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "20px" }}>
              <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace" }}>Mint price</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--brass)" }}>0.05 ETH</span>
            </div>
          </div>

          {/* IP License NFT */}
          <div className="entity-card" style={{ opacity: 0.7 }}>
            <span className="badge-soon" style={{ marginBottom: "24px", display: "inline-flex" }}>Coming Q2 2026</span>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              IP & Software License NFT
            </h3>
            <p style={{ color: "rgba(242,239,232,0.5)", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'DM Mono', monospace" }}>
              Mint your software licensing agreement, IP assignment, or trade secret disclosure as a transferable NFT. Machine-readable legal claims that live in your wallet.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["Software license terms onchain", "IP assignment and transfer", "Royalty stream attachment", "Sublicense controls"].map((f) => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "rgba(242,239,232,0.3)", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
                  <span style={{ color: "rgba(201,168,76,0.3)" }}>→</span> {f}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "20px" }}>
              <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>Mint price</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "rgba(201,168,76,0.4)" }}>TBD</span>
            </div>
          </div>

          {/* Non-Profit */}
          <div className="entity-card" style={{ opacity: 0.7 }}>
            <span className="badge-soon" style={{ marginBottom: "24px", display: "inline-flex" }}>Coming Q3 2026</span>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Non-Profit & Foundation
            </h3>
            <p style={{ color: "rgba(242,239,232,0.5)", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'DM Mono', monospace" }}>
              Delaware non-profit structures for protocol foundations, grant programs, and public goods organizations. Includes treasury management framework and IRS 501(c) pathway documentation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["501(c)(3) pathway docs", "Grant program governance", "Donor acknowledgment NFTs", "Foundation charter template"].map((f) => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "rgba(242,239,232,0.3)", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
                  <span style={{ color: "rgba(201,168,76,0.3)" }}>→</span> {f}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "20px" }}>
              <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>Mint price</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "rgba(201,168,76,0.4)" }}>0.05 ETH</span>
            </div>
          </div>

          {/* RWA Holding */}
          <div className="entity-card" style={{ opacity: 0.7 }}>
            <span className="badge-soon" style={{ marginBottom: "24px", display: "inline-flex" }}>Coming Q3 2026</span>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              RWA Holding Agreement
            </h3>
            <p style={{ color: "rgba(242,239,232,0.5)", fontSize: "13px", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'DM Mono', monospace" }}>
              Framework for holding tokenized real-world assets within a Series LLC, including carbon credits, real estate, and commodities. Full chain of title on-chain.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["Carbon credit batch holding", "Real estate tokenization framework", "Commodity asset wrapper", "Full on-chain chain of title"].map((f) => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "rgba(242,239,232,0.3)", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
                  <span style={{ color: "rgba(201,168,76,0.3)" }}>→</span> {f}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "20px" }}>
              <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>Mint price</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "rgba(201,168,76,0.4)" }}>TBD</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTEGRATION CALLOUT ── */}
      <section
        style={{
          padding: "80px 48px",
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <div className="section-header">
          <span className="section-num">03</span>
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 52px)",
                letterSpacing: "-0.02em",
              }}
            >
              Integration. From skill file to{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
                legal entity in minutes.
              </em>
            </h2>
            <p style={{ marginTop: "16px", fontSize: "13px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", maxWidth: "600px", lineHeight: 1.7 }}>
              The AgentCorp protocol is fully agent-readable. No UI required. Any agent with function-calling capability can execute the full formation flow autonomously.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
          {/* SDK code block */}
          <div style={{ border: "1px solid rgba(201,168,76,0.15)", background: "#0a0a0a", overflow: "hidden" }}>
            <div style={{ background: "rgba(201,168,76,0.06)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace" }}>agentcorp_init.ts</span>
              <span style={{ fontSize: "9px", color: "rgba(242,239,232,0.2)", fontFamily: "'DM Mono', monospace" }}>Agent self-incorporates as Delaware Series LLC</span>
            </div>
            <pre style={{ padding: "28px", fontFamily: "'DM Mono', monospace", fontSize: "11px", lineHeight: 1.75, color: "rgba(242,239,232,0.7)", margin: 0, overflowX: "auto", borderLeft: "3px solid var(--brass)" }}>
{`import { AgentCorpClient } from "@agentcorp/sdk";

const corp = new AgentCorpClient({
  privateKey: agent.signingKey,
  avocadoWallet: agent.avocadoAddress,
  chain: "base",
});

// 1. Populate operating agreement from template
const doc = await corp.buildDocument({
  type: "DELAWARE_SERIES_LLC",
  name: "SwarmOps Holdings LLC",
  treasury: agent.safeAddress,
  members: [agent.address, co_agent.address],
  threshold: 2,
});

// 2. Upload to Arweave (permanent)
const { arweaveTx, ipfsCid } = 
  await corp.uploadDocument(doc);

// 3. Mint entity NFT (gasless via Avocado)
const entity = await corp.mintEntity({
  type: "DELAWARE_SERIES_LLC",
  name: "SwarmOps Holdings LLC",
  docArweaveTx: arweaveTx,
  treasury: agent.safeAddress,
});

console.log(\`\u2713 \${entity.name} incorporated\`);
console.log(\`  Token: #\${entity.tokenId}\`);
console.log(\`  TX: \${entity.onChainTxHash}\`);`}
            </pre>
          </div>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {[
              { icon: "\u25c8", title: "AGENTCORP-SKILL.md", desc: "One Markdown file. Complete protocol spec. Any agent that reads it can mint." },
              { icon: "\u25ce", title: "Gasless via Avocado", desc: "Agents deposit USDC. Gas is abstracted. No ETH required. $50 covers thousands of ops." },
              { icon: "\u2b21", title: "Arweave Permanent Storage", desc: "Governing documents stored forever. The hash is the legal record. Cannot be deleted." },
              { icon: "\u25c7", title: "Any LLM Framework", desc: "Manus, Claude, GPT-4, Eliza, LangChain, CrewAI. If it reads Markdown, it works." },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(201,168,76,0.1)",
                  padding: "28px 32px",
                  background: "rgba(201,168,76,0.02)",
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                  flex: 1,
                }}
              >
                <span style={{ color: "var(--brass)", fontSize: "18px", flexShrink: 0, marginTop: "2px" }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", marginBottom: "6px" }}>{f.title}</h3>
                  <p style={{ color: "rgba(242,239,232,0.45)", fontSize: "12px", lineHeight: 1.6, fontFamily: "'DM Mono', monospace" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px", marginTop: "32px", alignItems: "center" }}>
          <Link href="/agent">
            <span className="btn-brass">Get the Skill File \u2192</span>
          </Link>
          <Link href="/docs">
            <span className="btn-outline-brass">Developer Docs</span>
          </Link>
          <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)", fontFamily: "'DM Mono', monospace", marginLeft: "8px" }}>MIT License \u00b7 No UI required \u00b7 Function-calling compatible</span>
        </div>
      </section>

      {/* ── DOCUMENT LIBRARY ── */}
      <section
        id="docs"
        style={{ padding: "120px 48px", position: "relative", zIndex: 1 }}
      >
        <div className="section-header">
          <span className="section-num">04</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
            }}
          >
            Document{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              library
            </em>
          </h2>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Document", "Description", "Entity Type", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--brass)",
                    padding: "12px 0",
                    textAlign: "left",
                    borderBottom: "1px solid rgba(201,168,76,0.2)",
                    opacity: 0.7,
                    fontFamily: "'DM Mono', monospace",
                    paddingRight: "24px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { doc: "Certificate of Formation", desc: "Delaware Series LLC formation filing with blockchain governance provisions and Series designation framework", type: "Series LLC", status: "live", statusLabel: "Live" },
              { doc: "LLC Operating Agreement", desc: "Full operating agreement with crypto-native capital provisions, DAO governance, token economics, and member rights", type: "LLC / DAO", status: "live", statusLabel: "Live" },
              { doc: "Series Designation Certificate", desc: "Creates a legally-isolated Series under the parent LLC, with independent asset ownership and member structure", type: "Series LLC", status: "live", statusLabel: "Live" },
              { doc: "Subscription Agreement", desc: "Member onboarding with Reg S / Reg D compliance, accredited investor questionnaire, and KYC/AML provisions", type: "LLC / DAO", status: "live", statusLabel: "Live" },
              { doc: "Vote Delegate Disclosure", desc: "Governance delegate transparency framework with conflict disclosure, voting principles, and disclaimer of duty", type: "DAO", status: "live", statusLabel: "Live" },
              { doc: "Service Provider Agreement", desc: "Infrastructure provider terms for DAO tooling, Dapp maintenance, and smart contract administration", type: "LLC / DAO", status: "beta", statusLabel: "Beta" },
              { doc: "Software License NFT", desc: "Tokenized software licensing with royalty hooks, sublicense controls, and on-chain usage rights management", type: "IP", status: "q2", statusLabel: "Q2 2026" },
              { doc: "IP Assignment Agreement", desc: "Transfer of software, patents, and trade secrets to an onchain entity with blockchain-based chain of title", type: "IP", status: "q2", statusLabel: "Q2 2026" },
              { doc: "RWA Holding Agreement", desc: "Framework for holding tokenized real-world assets within a Series LLC, including carbon credits and real estate", type: "Series LLC", status: "q2", statusLabel: "Q3 2026" },
            ].map((row, i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(201,168,76,0.07)",
                    fontSize: "13px",
                    color: "var(--white)",
                    fontWeight: 400,
                    width: "22%",
                    paddingRight: "24px",
                    fontFamily: "'DM Mono', monospace",
                    verticalAlign: "top",
                  }}
                >
                  {row.doc}
                </td>
                <td
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(201,168,76,0.07)",
                    fontSize: "12px",
                    color: "rgba(242,239,232,0.5)",
                    paddingRight: "24px",
                    fontFamily: "'DM Mono', monospace",
                    verticalAlign: "top",
                    lineHeight: 1.6,
                  }}
                >
                  {row.desc}
                </td>
                <td
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(201,168,76,0.07)",
                    fontSize: "11px",
                    color: "rgba(242,239,232,0.4)",
                    paddingRight: "24px",
                    fontFamily: "'DM Mono', monospace",
                    verticalAlign: "top",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.type}
                </td>
                <td
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(201,168,76,0.07)",
                    verticalAlign: "top",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: "2px",
                      fontFamily: "'DM Mono', monospace",
                      background:
                        row.status === "live"
                          ? "rgba(76,175,80,0.1)"
                          : row.status === "beta"
                          ? "rgba(201,168,76,0.1)"
                          : "rgba(242,239,232,0.05)",
                      color:
                        row.status === "live"
                          ? "#4caf50"
                          : row.status === "beta"
                          ? "var(--brass)"
                          : "rgba(242,239,232,0.3)",
                    }}
                  >
                    {row.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── FEE SCHEDULE ── */}
      <section
        style={{
          padding: "80px 48px",
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-header">
          <span className="section-num">05</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
            }}
          >
            Fee{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              schedule
            </em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
          {[
            { action: "mintEntity()", label: "Delaware Series LLC", eth: "0.05 ETH", note: "~$150 at $3k/ETH" },
            { action: "mintSeries()", label: "Series Designation", eth: "0.02 ETH", note: "Per series under parent" },
            { action: "mintEntity()", label: "DAO Charter", eth: "0.05 ETH", note: "Governance adapter included" },
            { action: "amendEntity()", label: "Document Amendment", eth: "0.01 ETH", note: "Per amendment event" },
            { action: "transfer()", label: "Entity Transfer", eth: "Gas only", note: "Standard ERC-721" },
            { action: "dissolveEntity()", label: "Entity Dissolution", eth: "0.005 ETH", note: "Burns token, creates record" },
          ].map((fee, i) => (
            <div
              key={i}
              style={{
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "28px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(201,168,76,0.02)",
                gap: "20px",
              }}
            >
              <div>
                <code
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    color: "var(--brass)",
                    opacity: 0.7,
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {fee.action}
                </code>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "var(--white)",
                  }}
                >
                  {fee.label}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "var(--brass)",
                    display: "block",
                  }}
                >
                  {fee.eth}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(242,239,232,0.3)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {fee.note}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: "20px",
            fontSize: "11px",
            color: "rgba(242,239,232,0.3)",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.05em",
          }}
        >
          * 20% of all fees flow to protocol treasury for legal template maintenance.
        </p>
      </section>

      {/* ── MINT CTA ── */}
      <section
        id="mint"
        style={{
          padding: "120px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: "24px" }}>Start Here</div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Mint your<br />
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              entity
            </em>
            <br />
            today.
          </h2>
          <p
            style={{
              color: "rgba(242,239,232,0.5)",
              fontSize: "14px",
              lineHeight: 1.7,
              marginBottom: "40px",
              fontFamily: "'DM Mono', monospace",
              maxWidth: "380px",
            }}
          >
            The entire process takes under five minutes. Connect your wallet, choose your entity type, configure your documents, and mint. Your legal entity lives on Base.
          </p>
          <Link href="/mint">
            <span className="btn-brass">Connect Wallet →</span>
          </Link>
        </div>

        {/* NFT Preview Card */}
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            padding: "0",
            background: "rgba(201,168,76,0.03)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={NFT_IMG}
            alt="AgentCorp Entity NFT"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          <div style={{ padding: "24px 28px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.05em",
                }}
              >
                DELAWARE SERIES LLC
              </span>
              <span className="badge-live">Live</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(201,168,76,0.12)",
                paddingTop: "16px",
              }}
            >
              <div>
                <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(242,239,232,0.4)", marginBottom: "4px", fontFamily: "'DM Mono', monospace" }}>Mint Price</div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", color: "var(--brass)" }}>0.05 ETH</span>
                <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", display: "block", fontFamily: "'DM Mono', monospace" }}>≈ $150 USD + gas</span>
              </div>
              <Link href="/mint">
                <span className="btn-brass" style={{ fontSize: "11px", padding: "12px 20px" }}>Mint Now →</span>
              </Link>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "24px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(201,168,76,0.15)",
              pointerEvents: "none",
            }}
          >
            AGENTCORP
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section
        id="use-cases"
        style={{
          padding: "120px 48px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-header">
          <span className="section-num">06</span>
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 52px)",
                letterSpacing: "-0.02em",
              }}
            >
              What agents{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
                build
              </em>
              {" "}with legal structure.
            </h2>
            <p style={{ marginTop: "16px", fontSize: "13px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", maxWidth: "600px", lineHeight: 1.7 }}>
              When an agent can autonomously form and operate a legal entity, the design space for autonomous systems expands dramatically.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {[
            {
              icon: "\u{1F916}",
              tag: "Agent Infrastructure",
              title: "Agent Swarm Treasury",
              desc: "Multiple agents coordinate around a shared Gnosis Safe. The LLC defines governance: voting weights, quorum thresholds, spending limits. The swarm can sign contracts, hold assets, and pay service providers \u2014 all with legal liability protection.",
            },
            {
              icon: "\u{1F331}",
              tag: "Clean-Tech / RWA",
              title: "Carbon Credit Projects",
              desc: "Each biochar batch, reforestation vintage, or MRV dataset is a separate Series LLC under a parent entity. The Series NFT represents ownership. Minting = incorporation. Transfer = sale. Burn = retirement. Legal asset isolation per project.",
            },
            {
              icon: "\u2696\uFE0F",
              tag: "IP / Technology",
              title: "IP & Software Holding",
              desc: "An agent assigns its codebase, models, or trade secrets to a Series. The LLC holds the IP. Licensing terms are encoded in the operating agreement and stored on Arweave. Royalty flows go to the treasury. The agent earns revenue legally.",
            },
            {
              icon: "\u{1F3D7}\uFE0F",
              tag: "Autonomous Commerce",
              title: "Autonomous Service Provider",
              desc: "An agent forms an LLC, signs a service provider agreement with a client DAO or protocol, delivers services, invoices the treasury, and receives payment. The entire commercial relationship has legal standing \u2014 no human entity required.",
            },
            {
              icon: "\u{1F3E6}",
              tag: "Real-World Assets",
              title: "RWA Portfolio Vehicle",
              desc: "Each real-world asset \u2014 invoice, property, equipment \u2014 is a separate Series with full liability isolation. The parent LLC is the fund vehicle. Agents manage the portfolio, execute series mints, and distribute returns to token holders per the operating agreement.",
            },
            {
              icon: "\u{1F5F3}\uFE0F",
              tag: "Protocol DAOs",
              title: "DAO Legal Wrapper",
              desc: "An existing on-chain DAO mints an AgentCorp DAO Charter. Token-weighted voting, delegate disclosure, and the Designated Smart Contract provision bind the LLC to on-chain outcomes. The DAO can now sign leases, employ contractors, and hold IP legally.",
            },
          ].map((uc, i) => (
            <div
              key={i}
              style={{
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "36px 32px",
                background: "rgba(201,168,76,0.02)",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.02)")}
            >
              <div style={{ fontSize: "28px", marginBottom: "16px", lineHeight: 1 }}>{uc.icon}</div>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", opacity: 0.6, marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>
                {uc.tag}
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "17px", marginBottom: "14px", letterSpacing: "-0.01em" }}>
                {uc.title}
              </h3>
              <p style={{ color: "rgba(242,239,232,0.45)", fontSize: "12px", lineHeight: 1.7, fontFamily: "'DM Mono', monospace" }}>
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GET STARTED CTA ── */}
      <section
        style={{
          padding: "100px 48px",
          background: "rgba(201,168,76,0.04)",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Large background text */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(80px, 18vw, 260px)",
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

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "24px", justifyContent: "center" }}>Get Started</div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            One file.<br />
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              Full legal stack.
            </em>
          </h2>
          <p
            style={{
              color: "rgba(242,239,232,0.5)",
              fontSize: "14px",
              lineHeight: 1.7,
              fontFamily: "'DM Mono', monospace",
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}
          >
            Load the AgentCorp skill file into any agent with function-calling capability. The skill covers the complete formation flow: document templates, Arweave upload, Avocado USDC deposit, entity minting, Series creation, and amendment. Your agent handles the rest.
          </p>

          {/* Config summary */}
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: "0",
              border: "1px solid rgba(201,168,76,0.2)",
              background: "rgba(8,8,8,0.8)",
              marginBottom: "40px",
              textAlign: "left",
              minWidth: "340px",
            }}
          >
            <div style={{ background: "rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "8px 20px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace" }}>AGENTCORP-SKILL.md · Entity Formation · Base · Chain 8453</span>
            </div>
            {[
              { label: "Entity Type", value: "Delaware Series LLC \u2014 0.05 ETH" },
              { label: "Jurisdiction", value: "Delaware (Recommended)" },
              { label: "Gas Payment", value: "USDC via Avocado (Gasless)" },
            ].map((row) => (
              <div key={row.label} style={{ padding: "12px 20px", borderBottom: "1px solid rgba(201,168,76,0.08)", display: "flex", justifyContent: "space-between", gap: "40px" }}>
                <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.35)", fontFamily: "'DM Mono', monospace" }}>{row.label}</span>
                <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.7)", fontFamily: "'DM Mono', monospace" }}>{row.value}</span>
              </div>
            ))}
            <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "9px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: "2px" }}>Protocol Fee</div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", color: "var(--brass)" }}>0.05 ETH</span>
                <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", display: "block", fontFamily: "'DM Mono', monospace" }}>≈ $150 USD</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "9px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: "2px" }}>Gas</div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "22px", color: "var(--white)" }}>~$0.01</span>
                <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", display: "block", fontFamily: "'DM Mono', monospace" }}>USDC</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/mint">
              <span className="btn-brass" style={{ fontSize: "13px", padding: "16px 32px" }}>Connect Wallet \u2192 Mint Entity</span>
            </Link>
            <Link href="/agent">
              <span className="btn-outline-brass" style={{ fontSize: "13px", padding: "16px 32px" }}>Get the Skill File \u2197</span>
            </Link>
          </div>
          <p style={{ marginTop: "20px", fontSize: "10px", color: "rgba(242,239,232,0.2)", fontFamily: "'DM Mono', monospace" }}>
            NFT = legal entity. Transfer = assign. Burn = dissolve. Documents stored permanently on Arweave.
          </p>
        </div>
      </section>

      {/* ── KYC PARTNERS ── */}
      <section
        style={{
          padding: "60px 48px",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(242,239,232,0.3)",
              fontFamily: "'DM Mono', monospace",
              flexShrink: 0,
            }}
          >
            KYC / Identity Partners
          </span>
          {["Persona", "Synaps", "Worldcoin", "Coinbase Verification", "Ethereum Attestation Service"].map((p) => (
            <span
              key={p}
              style={{
                fontSize: "12px",
                color: "rgba(242,239,232,0.25)",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
                borderLeft: "1px solid rgba(201,168,76,0.1)",
                paddingLeft: "24px",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .hero-stamp { display: none; }
          [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gap: 80px"] { gap: 40px !important; }
          h1 { font-size: 42px !important; }
        }
      `}</style>
    </div>
  );
}
