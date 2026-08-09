import { Container, Section } from "@/components/ui/container";
import { ProjectsHero } from "./projects-hero";

/** Mirrors the responsive grid spans used by `ProjectsExplorer`. */
const cardLayout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
];

/** Mirrors the category filter pill row. */
const FILTER_PILLS = [0, 1, 2, 3, 4, 5];

/**
 * Suspense fallback for the projects route. Renders the real `ProjectsHero`
 * plus theme-aware shimmer skeletons that exactly match the explorer's grid
 * (same sections, rows, spans and min-heights), so the streamed shell never
 * paints an empty page and the footer never jumps — zero CLS on slow devices.
 */
export function ProjectsExplorerFallback() {
  return (
    <>
      <ProjectsHero />
      <Section className="bg-white dark:bg-transparent">
        <Container>
          <div
            className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
            aria-hidden="true"
          >
            <div className="h-5 w-24 animate-pulse rounded bg-muted-foreground/20" />
            <div className="flex flex-wrap gap-2">
              {FILTER_PILLS.map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 animate-pulse rounded-sm border border-transparent bg-muted-foreground/15"
                />
              ))}
            </div>
          </div>

          <div className="mt-10 grid auto-rows-[minmax(260px,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {cardLayout.map((layout, i) => (
              <div key={i} className={layout} aria-hidden="true">
                <div className="relative flex h-full min-h-[20rem] items-center justify-center overflow-hidden rounded-xl bg-secondary">
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10" />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                    <div className="h-3 w-20 animate-pulse rounded bg-muted-foreground/20" />
                    <div className="h-3 w-12 animate-pulse rounded bg-muted-foreground/20" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="h-3 w-28 animate-pulse rounded bg-muted-foreground/20" />
                    <div className="mt-3 h-6 w-40 animate-pulse rounded bg-muted-foreground/25" />
                    <div className="mt-3 h-3 w-24 animate-pulse rounded bg-muted-foreground/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
