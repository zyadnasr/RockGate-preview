import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

/* ------------------------------------------------------------------ */
/* Core domain types                                                    */
/* ------------------------------------------------------------------ */

/** Filterable project categories. */
export type ProjectCategory =
  | "Commercial"
  | "Residential"
  | "Office"
  | "Industrial"
  | "Hospitality";

/** A capability presented in the editorial services system. */
export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  index: string;
  detail?: string;
}

/** A "Why choose us" feature card. */
export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */
/* Project case-study types                                             */
/* ------------------------------------------------------------------ */

/** A full project case study. All fields live in one place. */
export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  heroImage: StaticImageData;
  heroImageAlt: string;
  scope: string;
  role: string;
  note: string;
  client: ProjectClient;
  gallery: ProjectImage[];
  executiveSummary: string;
  challenge: string;
  solution: string;
  constructionProcess: ProjectPhase[];
  materials: string[];
  technologies: string[];
  results: ProjectResult[];
  testimonial?: ProjectTestimonial;
  technicalSpecifications: ProjectSpec[];
  timeline: ProjectMilestone[];
  coordinates?: { lat: number; lng: number };
  seo: ProjectSEO;
}

/* ------------------------------------------------------------------ */
/* Project sub-types                                                    */
/* ------------------------------------------------------------------ */

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
  caption?: string;
}

export interface ProjectMilestone {
  phase: string;
  title: string;
  description: string;
  duration?: string;
  complete?: boolean;
}

export interface ProjectClient {
  name: string;
  sector: string;
  location?: string;
  size?: string;
}

/** A staged phase of the construction process. */
export interface ProjectPhase {
  title: string;
  description: string;
  index?: string;
}

/** A measurable outcome of the project. */
export interface ProjectResult {
  value: string;
  label: string;
}

/** Client testimonial specific to a project. */
export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

/** A single technical specification entry. */
export interface ProjectSpec {
  label: string;
  value: string;
}

/** SEO metadata per project page. */
export interface ProjectSEO {
  title: string;
  description: string;
  keywords?: string[];
}

/* ------------------------------------------------------------------ */
/* Trust layer types                                                    */
/* ------------------------------------------------------------------ */

export interface Partner {
  name: string;
  sector: string;
  /** 1-2 letter monogram rendered as styled text. */
  mark: string;
  description?: string;
  url?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: LucideIcon;
  scope?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  icon: LucideIcon;
}

export interface Client {
  name: string;
  sector: string;
  mark: string;
  location?: string;
}

/* ------------------------------------------------------------------ */
/* Navigation & proof types                                             */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

export interface Statistic {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  sector: string;
  projectType: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FooterLink {
  label: string;
  href: string;
}
