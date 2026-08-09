import { EVENTS } from "./events";
import { track } from "./track";

let navStart = 0;
let firedDepths = new Set<number>();

const DEPTH_THRESHOLDS = [25, 50, 75, 90];

/** Remember when a click that navigates to an internal route happened. */
export function markNavStart(): void {
  navStart = performance.now();
}

/** Read and clear the pending navigation start time, if any. */
export function consumeNavStart(): number | null {
  const start = navStart;
  navStart = 0;
  return start || null;
}

/** Reset one-shot tracking state on each route change. */
export function resetScrollDepth(): void {
  firedDepths = new Set<number>();
}

function isInternalRoute(href: string): boolean {
  return /^\/(?!\/)/.test(href) && !href.startsWith("/#");
}

/** `data-analytics-foo-bar` → `{ foo_bar }` (the event name is `data-analytics`). */
function datasetToParams(dataset: DOMStringMap): Record<string, string> {
  const params: Record<string, string> = {};
  for (const key of Object.keys(dataset)) {
    if (key === "analytics" || !key.startsWith("analytics")) continue;
    const snake = key
      .slice("analytics".length)
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      .toLowerCase();
    const value = dataset[key];
    if (value !== undefined) params[snake] = value;
  }
  return params;
}

/**
 * Fire the event declared on an element via `data-analytics`. Returns `true`
 * when the click was handled here (so the default link classification is
 * skipped) — including the `data-analytics=""` sentinel used on elements that
 * dispatch through their own explicit handlers.
 */
function fireDataAnalytics(element: Element): boolean {
  if (!element.hasAttribute("data-analytics")) return false;
  const name = element.getAttribute("data-analytics") ?? "";
  if (!name) return true; // already tracked explicitly elsewhere
  track(name, datasetToParams((element as HTMLElement).dataset));
  if (element instanceof HTMLAnchorElement && isInternalRoute(element.getAttribute("href") ?? "")) {
    markNavStart();
  }
  return true;
}

function onDocumentClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const tracked = target.closest("[data-analytics]");
  if (tracked && fireDataAnalytics(tracked)) return;

  const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
  if (!anchor) return;
  const href = anchor.getAttribute("href") ?? "";

  if (href.startsWith("tel:")) {
    track(EVENTS.phoneClick, { href });
    return;
  }
  if (href.startsWith("mailto:")) {
    track(EVENTS.emailClick, { href });
    return;
  }

  let isExternal = false;
  try {
    isExternal = new URL(anchor.href).origin !== window.location.origin;
  } catch {
    isExternal = true;
  }
  if (isExternal || anchor.target === "_blank") {
    track(EVENTS.outboundClick, { url: href });
    return;
  }

  const label = (anchor.textContent ?? "").trim().slice(0, 64) || href;

  if (href.startsWith("#")) {
    track(EVENTS.navClick, { href, label });
    return;
  }
  if (isInternalRoute(href)) {
    track(EVENTS.navClick, { href, label });
    markNavStart();
  }
}

/** Delegated, capture-phase click tracking — exactly one event per click. */
export function installClickTracking(): void {
  document.addEventListener("click", onDocumentClick, true);
}

function onScroll(): void {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return;
  const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
  for (const threshold of DEPTH_THRESHOLDS) {
    if (pct >= threshold && !firedDepths.has(threshold)) {
      firedDepths.add(threshold);
      track(EVENTS.scrollDepth, { depth: threshold });
    }
  }
}

let scrollTicking = false;

/** Scroll-depth milestones (25/50/75/90%), fired once per depth per route. */
export function installScrollDepthTracking(): void {
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        onScroll();
      });
    },
    { passive: true },
  );
}
