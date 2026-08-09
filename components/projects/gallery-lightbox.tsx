"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/animations/motion";
import type { ProjectImage } from "@/types";

interface GalleryLightboxProps {
  images: ProjectImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SCALES = [1, 1.6, 2.4];

/** Fullscreen modal for viewing gallery images, with zoom + keyboard nav. */
export function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [scaleIdx, setScaleIdx] = React.useState(0);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const open = index !== null;
  const image = index !== null ? images[index] : null;

  // Reset zoom when opening a new image.
  React.useEffect(() => {
    if (open) setScaleIdx(0);
  }, [index, open]);

  React.useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index !== null)
        onNavigate((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight" && index !== null)
        onNavigate((index + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onNavigate, index, images.length]);

  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-black/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${image.alt} — gallery image ${(index ?? 0) + 1} of ${images.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-5 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              {(index ?? 0) + 1} / {images.length}
            </p>
            <div className="flex items-center gap-2">
              <IconButton label="Zoom out" disabled={scaleIdx === 0} onClick={() => setScaleIdx((s) => Math.max(0, s - 1))}>
                <ZoomOut className="h-5 w-5" />
              </IconButton>
              <IconButton label="Zoom in" disabled={scaleIdx === SCALES.length - 1} onClick={() => setScaleIdx((s) => Math.min(SCALES.length - 1, s + 1))}>
                <ZoomIn className="h-5 w-5" />
              </IconButton>
              <IconButton label="Reset zoom" disabled={scaleIdx === 0} onClick={() => setScaleIdx(0)}>
                <Maximize className="h-5 w-5" />
              </IconButton>
              <IconButton ref={closeRef} label="Close gallery" onClick={onClose}>
                <X className="h-5 w-5" />
              </IconButton>
            </div>
          </div>

          {/* Image stage */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={index}
              className="relative aspect-video w-full max-w-5xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 80rem, 100vw"
                className="object-contain transition-transform duration-300 ease-smooth"
                style={{ transform: `scale(${SCALES[scaleIdx]})` }}
              />
            </motion.div>
          </div>

          {/* Caption + prev/next */}
          <div
            className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-white/70">{image.caption}</p>
            <div className="flex items-center gap-2">
              <IconButton label="Previous image" onClick={() => index !== null && onNavigate((index - 1 + images.length) % images.length)}>
                <ChevronLeft className="h-5 w-5" />
              </IconButton>
              <IconButton label="Next image" onClick={() => index !== null && onNavigate((index + 1) % images.length)}>
                <ChevronRight className="h-5 w-5" />
              </IconButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, className, children, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={label}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
IconButton.displayName = "IconButton";
