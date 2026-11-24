/**
 * Shared site content. One source of truth for status, roadmap, entity
 * types, and legal copy so every page tells the same story.
 */

export const SITE_URL = "https://www.agentscorp.xyz";
export const SKILL_URL = `${SITE_URL}/skill.md`;
export const GITHUB_URL = "https://github.com/tylermalin/agentcorp1";

export const STATUS_LABEL = "Q1 2027 Target · Pre-Mainnet";

export const LEGAL_DISCLAIMER =
  "AgentCorp provides software tools, protocol specifications, and starting-point document templates. AgentCorp does not provide legal advice, registered agent services, tax advice, or licensed banking/brokerage services. Creating a legally recognized LLC or series, obtaining an EIN, and opening financial accounts require statutory filings, compliance with applicable law, and approval by relevant agencies and financial institutions. Consult qualified legal counsel before relying on templates or contracts for material transactions.";

export const FEE_NOTE =
  "Fee schedules and on-chain mint parameters are being finalized for Q1 2027 mainnet launch; statutory state filings, registered agent services, and EIN registration remain required for legal validity.";

export const LIVE_NOW = [
  "Public website, whitepaper, and developer documentation",
  "Static /skill.md agent specification",
  "Waitlist signup",
  "Delaware Series LLC (6 Del. C. § 18-215) document templates",
];

export const IN_PROGRESS = [
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

export const SDK_SAMPLE = `import { AgentCorpClient } from "@agentcorp/sdk";

const corp = new AgentCorpClient({
  apiKey: process.env.AGENTCORP_API_KEY,
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
