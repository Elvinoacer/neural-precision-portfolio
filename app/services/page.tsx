import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "../components/CTASection";

export const metadata: Metadata = {
  title: "Services — 3D LiDAR, Segmentation, Data Entry & Virtual Assistant",
  description:
    "Hire Everlyn Linda for 3D LiDAR point cloud annotation, 2D segmentation, semantic segmentation, instance segmentation, bounding box, polygon vectors, verified data entry, and executive virtual assistant services.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services — 3D LiDAR, Segmentation, Data Entry & VA | Everlyn Linda",
    description:
      "Precision 3D LiDAR point cloud annotation, 2D & semantic segmentation, bounding boxes, polygon vectors, spreadsheet data entry, and virtual assistant operations.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/images/everlyn_linda_photo.webp",
        width: 1200,
        height: 630,
        alt: "Everlyn Linda Services — 3D LiDAR, Data Annotation & Virtual Assistance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — 3D LiDAR, Data Annotation & VA | Everlyn Linda",
    description:
      "3D LiDAR, 2D segmentation, semantic segmentation, instance segmentation, bounding box, polygon, data entry, and virtual assistant services.",
  },
};

const DISCIPLINES_NAV = [
  { id: "3d-lidar", name: "3D LiDAR", icon: "radar" },
  { id: "2d-segmentation", name: "2D Segmentation", icon: "layers" },
  { id: "semantic-segmentation", name: "Semantic Segmentation", icon: "brush" },
  { id: "instance-segmentation", name: "Instance Segmentation", icon: "polyline" },
  { id: "bounding-box", name: "Bounding box", icon: "crop_free" },
  { id: "polygon", name: "Polygon", icon: "draw" },
  { id: "data-entry", name: "Data Entry", icon: "table_chart" },
  { id: "virtual-assistant", name: "Virtual Assistant Services", icon: "person_check" },
];

