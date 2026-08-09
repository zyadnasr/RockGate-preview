import dynamic from "next/dynamic";
import { HydrateOnIdle } from "@/components/ui/hydrate-on-idle";
import { ProjectHero } from "./project-hero";
import { ProjectOverview } from "./project-overview";
import { ProjectBreadcrumb } from "./project-breadcrumb";
import type { Project } from "@/types";

const ReadingProgress = dynamic(() =>
  import("./reading-progress").then((m) => m.ReadingProgress),
  { ssr: false },
);

const ProjectNarrative = dynamic(() =>
  import("./project-narrative").then((m) => m.ProjectNarrative),
);
const ProjectConstructionProcess = dynamic(() =>
  import("./project-construction-process").then((m) => m.ProjectConstructionProcess),
);
const ProjectMaterials = dynamic(() =>
  import("./project-materials").then((m) => m.ProjectMaterials),
);
const ProjectTimeline = dynamic(() =>
  import("./project-timeline").then((m) => m.ProjectTimeline),
);
const ProjectResults = dynamic(() =>
  import("./project-results").then((m) => m.ProjectResults),
);
const ProjectTestimonial = dynamic(() =>
  import("./project-testimonial").then((m) => m.ProjectTestimonial),
);
const ProjectStatistics = dynamic(() =>
  import("./project-statistics").then((m) => m.ProjectStatistics),
);
const ProjectTechnicalSpecs = dynamic(() =>
  import("./project-technical-specs").then((m) => m.ProjectTechnicalSpecs),
);
const ProjectGallery = dynamic(() =>
  import("./project-gallery").then((m) => m.ProjectGallery),
);
const ProjectClient = dynamic(() =>
  import("./project-client").then((m) => m.ProjectClient),
);
const ProjectLocation = dynamic(() =>
  import("./project-location").then((m) => m.ProjectLocation),
);
const RelatedProjects = dynamic(() =>
  import("./related-projects").then((m) => m.RelatedProjects),
);
const ProjectNavigation = dynamic(() =>
  import("./project-navigation").then((m) => m.ProjectNavigation),
);

interface ProjectDossierProps {
  project: Project;
}

/**
 * Composes all project case-study sections in order. Below-fold blocks
 * are code-split with `next/dynamic`. All sections use the shared
 * `ProjectSection` layout wrapper — no duplicated Section/Container patterns.
 */
export function ProjectDossier({ project }: ProjectDossierProps) {
  return (
    <article>
      <HydrateOnIdle>
        <ReadingProgress />
      </HydrateOnIdle>
      <ProjectHero project={project} />
      <ProjectBreadcrumb title={project.title} />
      <ProjectOverview project={project} />
      <ProjectNarrative project={project} />
      <ProjectConstructionProcess project={project} />
      <ProjectMaterials project={project} />
      <ProjectTechnicalSpecs project={project} />
      <ProjectGallery project={project} />
      <ProjectResults project={project} />
      <ProjectTestimonial project={project} />
      <ProjectStatistics />
      <ProjectTimeline project={project} />
      <ProjectClient project={project} />
      <ProjectLocation project={project} />
      <RelatedProjects currentSlug={project.slug} />
      <ProjectNavigation currentSlug={project.slug} />
    </article>
  );
}
