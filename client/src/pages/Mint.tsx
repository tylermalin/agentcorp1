/* ============================================================
   AGENTCORP MINT PAGE — Entity Formation Flow
   Industrial Legal Modernism — dark, brass accents
   ============================================================ */
import { useState } from "react";
import { toast } from "sonner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const ENTITY_TYPES = [
  {
    id: "DELAWARE_SERIES_LLC",
    name: "Delaware Series LLC",
    price: "0.05 ETH",
    priceUsd: "~$150",
    status: "live",
    desc: "The most powerful structure for onchain organizations. Unlimited legally-segregated Series under one parent entity.",
    docs: ["Certificate of Formation", "LLC Operating Agreement", "Member Register"],
    badge: "Most Popular",
  },
  {
    id: "SERIES_DESIGNATION",
    name: "Series Designation",
    price: "0.02 ETH",
    priceUsd: "~$60",
    status: "live",
    desc: "A legally-isolated Series under an existing parent Delaware Series LLC. Requires parent LLC token.",
    docs: ["Series Designation Certificate", "Series Operating Addendum"],
    badge: null,
  },
  {
    id: "DAO_CHARTER",
    name: "DAO Operating Charter",
    price: "0.05 ETH",
    priceUsd: "~$150",
    status: "live",
    desc: "Delaware LLC with full blockchain governance provisions: designated smart contract, token-weighted voting, delegate disclosure.",
    docs: ["DAO Operating Agreement", "Vote Delegate Disclosure", "Subscription Agreement"],
    badge: null,
  },
  {
    id: "IP_LICENSE",
    name: "IP License NFT",
    price: "TBD",
    priceUsd: "",
    status: "soon",
    desc: "Software license NFT with royalty hooks and sublicense controls. Coming Q2 2026.",
    docs: ["Software License Agreement", "Royalty Schedule"],
    badge: "Q2 2026",
  },
  {
    id: "NONPROFIT",
    name: "Delaware Non-Profit",
    price: "0.05 ETH",
    priceUsd: "~$150",
    status: "soon",
    desc: "Delaware non-profit with 501(c) pathway documentation. Coming Q3 2026.",
    docs: ["Non-Profit Charter", "Foundation Operating Agreement"],
    badge: "Q3 2026",
  },
];

const STEPS = ["Select Entity", "Configure", "Review Docs", "Sign & Mint"];

