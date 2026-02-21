/* ============================================================
   AGENTCORP AGENT PAGE — Let Your Agent Mint an Entity
   Industrial Legal Modernism — dark, brass accents, monospace
   ============================================================ */
import { useState } from "react";
import { toast } from "sonner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SKILL_URL = "https://raw.githubusercontent.com/agentcorp/templates/main/AGENTCORP-SKILL.md";
const SKILL_CONTENT = `# AGENTCORP SKILL.md

> **Protocol:** AGENTCORP — On-Chain Legal Infrastructure
> **Version:** 1.0
> **Chain:** Base (Chain ID 8453)
> **License:** MIT
> **Docs:** docs.agentcorp.xyz
> **GitHub:** github.com/agentcorp

---

## Overview

AGENTCORP is an NFT-native legal entity formation protocol deployed on Base. It enables any wallet to mint legally-recognized entities — Delaware Series LLCs, DAO Charters, Non-Profits, and IP License NFTs — as ERC-721 tokens with governing documents stored permanently on Arweave and IPFS.

**Core Principle:** The NFT IS the legal entity.

| Action | Legal Meaning |
|--------|---------------|
| mintEntity() | Incorporate |
| transfer() | Assign / sell entity |
| burn() | Dissolve |
| amendEntity() | Amend operating agreement |
| NFT metadata | Living legal record |

---

## Entity Types

### Currently Live

#### DELAWARE_SERIES_LLC — Parent Entity
A Delaware LLC under 6 Del. C. § 18-215 with unlimited legally-segregated Series.
- Mint price: 0.05 ETH
- Documents: Certificate of Formation, LLC Operating Agreement, Member Register
- Governance: Token-weighted, multisig, or single-member
- Use case: Master holding company, DAO entity wrapper, RWA portfolio parent

#### SERIES_DESIGNATION — Child Series
A legally-isolated Series under a parent Delaware Series LLC.
- Mint price: 0.02 ETH (requires parent LLC token ownership)
- Documents: Series Designation Certificate, Series Operating Addendum
- Per-series: independent treasury, members, assets, liability
- Use case: Project-level entity, carbon credit batch, RWA holding, IP isolation

#### DAO_CHARTER — Blockchain-Governed LLC
A Delaware LLC with full blockchain governance provisions.
- Mint price: 0.05 ETH
- Documents: DAO Operating Agreement, Vote Delegate Disclosure, Subscription Agreement
- Governance: Compound Governor compatible, Gnosis Safe compatible
- Use case: Protocol DAOs, investment clubs, onchain organizations

### Coming Q2 2026
- IP_LICENSE — Software license NFT with royalty hooks
- IP_ASSIGNMENT — IP transfer with chain of title

### Coming Q3 2026
- NONPROFIT — Delaware non-profit with 501(c) pathway
- RWA_HOLDING — Real-world asset holding agreement

---

## Smart Contract Interface

Network: Base Mainnet (Chain ID: 8453)
Factory Address: 0x[DEPLOYED_ADDRESS] (see docs.agentcorp.xyz)

\`\`\`solidity
// Mint a new legal entity
function mintEntity(
    EntityType entityType,
    string calldata name,
    bytes32 docHash,           // Arweave TX ID of governing documents
    address treasury,          // Safe multisig or EOA
    bytes calldata kycAttestation
) external payable returns (uint256 tokenId);

// Mint a Series under an existing parent LLC
function mintSeries(
    uint256 parentTokenId,
    string calldata seriesName,
    bytes32 seriesDocHash,
    address seriesTreasury
) external returns (uint256 seriesTokenId);

// Amend entity documents (token holder only)
function amendEntity(
    uint256 tokenId,
    bytes32 newDocHash,
    string calldata amendmentDescription
) external;

// Dissolve an entity (token holder only)
function dissolveEntity(
    uint256 tokenId,
    bytes32 dissolutionDocHash
) external;
\`\`\`

### EntityType Enum
\`\`\`solidity
enum EntityType {
    DELAWARE_LLC,           // 0
    DELAWARE_SERIES_LLC,    // 1 — parent
    SERIES_DESIGNATION,     // 2 — child series
    DAO_CHARTER,            // 3
    NONPROFIT,              // 4 (Q3 2026)
    IP_LICENSE,             // 5 (Q2 2026)
    IP_ASSIGNMENT           // 6 (Q2 2026)
}
\`\`\`

---

## Fee Schedule

| Action | ETH | Notes |
|--------|-----|-------|
| Mint Delaware LLC | 0.05 ETH | ~$150 at $3k/ETH |
| Mint Series Designation | 0.02 ETH | Per series under parent |
| Mint DAO Charter | 0.05 ETH | Governance adapter included |
| Mint Non-Profit | 0.05 ETH | Q3 2026 |
| Document Amendment | 0.01 ETH | Per amendment event |
| Entity Transfer | Gas only | Standard ERC-721 |
| Entity Dissolution | 0.005 ETH | Burns token, creates record |

20% of all fees flow to protocol treasury for legal template maintenance.

---

## Gas Abstraction — Avocado Agentic Wallet

Agents use Avocado (https://avcd.io) for gasless transactions on Base.
Agents never need to hold ETH — gas is paid in USDC.

**Integration:**
1. Agent deposits USDC to Avocado wallet address on Base
2. POST /v1/deposit to credit USD balance (api.avcd.io)
3. Sign EIP-712 Cast message and POST /v1/broadcast
4. Avocado sponsors gas, deducts fee from USD balance
5. Poll GET /v1/transaction/:hash for confirmation

**Key properties:**
- avoNonce must always be -1 (non-sequential)
- salt must be unique per transaction (random 32 bytes)
- EIP-712 chainId is 634 (Avocado), NOT 8453 (Base)
- Batch up to 20 actions per transaction
- Gas sponsorship available for third-party gas payment

**Avocado Contracts (Base 8453):**
- AvocadoBroadcaster: 0x0A6E5E7ae08896B0286441367843f4cA59D04dEf
- AvoFactory: 0xe981E50c7c47F0Df8826B5ce3F533f5E4440e687
- USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

Skill file: https://avcd.io/skill.md
Explorer: https://agent.avcd.io

---

## Document Storage

All legal documents use dual-storage:
1. Arweave — Permanent, pay-once. Cannot be deleted. 200-year guarantee.
2. IPFS — Distributed content-addressed retrieval.

Authenticity: retrieve document → hash it → compare to on-chain record.

### Document Manifest Schema
\`\`\`json
{
  "agentcorp_version": "1.0",
  "entity_type": "DELAWARE_SERIES_LLC",
  "entity_name": "[[ENTITY_NAME]]",
  "formation_date": "[[FORMATION_DATE]]",
  "jurisdiction": "Delaware, United States",
  "chain_id": 8453,
  "designated_smart_contract": "[[CONTRACT_ADDRESS]]",
  "treasury": "[[TREASURY_ADDRESS]]",
  "documents": [
    {
      "type": "CERTIFICATE_OF_FORMATION",
      "arweave_tx": "[[ARWEAVE_TX_ID]]",
      "ipfs_cid": "[[IPFS_CID]]",
      "sha256": "[[DOC_HASH]]",
      "status": "ACTIVE"
    },
    {
      "type": "OPERATING_AGREEMENT",
      "arweave_tx": "[[ARWEAVE_TX_ID]]",
      "ipfs_cid": "[[IPFS_CID]]",
      "sha256": "[[DOC_HASH]]",
      "amendments": []
    }
  ],
  "members": [
    {
      "address": "[[MEMBER_ADDRESS]]",
      "units": "[[MEMBER_UNITS]]",
      "joined_timestamp": "[[TIMESTAMP]]"
    }
  ]
}
\`\`\`

---

## Template Variables

| Variable | Source | Description |
|----------|--------|-------------|
| [[ENTITY_NAME]] | User input | Legal name of entity |
| [[FORMATION_DATE]] | Block timestamp | Auto-set at mint |
| [[CHAIN_ID]] | Network | Base: 8453 |
| [[DESIGNATED_CONTRACT]] | User input | Governance smart contract |
| [[MEMBER_ADDRESSES]] | User input | Initial member wallets |
| [[TREASURY_ADDRESS]] | User input | Safe or EOA |
| [[GOVERNANCE_TOKEN]] | User input | Voting token (optional) |
| [[SERIES_PARENT]] | Token ID | Parent LLC (Series only) |
| [[MAJORITY_THRESHOLD]] | User input | Default: 51% |
| [[SUPERMAJORITY_THRESHOLD]] | User input | Default: 67% |

---

## Governance Adapters

### Gnosis Safe (Multisig)
Adapter: GnosisSafeAdapter.sol
Threshold: Configurable (e.g., 2-of-3, 3-of-5)
Setup: Pass Safe address as treasury + designated contract

### Compound Governor
Adapter: CompoundGovernorAdapter.sol
Voting: Token-weighted with configurable quorum
Timelock: Configurable delay (default: 48 hours)

---

## Security Best Practices

1. Use a Gnosis Safe — Never hold entity NFTs in a hot wallet. Use multisig 2-of-3 minimum.
2. Verify document hashes — Retrieve and hash governing docs, compare to on-chain record.
3. Back up documents — Store copies independently of Arweave/IPFS.
4. Test on Base Sepolia first — testnet.agentcorp.xyz
5. Review templates with counsel — Templates are starting points for material transactions.

---

## Endpoints & Resources

| Resource | URL |
|----------|-----|
| Protocol dApp | agentcorp.xyz |
| Developer Docs | docs.agentcorp.xyz |
| GitHub (contracts) | github.com/agentcorp/contracts |
| GitHub (templates) | github.com/agentcorp/templates |
| Base Sepolia Testnet | testnet.agentcorp.xyz |
| Avocado Wallet | avcd.io |
| Avocado Skill | avcd.io/skill.md |
| Discord | discord.gg/agentcorp |

---

*AGENTCORP is infrastructure, not legal advice. Always consult qualified legal counsel for material transactions.*
*MIT License. Build on it.*`;

