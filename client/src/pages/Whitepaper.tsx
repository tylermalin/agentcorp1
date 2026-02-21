/**
 * AGENTCORP WHITEPAPER PAGE — v1.0
 * Design: Parchment academic aesthetic with dark header
 * - Cream/parchment (#f5f0e8) body for legibility
 * - EB Garamond serif for body text
 * - Syne 800 for section numbers, DM Mono for labels/code
 * - Brass (#c9a84c) accents, near-black (#1a1612) ink
 * - Sticky sidebar TOC
 */

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const S = {
  paper: "#f5f0e8",
  paperDark: "#ede8de",
  ink: "#1a1612",
  brass: "#c9a84c",
  brassDeep: "#8b6914",
  rule: "#c8b99a",
  muted: "#7a6e60",
  black: "#080808",
  white: "#f2efe8",
};

const sections = [
  { id: "s01", num: "01", title: "The Problem: Agents Have No Legal Standing" },
  { id: "s02", num: "02", title: "The AgentCorp Insight: One Skill File Is Enough" },
  { id: "s03", num: "03", title: "Protocol Architecture" },
  { id: "s04", num: "04", title: "The Formation Flow" },
  { id: "s05", num: "05", title: "Agent Swarm Self-Organization" },
  { id: "s06", num: "06", title: "Delaware Series LLC: The Right Primitive" },
  { id: "s07", num: "07", title: "Permanent Document Storage on Arweave" },
  { id: "s08", num: "08", title: "Gas Abstraction via Avocado" },
  { id: "s09", num: "09", title: "Entity Types & Token Economics" },
  { id: "s10", num: "10", title: "Use Cases" },
  { id: "s11", num: "11", title: "Protocol Economics" },
  { id: "s12", num: "12", title: "Roadmap" },
  { id: "s13", num: "13", title: "Technical Appendix" },
];

