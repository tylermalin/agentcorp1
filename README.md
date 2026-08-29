# AgentCorp

On-chain legal infrastructure. Delaware Series LLCs, Series Designations, and DAO Charters minted as ERC-721 tokens on Base, with governing documents stored permanently on Arweave.

The core idea is that the NFT is the entity. Minting incorporates. Transferring assigns. Burning dissolves. Amending updates the operating agreement of record. Formation stops being a filing you wait on and becomes a transaction that settles.

Live at [www.agentscorp.xyz](https://www.agentscorp.xyz).

## Status

**Pre-deployment. The factory contract is not live on mainnet. Target is Q1 2027.**

This repository is the protocol site: the marketing pages, the whitepaper, the developer documentation, the agent-readable specification, and a waitlist. It is not the contracts. Nothing here will mint you an entity today, and the documented contract interface describes what is being built rather than what is deployed.

Treat every address in the docs as unassigned until this section says otherwise.

## Why it exists

Entity formation is a coordination problem wearing the costume of a paperwork problem. The filing itself is trivial. What is expensive is everything around it: the wait, the intermediary, the fact that the governing documents live in someone's inbox with no verifiable link to the entity they govern, and the fact that a software agent cannot hold a legal identity at all.

That last one matters more each quarter. Agents are increasingly the thing transacting, and the legal system has no primitive for an actor that is not a person and not a company someone remembered to form. AgentCorp is an attempt at that primitive: an entity a wallet can hold, a treasury it can control, and documents anyone can verify against the chain.

Delaware's Series LLC statute is what makes it work. Under 6 Del. C. § 18-215, one parent LLC can hold unlimited Series, each with its own assets, members, and liability isolation. One formation, then per-project entities at marginal cost.

## Agent integration

The machine-readable specification lives at [`/skill.md`](https://www.agentscorp.xyz/skill.md), served as static text so a fetcher gets the file rather than a JavaScript shell.

It covers entity type selection rules, the document generation and Arweave upload sequence, the contract interface, gasless execution through Avocado, the fee schedule, and document verification. It leads with the deployment status so an agent reading it knows to stop rather than construct a transaction against a contract that does not exist.

If you are wiring an agent to this protocol, start there rather than here.

## Stack

React 19 and Vite on the client, wouter for routing, Tailwind 4 with shadcn/ui components. Express and tRPC on the server, Drizzle over MySQL, Mailchimp for the waitlist. Deployed on Vercel with the API running as a serverless function.

## Running locally

Requires Node 20 or later and pnpm.

```bash
pnpm install
cp .env.example .env    # then fill in the values below
pnpm dev
```

The dev server runs Express with Vite in middleware mode on port 3000, or the next free port above it.

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

Never commit these. `.env` is gitignored.

## Layout

```
client/          React SPA
  public/        Static files served as-is, including skill.md
  src/pages/     Home, Whitepaper, Docs, Mint, Agent, Admin
server/          Express, tRPC routers, Drizzle schema
  _core/         OAuth, session handling, Vite middleware
api/index.ts     Vercel serverless entry, API surface only
shared/          Types and constants used by both sides
drizzle/         Schema and migrations
```

`server/_core/index.ts` is the long-lived server used in development and on a traditional host. `api/index.ts` is the same API without static serving or `listen()`, for Vercel. Both import the same routers, so the logic lives in one place.

## Deployment

Vercel builds the client to `dist/public` and serves it statically. `/api/*` rewrites to the serverless function. Everything else falls through to `index.html` so client routes survive a direct load or refresh. Paths with a file extension pass through untouched, which is what keeps `skill.md` and `og-image.png` serving as real files.

Configuration is in `vercel.json`. Environment variables are set in project settings, not in the repo.

To check a deployment:

```bash
curl -s https://www.agentscorp.xyz/api/health
```

That reports which environment variables are present as booleans. It never returns their values.

## Contributing

Issues and pull requests are welcome, particularly on the documentation and the agent specification. If you are proposing changes to the legal templates or the entity model, open an issue first so the discussion happens before the diff.

Run `pnpm check` and `pnpm build` before opening a PR.

## Disclaimer

AgentCorp is infrastructure, not legal advice. The document templates are starting points. Consult qualified counsel before relying on any of this for a material transaction, and do not treat anything in this repository as an opinion on tax treatment or securities characterization.

## License

MIT.
