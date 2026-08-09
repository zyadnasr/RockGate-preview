"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

/** Tabular technical specification grid for the project dossier. */
export function ProjectTechnicalSpecs({ project }: Props) {
  const specs = project.technicalSpecifications;
  if (specs.length === 0) return null;

  return (
    <ProjectSection eyebrow="Technical record" title="Key specifications." bg="surface">
      <FadeIn className="mt-12">
        <dl className="divide-y divide-border border-y border-border">
          {specs.map((spec, i) => (
            <div
              key={i}
              className="grid grid-cols-[10rem_1fr] gap-6 py-6 sm:grid-cols-[14rem_1fr] sm:gap-10"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="font-display text-lg font-semibold text-foreground sm:text-xl">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </FadeIn>
    </ProjectSection>
  );
}
