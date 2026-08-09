import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";
import logoDark from "@/images/RockGate-logos/rockgate-logo-dark-transparent.svg";
import emblem from "@/images/RockGate-logos/rockgate-emblem.svg";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const toAssetUrl = (asset: string | { src: string }) => (typeof asset === "string" ? asset : asset.src);
const LOGO_DARK_URL = toAssetUrl(logoDark);
const EMBLEM_URL = toAssetUrl(emblem);

// Google Search Console verification via meta tag (set GSC_VERIFICATION_ID).
// The HTML-file variant is served config-driven at /[GSC_VERIFICATION_FILE].
const GSC_VERIFICATION_ID = process.env.GSC_VERIFICATION_ID?.trim();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Rock Gate",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "construction company Egypt",
    "general contractor Cairo",
    "engineering services Egypt",
    "interior finishing",
    "infrastructure",
    "project management",
    "Rock Gate",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "en_EG",
    url: "/",
    siteName: COMPANY.name,
    title: "Rock Gate — Building Excellence. Creating the Future.",
    description: "World-class construction and engineering solutions across Egypt.",
    images: [
      {
        url: "/og/rockgate-og.png",
        width: 1200,
        height: 630,
        alt: "Rock Gate — Building Excellence. Creating the Future.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock Gate — Building Excellence. Creating the Future.",
    description: "World-class construction and engineering solutions across Egypt.",
    images: ["/og/rockgate-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: LOGO_DARK_URL, type: "image/svg+xml", sizes: "any" },
      { url: "/icons/rockgate-64.png", type: "image/png", sizes: "64x64" },
      { url: "/icons/rockgate-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/rockgate-192.png", type: "image/png", sizes: "192x192" }],
  },
  alternates: { canonical: "/" },
  category: "construction",
  verification: GSC_VERIFICATION_ID ? { google: GSC_VERIFICATION_ID } : undefined,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [buildOrganizationSchema(), buildWebSiteSchema()],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        {/* First-visit splash. Runs synchronously before the app content is
            painted so it covers the SSR gap that a hydration-gated React splash
            cannot. Reads sessionStorage + prefers-reduced-motion here (so no
            flash for returning visitors) and owns its own dismissal — it never
            waits on React or window.load timing. Brand sequence: background
            fade → the official Rock Gate emblem scales in under a gold
            illumination glow → gentle dissolve (seamless handoff into the dark
            hero). The emblem is the real official SVG asset, not a recreated
            path. All motion is CSS opacity/transform on the
            compositor. Reduced-motion users get no animation at all
            (simplified). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var KEY = "rg-splash-seen";
    if (!window.sessionStorage || sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    var t0 = performance.now();
    var st = document.createElement("style");
    st.textContent = "@keyframes rg-splash-bg{from{opacity:0}to{opacity:1}}@keyframes rg-splash-scale{from{opacity:0;transform:scale(.82)}to{opacity:1;transform:scale(1)}}@keyframes rg-splash-glow{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}.rg-splash-bg{animation:rg-splash-bg .8s ease-out both}.rg-splash-glyph{animation:rg-splash-scale .6s cubic-bezier(.22,1,.36,1) both}.rg-splash-glow{animation:rg-splash-glow .75s cubic-bezier(.22,1,.36,1) .12s both}";
    document.head.appendChild(st);
    var w = document.createElement("div");
    w.setAttribute("data-splash", "1");
    w.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#0a0a0a;pointer-events:none;";
    var LOGO = ${JSON.stringify(EMBLEM_URL)};
    w.innerHTML =
      '<div class="rg-splash-bg" style="position:absolute;inset:0;background-image:radial-gradient(circle at 50% 44%,rgba(245,180,0,.10),transparent 55%),linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);background-size:auto,56px 56px,56px 56px"></div>' +
      '<span style="position:relative;z-index:1;display:block">' +
      '<span class="rg-splash-glow" style="position:absolute;left:50%;top:50%;width:240px;height:240px;margin:-120px 0 0 -120px;border-radius:9999px;background:radial-gradient(circle,rgba(245,180,0,.22),rgba(245,180,0,.05) 42%,transparent 68%)"></span>' +
      '<img class="rg-splash-glyph" src="' + LOGO + '" alt="" aria-hidden="true" width="240" height="170" draggable="false" style="position:relative;display:block">' +
      "</span>";
    document.documentElement.appendChild(w);
    var gone = false;
    var dismiss = function () {
      if (gone) return;
      gone = true;
      w.style.transition = "opacity .6s ease";
      w.style.opacity = "0";
      setTimeout(function () { if (w.parentNode) w.parentNode.removeChild(w); }, 700);
    };
    var minElapsed = function () { return performance.now() - t0 >= 600; };
    setTimeout(function () {
      if (document.readyState === "complete" || document.readyState === "interactive") dismiss();
    }, 600);
    setTimeout(dismiss, 1800);
    if (document.readyState !== "complete") {
      window.addEventListener("load", function () { if (minElapsed()) dismiss(); }, { once: true });
    }
  } catch (e) {}
})();`,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <AnalyticsProvider />
        </ThemeProvider>
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
