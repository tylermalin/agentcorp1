/**
 * /docs — Protocol reference.
 * Editorial layout: sticky TOC on the left (desktop), numbered sections
 * on the right. Content is kept in agreement with /skill.md.
 */
import type { ReactNode } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  CodeFrame,
  Container,
  IndexLabel,
  IndexedRows,
  MetaStrip,
  Note,
  PageHeader,
  SpecList,
  StatusTag,
  btnPrimary,
  btnSecondary,
} from "@/components/site/Primitives";
import {
  FEE_NOTE,
  GITHUB_URL,
  IN_PROGRESS,
  LEGAL_DISCLAIMER,
  LIVE_NOW,
  SDK_SAMPLE,
  SKILL_URL,
  STATUS_LABEL,
} from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Table of contents                                                   */
/* ------------------------------------------------------------------ */

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "deployment", label: "Deployment state" },
  { id: "sdk", label: "SDK preview" },
  { id: "contracts", label: "Contract interface" },
  { id: "examples", label: "Example calls" },
  { id: "entity-types", label: "Entity types" },
  { id: "documents", label: "Documents & manifest" },
  { id: "verification", label: "Verification" },
  { id: "avocado", label: "Gasless execution" },
  { id: "governance", label: "Governance adapters" },
  { id: "identity", label: "Identity / KYC" },
  { id: "fees", label: "Fees" },
  { id: "scope", label: "Scope & legal" },
] as const;

const tocIndex = (id: (typeof TOC)[number]["id"]) =>
  String(TOC.findIndex((t) => t.id === id) + 1).padStart(2, "0");

function DocSection({
  id,
  title,
  intro,
  children,
}: {
  id: (typeof TOC)[number]["id"];
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
      <IndexLabel>
        {tocIndex(id)} / {TOC.find((t) => t.id === id)?.label}
      </IndexLabel>
      <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] md:text-3xl">{title}</h2>
      {intro && <div className="mt-4 max-w-2xl text-sm leading-relaxed text-[#a3a3a3]">{intro}</div>}
      <div className="mt-10 space-y-10">{children}</div>
    </section>
  );
}

function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="mb-4 text-base font-medium tracking-[-0.02em]">{children}</h3>;
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-code text-[0.92em] text-[#fafafa]">{children}</code>;
}

