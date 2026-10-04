"use client";

import Link from "next/link";

const DISCIPLINES_PILLS = [
  { name: "3D LiDAR", href: "#disciplines", icon: "radar" },
  { name: "2D Segmentation", href: "#disciplines", icon: "layers" },
  { name: "Semantic Segmentation", href: "#disciplines", icon: "brush" },
  { name: "Instance Segmentation", href: "#disciplines", icon: "polyline" },
  { name: "Bounding box", href: "#disciplines", icon: "crop_free" },
  { name: "Polygon", href: "#disciplines", icon: "draw" },
  { name: "Data Entry", href: "#disciplines", icon: "table_chart" },
  { name: "Virtual Assistant Services", href: "#disciplines", icon: "person_check" },
];

export default function ServicesSnapshot() {
  const handlePillClick = (e: React.MouseEvent, pillName: string) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-discipline", {
          detail: { discipline: pillName },
        })
      );
    }
    const el = document.getElementById("disciplines");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      icon: "radar",
      title: "3D LiDAR & Computer Vision",
      badge: "3D LiDAR • 9-DOF Cuboids",
      desc: "128-beam point cloud labeling, 9-DOF oriented bounding cuboids, roll/pitch/yaw heading calibrations, and multi-sensor Camera-to-LiDAR fusion.",
      href: "/services#3d-lidar",
      accent: "primary",
    },
    {
      icon: "layers",
      title: "Segmentation & Vector Annotation",
      badge: "2D • Semantic • Instance • Polygon",
      desc: "Sub-pixel 2D segmentation, dense semantic scene masking, instance object ID separation, and high-density multi-vertex polygon contours.",
      href: "/services#2d-segmentation",
      accent: "primary",
    },
    {
      icon: "table_chart",
      title: "Data Entry & Management",
      badge: "99.9% Verified Accuracy",
      desc: "Zero-error spreadsheet entry, AI dataset cleaning, ISO 8601 formatting, e-commerce cataloging, and B2B CRM deduplication.",
      href: "/services#data-entry",
      accent: "secondary",
    },
    {
      icon: "person_check",
      title: "Virtual Assistant Services",
      badge: "<30 Min Response SLA",
      desc: "Executive inbox zero triage, confidential calendar scheduling, agile task board coordination (Asana, Trello), and operational execution.",
      href: "/services#virtual-assistant",
      accent: "tertiary",
    },
    {
      icon: "support_agent",
      title: "Customer Support & Ticketing",
      badge: "98.5% CSAT Score",
      desc: "Multi-tier customer support desk (Zendesk, Intercom, Freshdesk), empathetic resolution, ticket escalation, and brand consistency.",
      href: "/services#virtual-assistant",
      accent: "tertiary",
    },
    {
      icon: "smart_toy",
      title: "AI / LLM Evaluation & RLHF",
      badge: "Human-in-the-Loop",
      desc: "AI prompt evaluation, response quality rating, dataset normalization, model feedback loops, and benchmark validation.",
      href: "/services#data-entry",
      accent: "secondary",
    },
  ];

  const accentMap: Record<string, { border: string; text: string; iconBg: string; hoverBorder: string; badge: string }> = {
    primary: {
      border: "border-primary/20",
      text: "text-primary",
      iconBg: "bg-primary/10",
      hoverBorder: "hover:border-primary/40",
      badge: "bg-primary/10 text-primary border-primary/30",
    },
    secondary: {
      border: "border-secondary/20",
      text: "text-secondary",
      iconBg: "bg-secondary/10",
      hoverBorder: "hover:border-secondary/40",
      badge: "bg-secondary/10 text-secondary border-secondary/30",
    },
    tertiary: {
      border: "border-tertiary/20",
      text: "text-tertiary",
      iconBg: "bg-tertiary/10",
      hoverBorder: "hover:border-tertiary/40",
      badge: "bg-tertiary/10 text-tertiary border-tertiary/30",
    },
  };

  return (
    <section className="py-20 md:py-32 relative z-10 bg-surface-dim section-gradient-top overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-10">
        <header className="mb-12 md:mb-16 text-center flex flex-col items-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-primary mb-5 border border-primary/20 px-4 py-2 rounded-full glass-pill">
            What I Help You With
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white mb-5 tracking-tight font-light">
            Core <span className="font-bold text-gradient-primary">Services</span>
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-6">
            Comprehensive remote solutions for fast-moving AI teams, founders, and enterprises.
            High-precision computer vision annotation paired with meticulous operational execution.
          </p>

          {/* Quick 8 Disciplines Navigation Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl">
            {DISCIPLINES_PILLS.map((pill) => (
              <a
                key={pill.name}
                href={pill.href}
                onClick={(e) => handlePillClick(e, pill.name)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 text-xs font-label-mono text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs text-primary">{pill.icon}</span>
                <span>{pill.name}</span>
              </a>
            ))}
          </div>
        </header>

        {/* Grid of 6 High-Impact Offerings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => {
            const colors = accentMap[service.accent];
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`glass-panel rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col gap-4 relative group overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/[0.06] ${colors.hoverBorder}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colors.border} ${colors.iconBg} shrink-0 transition-all duration-500 group-hover:scale-110`}
                  >
                    <span
                      className={`material-symbols-outlined ${colors.text} text-xl`}
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      {service.icon}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-label-mono border ${colors.badge}`}>
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-medium text-white tracking-tight relative z-10 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant relative z-10 leading-relaxed">
                  {service.desc}
                </p>
                <span className="font-label-mono text-xs text-primary uppercase tracking-widest relative z-10 mt-auto flex items-center gap-2 group-hover:gap-3 transition-all pt-2">
                  <span>Explore Capabilities</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
