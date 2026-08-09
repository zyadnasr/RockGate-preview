"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Section, Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

const cardLayout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
];

export function Projects() {
  const prefersReduced = useReducedMotion();

  return (
    <Section id="projects" className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 blueprint-grid-soft opacity-15" aria-hidden="true" />
            <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_0.45fr] lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work / case-study surface"
            title="Built environments"
            highlight="with documented intent."
            description="A curated project view designed like a dossier: location, category, delivery role and a short note stay visible without relying on hover."
            className="max-w-3xl"
          />
          <div className="border-l border-border pl-6 text-sm leading-relaxed text-muted-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Portfolio note
            </p>
            <p className="mt-3">
              Imagery remains illustrative until verified project photography is supplied; metadata avoids invented client or budget claims.
            </p>
          </div>
        </div>

        {prefersReduced ? (
          <div className="mt-14 grid auto-rows-[minmax(260px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {PROJECTS.map((project, i) => (
              <PrefetchLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={cn(cardLayout[i] ?? "lg:col-span-4")}
              >
                <article className="group relative flex min-h-[20rem] overflow-hidden rounded-xl bg-secondary transition-transform duration-300 hover:-translate-y-1 lg:h-full">
                  <ImageWithSkeleton
                    src={project.heroImage}
                    alt={project.heroImageAlt}
                    sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                    quality={70}
                    className="group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      <span className="h-px w-6 bg-accent" />
                      {project.category}
                    </p>
                    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                      <span className="h-1.5 w-1.5 rotate-45 bg-accent/60" aria-hidden="true" />
                      <span className="tnum">RG / {String(i + 1).padStart(2, "0")}</span>
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto w-full p-6 sm:p-7">
                    <p className="flex items-center gap-1.5 text-xs text-white/65">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {project.location}
                    </p>
                    <h3 className="mt-2 max-w-md font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/55">
                      Completed {project.year}
                      {project.scope ? ` · ${project.scope}` : ""}
                    </p>
                    <div className="mt-3 grid gap-2 border-l border-accent/60 pl-3">
                      {project.role && (
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/90">
                          Role / {project.role}
                        </p>
                      )}
                      {project.note && (
                        <p className="max-w-lg text-xs leading-relaxed text-white/78 sm:text-sm">
                          {project.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className="absolute bottom-6 right-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-[#111]"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </article>
              </PrefetchLink>
            ))}
          </div>
        ) : (
          <Stagger className="mt-14 grid auto-rows-[minmax(260px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-12" stagger={0.12}>
            {PROJECTS.map((project, i) => (
              <StaggerItem key={project.slug} className={cn(cardLayout[i] ?? "lg:col-span-4")}>
                <PrefetchLink href={`/projects/${project.slug}`}>
                  <motion.article
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group relative flex min-h-[20rem] overflow-hidden rounded-xl bg-secondary lg:h-full"
                  >
                    <ImageWithSkeleton
                      src={project.heroImage}
                      alt={project.heroImageAlt}
                      sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                      quality={70}
                      className="group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        <span className="h-px w-6 bg-accent" />
                        {project.category}
                      </p>
                      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                        <span className="h-1.5 w-1.5 rotate-45 bg-accent/60" aria-hidden="true" />
                        <span className="tnum">RG / {String(i + 1).padStart(2, "0")}</span>
                      </p>
                    </div>

                    <div className="relative z-10 mt-auto w-full p-6 sm:p-7">
                      <p className="flex items-center gap-1.5 text-xs text-white/65">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {project.location}
                      </p>
                      <h3 className="mt-2 max-w-md font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/55">
                        Completed {project.year}
                        {project.scope ? ` · ${project.scope}` : ""}
                      </p>
                      <div className="mt-3 grid gap-2 border-l border-accent/60 pl-3">
                        {project.role && (
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/90">
                            Role / {project.role}
                          </p>
                        )}
                        {project.note && (
                          <p className="max-w-lg text-xs leading-relaxed text-white/78 sm:text-sm">
                            {project.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className="absolute bottom-6 right-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-[#111]"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </motion.article>
                </PrefetchLink>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </Section>
  );
}
