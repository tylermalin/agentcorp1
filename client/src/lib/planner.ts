/**
 * Structure planner: questions and the pure recommend() function.
 * Selection mirrors /skill.md Step 2 so the site, docs, and agents agree.
 */

export type Answers = {
  kind: "agents" | "clients" | "assets" | "swarm";
  count: "1" | "2-5" | "6-20" | "20+";
  spend: "lt1k" | "1k-10k" | "10k-100k" | "gt100k";
  approver: "me" | "team" | "client" | "none";
  governance: "none" | "multisig" | "token";
  rails: "onchain" | "fiat" | "both";
};

export type Question<K extends keyof Answers = keyof Answers> = {
  id: K;
  title: string;
  help: string;
  options: { value: Answers[K]; label: string; detail?: string }[];
};

export const QUESTIONS: Question[] = [
  {
    id: "kind",
    title: "What are you structuring?",
    help: "Pick the closest match. You can change answers at any time.",
    options: [
      { value: "agents", label: "Individual AI agents", detail: "Each agent runs its own workload" },
      { value: "clients", label: "Client engagements", detail: "Agents working for different customers" },
      { value: "assets", label: "Assets or programs", detail: "RWA batches, carbon programs, IP pools" },
      { value: "swarm", label: "A multi-agent swarm", detail: "Several agents sharing one mandate" },
    ],
  },
  {
    id: "count",
    title: "How many separate workloads in the next 12 months?",
    help: "Each one that should not share liability or budget with the others.",
    options: [
      { value: "1", label: "Just one" },
      { value: "2-5", label: "2 to 5" },
      { value: "6-20", label: "6 to 20" },
      { value: "20+", label: "More than 20" },
    ],
  },
  {
    id: "spend",
    title: "Typical monthly spend per workload?",
    help: "API costs, vendor payments, payouts. Used to suggest starting guardrails.",
    options: [
      { value: "lt1k", label: "Under $1,000" },
      { value: "1k-10k", label: "$1,000 to $10,000" },
      { value: "10k-100k", label: "$10,000 to $100,000" },
      { value: "gt100k", label: "Over $100,000" },
    ],
  },
  {
    id: "approver",
    title: "Who signs off on high value actions?",
    help: "Agents can't be members or managers, so a person or company always holds final authority.",
    options: [
      { value: "me", label: "Just me" },
      { value: "team", label: "A small team" },
      { value: "client", label: "The client or a board" },
      { value: "none", label: "Not decided yet" },
    ],
  },
  {
    id: "governance",
    title: "How are decisions governed?",
    help: "Open, token-based governance points to a different structure.",
    options: [
      { value: "none", label: "Operators decide", detail: "Fixed, known owners" },
      { value: "multisig", label: "A multisig", detail: "Known signers, threshold approval" },
      { value: "token", label: "Token voting", detail: "Open or pseudonymous members" },
    ],
  },
  {
    id: "rails",
    title: "Where will money move?",
    help: "Banks set their own rules for accounts; on-chain treasury is policy controlled.",
    options: [
      { value: "onchain", label: "On-chain (USDC)" },
      { value: "fiat", label: "Bank accounts" },
      { value: "both", label: "Both" },
    ],
  },
];

export const DEFAULT_ANSWERS: Answers = {
  kind: "agents",
  count: "2-5",
  spend: "1k-10k",
  approver: "me",
  governance: "none",
  rails: "both",
};

export type StructureCode = "DE-SERIES-LLC" | "DE-LLC" | "DE-DAO-LLC";

export type Plan = {
  code: StructureCode;
  name: string;
  status: string;
  why: string;
  seriesCount: number; // 0 when no series
  seriesLabel: string;
  guardrails: { dailyCapUsd: number; approvalAboveUsd: number; signers: string };
  youDo: string[];
  weAutomate: string[];
  cautions: string[];
};

const SERIES_COUNT: Record<Answers["count"], number> = { "1": 1, "2-5": 4, "6-20": 12, "20+": 24 };
const MONTHLY: Record<Answers["spend"], number> = { lt1k: 800, "1k-10k": 6000, "10k-100k": 50000, gt100k: 150000 };
const LABEL: Record<Answers["kind"], string> = {
  agents: "Agent",
  clients: "Client",
  assets: "Program",
  swarm: "Workstream",
};

/** Round to a "nice" number: 1, 2, 2.5, 5 × 10^n. */
export function nice(n: number): number {
  if (n <= 0) return 0;
  const p = Math.pow(10, Math.floor(Math.log10(n)));
  const m = n / p;
  const step = m < 1.5 ? 1 : m < 2.25 ? 2 : m < 3.75 ? 2.5 : m < 7.5 ? 5 : 10;
  return step * p;
}

