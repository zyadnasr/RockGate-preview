"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import emblem from "@/images/RockGate-logos/rockgate-emblem.svg";

const EMBLEM_URL = typeof emblem === "string" ? emblem : emblem.src;

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-28 text-white md:py-36">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.06]" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={EMBLEM_URL} alt="" aria-hidden="true" className="pointer-events-none absolute -right-12 top-12 w-52 opacity-[0.07]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 construction-stripes opacity-50" aria-hidden="true" />
      <Container className="relative z-10">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Get in touch"
          title="Start a conversation."
          description="Tell us about your project. Our engineers will respond within one business day with a tailored proposal."
          dark
        />
      </Container>
    </section>
  );
}
