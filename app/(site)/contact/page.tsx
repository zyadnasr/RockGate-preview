import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section } from "@/components/ui/container";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { buildWebPageSchema } from "@/lib/structured-data";

const PAGE_DESCRIPTION =
  "Get in touch with Rock Gate. Tell us about your project and our engineers will respond within one business day with a tailored proposal.";

export const metadata: Metadata = {
  title: "Contact",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...buildWebPageSchema({
            name: "Contact | Rock Gate",
            description: PAGE_DESCRIPTION,
            path: "/contact",
          }),
        }}
      />
      <ContactHero />
      <Section className="bg-white dark:bg-transparent">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <ContactForm />
            <ContactInfo />
          </div>
        </Container>
      </Section>
    </>
  );
}
