/**
 * AGENTSCORP HOME
 * Hero (halftone field) → agent stack marquee → framework numerals →
 * pillars → manifesto → use cases (interactive) → integration (simulated
 * run) → entities → access.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import YouformEmbed from "@/components/YouformEmbed";
import { CodeFrame, Container, IndexLabel, btnPrimary, btnSecondary } from "@/components/site/Primitives";
import { DotIcon, HalftoneField, Reveal, useInView, type DotIconKind } from "@/components/site/Motion";
import { COMPANY, ENTITY_ROWS, FAQ, FEE_NOTE, IN_PROGRESS, LIVE_NOW, SDK_SAMPLE } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const STACK = ["Claude", "GPT", "LangChain", "CrewAI", "Eliza", "Manus", "viem", "Safe", "Base", "Arweave", "Avocado"];

const NUMERALS = [
  { value: "§ 18-215", label: "Delaware statute for protected series with separate liability" },
  { value: "1 : N", label: "One parent LLC, a series for every agent, client, or asset" },
  { value: "4", label: "Layers: documents, treasury policy, entity contracts, gas" },
];

const PILLARS: { kind: DotIconKind; title: string; body: string }[] = [
  {
    kind: "series",
    title: "Series isolation",
    body: "Each agent or engagement gets its own series, so a dispute in one stays in one.",
  },
  {
    kind: "anchor",
    title: "Anchored records",
    body: "Operating agreements versioned on Arweave, hashed, and tied to filing and EIN status.",
  },
  {
    kind: "vault",
    title: "Treasury guardrails",
    body: "Daily caps, approval thresholds, and human co-signers enforced per series.",
  },
  {
    kind: "spec",
    title: "Agent readable spec",
    body: "One /skill.md file tells any tool calling agent what it can do, and when to stop.",
  },
];

type UseCase = {
  title: string;
  body: string;
  card: { series: string; cap: string; used: number; approval: string; signers: string };
};

const USE_CASES: UseCase[] = [
  {
    title: "Per agent isolation",
    body: "Assign separate series designations and budget caps to distinct agents or client engagements so an error or dispute in one series stays contained.",
    card: { series: "Series 14 · SwarmOps task runner", cap: "$2,500 / day", used: 62, approval: "Above $500", signers: "2 of 3" },
  },
  {
    title: "Treasury and accounting separation",
    body: "Keep API spend, vendor settlements, and client funds segregated across series with clear audit records.",
    card: { series: "Series 03 · Client: Northwind", cap: "$18,000 / month", used: 41, approval: "Above $2,000", signers: "2 of 2" },
  },
  {
    title: "Human and policy guardrails",
    body: "Combine programmatic smart contract and banking limits with human sign off thresholds for high value actions.",
    card: { series: "Series 07 · Procurement agent", cap: "$1,200 / day", used: 88, approval: "Above $250", signers: "1 human + 1 agent" },
  },
  {
    title: "Multi agent treasury coordination",
    body: "Structure shared operating rules, signing thresholds, and spending limits across agent keys and designated human operators.",
    card: { series: "Series 21 · Research swarm", cap: "$6,400 / week", used: 27, approval: "Above $1,000", signers: "3 of 5" },
  },
  {
    title: "Project and asset ring fencing",
    body: "Isolate individual RWA batches, carbon and environmental programs, or commercial initiatives inside separate series under a parent Delaware LLC.",
    card: { series: "Series 09 · Carbon batch 2027-A", cap: "$40,000 / quarter", used: 15, approval: "All transfers", signers: "2 of 3" },
  },
  {
    title: "IP and licensing records",
    body: "Anchor licensing terms and governing agreements to Arweave and route payouts to designated treasuries.",
    card: { series: "Series 11 · Model license pool", cap: "$9,000 / month", used: 53, approval: "Above $1,500", signers: "2 of 2" },
  },
];

const RUN_STEPS = [
  "Read agentscorp.xyz/skill.md",
  "Validate series config against policy",
  "Hash governing documents (sha256)",
  "Anchor manifest to Arweave",
  "Await human co-signer (above $500)",
];

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="pt-3">
      <div className="relative min-h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] md:min-h-[680px]">
        <HalftoneField className="absolute inset-x-0 top-0 h-64 [mask-image:linear-gradient(#000_55%,transparent)] md:inset-0 md:h-full md:[mask-image:none]" />
        <div className="relative flex min-h-[600px] flex-col justify-between px-6 pt-52 pb-10 sm:px-10 md:min-h-[680px] md:px-14 md:pt-20 md:pb-14">
          <div>
            <div className="font-mono-index inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/50 px-2.5 py-1.5 text-[11px] uppercase text-[#a3a3a3] backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6ee7b7] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
              </span>
              Pre-mainnet · target Q1 2027
            </div>
            <h1 className="text-hero-gradient mt-8 max-w-[680px] text-5xl font-medium uppercase tracking-tight text-balance sm:text-6xl md:text-7xl">
              Give every AI agent its own LLC series
            </h1>
          </div>

          <div className="mt-16 max-w-[520px]">
            <p className="text-base text-pretty text-[#d4d4d4] md:text-lg">
              A budget, an audit trail, and liability that stops at the series. Delaware Series LLCs under{" "}
              <span className="text-white">6 Del. C. § 18-215</span>, records anchored on Arweave, and treasury
              guardrails per agent.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#access" className={btnPrimary}>
                Get early access
                <ArrowUpRight weight="bold" className="h-4 w-4" />
              </a>
              <a href="/skill.md" target="_blank" rel="noreferrer" className={btnSecondary}>
                Read /skill.md
              </a>
            </div>
            <p className="font-code mt-8 truncate text-xs text-[#737373]">
              $ agentscorp init --type=delaware-series-llc --agent=0x4a9f…
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackMarquee() {
  const row = [...STACK, ...STACK];
  return (
    <section aria-label="Compatible agent stack" className="py-14">
      <p className="text-center text-sm text-[#737373]">Built for the agent stack you already run</p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="animate-marquee flex w-max gap-14 pr-14">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= STACK.length}
              className="text-2xl font-semibold tracking-tight whitespace-nowrap text-[#737373]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Framework() {
  return (
    <section id="protocol" className="py-20 md:py-24">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-6">
          <IndexLabel>01 / Protocol</IndexLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance md:text-4xl">
            The legal and treasury layer behind agent work
          </h2>
        </Reveal>
        <Reveal delay={100} className="md:col-span-5 md:col-start-8">
          <p className="text-base text-pretty text-[#a3a3a3]">
            Standardized templates and document anchoring paired with smart contract and treasury controls, so agent
            workloads never share one undifferentiated liability bucket.
          </p>
          <Link href="/whitepaper" className={cn(btnSecondary, "mt-6")}>
            Read the whitepaper
            <ArrowUpRight weight="bold" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 md:grid-cols-3">
        {NUMERALS.map((n, i) => (
          <Reveal
            key={n.value}
            delay={i * 100}
            className={cn("bg-[#0b0b0b] p-8 md:p-10", i > 0 && "border-t border-white/10 md:border-t-0 md:border-l")}
          >
            <div className="text-6xl font-medium tracking-tighter whitespace-nowrap text-white md:text-7xl">{n.value}</div>
            <p className="mt-10 flex items-start gap-2 text-sm text-[#a3a3a3]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6ee7b7]" />
              {n.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Pillars() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 360), behavior: "smooth" });
  };
  return (
    <section className="py-20 md:py-24">
      <div className="flex items-end justify-between gap-6">
        <Reveal>
          <IndexLabel>Our pillars</IndexLabel>
          <h2 className="mt-4 max-w-md text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Built to contain, record, and control
          </h2>
        </Reveal>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Previous pillar" : "Next pillar"}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition duration-300 ${EASE} hover:border-[#6ee7b7] hover:text-[#6ee7b7] active:scale-95`}
            >
              {d < 0 ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {PILLARS.map((p, i) => (
          <Reveal
            as="article"
            key={p.title}
            delay={i * 80}
            className={`group flex w-[78%] shrink-0 snap-start flex-col rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 transition-colors duration-300 ${EASE} hover:border-[#6ee7b7]/40 sm:w-[46%] lg:w-[calc(25%-12px)]`}
          >
            <span className="font-mono-index text-xs text-[#737373]">[0{i + 1}]</span>
            <div className={`mx-auto my-10 w-36 text-[#525252] transition-colors duration-500 ${EASE} group-hover:text-[#6ee7b7]`}>
              <DotIcon kind={p.kind} />
            </div>
            <h3 className="mt-auto text-lg font-medium text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-[#a3a3a3]">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  const [ref, visible] = useInView<HTMLHeadingElement>(0.3);
  const words =
    "We are not wrapping agents in legal fiction. We are giving them the structure real companies use: filed, signed, and verifiable.".split(
      " ",
    );
  return (
    <section className="relative py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[
          "left-[4%] top-[48%] h-32 w-32",
          "left-[18%] top-[60%] h-24 w-40",
          "right-[22%] top-[38%] h-40 w-24",
          "right-[6%] top-[62%] h-28 w-28",
          "left-[40%] top-[72%] h-20 w-32",
        ].map((c) => (
          <div key={c} className={cn("absolute rounded-sm bg-white/[0.025]", c)} />
        ))}
      </div>
      <h2 ref={ref} className="relative max-w-4xl text-3xl font-medium tracking-tight md:text-5xl md:leading-[1.1]">
        {words.map((w, i) => (
          <span
            key={i}
            className={cn(`transition-colors duration-700 ${EASE}`, visible ? "text-white" : "text-[#333333]")}
            style={{ transitionDelay: visible ? `${i * 45}ms` : "0ms" }}
          >
            {w}{" "}
          </span>
        ))}
      </h2>
      <Reveal delay={200} className="relative mt-16 grid gap-6 text-sm text-[#a3a3a3] md:ml-auto md:w-1/2">
        <p>
          At <span className="text-[#6ee7b7]">AgentsCorp</span>, we think agent infrastructure has to hold up in front of
          a banker, an auditor, and a court, not just in a demo.
        </p>
        <p>
          On-chain records and Arweave anchors link each entity to its governing documents and verifiable state. Legal
          formation still runs through a Delaware Certificate of Formation, a registered agent, an EIN, and authorized
          human signatories. We make those pieces programmable, not optional.
        </p>
      </Reveal>
    </section>
  );
}

function UseCases() {
  const [active, setActive] = useState(0);
  const uc = USE_CASES[active];
  return (
    <section id="use-cases" className="py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <IndexLabel>02 / Use cases</IndexLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance md:text-4xl">
              Ring fence every agent, budget, and engagement
            </h2>
          </Reveal>

          {/* Floating policy card that follows the selected use case */}
          <Reveal delay={150} className="mt-10 md:sticky md:top-28">
            <div
              key={active}
              className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-white/10 bg-[#181818] p-5 shadow-[0_24px_60px_-20px_rgba(110,231,183,0.18)] duration-500"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-sm font-medium text-white">{uc.card.series}</span>
                <span className="font-mono-index shrink-0 rounded bg-[#6ee7b7]/10 px-1.5 py-0.5 text-[10px] uppercase text-[#6ee7b7]">
                  Active
                </span>
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-xs text-[#a3a3a3]">
                  <span>Spend cap</span>
                  <span className="font-mono-index text-white">{uc.card.cap}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-[#6ee7b7] transition-[width] duration-700 ${EASE}`}
                    style={{ width: `${uc.card.used}%` }}
                  />
                </div>
                <div className="font-mono-index mt-1.5 text-right text-[10px] text-[#737373]">{uc.card.used}% used</div>
              </div>
              <dl className="mt-4 divide-y divide-white/10 border-t border-white/10 text-xs">
                {[
                  ["Human approval", uc.card.approval],
                  ["Signers", uc.card.signers],
                  ["Records", "Anchored · Arweave"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5">
                    <dt className="text-[#737373]">{k}</dt>
                    <dd className="text-[#e5e5e5]">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[11px] text-[#737373]">Illustrative configuration</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="md:col-span-6 md:col-start-7">
          <ul className="border-t border-white/10">
            {USE_CASES.map((u, i) => {
              const on = i === active;
              return (
                <li key={u.title} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group flex w-full items-start gap-4 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-mono-index mt-1 text-xs transition-colors duration-300",
                        on ? "text-[#6ee7b7]" : "text-[#737373] group-hover:text-[#a3a3a3]",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block text-lg transition-colors duration-300",
                          on ? "text-white" : "text-[#a3a3a3] group-hover:text-white",
                        )}
                      >
                        {u.title}
                      </span>
                      <span
                        className={cn(
                          `grid transition-[grid-template-rows,opacity] duration-500 ${EASE}`,
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2 text-sm text-pretty text-[#a3a3a3]">{u.body}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function SimulatedRun() {
  const [ref, visible] = useInView<HTMLDivElement>(0.4);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(RUN_STEPS.length - 1);
      return;
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % (RUN_STEPS.length + 2)), 1100);
    return () => window.clearInterval(id);
  }, [visible]);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-[#181818] p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">Agent run</span>
        <span className="font-mono-index text-[10px] uppercase text-[#737373]">Simulated · Base Sepolia</span>
      </div>
      <ol className="mt-4 space-y-3">
        {RUN_STEPS.map((s, i) => {
          const last = i === RUN_STEPS.length - 1;
          const done = step > i && !last;
          const current = step === i || (last && step >= i);
          return (
            <li
              key={s}
              className={cn("flex items-center gap-3 text-sm transition-opacity duration-300", step >= i ? "opacity-100" : "opacity-30")}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  done ? "border-[#6ee7b7] bg-[#6ee7b7] text-black" : "border-white/20",
                )}
              >
                {done ? (
                  <Check weight="bold" className="h-3 w-3" />
                ) : current ? (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6ee7b7]" />
                ) : null}
              </span>
              <span className={done ? "text-[#a3a3a3]" : "text-white"}>{s}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-[#737373]">
        High value actions stop for a designated human signer.
      </p>
    </div>
  );
}

function Integration() {
  return (
    <section id="integration" className="py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <IndexLabel>03 / Integration</IndexLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance md:text-4xl">
            One skill file. Clear boundaries.
          </h2>
          <p className="mt-4 text-base text-pretty text-[#a3a3a3]">
            Point any tool calling agent at <code className="font-code text-sm text-white">/skill.md</code>, or use the
            TypeScript SDK, to configure series and enforce budget caps inside defined policy.
          </p>
          <div className="mt-8">
            <SimulatedRun />
          </div>
        </Reveal>
        <Reveal delay={120} className="min-w-0 md:col-span-7">
          <CodeFrame title="agentscorp_series.ts" meta="SDK preview" code={SDK_SAMPLE} />
          <p className="mt-3 text-xs text-[#737373]">
            Preview of the planned interface. <code className="font-code">@agentscorp/sdk</code> is not yet published;
            API keys go to design partners.
          </p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              ["Agent spec", "agentscorp.xyz/skill.md"],
              ["Gas abstraction", "USDC via Avocado, when contracts are active"],
              ["Document layer", "Arweave, hashed and versioned"],
              ["Network", "Base Sepolia now · Base 8453 target"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#0b0b0b] p-5">
                <dt className="font-mono-index text-[11px] uppercase text-[#737373]">{k}</dt>
                <dd className="mt-1.5 text-sm text-[#e5e5e5]">{v}</dd>
              </div>
            ))}
          </dl>
          <Link href="/agent" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6ee7b7] hover:text-[#a7f3d0]">
            See the agent integration guide
            <ArrowRight weight="bold" className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Entities() {
  return (
    <section id="entities" className="py-20 md:py-24">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <Reveal>
          <IndexLabel>04 / Entities</IndexLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">Planned structures</h2>
        </Reveal>
        <p className="max-w-sm text-sm text-[#a3a3a3]">
          Statutory filings, registered agents, and EINs remain required for legal formation.
        </p>
      </div>

      <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0b0b]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs text-[#737373]">
              <th className="px-5 py-4 font-normal">Entity type</th>
              <th className="px-5 py-4 font-normal">Code</th>
              <th className="px-5 py-4 font-normal">Jurisdiction</th>
              <th className="px-5 py-4 font-normal">Primary use</th>
              <th className="px-5 py-4 font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {ENTITY_ROWS.map((r) => {
              const dev = r.status.startsWith("In Development");
              return (
                <tr key={r.code} className="transition-colors duration-300 hover:bg-white/[0.03]">
                  <td className="px-5 py-4 font-medium text-white">{r.name}</td>
                  <td className="font-mono-index px-5 py-4 text-xs text-[#a3a3a3]">{r.code}</td>
                  <td className="px-5 py-4 text-[#a3a3a3]">{r.jurisdiction}</td>
                  <td className="px-5 py-4 text-[#a3a3a3]">{r.use}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "font-mono-index inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[11px]",
                        dev ? "bg-[#6ee7b7]/10 text-[#6ee7b7]" : "bg-white/5 text-[#a3a3a3]",
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", dev ? "bg-[#6ee7b7]" : "border border-[#737373]")} />
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Reveal>
      <p className="mt-6 max-w-3xl text-xs text-[#737373]">{FEE_NOTE}</p>
    </section>
  );
}

function Access() {
  return (
    <section id="access" className="pt-20 pb-24 md:pt-24 md:pb-32">
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]">
        <HalftoneField className="absolute inset-0 opacity-20 md:opacity-40" cell={9} />
        <div className="relative grid gap-10 p-6 sm:p-10 md:grid-cols-12 md:p-14">
          <div className="md:col-span-5">
            <IndexLabel>07 / Early access</IndexLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance md:text-5xl">
              Join the Q1 2027 design partner cohort
            </h2>
            <p className="mt-4 max-w-md text-base text-pretty text-[#a3a3a3]">
              We are onboarding agent platforms, infrastructure teams, and enterprises ahead of Base mainnet. Tell us
              what you are building and we will follow up.
            </p>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur">
                <div className="font-mono-index flex items-center gap-2 text-[11px] uppercase text-[#6ee7b7]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" /> Live today
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#e5e5e5]">
                  {LIVE_NOW.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check weight="bold" className="mt-1 h-3.5 w-3.5 shrink-0 text-[#6ee7b7]" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur">
                <div className="font-mono-index flex items-center gap-2 text-[11px] uppercase text-[#a3a3a3]">
                  <span className="h-1.5 w-1.5 rounded-full border border-[#a3a3a3]" /> In progress · Q1 2027
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#a3a3a3]">
                  {IN_PROGRESS.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="min-w-0 md:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#181818] p-2 shadow-[0_24px_60px_-20px_rgba(110,231,183,0.18)]">
              <YouformEmbed formId="5py2rz8y" className="min-h-[700px] overflow-hidden rounded-xl" />
            </div>
            <p className="mt-3 text-xs text-[#737373]">
              Form powered by Youform. Prefer email updates only? Use the signup in the footer.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Company() {
  return (
    <section id="company" className="py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <IndexLabel>05 / Company</IndexLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance md:text-4xl">Early, and honest about it</h2>
          <p className="mt-4 text-base text-pretty text-[#a3a3a3]">
            AgentsCorp is a solo-founder project built by a legal engineer and attorney. No revenue yet, no deployed
            mainnet contracts yet. The roadmap is public and every claim on this site is scoped to what exists today.
          </p>
        </Reveal>
        <Reveal delay={100} className="md:col-span-7">
          <article className="rounded-2xl border border-white/10 bg-[#181818] p-6">
            <div className="font-mono-index text-[11px] uppercase text-[#737373]">Founder</div>
            <h3 className="mt-2 text-xl font-medium text-white">{COMPANY.founder}</h3>
            <p className="mt-2 text-sm text-pretty text-[#d4d4d4]">{COMPANY.founderBio}</p>
            <div className="mt-4 flex gap-4 text-sm">
              {COMPANY.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-1 font-semibold text-[#6ee7b7] hover:text-[#a7f3d0]"
                >
                  {l.label}
                  <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </article>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ["Stage", COMPANY.stage],
              ["Business model", COMPANY.model],
              ["Mainnet target", "Q1 2027, after contract audit"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#0b0b0b] p-6">
                <dt className="font-mono-index text-[11px] uppercase text-[#737373]">{k}</dt>
                <dd className="mt-2 text-sm text-pretty text-[#e5e5e5]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-[#a3a3a3]">
            Investors, counsel, and agent platforms: message Tyler on{" "}
            <a href="https://x.com/tylermalin" target="_blank" rel="noopener noreferrer" className="text-[#6ee7b7] hover:text-[#a7f3d0]">
              X
            </a>{" "}
            or{" "}
            <a href="https://www.linkedin.com/in/tylermalin" target="_blank" rel="noopener noreferrer" className="text-[#6ee7b7] hover:text-[#a7f3d0]">
              LinkedIn
            </a>
            , or use the{" "}
            <a href="#access" className="text-[#6ee7b7] hover:text-[#a7f3d0]">
              early access form
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <IndexLabel>06 / FAQ</IndexLabel>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Questions lawyers, banks, and builders ask
          </h2>
        </Reveal>
        <div className="md:col-span-8">
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 80}>
                <dt className="text-base font-medium text-white text-balance">{f.q}</dt>
                <dd className="mt-2 text-sm text-pretty text-[#a3a3a3]">{f.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#fafafa]">
      <Nav />
      <main id="main" className="px-3">
        <div className="mx-auto max-w-6xl">
          <Hero />
        </div>
        <StackMarquee />
        <Container>
          <Framework />
          <Pillars />
          <Manifesto />
          <UseCases />
          <Integration />
          <Entities />
          <Company />
          <FaqSection />
          <Access />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
