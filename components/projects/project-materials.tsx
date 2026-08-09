"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

/** Editorial materials / technologies list with index markers. */
function MaterialList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <FadeIn>
      <p className="label-engineering text-accent">{title}</p>
      <ul className="mt-6 space-y-4">
        {items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-4">
            <span className="font-mono text-xs font-semibold text-muted-foreground tnum">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-lg font-medium text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}

export function ProjectMaterials({ project }: Props) {
  if (project.materials.length === 0 && project.technologies.length === 0) return null;

  return (
    <ProjectSection
      eyebrow="Materials & systems"
      title="Specified for performance."
      description="Core materials, methods and technical systems recorded for the case study."
    >
      <div className="mt-12 grid gap-14 sm:grid-cols-2 lg:gap-20">
        <MaterialList title="Materials" items={project.materials} />
        <MaterialList title="Technologies" items={project.technologies} />
      </div>
    </ProjectSection>
  );
}
