"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface ProjectClientProps {
  project: Project;
}

export function ProjectClient({ project }: ProjectClientProps) {
  const client = project.client;
  if (!client) return null;

  return (
    <ProjectSection eyebrow="Engaged client" title="Project client.">
      <FadeIn className="mx-auto mt-12 max-w-lg">
        <Card className="relative overflow-hidden">
          <CardContent className="p-8">
            <p className="label-engineering text-accent">Client</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
              {client.name}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="text-xs font-semibold uppercase text-foreground/60">Sector</p>
                <p className="mt-1">{client.sector}</p>
              </div>
              {client.location && (
                <div>
                  <p className="text-xs font-semibold uppercase text-foreground/60">Location</p>
                  <p className="mt-1">{client.location}</p>
                </div>
              )}
              {client.size && (
                <div>
                  <p className="text-xs font-semibold uppercase text-foreground/60">Scale</p>
                  <p className="mt-1">{client.size}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </ProjectSection>
  );
}
