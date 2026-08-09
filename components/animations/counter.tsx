"use client";

import * as React from "react";

interface CounterProps {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Matches framer-motion's default `easeOut` (cubic-bezier 0.16,1,0.3,1) so the feel is unchanged. */
const EASE_OUT = { x1: 0.16, y1: 1, x2: 0.3, y2: 1 };

/** Evaluate a cubic-bezier at progress `t` (Newton iteration on x, then y). */
function cubicBezier(t: number): number {
  const { x1, y1, x2, y2 } = EASE_OUT;
  // Sample the x(t) polynomial to solve for the parameter u where x(u) === t.
  let u = t;
  for (let i = 0; i < 8; i++) {
    const mt = 1 - u;
    const bx = 3 * mt * mt * u * x1 + 3 * mt * u * u * x2 + u * u * u;
    const dx = 3 * mt * mt * x1 + 6 * mt * u * (x2 - x1) + 3 * u * u * (1 - x2);
    if (Math.abs(dx) < 1e-6) break;
    u -= (bx - t) / dx;
  }
  const mt = 1 - u;
  return 3 * mt * mt * u * y1 + 3 * mt * u * u * y2 + u * u * u;
}

/**
 * Counts up from 0 to `to` (with optional decimals) once it scrolls into
 * view. Native IntersectionObserver + rAF — no animation runtime dependency,
 * so the Stats section does not need framer-motion just for its counters.
 */
export function Counter({
  to,
  decimals = 0,
  suffix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(0);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (reduceMotion) {
        setValue(to);
        return;
      }

      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min((now - start) / (duration * 1000), 1);
        setValue(to * cubicBezier(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -200px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
