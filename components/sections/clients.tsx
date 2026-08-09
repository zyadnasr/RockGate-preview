import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { LogoMark } from "@/components/ui/logo-mark";
import { CLIENTS } from "@/lib/data";

export function Clients() {
  return (
    <Section className="bg-white dark:bg-transparent">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Trusted by"
          title="Our clients."
          description="We serve developers, enterprises and public-sector teams across Egypt."
        />
        <Stagger className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENTS.map((client) => (
            <StaggerItem key={client.name} className="flex flex-col items-center gap-3 text-center">
              <LogoMark mark={client.mark} />
              <div>
                <p className="text-sm font-semibold text-foreground">{client.name}</p>
                <p className="text-xs text-muted-foreground">{client.sector}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
