"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface ProjectOverviewProps {
  project: Project;
}

/** Editorial key-fact block: scope, role, year, client. */
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-accent/70 pl-5">
      <p className="label-engineering text-accent">{label}</p>
      <p className="mt-2 font-display text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const facts = [
    { label: "Scope", value: project.scope || "Full delivery scope" },
    { label: "Role", value: project.role || "General contracting" },
    { label: "Year", value: project.year },
    { label: "Client", value: project.client?.name || "Rock Gate client" },
  ];

  return (
    <ProjectSection
      eyebrow="Executive summary"
      title="At a glance."
      narrow
    >
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
        <FadeIn>
          <p className="font-display text-xl leading-relaxed text-foreground/90 sm:text-2xl">
            {project.executiveSummary}
          </p>
        </FadeIn>

        <Stagger className="grid gap-8" stagger={0.1}>
          {facts.map((f, i) => (
            <StaggerItem key={i}>
              <Fact label={f.label} value={f.value} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </ProjectSection>
  );
}
