"use client";

import * as React from "react";

/**
 * Fixed top-of-viewport gold bar that tracks reading progress through the
 * case study. Sits above the navbar (navbar is z-50) without blocking the
 * mobile menu (z-[60]). Scroll/resize are rAF-throttled.
 */
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[3px]"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full w-full origin-left bg-accent shadow-[0_0_12px_rgba(245,180,0,0.55)]"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
