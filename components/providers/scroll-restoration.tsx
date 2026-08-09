"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Preserves per-route scroll position across browser back/forward so the
 * case-study transition doesn't lose where the reader was. New navigations
 * scroll to top (Next default); `popstate` restores the saved offset via
 * requestAnimationFrame so the DOM is settled before we scroll.
 */

const positions = new Map<string, number>();

export function ScrollRestoration() {
  const pathname = usePathname();

  // Save scroll position as the user moves through a page.
  React.useEffect(() => {
    let ticking = false;
    const save = () => {
      ticking = false;
      const key = location.pathname + location.search;
      positions.set(key, window.scrollY);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(save);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Restore on popstate: the browser fires popstate before React updates
  // the pathname. We schedule a scroll restore in a rAF so the new page
  // content has painted by the time we scroll.
  React.useEffect(() => {
    const onPop = () => {
      // Fragment navigations (clicking a hash link) also fire popstate in
      // some engines even though they aren't back/forward moves. When the URL
      // carries a hash whose target exists, the browser already scrolls to it
      // (honoring scroll-behavior: smooth); restoring here would cancel that
      // scroll and snap the page back — the root cause of hash links not
      // navigating. Skip so the native fragment scroll is preserved.
      const hash = location.hash;
      if (hash.length > 1 && document.getElementById(hash.slice(1))) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const key = location.pathname + location.search;
          const y = positions.get(key) ?? 0;
          window.scrollTo(0, y);
        });
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return null;
}