const services: {
  id: string;
  icon: string;
  title: string;
  discipline: string;
  tagline: string;
  items: string[];
  tools: string[];
  accent: "primary" | "secondary" | "tertiary";
  cta: string;
  sampleLink?: { href: string; label: string };
}[] = [
  {
    id: "3d-lidar",
    discipline: "3D LiDAR",
    icon: "radar",
    title: "3D LiDAR Point Cloud Annotation",
    tagline:
      "Sub-centimeter 9-DOF cuboids, intensity reflectance thresholding & ground drivable plane extraction across 128-beam sensors.",
    items: [
      "9-DOF oriented 3D bounding boxes (center x, y, z, dimensions l, w, h, roll, pitch, yaw)",
      "Dense point cloud semantic classification (vehicles, pedestrians, cyclists, barriers, foliage)",
      "Intensity reflectance threshold mapping & ground drivable plane separation",
      "Camera-to-LiDAR multi-sensor fusion projection & optical alignment verification",
      "Compatible with Velodyne Alpha Prime, Hesai Pandar, Ouster OS2, and RoboSense rigs",
      "Exportable in KITTI format, nuScenes JSON, ROS bag manifests, and custom schemas",
    ],
    tools: ["CVAT 3D", "Labelbox Point Cloud", "ROS RViz", "Scale AI 3D", "CloudCompare"],
    accent: "primary",
    cta: "Request 3D LiDAR Support",
    sampleLink: {
      href: "/portfolio",
      label: "View 3D LiDAR Production Datasets",
    },
  },
  {
    id: "2d-segmentation",
    discipline: "2D Segmentation",
    icon: "layers",
    title: "2D Image Segmentation",
    tagline:
      "Ultra-sharp pixel-level boundary delineation across complex optical domains with zero mask bleeding.",
    items: [
      "High-contrast roadway surface and infrastructure boundary isolation",
      "Challenging low-light tunnel corridor and road hazard segmentation",
      "Overhead gantry and regulatory highway signage mask extractions",
      "Pixel-level drivable lane, shoulder, curb, and crosswalk demarcations",
      "Cityscapes and COCO annotation quality standards compliance",
      "PNG binary alpha masks, JSON polygon manifests, and RLE compressed datasets",
    ],
    tools: ["Labelbox", "CVAT", "V7 Darwin", "Photoshop QA Masking", "Supervisely"],
    accent: "secondary",
    cta: "Request 2D Segmentation Support",
    sampleLink: {
      href: "/portfolio",
      label: "View 2D Segmentation Samples",
    },
  },
  {
    id: "semantic-segmentation",
    discipline: "Semantic Segmentation",
    icon: "brush",
    title: "Semantic Segmentation (Dense Class-Level)",
    tagline:
      "Comprehensive scene pixel classification ensuring every pixel belongs to an ontological category without unassigned gaps.",
    items: [
      "Dense multi-class semantic masks according to client-defined label ontologies",
      "Organic foliage canopy, tree silhouettes, and distant atmospheric horizon lines",
      "Multi-lane urban intersection surface and sidewalk demarcation",
      "Multi-spectral forward-facing camera dataset annotation for autonomous driving",
      "Strict edge boundary tolerance (<1.2px) validated against ground truth",
      "Zero boundary bleed across dynamic traffic, asphalt, and concrete medians",
    ],
    tools: ["CVAT Polygon", "Segments.ai Superpixels", "Labelbox", "Dataloop"],
    accent: "primary",
    cta: "Request Semantic Segmentation Support",
    sampleLink: {
      href: "/portfolio",
      label: "View Semantic Datasets",
    },
  },
  {
    id: "instance-segmentation",
    discipline: "Instance Segmentation",
    icon: "polyline",
    title: "Instance Segmentation (Object ID Separation)",
    tagline:
      "Assigns distinct instance IDs and individual masks to overlapping objects in crowded, heavy-occlusion scenes.",
    items: [
      "Individual vehicle instance masks in tight parking bays and stop-and-go traffic queues",
      "Vulnerable Road User (VRU) crowd separation with distinct limb contouring",
      "Occlusion percentage classification and instance visibility flags (up to 90% overlap)",
      "Unique temporal tracking IDs across multi-camera video sequences",
      "Strict shadow separation preventing synthetic boundary expansion",
      "Delivered in COCO Instances JSON, Pascal VOC XML, and polygon coordinates",
    ],
    tools: ["CVAT Instance Tool", "Labelbox Polygons", "V7 Darwin", "Scale AI"],
    accent: "tertiary",
    cta: "Request Instance Segmentation Support",
    sampleLink: {
      href: "/portfolio",
      label: "View Instance Datasets",
    },
  },
  {
    id: "bounding-box",
    discipline: "Bounding box",
    icon: "crop_free",
    title: "Bounding Box & 3D Cuboids",
    tagline:
      "Razor-tight 2D rectangular and 3D projected bounding boxes fitted with verified occlusion and truncation headers.",
    items: [
      "Millimeter-tight 2D bounding boxes for vehicle, pedestrian, cyclist, and signage detection",
      "3D oriented bounding boxes projected from LiDAR to optical planes",
      "Attribute tagging: heading angle, brake light status, door open/closed, turn indicators",
      "Occlusion percentage classification (None, Partial, Heavy, Fully Occluded)",
      "High throughput: 1,200+ verified bounding boxes per day",
      "Formats: YOLO txt, Pascal VOC XML, COCO JSON, TensorFlow TFRecord",
    ],
    tools: ["CVAT", "LabelImg", "Labelbox", "Roboflow", "Darknet YOLO Toolchain"],
    accent: "secondary",
    cta: "Request Bounding Box Support",
    sampleLink: {
      href: "/portfolio",
      label: "View Bounding Box Samples",
    },
  },
  {
    id: "polygon",
    discipline: "Polygon",
    icon: "draw",
    title: "Polygon Vector Annotation",
    tagline:
      "Multi-vertex vector contours capturing irregular geometries, curved highway dividers, and complex silhouettes.",
    items: [
      "Fine-grain polygon tracing with up to 250 vertices per complex object",
      "Curved highway ramp dividers, guardrail barriers, and perimeter fencing",
      "Overhead electronic gantry truss structures and variable message displays",
      "Organic silhouettes: windblown tree canopies, construction debris, damaged vehicles",
      "Sub-pixel curve fitting with ±0.5px tolerance",
      "Exportable in GeoJSON, COCO JSON polygon points, SVG paths, and binary masks",
    ],
    tools: ["CVAT Polygon", "Labelbox Vector Engine", "Dataloop", "Supervisely"],
    accent: "primary",
    cta: "Request Polygon Annotation Support",
    sampleLink: {
      href: "/portfolio",
      label: "View Polygon Samples",
    },
  },
  {
    id: "data-entry",
    discipline: "Data Entry",
    icon: "table_chart",
    title: "Data Entry & Management",
    tagline:
      "Meticulous, zero-error spreadsheet entry, database record population, AI dataset cleaning, and catalog operations.",
    items: [
      "AI model evaluation dataset standardization, cleaning, and ISO 8601 formatting",
      "Multi-platform e-commerce product cataloging (Shopify, Amazon Seller Central, WooCommerce)",
      "B2B CRM pipeline hygiene, deduplication, and domain MX lead enrichment (HubSpot, Salesforce)",
      "Financial receipt, invoice, and bill digitization with discrepancy audit logs",
      "Database population, field normalization, and schema migration (Google Sheets, Airtable, Excel)",
      "Verified 99.9% accuracy rate with comprehensive QA signoff dossiers",
    ],
    tools: ["Google Sheets", "Microsoft Excel", "Airtable", "Notion", "HubSpot CRM"],
    accent: "secondary",
    cta: "Request Data Entry Support",
    sampleLink: {
      href: "/portfolio#ai-dataset-cleaning",
      label: "View AI Dataset Cleaning Dossier",
    },
  },
  {
    id: "virtual-assistant",
    discipline: "Virtual Assistant Services",
    icon: "person_check",
    title: "Virtual Assistant Services",
    tagline:
      "Dependable remote operational execution for founders, fast-scaling startups, and AI teams.",
    items: [
      "Executive inbox zero triage, custom priority filter rules, and rapid draft replies",
      "Calendar scheduling, multi-timezone coordination, and executive meeting briefs",
      "Tier 1/2 customer support ticketing (Zendesk, Freshdesk, Intercom) with 98.5% CSAT",
      "Agile project coordination, task board management, and milestone tracking (Asana, Trello, ClickUp)",
      "Confidential executive document preparation, presentation decks, and web research",
      "Fast response SLA (<30 minutes) under strict non-disclosure compliance",
    ],
    tools: ["Google Workspace", "Slack", "Asana", "Trello", "ClickUp", "Zoom", "Zendesk"],
    accent: "tertiary",
    cta: "Hire Me as a Virtual Assistant",
    sampleLink: {
      href: "/portfolio",
      label: "View Virtual Assistant Deliverables",
    },
  },
];

