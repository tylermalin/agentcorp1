/**
 * AGENTSCORP NAV: floating translucent bar. Mark + wordmark left,
 * numbered links center, CTA right. Full-height mobile panel.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";

const NAV_LINKS = [
  { n: "01", label: "Protocol", href: "/#protocol" },
  { n: "02", label: "Use cases", href: "/#use-cases" },
  { n: "03", label: "Integration", href: "/#integration" },
  { n: "04", label: "Entities", href: "/#entities" },
  { n: "05", label: "For agents", href: "/agent" },
  { n: "06", label: "Whitepaper", href: "/whitepaper" },
  { n: "07", label: "Docs", href: "/docs" },
];

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function NavItem({
  link,
  active,
  onClick,
  className,
  style,
}: {
  link: (typeof NAV_LINKS)[number];
  active: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const inner = (
    <>
      <span className={cn("font-mono-index mr-1.5 text-[10px]", active ? "text-[#6ee7b7]" : "text-[#737373]")}>
        {link.n}
      </span>
      {link.label}
    </>
  );
  const cls = cn(
    `whitespace-nowrap transition-colors duration-300 ${EASE} hover:text-white`,
    active ? "text-white" : "text-[#a3a3a3]",
    className,
  );
  if (link.href.startsWith("/#")) {
    return (
      <a href={link.href} className={cls} onClick={onClick} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls} onClick={onClick} style={style} aria-current={active ? "page" : undefined}>
      {inner}
    </Link>
  );
}

export default function Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    !href.startsWith("/#") && (location === href || location.startsWith(href + "/"));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 px-3 pt-3">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 rounded-2xl border border-white/10 bg-black/60 pr-2 pl-4 backdrop-blur-xl">
          <Link href="/" aria-label="AgentsCorp home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 text-[13px] xl:flex">
            {NAV_LINKS.map((l) => (
              <NavItem key={l.href} link={l} active={isActive(l.href)} />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/#access"
              className={`hidden items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black transition duration-300 ${EASE} hover:bg-[#6ee7b7] active:scale-[0.98] sm:inline-flex`}
            >
              Get early access
              <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative h-9 w-9 rounded-lg border border-white/15 xl:hidden"
            >
              <span
                className={cn(
                  `absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-white transition-transform duration-500 ${EASE}`,
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  `absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-white transition-transform duration-500 ${EASE}`,
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          `fixed inset-0 z-30 bg-black/95 px-4 pt-24 backdrop-blur-xl transition-opacity duration-300 ${EASE} xl:hidden`,
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col">
          {NAV_LINKS.map((l, i) => (
            <NavItem
              key={l.href}
              link={l}
              active={isActive(l.href)}
              onClick={() => setOpen(false)}
              className={cn(
                `border-b border-white/10 py-4 text-2xl transition-[opacity,transform] duration-500 ${EASE}`,
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            />
          ))}
          <a
            href="/#access"
            onClick={() => setOpen(false)}
            className="mt-8 rounded-lg bg-[#6ee7b7] px-4 py-3 text-center text-base font-semibold text-black"
          >
            Get early access
          </a>
          <p className="font-mono-index mt-4 text-[11px] uppercase text-[#737373]">Pre-mainnet · target Q1 2027</p>
        </nav>
      </div>
    </>
  );
}
