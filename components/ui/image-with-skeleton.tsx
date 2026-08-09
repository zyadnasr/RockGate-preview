"use client";

import * as React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps {
  src: string | StaticImageData;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  /** Extra classes for the <img> element (e.g. group-hover zoom). */
  className?: string;
  /** Extra classes for the shimmer overlay. */
  shimmerClassName?: string;
  /** Delay the fade-in so the skeleton is readable first. */
  fadeDelayMs?: number;
}

/**
 * `<Image>` wrapper that paints a shimmering skeleton until the asset
 * loads, then fades the photo in. Used across case-study imagery so every
 * image has a graceful loading state and no layout shift (satisfies both
 * "skeleton loading" and "image fade-in").
 */
export function ImageWithSkeleton({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes,
  quality,
  priority,
  className,
  shimmerClassName,
  fadeDelayMs = 60,
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // If the asset is already cached the `load` event can fire before React
  // attaches its handler, so reconcile from `complete` after hydration too.
  React.useEffect(() => {
    if (imgRef.current?.complete) {
      const t = window.setTimeout(() => setLoaded(true), fadeDelayMs);
      return () => window.clearTimeout(t);
    }
  }, [fadeDelayMs]);

  return (
    <>
      {!loaded && !failed && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 overflow-hidden bg-muted",
            shimmerClassName,
          )}
        >
          <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10" />
        </div>
      )}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        quality={quality}
        priority={priority}
        onLoad={() => {
          window.setTimeout(() => setLoaded(true), fadeDelayMs);
        }}
        onError={() => {
          setFailed(true);
          setLoaded(true);
        }}
        className={cn(
          // Transition both opacity (skeleton → photo fade) and transform
          // (caller hover zoom) so the two never override each other.
          "object-cover transition-[opacity,transform] duration-700 ease-smooth",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </>
  );
}
