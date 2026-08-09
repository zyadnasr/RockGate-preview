"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";

interface SectionHeadingProps {
  /** Small uppercase kicker above the title, e.g. "Our Services". */
  eyebrow: string;
  /** Main heading. Supports multi-line via the `highlight` prop. */
  title: React.ReactNode;
  /** Optional supporting paragraph. */
  description?: string;
  align?: "left" | "center";
  /** If true, the section background is dark (adjusts text colors). */
  dark?: boolean;
  className?: string;
  /** Text to render in gold — appended after the title, same line or block. */
  highlight?: string;
  /** Heading level. Route heroes should use "h1" so each page has one. */
  as?: "h1" | "h2";
}

/**
 * Standardised animated section header: eyebrow badge → display title (gold
 * `highlight` span) → optional description, wrapped in `FadeIn` for a
 * consistent scroll-triggered reveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  highlight,
  as = "h2",
  className,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const HeadingTag = as;
  return (
    <FadeIn className={cn("flex flex-col gap-4", alignment, className)}>
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
        {eyebrow}
        {align === "center" && <span className="h-px w-8 bg-accent" aria-hidden="true" />}
      </span>
      <HeadingTag
        className={cn(
          "font-display text-3xl font-bold tracking-tightest text-balance sm:text-4xl md:text-5xl",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient-gold">{highlight}</span>
          </>
        )}
      </HeadingTag>
      {description && (
        <p
          className={cn(
            "mt-2 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
            dark ? "text-white/70" : "text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
