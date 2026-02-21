/* ============================================================
   AGENTCORP DOCS PAGE — Developer Documentation
   Industrial Legal Modernism — dark, brass accents, monospace
   ============================================================ */
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "overview",
    label: "Overview",
    content: "overview",
  },
  {
    id: "quickstart",
    label: "Quick Start",
    content: "quickstart",
  },
  {
    id: "contracts",
    label: "Smart Contracts",
    content: "contracts",
  },
  {
    id: "entity-types",
    label: "Entity Types",
    content: "entity-types",
  },
  {
    id: "document-storage",
    label: "Document Storage",
    content: "document-storage",
  },
  {
    id: "governance",
    label: "Governance Adapters",
    content: "governance",
  },
  {
    id: "kyc",
    label: "KYC / Identity",
    content: "kyc",
  },
  {
    id: "fees",
    label: "Fee Schedule",
    content: "fees",
  },
];

function CodeBlock({ children, lang = "solidity" }: { children: string; lang?: string }) {
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
          {lang}
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
        }}
      >
        {children}
      </pre>
    </div>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "60px" }}>
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          letterSpacing: "-0.01em",
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          color: "var(--white)",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Param({ name, type, desc }: { name: string; type: string; desc: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 120px 1fr",
        gap: "16px",
        padding: "10px 0",
        borderBottom: "1px solid rgba(201,168,76,0.07)",
        alignItems: "start",
      }}
    >
      <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "var(--brass)" }}>{name}</code>
      <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(242,239,232,0.4)" }}>{type}</code>
      <span style={{ fontSize: "12px", color: "rgba(242,239,232,0.5)", fontFamily: "'DM Mono', monospace", lineHeight: 1.5 }}>{desc}</span>
    </div>
  );
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState("overview");

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
          <div className="eyebrow" style={{ marginBottom: "16px" }}>Developer Documentation</div>
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
            AGENTCORP{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brass)" }}>
              Protocol Docs
            </em>
          </h1>
          <p style={{ color: "rgba(242,239,232,0.4)", fontSize: "13px", fontFamily: "'DM Mono', monospace", maxWidth: "500px" }}>
            Smart contract interface, entity types, document storage, and governance adapters for the AGENTCORP on-chain legal infrastructure protocol.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          minHeight: "calc(100vh - 200px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            borderRight: "1px solid rgba(201,168,76,0.12)",
            padding: "40px 0",
            position: "sticky",
            top: "80px",
            height: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", opacity: 0.5, fontFamily: "'DM Mono', monospace" }}>
              Contents
            </span>
          </div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 24px",
                background: activeSection === s.id ? "rgba(201,168,76,0.08)" : "none",
                border: "none",
                borderLeft: activeSection === s.id ? "2px solid var(--brass)" : "2px solid transparent",
                color: activeSection === s.id ? "var(--brass)" : "rgba(242,239,232,0.4)",
                fontSize: "12px",
                letterSpacing: "0.05em",
                fontFamily: "'DM Mono', monospace",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {s.label}
            </button>
          ))}

          <div style={{ padding: "24px 24px 0", marginTop: "24px", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
            <a
              href="https://docs.agentcorp.xyz"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                fontSize: "11px",
                color: "rgba(242,239,232,0.3)",
                textDecoration: "none",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
                marginBottom: "8px",
              }}
            >
              Full Docs ↗
            </a>
            <a
              href="https://github.com/agentcorp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                fontSize: "11px",
                color: "rgba(242,239,232,0.3)",
                textDecoration: "none",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Main content */}
        <div style={{ padding: "48px 60px", maxWidth: "860px" }}>

          {activeSection === "overview" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                Overview
              </h2>
              <p style={{ color: "rgba(242,239,232,0.6)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'DM Mono', monospace", marginBottom: "24px" }}>
                AGENTCORP is an NFT-native legal entity formation protocol deployed on Base (Chain ID 8453). It enables any wallet to mint legally-recognized entities as ERC-721 tokens with governing documents stored permanently on Arweave and IPFS.
              </p>
              <div
                style={{
                  background: "rgba(201,168,76,0.05)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderLeft: "4px solid var(--brass)",
                  padding: "20px 24px",
                  marginBottom: "32px",
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--brass)", marginBottom: "8px", fontFamily: "'DM Mono', monospace" }}>
                  Core Principle
                </div>
                <p style={{ fontSize: "15px", color: "var(--white)", fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
                  The NFT IS the legal entity. Mint = Incorporate. Transfer = Assign. Burn = Dissolve.
                </p>
              </div>
              <DocSection title="Network">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                  {[
                    { label: "Network", value: "Base Mainnet" },
                    { label: "Chain ID", value: "8453" },
                    { label: "Native Token", value: "ETH" },
                    { label: "Block Time", value: "~2 seconds" },
                    { label: "EVM Compatible", value: "Yes" },
                    { label: "L2 Stack", value: "OP Stack (Coinbase)" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        border: "1px solid rgba(201,168,76,0.1)",
                        padding: "16px 20px",
                        background: "rgba(201,168,76,0.02)",
                      }}
                    >
                      <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(242,239,232,0.3)", marginBottom: "4px", fontFamily: "'DM Mono', monospace" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: "14px", color: "var(--brass)", fontFamily: "'DM Mono', monospace" }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </DocSection>
              <DocSection title="Key Actions">
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {[
                    { fn: "mintEntity()", legal: "Incorporate" },
                    { fn: "transfer()", legal: "Assign / sell entity" },
                    { fn: "burn()", legal: "Dissolve" },
                    { fn: "amendEntity()", legal: "Amend operating agreement" },
                    { fn: "NFT metadata", legal: "Living legal record" },
                  ].map((row) => (
                    <div
                      key={row.fn}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        border: "1px solid rgba(201,168,76,0.08)",
                        padding: "14px 20px",
                        background: "rgba(201,168,76,0.01)",
                      }}
                    >
                      <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "var(--brass)" }}>{row.fn}</code>
                      <span style={{ fontSize: "13px", color: "rgba(242,239,232,0.5)", fontFamily: "'DM Mono', monospace" }}>{row.legal}</span>
                    </div>
                  ))}
                </div>
              </DocSection>
            </div>
          )}

          {activeSection === "quickstart" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                Quick Start
              </h2>
              <p style={{ color: "rgba(242,239,232,0.6)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'DM Mono', monospace", marginBottom: "32px" }}>
                Mint your first legal entity in under 5 minutes.
              </p>
              <DocSection title="1. Connect to Base">
                <CodeBlock lang="javascript">{`// Add Base to your wallet
const BASE_CHAIN = {
  chainId: '0x2105', // 8453 in hex
  chainName: 'Base',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org']
};

await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [BASE_CHAIN]
});`}</CodeBlock>
              </DocSection>
              <DocSection title="2. Mint a Delaware Series LLC">
                <CodeBlock lang="solidity">{`// AGENTCORP Factory Interface
// Factory Address: see docs.agentcorp.xyz for current address

IAgentCorpFactory factory = IAgentCorpFactory(FACTORY_ADDRESS);

uint256 tokenId = factory.mintEntity{value: 0.05 ether}(
    EntityType.DELAWARE_SERIES_LLC,
    "Acme Holdings LLC",
    arweaveTxHash,      // bytes32 — Arweave TX ID of governing docs
    safeAddress,        // address — Gnosis Safe or EOA
    kycAttestation      // bytes — optional KYC attestation
);

// tokenId is your entity NFT — you are now incorporated`}</CodeBlock>
              </DocSection>
              <DocSection title="3. Mint a Series under your LLC">
                <CodeBlock lang="solidity">{`// Requires ownership of parent LLC token
uint256 seriesTokenId = factory.mintSeries(
    tokenId,                    // parentTokenId — your LLC NFT
    "Acme Carbon Credits LLC",  // seriesName
    seriesDocHash,              // bytes32 — Arweave TX ID
    seriesTreasuryAddress       // address — Series treasury
);

// seriesTokenId is your Series NFT
// Full liability isolation from parent LLC and other Series`}</CodeBlock>
              </DocSection>
              <DocSection title="4. Amend your entity">
                <CodeBlock lang="solidity">{`// Only callable by current NFT holder
factory.amendEntity(
    tokenId,
    newDocHash,                 // bytes32 — new Arweave TX ID
    "Added new member: 0x..."   // amendmentDescription
);

// Amendment hash is appended to on-chain amendment history
// Previous documents remain accessible on Arweave`}</CodeBlock>
              </DocSection>
            </div>
          )}

          {activeSection === "contracts" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                Smart Contract Interface
              </h2>
              <DocSection title="Core Functions">
                <CodeBlock lang="solidity">{`// Mint a new legal entity
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

// Read entity state
function getEntityState(uint256 tokenId) 
    external view returns (EntityState memory);

// Get all Series for a parent LLC
function getSeriesTokens(uint256 parentTokenId) 
    external view returns (uint256[] memory);`}</CodeBlock>
              </DocSection>
              <DocSection title="EntityState Struct">
                <CodeBlock lang="solidity">{`struct EntityState {
    EntityType entityType;
    uint256 formationTimestamp;
    string jurisdictionCode;       // "DE-LLC", "DE-SERIES", "DE-DAO"
    bytes32 primaryDocArweaveTx;   // Primary governing document TX
    bytes32[] amendmentHashes;     // Amendment history
    address treasury;              // Entity asset wallet
    uint256 parentTokenId;         // For Series: parent LLC token (0 if none)
    bool dissolved;
}`}</CodeBlock>
              </DocSection>
              <DocSection title="EntityType Enum">
                <CodeBlock lang="solidity">{`enum EntityType {
    DELAWARE_LLC,           // 0
    DELAWARE_SERIES_LLC,    // 1 — parent
    SERIES_DESIGNATION,     // 2 — child series
    DAO_CHARTER,            // 3
    NONPROFIT,              // 4 (Q3 2026)
    IP_LICENSE,             // 5 (Q2 2026)
    IP_ASSIGNMENT           // 6 (Q2 2026)
}`}</CodeBlock>
              </DocSection>
              <DocSection title="mintEntity Parameters">
                <Param name="entityType" type="EntityType" desc="The type of entity to mint (see EntityType enum)" />
                <Param name="name" type="string" desc="Legal name of the entity (e.g., 'Acme Holdings LLC')" />
                <Param name="docHash" type="bytes32" desc="Arweave Transaction ID of the governing documents package" />
                <Param name="treasury" type="address" desc="Gnosis Safe address or EOA that will hold entity assets" />
                <Param name="kycAttestation" type="bytes" desc="Optional KYC attestation bytes from supported provider" />
              </DocSection>
            </div>
          )}

          {activeSection === "entity-types" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                Entity Types
              </h2>
              {[
                {
                  name: "DELAWARE_SERIES_LLC",
                  status: "Live",
                  price: "0.05 ETH",
                  desc: "A Delaware Limited Liability Company authorized under 6 Del. C. § 18-215 with unlimited legally-segregated Series capability.",
                  docs: ["Certificate of Formation", "LLC Operating Agreement", "Member Register"],
                  uses: ["Master holding company", "DAO entity wrapper", "RWA portfolio parent"],
                },
                {
                  name: "SERIES_DESIGNATION",
                  status: "Live",
                  price: "0.02 ETH",
                  desc: "A legally-isolated Series under a parent Delaware Series LLC. Requires parent LLC token ownership.",
                  docs: ["Series Designation Certificate", "Series Operating Addendum"],
                  uses: ["Project-level entity", "Carbon credit batch", "RWA holding", "IP isolation"],
                },
                {
                  name: "DAO_CHARTER",
                  status: "Live",
                  price: "0.05 ETH",
                  desc: "A Delaware LLC with full blockchain governance provisions: designated smart contract authority, token-weighted voting, delegate disclosure.",
                  docs: ["DAO Operating Agreement", "Vote Delegate Disclosure", "Subscription Agreement"],
                  uses: ["Protocol DAOs", "Investment clubs", "Onchain organizations"],
                },
                {
                  name: "IP_LICENSE",
                  status: "Q2 2026",
                  price: "TBD",
                  desc: "Software license NFT with royalty hooks and sublicense controls.",
                  docs: ["Software License Agreement", "Royalty Schedule"],
                  uses: ["Software licensing", "IP monetization", "Open source with revenue"],
                },
                {
                  name: "NONPROFIT",
                  status: "Q3 2026",
                  price: "0.05 ETH",
                  desc: "Delaware non-profit with 501(c) pathway documentation.",
                  docs: ["Non-Profit Charter", "Foundation Operating Agreement"],
                  uses: ["Protocol foundations", "Grant programs", "Public goods"],
                },
              ].map((entity) => (
                <div
                  key={entity.name}
                  style={{
                    border: "1px solid rgba(201,168,76,0.1)",
                    padding: "32px",
                    marginBottom: "2px",
                    background: "rgba(201,168,76,0.02)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", color: "var(--brass)", display: "block", marginBottom: "6px" }}>
                        {entity.name}
                      </code>
                      <span className={entity.status === "Live" ? "badge-live" : "badge-soon"}>
                        {entity.status}
                      </span>
                    </div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: "var(--brass)" }}>
                      {entity.price}
                    </span>
                  </div>
                  <p style={{ color: "rgba(242,239,232,0.5)", fontSize: "13px", lineHeight: 1.6, fontFamily: "'DM Mono', monospace", marginBottom: "20px" }}>
                    {entity.desc}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div>
                      <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--brass)", opacity: 0.6, marginBottom: "8px", fontFamily: "'DM Mono', monospace" }}>Documents Included</div>
                      {entity.docs.map((d) => (
                        <div key={d} style={{ fontSize: "11px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>→ {d}</div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--brass)", opacity: 0.6, marginBottom: "8px", fontFamily: "'DM Mono', monospace" }}>Use Cases</div>
                      {entity.uses.map((u) => (
                        <div key={u} style={{ fontSize: "11px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>→ {u}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "document-storage" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                Document Storage
              </h2>
              <p style={{ color: "rgba(242,239,232,0.6)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'DM Mono', monospace", marginBottom: "32px" }}>
                All legal documents use dual-storage for permanence and accessibility.
              </p>
              <DocSection title="Storage Architecture">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginBottom: "32px" }}>
                  {[
                    { name: "Arweave", desc: "Permanent, pay-once storage. Documents cannot be deleted. Minimum 200-year persistence guarantee.", color: "#c9a84c" },
                    { name: "IPFS", desc: "Distributed content-addressed retrieval for real-time access. CID stored on-chain alongside Arweave TX ID.", color: "#4caf50" },
                  ].map((s) => (
                    <div key={s.name} style={{ border: "1px solid rgba(201,168,76,0.1)", padding: "24px", background: "rgba(201,168,76,0.02)" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: s.color, marginBottom: "8px" }}>{s.name}</div>
                      <p style={{ fontSize: "12px", color: "rgba(242,239,232,0.5)", fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </DocSection>
              <DocSection title="Document Manifest Schema">
                <CodeBlock lang="json">{`{
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
      "effective_date": "[[FORMATION_DATE]]",
      "status": "ACTIVE"
    },
    {
      "type": "OPERATING_AGREEMENT",
      "arweave_tx": "[[ARWEAVE_TX_ID]]",
      "ipfs_cid": "[[IPFS_CID]]",
      "sha256": "[[DOC_HASH]]",
      "effective_date": "[[FORMATION_DATE]]",
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
}`}</CodeBlock>
              </DocSection>
              <DocSection title="Verification Protocol">
                <CodeBlock lang="javascript">{`// Verify document authenticity
async function verifyDocument(tokenId, documentType) {
  // 1. Get entity state from contract
  const entityState = await factory.getEntityState(tokenId);
  const arweaveTx = entityState.primaryDocArweaveTx;
  
  // 2. Retrieve document from Arweave
  const doc = await fetch(\`https://arweave.net/\${arweaveTx}\`);
  const docBytes = await doc.arrayBuffer();
  
  // 3. Compute SHA-256 hash
  const hash = await crypto.subtle.digest('SHA-256', docBytes);
  const hashHex = Buffer.from(hash).toString('hex');
  
  // 4. Compare to on-chain hash
  const onChainHash = entityState.primaryDocArweaveTx;
  return hashHex === onChainHash; // true = authentic
}`}</CodeBlock>
              </DocSection>
            </div>
          )}

          {activeSection === "governance" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                Governance Adapters
              </h2>
              <p style={{ color: "rgba(242,239,232,0.6)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'DM Mono', monospace", marginBottom: "32px" }}>
                AGENTCORP entities can connect to existing governance frameworks via adapters.
              </p>
              <DocSection title="Gnosis Safe (Multisig)">
                <CodeBlock lang="solidity">{`// GnosisSafeAdapter.sol
// Threshold: Configurable (e.g., 2-of-3, 3-of-5)
// Use case: Small teams, investment vehicles

// Setup: Pass Safe address as treasury + designated contract
factory.mintEntity{value: 0.05 ether}(
    EntityType.DELAWARE_SERIES_LLC,
    "My Holdings LLC",
    docHash,
    GNOSIS_SAFE_ADDRESS,  // treasury = Safe
    kycAttestation
);`}</CodeBlock>
              </DocSection>
              <DocSection title="Compound Governor">
                <CodeBlock lang="solidity">{`// CompoundGovernorAdapter.sol
// Voting: Token-weighted with configurable quorum
// Timelock: Configurable delay (default: 48 hours)
// Use case: DAOs with governance tokens

factory.mintEntity{value: 0.05 ether}(
    EntityType.DAO_CHARTER,
    "Protocol DAO LLC",
    docHash,
    GOVERNOR_ADDRESS,     // treasury = Governor contract
    kycAttestation
);`}</CodeBlock>
              </DocSection>
              <DocSection title="Custom Governance Interface">
                <CodeBlock lang="solidity">{`// IAgentCorpGovernance — implement this interface
// to use any custom governance system

interface IAgentCorpGovernance {
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) external returns (uint256 proposalId);
    
    function vote(uint256 proposalId, uint8 support) external;
    
    function execute(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) external payable returns (uint256);
    
    function cancel(uint256 proposalId) external;
}`}</CodeBlock>
              </DocSection>
            </div>
          )}

          {activeSection === "kyc" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                KYC / Identity Integration
              </h2>
              <p style={{ color: "rgba(242,239,232,0.6)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'DM Mono', monospace", marginBottom: "32px" }}>
                KYC is optional for entity minting but required for subscription agreement compliance.
              </p>
              <DocSection title="Supported Providers">
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "32px" }}>
                  {[
                    { name: "Persona", desc: "Onchain attestation via EAS (Ethereum Attestation Service)", level: "Full KYC" },
                    { name: "Synaps", desc: "KYC attestation with on-chain proof", level: "Full KYC" },
                    { name: "Worldcoin", desc: "Proof of personhood (no identity disclosure)", level: "Personhood" },
                    { name: "Coinbase Verification", desc: "Coinbase KYB/KYC attestation (native Base integration)", level: "KYB/KYC" },
                  ].map((p) => (
                    <div key={p.name} style={{ border: "1px solid rgba(201,168,76,0.1)", padding: "20px 24px", background: "rgba(201,168,76,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                      <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--white)", marginBottom: "4px" }}>{p.name}</div>
                        <div style={{ fontSize: "11px", color: "rgba(242,239,232,0.4)", fontFamily: "'DM Mono', monospace" }}>{p.desc}</div>
                      </div>
                      <span className="badge-brass">{p.level}</span>
                    </div>
                  ))}
                </div>
              </DocSection>
              <DocSection title="Attestation Schema">
                <CodeBlock lang="json">{`{
  "schema": "agentcorp-kyc-v1",
  "provider": "persona",
  "level": "ACCREDITED_INVESTOR",
  "attestation_hash": "0x...",
  "expiry": 1800000000,
  "jurisdiction": "US"
}`}</CodeBlock>
              </DocSection>
            </div>
          )}

          {activeSection === "fees" && (
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", letterSpacing: "-0.02em", marginBottom: "24px", color: "var(--white)" }}>
                Fee Schedule
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "24px" }}>
                {[
                  { action: "mintEntity(DELAWARE_SERIES_LLC)", eth: "0.05 ETH", note: "~$150 at $3k/ETH" },
                  { action: "mintSeries()", eth: "0.02 ETH", note: "Per series under parent" },
                  { action: "mintEntity(DAO_CHARTER)", eth: "0.05 ETH", note: "Governance adapter included" },
                  { action: "mintEntity(NONPROFIT)", eth: "0.05 ETH", note: "Q3 2026" },
                  { action: "amendEntity()", eth: "0.01 ETH", note: "Per amendment event" },
                  { action: "transfer()", eth: "Gas only", note: "Standard ERC-721" },
                  { action: "dissolveEntity()", eth: "0.005 ETH", note: "Burns token, creates record" },
                ].map((fee) => (
                  <div
                    key={fee.action}
                    style={{
                      border: "1px solid rgba(201,168,76,0.1)",
                      padding: "16px 24px",
                      background: "rgba(201,168,76,0.02)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "rgba(242,239,232,0.6)" }}>{fee.action}</code>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: "var(--brass)" }}>{fee.eth}</div>
                      <div style={{ fontSize: "10px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace" }}>{fee.note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "11px", color: "rgba(242,239,232,0.3)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>
                * 20% of all fees flow to protocol treasury for legal template maintenance.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          [style*="grid-template-columns: 240px 1fr"] { grid-template-columns: 1fr !important; }
          [style*="padding: 48px 60px"] { padding: 24px 20px !important; }
          [style*="padding: 48px 48px 32px"] { padding: 24px 20px 16px !important; }
          [style*="position: sticky"] { position: relative !important; height: auto !important; border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.12) !important; overflow-y: visible !important; }
          pre { font-size: 10px !important; }
        }
        @media (max-width: 600px) {
          [style*="padding: 48px 60px"] { padding: 16px !important; }
          [style*="padding: 48px 48px 32px"] { padding: 16px !important; }
          pre { font-size: 9px !important; overflow-x: auto; }
        }
      `}</style>
    </div>
  );
}
