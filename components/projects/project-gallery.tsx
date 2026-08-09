"use client";

import * as React from "react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { ProjectSection } from "./project-section";
import type { Project } from "@/types";

const GalleryLightbox = dynamic(
  () => import("./gallery-lightbox").then((m) => m.GalleryLightbox),
  { ssr: false },
);

interface ProjectGalleryProps {
  project: Project;
}

/** Editorial mixed grid with skeleton fade-in, soft parallax and a zoom lightbox. */
export function ProjectGallery({ project }: ProjectGalleryProps) {
  const gallery = project.gallery;
  const [active, setActive] = React.useState<number | null>(null);
  const [openedOnce, setOpenedOnce] = React.useState(false);
  const prefersReduced = useReducedMotion();

  if (!gallery || gallery.length === 0) return null;

  const [lead, ...rest] = gallery;

  const openAt = (index: number) => {
    setOpenedOnce(true);
    setActive(index);
  };

  return (
    <ProjectSection eyebrow="Visual record" title="Project gallery.">
      <Stagger className="mt-12" stagger={0.1}>
        {lead && (
          <StaggerItem>
            <LeadImage project={project} image={lead} onZoom={() => openAt(0)} prefersReduced={!!prefersReduced} />
          </StaggerItem>
        )}

        {rest.length > 0 && (
          <StaggerItem className="mt-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((img, i) => (
                <figure key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <ImageWithSkeleton
                    src={img.src}
                    alt={img.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={65}
                    className="group-hover:scale-105"
                  />
                  {img.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-xs text-white/80">{img.caption}</p>
                    </figcaption>
                  )}
                  <ZoomButton onClick={() => openAt(i + 1)} />
                </figure>
              ))}
            </div>
          </StaggerItem>
        )}
      </Stagger>

      {openedOnce && (
        <GalleryLightbox
          images={gallery}
          index={active}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      )}
    </ProjectSection>
  );
}

function LeadImage({
  project,
  image,
  onZoom,
  prefersReduced,
}: {
  project: Project;
  image: Project["gallery"][number];
  onZoom: () => void;
  prefersReduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [prefersReduced ? 0 : -24, prefersReduced ? 0 : 24]);

  return (
    <div ref={ref} className="relative aspect-[16/9] overflow-hidden rounded-2xl">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale: 1.08 }}>
        <ImageWithSkeleton
          src={image.src}
          alt={image.alt}
          sizes="(min-width: 1280px) 80rem, 100vw"
          quality={70}
        />
      </motion.div>
      {image.caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6">
          <p className="text-sm text-white/85">{image.caption}</p>
        </figcaption>
      )}
      <ZoomButton onClick={onZoom} />
    </div>
  );
}

function ZoomButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View image full screen"
      className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-[#111] focus-visible:opacity-100 group-hover:opacity-100 max-lg:opacity-100"
    >
      <ZoomIn className="h-5 w-5" />
    </button>
  );
}
