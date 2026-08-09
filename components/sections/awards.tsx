import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { AWARDS } from "@/lib/data";

export function Awards() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="Recognition"
          title="Awards & accolades."
          description="Industry recognition for excellence in construction, safety and sustainable development."
        />
        <Stagger className="mt-12 divide-y divide-border border-y border-border">
          {AWARDS.map((award) => (
            <StaggerItem key={award.title}>
              <div className="flex items-center gap-5 py-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <award.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-lg font-bold text-foreground">{award.title}</p>
                  <p className="text-sm text-muted-foreground">{award.organization}</p>
                </div>
                <span className="label-engineering text-muted-foreground tnum">{award.year}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