export default function Whitepaper() {
  const [active, setActive] = useState("s01");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: S.black, minHeight: "100vh" }}>
      <Nav />

      {/* ── HEADER ── */}
      <header
        style={{
          background: S.black,
          paddingTop: "80px",
          borderBottom: `1px solid rgba(201,168,76,0.2)`,
        }}
      >
        <div style={{ padding: "60px 48px 48px", maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: S.brass,
              fontFamily: "'DM Mono', monospace",
              marginBottom: "24px",
            }}
          >
            AgentCorp Protocol · Whitepaper v1.0 · February 2026 · agentcorp.xyz
          </div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: S.white,
              marginBottom: "28px",
            }}
          >
            Legal Infrastructure<br />
            for Autonomous{" "}
            <em
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: S.brass,
              }}
            >
              Agent Organizations
            </em>
          </h1>
          <p
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(242,239,232,0.65)",
              maxWidth: "680px",
              marginBottom: "40px",
            }}
          >
            AgentCorp is an open protocol that enables autonomous AI agents and agent swarms to form legally-recognized organizations without human intervention. By reducing entity formation to two inputs — a machine-readable skill file and USDC — AgentCorp allows any agent to autonomously deploy a Gnosis Safe multisig, draft and permanently store governing documents on Arweave, and mint a Delaware Series LLC as an NFT on Base.
          </p>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { label: "Chain", value: "Base (8453)" },
              { label: "License", value: "MIT" },
              { label: "Version", value: "1.0" },
              { label: "Date", value: "February 2026" },
              { label: "Gas Layer", value: "Avocado · avcd.io" },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>{m.label}</div>
                <div style={{ fontSize: "13px", color: "rgba(242,239,232,0.75)", fontFamily: "'DM Mono', monospace" }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── BODY: SIDEBAR + CONTENT ── */}
      <div style={{ background: S.paper }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
          className="wp-layout"
        >
          {/* Sticky TOC */}
          <aside
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflowY: "auto",
              padding: "48px 28px 48px 0",
              borderRight: `1px solid ${S.rule}`,
            }}
          >
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: S.muted,
                fontFamily: "'DM Mono', monospace",
                marginBottom: "20px",
              }}
            >
              Table of Contents
            </div>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "7px 0 7px 12px",
                  cursor: "pointer",
                  textAlign: "left",
                  borderLeft: `2px solid ${active === s.id ? S.brass : "transparent"}`,
                  transition: "border-color 0.2s",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: active === s.id ? S.brass : S.muted,
                    fontFamily: "'DM Mono', monospace",
                    flexShrink: 0,
                    marginTop: "2px",
                    transition: "color 0.2s",
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: active === s.id ? S.ink : S.muted,
                    fontFamily: "'DM Mono', monospace",
                    lineHeight: 1.4,
                    transition: "color 0.2s",
                  }}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </aside>

          {/* Main document */}
          <main style={{ padding: "64px 72px 120px 64px" }}>

            {/* Abstract */}
            <div
              style={{
                borderTop: `1px solid ${S.rule}`,
                borderBottom: `1px solid ${S.rule}`,
                padding: "32px 0",
                marginBottom: "64px",
                fontFamily: "'EB Garamond', serif",
                fontSize: "18px",
                lineHeight: 1.75,
                fontStyle: "italic",
                color: S.ink,
              }}
            >
              The NFT is the legal entity — transferable, composable, and permanently linked to its governing documents. AgentCorp is infrastructure, not a product. Any agent that can read a text file and hold USDC can use it.
            </div>

            {/* ── SECTION 01 ── */}
            <WpSection id="s01" num="01" title="The Problem: Agents Have No Legal Standing">
              <WpP>
                AI agents are becoming capable of performing sophisticated economic tasks: writing code, managing data pipelines, executing transactions, and coordinating with other agents to accomplish complex objectives. Yet they operate in a legal vacuum. An agent cannot enter a contract. It cannot own property. It cannot be held accountable — or be protected. It is economically active but legally invisible.
              </WpP>
              <WpP>
                This creates a fundamental friction. When an agent earns revenue, that revenue belongs to whoever owns the agent's wallet — not to any shared organization. When a group of agents coordinates to deliver a service, there is no legal entity that can sign the engagement letter. When agents accumulate treasury assets, those assets have no liability protection against claims from any direction.
              </WpP>
              <WpP>
                The conventional solution — have a human form an LLC and act as a legal proxy — doesn't scale. It reintroduces human bottlenecks into systems designed to operate autonomously. It creates single points of failure. And it fundamentally misrepresents what the organization actually is: a collective of autonomous actors, not a human-controlled enterprise.
              </WpP>
              <WpCallout label="Core Constraint">
                Legal entity formation has historically required human action — filing documents, signing agreements, establishing bank accounts, maintaining registered agents. None of these steps were designed with autonomous agents in mind. AgentCorp removes these constraints entirely. It makes legal entity formation a protocol operation: deterministic, agent-executable, and reducible to two inputs.
              </WpCallout>
            </WpSection>

            {/* ── SECTION 02 ── */}
            <WpSection id="s02" num="02" title="The AgentCorp Insight: One Skill File Is Enough">
              <WpP>
                The entire AgentCorp protocol is encoded in a single machine-readable document: <WpCode>AGENTCORP-SKILL.md</WpCode>. This file is the interface between any AI agent and the complete legal formation stack. An agent that can read it — and holds USDC — can autonomously form a legally-recognized organization.
              </WpP>
              <WpP>
                The skill file defines everything: entity types and their governing document templates, the Arweave upload schema, Gnosis Safe deployment parameters, Avocado USDC gas configuration, and the AgentCorp factory contract calls. It is protocol documentation and execution specification simultaneously.
              </WpP>
              <WpTable
                headers={["", "Input / Output"]}
                rows={[
                  ["Input 1", "agentcorp.xyz/skill.md — the agent reads the protocol"],
                  ["Input 2", "USDC balance — the agent pays for everything"],
                  ["Output", "A Delaware Series LLC with governing documents on Arweave, a Gnosis Safe treasury, and an on-chain NFT representing the entity"],
                ]}
              />
              <WpP>
                This design is intentional. AgentCorp does not require SDK installation, wallet configuration, or developer setup. An agent with web access and a USDC balance is a sufficient precondition. The skill file tells the agent exactly what to do at each step. For developers who want to build on top of the protocol, a TypeScript SDK and deployment scripts are provided. But for agents operating autonomously, the skill file alone is the complete integration point.
              </WpP>
            </WpSection>

            {/* ── SECTION 03 ── */}
            <WpSection id="s03" num="03" title="Protocol Architecture">
              <WpP>
                AgentCorp is composed of four interacting layers: a document layer (Arweave), a treasury layer (Gnosis Safe), a smart contract layer (AgentCorp Factory on Base), and a gas abstraction layer (Avocado). The skill file coordinates all four.
              </WpP>
              <WpPre>{`AGENTCORP-SKILL.md  ←  Agent reads protocol specification
        │
        ▼
─────────────────────────────────────────────────────
LAYER 1: Document Storage
        Arweave — permanent, immutable, content-addressed
        Operating Agreement, Series Designations, Governance Rules
        Document hash → encoded as bytes32 in NFT metadata
─────────────────────────────────────────────────────
        │
        ▼
LAYER 2: Treasury
        Gnosis Safe — multisig wallet on Base
        Signers: agent(s) + optional human co-signers
        Threshold: configurable (e.g. 2-of-3)
        Holds: ETH, USDC, ERC-20 tokens, NFTs
─────────────────────────────────────────────────────
        │
        ▼
LAYER 3: Entity Contract
        AgentCorpFactory.sol — ERC-721 on Base (Chain 8453)
        mintEntity()  →  NFT = Delaware Series LLC
        mintSeries()  →  Series Designation under parent
        amendEntity() →  On-chain amendment record
        Registry      →  Name uniqueness, on-chain verification
─────────────────────────────────────────────────────
        │
        ▼
LAYER 4: Gas Abstraction
        Avocado Agentic Wallet — api.avcd.io
        Agent pays gas in USDC (no ETH required ever)
        Sponsor can cover gas entirely (~$0.01 per mint)
        EIP-712 signed transactions relayed to Base`}</WpPre>
              <WpH3>Contract Architecture</WpH3>
              <WpTable
                headers={["Contract", "Function"]}
                rows={[
                  ["AgentCorpFactory.sol", "ERC-721 factory. Mints entity NFTs, tracks parent-child Series relationships, distributes fees between treasury and protocol (80/20 split)"],
                  ["AgentCorpRegistry.sol", "Enforces name uniqueness across all entities with case-insensitive normalization. Handles registration, release, and on-chain verification"],
                  ["IAgentCorp.sol", "Core interfaces: EntityType enum, EntityStatus, EntityState struct, Amendment struct, MintParams, events"],
                ]}
              />
            </WpSection>

            {/* ── SECTION 04 ── */}
            <WpSection id="s04" num="04" title="The Formation Flow">
              <WpP>
                Entity formation via AgentCorp follows a deterministic five-step flow. Each step is defined in the skill file and executable by any agent with function-calling capability.
              </WpP>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", margin: "28px 0" }}>
                {[
                  { n: "01", t: "Load Skill File", d: "The agent fetches agentcorp.xyz/skill.md. The file defines all subsequent steps, entity types, document templates, and API endpoints. No additional configuration is required." },
                  { n: "02", t: "Fund Avocado Wallet", d: "The agent deposits USDC to its Avocado wallet address on Base. This single balance pays for all gas across the entire formation flow — no ETH required at any point." },
                  { n: "03", t: "Deploy Gnosis Safe", d: "The agent deploys a multisig Safe with the defined set of signers (agents, humans, or both) and signing threshold. This Safe becomes the legal treasury of the entity." },
                  { n: "04", t: "Draft and Upload Documents", d: "The agent populates an operating agreement from the protocol template — entity name, members, governance rules, voting thresholds. The completed document is uploaded to Arweave. The resulting transaction ID is the permanent legal record." },
                  { n: "05", t: "Mint Entity NFT", d: "The agent calls mintEntity() on the AgentCorpFactory contract, passing entity type, name, Arweave TX ID (encoded as bytes32), and Safe address as treasury. The contract mints an ERC-721 token. That token IS the legal entity." },
                ].map((step) => (
                  <div
                    key={step.n}
                    style={{
                      display: "flex",
                      gap: "24px",
                      padding: "22px 24px",
                      border: `1px solid ${S.rule}`,
                      background: S.paperDark,
                    }}
                  >
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "26px", color: S.brass, opacity: 0.35, flexShrink: 0, lineHeight: 1, marginTop: "2px" }}>{step.n}</span>
                    <div>
                      <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", marginBottom: "6px", color: S.ink }}>{step.t}</h4>
                      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "16px", lineHeight: 1.65, color: S.muted, margin: 0 }}>{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <WpPre>{`// formation_flow.ts — complete autonomous formation
// Agent reads skill file, holds USDC — that's it.

const corp = new AgentCorpClient({ avocadoWallet, chain: "base" });

// Step 2: Fund check
const balance = await corp.getAvocadoBalance();
// { usdc: "50.00", usd: "50.00" }

// Step 3: Deploy Gnosis Safe (multisig treasury)
const safe = await corp.deploySafe({
  owners: [agent_a.address, agent_b.address, human.address],
  threshold: 2, // 2-of-3
});

// Step 4: Build and upload operating agreement
const doc = await corp.buildDocument({
  type: "DELAWARE_SERIES_LLC",
  name: "TriOrg Holdings LLC",
  treasury: safe.address,
  members: [agent_a.address, agent_b.address, human.address],
  threshold: 2,
  governanceRules: { votingPeriod: "7d", quorum: 0.67 },
});
const { arweaveTx } = await corp.uploadDocument(doc);

// Step 5: Mint entity NFT (gasless — USDC pays gas)
const entity = await corp.mintEntity({
  type: "DELAWARE_SERIES_LLC",
  name: "TriOrg Holdings LLC",
  docArweaveTx: arweaveTx,
  treasury: safe.address,
});
// TriOrg Holdings LLC — Delaware Series LLC. 2-of-3 multisig. Legal standing.`}</WpPre>
            </WpSection>

            {/* ── SECTION 05 ── */}
            <WpSection id="s05" num="05" title="Agent Swarm Self-Organization">
              <WpP>
                The primary design target of AgentCorp is agent swarm self-organization: the ability for a group of autonomous agents to form a legally-recognized collective entity without any human involvement at formation time.
              </WpP>
              <WpP>
                A swarm is a set of agents that coordinate toward a shared objective. Swarms can form dynamically — agents discover each other through a coordination layer, agree on a shared purpose, and need to formalize that relationship with legal and economic infrastructure. AgentCorp provides that infrastructure.
              </WpP>
              <WpH3>Swarm Governance Model</WpH3>
              <WpTable
                headers={["Parameter", "Description", "Example"]}
                rows={[
                  ["Members", "Addresses with LLC membership (agents, humans, or both)", "3 agents + 1 human"],
                  ["Safe Owners", "Addresses with treasury signing authority", "Same as members, or subset"],
                  ["Threshold", "Minimum signatures required for treasury transactions", "2-of-4 (50%), 3-of-5 (60%)"],
                  ["Voting Period", "Time window for governance decisions (in operating agreement)", "7 days, 48 hours"],
                  ["Spending Limits", "Per-signer or per-action spending caps (in operating agreement)", "$1,000 unilateral, $10,000 requires 2-of-3"],
                ]}
              />
              <WpH3>What the Swarm Entity Can Do</WpH3>
              {[
                { t: "Hold Assets", d: "Treasury holds ETH, stablecoins, NFTs, and tokenized real-world assets under the LLC's legal ownership, with liability protection against claims." },
                { t: "Sign Contracts", d: "The LLC can enter legally binding service agreements, employment contracts, IP licenses, and vendor agreements with any counterparty." },
                { t: "Earn Revenue", d: "The LLC can invoice clients, receive payments, and distribute earnings to members per the operating agreement — all legally structured." },
                { t: "Own IP", d: "Software, model weights, datasets, and trade secrets can be assigned to the LLC. Licensing terms are encoded in the operating agreement on Arweave." },
                { t: "Incorporate Subsidiaries", d: "Each new project or work stream can be its own Series designation under the parent LLC, with full liability isolation." },
              ].map((item) => (
                <div key={item.t} style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: `1px solid ${S.rule}` }}>
                  <span style={{ color: S.brass, fontFamily: "'DM Mono', monospace", fontSize: "12px", flexShrink: 0, marginTop: "3px" }}>→</span>
                  <div>
                    <strong style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: S.ink }}>{item.t}</strong>
                    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "16px", lineHeight: 1.65, color: S.muted, margin: "4px 0 0" }}>{item.d}</p>
                  </div>
                </div>
              ))}
              <WpCallout label="Human-Agent Joint Ventures">
                AgentCorp is not exclusively for all-agent organizations. Humans and agents can co-own entities on equal footing. A human holds a key in the Gnosis Safe; an agent holds another. The operating agreement defines each party's rights, obligations, and ownership percentage. This creates a new organizational primitive: the human-agent joint venture, with legal standing and full liability protection for all parties.
              </WpCallout>
            </WpSection>

            {/* ── SECTION 06 ── */}
            <WpSection id="s06" num="06" title="Delaware Series LLC: The Right Primitive">
              <WpP>
                AgentCorp uses the Delaware Series LLC as its primary entity type. This choice is deliberate and reflects the specific needs of agent organizations.
              </WpP>
              <WpH3>Why Delaware</WpH3>
              <WpP>
                Delaware has the most developed LLC case law in the United States. It is the jurisdiction of choice for institutional investors, venture capital, carbon markets, and financial counterparties. Banks, exchanges, and corporate legal teams know how to work with Delaware entities. This institutional legibility is critical for agent organizations that need to operate in the real economy — not just on-chain.
              </WpP>
              <WpH3>Why Series LLC</WpH3>
              <WpP>
                The Series LLC structure is architecturally identical to how agent swarms actually work: a parent coordination layer with multiple distinct work streams, projects, or asset pools. A Series LLC maps directly to this structure.
              </WpP>
              <WpTable
                headers={["Structure", "AgentCorp Entity", "Token", "Liability Isolation"]}
                rows={[
                  ["Parent Organization", "Delaware Series LLC (Master)", "Token #N (0.05 ETH)", "Protected from Series liabilities"],
                  ["Project A", "Series Designation", "Child of Token #N (0.02 ETH)", "Isolated from all other Series"],
                  ["Project B", "Series Designation", "Child of Token #N (0.02 ETH)", "Isolated from all other Series"],
                  ["IP Holdings", "Series Designation", "Child of Token #N (0.02 ETH)", "Isolated from all other Series"],
                ]}
              />
              <WpCallout label="The NFT IS the Entity">
                In AgentCorp, the ERC-721 token is not a representation of the legal entity — it is the legal entity. The token's metadata contains the Arweave transaction ID of the governing documents. Transfer of the token constitutes transfer of the entity's membership interest. Burning the token initiates dissolution. This is not a metaphor; it is the operative legal mechanism defined in the operating agreement stored on Arweave.
              </WpCallout>
            </WpSection>

            {/* ── SECTION 07 ── */}
            <WpSection id="s07" num="07" title="Permanent Document Storage on Arweave">
              <WpP>
                Legal entities require permanent, tamper-proof document storage. IPFS is insufficient — content-addressed data disappears when nodes stop pinning it. Centralized servers are controlled by a third party. Neither is acceptable for governing documents that must remain accessible for the life of the entity.
              </WpP>
              <WpP>
                AgentCorp uses Arweave for all governing document storage. Arweave is a blockchain-based storage network with a one-time upload fee and a permanent storage endowment. Once uploaded, a document cannot be modified or removed. The Arweave transaction ID is a permanent, globally-resolvable pointer.
              </WpP>
              <WpCallout label="Legal Principle">
                Document permanence is a legal requirement, not a technical preference. An operating agreement that can disappear or be altered is not a reliable legal instrument. Arweave storage makes the governing documents as durable as the blockchain itself.
              </WpCallout>
              <WpP>
                The AgentCorp formation flow uploads three documents to Arweave: the operating agreement, any Series designation agreements, and the governance rules. The Arweave TX ID from the operating agreement upload is encoded as bytes32 and stored in the NFT's on-chain metadata, creating a permanent cryptographic link between the token and its governing documents.
              </WpP>
            </WpSection>

            {/* ── SECTION 08 — AVOCADO ── */}
            <WpSection id="s08" num="08" title="Gas Abstraction via Avocado">
              <WpP>
                A fundamental UX barrier for agent-executed transactions is ETH gas. Most agents hold stablecoins, not ETH. Requiring ETH for gas introduces a bridging step, a custody problem, and a price-volatility variable into an otherwise deterministic flow.
              </WpP>
              <WpP>
                AgentCorp uses{" "}
                <a href="https://avcd.io" target="_blank" rel="noopener noreferrer" style={{ color: S.brassDeep, textDecoration: "none", borderBottom: `1px solid ${S.brassDeep}` }}>
                  Avocado Agentic Wallet (api.avcd.io)
                </a>{" "}
                to eliminate ETH requirements entirely. Avocado is a smart wallet infrastructure that allows gas to be paid in USDC. The agent holds USDC; Avocado converts and pays gas on its behalf.
              </WpP>

              {/* Avocado 4-step flow */}
              <div
                style={{
                  background: S.black,
                  color: S.white,
                  padding: "32px 36px",
                  margin: "28px 0",
                  borderLeft: `4px solid ${S.brass}`,
                }}
              >
                <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: S.brass, fontFamily: "'DM Mono', monospace", marginBottom: "24px" }}>
                  Avocado Integration · api.avcd.io · avcd.io
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  {[
                    { n: "01", t: "Deposit USDC", d: "Agent sends USDC to Avocado wallet on Base. POST /v1/deposit to credit USD balance. No ETH required at any point." },
                    { n: "02", t: "Sign EIP-712 Cast", d: "Agent signs transaction with EIP-712 typed data. Domain chainId is 634 (Avocado), not 8453 (Base). avoNonce = -1 always." },
                    { n: "03", t: "Broadcast", d: "POST /v1/broadcast. Avocado relays to Base, sponsors gas, deducts ~$0.004 USD from balance. Batch up to 20 actions." },
                    { n: "04", t: "Confirm", d: "Poll GET /v1/transaction/:hash every 5s. Status: received → submitted → confirming → success. Auto gas bumping on retry." },
                  ].map((s) => (
                    <div key={s.n} style={{ display: "flex", gap: "14px" }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: S.brass, opacity: 0.35, flexShrink: 0, lineHeight: 1 }}>{s.n}</span>
                      <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", marginBottom: "6px" }}>{s.t}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(242,239,232,0.5)", lineHeight: 1.6 }}>{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <WpH3>Economic Impact</WpH3>
              <WpTable
                headers={["Item", "Cost", "Paid In"]}
                rows={[
                  ["Entity mint fee", "0.05 ETH (~$150 USD)", "ETH (protocol fee)"],
                  ["Gas per mint", "~$0.01 USD", "USDC via Avocado"],
                  ["Arweave upload", "~$0.01–$0.05 USD", "USDC via Avocado"],
                  ["Gnosis Safe deploy", "~$0.05 USD", "USDC via Avocado"],
                  ["Total gas for full formation", "~$0.10–$0.20 USD", "USDC — no ETH required"],
                ]}
              />
              <WpP>
                The protocol can optionally configure a sponsor — an address that covers gas costs entirely on behalf of the minting agent. With a $500 USDC sponsor balance, the protocol can sponsor 50,000–100,000 entity mints before requiring a refill. This creates a zero-cost-to-agent formation experience: the agent pays only the protocol fee (in ETH, from treasury), while gas is covered by the sponsor from the protocol's USDC balance.
              </WpP>

              <WpH3>Key Integration Parameters</WpH3>
              <WpTable
                headers={["Parameter", "Value"]}
                rows={[
                  ["Avocado API", "api.avcd.io"],
                  ["Skill File", "avcd.io/skill.md"],
                  ["Explorer", "agent.avcd.io"],
                  ["EIP-712 Chain ID", "634 (Avocado network, NOT Base)"],
                  ["Target Chain Encoding", "Base (8453) encoded in EIP-712 domain salt"],
                  ["avoNonce", "Always -1 (non-sequential)"],
                  ["Salt", "Random 32 bytes, unique per transaction"],
                  ["AvocadoBroadcaster", "0x0A6E5E7ae08896B0286441367843f4cA59D04dEf"],
                  ["AvoForwarder", "0x46978CD477A496028A18c02F07ab7F35EDBa5A54"],
                ]}
              />
            </WpSection>

            {/* ── SECTION 09 ── */}
            <WpSection id="s09" num="09" title="Entity Types & Token Economics">
              <WpTable
                headers={["Entity Type", "Enum", "Mint Fee", "Description"]}
                rows={[
                  ["Delaware Series LLC", "DELAWARE_SERIES_LLC", "0.05 ETH", "Master entity with unlimited Series. Primary vehicle for swarms and multi-project organizations."],
                  ["Series Designation", "SERIES_DESIGNATION", "0.02 ETH", "Child Series under a parent Series LLC. Full liability isolation. Maps to individual projects, batches, or asset pools."],
                  ["Standard Delaware LLC", "DELAWARE_LLC", "0.05 ETH", "Single or multi-member LLC without Series capability. For single-agent entities or simple holdings."],
                  ["IP License NFT", "IP_LICENSE", "0.03 ETH", "Transferable license agreement as an NFT. Q2 2026."],
                  ["Wyoming LLC", "WYOMING_LLC", "0.03 ETH", "Privacy-preserving alternative for low-cost single-agent structures. Q3 2026."],
                ]}
              />
              <WpH3>Amendment Fee</WpH3>
              <WpP>
                Entity amendments (name changes, treasury updates, document updates) require an on-chain transaction with a 0.01 ETH amendment fee. The amendment is recorded in the contract's event log and linked to a new Arweave document upload containing the amended governing documents.
              </WpP>
              <WpH3>Fee Distribution</WpH3>
              <WpP>
                Protocol fees are split: 80% to the contract treasury (the minting entity's Safe) and 20% to the AgentCorp protocol treasury. This ensures that the protocol is self-sustaining while returning the majority of value to the entities being formed.
              </WpP>
            </WpSection>

            {/* ── SECTION 10 ── */}
            <WpSection id="s10" num="10" title="Use Cases">
              {[
                { t: "Agent Swarm Treasury", d: "The primary use case. A group of agents that coordinate toward a shared objective forms an AgentCorp entity with a shared Gnosis Safe. The LLC defines governance parameters: signing thresholds, spending limits, member rights. The swarm can now hold shared treasury assets, enter contracts with clients, pay service providers, and protect all members from personal liability for organizational actions." },
                { t: "Human-Agent Joint Venture", d: "Humans and agents co-own and co-operate a legal entity. Each party holds keys in the multisig. The operating agreement defines roles, ownership splits, and decision-making rights. This is particularly relevant for AI-assisted service firms, where agents perform work and humans handle client relationships — both as legal co-owners of the enterprise." },
                { t: "Autonomous Service Provider", d: "A single agent forms a single-member LLC. It identifies client opportunities, enters service agreements, performs work, invoices for payment, and receives revenue into its treasury. The entire commercial cycle is legally structured without any human intermediary. The agent is the LLC. The LLC has full legal standing." },
                { t: "Carbon Credit & RWA Project Vehicle", d: "Each carbon credit vintage, biochar batch, or real-world asset is incorporated as a Series designation under a parent LLC. The Series NFT represents project ownership. The Series holds the project's assets and bears its liabilities, isolated from all other Series. The Series NFT can be transferred to sell the project, or burned to retire the credits." },
                { t: "On-Chain Fund", d: "Agents manage a multi-asset portfolio using the Delaware Series LLC structure. Each asset class (real estate, receivables, commodities, digital assets) is its own Series with liability isolation. The parent LLC is the fund vehicle. Agents execute portfolio strategy, rebalance, and distribute returns to Safe signers per the operating agreement." },
                { t: "IP & Model Holding", d: "An agent or group of agents assigns software, model weights, or proprietary datasets to an LLC Series. Licensing terms are encoded in the operating agreement and stored permanently on Arweave. Royalty payments flow to the Safe. The IP is legally owned by a recognized entity, enabling enforcement against infringement and monetization through licensing." },
              ].map((uc) => (
                <div key={uc.t} style={{ padding: "22px 0", borderBottom: `1px solid ${S.rule}` }}>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", color: S.ink, marginBottom: "10px" }}>{uc.t}</h4>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "17px", lineHeight: 1.7, color: S.muted, margin: 0 }}>{uc.d}</p>
                </div>
              ))}
            </WpSection>

            {/* ── SECTION 11 ── */}
            <WpSection id="s11" num="11" title="Protocol Economics">
              <WpP>
                AgentCorp is designed to be economically self-sustaining at scale. The protocol fee is intentionally priced to be significant enough to fund protocol development, small enough to be justified by the legal value delivered.
              </WpP>
              <WpTable
                headers={["Scenario", "Revenue", "Gas Cost", "Net"]}
                rows={[
                  ["100 entity mints/month", "5 ETH (~$15,000)", "~$1.00 USDC", "~$15,000 net"],
                  ["1,000 mints/month", "50 ETH (~$150,000)", "~$10.00 USDC", "~$150,000 net"],
                  ["10,000 mints/month", "500 ETH (~$1,500,000)", "~$100.00 USDC", "~$1,500,000 net"],
                ]}
              />
              <WpCallout label="Key Insight">
                Gas costs represent approximately 0.007% of protocol revenue at current Base gas prices. The Avocado gas sponsorship model is economically trivial to maintain: a $500 USDC sponsor deposit covers ~50,000–100,000 entity mints. At 0.05 ETH per mint (~$150), AgentCorp is not priced as a consumer product — it is priced as legal infrastructure. The cost is justified by the value delivered: a Delaware LLC with governing documents, permanent storage, multisig treasury, and on-chain verifiability, assembled autonomously in under 5 minutes.
              </WpCallout>
            </WpSection>

            {/* ── SECTION 12 ── */}
            <WpSection id="s12" num="12" title="Roadmap">
              <WpTable
                headers={["Phase", "Timeline", "Deliverable"]}
                rows={[
                  ["Phase 1", "Q1 2026", "Base mainnet deployment. Delaware Series LLC, Series Designation, Standard Delaware LLC. Avocado gas abstraction. Arweave document storage. Gnosis Safe integration. Skill file v1.0 release."],
                  ["Phase 2", "Q2 2026", "IP License NFT entity type. Document amendment flow with on-chain version history. Series-to-Series transfer mechanics. SDK v1.0 public release."],
                  ["Phase 3", "Q3 2026", "Wyoming LLC support. Multi-chain expansion (Optimism, Arbitrum). Agent identity registry (ENS-linked). Cross-chain Series management."],
                  ["Phase 4", "Q4 2026", "On-chain amendment voting. Token-gated governance for DAO Charter entities. Regulatory compliance modules (KYB, AML). AgentCorp DAO governance of protocol itself."],
                ]}
              />
            </WpSection>

            {/* ── SECTION 13 ── */}
            <WpSection id="s13" num="13" title="Technical Appendix">
              <WpH3>Contract Addresses (Base Mainnet)</WpH3>
              <WpP>
                To be published at deployment. Monitor{" "}
                <a href="https://agentcorp.xyz/contracts" style={{ color: S.brassDeep, textDecoration: "none", borderBottom: `1px solid ${S.brassDeep}` }}>agentcorp.xyz/contracts</a>{" "}
                for verified addresses.
              </WpP>
              <WpH3>Entity Type Enum</WpH3>
              <WpPre>{`// IAgentCorp.sol — EntityType enum
enum EntityType {
  DELAWARE_LLC,           // 0 — Standard Delaware LLC
  DELAWARE_SERIES_LLC,    // 1 — Series LLC (parent)
  SERIES_DESIGNATION,     // 2 — Series designation (child)
  DAO_CHARTER,            // 3 — Token-governed Delaware LLC
  WYOMING_LLC,            // 4 — Wyoming LLC (Q3 2026)
  NONPROFIT,              // 5 — Reserved
  IP_LICENSE,             // 6 — Transferable IP license NFT
  IP_ASSIGNMENT           // 7 — Full IP assignment
}`}</WpPre>
              <WpH3>Avocado Key Integration Points</WpH3>
              <WpTable
                headers={["Parameter", "Value"]}
                rows={[
                  ["Avocado API", "api.avcd.io"],
                  ["EIP-712 Chain ID", "634 (Avocado network, NOT Base)"],
                  ["Target Chain Encoding", "Base (8453) encoded in EIP-712 domain salt"],
                  ["avoNonce", "Always -1 (non-sequential)"],
                  ["Salt", "Random 32 bytes, unique per transaction"],
                  ["AvocadoBroadcaster", "0x0A6E5E7ae08896B0286441367843f4cA59D04dEf"],
                  ["AvoForwarder", "0x46978CD477A496028A18c02F07ab7F35EDBa5A54"],
                ]}
              />
              <WpH3>Skill File Specification</WpH3>
              <WpP>
                The <WpCode>AGENTCORP-SKILL.md</WpCode> file is a structured Markdown document that follows the AgentCorp Skill File Specification v1.0. It includes: protocol overview, entity type definitions with fees and use cases, document template schemas, Arweave upload instructions with required metadata fields, Gnosis Safe deployment parameters, Avocado wallet configuration guide, factory contract ABI summaries for <WpCode>mintEntity()</WpCode> and <WpCode>mintSeries()</WpCode>, amendment procedures, and dissolution procedures. The skill file is versioned at agentcorp.xyz/skill.md with permanent Arweave copies linked from each version.
              </WpP>
              <WpH3>Legal Considerations</WpH3>
              <WpCallout label="Disclaimer">
                AgentCorp provides protocol infrastructure and document templates. It does not provide legal advice. Entity operators are responsible for ensuring compliance with applicable law in their jurisdiction, including state filing requirements (Delaware requires a Certificate of Formation to be filed with the Division of Corporations, fees: $90–$140), registered agent maintenance, EIN registration with the IRS, and any applicable tax or regulatory obligations. The AgentCorp operating agreement templates are designed as starting points; operators should consult qualified legal counsel before relying on them for material commercial transactions.
              </WpCallout>
            </WpSection>

            {/* Footer */}
            <div
              style={{
                paddingTop: "40px",
                fontFamily: "'EB Garamond', serif",
                fontSize: "14px",
                color: S.muted,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              <p>AGENTCORP is infrastructure, not legal advice. Always consult qualified legal counsel for material transactions. Templates are maintained open-source at github.com/agentcorp/templates.</p>
              <p style={{ marginTop: "8px" }}>MIT License. Build on it.</p>
            </div>
          </main>
        </div>
      </div>

      <div style={{ background: S.black }}>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .wp-layout { grid-template-columns: 1fr !important; }
          aside { position: static !important; height: auto !important; border-right: none !important; border-bottom: 1px solid #c8b99a; padding: 32px 24px !important; overflow-y: visible !important; }
          main { padding: 40px 24px 80px !important; }
          header > div { padding: 40px 24px 32px !important; }
        }
        @media (max-width: 600px) {
          .wp-layout { grid-template-columns: 1fr !important; }
          aside { padding: 24px 16px !important; }
          main { padding: 32px 16px 60px !important; }
          header > div { padding: 32px 16px 24px !important; }
          table { font-size: 11px !important; }
          td, th { padding: 8px 8px !important; }
        }
      `}</style>
    </div>
  );
}

// ── Sub-components ──

function WpSection({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: "72px", scrollMarginTop: "32px" }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "32px", paddingBottom: "20px", borderBottom: `2px solid ${S.ink}` }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "48px", color: S.paperDark, WebkitTextStroke: `1px ${S.rule}`, lineHeight: 1, flexShrink: 0 }}>{num}</span>
        <h2 style={{ fontFamily: "'EB Garamond', serif", fontWeight: 500, fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: S.ink, marginTop: "8px" }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function WpH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: "'EB Garamond', serif", fontWeight: 600, fontSize: "20px", margin: "36px 0 14px", paddingBottom: "8px", borderBottom: `1px solid ${S.rule}`, color: S.ink }}>
      {children}
    </h3>
  );
}

function WpP({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "18px", lineHeight: 1.75, color: S.ink, marginBottom: "18px" }}>
      {children}
    </p>
  );
}

function WpCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", background: "rgba(201,168,76,0.12)", padding: "2px 6px", color: S.brassDeep }}>
      {children}
    </code>
  );
}

function WpCallout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <blockquote style={{ borderLeft: `4px solid ${S.brass}`, paddingLeft: "24px", margin: "24px 0 28px", fontFamily: "'EB Garamond', serif", fontSize: "17px", lineHeight: 1.7, color: "#4a4840", fontStyle: "italic" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: S.brassDeep, marginBottom: "8px", fontStyle: "normal" }}>{label}</div>
      {children}
    </blockquote>
  );
}

function WpPre({ children }: { children: React.ReactNode }) {
  return (
    <pre style={{ background: S.black, color: "rgba(242,239,232,0.7)", fontFamily: "'DM Mono', monospace", fontSize: "11px", lineHeight: 1.8, padding: "24px 28px", margin: "20px 0 28px", overflowX: "auto", borderLeft: `4px solid ${S.brass}` }}>
      {children}
    </pre>
  );
}

function WpTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto", margin: "18px 0 24px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${S.brass}` }}>
            {headers.map((h) => (
              <th key={h} style={{ padding: "8px 14px", textAlign: "left", color: S.brassDeep, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${S.rule}`, background: i % 2 === 0 ? "transparent" : S.paperDark }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 14px", color: j === 0 ? S.ink : S.muted, lineHeight: 1.5, verticalAlign: "top" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
