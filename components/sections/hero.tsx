"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Award, ChevronDown, Crosshair, Ruler, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HydrateOnIdle } from "@/components/ui/hydrate-on-idle";
import heroConstruction from "@/images/hero/hero-construction.avif";
import emblem from "@/images/RockGate-logos/rockgate-emblem.svg";

const ENTRANCE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const EMBLEM_URL = typeof emblem === "string" ? emblem : emblem.src;

const FloatingParticles = dynamic(
  () =>
    import("@/components/animations/particles").then((m) => m.FloatingParticles),
  { ssr: false },
);

const HERO_IMAGE = heroConstruction;

/**
 * Cinematic construction hero with Ken Burns image motion, scroll parallax,
 * mouse-depth content, restrained technical overlays, ambient particles,
 * magnetic CTAs, and a scroll cue.
 */
export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = React.useState(false);
  const readyRef = React.useRef(false);
  const markReady = React.useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    setHeroReady(true);
  }, []);

  // heroReady gates the ambient particles only (the photo is CSS-faded and
  // SSR-visible, so it never blocks the reveal). The fallback timer guarantees
  // particles appear even if the image `load` event was missed (cached/fast).
  React.useEffect(() => {
    const t = window.setTimeout(markReady, 1400);
    return () => window.clearTimeout(t);
  }, [markReady]);

  // Ken Burns starts only once LCP is recorded (buffered or live) so the
  // scale animation never competes with first paint; a fallback timer
  // guarantees it still begins if LCP is slow to resolve.
  const [afterLcp, setAfterLcp] = React.useState(false);
  React.useEffect(() => {
    let observer: PerformanceObserver | null = null;
    let timer = 0;
    try {
      observer = new PerformanceObserver((list) => {
        if (list.getEntries().length === 0) return;
        setAfterLcp(true);
        window.clearTimeout(timer);
        try {
          observer?.disconnect();
        } catch {}
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      setAfterLcp(true);
    }
    timer = window.setTimeout(() => setAfterLcp(true), 3000);
    return () => {
      window.clearTimeout(timer);
      try {
        observer?.disconnect();
      } catch {}
    };
  }, []);

  // Pause budget-heavy work (Ken Burns + mouse depth) whenever the hero
  // scrolls out of view; resume automatically when it returns.
  const inView = useInView(ref, { amount: 0.1 });
  const inViewRef = React.useRef(true);
  React.useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      // Mouse depth activates only once the hero is interactive (reveal
      // complete) and only while the hero is on screen.
      if (!readyRef.current || !inViewRef.current) return;
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX / innerWidth - 0.5) * 2) * 20);
      mouseY.set(((e.clientY / innerHeight - 0.5) * 2) * 12);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={ref}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0a0a0a] text-white"
    >
      <motion.div className="absolute inset-0" style={{ y, opacity: bgOpacity }}>
        {/* Background photo. Visible in SSR so the hero never renders empty
            before hydration; the image itself fades in via CSS once loaded. */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 origin-center ${
              afterLcp
                ? inView
                  ? "animate-ken-burns"
                  : "animate-ken-burns [animation-play-state:paused]"
                : ""
            }`}
          >
            <Image
              src={HERO_IMAGE}
              alt="Construction site with tower cranes at dusk"
              fill
              priority
              fetchPriority="high"
              quality={70}
              sizes="100vw"
              onLoad={markReady}
              style={{ animation: "hero-fade 0.9s ease both" }}
              className="object-cover"
            />
          </div>
        </div>
        {/* Static overlays for legibility — no longer gated on JS readiness. */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/45" />
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[160px]"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[1] blueprint-grid opacity-[0.06]" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EMBLEM_URL} alt="" aria-hidden="true" className="absolute left-[8%] top-[26%] w-[150px] opacity-[0.16] sm:w-[190px] lg:w-[240px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EMBLEM_URL} alt="" aria-hidden="true" className="absolute bottom-[16%] right-[10%] w-[150px] opacity-[0.16] sm:w-[190px] lg:w-[240px]" />
        <div className="absolute left-[8%] top-[26%] hidden h-px w-40 bg-accent/40 sm:block" />
        <div className="absolute bottom-[16%] right-[10%] hidden h-px w-40 bg-accent/40 sm:block" />
        <span className="absolute left-[8%] top-[calc(26%+12rem)] hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 sm:flex">
          <Crosshair className="h-3 w-3 text-accent" />
          RG / SITE 001
        </span>
      </div>

      <HydrateOnIdle idleDelay={250}>
        {heroReady && <FloatingParticles count={16} />}
      </HydrateOnIdle>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-px construction-stripes opacity-60" aria-hidden="true" />

      <motion.div
        className="grain relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-8"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="max-w-3xl"
          style={{ x: springMouseX, y: springMouseY }}
        >
          {/* Entrance runs at parse time via CSS so the hero content is
              visible before hydration; delays mirror the old stagger. */}
          <div
            className="max-w-3xl"
            style={{ animation: `hero-child 1s ${ENTRANCE_EASE} both 0.3s` }}
          >
            <Badge variant="dark" className="border-accent/30 text-accent">
              <ShieldCheck className="mr-2 h-3.5 w-3.5" />
              Construction & engineering / Cairo, Egypt
            </Badge>
          </div>

          <h1
            className="mt-7 font-display text-4xl font-extrabold leading-[1.04] tracking-tightest text-balance sm:text-6xl lg:text-7xl"
            style={{ animation: `hero-child 1s ${ENTRANCE_EASE} both 0.44s` }}
          >
            Built for the work.
            <br />
            <span className="text-gradient-gold">Ready for what is next.</span>
          </h1>

          <p
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 text-pretty sm:text-xl"
            style={{ animation: `hero-child 1s ${ENTRANCE_EASE} both 0.58s` }}
          >
            An accountable construction and engineering partner for ambitious
            developments across Egypt — from first brief to final handover.
          </p>

          <div
            className="mt-11 flex flex-wrap gap-4"
            style={{ animation: `hero-child 1s ${ENTRANCE_EASE} both 0.72s` }}
          >
            <MagneticButton
              asLink
              href="#contact"
              className="inline-flex"
              data-analytics="hero_cta_click"
              data-analytics-cta="get_quote"
            >
              <Button variant="gold" size="lg" className="pointer-events-none">
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </MagneticButton>
            <MagneticButton
              asLink
              href="/projects"
              className="inline-flex"
              data-analytics="hero_cta_click"
              data-analytics-cta="view_projects"
            >
              <Button
                variant="outlineGold"
                size="lg"
                className="pointer-events-none border-white/25 bg-white/5 backdrop-blur-sm hover:bg-white/10 group-hover:bg-white/10"
              >
                View Projects
              </Button>
            </MagneticButton>
          </div>

          <div
            className="mt-14 grid max-w-2xl gap-4 border-t border-white/15 pt-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"
            style={{ animation: `hero-child 1s ${ENTRANCE_EASE} both 0.86s` }}
          >
            <MiniStat icon={<Award className="h-5 w-5 text-accent" />} value="15+" label="Years operating" />
            <div className="hidden h-8 w-px bg-white/15 sm:block" aria-hidden="true" />
            <p className="max-w-sm text-xs uppercase leading-relaxed tracking-[0.16em] text-white/55">
              One accountable team across construction, engineering and handover.
            </p>
            <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 md:flex">
              <Ruler className="h-3.5 w-3.5 text-accent" />
              Cairo / EG
            </span>
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to content"
        style={{ animation: `hero-fade 1s ease both 1.8s` }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/60">Scroll</span>
          <span className="relative grid h-12 w-12 place-items-center rounded-full border border-white/25 shadow-[0_0_24px_-6px_rgba(245,180,0,0.45)]">
            <span className="absolute inset-0 animate-ping rounded-full border border-accent/40 opacity-30" />
            <ChevronDown className="h-4 w-4 text-accent" />
          </span>
        </motion.div>
      </a>
    </section>
  );
}

function MiniStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <motion.div className="flex items-center gap-3" whileHover={{ x: 4, transition: { duration: 0.3 } }}>
      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5">
        {icon}
      </span>
      <div>
        <p className="font-display text-xl font-bold text-white tnum">{value}</p>
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">{label}</p>
      </div>
    </motion.div>
  );
}
