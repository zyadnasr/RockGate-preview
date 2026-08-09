import * as React from "react";
import { cn } from "@/lib/utils";
import logoDark from "@/images/RockGate-logos/rockgate-logo-dark-transparent.svg";
import logoLight from "@/images/RockGate-logos/rockgate-logo-light-transparent.svg";

type LogoAsset = string | { src: string };
const toUrl = (asset: LogoAsset) => (typeof asset === "string" ? asset : asset.src);

interface LogoProps {
  className?: string;
  /** Fixed dark surface: render the white/gold transparent variant. */
  onDark?: boolean;
}

/**
 * Official Rock Gate lockup. Renders the real transparent SVG assets from
 * src/images/RockGate-logos — never a recreated path. The dark logo is used
 * on light surfaces, the white/gold logo on dark surfaces. Without `onDark`
 * the mark adapts to the active theme via the `dark:` variant.
 */
export function Logo({ className, onDark = false }: LogoProps) {
  const dark = toUrl(logoDark);
  const light = toUrl(logoLight);
  const size = cn("h-9 w-9 shrink-0", className);

  if (onDark) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={light}
        alt="Rock Gate"
        width={500}
        height={500}
        draggable={false}
        className={size}
      />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark}
        alt="Rock Gate"
        width={500}
        height={500}
        draggable={false}
        className={cn(size, "dark:hidden")}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light}
        alt="Rock Gate"
        width={500}
        height={500}
        draggable={false}
        className={cn(size, "hidden dark:block")}
      />
    </>
  );
}
