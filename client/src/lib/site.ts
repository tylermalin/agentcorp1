/**
 * Shared site content. One source of truth for status, roadmap, entity
 * types, and legal copy so every page tells the same story.
 */

export const SITE_URL = "https://www.agentscorp.xyz";
export const SKILL_URL = `${SITE_URL}/skill.md`;
export const GITHUB_URL = "https://github.com/tylermalin/agentscorp";

export const STATUS_LABEL = "Q1 2027 Target · Pre-Mainnet";

export const LEGAL_DISCLAIMER =
  "AgentsCorp provides software tools, protocol specifications, and starting-point document templates. AgentsCorp does not provide legal advice, registered agent services, tax advice, or licensed banking/brokerage services. Creating a legally recognized LLC or series, obtaining an EIN, and opening financial accounts require statutory filings, compliance with applicable law, and approval by relevant agencies and financial institutions. Consult qualified legal counsel before relying on templates or contracts for material transactions.";

export const FEE_NOTE =
  "Fee schedules and on-chain mint parameters are being finalized for Q1 2027 mainnet launch; statutory state filings, registered agent services, and EIN registration remain required for legal validity.";

export const LIVE_NOW = [
  "Public website, whitepaper, and developer documentation",
  "Static /skill.md agent specification",
  "Waitlist and design-partner applications",
];

export const IN_PROGRESS = [
  "Delaware Series LLC (6 Del. C. § 18-215) document templates, to be shared with design partners",
  "Base smart-contract audit and deployment",
  "Automated EIN and banking/treasury integrations",
  "Design-partner onboarding",
];

export type EntityRow = {
  name: string;
  code: string;
  jurisdiction: string;
  use: string;
  status: string;
};

export const ENTITY_ROWS: EntityRow[] = [
  {
    name: "Delaware Series LLC",
    code: "DE-SERIES-LLC",
    jurisdiction: "Delaware (6 Del. C. § 18-215)",
    use: "Parent entity holding segregated child series",
    status: "In Development · Q1 2027",
  },
  {
    name: "Series Designation",
    code: "DE-SERIES",
    jurisdiction: "Delaware",
    use: "Isolated project, agent, or asset series under parent",
    status: "In Development · Q1 2027",
  },
  {
    name: "Standard Delaware LLC",
    code: "DE-LLC",
    jurisdiction: "Delaware",
    use: "Single or multi-member operating entity",
    status: "In Development · Q1 2027",
  },
  {
    name: "DAO Operating Charter",
    code: "DE-DAO-LLC",
    jurisdiction: "Delaware",
    use: "Governance-linked entity structure",
    status: "Planned · 2027",
  },
  {
    name: "IP License Agreement",
    code: "IP-LICENSE",
    jurisdiction: "Protocol / Contract",
    use: "Structured licensing terms and rights records",
    status: "Planned · Q1/Q2 2027",
  },
  {
    name: "Wyoming LLC",
    code: "WY-LLC",
    jurisdiction: "Wyoming",
    use: "Alternative LLC structure for select operators",
    status: "Planned · Q3 2027",
  },
];

export const ROADMAP = [
  {
    when: "Q1 2027",
    body: "Base contract rollout after audit, core Delaware Series LLC / series workflows, EIN and treasury integration, and early design partners.",
  },
  {
    when: "Q2–Q4 2027",
    body: "Expanded entity types, amendment history, multi-chain support, and compliance modules.",
  },
];

export const SDK_SAMPLE = `import { AgentsCorpClient } from "@agentscorp/sdk";

const corp = new AgentsCorpClient({
  apiKey: process.env.AGENTSCORP_API_KEY,
  network: "base-sepolia", // Pre-mainnet testnet target
});

const series = await corp.series.create({
  parentEntityId: "de-series-llc-parent-01",
  label: "SwarmOps Task Runner #14",
  treasuryPolicy: {
    dailyCapUsd: 2500,
    requireApprovalAboveUsd: 500,
  },
});

console.log(\`Provisioned series \${series.id} (\${series.status})\`);`;

