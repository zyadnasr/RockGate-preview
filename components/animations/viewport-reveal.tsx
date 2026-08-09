"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

interface ViewportRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Generous rootMargin so animations start before the section enters the viewport. */
  rootMargin?: string;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Duration of the reveal animation. */
  duration?: number;
  /** If true, only animate once. */
  once?: boolean;
}

/**
 * Lightweight viewport activation wrapper — uses IntersectionObserver with
 * generous rootMargin (300px) so animations are ready before the user
 * reaches the section. GPU-accelerated (transform + opacity only).
 *
 * Use this for components that need viewport gating but don't need
 * framer-motion's full animation capabilities.
 */
export function ViewportReveal({
  children,
  className,
  rootMargin = "0px 0px -300px 0px",
  delay = 0,
  duration = 0.6,
  once = true,
}: ViewportRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: rootMargin, amount: 0.1 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Hook that returns whether an element is in the viewport (with generous margin).
 * Useful for deferring expensive work until the element approaches the viewport.
 */
export function useViewportVisibility(
  options: { rootMargin?: string; threshold?: number } = {}
) {
  const { rootMargin = "0px 0px 300px 0px", threshold = 0 } = options;
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return { ref, isVisible };
}
