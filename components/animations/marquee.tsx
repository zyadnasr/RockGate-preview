import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Invert strip colors (light text on dark). */
  dark?: boolean;
  direction?: "normal" | "reverse";
}

/**
 * Infinite, seamless scrolling strip used as a cinematic divider.
 * CSS-only animation — no client JS required.
 */
export function Marquee({
  items,
  className,
  dark = false,
  direction = "normal",
}: MarqueeProps) {
  // Duplicate the list so the -50% translate loop is seamless.
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden border-y py-5 select-none",
        dark ? "border-white/10 bg-[#111]" : "border-border bg-secondary/40",
        className,
      )}
      aria-hidden="true"
    >
      {/* Edge fades */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r",
          dark ? "from-[#111]" : "from-surface",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l",
          dark ? "from-[#111]" : "from-surface",
        )}
      />
      <div
        className={cn(
          "flex shrink-0 animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]",
          direction === "reverse" && "[animation-direction:reverse]",
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "flex items-center gap-14 whitespace-nowrap font-display text-lg font-semibold uppercase tracking-widest",
              dark ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {item}
            <span className="h-2 w-2 rotate-45 bg-accent" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
