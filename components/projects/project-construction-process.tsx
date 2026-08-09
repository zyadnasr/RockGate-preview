"use client";

import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ProjectSection } from "./project-section";
import type { Project, ProjectPhase } from "@/types";

interface Props {
  project: Project;
}

/**
 * Staged construction process rendered as a numbered index. Falls back to
 * the timeline if constructionProcess is empty.
 */
export function ProjectConstructionProcess({ project }: Props) {
  const phases = project.constructionProcess;
  if (!phases || phases.length === 0) return null;

  return (
    <ProjectSection
      eyebrow="Delivery method"
      title="Construction process."
      description="How Rock Gate organised the works from enablement through completion."
    >
      <Stagger className="relative mt-12 space-y-0" stagger={0.12}>
        <div className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        {phases.map((phase, i) => (
          <StaggerItem key={i}>
            <PhaseRow phase={phase} index={phase.index ?? String(i + 1).padStart(2, "0")} />
          </StaggerItem>
        ))}
      </Stagger>
    </ProjectSection>
  );
}

function PhaseRow({ phase, index }: { phase: ProjectPhase; index: string }) {
  return (
    <div className="relative grid grid-cols-[2.75rem_1fr] gap-7 py-8">
      <div className="flex justify-center pt-1">
        <span className="relative z-10 grid h-10 w-10 place-items-center bg-white dark:bg-transparent">
          <span className="absolute inset-0 h-full w-full rotate-45 border border-accent/50" aria-hidden="true" />
          <span className="relative font-mono text-xs font-semibold text-accent tnum">
            {index}
          </span>
        </span>
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-foreground">{phase.title}</h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {phase.description}
        </p>
      </div>
    </div>
  );
}
