"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "./motion";

const charVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.02,
      ease: EASE,
    },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: EASE,
    },
  }),
};

interface SplitTextProps {
  text: string;
  className?: string;
  mode?: "chars" | "words";
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Text component that animates in word-by-word or character-by-character
 * with a blur + slide-up reveal for a premium cinematic feel.
 */
export function SplitText({
  text,
  className,
  mode = "words",
  as: Tag = "span",
}: SplitTextProps) {
  const items = mode === "words" ? text.split(" ") : text.split("");

  return (
    <Tag className={className}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          custom={i}
          variants={mode === "words" ? wordVariants : charVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="inline-block"
          style={{ perspective: 400 }}
        >
          {item}
          {mode === "words" && i < items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
