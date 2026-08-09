"use client";

import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { getRelatedProjects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { ProjectSection } from "./project-section";

interface RelatedProjectsProps {
  currentSlug: string;
}

export function RelatedProjects({ currentSlug }: RelatedProjectsProps) {
  const related = getRelatedProjects(currentSlug, 3);
  if (related.length === 0) return null;

  return (
    <ProjectSection eyebrow="More work" title="Related projects." bg="surface">
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {related.map((project, i) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} index={i} className="block" />
          </StaggerItem>
        ))}
      </Stagger>
    </ProjectSection>
  );
}
