import { IS_PRODUCTION } from "./config";
import { EVENTS } from "./events";
import { track } from "./track";

type VitalName = "FCP" | "LCP" | "CLS" | "INP" | "TTFB";

/** [good, poor] thresholds per Google's Core Web Vitals guidance. */
const THRESHOLDS: Record<VitalName, [number, number]> = {
  FCP: [1800, 3000],
  LCP: [2500, 4000],
  CLS: [0.1, 0.25],
  INP: [200, 500],
  TTFB: [800, 1800],
};

function ratingFor(value: number, metric: VitalName): string {
  const [good, poor] = THRESHOLDS[metric];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

function reportVital(metric: VitalName, value: number): void {
  track(EVENTS.webVital, {
    metric,
    value: Number(value.toFixed(3)),
    rating: ratingFor(value, metric),
  });
}

/** Structural subset of the LayoutShift API exposed by the browser. */
interface LayoutShiftLike extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

/** Structural subset of the Event Timing API used for INP. */
interface EventTimingLike extends PerformanceEntry {
  duration: number;
  interactionId: number;
}

function disconnectAll(observers: PerformanceObserver[]): void {
  for (const observer of observers) {
    try {
      observer.disconnect();
    } catch {
      // ignore
    }
  }
}

/**
 * Production-only performance monitoring. Mounts lightweight PerformanceObserver
 * listeners for FCP/LCP/CLS/INP plus navigation-timing TTFB, and reports each
 * metric once through the tracking abstraction. No-op outside production.
 */
export function installPerformanceMonitoring(): void {
  if (!IS_PRODUCTION) return;

  const observers: PerformanceObserver[] = [];
  let lcpValue = 0;
  let clsValue = 0;
  let inpValue = 0;
  let fcpSent = false;

  try {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (navigation && navigation.responseStart > 0) {
      reportVital("TTFB", navigation.responseStart);
    }
  } catch {
    // ignore
  }

  try {
    const paint = performance.getEntriesByType("paint");
    const fcp = paint.find((entry) => entry.name === "first-contentful-paint");
    if (fcp) {
      reportVital("FCP", fcp.startTime);
      fcpSent = true;
    }
    const observer = new PerformanceObserver((list) => {
      if (fcpSent) return;
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          reportVital("FCP", entry.startTime);
          fcpSent = true;
          break;
        }
      }
    });
    observer.observe({ type: "paint", buffered: true });
    observers.push(observer);
  } catch {
    // ignore
  }

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) lcpValue = last.startTime;
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
    observers.push(observer);
  } catch {
    // ignore
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as LayoutShiftLike;
        if (!shift.hadRecentInput) clsValue += shift.value;
      }
    });
    observer.observe({ type: "layout-shift", buffered: true });
    observers.push(observer);
  } catch {
    // ignore
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const timing = entry as EventTimingLike;
        if (timing.interactionId > 0 && timing.duration > inpValue) {
          inpValue = timing.duration;
        }
      }
    });
    observer.observe({ type: "event", buffered: true });
    observers.push(observer);
  } catch {
    // ignore
  }

  let flushed = false;
  const flush = () => {
    if (flushed) return;
    flushed = true;
    if (lcpValue > 0) reportVital("LCP", lcpValue);
    if (clsValue > 0) reportVital("CLS", clsValue);
    if (inpValue > 0) reportVital("INP", inpValue);
    disconnectAll(observers);
    window.removeEventListener("pagehide", flush);
    document.removeEventListener("visibilitychange", onVisibilityHidden);
  };
  const onVisibilityHidden = () => {
    if (document.visibilityState === "hidden") flush();
  };

  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", onVisibilityHidden);
  window.setTimeout(flush, 15_000);
}