export const COMPANY = {
  founder: "Tyler Malin",
  founderBio:
    "Legal engineer and attorney (Fordham JD, NY Bar). Repeat founder across AI governance, climate MRV (Mālama Labs), and Beneficial Technology; scaled and exited two companies, including Inc. 500 #95 Idea Farmer.",
  links: [
    { label: "X", href: "https://x.com/tylermalin" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tylermalin" },
  ],
  stage: "Pre-revenue · pre-mainnet",
  model:
    "Early. Planned per-entity and per-series protocol fees (see whitepaper §13); pricing is being set with design partners.",
};

export type Faq = { q: string; a: string };

/** Plain-language answers; also emitted as FAQPage structured data. */
export const FAQ: Faq[] = [
  {
    q: "Can an AI agent own or manage an LLC?",
    a: "No. Under current law an AI agent is not a legal person, so it cannot be a member or manager. People or companies own and manage each series; the agent acts under a written mandate, inside spending limits and approval thresholds those humans set.",
  },
  {
    q: "Is the on-chain token the company?",
    a: "No. The token on Base is a record that links an entity or series to its governing documents, treasury, and amendment history. The legal entity exists because of state filings, not because a token was minted.",
  },
  {
    q: "Do I still need a Certificate of Formation, a registered agent, and an EIN?",
    a: "Yes. A Delaware Series LLC requires a Certificate of Formation filed through a registered agent, and an IRS EIN for tax and banking. AgentsCorp tracks those steps alongside the on-chain record; it does not file with the state or act as a registered agent.",
  },
  {
    q: "What does series liability isolation actually require?",
    a: "Under 6 Del. C. § 18-215, isolation depends on keeping separate records and accounting for each series' assets and on the certificate of formation giving notice of the limitation on liabilities. AgentsCorp is designed to keep records, documents, and treasury activity separate per series so that discipline is built in.",
  },
  {
    q: "What happens if an agent tries to exceed its limits?",
    a: "Each series carries a policy: spend caps, approval thresholds, and designated human co-signers. Actions inside the policy proceed; actions above a threshold stop and wait for a human signer; actions outside the mandate are rejected.",
  },
  {
    q: "Can each series have its own bank account?",
    a: "It depends on the bank. Many institutions require a separate EIN per series and apply their own KYB and risk rules, and some do not open accounts for individual series at all. AgentsCorp records can support that review but cannot guarantee approval.",
  },
  {
    q: "How is this different from agent LLC formation services?",
    a: "Formation services, including newer agent-first ones, help you create an entity quickly, and several are live today. AgentsCorp focuses on operating entities for agents: one parent LLC with a protected series per agent, spend caps and human co-signers enforced at runtime, and records anchored so a bank or auditor can verify them. It is pre-mainnet, targeting Q1 2027.",
  },
  {
    q: "Is AgentsCorp a law firm?",
    a: "No. AgentsCorp provides software, protocol specifications, and starting-point document templates. Its founder is a licensed attorney, but AgentsCorp does not give legal, tax, or banking advice, and using the site or templates does not create an attorney-client relationship. Have your own counsel review documents before relying on them for material transactions.",
  },
  {
    q: "When can I use it, and what will it cost?",
    a: "Mainnet is targeted for Q1 2027, with design partners onboarding before that. The business model is early: planned per-entity and per-series protocol fees, with pricing set alongside design partners. State filing, registered agent, and counsel fees are separate.",
  },
  {
    q: "Which agent frameworks does it work with?",
    a: "Any agent that can read a URL or call a tool: Claude, GPT, LangChain, CrewAI, Eliza, Manus, or a custom runtime. Point the agent at agentscorp.xyz/skill.md, which also tells it when to stop.",
  },
  {
    q: "Who is building AgentsCorp?",
    a: "AgentsCorp is founded by Tyler Malin, a legal engineer and attorney (Fordham JD, NY Bar) and repeat founder who has scaled and exited two companies. It is currently a solo-founder, pre-revenue project working toward a Q1 2027 mainnet with a small cohort of design partners.",
  },
];

/* ------------------------------------------------------------------ */
/* Why now + landscape (whitepaper §02–03, home sections)              */
/* ------------------------------------------------------------------ */

export const WHITEPAPER = {
  version: "v1.1",
  date: "November 24, 2026",
  isoDate: "2026-11-24",
  author: "Tyler Malin",
  pdf: "/agentscorp-whitepaper-v1.1.pdf",
};

export type Source = { label: string; href: string };

export const WHY_NOW: { when: string; title: string; body: string; sources: Source[] }[] = [
  {
    when: "Feb 2024",
    title: "Operators carry the liability",
    body: "In Moffatt v. Air Canada (2024 BCCRT 149), a tribunal rejected the argument that a chatbot was a separate entity responsible for its own statements; the company paid. Whatever an agent does, the business behind it answers for it.",
    sources: [
      {
        label: "ABA Business Law Today",
        href: "https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/",
      },
    ],
  },
  {
    when: "2025",
    title: "Agents got payment rails",
    body: "Coinbase launched x402 for stablecoin payments over HTTP (May 2025). Google announced the Agent Payments Protocol, AP2 (September 2025). Stripe and OpenAI released the Agentic Commerce Protocol (September 2025). Agents can now spend money directly.",
    sources: [
      { label: "Coinbase: x402", href: "https://www.coinbase.com/developer-platform/discover/launches/x402" },
      { label: "Google Cloud: AP2", href: "https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol" },
      { label: "Stripe: ACP", href: "https://stripe.com/newsroom/news/stripe-openai-instant-checkout" },
    ],
  },
  {
    when: "Jul 2025",
    title: "Stablecoins got a federal framework",
    body: "The GENIUS Act, signed July 18, 2025, created the first U.S. federal framework for payment stablecoins, the asset most agent payment rails settle in.",
    sources: [
      {
        label: "Mayer Brown",
        href: "https://www.mayerbrown.com/en/insights/publications/2025/07/genius-act-signed-into-law-us-enacts-federal-stablecoin-legislation",
      },
    ],
  },
  {
    when: "2026",
    title: "Agent entities went mainstream, and contested",
    body: "Formation services launched agent-first flows, and Delaware drafted a sandbox for a new AI-managed entity (the AIC), now expected no earlier than 2027 and already drawing congressional scrutiny. The question has moved from whether agents need structure to which structure holds up.",
    sources: [
      { label: "Spotlight Delaware", href: "https://spotlightdelaware.org/2026/06/30/delaware-committee-drafts-plan-to-test-companies-run-by-ai/" },
      {
        label: "Delaware Public Media",
        href: "https://www.delawarepublic.org/politics-government/2026-10-30/congressional-oversight-committee-questions-delawares-work-on-artificial-intelligence-companies",
      },
    ],
  },
];

export const WHY_NOW_TAKEAWAY =
  "Agents can now pay, and they can be wrapped in entities. What is missing is the operating layer: isolation per agent, spend policy enforced at runtime, and records a bank, auditor, or court can verify.";

export const LANDSCAPE_AS_OF = "November 2026";

export type LandscapeRow = {
  approach: string;
  examples: string;
  strength: string;
  difference: string;
  status: string;
};

export const LANDSCAPE: LandscapeRow[] = [
  {
    approach: "Agent-first formation",
    examples: "doola (agentic formation), Naive, ClawBank",
    strength: "Live today. An agent or developer can form an LLC, request an EIN, and connect banking quickly, often from inside an AI tool.",
    difference: "AgentsCorp focuses on what happens after formation: one parent with a protected series per agent, spend policy at runtime, and anchored records.",
    status: "Live",
  },
  {
    approach: "On-chain LLC wrappers",
    examples: "OtoCo, Kali (Wrappr)",
    strength: "Fast Delaware and Wyoming LLC and Series LLC wrappers tied to wallets or NFTs, proven with DAOs and web3 builders.",
    difference: "Built around agent mandates rather than DAO membership: spend caps, approval thresholds, human co-signers, and an agent-readable spec.",
    status: "Live",
  },
  {
    approach: "Traditional formation",
    examples: "Stripe Atlas, registered agent firms",
    strength: "Mature, well-understood formation with banking partners and compliance support.",
    difference: "Human-first workflows. AgentsCorp adds machine-readable structure so agents know their limits and when to stop.",
    status: "Live",
  },
  {
    approach: "New statutory entity",
    examples: "Delaware AIC (proposed)",
    strength: "Could let an AI agent manage a company's day-to-day affairs inside a regulatory sandbox.",
    difference: "A draft, not law, with 2027 the earliest date. AgentsCorp works under existing law (§ 18-215) and keeps humans as managers; it could complement an AIC if one is enacted.",
    status: "Proposed",
  },
  {
    approach: "AgentsCorp",
    examples: "This project",
    strength: "Series per agent, treasury guardrails with human co-signers, Arweave-anchored records, and /skill.md, designed as one operating layer.",
    difference: "Honest gap: pre-mainnet. The approaches above are live today; AgentsCorp targets Q1 2027.",
    status: "Pre-mainnet",
  },
];

export const LANDSCAPE_SOURCES: Source[] = [
  { label: "doola: agentic LLC formation", href: "https://www.accessnewswire.com/newsroom/en/business-and-professional-services/doola-launches-agentic-llc-formation-start-a-u.s.-company-in-min-1161917" },
  { label: "Naive: /llc", href: "https://usenaive.ai/blog/introducing-llc" },
  { label: "ClawBank / Manfred LLC", href: "https://techstartups.com/2026/05/01/ai-agent-forms-its-own-u-s-company-gets-ein-in-first-of-its-kind-breakthrough/" },
  { label: "OtoCo docs", href: "https://otoco.gitbook.io/otoco/c.-faqs/faqs-1/faqs" },
  { label: "Kali: Series LLCs", href: "https://kali.mirror.xyz/PjwUyaJsHZIvJ3RfSMghcw_FS1ohrrQuXmD9XI5GJtk" },
  { label: "Delaware AIC draft", href: "https://www.dandodiary.com/2026/07/articles/artificial-intelligence/brave-new-world-delawares-proposed-new-artificial-intelligence-company/" },
];
