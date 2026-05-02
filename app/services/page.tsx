import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "../components/CTASection";

export const metadata: Metadata = {
  title: "Services — Data Annotation, Virtual Assistance & AI Training",
  description:
    "Hire Everlyn Linda for data annotation, image segmentation, virtual assistant services, customer support, and AI/LLM training support. Clear service breakdowns with detailed capabilities.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services — Data Annotation, Virtual Assistance & AI Training | Everlyn Linda",
    description:
      "Professional data annotation, image segmentation, virtual assistant, customer support, and AI training services. Detailed service breakdowns and capabilities.",
    url: "/services",
    type: "website",
    images: [
      {
        url: "/images/everlyn_linda_photo.webp",
        width: 1200,
        height: 630,
        alt: "Everlyn Linda Services — Data Annotation & Virtual Assistance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Data Annotation, VA & AI Training | Everlyn Linda",
    description:
      "Professional data annotation, virtual assistant, customer support, and AI training services by Everlyn Linda.",
  },
};

const services = [
  {
    id: "data-annotation",
    icon: "dataset",
    title: "Data Annotation Services",
    tagline:
      "Clean, consistent, and well-labeled datasets for AI, computer vision, and machine learning teams.",
    items: [
      "Image annotation (bounding boxes, keypoints)",
      "Segmentation annotation (semantic, instance, panoptic)",
      "Road hazard annotation",
      "2D image annotation",
      "gNext annotation",
      "Quality review & validation",
      "Dataset organization & management",
    ],
    tools: ["Labelbox", "CVAT", "Appen", "Brush & Polygon tools"],
    accent: "primary",
    cta: "Request Data Annotation Support",
  },
  {
    id: "data-entry",
    icon: "table_chart",
    title: "Data Entry & Management",
    tagline:
      "Accurate, structured data entry and database management for businesses that need clean records, organized spreadsheets, and zero-error input.",
    items: [
      "Spreadsheet data entry & formatting",
      "Database input & record management",
      "Document digitization & formatting",
      "Invoice & receipt processing",
      "Product listing & catalog management",
      "Contact list building & cleaning",
      "Data migration & conversion",
    ],
    tools: ["Google Sheets", "Excel", "Airtable", "Google Workspace", "CRM Platforms"],
    accent: "secondary",
    cta: "Request Data Entry Support",
  },
  {
    id: "virtual-assistant",
    icon: "person",
    title: "Virtual Assistant Services",
    tagline:
      "Professional remote assistance for founders, teams, and businesses that need reliable daily execution.",
    items: [
      "Email management & correspondence",
      "Customer support & communication",
      "Calendar management & scheduling",
      "CRM updates & maintenance",
      "Document organization & formatting",
      "Online research & reporting",
      "Task coordination & follow-ups",
    ],
    tools: ["Google Workspace", "Trello", "Asana", "ClickUp", "Slack"],
    accent: "tertiary",
    cta: "Hire Me as a Virtual Assistant",
  },
  {
    id: "customer-support",
    icon: "support_agent",
    title: "Customer Support Services",
    tagline:
      "Friendly, organized, and timely customer communication across email, chat, and support platforms.",
    items: [
      "Ticket handling & resolution",
      "Live chat support",
      "Customer follow-up & retention",
      "Support documentation & FAQs",
      "Escalation tracking & management",
    ],
    tools: ["Email platforms", "Live chat tools", "CRM systems"],
    accent: "tertiary",
    cta: "Get Customer Support Help",
  },
  {
    id: "ai-training",
    icon: "smart_toy",
    title: "AI / LLM Training Support",
    tagline:
      "Human-in-the-loop support for improving AI model outputs through careful evaluation, labeling, and content review.",
    items: [
      "Response rating & quality scoring",
      "Prompt evaluation & testing",
      "Data cleaning & preprocessing",
      "Content categorization & tagging",
      "Model feedback tasks & RLHF",
    ],
    tools: ["AI training platforms", "Evaluation frameworks", "ChatGPT"],
    accent: "primary",
    cta: "Discuss AI Training Support",
  },
];

const accentMap: Record<
  string,
  { border: string; text: string; bgGlow: string; iconShadow: string }
> = {
  primary: {
    border: "border-primary/30",
    text: "text-primary",
    bgGlow: "from-primary/8",
    iconShadow: "shadow-[0_0_20px_rgba(0,212,255,0.15)]",
  },
  secondary: {
    border: "border-secondary/30",
    text: "text-secondary",
    bgGlow: "from-secondary/8",
    iconShadow: "shadow-[0_0_20px_rgba(124,58,237,0.15)]",
  },
  tertiary: {
    border: "border-tertiary/30",
    text: "text-tertiary",
    bgGlow: "from-tertiary/8",
    iconShadow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
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
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/68 to-surface-container-lowest/25"></div>
          <div className="absolute inset-0 bg-black/8"></div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-primary mb-5 border border-primary/20 px-4 py-2 rounded-full glass-pill inline-block">
            Services
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-light mt-5 mb-5">
            What I Can{" "}
            <span className="font-bold text-gradient-primary">
              Help You With
            </span>
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Clear, structured service offerings so you know exactly what
            you&apos;re getting. Each service is tailored to your project&apos;s
            needs.
          </p>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, idx) => {
        const colors = accentMap[service.accent];
        return (
          <section
            key={service.id}
            id={service.id}
            className={`w-full py-16 md:py-24 relative section-divider ${idx % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-dim"}`}
          >
            <div className="max-w-[1400px] mx-auto px-5 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <div className="lg:col-span-5">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-pill flex items-center justify-center border ${colors.border} ${colors.iconShadow} mb-6`}
                  >
                    <span
                      className={`material-symbols-outlined ${colors.text} text-2xl sm:text-3xl`}
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      {service.icon}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-light mb-4">
                    {service.title}
                  </h2>
                  <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed mb-8">
                    {service.tagline}
                  </p>
                  <Link
                    href="/contact"
                    className={`premium-border relative group overflow-hidden bg-${service.accent === "primary" ? "primary" : service.accent === "secondary" ? "secondary" : "tertiary"}/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-7 py-4 rounded-full hover:bg-primary/20 transition-all duration-500 inline-flex items-center gap-3`}
                  >
                    <span className="relative z-10">{service.cta}</span>
                    <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>

                <div className="lg:col-span-7">
                  <div className="glass-panel premium-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10">
                    <h3
                      className={`font-label-mono text-xs uppercase tracking-widest ${colors.text} mb-6`}
                    >
                      Included Services
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
                      {service.items.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <span
                            className={`material-symbols-outlined ${colors.text} text-base mt-0.5 shrink-0`}
                          >
                            check
                          </span>
                          <span className="font-body-md text-sm sm:text-base text-on-surface-variant">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                        Tools & Platforms
                      </h4>
                      <div className="flex flex-wrap gap-2">
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
