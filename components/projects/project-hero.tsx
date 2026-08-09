"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import emblem from "@/images/RockGate-logos/rockgate-emblem.svg";
import type { Project } from "@/types";

const EMBLEM_URL = typeof emblem === "string" ? emblem : emblem.src;

interface ProjectHeroProps {
  project: Project;
}

/** Load-in choreography for the hero content — reduced-motion aware. */
const heroVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const ref = React.useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 1.08]);

  const animate = prefersReduced ? false : "show";

  return (
    <section ref={ref} className="relative h-[82vh] min-h-[560px] overflow-hidden bg-[#0a0a0a]">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y, scale }}
      >
        <ImageWithSkeleton
          src={project.heroImage}
          alt={project.heroImageAlt}
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.06]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={EMBLEM_URL} alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 top-10 w-44 opacity-[0.1]" />

      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-0 z-10 px-6 pb-14 pt-32 lg:px-8"
      >
        <motion.div
          className="mx-auto max-w-7xl"
          variants={heroVariants}
          initial="hidden"
          animate={animate}
        >
          <motion.p
            variants={itemVariants}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent"
          >
            <span className="h-2 w-2 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
            {project.category} / {project.year}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-5 max-w-5xl font-display text-5xl font-extrabold leading-[1.02] tracking-tightest text-white text-balance sm:text-6xl md:text-7xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 flex items-center gap-2 text-base text-white/60"
          >
            <MapPin className="h-5 w-5 text-accent" />
            {project.location}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/15 pt-8"
          >
            <MetaItem label="Scope" value={project.scope || "Full delivery scope"} />
            <MetaItem label="Role" value={project.role || "General contracting"} />
            <MetaItem label="Area" value={project.results?.[0]?.value || "—"} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
      <p className="mt-1 font-display text-sm font-semibold text-white/85">{value}</p>
    </div>
  );
}
