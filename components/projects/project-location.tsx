"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { MapPlaceholder } from "@/components/ui/map-placeholder";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface ProjectLocationProps {
  project: Project;
}

export function ProjectLocation({ project }: ProjectLocationProps) {
  if (!project.coordinates) return null;

  return (
    <ProjectSection
      eyebrow="Site location"
      title="Where we built."
      description={`${project.location}, Egypt`}
    >
      <FadeIn delay={0.1} className="mt-12">
        <MapPlaceholder
          lat={project.coordinates.lat}
          lng={project.coordinates.lng}
          location={project.location}
        />
      </FadeIn>
    </ProjectSection>
  );
}
