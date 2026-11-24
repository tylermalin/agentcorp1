/**
 * /planner — interactive structure planner.
 * Answers update a live plan: recommended structure, a clickable series
 * diagram with a liability blast-radius simulation, starting guardrails,
 * a real-world filing checklist, and exportable output.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowCounterClockwise, Check, Copy, DownloadSimple, LinkSimple, Warning } from "@phosphor-icons/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import { CodeFrame, Container, IndexLabel, PageHeader } from "@/components/site/Primitives";
import {
  DEFAULT_ANSWERS,
  QUESTIONS,
  decodeAnswers,
  encodeAnswers,
  planMarkdown,
  recommend,
  usd,
  type Answers,
  type Plan,
} from "@/lib/planner";
import { SITE_ORIGIN } from "@/lib/seo";
import { cn } from "@/lib/utils";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const MAX_TILES = 12;

/* ------------------------------------------------------------------ */

function QuestionBlock({
  index,
  q,
  value,
  onChange,
}: {
  index: number;
  q: (typeof QUESTIONS)[number];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="border-t border-white/10 py-6">
      <legend className="sr-only">{q.title}</legend>
      <div className="flex gap-4">
        <span className="font-mono-index pt-0.5 text-xs text-[#6ee7b7]">0.{index + 1}</span>
        <div className="min-w-0 flex-1">
          <p aria-hidden className="text-base font-medium text-white">
            {q.title}
          </p>
          <p className="mt-1 text-xs text-[#737373]">{q.help}</p>
          <div role="radiogroup" aria-label={q.title} className="mt-4 grid gap-2 sm:grid-cols-2">
            {q.options.map((o) => {
              const on = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => onChange(o.value)}
                  className={cn(
                    `rounded-lg border px-3 py-2.5 text-left transition duration-300 ${EASE} active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6ee7b7]`,
                    on
                      ? "border-[#6ee7b7]/60 bg-[#6ee7b7]/10 text-white"
                      : "border-white/10 bg-[#0b0b0b] text-[#a3a3a3] hover:border-white/30 hover:text-white",
                  )}
                >
                  <span className="block text-sm font-medium">{o.label}</span>
                  {o.detail && <span className="mt-0.5 block text-xs text-[#737373]">{o.detail}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </fieldset>
  );
}

/** Parent + series tiles. Click a tile to simulate a claim; toggle to compare one LLC. */
function BlastRadius({ plan }: { plan: Plan }) {
  const hasSeries = plan.seriesCount > 0;
  const [mode, setMode] = useState<"series" | "single">("series");
  const [hit, setHit] = useState<number | null>(null);
  useEffect(() => setHit(null), [plan.seriesCount, plan.code]);

  const tiles = hasSeries ? Math.min(plan.seriesCount, MAX_TILES) : 1;
  const extra = hasSeries ? plan.seriesCount - tiles : 0;
  const single = !hasSeries || mode === "single";
  const exposed = (i: number) => hit !== null && (single || i === hit);

  const caption =
    hit === null
      ? "Click a workload to simulate a claim or a runaway agent against it."
      : single
        ? hasSeries
          ? "One LLC: the claim can reach the assets of every workload, because they all sit in the same company."
          : "A single entity: everything it holds is exposed to the claim."
        : `Series LLC: the claim stops at ${plan.seriesLabel} ${hit + 1}. The other ${plan.seriesCount - 1} series keep their assets, provided records are kept separately.`;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-white">Liability blast radius</span>
        {hasSeries && (
          <div role="tablist" aria-label="Compare structures" className="flex rounded-lg border border-white/10 p-0.5 text-xs">
            {(["series", "single"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors duration-300",
                  mode === m ? "bg-white text-black" : "text-[#a3a3a3] hover:text-white",
                )}
              >
                {m === "series" ? "Series LLC" : "One LLC"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Parent */}
      <div
        className={cn(
          `mt-5 rounded-lg border px-3 py-2 text-xs transition-colors duration-500 ${EASE}`,
          single && hit !== null ? "border-red-400/60 bg-red-400/10 text-red-200" : "border-[#6ee7b7]/40 bg-[#6ee7b7]/10 text-[#d1fae5]",
        )}
      >
        {hasSeries ? (single ? "One LLC holding every workload" : "Parent Delaware Series LLC") : plan.name}
      </div>

      <div className={cn("mt-3 grid gap-2", tiles === 1 ? "grid-cols-1" : "grid-cols-3 sm:grid-cols-4")}>
        {Array.from({ length: tiles }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setHit(hit === i ? null : i)}
            aria-pressed={hit === i}
            className={cn(
              `rounded-lg border px-2 py-3 text-left text-[11px] transition duration-500 ${EASE} active:scale-[0.97]`,
              exposed(i)
                ? "border-red-400/60 bg-red-400/15 text-red-100"
                : hit !== null
                  ? "border-[#6ee7b7]/30 bg-[#6ee7b7]/5 text-[#a7f3d0]"
                  : "border-white/10 bg-[#181818] text-[#a3a3a3] hover:border-white/30 hover:text-white",
              single && hasSeries && "border-dashed",
            )}
          >
            <span className="font-mono-index block text-[10px] opacity-70">{hasSeries ? `S${String(i + 1).padStart(2, "0")}` : "ENTITY"}</span>
            {hasSeries ? `${plan.seriesLabel} ${i + 1}` : "All workloads"}
            {hit === i && <Warning weight="fill" className="mt-1 h-3.5 w-3.5 text-red-300" />}
          </button>
        ))}
      </div>
      {extra > 0 && <p className="mt-2 text-xs text-[#737373]">+ {extra} more series</p>}

      <p aria-live="polite" className="mt-4 text-sm text-pretty text-[#d4d4d4]">
        {caption}
      </p>
      {hit !== null && (
        <button
          type="button"
          onClick={() => setHit(null)}
          className="mt-2 inline-flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-white"
        >
          <ArrowCounterClockwise className="h-3.5 w-3.5" /> Reset
        </button>
      )}
    </div>
  );
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}

/* ------------------------------------------------------------------ */

export default function Planner() {
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS);
  const touched = useRef(false);
  const plan = useMemo(() => recommend(answers), [answers]);
  const { copied, copy } = useCopy();

  // Restore a shared plan from the URL.
  useEffect(() => {
    const fromUrl = decodeAnswers(window.location.search);
    if (fromUrl) {
      touched.current = true;
      setAnswers(fromUrl);
    }
  }, []);

  // Keep the URL shareable once the visitor has interacted.
  useEffect(() => {
    if (!touched.current) return;
    window.history.replaceState(null, "", `/planner?${encodeAnswers(answers)}`);
  }, [answers]);

  const set = (id: keyof Answers, v: string) => {
    touched.current = true;
    setAnswers((prev) => ({ ...prev, [id]: v }) as Answers);
  };

  const shareUrl = `${SITE_ORIGIN}/planner?${encodeAnswers(answers)}`;
  const markdown = planMarkdown(answers, plan, shareUrl);
  const config = JSON.stringify(
    {
      structure: plan.code,
      parentEntityId: "de-series-llc-parent-01",
      series: plan.seriesCount
        ? Array.from({ length: Math.min(plan.seriesCount, 3) }, (_, i) => ({
            label: `${plan.seriesLabel} ${i + 1}`,
            treasuryPolicy: {
              dailyCapUsd: plan.guardrails.dailyCapUsd,
              requireApprovalAboveUsd: plan.guardrails.approvalAboveUsd,
            },
          }))
        : undefined,
      treasuryPolicy: plan.seriesCount
        ? undefined
        : { dailyCapUsd: plan.guardrails.dailyCapUsd, requireApprovalAboveUsd: plan.guardrails.approvalAboveUsd },
      rails: answers.rails,
      network: "base-sepolia",
    },
    null,
    2,
  );

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "agentscorp-structure-plan.md";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const actionCls = `inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-white transition duration-300 ${EASE} hover:border-white/40 active:scale-[0.98]`;

  return (
    <div className="min-h-screen bg-black text-[#fafafa]">
      <Nav />
      <main id="main">
        <Container>
          <PageHeader
            index="Structure planner · 60 seconds"
            title="Plan your agent entity structure"
            lede="Answer six questions. Get a recommended Delaware structure, starting guardrails for each agent, and the real-world filings you will still need. Change any answer and the plan updates."
          />

          <section className="grid gap-10 pb-24 lg:grid-cols-12">
            {/* Questions */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between">
                <IndexLabel>Your answers</IndexLabel>
                <button
                  type="button"
                  onClick={() => {
                    touched.current = false;
                    setAnswers(DEFAULT_ANSWERS);
                    window.history.replaceState(null, "", "/planner");
                  }}
                  className="inline-flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-white"
                >
                  <ArrowCounterClockwise className="h-3.5 w-3.5" /> Start over
                </button>
              </div>
              <div className="mt-2">
                {QUESTIONS.map((q, i) => (
                  <QuestionBlock key={q.id} index={i} q={q} value={answers[q.id]} onChange={(v) => set(q.id, v)} />
                ))}
              </div>
            </div>

            {/* Plan */}
            <div className="min-w-0 lg:col-span-7">
              <div className="space-y-4 lg:sticky lg:top-24">
                <div aria-live="polite" className="rounded-2xl border border-white/10 bg-[#181818] p-6 shadow-[0_24px_60px_-20px_rgba(110,231,183,0.18)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <IndexLabel>Recommended</IndexLabel>
                    <span className="font-mono-index rounded-md bg-[#6ee7b7]/10 px-2 py-0.5 text-[11px] text-[#6ee7b7]">{plan.code}</span>
                    <span className="font-mono-index rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-[#a3a3a3]">{plan.status}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">{plan.name}</h2>
                  {plan.seriesCount > 0 && (
                    <p className="mt-1 text-sm text-[#a3a3a3]">About {plan.seriesCount} protected series, one per {plan.seriesLabel.toLowerCase()}.</p>
                  )}
                  <p className="mt-4 text-sm text-pretty text-[#d4d4d4]">{plan.why}</p>

                  <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
                    {[
                      ["Daily spend cap", usd(plan.guardrails.dailyCapUsd)],
                      ["Human approval above", usd(plan.guardrails.approvalAboveUsd)],
                      ["Signers", plan.guardrails.signers],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-[#0b0b0b] p-4">
                        <dt className="font-mono-index text-[10px] uppercase text-[#737373]">{k}</dt>
                        <dd className="mt-1 text-sm font-medium text-white">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-[11px] text-[#737373]">
                    Starting guardrails per {plan.seriesCount ? "series" : "entity"}, based on your spend. Adjust to your risk tolerance.
                  </p>
                </div>

                <BlastRadius plan={plan} />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                    <div className="text-sm font-medium text-white">You still do</div>
                    <ul className="mt-3 space-y-2 text-sm text-[#d4d4d4]">
                      {plan.youDo.map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-1.5 h-3 w-3 shrink-0 rounded-sm border border-white/30" aria-hidden />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                    <div className="text-sm font-medium text-white">AgentsCorp plans to automate</div>
                    <ul className="mt-3 space-y-2 text-sm text-[#a3a3a3]">
                      {plan.weAutomate.map((x) => (
                        <li key={x} className="flex gap-2">
                          <Check weight="bold" className="mt-1 h-3.5 w-3.5 shrink-0 text-[#6ee7b7]" />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-[#737373]">In development · target Q1 2027</p>
                  </div>
                </div>

                {plan.cautions.length > 0 && (
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-amber-100">
                      <Warning weight="fill" className="h-4 w-4 text-amber-300" /> Watch for
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-amber-50/80">
                      {plan.cautions.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <CodeFrame title="series-config.json" meta="SDK preview · Base Sepolia" code={config} />

                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => copy("md", markdown)} className={actionCls}>
                    {copied === "md" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied === "md" ? "Copied" : "Copy plan"}
                  </button>
                  <button type="button" onClick={download} className={actionCls}>
                    <DownloadSimple className="h-4 w-4" /> Download .md
                  </button>
                  <button type="button" onClick={() => copy("link", shareUrl)} className={actionCls}>
                    {copied === "link" ? <Check className="h-4 w-4" /> : <LinkSimple className="h-4 w-4" />}
                    {copied === "link" ? "Link copied" : "Copy share link"}
                  </button>
                </div>

                <div className="rounded-2xl border border-[#6ee7b7]/25 bg-[#6ee7b7]/5 p-5">
                  <div className="text-sm font-medium text-white">Build this with us</div>
                  <p className="mt-1 text-sm text-[#a3a3a3]">
                    Join the Q1 2027 design-partner cohort. We'll see the structure you planned and follow up.
                  </p>
                  <WaitlistForm
                    entityType={`Planner: ${plan.code}${plan.seriesCount ? ` x${plan.seriesCount}` : ""}`}
                    source="planner"
                    variant="hero"
                    className="mt-4"
                  />
                </div>

                <p className="text-xs text-pretty text-[#737373]">
                  Illustrative planning output, not legal advice. Structure, filings, and banking depend on your facts,
                  applicable law, and each institution's rules. Have counsel review before forming an entity.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
