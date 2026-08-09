"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface ProjectNarrativeProps {
  project: Project;
}

function NarrativeColumn({
  index,
  eyebrow,
  title,
  body,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-5">
        <span className="font-mono text-sm font-semibold text-accent tnum">{index}</span>
        <div>
          <p className="label-engineering text-accent">{eyebrow}</p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h3>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {body}
        </p>
      </div>
    </FadeIn>
  );
}

export function ProjectNarrative({ project }: ProjectNarrativeProps) {
  return (
    <ProjectSection
      eyebrow="The story"
      title="From brief to build."
      description="The problem the client faced and how Rock Gate approached it."
      bg="surface"
    >
      <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <NarrativeColumn
          index="01"
          eyebrow="The challenge"
          title="What we were solving."
          body={project.challenge}
        />
        <NarrativeColumn
          index="02"
          eyebrow="Our solution"
          title="How we delivered."
          body={project.solution}
        />
      </div>
    </ProjectSection>
  );
}
