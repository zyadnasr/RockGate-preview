"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { EASE } from "@/components/animations/motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FadeIn } from "@/components/animations/fade-in";
import { SplitText } from "@/components/animations/split-text";

import { COMPANY } from "@/lib/data";

/**
 * Final call-to-action band. Cinematic dark gradient background with
 * SplitText heading, blur entrance, magnetic CTAs, and staggered reveals.
 */
export function CTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.05]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 construction-stripes opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111118] to-[#0c0c14]" />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-accent/12 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[350px] w-[350px] rounded-full bg-accent/8 blur-[140px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-40" aria-hidden="true" />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:text-left">
        {prefersReduced ? (
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Project consultation / within one business day
            </span>

            <h2 className="mt-8 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tightest text-balance text-white sm:text-5xl md:text-6xl">
              Bring the next build into focus.
            </h2>

            <p className="mt-8 max-w-xl text-lg text-white/65 text-pretty">
              Tell us about your project — our engineers will respond within
              one business day with a tailored proposal.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                Project consultation / within one business day
              </span>

              <SplitText
                as="h2"
                mode="words"
                className="mt-8 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tightest text-balance text-white sm:text-5xl md:text-6xl"
                text="Bring the next build into focus."
              />

              <FadeIn delay={0.2} className="mt-8">
                <p className="max-w-xl text-lg text-white/65 text-pretty">
                  Tell us about your project — our engineers will respond within
                  one business day with a tailored proposal.
                </p>
              </FadeIn>
            </FadeIn>
          </motion.div>
        )}

        <div className="lg:border-l lg:border-white/15 lg:pl-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">A clear next step</p>
          <ol className="mb-8 space-y-4 text-sm text-white/65">
            <li className="flex gap-3"><span className="font-mono text-accent">01</span> Share your brief and priorities.</li>
            <li className="flex gap-3"><span className="font-mono text-accent">02</span> Review scope with our team.</li>
            <li className="flex gap-3"><span className="font-mono text-accent">03</span> Receive a tailored next step.</li>
          </ol>

          <FadeIn delay={0.3} className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton asLink href="/contact" className="inline-flex">
              <Button variant="gold" size="lg" className="pointer-events-none group">
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </MagneticButton>
            <MagneticButton asLink href={COMPANY.phoneHref} className="inline-flex">
              <Button
                variant="outlineGold"
                size="lg"
                className="pointer-events-none border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </Button>
            </MagneticButton>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-14 flex flex-wrap items-center gap-8 text-sm text-white/55">
            <a
              href={COMPANY.phoneHref}
              className="group inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Phone className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              {COMPANY.phone}
            </a>
            <a
              href={COMPANY.emailHref}
              className="group inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110" />
              {COMPANY.email}
            </a>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
