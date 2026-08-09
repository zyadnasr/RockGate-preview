"use client";

import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

/**
 * Project results — measurable outcome metrics presented as a premium
 * stat block with animated count-up. The client testimonial is rendered
 * separately by ProjectTestimonial.
 */
export function ProjectResults({ project }: Props) {
  const results = project.results;
  if (!results || results.length === 0) return null;

  return (
    <ProjectSection
      eyebrow="Proof of delivery"
      title="Project results."
      description="Measurable outcomes recorded for the case study."
    >
      <Stagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {results.map((r, i) => (
          <StaggerItem key={i} className="bg-white dark:bg-background">
            <div className="flex h-full flex-col justify-between gap-8 p-8 sm:p-10">
              <p className="font-display text-5xl font-extrabold tracking-tight text-gradient-gold tnum lg:text-6xl">
                {r.value}
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {r.label}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </ProjectSection>
  );
}
