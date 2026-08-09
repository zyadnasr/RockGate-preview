import { cn } from "@/lib/utils";

interface LogoMarkProps {
  mark: string;
  className?: string;
}

/**
 * Styled monogram rendered from text — no image assets needed.
 * Used by partner and client logo grids.
 */
export function LogoMark({ mark, className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "grid h-16 w-16 place-items-center border border-border bg-surface font-display text-lg font-bold text-foreground transition-all duration-300 hover:border-accent hover:text-accent",
        className,
      )}
    >
      {mark}
    </span>
  );
}