const accentMap: Record<
  string,
  { border: string; text: string; bgGlow: string; iconShadow: string; badge: string }
> = {
  primary: {
    border: "border-primary/30",
    text: "text-primary",
    bgGlow: "from-primary/8",
    iconShadow: "shadow-[0_0_20px_rgba(0,212,255,0.15)]",
    badge: "bg-primary/10 text-primary border-primary/30",
  },
  secondary: {
    border: "border-secondary/30",
    text: "text-secondary",
    bgGlow: "from-secondary/8",
    iconShadow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    badge: "bg-secondary/10 text-secondary border-secondary/30",
  },
  tertiary: {
    border: "border-tertiary/30",
    text: "text-tertiary",
    bgGlow: "from-tertiary/8",
    iconShadow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
    badge: "bg-tertiary/10 text-tertiary border-tertiary/30",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-surface-dim">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Everlyn Linda services hero banner"
            className="object-cover object-center opacity-50"
            fill
            priority
            sizes="100vw"
            src="/images/services-hero.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/68 to-surface-container-lowest/25" />
          <div className="absolute inset-0 bg-black/8" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-primary mb-5 border border-primary/20 px-4 py-2 rounded-full glass-pill inline-block">
            Services &amp; Core Disciplines
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-light mt-5 mb-5">
            What I Can{" "}
            <span className="font-bold text-gradient-primary">
              Help You With
            </span>
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-8">
            Engineered precision across every data, computer vision, and operational layer.
            Explore all 8 specialized disciplines below, each tailored to client guidelines.
          </p>

          {/* Quick Jump Pills for All 8 Disciplines */}
          <div className="flex flex-wrap items-center gap-2 max-w-4xl">
            {DISCIPLINES_NAV.map((disc) => (
              <a
                key={disc.id}
                href={`#${disc.id}`}
                className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/15 hover:border-primary/50 text-xs font-label-mono text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-xs text-primary">{disc.icon}</span>
                <span>{disc.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Specialized Discipline Sections */}
      {services.map((service, idx) => {
        const colors = accentMap[service.accent];
        return (
          <section
            key={service.id}
            id={service.id}
            className={`w-full py-16 md:py-24 relative section-divider scroll-mt-20 ${
              idx % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-dim"
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-5 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* Left Column: Summary & CTAs */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-pill flex items-center justify-center border ${colors.border} ${colors.iconShadow}`}
                    >
                      <span
                        className={`material-symbols-outlined ${colors.text} text-2xl sm:text-3xl`}
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        {service.icon}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-label-mono uppercase tracking-wider border ${colors.badge}`}>
                      DISCIPLINE // 0{idx + 1} OF 08
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-bold mb-3">
                    {service.title}
                  </h2>
                  <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed mb-8">
                    {service.tagline}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    <Link
                      href="/contact"
                      className={`premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-7 py-4 rounded-full hover:bg-primary/20 transition-all duration-500 inline-flex items-center gap-3`}
                    >
                      <span className="relative z-10">{service.cta}</span>
                      <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                    {service.sampleLink && (
                      <Link
                        href={service.sampleLink.href}
                        className="py-4 px-5 rounded-full border border-white/15 text-white/80 hover:text-white font-label-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-all inline-flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-xs text-primary">visibility</span>
                        <span>{service.sampleLink.label}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Column: Detailed Deliverables & Tools */}
                <div className="lg:col-span-7">
                  <div className="glass-panel premium-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10">
                    <h3
                      className={`font-label-mono text-xs uppercase tracking-widest ${colors.text} mb-6 flex items-center gap-2`}
                    >
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Verified Scope of Deliverables</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
                      {service.items.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <span
                            className={`material-symbols-outlined ${colors.text} text-base mt-0.5 shrink-0`}
                          >
                            check_circle
                          </span>
                          <span className="font-body-md text-sm text-on-surface-variant leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                          Tools &amp; Infrastructure
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {service.tools.map((tool) => (
                            <span
                              key={tool}
                              className="glass-pill text-on-surface-variant font-label-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/#interactive-studio"
                        className="text-primary hover:underline font-label-mono text-xs flex items-center gap-1 font-bold"
                      >
                        <span>Test in 3D Studio</span>
                        <span className="material-symbols-outlined text-xs">arrow_outward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}
