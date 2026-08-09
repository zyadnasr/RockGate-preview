import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { buildBreadcrumbListSchema } from "@/lib/structured-data";

interface ProjectBreadcrumbProps {
  title: string;
}

/** Home / Projects / <Title> trail with JSON-LD breadcrumbs. */
export function ProjectBreadcrumb({ title }: ProjectBreadcrumbProps) {
  const items = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: title, href: null },
  ];

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="py-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50" aria-hidden="true" />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    {i === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="flex items-center gap-1.5 text-accent"
                  >
                    {i === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...buildBreadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: title },
          ]),
        }}
      />
    </Container>
  );
}
