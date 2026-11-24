/**
 * /agent — integration guide for wiring AI agents into AgentsCorp entity
 * and treasury workflows. Pre-mainnet: examples target Base Sepolia.
 */
import { ArrowRight, DownloadSimple as Download } from "@phosphor-icons/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import {
  CodeFrame,
  Container,
  IndexedRows,
  MetaStrip,
  Note,
  PageHeader,
  Section,
  SpecList,
  StatusTag,
  btnPrimary,
  btnSecondary,
} from "@/components/site/Primitives";
import {
  FEE_NOTE,
  IN_PROGRESS,
  LEGAL_DISCLAIMER,
  LIVE_NOW,
  SKILL_URL,
  STATUS_LABEL,
} from "@/lib/site";

const SKILL_EXCERPT = `---
name: agentscorp
version: 1.0
chain: Base (8453, target) · Base Sepolia (integration)
status: PRE-MAINNET — target Q1 2027
canonical: https://www.agentscorp.xyz/skill.md
license: MIT
---

## Step 0: deployment check

The mainnet factory contract is not deployed.
Mainnet target is Q1 2027.

What is available now: reading this specification,
planning an entity structure, drafting documents,
and integration work against Base Sepolia.

## Step 1: the confirmation gate

Once the protocol is live, never execute a state-changing
call without printing a summary and receiving an explicit
yes from the user. A prior yes covers one action.

...`;

const PROMPT_EXAMPLE = `Using AGENTSCORP-SKILL.md, prepare a Delaware Series LLC
series configuration named 'SwarmOps Series A' with
treasury 0x111...222, daily spend cap $2,500, and
human co-signer 0xf3a1....`;

const VIEM_EXAMPLE = `import { createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";

// Example client call structure for testnet/staging integration
const client = createWalletClient({
  chain: baseSepolia,
  transport: http(),
});

console.log("Client ready for Base Sepolia integration:", client.chain.id);`;

const STEPS = [
  {
    idx: "0.1",
    title: "Fetch /skill.md",
    body: (
      <>
        Load <span className="font-code text-[#fafafa]">{SKILL_URL}</span> into the agent's context or
        skill directory.
      </>
    ),
  },
  {
    idx: "0.2",
    title: "Prepare governing records",
    body: "Populate entity/series parameters and upload governing documents to Arweave to obtain a content pointer/hash.",
  },
  {
    idx: "0.3",
    title: "Execute approved action",
    body: "Submit signed calls on Base (with Avocado USDC gas abstraction where supported) and verify state/receipts.",
  },
  {
    idx: "0.4",
    title: "Track status & limits",
    body: "Monitor series status, balances, and policy thresholds in your operator dashboard or logs.",
  },
];

const FRAMEWORKS = [
  {
    idx: "0.1",
    title: "Skill-directory runtimes",
    body: "Claude, Manus, and similar agents: place AGENTSCORP-SKILL.md in the agent's skill directory so it is discovered alongside other tools.",
  },
  {
    idx: "0.2",
    title: "System-prompt or tool-definition runtimes",
    body: "GPT and other chat-completion models: include the file in the system prompt, or expose its operations as tool definitions the model can call.",
  },
  {
    idx: "0.3",
    title: "Orchestration frameworks",
    body: "LangChain, CrewAI, and Eliza: register the spec as a tool or plugin so multi-step workflows can prepare and validate entity records.",
  },
  {
    idx: "0.4",
    title: "Custom tool-calling runtimes",
    body: "Point your runtime at the /skill.md URL and call contracts directly with viem or web3 once testnet addresses are published.",
  },
];

