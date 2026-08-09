import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/animations/section-heading";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  return (
    <Section className="relative overflow-hidden bg-[#111] py-24 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-30" aria-hidden="true" />
      <Container className="relative z-10">
        <SectionHeading
          align="center"
          eyebrow="Quality & compliance"
          title="Certifications & standards."
          description="Our operations are governed by international management systems and local regulatory compliance."
          dark
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <StaggerItem key={cert.name} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <cert.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white">{cert.name}</p>
                <p className="mt-1 text-xs text-white/50">{cert.issuer}</p>
                {cert.scope && (
                  <p className="mt-2 text-xs text-white/40">{cert.scope}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
