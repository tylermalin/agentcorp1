/**
 * AGENTCORP SHARED NAV — Persistent across all pages
 * Design: Industrial Legal Modernism
 * - Near-black (#080808) with brass (#c9a84c) accent
 * - DM Mono for nav links, Syne 800 for logo
 * - Fixed top, backdrop blur, active-page highlighting
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const BRASS = "#c9a84c";
const WHITE = "#f2efe8";
const MUTED = "rgba(242,239,232,0.45)";
const BLACK = "#080808";

const NAV_LINKS = [
  { label: "Protocol", href: "/#protocol" },
  { label: "Integration", href: "/#integration" },
  { label: "Use Cases", href: "/#usecases" },
  { label: "Entities", href: "/#entities" },
  { label: "For Agents", href: "/agent" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Dev Docs", href: "/docs" },
];

export default function Nav() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location === "/";
    return location === href || location.startsWith(href + "/");
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px, 4vw, 48px)",
          height: "64px",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          background: scrolled
            ? "rgba(8,8,8,0.97)"
            : "rgba(8,8,8,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background 0.3s",
        }}
      >
        {/* Logo */}
        <Link href="/">
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              letterSpacing: "0.06em",
              color: WHITE,
              cursor: "pointer",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            AGENT<span style={{ color: BRASS }}>CORP</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div
          className="nav-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            const isAnchor = link.href.startsWith("/#");
            const linkStyle: React.CSSProperties = {
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: active ? BRASS : MUTED,
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
              fontFamily: "'DM Mono', monospace",
              whiteSpace: "nowrap",
              paddingBottom: "2px",
              borderBottom: active ? `1px solid ${BRASS}` : "1px solid transparent",
              cursor: "pointer",
            };

            if (isAnchor) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = WHITE;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = active ? BRASS : MUTED;
                  }}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link key={link.label} href={link.href}>
                <span
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = active ? BRASS : WHITE;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = active ? BRASS : MUTED;
                  }}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right: Mint CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
          <Link href="/mint">
            <span
              className="nav-mint-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                border: `1px solid rgba(201,168,76,0.35)`,
                color: BRASS,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "9px 18px",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
                whiteSpace: "nowrap",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = BRASS;
                (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 6px #f59e0b", display: "inline-block", flexShrink: 0 }} />
              Mint — Q2 2026
            </span>
          </Link>

          {/* Hamburger — shown only on mobile via CSS */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: `1px solid rgba(201,168,76,0.3)`,
              color: BRASS,
              padding: "7px 12px",
              cursor: "pointer",
              fontSize: "10px",
              letterSpacing: "0.12em",
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 199,
            background: "rgba(8,8,8,0.99)",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            padding: "16px 32px 24px",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const active = isActive(link.href);
            const mobileStyle: React.CSSProperties = {
              display: "block",
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: active ? BRASS : MUTED,
              textDecoration: "none",
              textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace",
              padding: "13px 0",
              borderBottom: "1px solid rgba(201,168,76,0.07)",
              cursor: "pointer",
            };
            if (isAnchor) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  style={mobileStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link key={link.label} href={link.href}>
                <span
                  style={mobileStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
          <Link href="/mint">
            <span
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "1px solid rgba(201,168,76,0.3)",
                color: BRASS,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "14px",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "12px",
                background: "transparent",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 6px #f59e0b", display: "inline-block" }} />
              Mint — Coming Q2 2026
            </span>
          </Link>
        </div>
      )}

      {/* Spacer so content starts below the fixed nav */}
      <div style={{ height: "64px" }} />

      <style>{`
        @media (max-width: 1100px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (max-width: 600px) {
          .nav-mint-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}