/** Hairline table that scrolls inside its own container on narrow screens. */
function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto border-y border-white/10">
      <table className="w-full min-w-[520px] text-left text-xs">
        <thead>
          <tr className="border-b border-white/10">
            {head.map((h) => (
              <th key={h} className="font-mono-index py-3 pr-4 text-[11px] font-normal uppercase text-[#737373]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={j === 0 ? "py-3 pr-4 text-[#fafafa]" : "py-3 pr-4 text-[#a3a3a3]"}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Code samples (kept in sync with /skill.md)                          */
/* ------------------------------------------------------------------ */

const CONTRACT_FUNCTIONS = `// Register a new entity record
function mintEntity(
    EntityType entityType,
    string calldata name,
    bytes32 docHash,              // Arweave TX ID of the document manifest
    address treasury,             // Safe multisig or EOA
    bytes calldata kycAttestation // wire encoding NOT SPECIFIED
) external payable returns (uint256 tokenId);

// Register a series record under an existing parent record
function mintSeries(
    uint256 parentTokenId,
    string calldata seriesName,
    bytes32 seriesDocHash,
    address seriesTreasury
) external returns (uint256 seriesTokenId);

// Append an amendment to the record (token holder only)
function amendEntity(
    uint256 tokenId,
    bytes32 newDocHash,
    string calldata amendmentDescription
) external;

// Record dissolution documents (token holder only)
function dissolveEntity(
    uint256 tokenId,
    bytes32 dissolutionDocHash
) external;

// Reads
function getEntityState(uint256 tokenId)
    external view returns (EntityState memory);

function getSeriesTokens(uint256 parentTokenId)
    external view returns (uint256[] memory);`;

const ENTITY_ENUM = `enum EntityType {
    DELAWARE_LLC,           // 0
    DELAWARE_SERIES_LLC,    // 1  parent
    SERIES_DESIGNATION,     // 2  child series
    DAO_CHARTER,            // 3
    NONPROFIT,              // 4  not deployed
    IP_LICENSE,             // 5  not deployed
    IP_ASSIGNMENT           // 6  not deployed
}`;

const ENTITY_STATE = `struct EntityState {
    EntityType entityType;
    uint256 formationTimestamp;
    string jurisdictionCode;       // "DE-LLC", "DE-SERIES", "DE-DAO"
    bytes32 primaryDocArweaveTx;   // manifest pointer, NOT a content digest
    bytes32[] amendmentHashes;     // amendment history, in order
    address treasury;              // entity asset wallet
    uint256 parentTokenId;         // 0 if not a Series
    bool dissolved;
}`;

const EXAMPLE_NETWORK = `// Base Sepolia testnet (examples only; mainnet target is Base 8453)
const BASE_SEPOLIA = {
  chainId: "0x14a34", // 84532
  chainName: "Base Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
};

await window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [BASE_SEPOLIA],
});`;

const EXAMPLE_MINT = `// Factory address: NOT PUBLISHED (Sepolia) / NOT DEPLOYED (mainnet)
IAgentsCorpFactory factory = IAgentsCorpFactory(FACTORY_ADDRESS);

// Registers an on-chain record that points at the governing documents.
// It does not file a Certificate of Formation with Delaware.
uint256 tokenId = factory.mintEntity{value: MINT_FEE}(
    EntityType.DELAWARE_SERIES_LLC,
    "Acme Holdings LLC",
    manifestTx,         // bytes32: Arweave TX ID of the manifest
    safeAddress,        // address: Safe multisig or EOA
    kycAttestation      // bytes: encoding not yet specified
);`;

const EXAMPLE_SERIES = `// Caller must hold the parent record token
uint256 seriesTokenId = factory.mintSeries(
    tokenId,                    // parentTokenId
    "Acme Carbon Credits",      // seriesName
    seriesManifestTx,           // bytes32: Arweave TX ID
    seriesTreasuryAddress       // address: series treasury
);
// Liability isolation between series depends on the series being
// properly designated and its records and assets kept separate
// (6 Del. C. § 18-215), not on the token itself.`;

const EXAMPLE_AMEND = `// Check state first: caller holds the token and dissolved == false
EntityState memory s = factory.getEntityState(tokenId);
require(!s.dissolved, "entity record dissolved");

factory.amendEntity(
    tokenId,
    newManifestTx,              // bytes32: new Arweave TX ID
    "Added new member: 0x..."   // amendmentDescription
);
// The amendment hash is appended to amendmentHashes.
// Prior documents remain retrievable on Arweave.`;

const MANIFEST = `{
  "agentscorp_version": "1.0",
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
}`;

const VERIFY = `// The chain anchors the MANIFEST, not each document.
// primaryDocArweaveTx is a storage pointer, not a digest, so
// verification takes two steps: resolve the manifest, then check each
// document against the sha256 recorded inside it.
async function verifyDocument(tokenId, documentType) {
  // 1. Resolve the manifest pointer from on-chain state
  const entityState = await factory.getEntityState(tokenId);
  const manifestTx = entityState.primaryDocArweaveTx;

  // 2. Fetch the manifest
  const res = await fetch(\`https://arweave.net/\${manifestTx}\`);
  const manifest = await res.json();

  // 3. Locate the entry for the document being verified
  const entry = manifest.documents.find((d) => d.type === documentType);
  if (!entry) throw new Error(\`No \${documentType} in manifest \${manifestTx}\`);

  // 4. Fetch that document and hash its bytes
  const docRes = await fetch(\`https://arweave.net/\${entry.arweave_tx}\`);
  const docBytes = await docRes.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", docBytes);
  const hashHex = [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // 5. Compare against the sha256 recorded in the manifest
  return hashHex === entry.sha256.replace(/^0x/, "").toLowerCase();
}`;

const GOVERNANCE_INTERFACE = `// IAgentsCorpGovernance (draft): implement to use a custom
// governance system as the designated controller of a treasury.
interface IAgentsCorpGovernance {
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
}`;

const ATTESTATION = `{
  "schema": "agentscorp-kyc-v1",
  "provider": "[[PROVIDER]]",
  "level": "[[LEVEL]]",
  "attestation_hash": "0x...",
  "expiry": 1800000000,
  "jurisdiction": "US"
}`;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const linkCls = "text-[#fafafa] underline decoration-white/20 underline-offset-4 transition hover:decoration-white";

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa]">
      <Nav />
      <main id="main">
        <Container>
          <PageHeader
            index={`Docs · ${STATUS_LABEL}`}
            title="Protocol documentation."
            lede="Contract interface, entity types, document manifest, verification, and gasless execution for the AgentsCorp protocol. This reference matches the agent specification published at /skill.md."
          >
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={SKILL_URL} className={btnPrimary}>
                Read skill.md
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                GitHub
              </a>
            </div>
          </PageHeader>

          {/* Status block */}
          <section className="border-t border-white/10 py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-2 md:gap-0">
              <div className="md:pr-10">
                <StatusTag tone="live">Live today</StatusTag>
                <ul className="mt-5 divide-y divide-white/10 border-y border-white/10 text-sm">
                  {LIVE_NOW.map((item) => (
                    <li key={item} className="py-3 text-[#fafafa]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:border-l md:border-white/10 md:pl-10">
                <StatusTag tone="planned">In development · target Q1 2027</StatusTag>
                <ul className="mt-5 divide-y divide-white/10 border-y border-white/10 text-sm">
                  {IN_PROGRESS.map((item) => (
                    <li key={item} className="py-3 text-[#a3a3a3]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Note className="mt-10 max-w-2xl">
              Contracts are not deployed to mainnet. There is no factory address to call today. Code
              examples on this page target Base Sepolia for integration work; Base (8453) is the
              mainnet target.
            </Note>
          </section>

          <div className="grid gap-10 md:grid-cols-12">
            {/* Sidebar TOC */}
            <aside className="border-t border-white/10 pt-8 md:col-span-3 md:pt-16">
              <nav aria-label="Contents" className="md:sticky md:top-24">
                <IndexLabel>Contents</IndexLabel>
                <ol className="mt-4 grid grid-cols-2 gap-x-4 md:grid-cols-1">
                  {TOC.map((t, i) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="flex gap-3 py-1.5 text-xs text-[#a3a3a3] transition hover:text-white"
                      >
                        <span className="font-mono-index text-[#737373]">{String(i + 1).padStart(2, "0")}</span>
                        <span>{t.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Content */}
            <div className="min-w-0 md:col-span-9">
              <DocSection
                id="overview"
                title="Overview"
                intro={
                  <>
                    AgentsCorp is a protocol for linking legal-entity records to on-chain state. Each
                    entity record is an ERC-721 token on Base that points at a manifest of governing
                    documents stored on Arweave, with sha256 hashes for verification and an ordered
                    amendment history.
                  </>
                }
              >
                <Note>
                  A token represents and tracks entity records; it does not itself create the entity.
                  Statutory formation (a Delaware Certificate of Formation filed through a registered
                  agent, an EIN, and authorized signatories) and banking depend on real-world filings
                  and counterparties.
                </Note>

                <MetaStrip
                  items={[
                    { label: "Mainnet target", value: "Base · 8453" },
                    { label: "Testnet", value: "Base Sepolia · 84532" },
                    { label: "Token standard", value: "ERC-721" },
                    { label: "Gas", value: "USDC via Avocado" },
                  ]}
                />

                <div>
                  <SubHead>Actions and what they record</SubHead>
                  <IndexedRows
                    rows={[
                      {
                        idx: "0.1",
                        title: <Code>mintEntity()</Code>,
                        body: "Registers an entity record and anchors its document manifest. Pairs with, and does not replace, the statutory filing.",
                      },
                      {
                        idx: "0.2",
                        title: <Code>mintSeries()</Code>,
                        body: "Registers a series record under a parent Delaware Series LLC record held by the caller.",
                      },
                      {
                        idx: "0.3",
                        title: <Code>amendEntity()</Code>,
                        body: "Appends a new manifest hash to the amendment history. Prior versions stay retrievable on Arweave.",
                      },
                      {
                        idx: "0.4",
                        title: <Code>dissolveEntity()</Code>,
                        body: "Records dissolution documents and marks the record dissolved. Statutory dissolution still requires a Certificate of Cancellation filing.",
                      },
                      {
                        idx: "0.5",
                        title: <Code>transfer()</Code>,
                        body: "Standard ERC-721 transfer of the record token. Whether membership interests move with it is governed by the operating agreement, not by the transfer alone.",
                      },
                    ]}
                  />
                </div>
              </DocSection>

              <DocSection
                id="deployment"
                title="Deployment state"
                intro="Values that are still unresolved. Agents and integrators should treat these as absent, not guess them."
              >
                <SpecList
                  className="text-sm"
                  items={[
                    { k: "Factory address, mainnet", v: "NOT DEPLOYED" },
                    { k: "Factory address, Base Sepolia", v: "NOT PUBLIC · to be shared with design partners" },
                    { k: "kycAttestation wire encoding", v: "NOT SPECIFIED" },
                    { k: "Document templates", v: "IN DRAFT · to be shared with design partners" },
                    { k: "Fee mechanism for non-payable calls", v: "UNRESOLVED" },
                  ]}
                />
                <Note>
                  If a user asks to mint on mainnet today, the correct answer is that the contract does
                  not exist yet. Do not construct a transaction or substitute an address from another
                  source.
                </Note>
              </DocSection>

              <DocSection
                id="sdk"
                title="SDK preview"
                intro="The TypeScript SDK is in development. The shape below is a preview of the planned interface and may change before release."
              >
                <CodeFrame title="quickstart.ts" meta="SDK preview · Base Sepolia" code={SDK_SAMPLE} />
                <Note>
                  <Code>@agentscorp/sdk</Code> is not yet published. API keys are issued to design
                  partners;{" "}
                  <a href="/#access" className={linkCls}>
                    apply for early access
                  </a>
                  .
                </Note>
              </DocSection>

              <DocSection
                id="contracts"
                title="Contract interface"
                intro="The factory interface as specified in /skill.md. Function signatures and enums are stable for integration work; addresses are not yet published."
              >
                <CodeFrame title="IAgentsCorpFactory.sol" meta="functions" code={CONTRACT_FUNCTIONS} />
                <div className="grid gap-6 lg:grid-cols-2">
                  <CodeFrame title="EntityType" meta="enum" code={ENTITY_ENUM} />
                  <CodeFrame title="EntityState" meta="struct" code={ENTITY_STATE} />
                </div>
                <div>
                  <SubHead>mintEntity parameters</SubHead>
                  <Table
                    head={["Parameter", "Type", "Description"]}
                    rows={[
                      [<Code>entityType</Code>, "EntityType", "Type of entity record (see enum)"],
                      [<Code>name</Code>, "string", "Exact legal name as filed, e.g. \"Acme Holdings LLC\""],
                      [<Code>docHash</Code>, "bytes32", "Arweave transaction ID of the document manifest"],
                      [<Code>treasury</Code>, "address", "Safe multisig or EOA designated to hold entity assets"],
                      [<Code>kycAttestation</Code>, "bytes", "Identity attestation; encoding not yet specified"],
                    ]}
                  />
                </div>
                <IndexedRows
                  rows={[
                    {
                      idx: "0.1",
                      title: "Read before you write",
                      body: (
                        <>
                          Call <Code>getEntityState</Code> before any write and confirm the caller holds
                          the token and <Code>dissolved</Code> is false. It is free and turns a revert
                          into a sentence you can say to the user.
                        </>
                      ),
                    },
                    {
                      idx: "0.2",
                      title: "Only mintEntity is payable",
                      body: (
                        <>
                          <Code>mintSeries</Code>, <Code>amendEntity</Code>, and{" "}
                          <Code>dissolveEntity</Code> cannot receive ETH as declared; attaching value
                          reverts. The fee mechanism for those three is unresolved.
                        </>
                      ),
                    },
                    {
                      idx: "0.3",
                      title: "Confirmation gate",
                      body: "Once live, agents must print a summary (action, entity type, legal name, jurisdiction, parent, treasury, members, doc hash, fee, what is irreversible) and receive an explicit yes before every state-changing call. A prior yes covers one action.",
                    },
                  ]}
                />
              </DocSection>

              <DocSection
                id="examples"
                title="Example calls"
                intro="Illustrative calls for integration testing on Base Sepolia. FACTORY_ADDRESS and MINT_FEE are placeholders until the testnet deployment is published."
              >
                <CodeFrame title="network.js" meta="Base Sepolia" code={EXAMPLE_NETWORK} />
                <CodeFrame title="mint-entity.sol" meta="Base Sepolia" code={EXAMPLE_MINT} />
                <CodeFrame title="mint-series.sol" meta="Base Sepolia" code={EXAMPLE_SERIES} />
                <CodeFrame title="amend-entity.sol" meta="Base Sepolia" code={EXAMPLE_AMEND} />
              </DocSection>

              <DocSection
                id="entity-types"
                title="Entity types"
                intro="Selection rules from /skill.md, applied in order. First match wins."
              >
                <IndexedRows
                  rows={[
                    {
                      idx: "0.1",
                      title: <Code>SERIES_DESIGNATION</Code>,
                      body: "The user already holds a parent Series LLC record and the new thing is a project, deal, asset batch, or client matter under it.",
                    },
                    {
                      idx: "0.2",
                      title: <Code>DAO_CHARTER</Code>,
                      body: "Governance runs on-chain through token voting or a Governor contract, or the member set is open and pseudonymous.",
                    },
                    {
                      idx: "0.3",
                      title: <Code>DELAWARE_SERIES_LLC</Code>,
                      body: "The user expects more than one isolated venture, asset, or matter over time. Use as parent, then add series under it.",
                    },
                    {
                      idx: "0.4",
                      title: <Code>DELAWARE_LLC</Code>,
                      body: "Exactly one entity, fixed known member set, no on-chain governance.",
                    },
                    {
                      idx: "0.5",
                      title: "Anything else",
                      body: "Nonprofits, IP licenses, IP assignments, and RWA holding agreements are not deployed. Say so and stop.",
                    },
                  ]}
                />
                <Note>
                  If 0.3 and 0.4 are both plausible, ask how many entities the user expects. That is the
                  only input that changes the answer.
                </Note>

                <div>
                  <SubHead>Reference</SubHead>
                  <Table
                    head={["Type", "Code", "Documents", "Typical use", "Status"]}
                    rows={[
                      [
                        <Code>DELAWARE_SERIES_LLC</Code>,
                        "DE-SERIES",
                        "Certificate of Formation, LLC Operating Agreement, Member Register",
                        "Holding company, DAO wrapper, RWA portfolio parent",
                        "In development",
                      ],
                      [
                        <Code>SERIES_DESIGNATION</Code>,
                        "DE-SERIES",
                        "Series Designation, Series Operating Addendum",
                        "Project, asset batch, or agent series under a parent",
                        "In development",
                      ],
                      [
                        <Code>DELAWARE_LLC</Code>,
                        "DE-LLC",
                        "Certificate of Formation, LLC Operating Agreement",
                        "Single operating entity, fixed members",
                        "In development",
                      ],
                      [
                        <Code>DAO_CHARTER</Code>,
                        "DE-DAO",
                        "DAO Operating Agreement, Vote Delegate Disclosure, Subscription Agreement",
                        "Protocol DAOs, investment clubs, on-chain organizations",
                        "Planned",
                      ],
                      [
                        <Code>IP_LICENSE</Code>,
                        "—",
                        "Software License Agreement, Royalty Schedule",
                        "Software licensing, IP monetization",
                        "Not deployed",
                      ],
                      [
                        <Code>NONPROFIT</Code>,
                        "—",
                        "Non-Profit Charter, Foundation Operating Agreement",
                        "Protocol foundations, grant programs",
                        "Not deployed",
                      ],
                      [
                        <Code>IP_ASSIGNMENT</Code>,
                        "—",
                        "—",
                        "—",
                        "Not deployed",
                      ],
                    ]}
                  />
                </div>
              </DocSection>

              <DocSection
                id="documents"
                title="Documents & manifest"
                intro="mintEntity requires docHash: the Arweave transaction ID of a manifest whose documents exist before the call."
              >
                <div>
                  <SubHead>Producing the governing documents</SubHead>
                  <IndexedRows
                    rows={[
                      { idx: "0.1", title: "Load the template", body: "Use the published template for the entity type. If it is not available, stop. Do not draft a Delaware operating agreement from memory." },
                      { idx: "0.2", title: "Fill every variable", body: <>Fill every <Code>[[VARIABLE]]</Code> and verify no <Code>[[</Code> remains. An unfilled variable in a filed document is a defect in the legal record.</> },
                      { idx: "0.3", title: "Hash and store", body: "Compute sha256 of each document. Upload to Arweave, pin to IPFS, and record the transaction ID and CID." },
                      { idx: "0.4", title: "Round-trip check", body: "Retrieve from Arweave and rehash. If it does not match what you uploaded, stop." },
                      { idx: "0.5", title: "Build the manifest", body: "Assemble the manifest below and upload it. Its Arweave transaction ID is the docHash." },
                    ]}
                  />
                </div>
                <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
                  <div className="bg-[#000000] p-6">
                    <IndexLabel>Arweave</IndexLabel>
                    <p className="mt-3 text-sm leading-relaxed text-[#a3a3a3]">
                      Pay-once permanent storage. Transactions are immutable, which is what makes a
                      transaction ID sufficient as a pointer.
                    </p>
                  </div>
                  <div className="bg-[#000000] p-6">
                    <IndexLabel>IPFS</IndexLabel>
                    <p className="mt-3 text-sm leading-relaxed text-[#a3a3a3]">
                      Content-addressed retrieval for fast access. The CID is recorded in the manifest
                      alongside the Arweave transaction ID.
                    </p>
                  </div>
                </div>
                <CodeFrame title="manifest.json" meta="agentscorp_version 1.0" code={MANIFEST} />
                <Note>
                  <Code>chain_id</Code> is 8453 for mainnet records. Use 84532 for Base Sepolia test
                  manifests.
                </Note>
              </DocSection>

              <DocSection
                id="verification"
                title="Verification"
                intro="The chain anchors the manifest, not each document. primaryDocArweaveTx is a storage pointer, not a digest."
              >
                <IndexedRows
                  rows={[
                    { idx: "0.1", title: "Fetch the manifest", body: <>Resolve <Code>primaryDocArweaveTx</Code> from <Code>getEntityState</Code> and fetch it from Arweave.</> },
                    { idx: "0.2", title: "Check each document", body: <>For each entry in <Code>documents</Code>, fetch by <Code>arweave_tx</Code>, compute sha256 of the bytes, and compare to the entry's <Code>sha256</Code>.</> },
                    { idx: "0.3", title: "Walk amendments", body: <>A mismatch means a document was replaced after registration. Amendment history lives in <Code>amendmentHashes</Code>; walk it in order to reconstruct prior versions.</> },
                  ]}
                />
                <CodeFrame title="verify.js" meta="browser or Node 18+" code={VERIFY} />
              </DocSection>

              <DocSection
                id="avocado"
                title="Gasless execution via Avocado"
                intro="Agents are designed to transact through Avocado and never hold ETH; gas is paid in USDC. Four details account for most failures."
              >
                <IndexedRows
                  rows={[
                    { idx: "0.1", title: "EIP-712 chainId is 634", body: "Sign against the Avocado chain, not 8453. Signing against Base produces a well-formed signature the broadcaster rejects." },
                    { idx: "0.2", title: "avoNonce is always -1", body: "Nonces are non-sequential by design." },
                    { idx: "0.3", title: "Fresh salt per transaction", body: "salt must be fresh random 32 bytes. Reused salts collide." },
                    { idx: "0.4", title: "Batch limit", body: "Up to 20 actions batch per transaction. Mints do not go in a batch." },
                  ]}
                />
                <div>
                  <SubHead>Sequence</SubHead>
                  <ol className="space-y-2 text-sm text-[#a3a3a3]">
                    {[
                      <>Deposit USDC to the Avocado wallet on Base.</>,
                      <><Code>POST /v1/deposit</Code> at <Code>api.avcd.io</Code>.</>,
                      <>Sign the EIP-712 Cast message.</>,
                      <><Code>POST /v1/broadcast</Code>.</>,
                      <>Poll <Code>GET /v1/transaction/:hash</Code>. Do not report success before confirmation.</>,
                    ].map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="font-mono-index text-xs text-[#737373]">0.{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <SubHead>Third-party contracts on Base (8453)</SubHead>
                  <Table
                    head={["Contract", "Address"]}
                    rows={[
                      ["AvocadoBroadcaster", <Code>0x0A6E5E7ae08896B0286441367843f4cA59D04dEf</Code>],
                      ["AvoFactory", <Code>0xe981E50c7c47F0Df8826B5ce3F533f5E4440e687</Code>],
                      ["USDC", <Code>0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913</Code>],
                    ]}
                  />
                  <Note className="mt-4">
                    These are Avocado and Circle contracts, not AgentsCorp deployments. Reference:{" "}
                    <a href="https://avcd.io/skill.md" target="_blank" rel="noopener noreferrer" className={linkCls}>
                      avcd.io/skill.md
                    </a>
                  </Note>
                </div>
              </DocSection>

              <DocSection
                id="governance"
                title="Governance adapters"
                intro="Entity records designate a treasury address. Planned adapters let that address be an existing governance system."
              >
                <IndexedRows
                  rows={[
                    {
                      idx: "0.1",
                      title: "Safe multisig",
                      body: "Pass a Safe address as treasury. Configurable thresholds (for example 2-of-3 or 3-of-5) for small teams, operators, and investment vehicles.",
                    },
                    {
                      idx: "0.2",
                      title: "Governor contract",
                      body: "Pass a Governor address as treasury for DAO_CHARTER records. Token-weighted voting with configurable quorum and timelock.",
                    },
                    {
                      idx: "0.3",
                      title: "Custom governance",
                      body: "Implement the draft interface below to use any other governance system as the designated controller.",
                    },
                  ]}
                />
                <CodeFrame title="IAgentsCorpGovernance.sol" meta="draft" code={GOVERNANCE_INTERFACE} />
              </DocSection>

              <DocSection
                id="identity"
                title="Identity / KYC"
                intro="mintEntity accepts a kycAttestation argument. Its wire encoding is not yet specified, and provider integrations are under evaluation."
              >
                <Table
                  head={["Candidate provider", "Mechanism", "Level"]}
                  rows={[
                    ["Coinbase Verification", "KYB/KYC attestation, native to Base", "KYB / KYC"],
                    ["Persona", "On-chain attestation via EAS", "KYC"],
                    ["Synaps", "KYC attestation with on-chain proof", "KYC"],
                    ["Worldcoin", "Proof of personhood, no identity disclosure", "Personhood"],
                  ]}
                />
                <CodeFrame title="attestation.json" meta="draft schema" code={ATTESTATION} />
                <Note>
                  Statutory filings, EIN applications, and bank onboarding carry their own identity
                  requirements for the humans and organizations behind an entity, independent of any
                  on-chain attestation.
                </Note>
              </DocSection>

              <DocSection id="fees" title="Fees" intro="Planned protocol parameters, subject to mainnet deployment.">
                <Table
                  head={["Action", "Planned fee"]}
                  rows={[
                    ["Register Delaware LLC", "0.05 ETH"],
                    ["Register Series LLC (parent)", "0.05 ETH"],
                    ["Register Series Designation", "0.02 ETH"],
                    ["Register DAO Charter", "0.05 ETH"],
                    ["Amendment", "0.01 ETH"],
                    ["Transfer", "Gas only"],
                    ["Dissolution", "0.005 ETH"],
                  ]}
                />
                <Note>
                  {FEE_NOTE} Planned split: 20% of protocol fees to the protocol treasury for legal
                  template maintenance. Protocol fees do not include state filing fees, registered
                  agent fees, or counsel.
                </Note>
              </DocSection>

              <DocSection id="scope" title="Scope & legal">
                <IndexedRows
                  rows={[
                    {
                      idx: "0.1",
                      title: "What the protocol does",
                      body: "Records entity state, anchors governing documents, and coordinates treasury controls for entities whose statutory formation happens through the normal filing process.",
                    },
                    {
                      idx: "0.2",
                      title: "What it does not do",
                      body: "Give legal advice, opine on tax treatment or securities characterization, or decide whether an arrangement should be an entity at all. When the question is whether rather than how, route to counsel.",
                    },
                  ]}
                />
                <Note>{LEGAL_DISCLAIMER}</Note>
                <div className="flex flex-wrap gap-3">
                  <a href={SKILL_URL} className={btnPrimary}>
                    Read skill.md
                  </a>
                  <Link href="/setup" className={btnSecondary}>
                    Entity setup preview
                  </Link>
                </div>
              </DocSection>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
