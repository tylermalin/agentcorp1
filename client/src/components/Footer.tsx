/* ============================================================
   AGENTCORP FOOTER — Industrial Legal Modernism
   ============================================================ */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(201,168,76,0.12)",
        padding: "48px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "32px",
          marginBottom: "40px",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "18px",
              letterSpacing: "0.15em",
              color: "var(--brass)",
              marginBottom: "12px",
            }}
          >
            AGENT<span style={{ color: "var(--white)", opacity: 0.2, fontWeight: 400 }}>CORP</span>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(242,239,232,0.3)",
              maxWidth: "280px",
              lineHeight: 1.6,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            On-chain legal infrastructure for the decentralized economy. Built on Base.
          </p>
          <div style={{ marginTop: "16px" }}>
            <span className="base-badge">
              <span className="base-dot" />
              Base Mainnet · Chain ID 8453
            </span>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brass)",
                opacity: 0.6,
                marginBottom: "16px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Protocol
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/#how", label: "How It Works" },
                { href: "/#entities", label: "Entity Types" },
                { href: "/#docs", label: "Document Library" },
                { href: "/mint", label: "Mint Entity" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      color: "rgba(242,239,232,0.3)",
                      textDecoration: "none",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      fontFamily: "'DM Mono', monospace",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brass)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,239,232,0.3)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brass)",
                opacity: 0.6,
                marginBottom: "16px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Resources
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "/whitepaper", label: "Whitepaper" },
                { href: "/docs", label: "Developer Docs" },
                { href: "https://www.agentscorp.xyz/docs", label: "Full Docs ↗" },
                { href: "https://github.com/tylermalin/agentcorp1", label: "GitHub ↗" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      color: "rgba(242,239,232,0.3)",
                      textDecoration: "none",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      fontFamily: "'DM Mono', monospace",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brass)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,239,232,0.3)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brass)",
                opacity: 0.6,
                marginBottom: "16px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Community
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "#", label: "Discord" },
                { href: "#", label: "Twitter / X" },
                { href: "#", label: "Telegram" },
                { href: "#", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: "rgba(242,239,232,0.3)",
                      textDecoration: "none",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      fontFamily: "'DM Mono', monospace",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brass)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,239,232,0.3)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(201,168,76,0.08)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(242,239,232,0.2)",
            letterSpacing: "0.05em",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          © 2026 AgentCorp Protocol · Built on Base · Delaware Registered · Open Source · MIT License
        </p>
        <p
          style={{
            fontSize: "10px",
            color: "rgba(242,239,232,0.15)",
            letterSpacing: "0.05em",
            fontFamily: "'DM Mono', monospace",
            maxWidth: "500px",
            textAlign: "right",
          }}
        >
          Not legal advice. AgentCorp provides legal document templates and infrastructure. Consult qualified legal counsel for your specific situation.
        </p>
      </div>
    </footer>
  );
}
