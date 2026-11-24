/**
 * Per-route SEO metadata. Used at runtime (App TitleManager) and at build
 * time (scripts/prerender.tsx writes it into each route's static HTML).
 */
export const SITE_ORIGIN = "https://www.agentscorp.xyz";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  /** Pre-render to static HTML and list in the sitemap. */
  prerender: boolean;
  priority?: number;
  changefreq?: "weekly" | "monthly" | "yearly";
};

export const DEFAULT_TITLE = "AgentsCorp — Entity Structure & Treasury Rails for AI Agents";

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: DEFAULT_TITLE,
    description:
      "Give every AI agent its own Delaware Series LLC series, budget, and audit trail. AgentsCorp pairs 6 Del. C. § 18-215 structure with Arweave-anchored records and per-series treasury guardrails. Pre-mainnet; target Q1 2027.",
    prerender: true,
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/agent",
    title: "For Agents — /skill.md & SDK Integration | AgentsCorp",
    description:
      "Wire AI agents into entity and treasury workflows with the agent-readable /skill.md spec, an SDK preview, and Base Sepolia examples. Agents act within limits; humans approve what matters.",
    prerender: true,
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/planner",
    title: "AI Agent Entity Structure Planner — Series LLC Guide | AgentsCorp",
    description:
      "Plan a legal structure for your AI agents in 60 seconds: Delaware Series LLC or standard LLC, per-agent spend caps and approval thresholds, a liability blast-radius simulator, and the filings you still need.",
    prerender: true,
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/whitepaper",
    title: "Whitepaper — AgentsCorp Architecture & Protocol Overview",
    description:
      "AgentsCorp Architecture & Protocol Overview (v1.0): Delaware Series LLC structure for AI agents, Arweave document anchoring, treasury and policy controls, legal considerations, and the 2027 roadmap.",
    prerender: true,
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/docs",
    title: "Developer Docs — AgentsCorp",
    description:
      "Developer documentation for AgentsCorp: deployment state, SDK preview, planned contract interface, entity types, document manifest, verification, and gasless execution via Avocado.",
    prerender: true,
    priority: 0.8,
    changefreq: "weekly",
  },
  {
    path: "/setup",
    title: "Entity Setup Preview — AgentsCorp (Target Q1 2027)",
    description:
      "Entity setup is in development. Preview the planned Delaware Series LLC setup flow for AI agents and join the Q1 2027 design-partner cohort.",
    prerender: true,
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/legal",
    title: "Legal — Disclaimer & MIT License | AgentsCorp",
    description:
      "AgentsCorp disclaimer and MIT License. Software, specifications, and templates only; not legal, tax, or banking advice.",
    prerender: true,
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/admin",
    title: "Admin Dashboard — AgentsCorp",
    description: "Owner-only admin dashboard for AgentsCorp waitlist management.",
    prerender: false,
  },
];

export const metaFor = (path: string): RouteMeta =>
  ROUTES.find((r) => r.path === path) ?? { ...ROUTES[0], path };