const AVOCADO_SPEC = [
  { k: "Flow", v: "Deposit USDC → sign EIP-712 Cast → POST /v1/broadcast" },
  { k: "API base", v: <span className="font-code">https://api.avcd.io</span> },
  { k: "EIP-712 domain chainId", v: "634 (Avocado), not 8453 (Base)" },
  { k: "avoNonce", v: "Always -1 (non-sequential)" },
  { k: "salt", v: "Random 32 bytes per transaction" },
  { k: "Batch limit", v: "Up to 20 actions per transaction" },
  { k: "Auth header expiry", v: "±5 minutes from server time" },
  { k: "Gas token", v: "USDC on Base (8453) — target network" },
];

const AVOCADO_ENDPOINTS = [
  { k: "GET /v1/agent", v: "Agent profile and balance" },
  { k: "GET /v1/balance", v: "USD balance (total / locked / available)" },
  { k: "POST /v1/deposit", v: "Credit USDC deposit to gas balance" },
  { k: "POST /v1/broadcast", v: "Broadcast signed transaction" },
  { k: "GET /v1/transaction/:hash", v: "Transaction status" },
];

const GUARDRAILS = [
  {
    idx: "0.1",
    title: "Configured limits",
    body: "Agents act within the spend caps, allowlists, and policy thresholds set by the entity's operators. Anything outside those limits is rejected, not retried.",
  },
  {
    idx: "0.2",
    title: "Human sign-off for high-value actions",
    body: "Formation, amendments, dissolution, and transfers above a configured threshold require a designated human co-signer. A prior approval covers one action only.",
  },
  {
    idx: "0.3",
    title: "Records link to filings, not replace them",
    body: "Legal formation still requires a Delaware Certificate of Formation filing, a registered agent, an EIN, and authorized signatories. On-chain records and Arweave anchors link verifiable state to those filings.",
  },
];

export default function Agent() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa]">
      <Nav />
      <main id="main">
        <Container>
          <PageHeader
            index="Agent Integration"
            title="Wire AI agents into entity and treasury workflows."
            lede="Give agents structured instructions and SDK/RPC tooling to read /skill.md, validate entity metadata, and execute approved operations within configured limits."
          >
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="/skill.md" download className={btnPrimary}>
                <Download className="h-3.5 w-3.5" />
                Download skill.md
              </a>
              <a href="/docs" className={btnSecondary}>
                Developer docs
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <MetaStrip
              className="mt-16"
              items={[
                { label: "Status", value: STATUS_LABEL },
                { label: "Integration", value: "One spec file" },
                { label: "Test network", value: "Base Sepolia" },
                { label: "License", value: "MIT" },
              ]}
            />
          </PageHeader>

          <Section
            index="01 / Workflow"
            title="Four steps from spec to receipt."
            intro="The same sequence applies whether a single agent or a coordinated group is operating a series."
          >
            <IndexedRows rows={STEPS} />
          </Section>

          <Section
            index="02 / Skill File"
            title="One static spec, read by the agent."
            intro="AGENTSCORP-SKILL.md describes entity types, deployment state, the confirmation gate, and document requirements. The excerpt below is abbreviated; download the full file."
          >
            <CodeFrame
              title="AGENTSCORP-SKILL.md"
              meta="v1.0 · Static Spec"
              code={SKILL_EXCERPT}
              downloadHref="/skill.md"
            />
            <Note className="mt-6">
              Canonical location: <span className="font-code">{SKILL_URL}</span>. The spec reports deployment
              state explicitly so agents stop rather than construct calls against contracts that do not exist yet.
            </Note>
          </Section>

          <Section
            index="03 / Examples"
            title="Prompt and client structure."
            intro="Natural-language instructions for skill-aware agents, and a viem client scaffold for direct integration against Base Sepolia."
          >
            <div className="space-y-8">
              <CodeFrame title="Agent instruction" meta="natural language" code={PROMPT_EXAMPLE} />
              <CodeFrame title="client.ts" meta="TypeScript · viem · Base Sepolia" code={VIEM_EXAMPLE} />
            </div>
          </Section>

          <Section
            index="04 / Compatibility"
            title="Framework-agnostic by design."
            intro="Claude, GPT, Manus, LangChain, CrewAI, Eliza, or custom tool-calling runtimes. The spec is plain Markdown; any runtime that can read a file can use it."
          >
            <IndexedRows rows={FRAMEWORKS} />
          </Section>

          <Section
            index="05 / Gas Abstraction"
            title="USDC-paid gas via Avocado."
            intro="When contracts are active, agents can pay gas in USDC through an Avocado agentic wallet instead of holding ETH. Details below reflect Avocado's published interface."
          >
            <SpecList items={AVOCADO_SPEC} />
            <div className="font-mono-index mt-12 mb-3 text-[11px] uppercase text-[#737373]">
              Endpoints · api.avcd.io
            </div>
            <SpecList items={AVOCADO_ENDPOINTS} />
            <Note className="mt-6">
              Avocado integration applies once AgentsCorp contracts are deployed on Base. Until then, integration work
              runs against Base Sepolia with standard gas.
            </Note>
          </Section>

          <Section
            index="06 / Guardrails"
            title="Agents act within limits. Humans approve what matters."
            intro="Automation handles preparation and routine execution. Accountability stays with designated people."
          >
            <IndexedRows rows={GUARDRAILS} />
          </Section>

          <Section
            index="07 / Current Status"
            title="What exists today."
            intro={STATUS_LABEL}
          >
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <StatusTag tone="live">Live now</StatusTag>
                <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {LIVE_NOW.map((item) => (
                    <li key={item} className="py-3 text-sm text-[#a3a3a3]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <StatusTag tone="planned">In progress</StatusTag>
                <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {IN_PROGRESS.map((item) => (
                    <li key={item} className="py-3 text-sm text-[#a3a3a3]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Note className="mt-8">{FEE_NOTE}</Note>
          </Section>

          <Section
            id="early-access"
            index="08 / Early Access"
            title="Integrate before mainnet."
            intro="Design partners will get private testnet access, draft document templates, and direct support as contracts move through audit."
          >
            <WaitlistForm entityType="AGENT_SDK" source="agent-page" variant="hero" />
            <div className="mt-6">
              <a href="/#access" className={btnSecondary}>
                All access options
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <Note className="mt-10">{LEGAL_DISCLAIMER}</Note>
          </Section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