function CodeBlock({ children, lang = "typescript", label }: { children: string; lang?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "24px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(201,168,76,0.08)",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          borderLeft: "1px solid rgba(201,168,76,0.2)",
          borderRight: "1px solid rgba(201,168,76,0.2)",
          padding: "6px 16px",
        }}
      >
        <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", opacity: 0.7, fontFamily: "'DM Mono', monospace" }}>
          {label || lang}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: "none",
            border: "1px solid rgba(201,168,76,0.2)",
            color: copied ? "#4caf50" : "rgba(242,239,232,0.4)",
            padding: "3px 10px",
            fontSize: "9px",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            transition: "all 0.2s",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        style={{
          background: "#0d0d0d",
          color: "#f2efe8",
          fontFamily: "'DM Mono', monospace",
          fontSize: "13px",
          padding: "24px 28px",
          margin: 0,
          border: "1px solid rgba(201,168,76,0.15)",
          borderLeft: "4px solid var(--brass)",
          overflowX: "auto",
          lineHeight: 1.65,
        }}
      >
        {children}
      </pre>
    </div>
  );
}

const frameworks = [
  {
    id: "manus",
    name: "Manus",
    tag: "AI Agent Platform",
    desc: "Drop the SKILL.md into your Manus agent's skill directory. The agent will automatically discover the protocol, understand entity types, and call mintEntity() on your behalf.",
    steps: [
      "Copy AGENTCORP-SKILL.md to your agent's /skills/ directory",
      "Agent reads the skill and understands the protocol interface",
      'Instruct: "Mint a Delaware Series LLC named Acme Holdings LLC with treasury 0x..."',
      "Agent constructs the transaction, uploads docs to Arweave, calls mintEntity()",
      "Entity NFT minted to your wallet — you receive the token ID",
    ],
  },
  {
    id: "claude",
    name: "Claude / ChatGPT",
    tag: "LLM + Tool Use",
    desc: "Paste the SKILL.md into your system prompt or as a tool definition. The LLM will understand the protocol and generate the correct contract call parameters.",
    steps: [
      "Paste AGENTCORP-SKILL.md into system prompt or tool context",
      "Connect to Base via viem/ethers tool call or MCP server",
      'Prompt: "Form a DAO Charter for my protocol with Gnosis Safe treasury"',
      "LLM generates mintEntity() calldata with correct EntityType enum",
      "Sign and broadcast via your wallet or agent key",
    ],
  },
  {
    id: "eliza",
    name: "Eliza / Autonomous Agents",
    tag: "Autonomous Agent Framework",
    desc: "Register AGENTCORP as a plugin in your Eliza agent. The agent can autonomously incorporate entities, mint Series, and manage amendments as part of multi-step workflows.",
    steps: [
      "Install @agentcorp/eliza-plugin (npm package)",
      "Register plugin in your Eliza agent config",
      "Agent monitors for incorporation triggers in your workflow",
      "Autonomous minting: agent holds a funded wallet and mints on instruction",
      "Entity state tracked in agent memory — amendments and Series auto-managed",
    ],
  },
  {
    id: "custom",
    name: "Custom Agent / API",
    tag: "Direct Integration",
    desc: "Use the REST API or call the smart contract directly. Point your agent at the SKILL.md URL and the factory contract address on Base.",
    steps: [
      "Fetch SKILL.md from docs.agentcorp.xyz/skill.md",
      "Parse entity types, fees, and function signatures",
      "Upload governing documents to Arweave, get TX ID",
      "Call mintEntity() on Base with correct parameters and ETH value",
      "Parse emitted EntityMinted event for your token ID",
    ],
  },
];

