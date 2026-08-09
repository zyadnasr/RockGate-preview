import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Centered, width-constrained wrapper used across all sections.
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)} {...props} />
  );
}

/**
 * Vertical rhythm wrapper for a full-width section with consistent padding.
 */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      {children}
    </section>
  );
}
