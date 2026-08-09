import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { ProjectsExplorerFallback } from "@/components/projects/projects-explorer-fallback";
import { buildWebPageSchema } from "@/lib/structured-data";

const PAGE_DESCRIPTION =
  "Explore Rock Gate's portfolio of commercial, residential, industrial and hospitality projects across Egypt. Case studies with scope, timeline and delivery details.";

export const metadata: Metadata = {
  title: "Projects",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsExplorerFallback />}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...buildWebPageSchema({
            name: "Projects | Rock Gate",
            description: PAGE_DESCRIPTION,
            path: "/projects",
          }),
        }}
      />
      <ProjectsExplorer />
    </Suspense>
  );
}
