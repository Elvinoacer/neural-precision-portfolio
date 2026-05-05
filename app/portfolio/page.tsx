import type { Metadata } from "next";
import Image from "next/image";
import CTASection from "../components/CTASection";

export const metadata: Metadata = {
  title: "Work Samples & Portfolio — Data Annotation, VA & Customer Support",
  description:
    "View Everlyn Linda's work samples: semantic segmentation, road hazard bounding box annotation, LLM evaluation, data entry workflows, email management templates, and customer support examples. Evidence of quality and precision.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Work Samples & Portfolio — Data Annotation & Virtual Assistant | Everlyn Linda",
    description:
      "View Everlyn Linda's portfolio: data annotation projects, image segmentation samples, virtual assistant workflows, and customer support case studies.",
    url: "/portfolio",
    type: "website",
    images: [
      {
        url: "/images/i1.jpeg",
        width: 1200,
        height: 630,
        alt: "Everlyn Linda Portfolio — Semantic Segmentation Sample",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Samples & Portfolio | Everlyn Linda",
    description:
      "Data annotation, image segmentation, VA workflows, and customer support samples. Evidence of quality and precision.",
    images: ["/images/i1.jpeg"],
  },
};

const annotationSamples = [
  {
    title: "Road Hazard Annotation",
    tag: "Bounding Box",
    tagColor: "secondary",
    image: "/images/i2.jpeg",
    task: "Label road hazards from image datasets for autonomous driving models",
    tools: "CVAT / Labelbox",
    focus: "Accuracy, consistency, object boundaries, clear categorization",
    outcome: "Clean labeled data ready for review or model training",
  },
  {
    title: "Semantic Segmentation",
    tag: "Pixel-Level",
    tagColor: "primary",
    image: "/images/i1.jpeg",
    task: "Dense lane annotations and boundary separation for road scenes",
    tools: "Labelbox / Brush & Polygon tools",
    focus: "Pixel-level precision, class consistency, edge accuracy",
    outcome: "High-fidelity segmentation masks for computer vision pipelines",
  },
];

const dataEntrySamples = [
  {
    title: "Spreadsheet Data Entry",
    desc: "Structured spreadsheet management, database input, and document formatting with consistent naming conventions and zero-error accuracy.",
    icon: "table_chart",
  },
  {
    title: "Product Listing & Catalogs",
    desc: "E-commerce product data entry — titles, descriptions, pricing, SKUs, and image uploads organized for multi-platform consistency.",
    icon: "inventory_2",
  },
  {
    title: "Database & CRM Entry",
    desc: "Contact record creation, lead data entry, CRM field population, and data cleaning across Airtable, HubSpot, and Google Sheets.",
    icon: "database",
  },
  {
    title: "Invoice & Receipt Processing",
    desc: "Digitization and organized entry of invoices, receipts, and financial records into spreadsheets or accounting platforms.",
    icon: "receipt_long",
  },
];

const vaSamples = [
  {
    title: "Email Management",
    desc: "Professional email response templates, inbox organization, priority sorting, and follow-up scheduling for busy executives.",
    icon: "mail",
  },
  {
    title: "Project Workflow Setup",
    desc: "Trello/Asana board organization, task creation, milestone tracking, and team assignment workflows for project management.",
    icon: "view_kanban",
  },
  {
    title: "Research & Reporting",
    desc: "Online research compilation, data summarization, and formatted report creation for market analysis and competitive intelligence.",
    icon: "analytics",
  },
];

const supportSamples = [
  {
    title: "Ticket Response",
    desc: "Professional, empathetic ticket responses with clear resolution steps, estimated timelines, and follow-up protocols.",
    icon: "confirmation_number",
  },
  {
    title: "Escalation Workflow",
    desc: "Structured escalation procedures with severity classification, routing logic, and SLA-aware tracking.",
    icon: "priority_high",
  },
  {
    title: "Customer Follow-Up",
    desc: "Proactive follow-up templates and sequences to ensure customer satisfaction and issue resolution.",
    icon: "follow_the_signs",
  },
];

const portfolioGallery = [
  {
    title: "Road Scene Segmentation",
    image: "/images/portfolios/p1.png",
    alt: "Annotated road scene with semantic segmentation overlays",
  },
  {
    title: "Vehicle Detection Sample",
    image: "/images/portfolios/p2.png",
    alt: "Annotated vehicle scene with bounding boxes and segmentation overlays",
  },
];

const tagColorMap: Record<string, string> = {
  primary: "text-primary border-primary/20",
  secondary: "text-secondary border-secondary/20",
  tertiary: "text-tertiary border-tertiary/20",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-surface-dim">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Everlyn Linda portfolio hero banner"
            className="object-cover object-center opacity-50"
            fill
            priority
            sizes="100vw"
            src="/images/portfolio-hero.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/68 to-surface-container-lowest/25"></div>
          <div className="absolute inset-0 bg-black/8"></div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/6 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10 text-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Portfolio
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-light mt-5 mb-5">
            Selected{" "}
            <span className="font-bold text-gradient-primary">
              Work Samples
            </span>
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Evidence, not just claims. A glimpse into the precision and quality
            I bring to every project.
          </p>
        </div>
      </section>

      {/* Data Annotation Samples */}
      <section className="w-full py-16 md:py-24 relative bg-surface-container-lowest section-divider">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-10 md:mb-16">
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary mb-3 block">
              Category 01
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-light">
              Data Annotation{" "}
              <span className="font-bold text-gradient-primary">Samples</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {annotationSamples.map((sample) => (
              <article
                key={sample.title}
                className="glass-panel premium-border rounded-2xl md:rounded-3xl overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="relative h-[220px] sm:h-[280px] md:h-[320px] w-full bg-surface-dim overflow-hidden">
                  <Image
                    alt={sample.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    src={sample.image}
                    width={600}
                    height={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`glass-pill px-3 py-1.5 font-label-mono text-[10px] tracking-widest uppercase rounded-full border ${tagColorMap[sample.tagColor]}`}
                    >
                      {sample.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl md:text-2xl text-white mb-4 tracking-tight font-medium">
                    {sample.title}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <span className="font-label-mono text-[10px] uppercase tracking-widest text-muted w-16 shrink-0 pt-0.5">
                        Task
                      </span>
                      <span className="text-on-surface-variant font-body-md">
                        {sample.task}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-label-mono text-[10px] uppercase tracking-widest text-muted w-16 shrink-0 pt-0.5">
                        Tools
                      </span>
                      <span className="text-on-surface-variant font-body-md">
                        {sample.tools}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-label-mono text-[10px] uppercase tracking-widest text-muted w-16 shrink-0 pt-0.5">
                        Focus
                      </span>
                      <span className="text-on-surface-variant font-body-md">
                        {sample.focus}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-label-mono text-[10px] uppercase tracking-widest text-muted w-16 shrink-0 pt-0.5">
                        Result
                      </span>
                      <span className="text-on-surface-variant font-body-md">
                        {sample.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="w-full py-16 md:py-24 relative bg-surface-container-lowest section-divider">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-10 md:mb-16 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="font-label-mono text-xs uppercase tracking-widest text-secondary mb-3 block">
                Category 01B
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-light">
                Portfolio <span className="font-bold text-gradient-secondary">Gallery</span>
              </h2>
            </div>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
              Two labeled scene examples from the portfolio image set, shown here in the same visual language as the rest of the site.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {portfolioGallery.map((item) => (
              <article
                key={item.title}
                className="glass-panel premium-border rounded-2xl md:rounded-3xl overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="relative h-60 sm:h-75 md:h-90 w-full bg-surface-dim overflow-hidden">
                  <Image
                    alt={item.alt}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    src={item.image}
                    width={1200}
                    height={720}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest via-surface-container-lowest/35 to-transparent"></div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl md:text-2xl text-white tracking-tight font-medium">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Data Entry Samples */}
      <section className="w-full py-16 md:py-24 relative bg-surface-dim section-divider">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-10 md:mb-16">
            <span className="font-label-mono text-xs uppercase tracking-widest text-secondary mb-3 block">
              Category 02
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-light">
              Data Entry{" "}
              <span className="font-bold text-gradient-secondary">Samples</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {dataEntrySamples.map((sample) => (
              <div
                key={sample.title}
                className="glass-panel premium-border rounded-2xl p-6 sm:p-8 group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="w-11 h-11 rounded-xl glass-pill flex items-center justify-center border border-secondary/20 mb-5">
                  <span
                    className="material-symbols-outlined text-secondary text-lg"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    {sample.icon}
                  </span>
                </div>
                <h3 className="font-display text-lg text-white mb-2 font-medium tracking-tight">
                  {sample.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {sample.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VA Samples */}
      <section className="w-full py-16 md:py-24 relative bg-surface-container-lowest section-divider">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-10 md:mb-16">
            <span className="font-label-mono text-xs uppercase tracking-widest text-tertiary mb-3 block">
              Category 03
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-light">
              Virtual Assistant{" "}
              <span className="font-bold">Samples</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {vaSamples.map((sample) => (
              <div
                key={sample.title}
                className="glass-panel premium-border rounded-2xl p-6 sm:p-8 group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="w-11 h-11 rounded-xl glass-pill flex items-center justify-center border border-tertiary/20 mb-5">
                  <span
                    className="material-symbols-outlined text-tertiary text-lg"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    {sample.icon}
                  </span>
                </div>
                <h3 className="font-display text-lg text-white mb-2 font-medium tracking-tight">
                  {sample.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {sample.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Support Samples */}
      <section className="w-full py-16 md:py-24 relative bg-surface-dim section-divider">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-10 md:mb-16">
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary mb-3 block">
              Category 04
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight font-light">
              Customer Support <span className="font-bold">Samples</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {supportSamples.map((sample) => (
              <div
                key={sample.title}
                className="glass-panel premium-border rounded-2xl p-6 sm:p-8 group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="w-11 h-11 rounded-xl glass-pill flex items-center justify-center border border-tertiary/20 mb-5">
                  <span
                    className="material-symbols-outlined text-tertiary text-lg"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    {sample.icon}
                  </span>
                </div>
                <h3 className="font-display text-lg text-white mb-2 font-medium tracking-tight">
                  {sample.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {sample.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="w-full py-8 md:py-12 bg-surface-dim">
        <div className="text-center">
          <p className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-muted flex items-center justify-center gap-3">
            <span className="w-6 md:w-8 h-[1px] bg-white/15"></span>
            Detailed private portfolio available upon request
            <span className="w-6 md:w-8 h-[1px] bg-white/15"></span>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
