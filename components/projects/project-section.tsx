"use client";

import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  bg?: "white" | "surface";
  className?: string;
  /** Use narrower content width for text-heavy sections. */
  narrow?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable layout shell for dossier sections with premium editorial spacing:
 * oversized display type, generous vertical rhythm, and an anchored gold rule.
 * Wraps content in Section + Container so no section component duplicates layout.
 */
export function ProjectSection({
  eyebrow,
  title,
  description,
  bg = "white",
  className,
  narrow = false,
  children,
}: ProjectSectionProps) {
  return (
    <Section
      className={cn(
        "py-28 md:py-36 lg:py-40",
        bg === "surface" ? "bg-surface" : "bg-white dark:bg-transparent",
        className,
      )}
    >
      <Container className={cn(narrow && "max-w-5xl")}>
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <span className="h-2 w-2 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
              {eyebrow}
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tightest text-balance text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          </div>
          {description && (
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:pb-2">
              {description}
            </p>
          )}
        </header>
        <div className="mt-6 h-px w-full bg-border" aria-hidden="true" />
        {children}
      </Container>
    </Section>
  );
}
