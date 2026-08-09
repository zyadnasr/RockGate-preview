import type { Project, ProjectCategory } from "@/types";
import heroConstruction from "@/images/hero/hero-construction.webp";
import towerCorporate from "@/images/projects/tower-corporate.webp";
import foundationWorks from "@/images/projects/foundation-works.webp";
import villaExterior from "@/images/projects/villa-exterior.webp";
import villaInterior from "@/images/projects/villa-interior.webp";
import villaGarden from "@/images/projects/villa-garden.webp";
import officeExposed from "@/images/projects/office-exposed.webp";
import officeOpenPlan from "@/images/projects/office-open-plan.webp";
import officeRooftop from "@/images/projects/office-rooftop.webp";
import engineersBlueprints from "@/images/projects/engineers-blueprints.webp";
import campusCourtyard from "@/images/projects/campus-courtyard.webp";
import retailFacade from "@/images/projects/retail-facade.webp";
import restaurantTerrace from "@/images/projects/restaurant-terrace.webp";
import waterfrontPromenade from "@/images/projects/waterfront-promenade.webp";
import resortExterior from "@/images/projects/resort-exterior.webp";
import resortPool from "@/images/projects/resort-pool.webp";
import resortBeachClub from "@/images/projects/resort-beach-club.webp";

/** Single source of truth for project case studies. */
export const PROJECTS: Project[] = [
  {
    slug: "new-cairo-towers",
    title: "The Capital Towers",
    category: "Commercial",
    location: "New Administrative Capital",
    year: "2025",
    heroImage: towerCorporate,
    heroImageAlt: "A modern glass commercial tower rising against a clear sky in New Cairo.",
    scope: "Commercial tower delivery",
    role: "General contracting",
    note: "A landmark vertical development shaped around controlled sequencing and handover.",
    client: { name: "Capital Development Authority", sector: "Government", size: "22-storey HQ" },
    executiveSummary:
      "A 22-storey commercial tower in the New Administrative Capital, delivering 18,000 m² of Grade-A office space with integrated parking and retail podium. The project demanded precise structural sequencing to meet an aggressive 18-month programme.",
    challenge:
      "The client required a fast-track delivery on a greenfield site with limited existing infrastructure, demanding parallel workstreams for foundation, structure, and façade without compromising quality or safety.",
    solution:
      "Rock Gate deployed a dedicated project team with BIM-coordinated scheduling, enabling simultaneous structural and MEP progress. Weekly production meetings and a shared digital model kept all trades aligned.",
    constructionProcess: [
      { index: "01", title: "Mobilisation", description: "Site preparation, earthworks, piling and temporary facilities established the safe working platform." },
      { index: "02", title: "Structure", description: "Post-tensioned slabs and core walls progressed through coordinated vertical sequencing." },
      { index: "03", title: "Envelope", description: "Curtain wall installation and interior partitioning moved in parallel with MEP coordination." },
      { index: "04", title: "Handover", description: "MEP testing, snagging and client walkthroughs closed the delivery programme." },
    ],
    materials: ["Architectural concrete", "Low-emissivity glazing", "Post-tensioned slabs", "Fire-rated partitions"],
    technologies: ["Post-tensioned slabs", "BIM coordination", "Curtain wall system", "MEP integration"],
    results: [
      { value: "22", label: "Storeys delivered" },
      { value: "18k m²", label: "Grade-A office area" },
      { value: "18 mo", label: "Fast-track programme" },
    ],
    testimonial: {
      quote: "The team kept structure, façade and services moving together without losing control of quality or reporting.",
      author: "Project Director",
      role: "Capital Development Authority",
    },
    technicalSpecifications: [
      { label: "Height", value: "22 storeys" },
      { label: "Gross area", value: "18,000 m²" },
      { label: "Primary structure", value: "Post-tensioned concrete frame" },
      { label: "Envelope", value: "Curtain wall glazing system" },
    ],
    timeline: [
      { phase: "01 · Mobilisation", title: "Site preparation", description: "Earthworks, piling and temporary facilities", duration: "Q1 2024", complete: true },
      { phase: "02 · Structure", title: "Structural frame", description: "Post-tensioned slabs and core walls", duration: "Q2–Q4 2024", complete: true },
      { phase: "03 · Envelope", title: "Façade and fit-out", description: "Curtain wall installation and interior partitioning", duration: "Q1–Q2 2025", complete: true },
      { phase: "04 · Handover", title: "Commissioning", description: "MEP testing, snagging and client walkthrough", duration: "Q3 2025", complete: false },
    ],
    gallery: [
      { src: towerCorporate, alt: "Tower exterior at structural completion", caption: "Tower envelope and podium works" },
      { src: foundationWorks, alt: "Foundation works in progress", caption: "Early-stage foundation and logistics" },
      { src: heroConstruction, alt: "Façade installation", caption: "Façade and MEP coordination" },
    ],
    coordinates: { lat: 30.0131, lng: 31.7767 },
    seo: {
      title: "The Capital Towers Case Study",
      description: "Commercial tower case study for Rock Gate in Egypt, covering challenge, delivery process, systems and measurable results.",
      keywords: ["commercial tower Egypt", "general contracting", "New Administrative Capital construction"],
    },
  },
  {
    slug: "zayed-villas",
    title: "Zayed Private Villas",
    category: "Residential",
    location: "6th of October City",
    year: "2024",
    heroImage: villaExterior,
    heroImageAlt: "A contemporary luxury villa with clean architectural lines and landscaped garden.",
    scope: "Private residential delivery",
    role: "Construction and finishing",
    note: "Residential execution with an emphasis on material control and precise finishing.",
    client: { name: "Zayed Developments", sector: "Residential", location: "6th of October City" },
    executiveSummary:
      "A collection of 12 luxury villas in 6th of October City, each with bespoke interior finishing, private gardens, and smart-home infrastructure. The development targets high-net-worth buyers seeking turnkey residences.",
    challenge:
      "Delivering uniform quality across 12 bespoke villas with varying floor plans, while maintaining a single material supply chain and finishing standard throughout the community.",
    solution:
      "Rock Gate established a centralised material procurement hub and deployed dedicated finishing teams per villa cluster, with weekly quality audits against a shared sample board.",
    constructionProcess: [
      { index: "01", title: "Infrastructure", description: "Roads, utilities and plot preparation established consistent site access for every villa." },
      { index: "02", title: "Villa shells", description: "Reinforced concrete frames and roofing were delivered in cluster-based sequences." },
      { index: "03", title: "Finishing", description: "Dedicated interior teams completed premium finishing and smart-home readiness." },
    ],
    materials: ["Premium marble", "Architectural timber", "Thermal glazing", "Landscape irrigation systems"],
    technologies: ["Smart-home wiring", "Premium marble finishing", "Landscaping irrigation", "Solar-ready roofing"],
    results: [
      { value: "12", label: "Villas completed" },
      { value: "1", label: "Shared material standard" },
      { value: "100%", label: "Cluster QA coverage" },
    ],
    testimonial: {
      quote: "The finishing standard stayed consistent across every villa, which was the hardest part of this programme.",
      author: "Development Manager",
      role: "Zayed Developments",
    },
    technicalSpecifications: [
      { label: "Residential units", value: "12 villas" },
      { label: "Delivery type", value: "Construction and finishing" },
      { label: "Systems", value: "Smart-home ready infrastructure" },
      { label: "External works", value: "Private gardens and irrigation" },
    ],
    timeline: [
      { phase: "01 · Groundwork", title: "Infrastructure", description: "Roads, utilities and plot preparation", duration: "Q1 2023", complete: true },
      { phase: "02 · Structure", title: "Villa shells", description: "Reinforced concrete frames and roofing", duration: "Q2–Q4 2023", complete: true },
      { phase: "03 · Finishing", title: "Interior fit-out", description: "Premium materials and smart-home systems", duration: "Q1–Q3 2024", complete: true },
    ],
    gallery: [
      { src: villaExterior, alt: "Completed villa exterior", caption: "Completed exterior and garden frontage" },
      { src: villaInterior, alt: "Interior living space", caption: "Interior finishing package" },
      { src: villaGarden, alt: "Landscaped garden", caption: "Landscape and irrigation works" },
    ],
    coordinates: { lat: 29.9727, lng: 31.0146 },
    seo: {
      title: "Zayed Private Villas Case Study",
      description: "Residential villa construction and finishing case study showing materials, methods, process and project results.",
      keywords: ["luxury villas Egypt", "residential construction", "interior finishing"],
    },
  },
  {
    slug: "maadi-corporate",
    title: "Maadi Corporate HQ",
    category: "Office",
    location: "Maadi, Cairo",
    year: "2024",
    heroImage: officeExposed,
    heroImageAlt: "An executive office building exterior featuring exposed concrete and glass.",
    scope: "Corporate workplace",
    role: "Construction delivery",
    note: "A workplace environment planned for a clear transition from structure to occupation.",
    client: { name: "Nexus Engineering Group", sector: "Engineering", location: "Maadi, Cairo" },
    executiveSummary:
      "A 6-storey corporate headquarters in Maadi featuring exposed concrete aesthetics, floor-to-ceiling glazing, and a rooftop executive terrace. The building serves as the regional office for a multinational engineering firm.",
    challenge:
      "The client demanded an industrial-chic aesthetic with exposed structural elements, requiring exceptional concrete finish quality and precise MEP routing that would normally be concealed.",
    solution:
      "Rock Gate implemented a formwork system calibrated for architectural-grade concrete exposure, and coordinated MEP pathways through a BIM clash-detection process before any pour.",
    constructionProcess: [
      { index: "01", title: "Substructure", description: "Basement parking and raft foundation established the technical base of the headquarters." },
      { index: "02", title: "Exposed frame", description: "Concrete pours were sequenced around strict finish-quality checks." },
      { index: "03", title: "Fit-out", description: "MEP, glazing and finishing were coordinated around visible service routes." },
    ],
    materials: ["Architectural concrete", "Floor-to-ceiling glazing", "Exposed MEP hardware", "Raised floor systems"],
    technologies: ["Architectural concrete", "Curtain wall glazing", "BIM clash detection", "Exposed MEP routing"],
    results: [
      { value: "6", label: "Office floors" },
      { value: "0", label: "Major visible-service clashes" },
      { value: "1", label: "Integrated BIM model" },
    ],
    testimonial: {
      quote: "Rock Gate understood that exposed work leaves no margin for casual coordination. The execution reflected that.",
      author: "Head of Facilities",
      role: "Nexus Engineering Group",
    },
    technicalSpecifications: [
      { label: "Building type", value: "Corporate headquarters" },
      { label: "Height", value: "6 storeys" },
      { label: "Structure", value: "Exposed concrete frame" },
      { label: "Feature", value: "Rooftop executive terrace" },
    ],
    timeline: [
      { phase: "01 · Foundation", title: "Substructure", description: "Basement parking and raft foundation", duration: "Q2 2023", complete: true },
      { phase: "02 · Structure", title: "Superstructure", description: "Exposed concrete frame and floor slabs", duration: "Q3 2023–Q1 2024", complete: true },
      { phase: "03 · Fit-out", title: "Interior works", description: "MEP, glazing and finishing", duration: "Q2–Q3 2024", complete: true },
    ],
    gallery: [
      { src: officeExposed, alt: "Building exterior", caption: "Headquarters exterior" },
      { src: officeOpenPlan, alt: "Open-plan office interior", caption: "Open workplace fit-out" },
      { src: officeRooftop, alt: "Rooftop terrace", caption: "Rooftop executive terrace" },
    ],
    coordinates: { lat: 29.9602, lng: 31.2571 },
    seo: {
      title: "Maadi Corporate HQ Case Study",
      description: "Office headquarters case study covering architectural concrete, BIM coordination, exposed MEP routing and delivery results.",
      keywords: ["office construction Cairo", "corporate headquarters", "architectural concrete"],
    },
  },
  {
    slug: "smart-village-campus",
    title: "Smart Village Campus",
    category: "Industrial",
    location: "Giza",
    year: "2023",
    heroImage: engineersBlueprints,
    heroImageAlt: "Construction engineers reviewing blueprints on an industrial building site.",
    scope: "Industrial campus",
    role: "Engineering coordination",
    note: "A coordinated technical programme bringing site decisions into one delivery plan.",
    client: { name: "Smart Village Egypt", sector: "Technology", location: "Giza" },
    executiveSummary:
      "A 45,000 m² technology campus in Smart Village, Giza, comprising three interconnected office buildings, a central data centre, and landscaped courtyards. The campus is designed for LEED Gold certification.",
    challenge:
      "Coordinating a multi-building campus with shared infrastructure while maintaining occupancy schedules for phased tenant move-ins.",
    solution:
      "Rock Gate established a campus-wide coordination office, managing shared utilities and phased handovers through a rolling 90-day lookahead schedule reviewed with all stakeholders.",
    constructionProcess: [
      { index: "01", title: "Site enablement", description: "Utilities backbone and road network were delivered before vertical works accelerated." },
      { index: "02", title: "Building delivery", description: "Three interconnected buildings progressed through coordinated structural and envelope packages." },
      { index: "03", title: "Campus completion", description: "Landscaping, parking, commissioning and phased tenant readiness were closed as one programme." },
    ],
    materials: ["High-performance façade systems", "District cooling infrastructure", "Permeable landscape finishes", "Rainwater harvesting components"],
    technologies: ["LEED Gold design", "Central data centre", "District cooling", "Rainwater harvesting"],
    results: [
      { value: "45k m²", label: "Campus area" },
      { value: "3", label: "Interconnected buildings" },
      { value: "90 days", label: "Rolling lookahead" },
    ],
    testimonial: {
      quote: "The shared-infrastructure coordination office made a complicated campus programme legible week by week.",
      author: "Campus Programme Lead",
      role: "Smart Village Egypt",
    },
    technicalSpecifications: [
      { label: "Campus area", value: "45,000 m²" },
      { label: "Buildings", value: "Three interconnected offices" },
      { label: "Certification target", value: "LEED Gold" },
      { label: "Core utility", value: "Central data centre and district cooling" },
    ],
    timeline: [
      { phase: "01 · Enabling", title: "Site enablement", description: "Utilities backbone and road network", duration: "Q1 2022", complete: true },
      { phase: "02 · Buildings", title: "Three-building complex", description: "Structural and envelope works", duration: "Q2 2022–Q2 2023", complete: true },
      { phase: "03 · Campus", title: "Landscaping and commissioning", description: "Courtyards, parking and systems testing", duration: "Q3–Q4 2023", complete: true },
    ],
    gallery: [
      { src: engineersBlueprints, alt: "Construction phase aerial view", caption: "Engineering coordination review" },
      { src: towerCorporate, alt: "Completed campus buildings", caption: "Completed campus massing" },
      { src: campusCourtyard, alt: "Landscaped courtyard", caption: "Shared landscaped courtyard" },
    ],
    coordinates: { lat: 30.0074, lng: 31.012 },
    seo: {
      title: "Smart Village Campus Case Study",
      description: "Industrial technology campus case study with shared infrastructure, LEED Gold design, district cooling and phased handover.",
      keywords: ["technology campus Egypt", "industrial construction", "LEED Gold campus"],
    },
  },
  {
    slug: "nile-boulevard",
    title: "Nile Boulevard Retail",
    category: "Commercial",
    location: "Zamalek, Cairo",
    year: "2023",
    heroImage: retailFacade,
    heroImageAlt: "An elegant retail and commercial facade along the Nile with modern architecture.",
    scope: "Retail fit-out and façade",
    role: "Construction delivery",
    note: "A waterfront retail destination combining modern architecture with Zamalek heritage.",
    client: { name: "Zamalek Properties Ltd", sector: "Retail", location: "Zamalek, Cairo" },
    executiveSummary:
      "A premium retail promenade along the Nile in Zamalek, featuring 3,200 m² of boutique retail space, a waterfront restaurant, and curated public art installations. The design respects Zamalek's heritage streetscape.",
    challenge:
      "Working within the constraints of a dense heritage neighbourhood, with limited site access, strict noise regulations, and the need to maintain pedestrian flow along the boulevard.",
    solution:
      "Rock Gate implemented a phased construction programme with temporary pedestrian diversions, off-site prefabrication for façade elements, and a strict evening-only heavy works schedule.",
    constructionProcess: [
      { index: "01", title: "Selective demolition", description: "Strip-out and structural reinforcement were planned around constrained access windows." },
      { index: "02", title: "Façade assembly", description: "Prefabricated retail-frontage elements reduced disruptive on-site work." },
      { index: "03", title: "Public realm", description: "Tenant shells, paving and public-art zones were completed while maintaining pedestrian flow." },
    ],
    materials: ["Prefabricated façade panels", "Heritage-sensitive cladding", "Outdoor-grade paving", "Retail glazing"],
    technologies: ["Façade prefabrication", "Heritage conservation", "Night-work scheduling", "Public art installation"],
    results: [
      { value: "3,200 m²", label: "Retail space" },
      { value: "0", label: "Pedestrian closure days" },
      { value: "Night", label: "Heavy-works window" },
    ],
    testimonial: {
      quote: "The logistics were difficult, but the team protected access and presentation throughout the work.",
      author: "Asset Manager",
      role: "Zamalek Properties Ltd",
    },
    technicalSpecifications: [
      { label: "Retail area", value: "3,200 m²" },
      { label: "Programme constraint", value: "Evening-only heavy works" },
      { label: "Delivery mode", value: "Phased retail fit-out" },
      { label: "Urban condition", value: "Dense heritage neighbourhood" },
    ],
    timeline: [
      { phase: "01 · Demolition", title: "Strip-out and structure", description: "Selective demolition and structural reinforcement", duration: "Q1 2023", complete: true },
      { phase: "02 · Façade", title: "Retail frontage", description: "Glazing, cladding and signage zones", duration: "Q2–Q3 2023", complete: true },
      { phase: "03 · Fit-out", title: "Interior and landscape", description: "Tenant shells, paving and public art", duration: "Q4 2023", complete: true },
    ],
    gallery: [
      { src: retailFacade, alt: "Completed retail facade", caption: "Completed retail façade" },
      { src: restaurantTerrace, alt: "Restaurant terrace", caption: "Waterfront restaurant terrace" },
      { src: waterfrontPromenade, alt: "Waterfront promenade", caption: "Public-realm interface" },
    ],
    coordinates: { lat: 30.053, lng: 31.2189 },
    seo: {
      title: "Nile Boulevard Retail Case Study",
      description: "Waterfront retail case study in Cairo covering heritage constraints, façade prefabrication, fit-out and public-realm delivery.",
      keywords: ["retail construction Cairo", "Zamalek fit-out", "facade prefabrication"],
    },
  },
  {
    slug: "alamein-resort",
    title: "Alamein Beach Resort",
    category: "Hospitality",
    location: "North Coast",
    year: "2022",
    heroImage: resortExterior,
    heroImageAlt: "A beachfront resort building with contemporary Mediterranean architecture.",
    scope: "Resort construction and finishing",
    role: "General contracting",
    note: "A coastal hospitality destination blending Mediterranean design with Egyptian craftsmanship.",
    client: { name: "North Coast Hospitality Group", sector: "Hospitality", location: "North Coast, Egypt" },
    executiveSummary:
      "A 120-key beachfront resort on the North Coast, comprising hotel rooms, private chalets, a spa complex, and beach club. The design draws on Mediterranean architectural vernacular with local material palettes.",
    challenge:
      "Delivering a hospitality-grade finish on a coastal site with aggressive seasonal deadlines, salt-air material durability requirements, and a remote logistics chain.",
    solution:
      "Rock Gate established an on-site material testing lab for coastal durability, pre-ordered long-lead items 6 months ahead, and deployed a peak workforce of 340 to meet the seasonal deadline.",
    constructionProcess: [
      { index: "01", title: "Substructure", description: "Foundation and underground services were built around coastal soil and durability requirements." },
      { index: "02", title: "Superstructure", description: "Hotel block, chalets and spa complex advanced through seasonal workforce planning." },
      { index: "03", title: "FF&E and landscape", description: "Furnishing, pool, beach and landscape packages closed the guest-readiness programme." },
    ],
    materials: ["Coastal-grade finishes", "Salt-air resistant hardware", "Mediterranean stone", "Pool and spa waterproofing systems"],
    technologies: ["Coastal-grade materials", "Salt-air protection", "Off-site prefabrication", "Seasonal workforce planning"],
    results: [
      { value: "120", label: "Hospitality keys" },
      { value: "340", label: "Peak workforce" },
      { value: "6 mo", label: "Long-lead procurement buffer" },
    ],
    testimonial: {
      quote: "Rock Gate handled the seasonality and remote logistics with the discipline a hospitality opening requires.",
      author: "Opening Director",
      role: "North Coast Hospitality Group",
    },
    technicalSpecifications: [
      { label: "Keys", value: "120 rooms and chalets" },
      { label: "Facilities", value: "Spa complex and beach club" },
      { label: "Site condition", value: "Coastal salt-air exposure" },
      { label: "Peak workforce", value: "340 workers" },
    ],
    timeline: [
      { phase: "01 · Ground", title: "Substructure", description: "Foundation and underground services", duration: "Q3 2021", complete: true },
      { phase: "02 · Build", title: "Superstructure", description: "Hotel block, chalets and spa complex", duration: "Q4 2021–Q2 2022", complete: true },
      { phase: "03 · Finish", title: "FF&E and landscaping", description: "Furnishing, pool and beach facilities", duration: "Q3 2022", complete: true },
    ],
    gallery: [
      { src: resortExterior, alt: "Resort exterior", caption: "Beachfront resort exterior" },
      { src: resortPool, alt: "Pool and terrace", caption: "Pool and terrace works" },
      { src: resortBeachClub, alt: "Beach club", caption: "Beach club guest areas" },
    ],
    coordinates: { lat: 31.2989, lng: 27.2058 },
    seo: {
      title: "Alamein Beach Resort Case Study",
      description: "Hospitality resort case study covering coastal-grade materials, seasonal delivery, workforce planning and handover results.",
      keywords: ["hospitality construction Egypt", "North Coast resort", "coastal construction"],
    },
  },
];

/** Get a single project by its slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Get related projects — same category first, then fill with others. */
export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return PROJECTS.slice(0, limit);

  const sameCategory = PROJECTS.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = PROJECTS.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

/** Get the previous and next projects around a slug, looping end-to-end. */
export function getAdjacentProjects(
  slug: string,
): { prev: Project; next: Project } {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const n = PROJECTS.length;
  const safeIndex = index === -1 ? 0 : index;
  return {
    prev: PROJECTS[(safeIndex - 1 + n) % n],
    next: PROJECTS[(safeIndex + 1) % n],
  };
}

/** Normalize a URL query param into a valid ProjectCategory or "All". */
export function normalizeCategory(
  query: string | null,
): ProjectCategory | "All" {
  if (!query || query === "all") return "All";
  const map: Record<string, ProjectCategory> = {
    commercial: "Commercial",
    residential: "Residential",
    office: "Office",
    industrial: "Industrial",
    hospitality: "Hospitality",
  };
  return map[query.toLowerCase()] ?? "All";
}

/** Get all unique categories from the project data. */
export function getAllCategories(): string[] {
  const cats = new Set(PROJECTS.map((p) => p.category));
  return ["All", ...Array.from(cats)];
}
