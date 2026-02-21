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

## Overview

AGENTCORP is an NFT-native legal entity formation protocol deployed on Base.
It enables any wallet to mint legally-recognized entities — Delaware Series LLCs,
DAO Charters, Non-Profits, and IP License NFTs — as ERC-721 tokens with governing
documents stored permanently on Arweave and IPFS.

**Core Principle:** The NFT IS the legal entity.

| Action         | Legal Meaning              |
|----------------|---------------------------|
| mintEntity()   | Incorporate               |
| transfer()     | Assign / sell entity      |
| burn()         | Dissolve                  |
| amendEntity()  | Amend operating agreement |
| NFT metadata   | Living legal record       |

## Smart Contract Interface

Network: Base Mainnet (Chain ID: 8453)
Factory Address: 0x[DEPLOYED_ADDRESS]

function mintEntity(
    EntityType entityType,
    string calldata name,
    bytes32 docHash,
    address treasury,
    bytes calldata kycAttestation
) external payable returns (uint256 tokenId);

## Fee Schedule

| Action                  | ETH       |
|-------------------------|-----------|
| Mint Delaware LLC       | 0.05 ETH  |
| Mint Series Designation | 0.02 ETH  |
| Mint DAO Charter        | 0.05 ETH  |
| Document Amendment      | 0.01 ETH  |
| Entity Dissolution      | 0.005 ETH |`;

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
          paddingTop: "140px",
          paddingBottom: "80px",
          padding: "140px 48px 80px",
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

        <div className="eyebrow" style={{ marginBottom: "24px" }}>
          Agent-Native Protocol
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
          Let your{" "}
          <em
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--brass)",
            }}
          >
            agent
          </em>
          <br />
          mint an entity.
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
            AGENTCORP is designed to be called by machines. Point your AI agent at the{" "}
            <code
              style={{
                color: "var(--brass)",
                background: "rgba(201,168,76,0.08)",
                padding: "2px 6px",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              AGENTCORP-SKILL.md
            </code>{" "}
            and it will understand how to incorporate a Delaware Series LLC, mint a Series, or form a DAO — autonomously, on Base.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
            <button onClick={handleDownloadSkill} className="btn-brass">
              Download SKILL.md →
            </button>
            <a
              href="https://docs.agentcorp.xyz/agent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-brass"
            >
              View Agent Docs ↗
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
      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
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
          padding: "80px 48px 100px",
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
      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
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
          padding: "80px 48px 100px",
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

      {/* ── CTA ── */}
      <section
        style={{
          padding: "100px 48px",
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
        }
      `}</style>
    </div>
  );
}