export default function Mint() {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", treasury: "", jurisdiction: "Delaware" });

  const handleSelectType = (id: string, status: string) => {
    if (status === "soon") {
      toast("Coming soon — this entity type launches in 2026.", { description: "Join the waitlist to be notified." });
      return;
    }
    setSelectedType(id);
  };

  const handleNext = () => {
    if (step === 0 && !selectedType) {
      toast("Please select an entity type to continue.");
      return;
    }
    if (step === 1) {
      if (!form.name.trim()) {
        toast("Entity name is required.");
        return;
      }
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleMint = () => {
    toast("Wallet connection required", {
      description: "Connect your wallet on Base Mainnet to mint your entity NFT.",
    });
  };

  const selected = ENTITY_TYPES.find((e) => e.id === selectedType);

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh" }}>
      <Nav />

      {/* Header */}
      <div
        style={{
          paddingTop: "80px",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ padding: "48px 48px 32px" }}>
          <div className="eyebrow" style={{ marginBottom: "16px" }}>Entity Formation</div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.02em",
              color: "var(--white)",
              marginBottom: "12px",
            }}
          >
            Mint Your{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              Legal Entity
            </em>
          </h1>
          <p style={{ color: "rgba(242,239,232,0.4)", fontSize: "13px", fontFamily: "'DM Mono', monospace", maxWidth: "480px" }}>
            Form a legally-recognized entity on Base in under 5 minutes. The NFT IS the entity.
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ padding: "0 48px 0", display: "flex", gap: "0" }}>
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
                flex: i < STEPS.length - 1 ? 1 : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 0",
                  borderBottom: i === step ? "2px solid var(--brass)" : "2px solid transparent",
                  paddingBottom: "14px",
                  cursor: i < step ? "pointer" : "default",
                }}
                onClick={() => { if (i < step) setStep(i); }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    border: `1px solid ${i <= step ? "var(--brass)" : "rgba(201,168,76,0.2)"}`,
                    background: i < step ? "var(--brass)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontFamily: "'DM Mono', monospace",
                    color: i < step ? "var(--black)" : i === step ? "var(--brass)" : "rgba(201,168,76,0.3)",
                    flexShrink: 0,
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    fontFamily: "'DM Mono', monospace",
                    color: i === step ? "var(--brass)" : i < step ? "rgba(201,168,76,0.6)" : "rgba(242,239,232,0.2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: "1px", background: "rgba(201,168,76,0.1)", margin: "0 16px" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "48px", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Step 0: Select Entity Type */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px", color: "var(--white)", marginBottom: "32px" }}>
              Select Entity Type
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2px" }}>
              {ENTITY_TYPES.map((entity) => (
                <div
                  key={entity.id}
                  onClick={() => handleSelectType(entity.id, entity.status)}
                  style={{
                    border: selectedType === entity.id ? "1px solid var(--brass)" : "1px solid rgba(201,168,76,0.1)",
                    background: selectedType === entity.id ? "rgba(201,168,76,0.06)" : entity.status === "soon" ? "rgba(201,168,76,0.01)" : "rgba(201,168,76,0.02)",
                    padding: "28px",
                    cursor: entity.status === "soon" ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    opacity: entity.status === "soon" ? 0.5 : 1,
                    position: "relative",
                  }}
                >
                  {entity.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: entity.status === "live" ? "var(--brass)" : "rgba(201,168,76,0.15)",
                        color: entity.status === "live" ? "var(--black)" : "var(--brass)",
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase" as const,
                        padding: "4px 10px",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 700,
                      }}
                    >
                      {entity.badge}
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "var(--white)", marginRight: "60px" }}>
                      {entity.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: "12px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", lineHeight: 1.6, marginBottom: "20px" }}>
                    {entity.desc}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--brass)" }}>
                        {entity.price}
                      </div>
                      {entity.priceUsd && (
                        <div style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>
                          {entity.priceUsd}
                        </div>
                      )}
                    </div>
                    {selectedType === entity.id && (
                      <div style={{ width: "20px", height: "20px", background: "var(--brass)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "var(--black)", fontWeight: 700 }}>
                        ✓
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
                    {entity.docs.map((d) => (
                      <div key={d} style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: "3px" }}>
                        → {d}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Configure */}
        {step === 1 && selected && (
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px", color: "var(--white)", marginBottom: "8px" }}>
              Configure Entity
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: "40px" }}>
              Entity type: <span style={{ color: "var(--brass)" }}>{selected.name}</span>
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div>
                <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>
                  Entity Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Acme Holdings LLC"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(201,168,76,0.03)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "var(--white)",
                    padding: "14px 18px",
                    fontSize: "14px",
                    fontFamily: "'DM Mono', monospace",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ fontSize: "10px", color: "rgba(242,239,232,0.25)", fontFamily: "'DM Mono', monospace", marginTop: "6px" }}>
                  This will appear in your Certificate of Formation
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>
                  Treasury Address
                </label>
                <input
                  type="text"
                  placeholder="0x... (Gnosis Safe, Avocado multisig, or EOA)"
                  value={form.treasury}
                  onChange={(e) => setForm({ ...form, treasury: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(201,168,76,0.03)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "var(--white)",
                    padding: "14px 18px",
                    fontSize: "14px",
                    fontFamily: "'DM Mono', monospace",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ fontSize: "10px", color: "rgba(242,239,232,0.25)", fontFamily: "'DM Mono', monospace", marginTop: "6px" }}>
                  Leave blank to use your connected wallet address
                </div>
                {/* Avocado callout */}
                <div
                  style={{
                    marginTop: "12px",
                    background: "rgba(201,168,76,0.04)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderLeft: "3px solid var(--brass)",
                    padding: "14px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap" as const,
                  }}
                >
                  <div>
                    <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>Agent Treasury — Gasless via Avocado</div>
                    <div style={{ fontSize: "11px", color: "rgba(242,239,232,0.45)", fontFamily: "'DM Mono', monospace", lineHeight: 1.5 }}>
                      Use an Avocado multisig wallet as your entity treasury. Agents deposit USDC, never need ETH. Gas is abstracted via <a href="https://avcd.io" target="_blank" rel="noopener noreferrer" style={{ color: "var(--brass)", textDecoration: "none" }}>avcd.io</a>.
                    </div>
                  </div>
                  <a
                    href="https://avcd.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "10px",
                      color: "var(--brass)",
                      fontFamily: "'DM Mono', monospace",
                      textDecoration: "none",
                      border: "1px solid rgba(201,168,76,0.3)",
                      padding: "6px 14px",
                      flexShrink: 0,
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    Setup Avocado ↗
                  </a>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>
                  Jurisdiction
                </label>
                <div
                  style={{
                    background: "rgba(201,168,76,0.03)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "rgba(242,239,232,0.5)",
                    padding: "14px 18px",
                    fontSize: "14px",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Delaware, United States
                </div>
                <div style={{ fontSize: "10px", color: "rgba(242,239,232,0.25)", fontFamily: "'DM Mono', monospace", marginTop: "6px" }}>
                  Additional jurisdictions coming Q2 2026 (Wyoming, Marshall Islands)
                </div>
              </div>

              <div
                style={{
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderLeft: "4px solid var(--brass)",
                  padding: "20px 24px",
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", marginBottom: "8px", fontFamily: "'DM Mono', monospace" }}>
                  Documents Included
                </div>
                {selected.docs.map((d) => (
                  <div key={d} style={{ fontSize: "12px", color: "rgba(242,239,232,0.5)", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>
                    → {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review Docs */}
        {step === 2 && selected && (
          <div style={{ maxWidth: "700px" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px", color: "var(--white)", marginBottom: "8px" }}>
              Review Documents
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: "40px" }}>
              Review your governing documents before signing. These will be stored permanently on Arweave.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "32px" }}>
              {selected.docs.map((doc, i) => (
                <div
                  key={doc}
                  style={{
                    border: "1px solid rgba(201,168,76,0.1)",
                    padding: "20px 24px",
                    background: "rgba(201,168,76,0.02)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--white)", marginBottom: "4px" }}>
                      {doc}
                    </div>
                    <div style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>
                      Pre-populated with your entity details · Stored on Arweave
                    </div>
                  </div>
                  <button
                    onClick={() => toast("Document preview", { description: `${doc} — full preview available after wallet connection.` })}
                    style={{
                      background: "none",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "var(--brass)",
                      padding: "8px 16px",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      cursor: "pointer",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Preview
                  </button>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "rgba(139,26,26,0.08)",
                border: "1px solid rgba(139,26,26,0.2)",
                borderLeft: "4px solid #8b1a1a",
                padding: "20px 24px",
              }}
            >
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#8b1a1a", marginBottom: "8px", fontFamily: "'DM Mono', monospace" }}>
                Legal Disclaimer
              </div>
              <p style={{ fontSize: "12px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
                AGENTCORP provides legal document templates and infrastructure. It does not provide legal advice. Consult qualified legal counsel for your specific situation. By minting, you confirm you have read and agree to the governing documents.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Sign & Mint */}
        {step === 3 && selected && (
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px", color: "var(--white)", marginBottom: "8px" }}>
              Sign & Mint
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", marginBottom: "40px" }}>
              Connect your wallet on Base Mainnet to complete entity formation.
            </p>

            <div
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                padding: "32px",
                background: "rgba(201,168,76,0.03)",
                marginBottom: "32px",
              }}
            >
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", marginBottom: "20px", fontFamily: "'DM Mono', monospace" }}>
                Order Summary
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Entity Type", value: selected.name },
                  { label: "Entity Name", value: form.name || "—" },
                  { label: "Jurisdiction", value: "Delaware, United States" },
                  { label: "Network", value: "Base Mainnet (Chain ID 8453)" },
                  { label: "Document Storage", value: "Arweave + IPFS" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
                    <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.35)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>{row.label}</span>
                    <span style={{ fontSize: "12px", color: "var(--white)", fontFamily: "'DM Mono', monospace" }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.35)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>Mint Fee</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "24px", color: "var(--brass)" }}>{selected.price}</div>
                    <div style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>{selected.priceUsd} + gas</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleMint}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: "14px", padding: "18px 32px" }}
            >
              Connect Wallet & Mint Entity
            </button>
            <p style={{ fontSize: "10px", color: "rgba(242,239,232,0.2)", fontFamily: "'DM Mono', monospace", textAlign: "center", marginTop: "12px" }}>
              Non-custodial · AGENTCORP never holds your keys
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            style={{
              background: "none",
              border: "1px solid rgba(201,168,76,0.2)",
              color: "rgba(242,239,232,0.4)",
              padding: "12px 24px",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              display: step === 0 ? "none" : "block",
            }}
          >
            ← Back
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ marginLeft: "auto" }}
            >
              Continue →
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
