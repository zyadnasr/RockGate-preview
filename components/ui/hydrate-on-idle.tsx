"use client";

import * as React from "react";

interface HydrateOnIdleProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** Extra delay after idle before children mount (ms). */
  idleDelay?: number;
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/**
 * Defers mounting of expensive interactive children until the browser is
 * idle (requestIdleCallback), so they never compete with first paint or
 * LCP. Server and the first client render both emit `fallback` (nothing
 * by default), so there is no hydration mismatch — children mount later,
 * after hydration.
 */
export function HydrateOnIdle({
  children,
  fallback = null,
  idleDelay = 0,
}: HydrateOnIdleProps) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    const activate = () => {
      if (cancelled) return;
      if (idleDelay > 0) window.setTimeout(() => setReady(true), idleDelay);
      else setReady(true);
    };

    const idleWin = window as IdleWindow;
    let handle: number | undefined;
    if (idleWin.requestIdleCallback) {
      handle = idleWin.requestIdleCallback(activate, { timeout: 2500 });
    } else {
      handle = window.setTimeout(activate, 300) as unknown as number;
    }

    return () => {
      cancelled = true;
      if (handle !== undefined) {
        if (idleWin.cancelIdleCallback) idleWin.cancelIdleCallback(handle);
        else window.clearTimeout(handle);
      }
    };
  }, [idleDelay]);

  return <>{ready ? children : fallback}</>;
}
