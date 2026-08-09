"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/lib/projects";

interface ProjectFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  const categories = getAllCategories();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300",
            active.toLowerCase() === cat.toLowerCase()
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
