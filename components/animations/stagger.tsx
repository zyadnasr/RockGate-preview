"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "./motion";

/**
 * Parent that animates its `StaggerItem` children in sequence as it
 * scrolls into view. Drop-in, no per-child config needed.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -100px 0px", amount: 0.12 }}
    >
      {children}
    </motion.div>
  );
}

/** Individual item for the Stagger parent — exported separately for RSC manifest stability. */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
