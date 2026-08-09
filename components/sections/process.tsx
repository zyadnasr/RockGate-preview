"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { PROCESS } from "@/lib/data";

const DELIVERABLES = [
  "Brief + site assessment",
  "Scope + BOQ alignment",
  "Programme + procurement",
  "QA/QC + site reporting",
  "Handover + support",
];

/** Vertical timeline with connecting line — a technical delivery workflow, not another indexed list. */
export function Process() {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="process" className="relative bg-surface">
      <div className="pointer-events-none absolute inset-0 blueprint-grid-soft opacity-20" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Delivery system / 01—05"
            title="Control the detail."
            highlight="Protect the outcome."
            description="A transparent operating rhythm keeps decisions visible, risks mapped and every handover documented."
          />

          <div ref={ref} className="relative">
            {/* Scroll-drawn vertical connector line */}
            {prefersReduced ? (
              <div
                className="absolute left-[1.15rem] top-0 bottom-0 w-px bg-gradient-to-b from-accent/80 to-border"
                aria-hidden="true"
              />
            ) : (
              <motion.div
                style={{ scaleY: lineScale }}
                className="absolute left-[1.15rem] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent/80 to-border"
                aria-hidden="true"
              />
            )}

            {prefersReduced ? (
              <div className="space-y-0">
                {PROCESS.map((step, i) => (
                  <div key={step.title} className={`relative grid grid-cols-[2.5rem_1fr] gap-6 py-7 ${i % 2 === 1 ? "lg:pl-8" : ""}`}>
                    <div className="flex justify-center pt-1">
                      <span className="relative z-10 grid h-9 w-9 place-items-center bg-surface">
                        <span className="absolute inset-0 h-full w-full rotate-45 border border-accent/50" aria-hidden="true" />
                        <span className="relative font-mono text-xs font-semibold text-accent tnum">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="dimension-line w-3 text-accent/40" />
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                          {DELIVERABLES[i]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Stagger className="space-y-0" stagger={0.1}>
                {PROCESS.map((step, i) => (
                  <StaggerItem key={step.title}>
                    <div className={`relative grid grid-cols-[2.5rem_1fr] gap-6 py-7 ${i % 2 === 1 ? "lg:pl-8" : ""}`}>
                      <div className="flex justify-center pt-1">
                        <span className="relative z-10 grid h-9 w-9 place-items-center bg-surface">
                          <span className="absolute inset-0 h-full w-full rotate-45 border border-accent/50" aria-hidden="true" />
                          <span className="relative font-mono text-xs font-semibold text-accent tnum">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="dimension-line w-3 text-accent/40" />
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                            {DELIVERABLES[i]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
