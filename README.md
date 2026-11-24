<p align="center">
  <img src="client/public/brand/agentscorp-lockup-black.png#gh-light-mode-only" alt="AgentsCorp" width="360" />
  <img src="client/public/brand/agentscorp-lockup-white.png#gh-dark-mode-only" alt="AgentsCorp" width="360" />
</p>

<p align="center">
  <strong>Entity structure and treasury rails for AI agents.</strong><br />
  <a href="https://www.agentscorp.xyz">agentscorp.xyz</a> ·
  <a href="https://www.agentscorp.xyz/whitepaper">Whitepaper</a> ·
  <a href="https://www.agentscorp.xyz/docs">Docs</a> ·
  <a href="https://www.agentscorp.xyz/skill.md">/skill.md</a>
</p>

---

AgentsCorp helps agent platforms, operators, and enterprises structure Delaware Series LLCs (6 Del. C. § 18-215), anchor governing documents on Arweave, and connect on-chain and banking treasury controls with per-series liability isolation.

On-chain records (ERC-721 tokens on Base) link each entity or series to its governing documents, treasury, and amendment history. They do not replace statutory formation: a Delaware Certificate of Formation, a registered agent, an IRS EIN, and authorized signatories are still required, and banking depends on each institution's own rules.

## Status

**Pre-mainnet. Target Q1 2027.**

| Live today | In development (target Q1 2027) |
|---|---|
| Website, whitepaper, developer docs | Base smart-contract audit and deployment |
| Static `/skill.md` agent specification | Automated EIN and banking/treasury integrations |
| Waitlist and design-partner signup | Design-partner onboarding |
| Delaware Series LLC document templates | |

This repository is the protocol **site**: marketing pages, whitepaper, developer documentation, the agent-readable specification, and signup. It is not the contracts. The documented contract interface describes what is being built, not what is deployed, and every address in the docs should be treated as unassigned. Fee figures are planned protocol parameters, subject to mainnet deployment.

## Why it exists

More and more work is done by software agents: they call paid APIs, settle with vendors, and act for clients. Running all of that through one company means one undifferentiated liability bucket, and the governing documents rarely have a verifiable link to the entity they govern.

Delaware's Series LLC statute offers a better primitive. Under 6 Del. C. § 18-215, one parent LLC can hold many series, each with its own assets, members, and liability isolation. AgentsCorp pairs that structure with standardized templates, Arweave-anchored records, and per-series treasury guardrails (spend caps, approval thresholds, human co-signers), so each agent or engagement gets its own ring-fenced, auditable container.

## Agent integration

The machine-readable specification lives at [`/skill.md`](https://www.agentscorp.xyz/skill.md), served as static text so a fetcher gets the file rather than a JavaScript shell.

It covers entity type selection, the document generation and Arweave upload sequence, the planned contract interface, gasless execution through Avocado, planned fees, and document verification. It leads with deployment status so an agent knows to stop rather than construct a transaction against a contract that does not exist. If you are wiring an agent to this protocol, start there.

## Stack

React 19 and Vite, wouter for routing, Tailwind 4 with shadcn/ui primitives, Phosphor icons, Geist type. Express and tRPC on the server, Drizzle over MySQL. Mailchimp for launch updates and a Youform embed for design-partner applications. Deployed on Vercel with the API as a serverless function.

## Running locally

Requires Node 20+ and pnpm.

```bash
pnpm install
cp .env.example .env    # fill in the values below
pnpm dev                # Express + Vite middleware on :3000 (or next free port)
```

```bash
pnpm check     # typecheck
pnpm test      # vitest
pnpm build     # client to dist/public, server bundle to dist/index.js
```

### Environment

| Variable | Purpose |
|---|---|
| `MAILCHIMP_API_KEY` | Waitlist subscriptions |
| `MAILCHIMP_AUDIENCE_ID` | Waitlist audience |
| `MAILCHIMP_DC` | Mailchimp data center, defaults to `us3` |
| `DATABASE_URL` | MySQL connection string |
| `JWT_SECRET` | Session cookie signing |
| `OAUTH_SERVER_URL` | OAuth provider for admin login |
| `VITE_APP_ID` | OAuth client id |
| `OWNER_OPEN_ID` | openId granted the admin role on first login |
| `BUILT_IN_FORGE_API_URL` | Owner notification service |
| `BUILT_IN_FORGE_API_KEY` | Owner notification auth |

Never commit these; `.env*` is gitignored.

## Layout

```
client/
  public/            Static files served as-is: skill.md, og-image, brand/
  src/pages/         Home, Agent, Whitepaper, Docs, Mint, Admin
  src/components/    Nav, Footer, forms; site/ (layout + motion), brand/ (logo)
  src/lib/site.ts    Shared copy: status, roadmap, entity types, disclaimer
server/              Express, tRPC routers, Drizzle access
  _core/             OAuth, sessions, env, notifications, Vite middleware
  vercel-entry.ts    Serverless entry (API only)
api/index.js         Bundle of server/vercel-entry.ts, built by Vercel
shared/              Types and constants used by both sides
drizzle/             Schema and migrations
```

`server/_core/index.ts` is the long-lived server for development or a traditional host. `server/vercel-entry.ts` exposes the same routers without static serving or `listen()`.

## Deployment

Pushes to `main` deploy to production on Vercel. The client builds to `dist/public` and is served statically; `/api/*` rewrites to the serverless function; everything else falls through to `index.html` so client routes survive a refresh. Files with an extension (`skill.md`, `og-image.png`, `brand/*`) are served as real files. Configuration is in `vercel.json`; environment variables live in Vercel project settings.

```bash
curl -s https://www.agentscorp.xyz/api/health   # reports which env vars are present, never their values
```

## Brand assets

Logo files live in [`client/public/brand/`](client/public/brand) and are served at `https://www.agentscorp.xyz/brand/…`: square avatars (1024px), transparent marks and lockups (PNG), and vector marks (SVG). The mark is also a React component in `client/src/components/brand/Logo.tsx`.

## Contributing

Issues and pull requests are welcome, particularly on the documentation and the agent specification. For changes to the legal templates or the entity model, open an issue first so the discussion happens before the diff. Run `pnpm check`, `pnpm test`, and `pnpm build` before opening a PR.

## Disclaimer

AgentsCorp provides software tools, protocol specifications, and starting-point document templates. It does not provide legal advice, registered agent services, tax advice, or licensed banking or brokerage services. Forming a legally recognized LLC or series, obtaining an EIN, and opening financial accounts require statutory filings, compliance with applicable law, and approval by the relevant agencies and institutions. Consult qualified counsel before relying on templates or contracts for material transactions.

## License

[MIT](LICENSE)
