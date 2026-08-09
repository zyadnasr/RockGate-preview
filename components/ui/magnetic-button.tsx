"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  /** Render as anchor tag (for navigation). */
  asLink?: boolean;
  /** Delegated analytics event name (see src/lib/monitoring/interactions.ts). */
  "data-analytics"?: string;
  "data-analytics-cta"?: string;
}

/**
 * Button with magnetic hover effect — the button subtly follows the cursor
 * when hovered, creating a premium tactile feel.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  asLink,
  "data-analytics": dataAnalytics,
  "data-analytics-cta": dataAnalyticsCta,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const glowOpacity = useTransform(
    [springX, springY],
    ([vx, vy]: number[]) => {
      const dist = Math.sqrt((vx as number) ** 2 + (vy as number) ** 2);
      return Math.min(dist * 2, 1);
    }
  );

  // The button's rect is stable while hovering (it sits in the hero, above
  // the fold), so measure it once and only re-measure after a scroll/resize
  // or a fresh pointerenter — never on every mousemove.
  const rectRef = useRef<DOMRect | null>(null);
  const invalidate = useCallback(() => {
    rectRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    return () => {
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
  }, [invalidate]);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (!rectRef.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.width === 0) return;
        rectRef.current = rect;
      }
      const rect = rectRef.current;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Comp = asLink ? motion.a : motion.button;
  const extraProps = asLink
    ? {
        href,
        onClick,
        ...(dataAnalytics !== undefined ? { "data-analytics": dataAnalytics } : {}),
        ...(dataAnalyticsCta !== undefined ? { "data-analytics-cta": dataAnalyticsCta } : {}),
      }
    : { onClick };

  return (
    <Comp
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn("relative group", className)}
      {...extraProps}
    >
      {/* Glow layer */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(circle at center, rgba(245,180,0,0.25) 0%, transparent 70%)",
          filter: "blur(12px)",
          transform: "scale(1.5)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </Comp>
  );
}
