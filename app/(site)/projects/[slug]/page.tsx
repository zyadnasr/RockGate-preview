import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import { ProjectDossier } from "@/components/projects/project-dossier";
import { buildWebPageSchema } from "@/lib/structured-data";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.seo.title,
    description: project.seo.description,
    keywords: project.seo.keywords,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: [{ url: `/og/${project.slug}.jpg`, width: 1200, height: 630 }],
      type: "article",
      locale: "en_EG",
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [`/og/${project.slug}.jpg`],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...buildWebPageSchema({
            name: project.seo.title,
            description: project.seo.description,
            path: `/projects/${project.slug}`,
            image: `/og/${project.slug}.jpg`,
            datePublished: project.year,
          }),
        }}
      />
      <ProjectDossier project={project} />
    </>
  );
}
