/* ============================================================
   AGENTCORP WHITEPAPER PAGE — Legal Document Aesthetic
   Parchment background, EB Garamond serif, academic layout
   ============================================================ */
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const WP_BG = "https://private-us-east-1.manuscdn.com/sessionFile/DAlP3Nirxrd5JZiMP5CdEg/sandbox/xCg9mkQ57Wade8y9sZ6bwd-img-4_1771639016000_na1fn_YWdlbnRjb3JwLXdoaXRlcGFwZXItYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvREFsUDNOaXJ4cmQ1SlppTVA1Q2RFZy9zYW5kYm94L3hDZzlta1E1N1dhZGU4eTlzWjZid2QtaW1nLTRfMTc3MTYzOTAxNjAwMF9uYTFmbl9ZV2RsYm5SamIzSndMWGRvYVhSbGNHRndaWEl0WW1jLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=FCxKvAJDcrl-cV8A0Xpbo-IAAAFiK9-63yFaC08sxmEhnQGkflF3RJefdZ00HYNZu-B0uiNIl3Zx7ZC0wVFGPXI4GteAxuNL2trRDmifDsN5Ph-6LyndqRy2xaOkV5Hq6azQYOHYUtAUiPoDOhGroV920yrcVdCFXQVXkk4IYelkWPiPPJIe8ZzjbnKZqaaCE~h5-moLjczX~53fBj~Nm9~melywFDSXwvqPX8vuu3SfDiVgd02PE2iZ48NPdpghHYrq9tac6a2fT3yy2adBTM6USHYUkiRrtEucHUIQjD3HVBwVnINILLzECRsnhbxrooU2KKsiNzJ2dWep88assQ__";

const tocItems = [
  { num: "§1", title: "Introduction & Problem Statement" },
  { num: "§2", title: "Background: Legal Wrappers & The KaliDAO Gap" },
  { num: "§3", title: "Protocol Architecture" },
  { num: "§4", title: "Delaware Series LLC: Legal Framework" },
  { num: "§5", title: "Smart Contract Design" },
  { num: "§6", title: "Document Storage & Verification" },
  { num: "§7", title: "Use Cases: Carbon Credits, RWAs & IP" },
  { num: "§8", title: "Governance & Token Economics" },
  { num: "§9", title: "Regulatory Considerations" },
  { num: "§10", title: "Risk Factors" },
  { num: "§11", title: "Roadmap" },
  { num: "§12", title: "Conclusion" },
];

const S = {
  paper: "#f5f0e8",
  paperDark: "#ede8de",
  ink: "#1a1612",
  gold: "#8b6914",
  goldLight: "#c9a84c",
  redMark: "#8b1a1a",
  rule: "#c8b99a",
  muted: "#7a6e60",
  baseBlue: "#0052ff",
};

function WpH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'EB Garamond', serif",
        fontWeight: 500,
        fontSize: "32px",
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        color: S.ink,
      }}
    >
      {children}
    </h2>
  );
}

function WpH3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "'EB Garamond', serif",
        fontWeight: 600,
        fontSize: "22px",
        margin: "40px 0 16px",
        paddingBottom: "8px",
        borderBottom: `1px solid ${S.rule}`,
        color: S.ink,
      }}
    >
      {children}
    </h3>
  );
}

function WpH4({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "12px",
        letterSpacing: "0.15em",
        textTransform: "uppercase" as const,
        color: S.gold,
        margin: "28px 0 12px",
      }}
    >
      {children}
    </h4>
  );
}

function WpP({ children, lead }: { children: React.ReactNode; lead?: boolean }) {
  return (
    <p
      style={{
        marginBottom: "18px",
        fontSize: lead ? "20px" : "17px",
        lineHeight: lead ? 1.6 : 1.75,
        fontStyle: lead ? "italic" : "normal",
        color: S.ink,
        fontFamily: "'EB Garamond', serif",
        paddingLeft: lead ? "24px" : 0,
        borderLeft: lead ? `3px solid ${S.goldLight}` : "none",
      }}
    >
      {children}
    </p>
  );
}

