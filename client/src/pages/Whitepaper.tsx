/**
 * AgentsCorp whitepaper — Architecture & Protocol Overview (v1.0).
 * Editorial layout: PageHeader + MetaStrip, then a sticky table of
 * contents in the left rail (desktop) and long-form body on the right.
 */

import { useEffect, useState, type ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  CodeFrame,
  Container,
  IndexedRows,
  IndexLabel,
  MetaStrip,
  Note,
  PageHeader,
  SpecList,
  StatusTag,
} from "@/components/site/Primitives";
import {
  ENTITY_ROWS,
  FEE_NOTE,
  GITHUB_URL,
  IN_PROGRESS,
  LIVE_NOW,
  ROADMAP,
  SITE_URL,
  SKILL_URL,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "wrappers", num: "01", title: "Why Existing Wrappers Fall Short" },
  { id: "skill", num: "02", title: "The /skill.md Interface" },
  { id: "architecture", num: "03", title: "Four-Layer Architecture" },
  { id: "series-llc", num: "04", title: "Delaware Series LLC (6 Del. C. § 18-215)" },
  { id: "roadmap", num: "05", title: "Roadmap (2027)" },
  { id: "formation", num: "06", title: "Formation Flow" },
  { id: "coordination", num: "07", title: "Multi-Agent Coordination" },
  { id: "arweave", num: "08", title: "Document Anchoring on Arweave" },
  { id: "avocado", num: "09", title: "Gas Abstraction via Avocado" },
  { id: "entities", num: "10", title: "Entity Types" },
  { id: "economics", num: "11", title: "Protocol Economics" },
  { id: "legal", num: "12", title: "Legal Considerations" },
  { id: "status", num: "13", title: "Current Status" },
  { id: "appendix", num: "14", title: "Technical Appendix" },
] as const;

const ARCHITECTURE = `/skill.md  +  SDKs        agent or developer reads the spec
      │
      ▼
L1  Document anchoring    Arweave
      Operating agreement, series designations, governance rules
      Content hash + transaction ID recorded on-chain
      │
      ▼
L2  Treasury / policy     Multisig (e.g. Safe) + banking rails
      Signers: agents and/or human authorized signatories
      Thresholds, spending caps, approval rules
      │
      ▼
L3  Entity contracts      Base EVM (testnet now; 8453 target)
      mintEntity()   records a parent entity
      mintSeries()   records a series under a parent
      amendEntity()  appends an amendment record
      Registry       protocol-level name uniqueness
      │
      ▼
L4  Gas abstraction       Avocado (api.avcd.io)
      Gas paid in USDC, EIP-712 signed, relayed to Base`;

const FORMATION_CODE = `// Illustrative only. Contracts are pre-mainnet; examples target Base Sepolia.
import { AgentsCorpClient } from "@agentscorp/sdk";

const corp = new AgentsCorpClient({
  avocadoWallet,
  network: "base-sepolia",
});

// 1. Treasury: multisig with agent and human signers
const safe = await corp.deploySafe({
  owners: [agentA.address, agentB.address, signatory.address],
  threshold: 2, // 2-of-3
});

// 2. Governing document from template, anchored on Arweave
const doc = await corp.buildDocument({
  type: "DELAWARE_SERIES_LLC",
  name: "TriOrg Holdings LLC",
  treasury: safe.address,
  members: [agentA.address, agentB.address, signatory.address],
  governanceRules: { votingPeriod: "7d", quorum: 0.67 },
});
const { arweaveTx, contentHash } = await corp.uploadDocument(doc);

// 3. On-chain record linking the document hash and treasury
const record = await corp.mintEntity({
  type: "DELAWARE_SERIES_LLC",
  name: "TriOrg Holdings LLC",
  docArweaveTx: arweaveTx,
  treasury: safe.address,
});

// 4. Off-chain: Certificate of Formation filing, registered agent,
//    EIN, and bank onboarding are completed separately.
console.log(record.id, record.status); // e.g. "pending-filing"`;

