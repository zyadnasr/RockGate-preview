import {
  Building2,
  Construction,
  DraftingCompass,
  HardHat,
  PencilRuler,
  ClipboardCheck,
  Award,
  Users,
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  Cog,
  Search,
  Map,
  PackageCheck,
  Headset,
  MessageCircle,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Globe,
  Zap,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type {
  Service,
  Feature,
  Project,
  Statistic,
  Testimonial,
  ProcessStep,
  NavLink,
  Partner,
  Certification,
  Award as AwardType,
  Client,
} from "@/types";

/* ------------------------------------------------------------------ */
/* Brand & contact                                                    */
/* ------------------------------------------------------------------ */

export const COMPANY = {
  name: "Rock Gate",
  tagline: "Building Excellence. Creating the Future.",
  phone: "+20 2 2456 7890",
  phoneHref: "tel:+20224567890",
  email: "info@rockgate.com.eg",
  emailHref: "mailto:info@rockgate.com.eg",
  address: "New Cairo, Cairo Governorate, Egypt",
  established: 2009,
  hours: "Sat – Thu · 8:00 AM – 6:00 PM",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const SERVICES: Service[] = [
  {
    slug: "general-contracting",
    index: "01",
    title: "General Contracting",
    description:
      "Turnkey delivery of complex construction projects — from first permit to final handover — managed by a single accountable partner.",
    icon: HardHat,
    detail: "Single-point accountability from permit to handover.",
  },
  {
    slug: "construction",
    index: "02",
    title: "Construction",
    description:
      "Precision execution of structural, concrete and steel works built to international codes and client specifications.",
    icon: Building2,
    detail: "Structural and concrete execution aligned to the approved design.",
  },
  {
    slug: "engineering",
    index: "03",
    title: "Engineering",
    description:
      "Structural, civil and MEP engineering with detailed design, value engineering and full constructability review.",
    icon: DraftingCompass,
    detail: "Constructability reviews that reduce risk before work begins.",
  },
  {
    slug: "infrastructure",
    index: "04",
    title: "Infrastructure",
    description:
      "Roads, utilities, and civil works that connect communities and keep critical systems running reliably.",
    icon: Construction,
    detail: "Utilities, roads and civil works built for dependable operation.",
  },
  {
    slug: "interior-finishing",
    index: "05",
    title: "Interior Finishing",
    description:
      "Refined interior fit-out and finishing — premium materials, meticulous detailing, and flawless execution.",
    icon: PencilRuler,
    detail: "Material-led detailing for spaces that hold up to daily use.",
  },
  {
    slug: "project-management",
    index: "06",
    title: "Project Management",
    description:
      "End-to-end planning, scheduling, cost control and quality assurance that keeps every milestone on track.",
    icon: ClipboardCheck,
    detail: "Programme, cost and quality controls around every milestone.",
  },
];

/* ------------------------------------------------------------------ */
/* Why choose us                                                       */
/* ------------------------------------------------------------------ */

export const FEATURES: Feature[] = [
  {
    title: "15+ Years Experience",
    description:
      "Over a decade and a half of delivering landmark projects across residential, commercial and industrial sectors.",
    icon: Award,
  },
  {
    title: "Certified Engineers",
    description:
      "A senior team of certified architects, engineers and project managers committed to global standards.",
    icon: Users,
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous multi-stage quality control and safety protocols applied to every single phase of construction.",
    icon: ShieldCheck,
  },
  {
    title: "On-Time Delivery",
    description:
      "Disciplined scheduling and proactive risk management ensure your project is delivered when we promised.",
    icon: Clock,
  },
  {
    title: "Competitive Pricing",
    description:
      "Transparent, value-driven pricing with detailed cost breakdowns and no hidden surprises.",
    icon: BadgeDollarSign,
  },
  {
    title: "Modern Equipment",
    description:
      "State-of-the-art machinery and digital tooling that deliver accuracy, speed and safety on site.",
    icon: Cog,
  },
];

/* ------------------------------------------------------------------ */
/* Featured projects                                                   */
/* ------------------------------------------------------------------ */

// Project data lives in @/lib/projects (single source of truth).
// Import PROJECTS from there; this re-export keeps non-project imports working.
export { PROJECTS } from "@/lib/projects";

/* ------------------------------------------------------------------ */
/* Statistics                                                          */
/* ------------------------------------------------------------------ */

export const STATS: Statistic[] = [
  { value: 500, suffix: "+", label: "Completed Projects" },
  { value: 150, suffix: "+", label: "Professional Engineers" },
  { value: 20, suffix: "+", label: "Cities Covered" },
  { value: 98, suffix: "%", label: "Client Satisfaction", decimals: 1 },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Rock Gate delivered our 22-storey headquarters three weeks ahead of schedule without a single quality compromise. The transparency throughout was exceptional.",
    author: "Omar El-Sherif",
    role: "Chief Executive Officer",
    company: "Delta Development Group",
    initials: "OE",
    sector: "Commercial",
    projectType: "22-storey HQ",
  },
  {
    quote:
      "Their engineering team added genuine value — refining our design and cutting costs by 12% while improving the structural performance. True professionals.",
    author: "Nadia Mansour",
    role: "Head of Projects",
    company: "Horizon Properties",
    initials: "NM",
    sector: "Mixed-use",
    projectType: "Campus development",
  },
  {
    quote:
      "From permits to handover, everything was seamless. The finishing quality on our residential villas exceeded what we've seen from international contractors.",
    author: "Khaled Abdel Rahman",
    role: "Managing Director",
    company: "Marlin Real Estate",
    initials: "KA",
    sector: "Residential",
    projectType: "Villa community",
  },
  {
    quote:
      "We contracted Rock Gate for critical government infrastructure, and their safety record and on-site discipline were beyond reproach. Highly recommended.",
    author: "Sara El-Tantawy",
    role: "Director of Infrastructure",
    company: "Cairo Metropolitan Authority",
    initials: "SE",
    sector: "Government",
    projectType: "Public infrastructure",
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const PROCESS: ProcessStep[] = [
  {
    title: "Consultation",
    description:
      "We listen first. A deep discovery of your goals, budget and constraints shapes a tailored delivery strategy.",
    icon: MessageCircle,
  },
  {
    title: "Planning",
    description:
      "Detailed design, scheduling, procurement and cost planning — every risk mapped before we break ground.",
    icon: Map,
  },
  {
    title: "Execution",
    description:
      "Certified crews and modern equipment bring the plans to life with rigorous quality control at every stage.",
    icon: PackageCheck,
  },
  {
    title: "Delivery",
    description:
      "Structured handover with full documentation, commissioning and final quality sign-off.",
    icon: Search,
  },
  {
    title: "Support",
    description:
      "Long after handover, our team stands behind the work with maintenance and after-sales care.",
    icon: Headset,
  },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const FOOTER = {
  about:
    "Rock Gate is a leading Egyptian construction and engineering company delivering premium projects across residential, commercial, industrial and infrastructure sectors.",
  quickLinks: [
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Featured Projects", href: "/projects" },
    { label: "Our Process", href: "#process" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "General Contracting", href: "#services" },
    { label: "Construction", href: "#services" },
    { label: "Engineering", href: "#services" },
    { label: "Infrastructure", href: "#services" },
    { label: "Interior Finishing", href: "#services" },
  ],
};

export const SOCIALS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

/* ------------------------------------------------------------------ */
/* Partners, certifications, awards, clients                           */
/* ------------------------------------------------------------------ */

export const PARTNERS: Partner[] = [
  { name: "Arab Contractors", sector: "Construction", mark: "AC", description: "Strategic construction partner for large-scale infrastructure" },
  { name: "Orascom Construction", sector: "Development", mark: "OC", description: "Joint venture partner on industrial campus projects" },
  { name: "Emaar Properties", sector: "Real Estate", mark: "EP", description: "Development partner for residential and hospitality projects" },
  { name: "Siemens Egypt", sector: "MEP", mark: "SE", description: "MEP systems and building technology partner" },
  { name: "Schneider Electric", sector: "Electrical", mark: "SE", description: "Electrical distribution and energy management" },
  { name: "Basf Egypt", sector: "Materials", mark: "BE", description: "Construction chemicals and material science" },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "ISO 9001:2015", issuer: "Quality Management Systems", year: "2015", icon: ShieldCheck, scope: "Construction and engineering operations" },
  { name: "ISO 14001:2015", issuer: "Environmental Management", year: "2018", icon: Globe, scope: "Site environmental controls" },
  { name: "ISO 45001:2018", issuer: "Occupational Health & Safety", year: "2020", icon: ShieldCheck, scope: "Workplace safety management" },
  { name: "OHSAS 18001", issuer: "British Standards Institution", year: "2012", icon: ShieldCheck, scope: "Legacy safety certification" },
  { name: "Egyptian Contractor Classification", issuer: "Ministry of Housing", year: "2010", icon: Building2, scope: "First-class general contractor" },
];

export const AWARDS: AwardType[] = [
  { title: "Best Commercial Project", organization: "Egypt Property Awards", year: "2024", icon: Award },
  { title: "Safety Excellence Award", organization: "Middle East Contractors Forum", year: "2023", icon: ShieldCheck },
  { title: "Innovation in Construction", organization: "Arab Engineering Union", year: "2022", icon: Zap },
  { title: "Sustainable Development", organization: "Egypt Green Building Council", year: "2023", icon: Globe },
];

export const CLIENTS: Client[] = [
  { name: "Delta Development Group", sector: "Real Estate", mark: "DD", location: "Cairo" },
  { name: "Horizon Properties", sector: "Mixed-use", mark: "HP", location: "New Cairo" },
  { name: "Cairo Metropolitan Authority", sector: "Government", mark: "CM", location: "Cairo" },
  { name: "Marlin Real Estate", sector: "Residential", mark: "MR", location: "6th of October" },
  { name: "Nexus Engineering Group", sector: "Engineering", mark: "NE", location: "Maadi" },
  { name: "North Coast Hospitality", sector: "Hospitality", mark: "NH", location: "North Coast" },
];

/* ------------------------------------------------------------------ */
/* Contact form dropdowns                                               */
/* ------------------------------------------------------------------ */

export const PROJECT_TYPES = [
  "General Contracting",
  "Construction",
  "Engineering",
  "Infrastructure",
  "Interior Finishing",
  "Project Management",
] as const;

export const BUDGET_RANGES = [
  "Under $500K",
  "$500K – $2M",
  "$2M – $10M",
  "$10M+",
] as const;
