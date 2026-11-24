/**
 * AGENTCORP FOOTER: brand statement + newsletter, numbered link columns,
 * statutory disclaimer, oversized wordmark.
 */
import { Link } from "wouter";
import { GITHUB_URL, LEGAL_DISCLAIMER } from "@/lib/site";
import WaitlistForm from "@/components/WaitlistForm";
import { Mark } from "@/components/Nav";

const linkCls = "text-[#a3a3a3] transition-colors duration-300 hover:text-white";

export default function Footer() {
  return (
    <footer className="px-3 pb-3">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] px-6 pt-14 sm:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Mark className="h-8 w-8 text-white" />
            <p className="mt-6 max-w-sm text-2xl font-medium tracking-tight text-white text-balance">
              Filed. Signed. Verifiable. Structure for the agent economy.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:col-span-4">
            <div>
              <div className="font-mono-index text-[11px] uppercase text-[#6ee7b7]">1.0 Product</div>
              <ul className="mt-4 space-y-2.5">
                <li><a href="/#protocol" className={linkCls}>Protocol</a></li>
                <li><a href="/#use-cases" className={linkCls}>Use cases</a></li>
                <li><a href="/#entities" className={linkCls}>Entities</a></li>
                <li><Link href="/agent" className={linkCls}>For agents</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-mono-index text-[11px] uppercase text-[#6ee7b7]">2.0 Build</div>
              <ul className="mt-4 space-y-2.5">
                <li><Link href="/whitepaper" className={linkCls}>Whitepaper</Link></li>
                <li><Link href="/docs" className={linkCls}>Docs</Link></li>
                <li><a href="/skill.md" className={linkCls}>/skill.md</a></li>
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-mono-index text-[11px] uppercase text-[#6ee7b7]">3.0 Legal</div>
              <ul className="mt-4 space-y-2.5">
                <li><a href="#disclaimer" className={linkCls}>Disclaimer</a></li>
                <li>
                  <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="md:col-span-3">
            <div className="font-mono-index text-[11px] uppercase text-[#6ee7b7]">Launch updates</div>
            <p className="mt-4 text-sm text-[#a3a3a3]">
              Testnet access, design-partner invitations, and the Q1 2027 mainnet date.
            </p>
            <WaitlistForm entityType="Newsletter" source="footer" className="[&>div]:flex-col sm:[&>div]:flex-col" />
          </div>
        </div>

        <p id="disclaimer" className="mt-14 border-t border-white/10 pt-6 text-xs leading-5 text-[#737373]">
          <span className="text-[#a3a3a3]">Disclaimer.</span> {LEGAL_DISCLAIMER}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-[#737373]">
          <span>© 2026 AgentCorp · agentscorp.xyz</span>
          <span className="font-mono-index uppercase">Pre-mainnet · target Q1 2027</span>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-8 -mb-[0.18em] select-none text-center text-[19vw] font-semibold leading-none tracking-tighter text-white/[0.04] md:text-[11.5rem]"
        >
          AGENTCORP
        </div>
      </div>
    </footer>
  );
}
