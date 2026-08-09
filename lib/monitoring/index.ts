import { installErrorListeners } from "./error";
import { EVENTS } from "./events";
import { installClickTracking, installScrollDepthTracking, consumeNavStart, resetScrollDepth } from "./interactions";
import { installPerformanceMonitoring } from "./performance";
import { track } from "./track";

let initialized = false;

/**
 * Mount all client-side monitoring listeners once per page lifetime:
 * global error capture, delegated click/scroll tracking and production-only
 * performance observers. Safe to call repeatedly (idempotent).
 */
export function initMonitoring(): void {
  if (initialized) return;
  initialized = true;
  installErrorListeners();
  installClickTracking();
  installScrollDepthTracking();
  installPerformanceMonitoring();
}

/** Route-change hook: resets per-route state and reports transition timing. */
export function onRouteChange(from: string, to: string): void {
  resetScrollDepth();
  const start = consumeNavStart();
  if (start) {
    track(EVENTS.routeTransition, {
      from,
      to,
      duration_ms: Math.round(performance.now() - start),
    });
  }
}

export { EVENTS } from "./events";
export { captureError } from "./error";
export { track, trackPageView, logEvent, type EventParams, type TrackedEvent } from "./track";