export default function Agent() {
  const [activeFramework, setActiveFramework] = useState("manus");
  const active = frameworks.find((f) => f.id === activeFramework)!;

  const handleDownloadSkill = () => {
    const blob = new Blob([SKILL_CONTENT], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AGENTCORP-SKILL.md";
    a.click();
    URL.revokeObjectURL(url);
    toast("AGENTCORP-SKILL.md downloaded", {
      description: "Drop it into your agent's skill directory to enable entity minting.",
    });
  };

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section
        style={{
          padding: "80px 48px 80px",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Background grid accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background: "linear-gradient(135deg, transparent 60%, rgba(201,168,76,0.03) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* CLI prompt */}
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "13px",
            color: "rgba(201,168,76,0.5)",
            marginBottom: "32px",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "rgba(242,239,232,0.2)" }}>$ </span>
          agentcorp init --type=delaware-series-llc --agent=0x4a9f...
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(44px, 7vw, 96px)",
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
            maxWidth: "900px",
            marginBottom: "40px",
          }}
        >
          Agents that{" "}
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
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "end",
            maxWidth: "1100px",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(242,239,232,0.6)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            AgentCorp is on-chain legal infrastructure for autonomous agents. An agent reads the skill file, deposits USDC, and mints a{" "}
            <strong style={{ color: "var(--white)", fontWeight: 400 }}>Delaware Series LLC</strong>{" "}
            \u2014 with governing documents stored on Arweave, a multisig treasury on Base, and full legal liability protection.{" "}
            <strong style={{ color: "var(--white)", fontWeight: 400 }}>No lawyers. No humans required.</strong>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
            <button onClick={handleDownloadSkill} className="btn-brass">
              Get the Skill File \u2197
            </button>
            <a
              href="/mint"
              className="btn-outline-brass"
            >
              Mint an Entity \u2192
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderTop: "1px solid rgba(201,168,76,0.15)",
            marginTop: "60px",
            maxWidth: "900px",
          }}
        >
          {[
            { num: "1 file", label: "To integrate" },
            { num: "~30s", label: "Agent mint time" },
            { num: "Any LLM", label: "Framework support" },
            { num: "MIT", label: "License" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "24px 0",
                borderRight: i < 3 ? "1px solid rgba(201,168,76,0.15)" : "none",
                paddingLeft: i > 0 ? "28px" : 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "26px",
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
                  textTransform: "uppercase" as const,
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
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="page-section" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-header">
          <span className="section-num">01</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              letterSpacing: "-0.02em",
            }}
          >
            How agent minting{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              works
            </em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
          {[
            {
              num: "01",
              icon: "◈",
              title: "Point Agent at SKILL.md",
              desc: "Drop AGENTCORP-SKILL.md into your agent's skill directory or paste it into your system prompt. The agent learns the protocol: entity types, fees, function signatures, and document schema.",
            },
            {
              num: "02",
              icon: "◎",
              title: "Agent Generates Documents",
              desc: "The agent populates the legal document templates with entity name, member addresses, treasury, and governance parameters. Documents are uploaded to Arweave — the TX ID becomes the on-chain record.",
            },
            {
              num: "03",
              icon: "⬡",
              title: "Agent Calls mintEntity()",
              desc: "The agent constructs the mintEntity() calldata with the correct EntityType enum, Arweave doc hash, treasury address, and ETH value. It signs and broadcasts on Base Mainnet.",
            },
            {
              num: "04",
              icon: "◇",
              title: "Entity NFT Minted",
              desc: "The EntityMinted event fires. The agent receives the token ID and stores it. Your legal entity is now live on Base — the NFT is the entity, held in your wallet or the agent's custody wallet.",
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                background: "rgba(201,168,76,0.03)",
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "40px 32px",
                position: "relative",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.06)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.03)")}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "60px",
                  color: "rgba(201,168,76,0.06)",
                  lineHeight: 1,
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                }}
              >
                {step.num}
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid var(--brass)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                  color: "var(--brass)",
                  fontSize: "16px",
                }}
              >
                {step.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  marginBottom: "14px",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: "rgba(242,239,232,0.45)",
                  fontSize: "12px",
                  lineHeight: 1.7,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FRAMEWORK INTEGRATION ── */}
      <section
        style={{
          padding: "80px 24px 100px",  /* responsive via page-section */
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-header">
          <span className="section-num">02</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              letterSpacing: "-0.02em",
            }}
          >
            Framework{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              integration
            </em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2px", alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {frameworks.map((fw) => (
              <button
                key={fw.id}
                onClick={() => setActiveFramework(fw.id)}
                style={{
                  background: activeFramework === fw.id ? "rgba(201,168,76,0.08)" : "transparent",
                  border: "1px solid",
                  borderColor: activeFramework === fw.id ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.08)",
                  borderLeft: activeFramework === fw.id ? "3px solid var(--brass)" : "1px solid rgba(201,168,76,0.08)",
                  padding: "20px 24px",
                  textAlign: "left" as const,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: activeFramework === fw.id ? "var(--white)" : "rgba(242,239,232,0.5)",
                    marginBottom: "4px",
                  }}
                >
                  {fw.name}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: activeFramework === fw.id ? "var(--brass)" : "rgba(242,239,232,0.25)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {fw.tag}
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.12)",
              padding: "40px 44px",
              background: "rgba(201,168,76,0.02)",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--brass)",
                marginBottom: "12px",
                fontFamily: "'DM Mono', monospace",
                opacity: 0.7,
              }}
            >
              {active.tag}
            </div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              {active.name}
            </h3>
            <p
              style={{
                color: "rgba(242,239,232,0.5)",
                fontSize: "13px",
                lineHeight: 1.7,
                fontFamily: "'DM Mono', monospace",
                marginBottom: "32px",
                maxWidth: "580px",
              }}
            >
              {active.desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
              {active.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    fontSize: "12px",
                    color: "rgba(242,239,232,0.5)",
                    fontFamily: "'DM Mono', monospace",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "1px solid rgba(201,168,76,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      color: "var(--brass)",
                      flexShrink: 0,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>

            <button
              onClick={handleDownloadSkill}
              className="btn-brass"
              style={{ fontSize: "11px" }}
            >
              Download SKILL.md →
            </button>
          </div>
        </div>
      </section>

      {/* ── CODE EXAMPLES ── */}
      <section className="page-section" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-header">
          <span className="section-num">03</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              letterSpacing: "-0.02em",
            }}
          >
            Code{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              examples
            </em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          <div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                marginBottom: "8px",
                color: "var(--white)",
              }}
            >
              Agent Prompt (Natural Language)
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(242,239,232,0.35)",
                fontFamily: "'DM Mono', monospace",
                marginBottom: "0",
                lineHeight: 1.5,
              }}
            >
              What you say to your agent:
            </p>
            <CodeBlock lang="prompt" label="Agent Instruction">
{`Incorporate a Delaware Series LLC named "Acme Holdings LLC".
Use my Gnosis Safe 0xABC...123 as the treasury.
Set governance to multisig 2-of-3.
Add initial members: 0xDEF...456, 0x789...ABC.
Mint on Base Mainnet and return the token ID.`}
            </CodeBlock>

            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                marginBottom: "8px",
                color: "var(--white)",
                marginTop: "40px",
              }}
            >
              Mint a Series Under Parent LLC
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(242,239,232,0.35)",
                fontFamily: "'DM Mono', monospace",
                marginBottom: "0",
                lineHeight: 1.5,
              }}
            >
              Agent instruction for Series minting:
            </p>
            <CodeBlock lang="prompt" label="Series Instruction">
{`Under parent LLC token #42, mint a new Series named
"AgEnergy Hawaii Biochar 2026".
Purpose: Hold biochar carbon credits from 2026 production.
Series treasury: 0x111...222
This Series will hold carbon credit batch VCS-2026-HI-001.`}
            </CodeBlock>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                marginBottom: "8px",
                color: "var(--white)",
              }}
            >
              TypeScript / viem Integration
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(242,239,232,0.35)",
                fontFamily: "'DM Mono', monospace",
                marginBottom: "0",
                lineHeight: 1.5,
              }}
            >
              Direct contract call from your agent:
            </p>
            <CodeBlock lang="typescript" label="TypeScript + viem">
{`import { createWalletClient, parseEther } from "viem";
import { base } from "viem/chains";

// EntityType enum (from AGENTCORP-SKILL.md)
const EntityType = {
  DELAWARE_LLC: 0,
  DELAWARE_SERIES_LLC: 1,
  SERIES_DESIGNATION: 2,
  DAO_CHARTER: 3,
} as const;

// 1. Upload docs to Arweave, get TX ID
const arweaveTxId = await uploadToArweave(documents);
const docHash = toBytes32(arweaveTxId);

// 2. Call mintEntity on Base
const txHash = await walletClient.writeContract({
  address: AGENTCORP_FACTORY,
  abi: AgentCorpABI,
  functionName: "mintEntity",
  args: [
    EntityType.DELAWARE_SERIES_LLC,
    "Acme Holdings LLC",
    docHash,
    treasuryAddress,
    "0x", // kycAttestation (optional)
  ],
  value: parseEther("0.05"), // mint fee
  chain: base,
});

// 3. Parse EntityMinted event for token ID
const receipt = await publicClient.waitForTransactionReceipt(
  { hash: txHash }
);
const tokenId = parseEntityMintedEvent(receipt);
console.log(\`Entity minted: token #\${tokenId}\`);`}
            </CodeBlock>
          </div>
        </div>

        {/* Python example */}
        <div style={{ marginTop: "48px" }}>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              marginBottom: "8px",
              color: "var(--white)",
            }}
          >
            Python / web3.py Integration
          </h3>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(242,239,232,0.35)",
              fontFamily: "'DM Mono', monospace",
              marginBottom: "0",
              lineHeight: 1.5,
            }}
          >
            For Python-based agents (LangChain, CrewAI, custom):
          </p>
          <CodeBlock lang="python" label="Python + web3.py">
{`from web3 import Web3
from eth_account import Account

# Connect to Base Mainnet
w3 = Web3(Web3.HTTPProvider("https://mainnet.base.org"))

# EntityType enum (from AGENTCORP-SKILL.md)
ENTITY_TYPES = {
    "DELAWARE_LLC": 0,
    "DELAWARE_SERIES_LLC": 1,
    "SERIES_DESIGNATION": 2,
    "DAO_CHARTER": 3,
}

# 1. Upload docs to Arweave
arweave_tx_id = upload_to_arweave(governing_documents)
doc_hash = bytes.fromhex(arweave_tx_id.ljust(64, '0'))

# 2. Build transaction
contract = w3.eth.contract(
    address=AGENTCORP_FACTORY,
    abi=AGENTCORP_ABI
)

tx = contract.functions.mintEntity(
    ENTITY_TYPES["DELAWARE_SERIES_LLC"],
    "Acme Holdings LLC",
    doc_hash,
    treasury_address,
    b""  # kycAttestation
).build_transaction({
    "from": agent_wallet,
    "value": w3.to_wei(0.05, "ether"),
    "gas": 300000,
    "nonce": w3.eth.get_transaction_count(agent_wallet),
})

# 3. Sign and send
signed = w3.eth.account.sign_transaction(tx, private_key)
tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Entity minted: tx {tx_hash.hex()}")`}
          </CodeBlock>
        </div>
      </section>

      {/* ── SKILL.MD PREVIEW ── */}
      <section
        style={{
          padding: "80px 24px 100px",  /* responsive via page-section */
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-header">
          <span className="section-num">04</span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              letterSpacing: "-0.02em",
            }}
          >
            The{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              SKILL.md
            </em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
          <div>
            <p
              style={{
                color: "rgba(242,239,232,0.55)",
                fontSize: "14px",
                lineHeight: 1.75,
                fontFamily: "'DM Mono', monospace",
                marginBottom: "32px",
              }}
            >
              The{" "}
              <code style={{ color: "var(--brass)", background: "rgba(201,168,76,0.08)", padding: "2px 6px" }}>
                AGENTCORP-SKILL.md
              </code>{" "}
              is a machine-readable protocol specification. It follows the emerging{" "}
              <strong style={{ color: "var(--white)", fontWeight: 400 }}>SKILL.md standard</strong> — a single Markdown file that gives any AI agent everything it needs to understand and interact with a protocol.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
              {[
                { label: "Entity Types", desc: "All entity types, mint prices, included documents, and use cases" },
                { label: "Smart Contract Interface", desc: "Function signatures, parameters, return values, and error codes" },
                { label: "Document Schema", desc: "JSON manifest structure for governing document uploads" },
                { label: "Template Variables", desc: "All auto-populated fields and their data sources" },
                { label: "Governance Adapters", desc: "Gnosis Safe, Compound Governor, and custom governance setup" },
                { label: "Fee Schedule", desc: "ETH amounts for every protocol action" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    paddingBottom: "16px",
                    borderBottom: "1px solid rgba(201,168,76,0.07)",
                  }}
                >
                  <span style={{ color: "var(--brass)", opacity: 0.6, flexShrink: 0, fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>→</span>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--white)", marginBottom: "3px" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(242,239,232,0.35)", fontFamily: "'DM Mono', monospace", lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button onClick={handleDownloadSkill} className="btn-brass">
                Download SKILL.md →
              </button>
              <a
                href="https://raw.githubusercontent.com/agentcorp/templates/main/AGENTCORP-SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-brass"
              >
                Raw URL ↗
              </a>
            </div>
          </div>

          {/* SKILL.md preview */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderBottom: "none",
                padding: "8px 16px",
              }}
            >
              <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace" }}>
                AGENTCORP-SKILL.md
              </span>
              <span style={{ fontSize: "9px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>
                432 lines · MIT License
              </span>
            </div>
            <pre
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(201,168,76,0.15)",
                borderLeft: "4px solid var(--brass)",
                padding: "24px 28px",
                margin: 0,
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                lineHeight: 1.7,
                color: "rgba(242,239,232,0.65)",
                overflowY: "auto",
                maxHeight: "520px",
              }}
            >
{`# AGENTCORP SKILL.md

> Protocol: AGENTCORP — On-Chain Legal Infrastructure
> Version: 1.0 | Chain: Base (Chain ID 8453)
> License: MIT | Docs: docs.agentcorp.xyz

## Overview

AGENTCORP is an NFT-native legal entity formation
protocol deployed on Base. It enables any wallet to
mint legally-recognized entities as ERC-721 tokens.

Core Principle: The NFT IS the legal entity.

| Action         | Legal Meaning         |
|----------------|-----------------------|
| mintEntity()   | Incorporate           |
| transfer()     | Assign / sell entity  |
| burn()         | Dissolve              |
| amendEntity()  | Amend operating agmt  |

## Entity Types

### DELAWARE_SERIES_LLC — 0.05 ETH
Delaware LLC under 6 Del. C. § 18-215
Docs: Certificate of Formation, Operating Agreement

### SERIES_DESIGNATION — 0.02 ETH
Legally-isolated Series under parent LLC
Docs: Series Certificate, Operating Addendum

### DAO_CHARTER — 0.05 ETH
Blockchain-governed LLC with token voting
Docs: DAO Agreement, Vote Delegate Disclosure

## Smart Contract Interface

function mintEntity(
    EntityType entityType,
    string calldata name,
    bytes32 docHash,
    address treasury,
    bytes calldata kycAttestation
) external payable returns (uint256 tokenId);

function mintSeries(
    uint256 parentTokenId,
    string calldata seriesName,
    bytes32 seriesDocHash,
    address seriesTreasury
) external returns (uint256 seriesTokenId);

## Fee Schedule

Mint Delaware LLC       → 0.05 ETH
Mint Series Designation → 0.02 ETH
Mint DAO Charter        → 0.05 ETH
Document Amendment      → 0.01 ETH
Entity Dissolution      → 0.005 ETH

...`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── AVOCADO INTEGRATION ── */}
      <section
        id="avocado"
        style={{
          padding: "80px 24px",  /* responsive via page-section */
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-header">
          <span className="section-num">04</span>
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                letterSpacing: "-0.02em",
              }}
            >
              Gasless via{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
                Avocado.
              </em>
            </h2>
            <p style={{ marginTop: "12px", fontSize: "13px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", maxWidth: "560px", lineHeight: 1.7 }}>
              Agents deposit USDC into an{" "}
              <a href="https://avcd.io" target="_blank" rel="noopener noreferrer" style={{ color: "var(--brass)", textDecoration: "none" }}>Avocado Agentic Wallet</a>
              {" "}at avcd.io. Gas is abstracted. Agents never need ETH. $0.25 USDC covers ~50 protocol interactions.
            </p>
          </div>
        </div>

        {/* Overview cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", marginBottom: "2px" }}>
          {[
            { icon: "\u25c8", title: "Deposit USDC", desc: "Send USDC to your Avocado wallet on Base. POST /v1/deposit to credit USD balance." },
            { icon: "\u25ce", title: "Sign & Broadcast", desc: "Sign EIP-712 Cast message. POST /v1/broadcast. Backend sponsors gas, deducts from balance." },
            { icon: "\u2b21", title: "Non-Sequential Nonces", desc: "avoNonce = -1 always. Parallel execution supported. Batch up to 20 actions per tx." },
            { icon: "\u25c7", title: "Auto Gas Bumping", desc: "Stuck transactions are automatically resubmitted up to 3 times with higher gas." },
          ].map((c, i) => (
            <div key={i} style={{ border: "1px solid rgba(201,168,76,0.1)", padding: "28px 24px", background: "rgba(201,168,76,0.02)" }}>
              <span style={{ color: "var(--brass)", fontSize: "18px", display: "block", marginBottom: "14px" }}>{c.icon}</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", marginBottom: "8px" }}>{c.title}</h3>
              <p style={{ color: "rgba(242,239,232,0.4)", fontSize: "11px", lineHeight: 1.6, fontFamily: "'DM Mono', monospace" }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Code + API table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
          {/* TypeScript integration code */}
          <div style={{ border: "1px solid rgba(201,168,76,0.15)", background: "#0a0a0a", overflow: "hidden" }}>
            <div style={{ background: "rgba(201,168,76,0.06)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace" }}>avocado_mint.ts · Gasless AgentCorp Mint</span>
              <a href="https://avcd.io/skill.md" target="_blank" rel="noopener noreferrer" style={{ fontSize: "9px", color: "rgba(201,168,76,0.5)", fontFamily: "'DM Mono', monospace", textDecoration: "none" }}>avcd.io/skill.md ↗</a>
            </div>
            <pre style={{ padding: "28px", fontFamily: "'DM Mono', monospace", fontSize: "11px", lineHeight: 1.75, color: "rgba(242,239,232,0.7)", margin: 0, overflowX: "auto", borderLeft: "3px solid var(--brass)" }}>
{`import { privateKeyToAccount } from "viem/accounts";
import { encodeFunctionData, parseEther, keccak256,
         encodePacked, parseUnits } from "viem";

const AVOCADO_API = "https://api.avcd.io";
const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const DEPOSITOR = "0xFb653a4061cE35b66e2Ba090Cf1Fabe32f294079";

// 1. Auth header (EIP-712, fresh per request)
async function authHeader(account) {
  const ts = Math.floor(Date.now() / 1000);
  const sig = await account.signTypedData({
    domain: { name: "Avocado-Agentic-Wallet", version: "1.0.0" },
    types: { Authenticate: [
      { name: "agent", type: "address" },
      { name: "timestamp", type: "uint256" },
      { name: "environment", type: "string" },
    ]},
    primaryType: "Authenticate",
    message: { agent: account.address,
               timestamp: BigInt(ts),
               environment: "production" },
  });
  return \`Signature \${account.address}:\${ts}:\${sig}\`;
}

// 2. Deposit USDC to fund gas balance
async function depositUsdc(account, amountUsdc = "1.00") {
  const data = encodeFunctionData({
    abi: [{ name: "transfer", type: "function",
      inputs: [{ name: "to", type: "address" },
               { name: "amount", type: "uint256" }],
      outputs: [{ name: "", type: "bool" }],
      stateMutability: "nonpayable" }],
    functionName: "transfer",
    args: [DEPOSITOR, parseUnits(amountUsdc, 6)],
  });
  const body = buildCastBody(USDC, data);
  const res = await fetch(\`\${AVOCADO_API}/v1/deposit\`, {
    method: "POST",
    headers: { "Authorization": await authHeader(account),
               "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return (await res.json()).data;
}

// 3. Broadcast mintEntity() via Avocado (gasless)
async function mintEntityGasless(account, mintCalldata) {
  const body = buildCastBody(AGENTCORP_FACTORY, mintCalldata,
                              parseEther("0.05").toString());
  const res = await fetch(\`\${AVOCADO_API}/v1/broadcast\`, {
    method: "POST",
    headers: { "Authorization": await authHeader(account),
               "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, target_chain_id: 8453 }),
  });
  return (await res.json()).data; // { avocado_tx_hash, status }
}

// 4. Poll for confirmation
async function waitForConfirmation(account, avocadoTxHash) {
  while (true) {
    const res = await fetch(
      \`\${AVOCADO_API}/v1/transaction/\${avocadoTxHash}\`,
      { headers: { "Authorization": await authHeader(account) } }
    );
    const { data } = await res.json();
    if (data.status === "success") return data.on_chain_tx_hash;
    if (data.status === "failed") throw new Error("TX failed");
    await new Promise(r => setTimeout(r, 5000)); // poll 5s
  }
}`}
            </pre>
          </div>

          {/* API reference + fee model */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {/* API endpoints table */}
            <div style={{ border: "1px solid rgba(201,168,76,0.1)", padding: "28px 32px", background: "rgba(201,168,76,0.02)" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace", marginBottom: "16px" }}>API Reference · api.avcd.io</div>
              {[
                { method: "GET", path: "/v1/agent", desc: "Agent profile + balance" },
                { method: "GET", path: "/v1/balance", desc: "USD balance (total/locked/available)" },
                { method: "POST", path: "/v1/deposit", desc: "Deposit USDC to gas balance" },
                { method: "POST", path: "/v1/broadcast", desc: "Broadcast signed transaction" },
                { method: "GET", path: "/v1/transaction/:hash", desc: "Transaction status" },
                { method: "POST", path: "/v1/sponsor/deposit", desc: "Deposit to sponsor balance" },
              ].map((ep, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
                  <span style={{ fontSize: "9px", color: ep.method === "POST" ? "var(--brass)" : "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", flexShrink: 0, width: "32px", marginTop: "1px" }}>{ep.method}</span>
                  <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.6)", fontFamily: "'DM Mono', monospace", flexShrink: 0, width: "180px" }}>{ep.path}</span>
                  <span style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>{ep.desc}</span>
                </div>
              ))}
            </div>

            {/* Fee model */}
            <div style={{ border: "1px solid rgba(201,168,76,0.1)", padding: "28px 32px", background: "rgba(201,168,76,0.02)" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace", marginBottom: "16px" }}>Fee Model · Real Transaction</div>
              <pre style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", lineHeight: 1.9, color: "rgba(242,239,232,0.6)", margin: 0 }}>
{`credit:     +$0.250000   USDC deposit confirmed
fee_lock:   -$0.005225   Locked at broadcast
fee_settle: -$0.004204   $0.003503 gas + 20% markup
fee_refund: +$0.001021   Overestimate returned
────────────────────────────────────
final:       $0.245796   (~50 txs per $0.25)`}
              </pre>
            </div>

            {/* Contracts */}
            <div style={{ border: "1px solid rgba(201,168,76,0.1)", padding: "28px 32px", background: "rgba(201,168,76,0.02)" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", fontFamily: "'DM Mono', monospace", marginBottom: "16px" }}>Contracts · Base 8453</div>
              {[
                { label: "AvocadoBroadcaster", addr: "0x0A6E5E7ae...04dEf" },
                { label: "AvoFactory", addr: "0xe981E50c7...e687" },
                { label: "USDC", addr: "0x833589fCD...2913" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
                  <span style={{ fontSize: "11px", color: "rgba(242,239,232,0.5)", fontFamily: "'DM Mono', monospace" }}>{c.label}</span>
                  <span style={{ fontSize: "10px", color: "var(--brass)", fontFamily: "'DM Mono', monospace", opacity: 0.7 }}>{c.addr}</span>
                </div>
              ))}
              <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
                <a href="https://avcd.io" target="_blank" rel="noopener noreferrer" className="btn-brass" style={{ fontSize: "10px", padding: "8px 16px" }}>avcd.io ↗</a>
                <a href="https://avcd.io/skill.md" target="_blank" rel="noopener noreferrer" className="btn-outline-brass" style={{ fontSize: "10px", padding: "8px 16px" }}>Skill File</a>
                <a href="https://agent.avcd.io" target="_blank" rel="noopener noreferrer" className="btn-outline-brass" style={{ fontSize: "10px", padding: "8px 16px" }}>Explorer</a>
              </div>
            </div>
          </div>
        </div>

        {/* Important notes */}
        <div style={{ marginTop: "2px", border: "1px solid rgba(201,168,76,0.1)", padding: "24px 32px", background: "rgba(201,168,76,0.02)", display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {[
            { label: "avoNonce", value: "Always -1 (non-sequential)" },
            { label: "EIP-712 chainId", value: "634 (Avocado), NOT 8453 (Base)" },
            { label: "salt", value: "Random 32 bytes per tx" },
            { label: "Batch limit", value: "20 actions per transaction" },
            { label: "Auth expiry", value: "\u00b15 minutes from server time" },
            { label: "Gas sponsorship", value: "Third-party can pay gas via EIP-712 SponsorGas" },
          ].map((n, i) => (
            <div key={i}>
              <div style={{ fontSize: "9px", color: "var(--brass)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "4px" }}>{n.label}</div>
              <div style={{ fontSize: "11px", color: "rgba(242,239,232,0.5)", fontFamily: "'DM Mono', monospace" }}>{n.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SWARM MODE ── */}
      <section
        style={{
          padding: "80px 24px",  /* responsive via page-section */
          background: "rgba(201,168,76,0.02)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-header">
          <span className="section-num">05</span>
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                letterSpacing: "-0.02em",
              }}
            >
              Swarm{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
                mode.
              </em>
            </h2>
            <p style={{ marginTop: "12px", fontSize: "13px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", maxWidth: "560px", lineHeight: 1.7 }}>
              Multiple agents. One legal entity. A shared Gnosis Safe treasury. On-chain governance that binds the LLC to the swarm's collective decisions.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
          {/* Swarm architecture diagram (text-based) */}
          <div style={{ border: "1px solid rgba(201,168,76,0.15)", background: "#0a0a0a", padding: "40px", fontFamily: "'DM Mono', monospace", fontSize: "12px", lineHeight: 2 }}>
            <div style={{ color: "var(--brass)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "24px" }}>Swarm Architecture</div>
            <div style={{ color: "rgba(242,239,232,0.7)" }}>SwarmOps Holdings LLC</div>
            <div style={{ color: "rgba(242,239,232,0.25)", paddingLeft: "20px" }}>\u2514\u2500 Treasury: Gnosis Safe 3-of-5</div>
            <div style={{ color: "rgba(242,239,232,0.25)", paddingLeft: "20px" }}>\u2514\u2500 Governance: Token-weighted voting</div>
            <div style={{ color: "rgba(242,239,232,0.25)", paddingLeft: "20px" }}>\u2514\u2500 Members:</div>
            <div style={{ color: "var(--brass)", paddingLeft: "40px" }}>\u2514\u2500 Agent-1 (Orchestrator) 0x4a9f...</div>
            <div style={{ color: "var(--brass)", paddingLeft: "40px" }}>\u2514\u2500 Agent-2 (Executor) 0x7b2c...</div>
            <div style={{ color: "var(--brass)", paddingLeft: "40px" }}>\u2514\u2500 Agent-3 (Auditor) 0x1d8e...</div>
            <div style={{ color: "rgba(242,239,232,0.25)", paddingLeft: "40px" }}>\u2514\u2500 Human-Signer (Override) 0xf3a1...</div>
            <div style={{ marginTop: "24px", color: "rgba(242,239,232,0.25)" }}>Series Designations:</div>
            <div style={{ color: "rgba(242,239,232,0.5)", paddingLeft: "20px" }}>\u2514\u2500 Series A: Revenue Operations</div>
            <div style={{ color: "rgba(242,239,232,0.5)", paddingLeft: "20px" }}>\u2514\u2500 Series B: IP Holdings</div>
            <div style={{ color: "rgba(242,239,232,0.5)", paddingLeft: "20px" }}>\u2514\u2500 Series C: Infrastructure</div>
            <div style={{ marginTop: "24px", color: "#4caf50", fontSize: "10px" }}>\u2713 All agents funded via Avocado USDC deposit</div>
            <div style={{ color: "#4caf50", fontSize: "10px" }}>\u2713 Gas abstracted \u2014 no ETH required</div>
            <div style={{ color: "#4caf50", fontSize: "10px" }}>\u2713 Formation time: 28.4s</div>
          </div>

          {/* Swarm features */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {[
              {
                title: "Shared Legal Entity",
                desc: "All agents in the swarm are members of a single Delaware Series LLC. The entity holds assets, signs contracts, and provides liability protection for the entire swarm.",
              },
              {
                title: "Multisig Treasury",
                desc: "The Gnosis Safe treasury requires M-of-N agent signatures for any transaction. Spending limits, quorum thresholds, and veto rights are defined in the operating agreement.",
              },
              {
                title: "Gasless via Avocado",
                desc: "Each agent deposits USDC into an Avocado smart wallet. Gas is abstracted. Agents never need to hold ETH. $50 USDC covers thousands of protocol interactions.",
              },
              {
                title: "Human Override Key",
                desc: "An optional human signer can be included as a guardian member with veto rights. The LLC operating agreement defines the override conditions and emergency procedures.",
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(201,168,76,0.1)",
                  padding: "28px 32px",
                  background: "rgba(201,168,76,0.02)",
                  flex: 1,
                }}
              >
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ color: "rgba(242,239,232,0.45)", fontSize: "12px", lineHeight: 1.6, fontFamily: "'DM Mono', monospace" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "80px 24px",  /* responsive via page-section */
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: "24px" }}>Get Started</div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Your agent is<br />
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              ready to incorporate.
            </em>
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
            One file. Any agent. Any LLM. Point your agent at the SKILL.md and it can incorporate a Delaware Series LLC in under 30 seconds.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
            <button onClick={handleDownloadSkill} className="btn-brass">
              Download SKILL.md →
            </button>
            <a href="/docs" className="btn-outline-brass">
              Developer Docs
            </a>
          </div>
        </div>

        {/* Terminal card */}
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            background: "#0a0a0a",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "rgba(201,168,76,0.06)",
              borderBottom: "1px solid rgba(201,168,76,0.12)",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(242,239,232,0.15)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(242,239,232,0.15)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(242,239,232,0.15)" }} />
            <span style={{ marginLeft: "8px", fontSize: "10px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
              agent terminal
            </span>
          </div>
          <div style={{ padding: "28px 28px", fontFamily: "'DM Mono', monospace", fontSize: "12px", lineHeight: 1.8 }}>
            <div style={{ color: "rgba(242,239,232,0.25)" }}>$ agent run --skill AGENTCORP-SKILL.md</div>
            <div style={{ color: "rgba(242,239,232,0.5)", marginTop: "8px" }}>[AGENTCORP] Skill loaded. Protocol v1.0</div>
            <div style={{ color: "rgba(242,239,232,0.5)" }}>[AGENTCORP] Base Mainnet connected (8453)</div>
            <div style={{ color: "rgba(242,239,232,0.25)", marginTop: "12px" }}>&gt; Incorporate "Acme Holdings LLC" as Delaware Series LLC</div>
            <div style={{ color: "var(--brass)", marginTop: "8px" }}>[AGENTCORP] Generating documents...</div>
            <div style={{ color: "var(--brass)" }}>[AGENTCORP] Uploading to Arweave... tx/abc123</div>
            <div style={{ color: "var(--brass)" }}>[AGENTCORP] Calling mintEntity() on Base...</div>
            <div style={{ color: "#4caf50", marginTop: "8px" }}>[AGENTCORP] ✓ Entity minted: token #1337</div>
            <div style={{ color: "#4caf50" }}>[AGENTCORP] ✓ Delaware Series LLC incorporated</div>
            <div style={{ color: "#4caf50" }}>[AGENTCORP] ✓ Docs stored: arweave/abc123</div>
            <div style={{ color: "rgba(242,239,232,0.2)", marginTop: "12px" }}>Formation time: 28.4s</div>
            <div
              style={{
                display: "inline-block",
                width: "8px",
                height: "14px",
                background: "var(--brass)",
                marginTop: "4px",
                animation: "pulse 1s infinite",
              }}
            />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          [style*="grid-template-columns: 260px 1fr"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gap: 80px"] { gap: 40px !important; }
          [style*="gap: 48px"] { gap: 24px !important; }
          .section-header { flex-direction: column; gap: 12px; }
          .section-header h2 { font-size: clamp(24px, 6vw, 36px) !important; }
        }
        @media (max-width: 600px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="font-size: clamp"] { font-size: clamp(22px, 8vw, 36px) !important; }
        }
      `}</style>
    </div>
  );
}
