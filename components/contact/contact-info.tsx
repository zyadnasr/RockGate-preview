"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { COMPANY } from "@/lib/data";
import { MapPlaceholder } from "@/components/ui/map-placeholder";
import { FadeIn } from "@/components/animations/fade-in";

export function ContactInfo() {
  return (
    <FadeIn delay={0.2} className="space-y-8">
      <div className="space-y-6">
        <h3 className="font-display text-lg font-bold text-foreground">Contact details</h3>
        <div className="space-y-4">
          <InfoRow icon={<MapPin className="h-4 w-4" />} label="Address" value={COMPANY.address} />
          <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={COMPANY.phone} href={COMPANY.phoneHref} />
          <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={COMPANY.email} href={COMPANY.emailHref} />
          <InfoRow icon={<Clock className="h-4 w-4" />} label="Hours" value={COMPANY.hours} />
        </div>
      </div>
      <MapPlaceholder lat={30.0444} lng={31.2357} location="New Cairo, Egypt" />
    </FadeIn>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-accent">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </a>
    );
  }
  return content;
}
