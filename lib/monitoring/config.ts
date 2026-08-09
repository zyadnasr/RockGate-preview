/**
 * Build-time analytics configuration. Only `NEXT_PUBLIC_*` values reach the
 * browser. Analytics are never dispatched unless the app runs a production
 * build AND a measurement ID is configured — missing env is a no-op, never a
 * crash.
 */
export const IS_PRODUCTION = process.env.NODE_ENV === "production";

/** Google Analytics 4 measurement ID (e.g. `G-XXXXXXX`). */
export const GA_ID = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();

/** True only when the app can actually send events (prod build + ID present). */
export const GA_ENABLED = IS_PRODUCTION && GA_ID.length > 0;
