import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { LogoMark } from "@/components/ui/logo-mark";
import { PARTNERS } from "@/lib/data";

export function Partners() {
  return (
    <Section className="border-t border-border bg-white dark:bg-transparent">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Strategic alliances"
          title="Our partners."
          description="We work alongside leading firms to deliver comprehensive construction and engineering solutions."
        />
        <Stagger className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((partner) => (
            <StaggerItem key={partner.name} className="flex flex-col items-center gap-3 text-center">
              <LogoMark mark={partner.mark} />
              <div>
                <p className="text-sm font-semibold text-foreground">{partner.name}</p>
                <p className="text-xs text-muted-foreground">{partner.sector}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
