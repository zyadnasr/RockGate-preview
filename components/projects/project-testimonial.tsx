"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

/**
 * Standalone client testimonial presented as a large editorial blockquote.
 */
export function ProjectTestimonial({ project }: Props) {
  const t = project.testimonial;
  if (!t) return null;

  return (
    <ProjectSection
      eyebrow="Client testimony"
      title="On the record."
      bg="surface"
    >
      <FadeIn className="mt-12">
        <figure className="relative mx-auto max-w-4xl">
          <blockquote className="relative">
            <span className="pointer-events-none absolute -top-10 -left-2 font-display text-[7rem] leading-none text-accent/20 select-none" aria-hidden="true">
              &ldquo;
            </span>
            <p className="font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
              {t.quote}
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <div>
                <p className="font-display text-base font-bold text-foreground">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </footer>
          </blockquote>
        </figure>
      </FadeIn>
    </ProjectSection>
  );
}
