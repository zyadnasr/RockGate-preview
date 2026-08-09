"use client";

import { Container, Section } from "@/components/ui/container";
import { FadeIn } from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

interface ProjectTechnologiesProps {
  project: Project;
}

export function ProjectTechnologies({ project }: ProjectTechnologiesProps) {
  const technologies = project.technologies;
  if (!technologies || technologies.length === 0) return null;

  return (
    <Section className="bg-white dark:bg-transparent">
      <Container>
        <FadeIn>
          <p className="label-engineering text-accent">Technologies & methods</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="px-4 py-2 text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