export function recommend(a: Answers): Plan {
  const many = a.count !== "1";
  let code: StructureCode;
  let why: string;

  // Same order as /skill.md Step 2: governance first, then multiplicity.
  if (a.governance === "token") {
    code = "DE-DAO-LLC";
    why =
      "Token voting with an open or pseudonymous member set needs a governance-linked charter rather than an operator-run LLC.";
  } else if (many || a.kind === "clients" || a.kind === "assets") {
    code = "DE-SERIES-LLC";
    why = many
      ? `You expect ${a.count === "20+" ? "more than 20" : a.count.replace("-", " to ")} separate workloads. One parent Delaware Series LLC with a series for each keeps their assets, budgets, and liabilities apart without forming a new company every time.`
      : "Even with one workload today, client engagements and asset programs tend to multiply. A Series LLC parent lets you add isolated series later without a new formation.";
  } else {
    code = "DE-LLC";
    why = "One workload with a fixed, known owner and no on-chain governance fits a standard single-entity Delaware LLC.";
  }

  const seriesCount = code === "DE-SERIES-LLC" ? SERIES_COUNT[a.count] : 0;
  const daily = nice(MONTHLY[a.spend] / 30);
  const approval = nice(daily * 0.2);
  const signers =
    a.governance === "multisig" || a.approver === "team"
      ? "2 of 3 human signers"
      : a.approver === "client"
        ? "Client or board signer + operator"
        : a.approver === "none"
          ? "Designate at least one human signer"
          : "You + agent key (agent proposes, you approve)";

  const names: Record<StructureCode, [string, string]> = {
    "DE-SERIES-LLC": ["Delaware Series LLC + protected series", "In development · Q1 2027"],
    "DE-LLC": ["Standard Delaware LLC", "In development · Q1 2027"],
    "DE-DAO-LLC": ["DAO Operating Charter (Delaware)", "Planned · 2027"],
  };

  const youDo = [
    code === "DE-SERIES-LLC"
      ? "File a Delaware Certificate of Formation that gives notice of the limitation on liabilities of series (6 Del. C. § 18-215(b))"
      : "File a Delaware Certificate of Formation",
    "Appoint and maintain a Delaware registered agent",
    "Obtain an IRS EIN" + (code === "DE-SERIES-LLC" && a.rails !== "onchain" ? " (and per series if banks require it)" : ""),
    "Name the human manager(s) or member(s) who hold authority; agents act under a written mandate",
  ];
  if (a.rails !== "onchain") youDo.push("Open bank accounts subject to each bank's KYB and risk review");
  youDo.push("Have counsel review the operating agreement before material transactions");

  const weAutomate = [
    code === "DE-SERIES-LLC"
      ? "Operating agreement and series designation templates, versioned per series"
      : "Operating agreement template, versioned",
    "Document hashing and Arweave anchoring linked to the entity record",
    "Per-" + (code === "DE-SERIES-LLC" ? "series" : "entity") + " treasury policy: spend caps, approval thresholds, co-signers",
    "Filing, registered agent, and EIN status tracking alongside the on-chain record",
    "Agent-readable /skill.md so agents know their limits and when to stop",
  ];

  const cautions: string[] = [];
  if (code === "DE-SERIES-LLC")
    cautions.push(
      "Series isolation holds only if records and accounting are kept separately for each series. Commingling funds can undo it.",
    );
  if (a.rails !== "onchain" && code === "DE-SERIES-LLC")
    cautions.push("Many banks do not open accounts for individual series; expect separate EINs or a parent account with sub-ledgers.");
  if (a.approver === "none")
    cautions.push("Every series needs a designated human signer before agents can move money above the threshold.");
  if (code === "DE-DAO-LLC")
    cautions.push("DAO charters are planned for 2027. Token-governed structures raise securities questions; get counsel early.");
  if (a.spend === "gt100k") cautions.push("At this spend level, plan for formal audits and counsel review of each series agreement.");

  return {
    code,
    name: names[code][0],
    status: names[code][1],
    why,
    seriesCount,
    seriesLabel: LABEL[a.kind],
    guardrails: { dailyCapUsd: daily, approvalAboveUsd: approval, signers },
    youDo,
    weAutomate,
    cautions,
  };
}

const KEYS = Object.keys(DEFAULT_ANSWERS) as (keyof Answers)[];

/** Serialize to a short query string for shareable plan links. */
export function encodeAnswers(a: Answers): string {
  return new URLSearchParams(KEYS.map((k) => [k, a[k]])).toString();
}

export function decodeAnswers(search: string): Answers | null {
  const p = new URLSearchParams(search);
  if (!KEYS.every((k) => p.has(k))) return null;
  const out = { ...DEFAULT_ANSWERS };
  for (const q of QUESTIONS) {
    const v = p.get(q.id);
    if (q.options.some((o) => o.value === v)) (out as Record<string, string>)[q.id] = v!;
  }
  return out;
}

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function planMarkdown(a: Answers, plan: Plan, url: string): string {
  const lines = [
    `# AgentsCorp structure plan`,
    ``,
    `**Recommended:** ${plan.name} (${plan.code}) · ${plan.status}`,
    plan.seriesCount ? `**Series:** about ${plan.seriesCount} (${plan.seriesLabel} 1 … ${plan.seriesLabel} ${plan.seriesCount})` : "",
    ``,
    plan.why,
    ``,
    `## Starting guardrails per ${plan.seriesCount ? "series" : "entity"}`,
    `- Daily spend cap: ${usd(plan.guardrails.dailyCapUsd)}`,
    `- Human approval above: ${usd(plan.guardrails.approvalAboveUsd)}`,
    `- Signers: ${plan.guardrails.signers}`,
    ``,
    `## You still do (real-world filings)`,
    ...plan.youDo.map((x) => `- [ ] ${x}`),
    ``,
    `## AgentsCorp plans to automate`,
    ...plan.weAutomate.map((x) => `- ${x}`),
    ``,
    ...(plan.cautions.length ? [`## Watch for`, ...plan.cautions.map((x) => `- ${x}`), ``] : []),
    `Plan link: ${url}`,
    ``,
    `_Illustrative planning output, not legal advice. AgentsCorp is pre-mainnet (target Q1 2027)._`,
  ];
  return lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n");
}
