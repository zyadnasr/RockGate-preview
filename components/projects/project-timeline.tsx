"use client";

import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ProjectSection } from "./project-section";
import type { Project, ProjectMilestone } from "@/types";

interface ProjectTimelineProps {
  project: Project;
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  const milestones = project.timeline;
  if (!milestones || milestones.length === 0) return null;

  return (
    <ProjectSection
      eyebrow="Delivery programme"
      title="Project timeline."
      description="Key milestones from mobilisation through handover."
    >
      <Stagger className="relative mt-12 space-y-0" stagger={0.12}>
        <div className="absolute left-[1.35rem] top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        {milestones.map((m, i) => (
          <StaggerItem key={i}>
            <MilestoneRow milestone={m} index={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </ProjectSection>
  );
}

function MilestoneRow({ milestone, index }: { milestone: ProjectMilestone; index: number }) {
  return (
    <div className="relative grid grid-cols-[2.75rem_1fr] gap-7 py-8">
      <div className="flex justify-center pt-1">
        <span className="relative z-10 grid h-10 w-10 place-items-center bg-white dark:bg-transparent">
          <span className="absolute inset-0 h-full w-full rotate-45 border border-accent/50" aria-hidden="true" />
          <span className="relative font-mono text-xs font-semibold text-accent tnum">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-bold text-foreground">{milestone.title}</h3>
          {milestone.duration && (
            <span className="label-engineering text-muted-foreground">{milestone.duration}</span>
          )}
          {milestone.complete && (
            <span className="border border-accent/30 px-2 py-0.5 text-[10px] font-semibold uppercase text-accent">
              Complete
            </span>
          )}
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {milestone.description}
        </p>
      </div>
    </div>
  );
}
