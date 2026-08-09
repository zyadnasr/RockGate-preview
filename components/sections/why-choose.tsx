"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { FEATURES } from "@/lib/data";

export function WhyChoose() {
  const prefersReduced = useReducedMotion();

  return (
    <Section id="why-us" className="relative overflow-hidden bg-[#0c0c0c] text-white">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[180px]" aria-hidden="true" />
            <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            dark
            align="left"
            eyebrow="Delivery proof / 06 controls"
            title="Confidence is"
            highlight="a process."
            description="The value is in the operating discipline behind the build: visible decisions, controlled cost and no surprises at handover."
          />

          {prefersReduced ? (
            <div className="divide-y divide-white/10 border-y border-white/10">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className="group grid gap-4 py-6 transition-transform duration-300 hover:translate-x-2 sm:grid-cols-[3rem_1fr_auto] sm:items-start"
                >
                  <span className="font-mono text-sm text-accent tnum">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                      {feature.description}
                    </p>
                  </div>
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/45">
                    <Check className="h-4 w-4 text-accent" /> controlled
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Stagger className="divide-y divide-white/10 border-y border-white/10" stagger={0.08}>
              {FEATURES.map((feature, i) => (
                <StaggerItem key={feature.title}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="group grid gap-4 py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-start"
                  >
                    <span className="font-mono text-sm text-accent tnum">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold">{feature.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                        {feature.description}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/45">
                      <Check className="h-4 w-4 text-accent" /> controlled
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
        <a
          href="#contact"
          className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white"
        >
          Discuss your delivery requirements <ArrowUpRight className="h-4 w-4" />
        </a>
      </Container>
    </Section>
  );
}
