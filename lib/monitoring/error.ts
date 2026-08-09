import { EVENTS } from "./events";
import { track, type EventParams } from "./track";

/**
 * Capture a runtime error through the monitoring abstraction. No provider is
 * installed yet (Sentry/LogRocket can slot in here later), so for now errors
 * are recorded in the event log and forwarded to GA4 in production.
 */
export function captureError(error: unknown, context?: string): void {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  const params: EventParams = {
    message: message.slice(0, 200) || "Unknown error",
    context: context ?? "client",
  };
  if (stack) params.stack = stack.slice(0, 500);
  track(EVENTS.errorCaptured, params);
}

/** Global error capture: uncaught exceptions and unhandled promise rejections. */
export function installErrorListeners(): void {
  window.addEventListener("error", (event) => {
    // Ignore failures caused by the analytics scripts themselves.
    if (event.filename && event.filename.includes("googletagmanager.com")) return;
    const message = event.error instanceof Error ? event.error.message : event.message;
    track(EVENTS.errorCaptured, {
      message: message.slice(0, 200) || "Script error",
      source: event.filename
        ? `${event.filename}:${event.lineno}:${event.colno}`
        : "script",
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    captureError(reason, "unhandledrejection");
  });
}
