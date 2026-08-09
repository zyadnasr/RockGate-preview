"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { GA_ENABLED, GA_ID } from "@/lib/monitoring/config";
import { initMonitoring, onRouteChange, trackPageView } from "@/lib/monitoring";

const prevPathRef: { current: string } = { current: "" };

/**
 * Client-side analytics mount point. Always initializes the monitoring layer
 * (error capture, click/scroll tracking, production-only web vitals). Loads
 * the GA4 scripts asynchronously after hydration only in production builds
 * with a configured `NEXT_PUBLIC_GA_ID` — never blocking first paint.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();

  React.useEffect(() => {
    initMonitoring();
  }, []);

  React.useEffect(() => {
    onRouteChange(prevPathRef.current, pathname);
    prevPathRef.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  React.useEffect(() => {
    if (!GA_ENABLED) return;
    const head = document.head;

    const loader = document.createElement("script");
    loader.id = "google-analytics";
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    const init = document.createElement("script");
    init.id = "google-analytics-init";
    init.textContent =
      `window.dataLayer=window.dataLayer||[];` +
      `window.gtag=function(){window.dataLayer.push(arguments);};` +
      `window.gtag("js",new Date());` +
      `window.gtag("config","${GA_ID}",{send_page_view:false});`;

    head.appendChild(loader);
    head.appendChild(init);
  }, []);

  return null;
}