function Callout({ label, children, variant = "default" }: { label: string; children: React.ReactNode; variant?: "default" | "legal" | "base" }) {
  const borderColor = variant === "legal" ? S.redMark : variant === "base" ? S.baseBlue : S.goldLight;
  const labelColor = variant === "legal" ? S.redMark : variant === "base" ? S.baseBlue : S.gold;
  return (
    <div
      style={{
        background: S.paperDark,
        border: `1px solid ${S.rule}`,
        borderLeft: `4px solid ${borderColor}`,
        padding: "24px 28px",
        margin: "32px 0",
        fontSize: "16px",
        fontFamily: "'EB Garamond', serif",
        color: S.ink,
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: labelColor,
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function DefList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <div style={{ margin: "24px 0" }}>
      {items.map((item) => (
        <div
          key={item.term}
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "20px",
            padding: "12px 0",
            borderBottom: `1px dotted ${S.rule}`,
            fontSize: "16px",
            fontFamily: "'EB Garamond', serif",
            color: S.ink,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "13px",
              fontWeight: 700,
              color: S.gold,
              paddingTop: "2px",
            }}
          >
            {item.term}
          </div>
          <div>{item.def}</div>
        </div>
      ))}
    </div>
  );
}

function WpSection({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      style={{
        padding: "80px 0 60px",
        borderBottom: `1px solid ${S.rule}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "20px",
          marginBottom: "40px",
          paddingBottom: "20px",
          borderBottom: `2px solid ${S.ink}`,
        }}
      >
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "48px",
            color: S.paperDark,
            WebkitTextStroke: `1px ${S.rule}`,
            lineHeight: 1,
          }}
        >
          {num}
        </div>
        <WpH2>{title}</WpH2>
      </div>
      {children}
    </div>
  );
}

export default function Whitepaper() {
  return (
    <div style={{ background: "var(--black)", minHeight: "100vh" }}>
      <Nav />

      {/* Hero Banner */}
      <div
        style={{
          paddingTop: "80px",
          background: "var(--black)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            padding: "60px 48px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: "16px" }}>Technical Whitepaper</div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "var(--white)",
              }}
            >
              On-Chain{" "}
              <em
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--brass)",
                }}
              >
                Legal Infrastructure
              </em>
              <br />
              Protocol
            </h1>
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "rgba(242,239,232,0.4)",
              lineHeight: 1.8,
              textAlign: "right",
            }}
          >
            <div>Version 1.0 — February 2026</div>
            <div>Base Mainnet · Chain ID 8453</div>
            <div>Delaware Registered</div>
            <div style={{ marginTop: "8px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10px",
                  color: S.baseBlue,
                  border: `1px solid ${S.baseBlue}`,
                  padding: "4px 12px",
                  opacity: 0.8,
                }}
              >
                <span style={{ width: "6px", height: "6px", background: S.baseBlue, borderRadius: "50%", display: "inline-block" }} />
                Built on Base (Coinbase L2)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Body */}
      <div
        style={{
          background: S.paper,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "80px 60px",
            position: "relative",
          }}
        >
          {/* Watermark stamp */}
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "40px",
              width: "140px",
              height: "140px",
              border: `2px solid ${S.redMark}`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              transform: "rotate(15deg)",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: S.redMark,
                lineHeight: 1.8,
              }}
            >
              DRAFT<br />WHITEPAPER<br />V 1.0<br />2026
            </div>
          </div>

          {/* Abstract */}
          <div
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              maxWidth: "600px",
              padding: "32px 0",
              borderTop: `1px solid ${S.rule}`,
              borderBottom: `1px solid ${S.rule}`,
              color: S.ink,
              fontStyle: "italic",
              fontFamily: "'EB Garamond', serif",
              marginBottom: "60px",
            }}
          >
            We present AGENTCORP: an open protocol enabling any individual or organization to mint legally-recognized entities as non-fungible tokens on Base. The NFT is not a certificate — it <em>is</em> the entity. Mint equals incorporate. Transfer equals assign. Burn equals dissolve. Legal documents are stored permanently on Arweave and IPFS, with cryptographic hashes verified on-chain. The initial implementation targets Delaware Series LLCs, with extensions planned for non-profits, IP holding structures, and cross-jurisdictional formations.
          </div>

          {/* TOC */}
          <div
            style={{
              padding: "60px 0",
              borderBottom: `2px solid ${S.ink}`,
              marginBottom: "0",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "14px",
                letterSpacing: "0.25em",
                color: S.muted,
                marginBottom: "32px",
                textTransform: "uppercase" as const,
              }}
            >
              Table of Contents
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {tocItems.map((item) => (
                <li
                  key={item.num}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    padding: "6px 0",
                    borderBottom: `1px dotted ${S.rule}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      color: S.gold,
                      width: "40px",
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: "16px",
                      fontFamily: "'EB Garamond', serif",
                      color: S.ink,
                    }}
                  >
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 1 */}
          <WpSection id="s1" num="1" title="Introduction & Problem Statement">
            <WpP lead>
              The onchain economy has outpaced its legal infrastructure. Billions of dollars flow through decentralized protocols, DAOs hold treasury assets, and real-world property rights are being tokenized — yet the legal layer connecting these assets to enforceable rights remains primitive, expensive, and inaccessible.
            </WpP>
            <WpP>
              Forming a legal entity today requires lawyers, paper filings, weeks of processing time, and thousands of dollars in professional fees. Once formed, maintaining that entity — amending operating agreements, tracking membership changes, assigning IP, managing governance — requires ongoing professional overhead that prices out individuals, small DAOs, and early-stage projects.
            </WpP>
            <WpP>
              The result is a legal gap. Most DAOs and onchain organizations operate without any recognized legal structure. They cannot sign contracts, hold property, employ people, or protect members from personal liability. When disputes arise — and they do — there is no framework for resolution. When projects succeed, there is no clear mechanism for IP protection, equity distribution, or regulatory compliance.
            </WpP>
            <WpH3>The Core Insight</WpH3>
            <WpP>
              AGENTCORP is built on a single insight: <strong>a legal entity is, at its core, a record</strong>. A set of documents establishing who the members are, what the rules are, and how the organization operates. These documents are traditionally held by lawyers, registered agents, and government databases — expensive, siloed, and inaccessible.
            </WpP>
            <WpP>
              What if that record lived on a blockchain? What if forming an entity was as simple as minting an NFT? What if every amendment, member change, and governance decision was captured as an immutable on-chain event, with documents stored permanently on Arweave?
            </WpP>
            <WpP>That is AGENTCORP. An NFT-native legal entity protocol where:</WpP>
            <DefList
              items={[
                { term: "Mint", def: "= Incorporate a new legal entity" },
                { term: "Transfer", def: "= Assign or sell the entity to a new owner" },
                { term: "Burn", def: "= Dissolve the entity" },
                { term: "Metadata", def: "= The living legal record (documents, amendments, member register)" },
                { term: "Treasury Address", def: "= Entity's asset holding wallet (Safe multisig or EOA)" },
              ]}
            />
            <WpH3>Why Base?</WpH3>
            <WpP>
              AGENTCORP deploys on Base — Coinbase's Ethereum L2 — for four reasons: (1) sub-cent transaction costs make per-entity minting economically viable; (2) Coinbase's regulatory positioning provides institutional comfort; (3) Base's EVM compatibility maximizes interoperability with existing DeFi infrastructure; and (4) Base's growing ecosystem of real-world asset protocols aligns directly with AGENTCORP's target use cases.
            </WpP>
            <Callout label="Base Chain Parameters" variant="base">
              Chain ID: 8453 · Block Time: ~2 seconds · Native Token: ETH · EVM Compatible · Coinbase Operated · OP Stack L2
            </Callout>
          </WpSection>

          {/* Section 2 */}
          <WpSection id="s2" num="2" title="Background: Legal Wrappers & The KaliDAO Gap">
            <WpP lead>
              The idea of wrapping onchain organizations in legal entities is not new. KaliDAO's Wrappr was the most prominent attempt — NFT-based legal entity formation deployed on Ethereum. But Wrappr is no longer maintained, leaving a critical infrastructure gap in the market.
            </WpP>
            <WpH3>A Brief History of Onchain Legal Infrastructure</WpH3>
            <WpP>
              The first generation of onchain organizations — early DAOs like The DAO (2016) — operated entirely without legal wrappers. Members were pseudonymous, assets were held in smart contracts, and governance was purely technical. The legal consequences were severe: The DAO hack exposed members to potential personal liability with no organizational shield.
            </WpP>
            <WpP>
              The second generation recognized this problem. Projects like Aragon, Gnosis Safe, and Compound introduced sophisticated governance tooling, but still lacked native legal entity formation. The workaround was manual: projects formed traditional LLCs or foundations in parallel with their onchain structures, maintaining dual systems that rarely stayed in sync.
            </WpP>
            <WpP>
              KaliDAO's Wrappr represented the third generation — attempting to directly bridge onchain governance with legal entity formation. Users could mint an LLC, DAO LLC, or Non-Profit NFT. The NFT contained a link to a legal operating agreement stored on IPFS, and the holder was treated as the entity's controlling member.
            </WpP>
            <WpH3>The KaliDAO Problem</WpH3>
            <WpP>
              Wrappr launched in 2022 and gained significant traction. But by 2024, the project had effectively been abandoned. Smart contracts remain deployed but unaudited for new vulnerabilities. Legal templates have not been updated to reflect regulatory developments. The frontend is intermittently unavailable. The team has moved on to other projects.
            </WpP>
            <Callout label="Market Gap Analysis" variant="legal">
              Estimated 4,000+ active DAOs currently operating without legal entity wrappers. Total treasury value across unmaintained or unincorporated DAOs exceeds $2.1B. The cost of legal entity formation through traditional means: $2,000–$15,000 per entity. AGENTCORP target price: 0.05 ETH (~$150).
            </Callout>
            <WpH3>What AGENTCORP Improves</WpH3>
            <div style={{ overflowX: "auto", margin: "28px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px", fontFamily: "'EB Garamond', serif" }}>
                <thead>
                  <tr>
                    {["Feature", "Traditional LLC", "KaliDAO Wrappr", "AGENTCORP"].map((h) => (
                      <th key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: S.muted, padding: "10px 12px", textAlign: "left", borderBottom: `2px solid ${S.ink}`, background: S.paperDark }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Formation Cost", "$2,000–$15,000", "Gas only", "0.05 ETH + gas"],
                    ["Formation Time", "1–4 weeks", "<5 minutes", "<5 minutes"],
                    ["Document Storage", "Lawyer's files", "IPFS (no permanence)", "Arweave + IPFS"],
                    ["Template Maintenance", "Annual retainer", "Abandoned", "Active open-source"],
                    ["Series LLC Support", "Available (expensive)", "Not supported", "Native support"],
                    ["RWA / Carbon Credits", "Manual", "Not supported", "Built-in Series model"],
                    ["Tax Optimization", "Available (expensive)", "Not supported", "Series-level isolation"],
                    ["Maintained", "Yes (with fees)", "No", "Yes (open-source)"],
                  ].map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "12px", borderBottom: `1px solid ${S.rule}`, verticalAlign: "top", lineHeight: 1.5, background: i % 2 === 0 ? "transparent" : `rgba(200,185,154,0.15)`, color: j === 3 ? S.gold : S.ink, fontWeight: j === 3 ? 600 : 400 }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WpSection>

          {/* Section 3 */}
          <WpSection id="s3" num="3" title="Protocol Architecture">
            <WpP lead>
              AGENTCORP is a three-layer system: a smart contract layer on Base managing NFT minting and entity state, a document layer on Arweave and IPFS managing legal records, and a frontend layer enabling wallet-native entity formation.
            </WpP>
            <WpH3>Layer 1: Smart Contracts (Base)</WpH3>
            <WpH4>Factory Contract</WpH4>
            <WpP>
              The <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", background: S.paperDark, padding: "2px 6px", color: S.redMark }}>AgentCorpFactory</code> contract manages entity minting. It accepts entity type parameters, validates KYC/AML attestations, stores document hashes, and mints the corresponding ERC-721 NFT. The factory maintains a registry of all minted entities and their current state.
            </WpP>
            <WpH4>Entity NFT Contract</WpH4>
            <WpP>
              Each entity is an ERC-721 token. The token URI points to a JSON metadata file on Arweave containing: entity type, formation date, jurisdiction, governing document hash, member register hash, and amendment history. Token transfer = entity assignment. Only the current token holder controls the entity.
            </WpP>
            <WpH4>Series Registry</WpH4>
            <WpP>
              For Delaware Series LLCs, a separate <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", background: S.paperDark, padding: "2px 6px", color: S.redMark }}>SeriesRegistry</code> contract tracks the relationship between parent LLC tokens and their child Series tokens. Each Series is itself an NFT, maintaining its own document hash, treasury address, and member list.
            </WpP>
            <pre style={{ background: S.ink, color: S.paper, fontFamily: "'DM Mono', monospace", fontSize: "13px", padding: "28px 32px", margin: "28px 0", overflowX: "auto", lineHeight: 1.6, borderLeft: `4px solid ${S.goldLight}` }}>
{`interface IAgentCorpFactory {
    function mintEntity(
        EntityType entityType,    // LLC, SERIES, DAO, NONPROFIT
        string calldata name,
        bytes32 docHash,          // Arweave TX ID of governing docs
        address treasury,         // Safe or EOA holding assets
        bytes calldata kycAttestation
    ) external payable returns (uint256 tokenId);

    function mintSeries(
        uint256 parentTokenId,    // Parent LLC token
        string calldata seriesName,
        bytes32 seriesDocHash,
        address seriesTreasury
    ) external returns (uint256 seriesTokenId);

    function amendEntity(
        uint256 tokenId,
        bytes32 newDocHash,
        string calldata amendmentDescription
    ) external;
}`}
            </pre>
            <WpH3>Layer 2: Document Storage</WpH3>
            <WpP>
              Legal documents are stored in two locations for redundancy and permanence: <strong>Arweave</strong> for permanent, pay-once storage (documents cannot be deleted or altered), and <strong>IPFS</strong> for distributed access via standard content-addressed retrieval.
            </WpP>
            <WpP>
              The on-chain NFT metadata contains the Arweave Transaction ID and the IPFS CID for each document. Any party can verify the authenticity of a document by: (1) retrieving the document from Arweave or IPFS, (2) computing its hash, and (3) comparing to the on-chain record. Tampering is cryptographically impossible.
            </WpP>
            <WpH3>Layer 3: Frontend (dApp)</WpH3>
            <WpP>
              The AGENTCORP dApp provides a wallet-connect incorporation flow. Users: connect wallet → select entity type → configure variables → review documents → sign with wallet → pay mint fee → receive entity NFT. The entire flow is non-custodial. AGENTCORP never holds user keys or controls entity assets.
            </WpP>
          </WpSection>

          {/* Section 4 */}
          <WpSection id="s4" num="4" title="Delaware Series LLC: Legal Framework">
            <WpP lead>
              The Delaware Series LLC is the most powerful legal structure for onchain organizations. A single parent LLC can hold unlimited legally-segregated Series, each with independent asset ownership, member structures, and liability isolation — all under a unified governance framework.
            </WpP>
            <WpH3>Statutory Basis</WpH3>
            <WpP>
              Delaware Series LLCs are authorized under <strong>6 Del. C. § 18-215</strong>, enacted in 1996 and significantly expanded through 2019 amendments. The statute permits a Delaware LLC's operating agreement to establish designated "series" of members, managers, or interests with full asset segregation, separate economic rights, and internal governance autonomy.
            </WpP>
            <Callout label="Key Legal Properties">
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "16px", color: S.ink, marginBottom: "12px" }}>
                <strong>Asset Segregation:</strong> Assets of a Series are not subject to the liabilities of the LLC or any other Series. Each Series is effectively a separate liability shield.
              </p>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "16px", color: S.ink, marginBottom: "12px" }}>
                <strong>Separate Economic Rights:</strong> Each Series can hold its own assets, issue its own interests to members, and conduct its own business activities independently.
              </p>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "16px", color: S.ink }}>
                <strong>Internal Governance:</strong> Each Series can have its own governance rules, profit allocation, and dissolution procedures — all without requiring separate state filings for each Series.
              </p>
            </Callout>
            <WpH3>Onchain Governance Provisions</WpH3>
            <WpP>
              AGENTCORP's Delaware Series LLC operating agreement template includes crypto-native provisions drafted specifically for blockchain governance:
            </WpP>
            <DefList
              items={[
                { term: "Designated Smart Contract", def: "The operating agreement designates a specific smart contract address as the authoritative governance mechanism. Actions taken via the Designated Smart Contract bind the entity." },
                { term: "Token-Weighted Voting", def: "Member voting power is determined by governance token holdings, with configurable majority thresholds for different action types." },
                { term: "Material Adverse Exception", def: "Provisions addressing consensus attacks, smart contract bugs, regulatory orders, and other events that may require overriding on-chain governance with member action." },
                { term: "Waiver of Fiduciary Duties", def: "Standard fiduciary duties are replaced with contractual obligations of good faith and fair dealing, appropriate for token-governed organizations." },
                { term: "Capital Contributions", def: "Capital may be contributed in the form of fiat, cryptocurrency, digital assets, tokenized securities, NFTs, or services. All contributions are recorded on-chain." },
              ]}
            />
          </WpSection>

          {/* Section 5 */}
          <WpSection id="s5" num="5" title="Smart Contract Design">
            <WpP lead>
              The AGENTCORP smart contract system is designed for security, upgradeability, and composability. Core contracts are immutable; governance and fee parameters are upgradeable via a timelocked multisig.
            </WpP>
            <WpH3>EntityState Struct</WpH3>
            <pre style={{ background: S.ink, color: S.paper, fontFamily: "'DM Mono', monospace", fontSize: "13px", padding: "28px 32px", margin: "28px 0", overflowX: "auto", lineHeight: 1.6, borderLeft: `4px solid ${S.goldLight}` }}>
{`struct EntityState {
    EntityType entityType;
    uint256 formationTimestamp;
    string jurisdictionCode;       // "DE-LLC", "DE-SERIES", "DE-DAO"
    bytes32 primaryDocArweaveTx;   // Primary governing document TX
    bytes32[] amendmentHashes;     // Amendment history
    address treasury;              // Entity asset wallet
    uint256 parentTokenId;         // For Series: parent LLC token (0 if none)
    bool dissolved;
}

enum EntityType {
    DELAWARE_LLC,           // 0
    DELAWARE_SERIES_LLC,    // 1 — parent
    SERIES_DESIGNATION,     // 2 — child series
    DAO_CHARTER,            // 3
    NONPROFIT,              // 4 (Q3 2026)
    IP_LICENSE,             // 5 (Q2 2026)
    IP_ASSIGNMENT           // 6 (Q2 2026)
}`}
            </pre>
            <WpH3>Security Model</WpH3>
            <WpP>
              The factory contract implements a role-based access control system. Entity minting is permissionless (any wallet can mint). Entity amendment and dissolution require the current NFT holder's signature. Protocol parameter changes require a 48-hour timelock and 3-of-5 multisig approval from the protocol governance committee.
            </WpP>
          </WpSection>

          {/* Section 6 */}
          <WpSection id="s6" num="6" title="Document Storage & Verification">
            <WpP lead>
              AGENTCORP's document storage architecture is designed for permanence, accessibility, and cryptographic verifiability. Documents are stored on both Arweave and IPFS, with content hashes anchored on-chain.
            </WpP>
            <WpH3>Arweave: Permanent Storage</WpH3>
            <WpP>
              Arweave provides pay-once, store-forever storage with a 200-year minimum persistence guarantee backed by an endowment model. Legal documents stored on Arweave cannot be deleted, altered, or censored. The Arweave Transaction ID is stored on-chain as the primary document reference.
            </WpP>
            <WpH3>IPFS: Distributed Access</WpH3>
            <WpP>
              IPFS provides content-addressed retrieval via CID (Content Identifier). Documents are pinned to multiple IPFS nodes for redundancy. The IPFS CID is stored on-chain alongside the Arweave TX ID, providing a fallback access path.
            </WpP>
            <WpH3>Verification Protocol</WpH3>
            <WpP>
              Any party can verify document authenticity: (1) retrieve document from Arweave or IPFS using the on-chain reference, (2) compute SHA-256 hash of the retrieved document, (3) compare to the on-chain hash stored in the NFT metadata. A match proves the document is authentic and unaltered.
            </WpP>
          </WpSection>

          {/* Section 7 */}
          <WpSection id="s7" num="7" title="Use Cases: Carbon Credits, RWAs & IP">
            <WpP lead>
              The Delaware Series LLC structure is uniquely suited for real-world asset tokenization. Each Series provides a legally-isolated holding vehicle for a specific asset class, with independent liability protection and governance.
            </WpP>
            <WpH3>Carbon Credit Projects</WpH3>
            <WpP>
              A climate tech company can mint a parent Delaware Series LLC as the master holding entity, then mint individual Series for each carbon credit project — biochar, reforestation, direct air capture. Each Series holds its carbon credit tokens independently, with liability isolation between projects. The parent LLC provides unified governance and reporting.
            </WpP>
            <WpH3>Real-World Asset Tokenization</WpH3>
            <WpP>
              Real estate, commodities, and other physical assets can be held within Series LLCs with clear chain of title on-chain. Each property or asset pool becomes a Series, with its own member structure and governance rules. Investors hold Series membership interests represented as tokens.
            </WpP>
            <WpH3>IP Holding Structures</WpH3>
            <WpP>
              Software companies and creators can use AGENTCORP Series LLCs to hold and license intellectual property. Each software product or IP asset becomes a Series, with royalty streams flowing through the on-chain treasury. IP License NFTs (coming Q2 2026) will provide machine-readable licensing terms.
            </WpP>
            <WpH3>Protocol DAOs</WpH3>
            <WpP>
              DeFi protocols and DAOs can use AGENTCORP DAO Charters to create legally-recognized governance structures. The DAO Charter includes Compound Governor compatibility, Gnosis Safe integration, and Material Adverse Exception handling for edge cases where on-chain governance may need to be overridden.
            </WpP>
          </WpSection>

          {/* Section 8 */}
          <WpSection id="s8" num="8" title="Governance & Token Economics">
            <WpP lead>
              AGENTCORP protocol governance is managed by a multisig committee with plans for progressive decentralization. Protocol fees flow to a treasury that funds legal template maintenance and protocol development.
            </WpP>
            <WpH3>Fee Structure</WpH3>
            <DefList
              items={[
                { term: "Delaware Series LLC", def: "0.05 ETH (~$150 at $3k/ETH)" },
                { term: "Series Designation", def: "0.02 ETH per series under parent" },
                { term: "DAO Charter", def: "0.05 ETH (governance adapter included)" },
                { term: "Document Amendment", def: "0.01 ETH per amendment event" },
                { term: "Entity Transfer", def: "Gas only (standard ERC-721)" },
                { term: "Entity Dissolution", def: "0.005 ETH (burns token, creates record)" },
              ]}
            />
            <WpP>
              20% of all protocol fees flow to the protocol treasury. The treasury funds ongoing legal template maintenance, smart contract audits, and protocol development. The remaining 80% is retained as protocol revenue.
            </WpP>
          </WpSection>

          {/* Section 9 */}
          <WpSection id="s9" num="9" title="Regulatory Considerations">
            <WpP lead>
              AGENTCORP operates at the intersection of blockchain technology and corporate law. The regulatory landscape is evolving, and the protocol is designed to adapt to regulatory developments while maintaining its core value proposition.
            </WpP>
            <WpH3>Delaware Legal Framework</WpH3>
            <WpP>
              Delaware's LLC statute explicitly permits electronic records and blockchain-based governance. The 2019 amendments to the Delaware LLC Act (Senate Bill 69) clarified that LLCs may use blockchain technology for records management, member registers, and governance. AGENTCORP's operating agreement templates are drafted in compliance with current Delaware law.
            </WpP>
            <WpH3>KYC/AML Compliance</WpH3>
            <WpP>
              KYC attestation is optional for entity minting but required for subscription agreement compliance. AGENTCORP integrates with Persona, Synaps, Worldcoin, and Coinbase Verification for on-chain identity attestations. Attestation hashes are stored on-chain; personal data is never stored by the protocol.
            </WpP>
            <Callout label="Legal Disclaimer" variant="legal">
              AGENTCORP provides legal document templates and infrastructure. It does not provide legal advice. Users should consult qualified legal counsel for their specific situation. Legal templates are maintained by qualified attorneys but are not a substitute for professional legal advice.
            </Callout>
          </WpSection>

          {/* Section 10 */}
          <WpSection id="s10" num="10" title="Risk Factors">
            <WpP lead>
              Users should carefully consider the following risk factors before using the AGENTCORP protocol.
            </WpP>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "24px 0" }}>
              {[
                { label: "Smart Contract Risk", desc: "Smart contracts may contain undiscovered vulnerabilities. The protocol has been audited but no audit guarantees the absence of bugs." },
                { label: "Regulatory Risk", desc: "The legal status of NFT-based entities may be challenged by regulators. Delaware law is favorable but other jurisdictions may not recognize on-chain entities." },
                { label: "Document Storage Risk", desc: "While Arweave provides strong permanence guarantees, no storage system is 100% permanent. IPFS pins may become unavailable if nodes go offline." },
                { label: "Legal Template Risk", desc: "Legal templates may not be suitable for all use cases. Users should have templates reviewed by qualified counsel for their specific situation." },
              ].map((risk) => (
                <div
                  key={risk.label}
                  style={{
                    border: `1px solid ${S.rule}`,
                    padding: "20px",
                    fontSize: "14px",
                    fontFamily: "'EB Garamond', serif",
                    color: S.ink,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      color: S.redMark,
                      marginBottom: "8px",
                    }}
                  >
                    {risk.label}
                  </div>
                  {risk.desc}
                </div>
              ))}
            </div>
          </WpSection>

          {/* Section 11 */}
          <WpSection id="s11" num="11" title="Roadmap">
            <WpP lead>
              AGENTCORP's development roadmap prioritizes legal template quality, smart contract security, and progressive feature expansion.
            </WpP>
            <div style={{ margin: "32px 0" }}>
              {[
                { period: "Q1 2026 — Live", items: ["Delaware Series LLC (parent)", "Series Designation (child)", "DAO Operating Charter", "Arweave + IPFS document storage", "Base Mainnet deployment", "KYC attestation integration"] },
                { period: "Q2 2026", items: ["IP License NFT", "IP Assignment Agreement", "Software license royalty hooks", "Multi-jurisdiction support (Wyoming)", "Governance adapter library"] },
                { period: "Q3 2026", items: ["Delaware Non-Profit", "RWA Holding Agreement", "Carbon credit batch framework", "Foundation charter template", "Cross-chain entity recognition"] },
                { period: "Q4 2026+", items: ["Marshall Islands DAO LLC", "Cayman Foundation Company", "Protocol DAO governance token", "Entity marketplace", "Legal template DAO"] },
              ].map((phase) => (
                <div
                  key={phase.period}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: "24px",
                    padding: "24px 0",
                    borderBottom: `1px solid ${S.rule}`,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      color: S.gold,
                      fontWeight: 700,
                      paddingTop: "2px",
                    }}
                  >
                    {phase.period}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: "15px",
                          fontFamily: "'EB Garamond', serif",
                          color: S.ink,
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span style={{ color: S.goldLight, fontSize: "12px" }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </WpSection>

          {/* Section 12 */}
          <WpSection id="s12" num="12" title="Conclusion">
            <WpP lead>
              AGENTCORP represents a fundamental shift in how legal entities are formed, maintained, and governed. By treating the NFT as the entity itself — not merely a certificate — we create a new primitive for the onchain economy.
            </WpP>
            <WpP>
              The Delaware Series LLC structure, combined with Arweave's permanent document storage and Base's low-cost transaction environment, creates a legal infrastructure layer that is simultaneously more accessible, more transparent, and more composable than traditional entity formation.
            </WpP>
            <WpP>
              The KaliDAO gap is real. The market need is clear. AGENTCORP is the infrastructure the onchain economy has been waiting for.
            </WpP>
            <div
              style={{
                marginTop: "48px",
                padding: "32px",
                background: S.paperDark,
                border: `1px solid ${S.rule}`,
                borderLeft: `4px solid ${S.goldLight}`,
                fontFamily: "'EB Garamond', serif",
                fontSize: "18px",
                fontStyle: "italic",
                color: S.ink,
                lineHeight: 1.7,
              }}
            >
              "The NFT IS the legal entity. Mint equals incorporate. Transfer equals assign. Burn equals dissolve. Legal documents are stored permanently on Arweave and IPFS, with cryptographic hashes verified on-chain."
              <div style={{ marginTop: "16px", fontFamily: "'DM Mono', monospace", fontSize: "11px", fontStyle: "normal", color: S.muted, letterSpacing: "0.1em" }}>
                — AGENTCORP Protocol v1.0 · February 2026
              </div>
            </div>
          </WpSection>

          {/* Footer note */}
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: S.muted,
              textAlign: "center",
              padding: "20px 0",
              borderTop: `1px solid ${S.rule}`,
              marginTop: "60px",
              letterSpacing: "0.1em",
            }}
          >
            AGENTCORP Protocol v1.0 · Open Source · MIT License · docs.agentcorp.xyz · github.com/agentcorp
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
