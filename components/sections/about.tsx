"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { EASE } from "@/components/animations/motion";
import { SectionHeading } from "@/components/animations/section-heading";
import { Button } from "@/components/ui/button";
import { Section, Container } from "@/components/ui/container";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { MagneticButton } from "@/components/ui/magnetic-button";
import aboutEngineers from "@/images/about/about-engineers.webp";

const IMG_MAIN = aboutEngineers;

const HIGHLIGHTS = [
  "Licensed and insured general contractor",
  "Multi-disciplinary in-house engineering",
  "Strict HSE & quality control protocols",
  "Dedicated project teams per engagement",
];

const OPERATING_MODEL = [
  { label: "Design", value: "constructability review" },
  { label: "Cost", value: "transparent BOQ control" },
  { label: "Site", value: "dedicated project team" },
];

export function About() {
  const prefersReduced = useReducedMotion();

  return (
    <Section id="about" className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 blueprint-grid-soft opacity-25" aria-hidden="true" />
            <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <FadeIn x={-32} y={0} className="relative order-2 lg:order-1">
          {prefersReduced ? (
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-card lg:-ml-8">
              <ImageWithSkeleton
                src={IMG_MAIN}
                alt="Rock Gate engineers reviewing plans on a construction site"
                sizes="(min-width: 1024px) 46vw, 100vw"
                quality={70}
                className="hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 border-l border-accent pl-3 text-xs uppercase tracking-[0.2em] text-white/75">
                Operating since 2009
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.08 }}
              whileInView={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-card lg:-ml-8"
            >
              <ImageWithSkeleton
                src={IMG_MAIN}
                alt="Rock Gate engineers reviewing plans on a construction site"
                sizes="(min-width: 1024px) 46vw, 100vw"
                quality={70}
                className="hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 border-l border-accent pl-3 text-xs uppercase tracking-[0.2em] text-white/75">
                Operating since 2009
              </div>
            </motion.div>
          )}

          {prefersReduced ? (
            <div className="absolute -bottom-6 left-6 right-6 grid gap-4 rounded-2xl border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1a1a]/90 sm:left-auto sm:right-0 sm:w-[25rem]">
              <span className="pointer-events-none absolute -left-2 -top-2 h-2 w-2 rotate-45 border border-accent" aria-hidden="true" />
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl font-extrabold text-accent">15+</span>
                <span className="max-w-[9rem] text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                  Years of delivery discipline
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {OPERATING_MODEL.map((item) => (
                  <div key={item.label}>
                    <p className="font-bold text-foreground">{item.label}</p>
                    <p className="mt-1 leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="absolute -bottom-6 left-6 right-6 grid gap-4 rounded-2xl border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1a1a]/90 sm:left-auto sm:right-0 sm:w-[25rem]"
            >
              <span className="pointer-events-none absolute -left-2 -top-2 h-2 w-2 rotate-45 border border-accent" aria-hidden="true" />
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl font-extrabold text-accent">15+</span>
                <span className="max-w-[9rem] text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                  Years of delivery discipline
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {OPERATING_MODEL.map((item) => (
                  <div key={item.label}>
                    <p className="font-bold text-foreground">{item.label}</p>
                    <p className="mt-1 leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </FadeIn>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="About Rock Gate / 2009—Now"
            title="A construction partner built around"
            highlight="control."
            description="Rock Gate gives developers, enterprises and public-sector teams one accountable path from concept to completion — with engineering, procurement, execution and handover aligned around the same delivery plan."
          />

          <FadeIn delay={0.15} className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <p className="leading-relaxed text-muted-foreground">
                We combine technical capability with deep local knowledge of the Egyptian market. The work is coordinated through documented decisions, dedicated site leadership and quality checkpoints that keep the project visible before, during and after construction.
              </p>
              <ul className="mt-8 grid gap-4">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="border-l border-border pl-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Operating lens
              </p>
              <div className="mt-5 space-y-5 text-sm text-muted-foreground">
                <p className="flex gap-3">
                  <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Scope, BOQ and programme are aligned before site mobilisation.
                </p>
                <p className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  QA/QC and HSE checkpoints are treated as delivery controls, not decoration.
                </p>
              </div>
            </aside>
          </FadeIn>

          <FadeIn delay={0.25} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton asLink href="#services" className="inline-flex">
              <Button variant="gold" size="lg" className="pointer-events-none">
                Explore capabilities
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MagneticButton>
            <span className="border-l border-border pl-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              150+ certified engineers & managers
            </span>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
