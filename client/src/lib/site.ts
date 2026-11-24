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
    "Early. Planned per-entity and per-series protocol fees (see whitepaper §11); pricing is being set with design partners.",
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
