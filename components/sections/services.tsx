"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, FileCheck2 } from "lucide-react";
import { Section, Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";

const STACK = ["scope", "programme", "procurement", "qa/qc", "handover"];

/** Editorial capability system — an indexed operating table, not a card grid. */
export function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <Section id="services" className="relative overflow-clip bg-white dark:bg-transparent">
      <div className="pointer-events-none absolute inset-0 blueprint-grid-soft opacity-10" aria-hidden="true" />
            <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Capabilities / operating table"
              title="Specialist scopes under"
              highlight="one accountable lead."
              description="The work is divided into clear capabilities, but the delivery is not fragmented. Every discipline feeds the same programme, budget and quality record."
            />

            <div className="mt-10 border-l border-border pl-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                <FileCheck2 className="h-4 w-4" />
                Delivery stack
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {STACK.map((item) => (
                  <span
                    key={item}
                    className="border border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {prefersReduced ? (
            <div className="relative divide-y divide-border border-y border-border">
              {SERVICES.map((service, i) => (
                <a
                  key={service.slug}
                  href="#contact"
                  className={cn(
                    "group grid gap-5 py-8 transition-transform duration-300 hover:translate-x-2 focus-visible:relative focus-visible:z-10 focus-visible:rounded-lg sm:grid-cols-[4rem_1fr_auto] sm:items-start",
                    i % 2 === 1 && "lg:pl-10",
                  )}
                  aria-label={`Discuss ${service.title} with Rock Gate`}
                >
                  <span className="font-mono text-sm text-accent tnum">{service.index}</span>
                  <span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {service.title}
                      <span className="text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground">
                        / capability
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </span>
                    <span className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
                      <Check className="h-3.5 w-3.5 text-accent" />
                      {service.detail}
                    </span>
                  </span>
                  <span className="hidden items-center gap-3 text-right sm:flex">
                    <span className="h-1.5 w-1.5 rotate-45 bg-accent/30" aria-hidden="true" />
                    <service.icon
                      className="h-7 w-7 text-accent/60 transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 group-hover:text-accent"
                      strokeWidth={1.35}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <Stagger className="relative divide-y divide-border border-y border-border" stagger={0.07} delay={0.05}>
              {SERVICES.map((service, i) => (
                <StaggerItem key={service.slug}>
                  <motion.a
                    href="#contact"
                    whileHover={{ x: 8 }}
                    className={cn(
                      "group grid gap-5 py-8 focus-visible:relative focus-visible:z-10 focus-visible:rounded-lg sm:grid-cols-[4rem_1fr_auto] sm:items-start",
                      i % 2 === 1 && "lg:pl-10"
                    )}
                    aria-label={`Discuss ${service.title} with Rock Gate`}
                  >
                    <span className="font-mono text-sm text-accent tnum">{service.index}</span>
                    <span>
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {service.title}
                        <span className="text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground">
                          / capability
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      </span>
                      <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </span>
                      <span className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
                        <Check className="h-3.5 w-3.5 text-accent" />
                        {service.detail}
                      </span>
                    </span>
                    <span className="hidden items-center gap-3 text-right sm:flex">
                      <span className="h-1.5 w-1.5 rotate-45 bg-accent/30" aria-hidden="true" />
                      <service.icon
                        className="h-7 w-7 text-accent/60 transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 group-hover:text-accent"
                        strokeWidth={1.35}
                        aria-hidden="true"
                      />
                    </span>
                  </motion.a>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default Services;
