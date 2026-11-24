/**
 * Motion primitives: scroll reveal, animated halftone field, dot matrix icons.
 * All animation respects prefers-reduced-motion and pauses offscreen.
 */
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Returns [ref, visible]; visible flips true once when the element enters the viewport. */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

/** Rises and fades its children in once on scroll. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const [ref, visible] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Halftone field                                                      */
/* ------------------------------------------------------------------ */

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const blob = (u: number, v: number, cx: number, cy: number, r: number) => {
  const dx = u - cx;
  const dy = v - cy;
  return Math.exp(-(dx * dx + dy * dy) / (r * r));
};

/**
 * Animated halftone dot field. A bright mass drifts on the right while a
 * dark nested-rectangle silhouette (parent entity with stacked series)
 * cuts through it. The cursor lifts nearby dots.
 */
export function HalftoneField({ className, cell = 8 }: { className?: string; cell?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let last = 0;
    const mouse = { x: -1, y: -1, k: 0 };
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Nested series silhouette: three stacked rounded slabs, slightly offset.
    const silhouette = (u: number, v: number, t: number) => {
      const drift = Math.sin(t * 0.25) * 0.02;
      let s = 0;
      for (let i = 0; i < 3; i++) {
        const cx = 0.62 + i * 0.07 + drift;
        const cy = 0.68 - i * 0.12;
        const hw = 0.11;
        const hh = 0.045;
        const dx = Math.max(Math.abs(u - cx) - hw, 0);
        const dy = Math.max(Math.abs(v - cy) - hh, 0);
        const d = Math.sqrt(dx * dx + dy * dy);
        s = Math.max(s, 1 - smoothstep(0, 0.06, d));
      }
      return s;
    };

    const draw = (now: number) => {
      const t = reduced ? 8 : (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      const aspect = w / Math.max(h, 1);
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      mouse.k += ((mouse.x >= 0 ? 1 : 0) - mouse.k) * 0.08;

      for (let j = 0; j < rows; j++) {
        const v = (j + 0.5) / rows;
        for (let i = 0; i < cols; i++) {
          const u = (i + 0.5) / cols;
          let f =
            blob(u * aspect, v, (0.78 + 0.06 * Math.sin(t * 0.31)) * aspect, 0.35 + 0.08 * Math.cos(t * 0.23), 0.55) *
              1.15 +
            blob(u * aspect, v, (0.95 + 0.05 * Math.cos(t * 0.19)) * aspect, 0.9, 0.4) * 0.6;
          f += 0.12 * Math.sin(u * 14 + t * 0.9) * Math.sin(v * 11 - t * 0.6);
          f -= silhouette(u, v, t) * 0.85;
          if (mouse.k > 0.01) {
            const dx = (u - mouse.x) * aspect;
            const dy = v - mouse.y;
            f += 0.55 * mouse.k * Math.exp(-(dx * dx + dy * dy) / 0.012);
          }
          // Wide panels fade the field out behind left-aligned text; narrow ones use the full width.
          f *= aspect < 1.2 ? smoothstep(-0.2, 0.35, u) : smoothstep(0.34, 0.78, u);
          if (f <= 0.04) continue;
          const k = Math.min(f, 1);
          const size = cell * 0.82 * Math.sqrt(k);
          ctx.fillStyle = `rgba(110, 231, 183, ${0.25 + 0.75 * k})`;
          ctx.fillRect(i * cell + (cell - size) / 2, j * cell + (cell - size) / 2, size, size);
        }
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      if (now - last > 33) {
        draw(now);
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      mouse.x = -1;
      mouse.y = -1;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    if (reduced) {
      draw(0);
    } else {
      const io = new IntersectionObserver(([entry]) => {
        const shouldRun = entry.isIntersecting;
        if (shouldRun && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!shouldRun) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(canvas);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
      return () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
      };
    }
    return () => ro.disconnect();
  }, [cell]);

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />;
}

/* ------------------------------------------------------------------ */
/* Dot matrix icons                                                    */
/* ------------------------------------------------------------------ */

export type DotIconKind = "series" | "anchor" | "vault" | "spec";

const N = 21;
const box = (x: number, y: number, cx: number, cy: number, hw: number, hh: number, stroke: number) => {
  const dx = Math.abs(x - cx) - hw;
  const dy = Math.abs(y - cy) - hh;
  const outside = Math.max(dx, dy);
  return outside <= 0 && outside > -stroke ? 1 : 0;
};

/** Returns dot intensity 0..1 at x,y in [-1, 1]. */
const SHAPES: Record<DotIconKind, (x: number, y: number) => number> = {
  // Parent entity with three child series cells.
  series: (x, y) => {
    if (box(x, y, 0, -0.55, 0.85, 0.28, 0.14)) return 1;
    for (const cx of [-0.58, 0, 0.58]) {
      if (box(x, y, cx, 0.45, 0.22, 0.38, 0.14)) return 0.85;
    }
    if (Math.abs(x) < 0.06 && y > -0.27 && y < 0.07) return 0.6;
    if (Math.abs(y + 0.1) < 0.06 && Math.abs(x) < 0.6) return 0.6;
    return 0;
  },
  // Document page with folded corner and text lines.
  anchor: (x, y) => {
    const inPage = Math.abs(x) <= 0.62 && Math.abs(y) <= 0.88 && !(x > 0.25 && y < -0.5 && x - 0.25 > y + 0.88);
    if (!inPage) return 0;
    const edge = Math.abs(x) > 0.5 || Math.abs(y) > 0.76 || (x > 0.13 && y < -0.38 && Math.abs(x - 0.25 - (y + 0.88)) < 0.16);
    if (edge) return 1;
    for (const ly of [-0.2, 0.15, 0.5]) if (Math.abs(y - ly) < 0.07 && x > -0.36 && x < (ly > 0.4 ? 0.1 : 0.36)) return 0.7;
    return 0.08;
  },
  // Treasury dial: ring with handle spokes.
  vault: (x, y) => {
    const r = Math.sqrt(x * x + y * y);
    if (r > 0.74 && r < 0.92) return 1;
    if (r < 0.18) return 0.9;
    const a = Math.atan2(y, x);
    for (let i = 0; i < 3; i++) {
      const ang = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      let d = Math.abs(a - ang);
      d = Math.min(d, 2 * Math.PI - d);
      if (d < 0.2 && r < 0.75) return 0.75;
    }
    return r < 0.74 ? 0.07 : 0;
  },
  // Spec file: brackets around a cursor.
  spec: (x, y) => {
    const ax = Math.abs(x);
    if (Math.abs(y) < 0.8 && ax > 0.62 && ax < 0.78) return 1;
    if ((Math.abs(y - 0.8) < 0.08 || Math.abs(y + 0.8) < 0.08) && ax > 0.45 && ax < 0.78) return 1;
    if (x > -0.4 && x < 0.1 && Math.abs(Math.abs(y) - (0.1 - x) * 0.9) < 0.12 && Math.abs(y) < 0.45) return 0.85;
    if (Math.abs(y - 0.4) < 0.07 && x > 0.12 && x < 0.42) return 0.85;
    return 0;
  },
};

export function DotIcon({ kind, className }: { kind: DotIconKind; className?: string }) {
  const fn = SHAPES[kind];
  const dots: { cx: number; cy: number; r: number; o: number }[] = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = (i / (N - 1)) * 2 - 1;
      const y = (j / (N - 1)) * 2 - 1;
      const k = fn(x, y);
      dots.push({ cx: i * 10 + 5, cy: j * 10 + 5, r: k > 0 ? 1.4 + 2.4 * k : 1.1, o: k > 0 ? 0.35 + 0.65 * k : 0.12 });
    }
  }
  return (
    <svg viewBox={`0 0 ${N * 10} ${N * 10}`} aria-hidden className={cn("h-auto w-full", className)}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="currentColor" opacity={d.o} />
      ))}
    </svg>
  );
}
