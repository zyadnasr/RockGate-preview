import { ArrowUpRight, MapPin } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
  index: number;
}

/** CSS-hover card — no Framer Motion runtime. */
export function ProjectCard({ project, className, index }: ProjectCardProps) {
  return (
    <PrefetchLink
      href={`/projects/${project.slug}`}
      className={className}
      data-analytics="project_select"
      data-analytics-item-id={project.slug}
      data-analytics-item-name={project.title}
      data-analytics-category={project.category}
    >
      <article className="group relative flex min-h-[20rem] overflow-hidden rounded-xl bg-secondary transition-transform duration-300 hover:-translate-y-1 lg:h-full">
        <ImageWithSkeleton
          src={project.heroImage}
          alt={project.heroImageAlt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          quality={70}
          className="group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-px w-6 bg-accent" />
            {project.category}
          </p>
          <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
            <span className="h-1.5 w-1.5 rotate-45 bg-accent/60" aria-hidden="true" />
            <span className="tnum">RG / {String(index + 1).padStart(2, "0")}</span>
          </p>
        </div>

        <div className="relative z-10 mt-auto w-full p-6 sm:p-7">
          <p className="flex items-center gap-1.5 text-xs text-white/65">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {project.location}
          </p>
          <h3 className="mt-2 max-w-md font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/55">
            Completed {project.year}
            {project.scope ? ` · ${project.scope}` : ""}
          </p>
          {project.note && (
            <div className="mt-3 border-l border-accent/60 pl-3">
              <p className="max-w-lg text-xs leading-relaxed text-white/78 sm:text-sm">
                {project.note}
              </p>
            </div>
          )}
        </div>

        <span
          className="absolute bottom-6 right-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-[#111]"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </article>
    </PrefetchLink>
  );
}
