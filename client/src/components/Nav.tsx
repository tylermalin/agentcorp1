/* ============================================================
   AGENTCORP NAV — Industrial Legal Modernism
   Fixed top nav with brass/gold accents, monospace type
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#how", label: "How It Works" },
    { href: "/#entities", label: "Entities" },
    { href: "/#use-cases", label: "Use Cases" },
    { href: "/whitepaper", label: "Whitepaper" },
    { href: "/docs", label: "Dev Docs" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        background: scrolled ? "rgba(8,8,8,0.95)" : "rgba(8,8,8,0.85)",
        backdropFilter: "blur(12px)",
        transition: "background 0.3s",
      }}
    >
      {/* Logo */}
      <Link href="/">
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "20px",
            letterSpacing: "0.15em",
            color: "var(--brass)",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          AGENT
          <span style={{ color: "var(--white)", opacity: 0.4, fontWeight: 400 }}>
            CORP
          </span>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul
        style={{
          display: "flex",
          gap: "36px",
          listStyle: "none",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
        className="hidden-mobile"
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                color: "var(--white)",
                opacity: 0.5,
                textDecoration: "none",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "opacity 0.2s",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <Link href="/mint">
            <span
              style={{
                background: "var(--brass)",
                color: "var(--black)",
                padding: "8px 20px",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace",
                cursor: "pointer",
                transition: "background 0.2s",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--cream)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--brass)")
              }
            >
              Mint Entity
            </span>
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "1px solid rgba(201,168,76,0.3)",
          color: "var(--brass)",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "12px",
          letterSpacing: "0.1em",
          fontFamily: "'DM Mono', monospace",
        }}
        className="show-mobile"
      >
        {menuOpen ? "CLOSE" : "MENU"}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "65px",
            left: 0,
            right: 0,
            background: "rgba(8,8,8,0.98)",
            borderBottom: "1px solid rgba(201,168,76,0.15)",
            padding: "24px",
            zIndex: 99,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "var(--white)",
                opacity: 0.6,
                textDecoration: "none",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace",
                padding: "12px 0",
                borderBottom: "1px solid rgba(201,168,76,0.08)",
              }}
            >
              {link.label}
            </a>
          ))}
          <Link href="/mint">
            <span
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                background: "var(--brass)",
                color: "var(--black)",
                padding: "14px",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'DM Mono', monospace",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              Mint Entity →
            </span>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
