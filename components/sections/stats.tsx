"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/animations/counter";
import { FadeIn } from "@/components/animations/fade-in";
import { EASE } from "@/components/animations/motion";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { STATS } from "@/lib/data";

const SOURCE_LABEL = "Operating metric · since 2009";

export function Stats() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="stats" className="relative overflow-hidden bg-[#111] py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 construction-stripes opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]" aria-hidden="true" />

      <Container className="relative z-10">
        <FadeIn className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">At a glance / operating scale</p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tightest sm:text-4xl">
              An operating dashboard, not marketing counters.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-white/55">
            Selected values are kept visible because they frame the kind of organisation clients engage — volume, capability depth, coverage and delivery reputation.
          </p>
        </FadeIn>

        {prefersReduced ? (
          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="group border-l border-white/15 pl-5">
                <p className="font-display text-5xl font-extrabold tracking-tight text-gradient-gold tnum sm:text-6xl">
                  <Counter to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </p>
                <span className="mt-5 block h-px w-full origin-left bg-gradient-to-r from-accent/70 to-transparent" />
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-white/50">{stat.label}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-white/30">{SOURCE_LABEL}</p>
              </div>
            ))}
          </div>
        ) : (
          <Stagger className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4" stagger={0.12}>
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="group border-l border-white/15 pl-5">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-gradient-gold tnum sm:text-6xl">
                    <Counter to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </p>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                    className="mt-5 block h-px w-full origin-left bg-gradient-to-r from-accent/70 to-transparent"
                  />
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-white/50">{stat.label}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-white/30">{SOURCE_LABEL}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </section>
  );
}