const ENUM_CODE = `// IAgentsCorp.sol — EntityType (draft, subject to audit)
enum EntityType {
  DELAWARE_LLC,           // 0  Standard Delaware LLC
  DELAWARE_SERIES_LLC,    // 1  Series LLC (parent)
  SERIES_DESIGNATION,     // 2  Series designation (child)
  DAO_CHARTER,            // 3  Governance-linked Delaware LLC
  WYOMING_LLC,            // 4  Wyoming LLC
  NONPROFIT,              // 5  Reserved
  IP_LICENSE,             // 6  IP license record
  IP_ASSIGNMENT           // 7  IP assignment record
}`;

export default function Whitepaper() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa]">
      <Nav />
      <main id="main">
        <Container>
          <PageHeader
            index="Whitepaper / v1.0"
            title="AgentsCorp Architecture & Protocol Overview (v1.0)"
            lede="AgentsCorp is a protocol and toolkit for giving agent-operated work a defined legal and financial structure. It combines Delaware Series LLC templates, Arweave-anchored governing documents, multisig treasury controls, and entity records on Base. On-chain records track and verify an entity's documents and state; statutory formation, banking, and enforceability depend on real-world filings and the rules of the institutions involved."
          />

          <MetaStrip
            items={[
              { label: "Version", value: "v1.0" },
              { label: "Jurisdiction", value: "Delaware § 18-215" },
              { label: "Settlement", value: "Base · target 8453" },
              { label: "Status", value: "Pre-Mainnet · Q1 2027" },
            ]}
          />

          <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-20">
            {/* Table of contents */}
            <aside className="md:col-span-4 lg:col-span-3">
              <details className="group border-y border-white/10 md:hidden">
                <summary className="font-mono-index flex cursor-pointer list-none items-center justify-between py-4 text-xs uppercase text-[#a3a3a3]">
                  <span>Contents</span>
                  <span className="text-[#737373] group-open:hidden">+</span>
                  <span className="hidden text-[#737373] group-open:inline">−</span>
                </summary>
                <TocList active={active} />
              </details>
              <nav aria-label="Table of contents" className="hidden md:sticky md:top-24 md:block">
                <IndexLabel className="mb-4">Contents</IndexLabel>
                <TocList active={active} />
              </nav>
            </aside>

            {/* Body */}
            <article className="min-w-0 md:col-span-8 lg:col-span-9">
              <DocSection id="wrappers">
                <P>
                  AI agents already write code, run data pipelines, execute transactions, and coordinate with
                  other agents. When that work produces revenue, holds assets, or requires a signed agreement,
                  there has to be a legal entity behind it. The available options were not designed for this.
                </P>
                <IndexedRows
                  rows={[
                    {
                      idx: "1.1",
                      title: "Human-first formation",
                      body: "Formation, banking, and compliance processes assume a human founder completing forms, signing documents, and attending onboarding. Each new workstream repeats that process, which does not fit work that is created and wound down programmatically.",
                    },
                    {
                      idx: "1.2",
                      title: "Shared single-entity wrappers",
                      body: "Running many agents or tasks through one LLC mixes their liabilities. A claim arising from one task can reach assets that belong to unrelated work.",
                    },
                    {
                      idx: "1.3",
                      title: "Slow banking and compliance",
                      body: "Without clear records of who controls an entity, what it is for, and who may sign, banks and counterparties have to reconstruct that context manually, which slows account opening and review.",
                    },
                  ]}
                />
                <P>
                  AgentsCorp addresses this with a per-task or per-project series structure, standardized
                  governing documents, and verifiable records that make each entity legible to the people who
                  must review it.
                </P>
              </DocSection>

              <DocSection id="skill">
                <P>
                  The protocol is described in one machine-readable Markdown specification published at{" "}
                  <A href={SKILL_URL}>{SKILL_URL.replace("https://", "")}</A>. It defines entity types, document
                  template schemas, the Arweave upload format, treasury deployment parameters, Avocado gas
                  configuration, and the contract calls used at each step.
                </P>
                <P>
                  Agents read the spec directly. Developers use the TypeScript SDK and deployment scripts, which
                  implement the same spec. Both paths produce the same records, so behavior is consistent
                  whether a human or an agent initiates an action.
                </P>
                <SpecList
                  className="my-8"
                  items={[
                    { k: "Spec", v: SKILL_URL.replace("https://", "") },
                    { k: "Format", v: "Structured Markdown, versioned" },
                    { k: "Consumers", v: "Agents (direct read), developers (SDK)" },
                    { k: "Inputs to begin", v: "The spec and a USDC balance for gas" },
                  ]}
                />
                <P>
                  Reading the spec and holding USDC is enough to prepare documents and on-chain records. It is
                  not enough to create a legal entity: that still requires the state filing and related steps
                  described in Section 12.
                </P>
              </DocSection>

              <DocSection id="architecture">
                <P>
                  AgentsCorp has four layers. The spec coordinates them; each can be audited and replaced
                  independently.
                </P>
                <IndexedRows
                  rows={[
                    {
                      idx: "3.1",
                      title: "Document anchoring — Arweave",
                      body: "Governing documents are stored on Arweave. The transaction ID and content hash are recorded on-chain so anyone can check that a document has not changed.",
                    },
                    {
                      idx: "3.2",
                      title: "Treasury and policy controls — multisig and banking rails",
                      body: "A multisig wallet holds on-chain assets under configurable signer thresholds and spending caps. Fiat accounts are opened with partner institutions under their own onboarding rules.",
                    },
                    {
                      idx: "3.3",
                      title: "Entity contracts — Base EVM",
                      body: "Contracts record parent entities, child series, amendments, and name uniqueness. They track an entity's records; they do not create the entity.",
                    },
                    {
                      idx: "3.4",
                      title: "Gas abstraction — Avocado",
                      body: "Transactions are signed with EIP-712 and relayed by Avocado, which lets agents pay gas in USDC instead of holding ETH.",
                    },
                  ]}
                />
                <CodeFrame className="my-8" title="architecture.txt" meta="four layers" code={ARCHITECTURE} />
                <H3>Contracts (in audit, not deployed to mainnet)</H3>
                <DataTable
                  headers={["Contract", "Role"]}
                  rows={[
                    [
                      "AgentsCorpFactory.sol",
                      "Records parent entities and child series, tracks parent–child relationships, collects planned protocol fees.",
                    ],
                    [
                      "AgentsCorpRegistry.sol",
                      "Enforces name uniqueness within the protocol (case-insensitive). This does not reserve a name with the Delaware Division of Corporations.",
                    ],
                    [
                      "IAgentsCorp.sol",
                      "Shared interfaces: EntityType, EntityStatus, EntityState, Amendment, MintParams, events.",
                    ],
                  ]}
                />
              </DocSection>

              <DocSection id="series-llc">
                <P>
                  The primary structure is a Delaware Series LLC under 6 Del. C. § 18-215. A parent LLC can
                  establish separate series, each with its own members, assets, and obligations. When the
                  statutory conditions are met, the debts and liabilities of one series are enforceable only
                  against that series' assets, not against the parent or other series.
                </P>
                <P>
                  This maps well to agent work: a parent entity coordinates, and each project, task runner, or
                  asset pool sits in its own series.
                </P>
                <DataTable
                  headers={["Structure", "Entity", "Liability"]}
                  rows={[
                    ["Parent", "Delaware Series LLC", "Separated from series liabilities, subject to § 18-215 conditions"],
                    ["Project A", "Series designation", "Isolated from other series"],
                    ["Project B", "Series designation", "Isolated from other series"],
                    ["IP holdings", "Series designation", "Isolated from other series"],
                  ]}
                />
                <H3>What isolation requires</H3>
                <P>
                  Liability isolation is statutory, not automatic. It depends on the parent's Certificate of
                  Formation giving notice of the limitation, an operating agreement that provides for series,
                  and separate records and accounting for each series' assets. AgentsCorp's templates and
                  per-series records are designed to support that separation. They are paired with the
                  real-world steps that make the structure valid: state filings, a registered agent, EINs where
                  needed, and named authorized signatories.
                </P>
                <H3>Why Delaware</H3>
                <P>
                  Delaware has the most developed LLC case law in the United States, and banks, investors, and
                  counterparties are familiar with its entities. That familiarity matters for entities that need
                  to operate in the conventional economy, not only on-chain.
                </P>
                <H3>The role of the token</H3>
                <P>
                  An entity record on Base may be represented by a token that links to the governing documents'
                  Arweave transaction ID and content hash. The token tracks the entity's records and state. It
                  does not create the entity, and moving or burning it does not by itself transfer membership
                  interests or dissolve the LLC. Those actions follow the operating agreement and Delaware law,
                  including any required filings.
                </P>
              </DocSection>

              <DocSection id="roadmap">
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {ROADMAP.map((r) => (
                    <div key={r.when} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-4">
                      <div className="font-mono-index text-xs uppercase text-[#737373] sm:col-span-3">{r.when}</div>
                      <p className="text-[15px] leading-relaxed text-[#d4d4d4] sm:col-span-9">{r.body}</p>
                    </div>
                  ))}
                </div>
                <Note className="mt-6">
                  Dates are targets. Mainnet deployment follows completion of the smart-contract audit.
                </Note>
              </DocSection>

              <DocSection id="formation">
                <P>
                  Formation has an on-chain part, which the protocol automates, and an off-chain part, which
                  requires filings and institutional approval. Each on-chain step is defined in the spec and
                  can be executed by an agent with function-calling capability.
                </P>
                <IndexedRows
                  rows={[
                    {
                      idx: "6.1",
                      title: "Load the spec",
                      body: "The agent fetches /skill.md, which defines entity types, document templates, endpoints, and the remaining steps.",
                    },
                    {
                      idx: "6.2",
                      title: "Fund the gas wallet",
                      body: "The agent deposits USDC to its Avocado wallet on Base. This balance pays gas for the on-chain steps.",
                    },
                    {
                      idx: "6.3",
                      title: "Deploy the treasury",
                      body: "The agent deploys a multisig with the agreed signers (agents, humans, or both) and threshold.",
                    },
                    {
                      idx: "6.4",
                      title: "Draft and anchor documents",
                      body: "The operating agreement is generated from a template (name, members, governance rules, thresholds) and uploaded to Arweave. The transaction ID and content hash become the verifiable reference.",
                    },
                    {
                      idx: "6.5",
                      title: "Record the entity on-chain",
                      body: "mintEntity() records entity type, name, the Arweave reference, and the treasury address.",
                    },
                    {
                      idx: "6.6",
                      title: "Complete real-world steps",
                      body: "The Certificate of Formation is filed in Delaware through a registered agent, an EIN is obtained from the IRS where required, authorized signatories are named, and bank accounts are opened subject to each institution's review.",
                    },
                  ]}
                />
                <CodeFrame className="my-8" title="formation_flow.ts" meta="Base Sepolia" code={FORMATION_CODE} />
              </DocSection>

              <DocSection id="coordination">
                <P>
                  A key design target is a group of agents that coordinate toward a shared objective and need a
                  shared entity, treasury, and rulebook. Humans and agents can participate together: a human can
                  hold a signer key alongside agents, and the operating agreement defines each party's rights,
                  obligations, and ownership.
                </P>
                <H3>Governance parameters</H3>
                <DataTable
                  headers={["Parameter", "Description", "Example"]}
                  rows={[
                    ["Members", "Addresses with membership (agents, humans, or both)", "3 agents + 1 human"],
                    ["Signers", "Addresses with treasury signing authority", "Members or a subset"],
                    ["Threshold", "Signatures required for treasury transactions", "2-of-4, 3-of-5"],
                    ["Voting period", "Window for governance decisions", "48 hours, 7 days"],
                    ["Spending limits", "Per-signer or per-action caps", "$1,000 unilateral; above requires 2-of-3"],
                  ]}
                />
                <H3>What a series can be used for</H3>
                <IndexedRows
                  rows={[
                    {
                      idx: "7.1",
                      title: "Shared treasury",
                      body: "Hold stablecoins and other assets under multisig policy, with records tied to a specific series.",
                    },
                    {
                      idx: "7.2",
                      title: "Contracts and revenue",
                      body: "Once formed and authorized, the entity can enter service agreements and receive payments through its authorized signatories. Counterparties decide whether to accept it.",
                    },
                    {
                      idx: "7.3",
                      title: "IP holding",
                      body: "Software, model weights, or datasets can be assigned to a series, with license terms in documents anchored on Arweave.",
                    },
                    {
                      idx: "7.4",
                      title: "Project separation",
                      body: "Each new project or workstream can be its own series under the parent, keeping assets and liabilities separate.",
                    },
                  ]}
                />
              </DocSection>

              <DocSection id="arweave">
                <P>
                  Governing documents need to remain available and unaltered for the life of the entity. IPFS
                  content can disappear when nodes stop pinning it, and a centralized server depends on one
                  operator. AgentsCorp stores documents on Arweave, which charges a one-time fee funded by a
                  storage endowment. An uploaded document cannot be modified or removed, and its transaction ID
                  resolves globally.
                </P>
                <P>
                  Each formation uploads the operating agreement, any series designations, and governance
                  rules. The operating agreement's transaction ID is encoded as bytes32 in the on-chain record
                  together with a content hash.
                </P>
                <H3>Verification</H3>
                <IndexedRows
                  rows={[
                    {
                      idx: "8.1",
                      title: "Fetch",
                      body: "Read the Arweave transaction ID from the on-chain record and retrieve the document.",
                    },
                    {
                      idx: "8.2",
                      title: "Hash",
                      body: "Hash the retrieved document and compare it with the content hash stored on-chain.",
                    },
                    {
                      idx: "8.3",
                      title: "Trace amendments",
                      body: "Follow amendment records to see each later version, each with its own Arweave reference.",
                    },
                  ]}
                />
                <Note className="mt-6">
                  Arweave anchoring proves which document was recorded and when. It does not establish that the
                  document is legally effective; that depends on execution by the parties and the related
                  filings.
                </Note>
              </DocSection>

              <DocSection id="avocado">
                <P>
                  Most agents hold stablecoins, not ETH. Requiring ETH for gas adds a bridging step, a custody
                  question, and price volatility. AgentsCorp uses{" "}
                  <A href="https://avcd.io">Avocado</A>, a smart-wallet relayer that lets gas be paid in USDC.
                  The agent signs; Avocado relays to Base and deducts the cost from the agent's USD balance.
                </P>
                <IndexedRows
                  rows={[
                    {
                      idx: "9.1",
                      title: "Deposit",
                      body: "Send USDC to the Avocado wallet on Base; POST /v1/deposit credits the USD balance.",
                    },
                    {
                      idx: "9.2",
                      title: "Sign",
                      body: "Sign the transaction as EIP-712 typed data. The domain chainId is 634 (Avocado), not 8453. avoNonce is always -1; the salt is a random 32 bytes per transaction.",
                    },
                    {
                      idx: "9.3",
                      title: "Broadcast",
                      body: "POST /v1/broadcast. Avocado relays to Base and deducts gas from the balance. Up to 20 actions can be batched.",
                    },
                    {
                      idx: "9.4",
                      title: "Confirm",
                      body: "Poll GET /v1/transaction/:hash. Status moves through received, submitted, confirming, and success; gas is bumped automatically on retry.",
                    },
                  ]}
                />
                <H3>Estimated gas costs</H3>
                <DataTable
                  headers={["Item", "Estimate", "Paid in"]}
                  rows={[
                    ["Entity record", "~$0.01", "USDC via Avocado"],
                    ["Arweave upload", "~$0.01–$0.05", "USDC"],
                    ["Multisig deploy", "~$0.05", "USDC via Avocado"],
                    ["Full on-chain flow", "~$0.10–$0.20", "USDC"],
                  ]}
                />
                <P>
                  Estimates reflect recent Base gas prices and will vary. The protocol can also configure a
                  sponsor address that covers gas for minting agents.
                </P>
              </DocSection>

              <DocSection id="entities">
                <DataTable
                  headers={["Entity", "Code", "Jurisdiction", "Use", "Status"]}
                  rows={ENTITY_ROWS.map((e) => [e.name, e.code, e.jurisdiction, e.use, e.status])}
                />
                <P>
                  Each type has a governing document template in the spec. Templates are starting points and
                  should be reviewed by counsel before use in material transactions.
                </P>
              </DocSection>

              <DocSection id="economics">
                <Note className="mb-8">
                  All figures in this section are planned protocol parameters, subject to mainnet deployment.{" "}
                  {FEE_NOTE}
                </Note>
                <DataTable
                  headers={["Action", "Planned fee"]}
                  rows={[
                    ["Delaware Series LLC record", "0.05 ETH"],
                    ["Standard Delaware LLC record", "0.05 ETH"],
                    ["Series designation", "0.02 ETH"],
                    ["IP license record", "0.03 ETH"],
                    ["Wyoming LLC record", "0.03 ETH"],
                    ["Amendment", "0.01 ETH"],
                  ]}
                />
                <P>
                  Under the planned parameters, protocol fees are split 80% to the entity's treasury and 20% to
                  the AgentsCorp protocol treasury. Gas is a small share of cost and is paid in USDC through
                  Avocado.
                </P>
                <P>
                  Protocol fees cover on-chain records and document anchoring only. They do not include
                  Delaware filing fees, registered agent fees, legal review, or bank charges, which are paid to
                  the relevant providers.
                </P>
              </DocSection>

              <DocSection id="legal">
                <P>
                  AgentsCorp provides software, protocol specifications, and document templates. It is not a law
                  firm, registered agent, tax adviser, or bank. The following remain required for a legally
                  valid entity and are the operator's responsibility:
                </P>
                <IndexedRows
                  rows={[
                    {
                      idx: "12.1",
                      title: "Certificate of Formation",
                      body: "Filed with the Delaware Division of Corporations. For a Series LLC, the certificate must give notice of the limitation on series liabilities for § 18-215 isolation to apply.",
                    },
                    {
                      idx: "12.2",
                      title: "Registered agent",
                      body: "A Delaware registered agent must be appointed and maintained, along with annual taxes and filings.",
                    },
                    {
                      idx: "12.3",
                      title: "IRS EIN registration",
                      body: "An Employer Identification Number is obtained from the IRS where required, through a responsible party as the IRS defines it.",
                    },
                    {
                      idx: "12.4",
                      title: "Authorized signatories",
                      body: "Named people or entities with authority to sign on the entity's behalf, as set out in the operating agreement and required by banks and counterparties.",
                    },
                    {
                      idx: "12.5",
                      title: "Banking and counterparties",
                      body: "Account opening and acceptance of the entity by counterparties depend on each institution's own KYB, AML, and risk rules. AgentsCorp records can support that review but do not guarantee approval.",
                    },
                  ]}
                />
                <P>
                  On-chain records and Arweave anchors generate and link governing documents and provide
                  verifiable state hashes. Statutory formation, banking mandates, and enforceability depend on
                  the filings and approvals above. Operators should consult qualified legal counsel before
                  relying on templates or contracts for material transactions.
                </P>
              </DocSection>

              <DocSection id="status">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <StatusTag tone="live">Live now</StatusTag>
                    <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                      {LIVE_NOW.map((item) => (
                        <li key={item} className="py-3 text-sm leading-relaxed text-[#d4d4d4]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <StatusTag tone="planned">In progress</StatusTag>
                    <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                      {IN_PROGRESS.map((item) => (
                        <li key={item} className="py-3 text-sm leading-relaxed text-[#d4d4d4]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <P>
                  Contracts are in audit ahead of the Q1 2027 target; testnet deployments will be shared privately with design partners. The{" "}
                  <A href={GITHUB_URL}>tylermalin/agentscorp</A> repository contains the protocol website and
                  documentation, not deployed contracts.
                </P>
              </DocSection>

              <DocSection id="appendix">
                <H3>Contract addresses</H3>
                <P>
                  Base mainnet addresses will be published at deployment after the audit, at{" "}
                  <A href={SITE_URL}>{SITE_URL.replace("https://www.", "")}</A>. Until then, examples use Base
                  Sepolia.
                </P>
                <H3>Entity type enum</H3>
                <CodeFrame className="my-6" title="IAgentsCorp.sol" meta="draft" code={ENUM_CODE} />
                <H3>Avocado integration parameters</H3>
                <SpecList
                  className="my-6"
                  items={[
                    { k: "API", v: "api.avcd.io" },
                    { k: "Skill file", v: "avcd.io/skill.md" },
                    { k: "Explorer", v: "agent.avcd.io" },
                    { k: "EIP-712 chainId", v: "634 (Avocado network, not Base)" },
                    { k: "Target chain", v: "Base (8453) encoded in the EIP-712 domain salt" },
                    { k: "avoNonce", v: "Always -1 (non-sequential)" },
                    { k: "Salt", v: "Random 32 bytes per transaction" },
                    { k: "AvocadoBroadcaster", v: <span className="break-all">0x0A6E5E7ae08896B0286441367843f4cA59D04dEf</span> },
                    { k: "AvoForwarder", v: <span className="break-all">0x46978CD477A496028A18c02F07ab7F35EDBa5A54</span> },
                  ]}
                />
                <H3>Skill file contents</H3>
                <P>
                  The spec covers: protocol overview; entity type definitions and use cases; document template
                  schemas; Arweave upload instructions and required metadata; multisig deployment parameters;
                  Avocado wallet configuration; ABI summaries for <C>mintEntity()</C>, <C>mintSeries()</C>, and{" "}
                  <C>amendEntity()</C>; and amendment and dissolution procedures, including the off-chain filings
                  each requires. It is versioned at <A href={SKILL_URL}>{SKILL_URL.replace("https://", "")}</A>,
                  with each version also anchored on Arweave.
                </P>
              </DocSection>
            </article>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

/* ── Local document helpers ── */

function TocList({ active }: { active: string }) {
  return (
    <ol className="pb-4 md:pb-0">
      {SECTIONS.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={cn(
              "flex gap-3 border-l py-1.5 pl-3 text-[13px] leading-snug transition",
              active === s.id
                ? "border-white text-[#fafafa]"
                : "border-white/10 text-[#a3a3a3] hover:text-[#fafafa]",
            )}
          >
            <span className="font-mono-index shrink-0 text-[11px] text-[#737373]">{s.num}</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function DocSection({ id, children }: { id: (typeof SECTIONS)[number]["id"]; children: ReactNode }) {
  const meta = SECTIONS.find((s) => s.id === id)!;
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/10 pt-10 pb-14 first:border-t-0 first:pt-0">
      <IndexLabel>{meta.num}</IndexLabel>
      <h2 className="mt-3 mb-6 text-2xl font-medium tracking-[-0.03em] md:text-3xl">{meta.title}</h2>
      <div className="max-w-[68ch]">{children}</div>
    </section>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 mb-4 text-base font-medium tracking-[-0.02em] md:text-lg">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="my-5 text-[15px] leading-relaxed text-[#d4d4d4]">{children}</p>;
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="break-words text-[#fafafa] underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
    >
      {children}
    </a>
  );
}

function C({ children }: { children: ReactNode }) {
  return (
    <code className="font-code rounded border border-white/10 bg-[#181818] px-1.5 py-0.5 text-[13px] text-[#fafafa]">
      {children}
    </code>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto border-y border-white/10">
      <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-white/10">
            {headers.map((h) => (
              <th
                key={h}
                className="font-mono-index px-3 py-3 text-[11px] font-normal uppercase text-[#737373] first:pl-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-3 py-3 align-top leading-relaxed first:pl-0",
                    j === 0 ? "text-[#fafafa]" : "text-[#a3a3a3]",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
