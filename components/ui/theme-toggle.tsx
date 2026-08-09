"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Accessible light/dark toggle. Icons cross-fade; renders one that
 * matches the active theme without a hydration flash.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <Button
      variant="ghost"
      size="iconLg"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      data-analytics="theme_toggle"
      data-analytics-theme={isDark ? "light" : "dark"}
      className="relative"
    >
      {!mounted ? (
        <span className="h-5 w-5 rounded-full bg-muted" />
      ) : (
        <>
          <Sun
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            )}
          />
          <Moon
            className={cn(
              "absolute h-5 w-5 transition-all duration-300",
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          />
        </>
      )}
    </Button>
  );
}
