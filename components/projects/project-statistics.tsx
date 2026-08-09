"use client";

import { Counter } from "@/components/animations/counter";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { ProjectSection } from "./project-section";
import { STATS } from "@/lib/data";
import type { Statistic } from "@/types";

/**
 * Related statistics — company-wide context figures rendered as animated
 * counters, giving the case study broader proof of delivery.
 */
export function ProjectStatistics() {
  return (
    <ProjectSection
      eyebrow="Related statistics"
      title="By the numbers."
      description="Rock Gate's delivery record across the portfolio."
    >
      <Stagger className="mt-12 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4" stagger={0.1}>
        {STATS.map((stat) => (
          <StaggerItem key={stat.label}>
            <StatCell stat={stat} />
          </StaggerItem>
        ))}
      </Stagger>
    </ProjectSection>
  );
}

function StatCell({ stat }: { stat: Statistic }) {
  return (
    <div className="border-l-2 border-accent/70 pl-5">
      <p className="font-display text-4xl font-extrabold tracking-tight text-foreground tnum sm:text-5xl">
        <Counter to={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} duration={2} />
      </p>
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
}
