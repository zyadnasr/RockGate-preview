"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PrefetchLinkProps
  extends Omit<React.ComponentPropsWithRef<typeof Link>, "prefetch" | "href"> {
  href: string;
  /** Vertical root-margin for the viewport observer, e.g. "200px 0px". */
  viewportMargin?: string;
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
};

/**
 * Navigation link that prefetches its route only when the browser is idle
 * after the link scrolls near the viewport, or immediately on hover/focus/
 * touch. Replaces Next's eager viewport prefetch with an intent-driven one
 * so route payloads are never all pulled up front.
 */
export function PrefetchLink({
  href,
  children,
  viewportMargin = "200px 0px",
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter();
  const anchorRef = React.useRef<HTMLAnchorElement | null>(null);
  const prefetchedRef = React.useRef(false);

  const prefetchNow = React.useCallback(() => {
    if (prefetchedRef.current) return;
    prefetchedRef.current = true;
    router.prefetch(href);
  }, [href, router]);

  const schedulePrefetch = React.useCallback(() => {
    if (prefetchedRef.current) return;
    const idleWin = window as IdleWindow;
    if (idleWin.requestIdleCallback) {
      idleWin.requestIdleCallback(prefetchNow, { timeout: 2500 });
    } else {
      requestAnimationFrame(prefetchNow);
    }
  }, [prefetchNow]);

  // Prefetch once the link is near the viewport, deferred until the browser
  // is idle so it never competes with first paint.
  React.useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) schedulePrefetch();
        }
      },
      { rootMargin: viewportMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [viewportMargin, schedulePrefetch]);

  return (
    <Link
      ref={anchorRef}
      href={href}
      prefetch={false}
      onMouseEnter={(e) => {
        prefetchNow();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        prefetchNow();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        prefetchNow();
        onTouchStart?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
