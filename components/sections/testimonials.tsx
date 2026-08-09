"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { FadeIn } from "@/components/animations/fade-in";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { EASE } from "@/components/animations/motion";
import { TESTIMONIALS } from "@/lib/data";

const [featured, ...rest] = TESTIMONIALS;

export function Testimonials() {
  const prefersReduced = useReducedMotion();

  return (
    <Section id="testimonials" className="relative overflow-hidden bg-white dark:bg-transparent">
      <div className="pointer-events-none absolute inset-0 blueprint-grid-soft opacity-10" aria-hidden="true" />
            <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Client perspective / selected voices"
            title="The work is judged"
            highlight="in use."
            description="The strongest proof is what remains after handover: dependable spaces, clear documentation and teams willing to recommend the process."
          />

          <div className="space-y-8">
            {/* Featured quote */}
            {prefersReduced ? (
              <figure className="relative border-l-2 border-accent pl-7">
                <span className="pointer-events-none absolute -left-2 -top-2 h-2 w-2 rotate-45 border border-accent" aria-hidden="true" />
                <span className="pointer-events-none absolute -right-2 top-0 label-engineering text-accent/40">CLIENT RECORD / REV A</span>
                <blockquote className="font-display text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-sm font-semibold text-foreground">
                    {featured.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {featured.role}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">
                    {featured.company}
                  </span>
                </figcaption>
                <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="border border-border px-2 py-0.5">{featured.sector}</span>
                  <span className="border border-border px-2 py-0.5">{featured.projectType}</span>
                </div>
              </figure>
            ) : (
              <motion.figure
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="relative border-l-2 border-accent pl-7"
              >
                <span className="pointer-events-none absolute -left-2 -top-2 h-2 w-2 rotate-45 border border-accent" aria-hidden="true" />
                <span className="pointer-events-none absolute -right-2 top-0 label-engineering text-accent/40">CLIENT RECORD / REV A</span>
                <blockquote className="font-display text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-sm font-semibold text-foreground">
                    {featured.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {featured.role}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">
                    {featured.company}
                  </span>
                </figcaption>
                <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="border border-border px-2 py-0.5">{featured.sector}</span>
                  <span className="border border-border px-2 py-0.5">{featured.projectType}</span>
                </div>
              </motion.figure>
            )}

            {/* Supporting quotes */}
            {prefersReduced ? (
              <div className="divide-y divide-border border-y border-border">
                {rest.map((t) => (
                  <figure key={t.author} className="py-6">
                    <blockquote className="text-base leading-relaxed text-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-sm font-semibold text-foreground">
                        {t.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t.role}, {t.company}
                      </span>
                      <span className="hidden sm:block">
                        <span className="h-1 w-1 rounded-full bg-border inline-block" aria-hidden="true" />
                      </span>
                      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        <span className="border border-border px-2 py-0.5">{t.sector}</span>
                        <span className="border border-border px-2 py-0.5">{t.projectType}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <Stagger className="divide-y divide-border border-y border-border" stagger={0.08}>
                {rest.map((t) => (
                  <StaggerItem key={t.author}>
                    <figure className="py-6">
                      <blockquote className="text-base leading-relaxed text-foreground">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-sm font-semibold text-foreground">
                          {t.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </span>
                        <span className="hidden sm:block">
                          <span className="h-1 w-1 rounded-full bg-border inline-block" aria-hidden="true" />
                        </span>
                        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          <span className="border border-border px-2 py-0.5">{t.sector}</span>
                          <span className="border border-border px-2 py-0.5">{t.projectType}</span>
                        </span>
                      </figcaption>
                    </figure>
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
