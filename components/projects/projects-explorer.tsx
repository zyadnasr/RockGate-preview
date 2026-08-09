"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { PROJECTS } from "@/lib/projects";
import { normalizeCategory } from "@/lib/projects";
import { ProjectsHero } from "./projects-hero";
import { ProjectFilter } from "./project-filter";
import { ProjectCard } from "./project-card";
import { EASE } from "@/components/animations/motion";

const cardLayout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
];

export function ProjectsExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = normalizeCategory(searchParams.get("category"));
  const [active, setActive] = React.useState<string>(initial);

  const filtered = React.useMemo(() => {
    if (active === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  const handleChange = React.useCallback(
    (cat: string) => {
      setActive(cat);
      const params = new URLSearchParams(searchParams.toString());
      if (cat === "All") {
        params.delete("category");
      } else {
        params.set("category", cat.toLowerCase());
      }
      router.replace(`/projects?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <>
      <ProjectsHero />

      <Section className="bg-white dark:bg-transparent">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </p>
            <ProjectFilter active={active} onChange={handleChange} />
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-10 grid auto-rows-[minmax(260px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-12"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  className={cardLayout[i % cardLayout.length] ?? "lg:col-span-4"}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="mt-20 text-center">
              <p className="text-lg text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
