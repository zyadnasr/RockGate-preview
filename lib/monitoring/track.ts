import { GA_ENABLED } from "./config";
import { EVENTS } from "./events";

export type EventParams = Record<string, string | number | boolean>;

export interface TrackedEvent {
  name: string;
  params: EventParams;
  ts: number;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    /** In-memory debug/test log — never leaves the tab, no network traffic. */
    __RG_EVENTS__?: TrackedEvent[];
  }
}

const MAX_LOG_SIZE = 300;

/** Record an event in the in-memory log (dev and prod, no network). */
export function logEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  try {
    const log = window.__RG_EVENTS__ ?? (window.__RG_EVENTS__ = []);
    if (log.length >= MAX_LOG_SIZE) log.shift();
    log.push({ name, params: params ?? {}, ts: Date.now() });
  } catch {
    // Tracking must never break the app.
  }
}

/**
 * Single tracking entry point. Always logs locally; dispatches to the GA4
 * dataLayer only when the app is a production build with a configured ID.
 */
export function track(name: string, params?: EventParams): void {
  logEvent(name, params);
  if (!GA_ENABLED) return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: name, ...(params ?? {}) });
  } catch {
    // Never crash on analytics plumbing.
  }
}

let lastPagePath = "";
let lastPageAt = 0;

/** Send a `page_view` on (re)load and on every client-side route change. */
export function trackPageView(pathname: string): void {
  const now = typeof performance !== "undefined" ? performance.now() : 0;
  // Guard against React strict-mode double effects / redundant dispatches.
  if (lastPagePath === pathname && now - lastPageAt < 300) return;
  lastPagePath = pathname;
  lastPageAt = now;

  track(EVENTS.pageView, {
    page_path: pathname,
    page_location: typeof window !== "undefined" ? window.location.href : pathname,
    page_title: typeof document !== "undefined" ? document.title : "",
  });
}
