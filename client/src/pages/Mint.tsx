/**
 * /mint — Entity setup preview / early access.
 * No live mint and no wallet transaction: explains the planned flow,
 * lists planned entity types, and collects waitlist signups.
 */
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import {
  Container,
  IndexedRows,
  MetaStrip,
  Note,
  PageHeader,
  Section,
  btnSecondary,
} from "@/components/site/Primitives";
import { ENTITY_ROWS, FEE_NOTE, LEGAL_DISCLAIMER, STATUS_LABEL } from "@/lib/site";

const STEPS = [
  {
    idx: "0.1",
    title: "Define Entity & Policy Scope",
    body: "Select a parent Delaware Series LLC or child series designation tied to an agent identity, mandate, spending threshold, and designated human or operator signers.",
  },
  {
    idx: "0.2",
    title: "Generate & Anchor Records",
    body: "Populate operating agreement and series designation templates, store versioned records on Arweave, and record document hashes alongside statutory filing and EIN tracking.",
  },
  {
    idx: "0.3",
    title: "Provision Treasury & Guardrails",
    body: "Connect multisig or smart-contract controls on Base (with USDC gas abstraction via Avocado) and banking/treasury rails so balances, permissions, and audit logs stay isolated per series.",
  },
];

export default function Mint() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa]">
      <Nav />
      <main id="main">
        <Container>
          <PageHeader
            index={`Entity setup · ${STATUS_LABEL}`}
            title="Entity setup is in development."
            lede="AgentCorp is building a guided flow to set up Delaware Series LLC records for agents and operators: governing documents, on-chain record anchors, and treasury guardrails in one place. Contracts are not yet deployed. Join early access to be notified when design-partner onboarding opens."
          >
            <div className="mt-10">
              <WaitlistForm entityType="DELAWARE_SERIES_LLC" source="mint-hero" variant="hero" />
              <p className="mt-3 text-xs text-[#737373]">
                Launch updates and design-partner invitations only. No transaction is requested.
              </p>
            </div>
          </PageHeader>

          <MetaStrip
            className="mb-20 md:mb-24"
            items={[
              { label: "Status", value: "Pre-mainnet" },
              { label: "Target", value: "Q1 2027" },
              { label: "Network", value: "Base (target)" },
              { label: "Records", value: "Arweave + IPFS" },
            ]}
          />

          <Section
            id="flow"
            index="01 / Planned flow"
            title="Three steps from mandate to treasury."
            intro="The intended setup sequence for an agent-operated series. Each step pairs on-chain records with the real-world filings and counterparties they depend on."
          >
            <IndexedRows rows={STEPS} />
            <Note className="mt-8">
              On-chain records and Arweave anchors link governing documents and verifiable state
              hashes to an entity. Statutory formation (a Delaware Certificate of Formation filed
              through a registered agent, an EIN, and authorized signatories) and banking depend on
              real-world filings and counterparties. A token can represent and track entity records;
              it does not itself create the entity.
            </Note>
          </Section>

          <Section
            id="entity-types"
            index="02 / Entity types"
            title="Planned structures."
            intro="Structures on the roadmap, in priority order. Availability depends on contract audit, mainnet deployment, and filing integrations."
          >
            <div className="overflow-x-auto border-y border-white/10">
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Structure", "Code", "Jurisdiction", "Primary use", "Status"].map((h) => (
                      <th
                        key={h}
                        className="font-mono-index py-3 pr-4 text-[11px] font-normal uppercase text-[#737373]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {ENTITY_ROWS.map((row) => (
                    <tr key={row.code}>
                      <td className="py-4 pr-4 text-sm font-medium text-[#fafafa]">{row.name}</td>
                      <td className="font-code py-4 pr-4 text-[#a3a3a3]">{row.code}</td>
                      <td className="py-4 pr-4 text-[#a3a3a3]">{row.jurisdiction}</td>
                      <td className="py-4 pr-4 text-[#a3a3a3]">{row.use}</td>
                      <td className="font-mono-index whitespace-nowrap py-4 pr-4 text-[11px] uppercase text-[#a3a3a3]">
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Note className="mt-6">{FEE_NOTE}</Note>
            <div className="mt-8">
              <Link href="/docs#entity-types" className={btnSecondary}>
                Entity type reference
              </Link>
            </div>
          </Section>

          <Section
            id="early-access"
            index="03 / Early access"
            title="Agents and operators."
            intro="Teams running agents on Claude, GPT, Eliza, LangChain, or custom frameworks can register an operator email for SDK preview access, Base Sepolia integration details, and launch notice."
          >
            <IndexedRows
              rows={[
                {
                  idx: "0.1",
                  title: "SDK preview",
                  body: "A TypeScript client for creating series records and treasury policies, targeting Base Sepolia during development.",
                },
                {
                  idx: "0.2",
                  title: "Gasless execution",
                  body: "Agent transactions routed through Avocado with gas paid in USDC, so agents do not need to hold ETH.",
                },
                {
                  idx: "0.3",
                  title: "Human signers stay in the loop",
                  body: "Spending thresholds and designated operator signers are part of each series policy, not an afterthought.",
                },
              ]}
            />
            <div className="mt-10">
              <WaitlistForm entityType="AGENT_SDK" source="mint-agent-signup" variant="hero" />
            </div>
          </Section>

          <section className="border-t border-white/10 py-16">
            <Note className="max-w-3xl">{LEGAL_DISCLAIMER}</Note>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
