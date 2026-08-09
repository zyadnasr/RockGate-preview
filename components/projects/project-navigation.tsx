import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { getAdjacentProjects } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectNavigationProps {
  currentSlug: string;
}

/**
 * Prev / All / Next pager for project case studies. Loops the final
 * project back to the first (and the first back to the last) via
 * `getAdjacentProjects`.
 */
export function ProjectNavigation({ currentSlug }: ProjectNavigationProps) {
  const { prev, next } = getAdjacentProjects(currentSlug);

  return (
    <section className="border-t border-border bg-surface">
      <Container>
        <nav
          aria-label="Project navigation"
          className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          <PagerLink
            label="Previous project"
            project={prev}
            icon={<ArrowLeft className="h-5 w-5" aria-hidden="true" />}
            align="left"
          />
          <AllProjectsLink />
          <PagerLink
            label="Next project"
            project={next}
            icon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
            align="right"
          />
        </nav>
      </Container>
    </section>
  );
}

interface PagerLinkProps {
  label: string;
  project: Project;
  icon: React.ReactNode;
  align: "left" | "right";
}

function PagerLink({ label, project, icon, align }: PagerLinkProps) {
  return (
    <PrefetchLink
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col gap-4 px-6 py-10 transition-colors duration-300 hover:bg-white md:py-12",
        "dark:hover:bg-white/5",
        align === "right" ? "md:items-end md:text-right" : "md:items-start",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent",
          align === "right" && "md:flex-row-reverse",
        )}
      >
        <span
          className={cn(
            "transition-transform duration-300",
            align === "right" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1",
          )}
        >
          {icon}
        </span>
        {label}
      </span>
      <span className="font-display text-2xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </span>
    </PrefetchLink>
  );
}

function AllProjectsLink() {
  return (
    <PrefetchLink
      href="/projects"
      className="group flex flex-col items-start gap-4 px-6 py-10 transition-colors duration-300 hover:bg-white md:items-center md:py-12 dark:hover:bg-white/5"
    >
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        <LayoutGrid
          className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
          aria-hidden="true"
        />
        All projects
      </span>
      <span className="font-display text-2xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-accent">
        Browse portfolio
      </span>
    </PrefetchLink>
  );
}
