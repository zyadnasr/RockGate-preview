// Preview copy: the `import "server-only"` guard from the original is removed
// so this runs during static export. Original file untouched.
import { COMPANY } from "@/lib/data";
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";

type JsonLd = Record<string, unknown>;

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
const DAY_ABBR: Record<string, (typeof DAY_ORDER)[number]> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

function to24h(value: string): string | null {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i.exec(value.trim());
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ?? "00";
  const isPm = match[3].toLowerCase() === "pm";
  if (isPm && hours !== 12) hours += 12;
  if (!isPm && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function expandDayRange(range: string): string[] | null {
  const match = /^([A-Za-z]{3})\s*[-–]\s*([A-Za-z]{3})$/.exec(range.trim());
  if (!match) return null;
  const start = DAY_ABBR[match[1]];
  const end = DAY_ABBR[match[2]];
  if (!start || !end) return null;
  const startIndex = DAY_ORDER.indexOf(start);
  const endIndex = DAY_ORDER.indexOf(end);
  const days: string[] = [];
  let index = startIndex;
  while (true) {
    days.push(DAY_ORDER[index]);
    if (index === endIndex) break;
    index = (index + 1) % 7;
  }
  return days;
}

/**
 * Derive an OpeningHoursSpecification from the COMPANY.hours display string
 * (e.g. "Sat – Thu · 8:00 AM – 6:00 PM"). Returns undefined when the format
 * is unrecognised so invalid markup is never emitted.
 */
export function parseOpeningHours(hours: string): JsonLd | undefined {
  const match =
    /^([\s\S]+?)\s*·\s*(\d{1,2}(?::\d{2})?\s*[APMapm]{2})\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*[APMapm]{2})$/.exec(
      hours.trim(),
    );
  if (!match) return undefined;
  const days = expandDayRange(match[1]);
  const opens = to24h(match[2]);
  const closes = to24h(match[3]);
  if (!days || !opens || !closes) return undefined;
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  };
}

/** LocalBusiness / Organization — single merged node (no duplicated blocks). */
export function buildOrganizationSchema(): JsonLd {
  const openingHours = parseOpeningHours(COMPANY.hours);
  return {
    "@type": "GeneralContractor",
    "@id": ORGANIZATION_ID,
    name: COMPANY.name,
    slogan: COMPANY.tagline,
    description: "Construction and engineering company delivering projects across Egypt.",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/rockgate-512.png` },
    telephone: COMPANY.phone,
    email: COMPANY.email,
    foundingDate: String(COMPANY.established),
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Cairo",
      addressRegion: "Cairo",
      addressCountry: "EG",
    },
    areaServed: { "@type": "Country", name: "Egypt" },
    ...(openingHours ? { openingHoursSpecification: openingHours } : {}),
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: COMPANY.name,
    url: SITE_URL,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

interface WebPageInput {
  name: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
}

export function buildWebPageSchema({
  name,
  description,
  path,
  image,
  datePublished,
}: WebPageInput): JsonLd {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
    ...(datePublished ? { datePublished } : {}),
  };
}

export function buildBreadcrumbListSchema(items: { name: string; path?: string }[]): JsonLd {
  const lastPath = items[items.length - 1]?.path ?? "";
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${lastPath}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
}
