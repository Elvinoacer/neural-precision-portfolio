import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "../components/CTASection";

export const metadata: Metadata = {
  title: "About Everlyn Linda — Data Annotation Specialist & Virtual Assistant",
  description:
    "Meet Everlyn Linda — a detail-oriented data annotation specialist and virtual assistant based in Kenya. 150+ projects, 5000+ annotation hours, serving AI teams and businesses worldwide with accurate data work and reliable remote support.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About Everlyn Linda — Data Annotation Specialist & Virtual Assistant",
    description:
      "Meet Everlyn Linda — a detail-oriented data annotation specialist and virtual assistant based in Kenya, helping teams work smarter with accurate data and reliable support.",
    url: "/about",
    type: "profile",
    images: [
      {
        url: "/images/everlyn_linda_photo.webp",
        width: 1200,
        height: 630,
        alt: "Everlyn Linda — Data Annotation Specialist & Virtual Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About Everlyn Linda — Data Annotation Specialist & Virtual Assistant",
    description:
      "150+ projects, 5000+ annotation hours. Detail-oriented data annotation specialist & virtual assistant based in Kenya.",
  },
};

export default function AboutPage() {
  const credibility = [
    {
      icon: "location_on",
      label: "Based in Kenya, available remotely worldwide",
    },
    {
      icon: "build",
      label:
        "Experienced with CVAT, Labelbox, Google Workspace, Slack, Trello, Asana, Zoom",
    },
    {
      icon: "trending_up",
      label: "Strong in time management, communication, and task accuracy",
    },
    { icon: "handshake", label: "Open to long-term and project-based work" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-surface-dim">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Everlyn Linda about hero banner"
            className="object-cover object-center opacity-50"
            fill
            priority
            sizes="100vw"
            src="/images/about-hero.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/70 to-surface-container-lowest/25"></div>
          <div className="absolute inset-0 bg-black/8"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/6 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            About Me
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight font-light mt-5 max-w-4xl leading-[1.15]">
            A Detail-Oriented Data Annotation Specialist and Virtual Assistant{" "}
            <span className="font-bold text-gradient-primary">
              Helping Teams Work Smarter.
            </span>
          </h1>
        </div>
      </section>

      {/* Bio + Portrait */}
      <section className="w-full py-16 md:py-24 relative bg-surface-container-lowest section-divider">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <div className="lg:col-span-5 relative group">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden premium-border glass-panel transition-transform duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                <Image
                  alt="Everlyn Linda"
                  className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  src="/images/everlyn_linda_photo.webp"
                  width={800}
                  height={1000}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-70 z-20"></div>
              </div>
              <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-right-4 glass-pill px-6 py-4 sm:px-8 sm:py-6 rounded-2xl z-30 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl animate-float">
                <div className="font-display text-2xl sm:text-3xl text-white font-light tracking-tight">
                  Est. 2020
                </div>
                <div className="font-label-mono text-[10px] sm:text-xs tracking-widest text-primary uppercase mt-1">
                  Data &amp; Operations
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10 lg:pl-8 mt-8 lg:mt-0">
              <div className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant space-y-5 leading-relaxed">
                <p>
                  I&apos;m Everlyn Linda, a remote data annotation specialist
                  and virtual assistant based in Kenya. I support businesses, AI
                  teams, and professionals with accurate data work, organized
                  admin support, and reliable customer service.
                </p>
                <p>
                  My strength is consistency: following instructions carefully,
                  communicating clearly, meeting deadlines, and keeping work
                  structured from start to finish.
                </p>
              </div>

              {/* Credibility blocks */}
              <div className="space-y-4">
                {credibility.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 glass-panel rounded-xl p-4 border-l-2 border-l-primary/40"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                    <span className="font-body-md text-sm sm:text-base text-on-surface-variant">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-8">
                {[
                  {
                    value: "150",
                    suffix: "+",
                    label: "Projects",
                    accentClass: "text-primary",
                    borderClass: "border-l-primary/50",
                  },
                  {
                    value: "5k",
                    suffix: "+",
                    label: "Annotation Hours",
                    accentClass: "text-secondary",
                    borderClass: "border-l-secondary/50",
                  },
                  {
                    value: "40",
                    suffix: "+",
                    label: "Clients Served",
                    accentClass: "text-tertiary",
                    borderClass: "border-l-tertiary/50",
                  },
                  {
                    value: "99.8",
                    suffix: "%",
                    label: "Accuracy Rate",
                    accentClass: "text-primary",
                    borderClass: "border-l-primary/50",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`glass-panel p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-center border-l-2 ${stat.borderClass}`}
                  >
                    <span className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-1">
                      {stat.value}
                      <span className={stat.accentClass}>{stat.suffix}</span>
                    </span>
                    <span className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-on-surface-variant">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:bg-primary/20 transition-all duration-500 inline-flex items-center gap-3"
              >
                <span className="relative z-10">
                  Let&apos;s Discuss Your Project
                </span>
                <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
