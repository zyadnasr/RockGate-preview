import Link from "next/link";
import { COMPANY, FOOTER, SOCIALS } from "@/lib/data";
import { Logo } from "@/components/ui/logo";
import emblem from "@/images/RockGate-logos/rockgate-emblem.svg";

const currentYear = new Date().getFullYear();
const EMBLEM_URL = typeof emblem === "string" ? emblem : emblem.src;

/** Resolve hash links to absolute paths for cross-page navigation. */
function resolveHref(href: string): string {
  if (href.startsWith("/")) return href;
  return `/${href}`;
}

/** Quiet enterprise trust layer — static server-rendered footer. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080808] text-white">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.04]" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={EMBLEM_URL} alt="" aria-hidden="true" className="pointer-events-none absolute -right-8 top-8 w-40 opacity-[0.06]" />
      {/* Construction stripes top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 construction-stripes opacity-40" aria-hidden="true" />
      {/* Contact bar */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-5 text-xs text-white/50 lg:px-8">
          <span>{COMPANY.address}</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
          <a href={COMPANY.phoneHref} className="transition-colors hover:text-white/80">
            {COMPANY.phone}
          </a>
          <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
          <a href={COMPANY.emailHref} className="transition-colors hover:text-white/80">
            {COMPANY.email}
          </a>
          <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
          <span>{COMPANY.hours}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:px-8">
        {/* Brand column */}
        <div className="lg:col-span-5">
          <Logo onDark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
            {FOOTER.about}
          </p>
          <div className="mt-6 flex items-center gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation columns */}
        <FooterCol title="Navigation" links={FOOTER.quickLinks} className="lg:col-span-3" />
        <FooterCol title="Services" links={FOOTER.services} className="lg:col-span-2" />

        {/* Address + legal */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Office
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            {COMPANY.address}
          </p>
          <a
            href="https://maps.google.com/?q=New+Cairo,+Egypt"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs text-white/35 transition-colors hover:text-white/60"
          >
            View on Google Maps →
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-[11px] text-white/30 sm:flex-row lg:px-8">
          <p>© {currentYear} {COMPANY.name}. All rights reserved.</p>
          <p>Licensed General Contractor · Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav className={className} aria-label={title}>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => {
          const resolvedHref = resolveHref(link.href);
          const isRoute = link.href.startsWith("/");
          const Tag = isRoute ? Link : "a";
          return (
            <li key={link.label}>
              <Tag
                href={resolvedHref}
                className="text-sm text-white/40 transition-colors hover:text-white/70"
              >
                {link.label}
              </Tag>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
