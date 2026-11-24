/**
 * Editorial layout primitives shared across every page.
 * Grammar: max-w-6xl container, hairline rules, a left index rail
 * (01 / LABEL) and decimal-indexed rows (0.1, 0.2 …) on the right.
 */
import { useState, type ReactNode } from "react";
import { Check, Copy, DownloadSimple as Download } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { HalftoneField, Reveal } from "./Motion";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function IndexLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("font-mono-index text-xs uppercase text-[#6ee7b7]", className)}>{children}</div>
  );
}

/** Top-of-page header used on subpages (/agent, /whitepaper, /docs, /mint). */
export function PageHeader({
  index,
  title,
  lede,
  children,
}: {
  index: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="pt-6 pb-16 md:pt-8 md:pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] px-6 pt-16 pb-12 sm:px-10 md:px-14 md:pt-24 md:pb-16">
        <HalftoneField className="absolute inset-0 opacity-25 md:opacity-70" cell={7} />
        <div className="relative">
          <div className="font-mono-index mb-8 flex items-center gap-3 text-xs uppercase text-[#a3a3a3]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
            <span>{index}</span>
          </div>
          <h1 className="text-hero-gradient max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-8 max-w-xl text-base text-pretty text-[#d4d4d4] md:text-lg md:leading-8">{lede}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * 12-column section: sticky left rail (index + heading + intro) and a
 * right column for rows, tables, or code.
 */
export function Section({
  id,
  index,
  title,
  intro,
  railSpan = 4,
  children,
  aside,
}: {
  id?: string;
  index: string;
  title: ReactNode;
  intro?: ReactNode;
  railSpan?: 4 | 5;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-white/10 py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <div className={railSpan === 5 ? "md:col-span-5" : "md:col-span-4"}>
          <div className="md:sticky md:top-24">
            <IndexLabel>{index}</IndexLabel>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-balance md:text-3xl">{title}</h2>
            {intro && <div className="mt-4 text-sm leading-relaxed text-[#a3a3a3]">{intro}</div>}
            {aside}
          </div>
        </div>
        <Reveal className={cn("min-w-0", railSpan === 5 ? "md:col-span-7" : "md:col-span-8")}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export type Row = { idx: string; title: ReactNode; body: ReactNode };

/** Decimal-indexed hairline rows (0.1 / 0.2 / 0.3). */
export function IndexedRows({ rows, className }: { rows: Row[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-white/10 border-y border-white/10", className)}>
      {rows.map((r) => (
        <div
          key={r.idx}
          className="print-keep group grid gap-3 py-7 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.02] sm:grid-cols-12 sm:gap-4 sm:px-2"
        >
          <div className="font-mono-index text-xs text-[#737373] transition-colors duration-300 group-hover:text-[#6ee7b7] sm:col-span-2">
            {r.idx}
          </div>
          <div className="min-w-0 sm:col-span-10">
            <h3 className="text-base font-medium tracking-[-0.02em] md:text-lg">{r.title}</h3>
            <div className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">{r.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Crisp 1px framed code/spec block with a header bar and copy/download. */
export function CodeFrame({
  title,
  meta,
  code,
  downloadHref,
  className,
}: {
  title: string;
  meta?: string;
  code: string;
  downloadHref?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/10 bg-[#181818]", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
        <span className="font-mono-index min-w-0 truncate text-[11px] text-[#a3a3a3]">
          {title}
          {meta && <span className="text-[#737373]"> · {meta}</span>}
        </span>
        <div className="flex shrink-0 items-center gap-4 print:hidden">
          {downloadHref && (
            <a
              href={downloadHref}
              download
              className="inline-flex items-center gap-1.5 text-xs text-[#a3a3a3] transition hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          )}
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-xs text-[#a3a3a3] transition hover:text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="font-code overflow-x-auto p-5 text-xs leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** Hairline metadata strip (label over value), 2 cols mobile / 4 desktop. */
export function MetaStrip({ items, className }: { items: { label: string; value: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 border-y border-white/10 md:grid-cols-4", className)}>
      {items.map((it, i) => (
        <div
          key={it.label}
          className={cn(
            "py-5 pr-4",
            i % 2 === 1 && "border-l border-white/10 pl-4",
            i >= 2 && "border-t border-white/10 md:border-t-0",
            i === 2 && "md:border-l md:pl-4",
          )}
        >
          <dt className="font-mono-index text-[11px] uppercase text-[#737373]">{it.label}</dt>
          <dd className="mt-1 text-sm font-medium">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Key/value definition list with hairline separators. */
export function SpecList({ items, className }: { items: { k: string; v: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("divide-y divide-white/10 border-y border-white/10 text-xs", className)}>
      {items.map((it) => (
        <div key={it.k} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6">
          <dt className="text-[#737373]">{it.k}</dt>
          <dd className="text-[#a3a3a3] sm:text-right">{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Small status tag: "live" (white dot) or "planned" (hollow). */
export function StatusTag({ tone, children }: { tone: "live" | "planned"; children: ReactNode }) {
  return (
    <span className="font-mono-index inline-flex items-center gap-2 text-[11px] uppercase text-[#a3a3a3]">
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          tone === "live" ? "bg-white" : "border border-[#737373]",
        )}
      />
      {children}
    </span>
  );
}

/** Inline callout for legal/status caveats. */
export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("border-l border-white/20 pl-4 text-xs leading-relaxed text-[#a3a3a3]", className)}>
      {children}
    </div>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6ee7b7]";
export const btnPrimary = `${btnBase} bg-[#6ee7b7] text-black hover:bg-[#a7f3d0]`;
export const btnSecondary = `${btnBase} border border-white/20 text-white hover:border-white/50 hover:bg-white/5`;
export const btnLight = `${btnBase} bg-white text-black hover:bg-[#e5e5e5]`;
