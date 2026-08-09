"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Horizontal offset in px (positive slides right). */
  x?: number;
  /** Vertical offset in px. */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
}

/**
 * Scroll-triggered fade + slide reveal. Fires once by default.
 * Respects prefers-reduced-motion via global CSS overrides.
 */
export function FadeIn({
  children,
  className,
  x = 0,
  y = 32,
  delay = 0,
  duration = 0.8,
  once = true,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -120px 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Simple opacity-only fade (used for full-bleed images, backgrounds). */
export function Fade({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
