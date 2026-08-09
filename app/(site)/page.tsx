import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";
import { buildWebPageSchema } from "@/lib/structured-data";

/**
 * Below-fold sections — lazy-loaded with next/dynamic to reduce initial bundle.
 * Each imports as a client component; the dynamic wrapper avoids including
 * them in the critical path while keeping SSR for SEO.
 */
const About = dynamic(
  () => import("@/components/sections/about").then((m) => m.About),
  { ssr: true }
);

const Services = dynamic(
  () => import("@/components/sections/services").then((m) => m.Services),
  { ssr: true }
);

const WhyChoose = dynamic(
  () => import("@/components/sections/why-choose").then((m) => m.WhyChoose),
  { ssr: true }
);

const Projects = dynamic(
  () => import("@/components/sections/projects").then((m) => m.Projects),
  { ssr: true }
);

const Stats = dynamic(
  () => import("@/components/sections/stats").then((m) => m.Stats),
  { ssr: true }
);

const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.Testimonials),
  { ssr: true }
);

const Partners = dynamic(
  () => import("@/components/sections/partners").then((m) => m.Partners),
  { ssr: true }
);

const Certifications = dynamic(
  () => import("@/components/sections/certifications").then((m) => m.Certifications),
  { ssr: true }
);

const Awards = dynamic(
  () => import("@/components/sections/awards").then((m) => m.Awards),
  { ssr: true }
);

const Clients = dynamic(
  () => import("@/components/sections/clients").then((m) => m.Clients),
  { ssr: true }
);

const Process = dynamic(
  () => import("@/components/sections/process").then((m) => m.Process),
  { ssr: true }
);

const CTA = dynamic(
  () => import("@/components/sections/cta").then((m) => m.CTA),
  { ssr: true }
);

/**
 * Rock Gate — premium construction & engineering landing page.
 * Critical above-fold (Hero, Ticker) load immediately.
 * Below-fold sections are lazy-loaded to reduce initial JS.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...buildWebPageSchema({
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            path: "/",
            image: "/og/rockgate-og.png",
          }),
        }}
      />
      {/* Critical above-fold — load immediately */}
      <Hero />
      <Ticker />

      {/* Below-fold — lazy-loaded */}
      <About />
      <Services />
      <WhyChoose />
      <Projects />
      <Stats />
      <Testimonials />
      <Partners />
      <Certifications />
      <Awards />
      <Clients />
      <Process />
      <CTA />
    </>
  );
}
