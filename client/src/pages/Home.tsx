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
          <div
            className="animate-fade-up eyebrow"
            style={{ marginBottom: "28px", animationDelay: "0.1s", opacity: 0 }}
          >
            On-Chain Legal Infrastructure
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
              animationDelay: "0.25s",
              opacity: 0,
            }}
          >
            Mint your<br />
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--brass)",
              }}
            >
              legal entity.
            </em>
            <br />
            Own it forever.
          </h1>

          <div
            className="animate-fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "end",
              maxWidth: "1100px",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(242,239,232,0.6)",
                maxWidth: "420px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              AGENTCORP is the open legal infrastructure layer for the onchain economy.
              Incorporate a <strong style={{ color: "var(--white)", fontWeight: 400 }}>Delaware Series LLC</strong>,
              hold IP, assign rights, and govern your organization — all minted as an NFT on{" "}
              <strong style={{ color: "var(--white)", fontWeight: 400 }}>Base</strong>,
              stored permanently on IPFS and Arweave.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
              <Link href="/mint">
                <span className="btn-brass">Mint an Entity →</span>
              </Link>
              <Link href="/whitepaper">
                <span className="btn-outline-brass">Read the Whitepaper</span>
              </Link>
              <span className="base-badge">
                <span className="base-dot" />
                Deployed on Base
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
              animationDelay: "0.55s",
              opacity: 0,
            }}
          >
            {[
              { num: "$0", label: "Lawyer Required" },
              { num: "<5min", label: "To Incorporate" },
              { num: "∞", label: "Series per LLC" },
              { num: "100%", label: "On-Chain Records" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "28px 0",
                  borderRight: i < 3 ? "1px solid rgba(201,168,76,0.15)" : "none",
                  paddingLeft: i > 0 ? "28px" : 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "32px",
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
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
            }}
          >
            How it{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              works
            </em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
        >
          {[
            {
              num: "01",
              icon: "⬡",
              title: "Connect Wallet",
              desc: "Connect your Base-compatible wallet (MetaMask, Coinbase Wallet, Rainbow). No account creation. Your wallet IS your identity.",
            },
            {
              num: "02",
              icon: "◈",
              title: "Configure Entity",
              desc: "Choose your entity type — Delaware Series LLC, DAO Charter, or Series Designation. Set governance, treasury address, and member structure.",
            },
            {
              num: "03",
              icon: "◎",
              title: "Mint & Incorporate",
              desc: "Pay in ETH on Base. Your governing documents are generated, uploaded to Arweave and IPFS, and the NFT is minted to your wallet. You're incorporated.",
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                background: "rgba(201,168,76,0.03)",
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "48px 36px",
                position: "relative",
                transition: "background 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.06)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.03)")
              }
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "72px",
                  color: "rgba(201,168,76,0.08)",
                  lineHeight: 1,
                  position: "absolute",
                  top: "20px",
                  right: "24px",
                }}
              >
                {step.num}
              </span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid var(--brass)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "28px",
                  color: "var(--brass)",
                  fontSize: "18px",
                }}
              >
                {step.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  marginBottom: "16px",
                  letterSpacing: "-0.01em",
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
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Architecture image */}
        <div style={{ marginTop: "60px", position: "relative" }}>
          <img
            src={ARCH_IMG}
            alt="AgentCorp Protocol Architecture"
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              objectPosition: "center",
              border: "1px solid rgba(201,168,76,0.12)",
              opacity: 0.85,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "24px",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(242,239,232,0.4)",
              fontFamily: "'DM Mono', monospace",
              background: "rgba(8,8,8,0.8)",
              padding: "4px 10px",
            }}
          >
            Protocol Architecture — Wallet → Smart Contract → Arweave/IPFS → NFT
          </div>
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

      {/* ── BENEFITS ── */}
      <section
        style={{
          padding: "80px 48px 120px",
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-header">
          <span className="section-num">03</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
            }}
          >
            Why{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              onchain
            </em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "60px",
          }}
        >
          {[
            {
              num: "I",
              title: "Paperwork Lives in Your Wallet",
              desc: "Your certificate of formation, operating agreement, and all amendments are attached to your NFT. Show your legal status to any counterparty by sharing your wallet address. Readable by humans and machines.",
            },
            {
              num: "II",
              title: "Fully Online Incorporation",
              desc: "Pay in ETH or USDC on Base. Control exactly what information you disclose. Your legal status becomes machine-readable and composable with any DeFi protocol, DAO, or smart contract system.",
            },
            {
              num: "III",
              title: "Permanent Secure Recordkeeping",
              desc: "Documents are uploaded to Arweave for permanent storage and IPFS for distributed access. The blockchain record cannot be altered or hacked. Every amendment creates an immutable audit trail.",
            },
          ].map((b) => (
            <div key={b.num}>
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "48px",
                  color: "rgba(201,168,76,0.2)",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                {b.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  marginBottom: "14px",
                  letterSpacing: "0.02em",
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  color: "rgba(242,239,232,0.45)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
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
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
            }}
          >
            Use{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              cases
            </em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
          {[
            {
              num: "01",
              title: "Carbon Credit Projects",
              tag: "Clean-Tech / RWA",
              steps: [
                "Mint DELAWARE_SERIES_LLC as master holding entity",
                "Mint one SERIES per carbon credit batch or vintage",
                "Series NFT = legally-recognized ownership of that credit batch",
                "Transfer Series NFT = sell the carbon credit batch",
                "Burn Series NFT = retire the carbon credits",
              ],
              example: "Mālama Climate Holdings LLC → Series: AgEnergy Hawaii Biochar 2026",
            },
            {
              num: "02",
              title: "RWA Portfolio",
              tag: "Real-World Assets",
              steps: [
                "Mint DELAWARE_SERIES_LLC as parent fund entity",
                "Mint SERIES_DESIGNATION per individual asset",
                "Series A: real estate parcel, Series B: invoice receivables",
                "Investors receive tokens representing Series membership interests",
                "Full liability isolation between assets in each Series",
              ],
              example: "Fund LLC → Series A: Property, Series B: Receivables, Series C: Equipment",
            },
            {
              num: "03",
              title: "Software IP Holding",
              tag: "IP / Technology",
              steps: [
                "Mint DELAWARE_SERIES_LLC as IP holding company",
                "Series A: Core platform codebase IP",
                "Series B: Trade secrets and proprietary algorithms",
                "Series C: Brand and trademark portfolio",
                "IP_LICENSE NFT (Q2 2026) governs usage rights per asset",
              ],
              example: "IP Holdings LLC → Series per IP asset → Royalties flow to Series treasury",
            },
            {
              num: "04",
              title: "DAO Entity Wrapper",
              tag: "Protocol DAOs",
              steps: [
                "Mint DAO_CHARTER with your existing governor address",
                "DAO's on-chain governance now legally binds the entity",
                "Members sign subscription agreement to join",
                "DAO can now sign contracts, hold property, employ people",
                "Compatible with Compound Governor and Gnosis Safe",
              ],
              example: "Protocol DAO LLC → designatedContract: existing governor → treasury: DAO Safe",
            },
          ].map((uc) => (
            <div
              key={uc.num}
              style={{
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "48px 40px",
                background: "rgba(201,168,76,0.02)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "24px",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "72px",
                  color: "rgba(201,168,76,0.05)",
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                {uc.num}
              </span>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: "var(--brass)",
                  opacity: 0.6,
                  marginBottom: "12px",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {uc.tag}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  marginBottom: "24px",
                  letterSpacing: "-0.01em",
                }}
              >
                {uc.title}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
                {uc.steps.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "12px",
                      color: "rgba(242,239,232,0.45)",
                      fontFamily: "'DM Mono', monospace",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "var(--brass)", opacity: 0.5, flexShrink: 0, marginTop: "1px" }}>{i + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(201,168,76,0.08)",
                  paddingTop: "16px",
                  fontSize: "10px",
                  color: "rgba(242,239,232,0.25)",
                  fontFamily: "'DM Mono', monospace",
                  lineHeight: 1.5,
                  letterSpacing: "0.03em",
                }}
              >
                {uc.example}
              </div>
            </div>
          ))}
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
