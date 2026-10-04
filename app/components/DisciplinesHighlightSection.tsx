"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CORE_DISCIPLINES, GALLERY_PROJECTS, NON_VISION_DELIVERABLES, DisciplineInfo } from "../data/galleryData";
import { soundFx } from "../utils/soundEffects";

interface DisciplinesHighlightSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export default function DisciplinesHighlightSection({ onSelectProject }: DisciplinesHighlightSectionProps) {
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>("3d-lidar");

  const activeDiscipline: DisciplineInfo =
    CORE_DISCIPLINES.find((d) => d.id === selectedDisciplineId) || CORE_DISCIPLINES[0];

  const isNonVision =
    activeDiscipline.name === "Data Entry" ||
    activeDiscipline.name === "Virtual Assistant Services";

  useEffect(() => {
    const handleSelect = (e: CustomEvent<{ discipline?: string; category?: string }>) => {
      const match = CORE_DISCIPLINES.find(
        (d) => d.name === e.detail?.discipline || d.id === e.detail?.category
      );
      if (match) {
        setSelectedDisciplineId(match.id);
      }
    };
    window.addEventListener("select-discipline", handleSelect as EventListener);
    return () => window.removeEventListener("select-discipline", handleSelect as EventListener);
  }, []);

  // Find sample vision projects associated with active discipline
  const sampleProjects = GALLERY_PROJECTS.filter((p) =>
    p.disciplines.includes(activeDiscipline.name)
  ).slice(0, 4);

  const nonVisionDeliverables = NON_VISION_DELIVERABLES.filter(
    (d) => d.discipline === activeDiscipline.name
  );

  const handleSelectDiscipline = (id: string) => {
    setSelectedDisciplineId(id);
    soundFx.playSwitch();
  };

  const accentStyles = {
    primary: {
      badge: "border-primary/30 bg-primary/10 text-primary",
      border: "border-primary/40",
      glow: "shadow-[0_0_25px_rgba(0,212,255,0.2)]",
      activeBg: "bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(0,212,255,0.35)]",
      iconColor: "text-primary",
      bulletColor: "bg-primary",
    },
    secondary: {
      badge: "border-secondary/30 bg-secondary/10 text-secondary",
      border: "border-secondary/40",
      glow: "shadow-[0_0_25px_rgba(245,158,11,0.2)]",
      activeBg: "bg-secondary text-surface-container-lowest font-bold shadow-[0_0_20px_rgba(245,158,11,0.35)]",
      iconColor: "text-secondary",
      bulletColor: "bg-secondary",
    },
    tertiary: {
      badge: "border-tertiary/30 bg-tertiary/10 text-tertiary",
      border: "border-tertiary/40",
      glow: "shadow-[0_0_25px_rgba(34,197,94,0.2)]",
      activeBg: "bg-tertiary text-surface-container-lowest font-bold shadow-[0_0_20px_rgba(34,197,94,0.35)]",
      iconColor: "text-tertiary",
      bulletColor: "bg-tertiary",
    },
  };

  const activeStyle = accentStyles[activeDiscipline.accent];

  return (
    <section id="disciplines" className="w-full py-20 md:py-32 relative bg-surface-dim section-gradient-top overflow-hidden scroll-mt-20">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-secondary/[0.05] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,212,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            CORE CAPABILITIES // 8 SPECIALIZED DISCIPLINES
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Engineered for Precision Across Every{" "}
            <span className="text-gradient-primary">Data & Operations Layer</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 font-light leading-relaxed">
            From millimeter-accurate 3D LiDAR point clouds and sub-pixel semantic segmentation to verified high-volume
            data entry and high-touch virtual assistant workflows. Every task is audited for 99.8%+ accuracy.
          </p>
        </div>

        {/* 8 Disciplines Tab Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-14">
          {CORE_DISCIPLINES.map((disc) => {
            const isSelected = disc.id === selectedDisciplineId;
            const style = accentStyles[disc.accent];
            return (
              <button
                key={disc.id}
                onClick={() => handleSelectDiscipline(disc.id)}
                className={`px-4 py-2 rounded-full font-label-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? style.activeBg
                    : "glass-pill text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5"
                }`}
                aria-label={`Select ${disc.name}`}
              >
                <span className="material-symbols-outlined text-sm">{disc.icon}</span>
                <span>{disc.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Discipline Active Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Discipline Deep Dive */}
          <div className="lg:col-span-7 glass-panel rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
            {/* Top Badge & Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-label-mono uppercase tracking-widest border ${activeStyle.badge}`}>
                {activeDiscipline.badge}
              </span>
              <span className="font-label-mono text-xs text-white/50 tracking-widest uppercase">
                DISCIPLINE // 0{CORE_DISCIPLINES.findIndex((d) => d.id === activeDiscipline.id) + 1} OF 08
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center">
                <span className={`material-symbols-outlined text-2xl ${activeStyle.iconColor}`}>
                  {activeDiscipline.icon}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeDiscipline.name}
                </h3>
                <p className="font-label-mono text-xs text-primary/90 mt-0.5">
                  {activeDiscipline.tagline}
                </p>
              </div>
            </div>

            <p className="font-body-lg text-sm sm:text-base text-white/80 leading-relaxed mb-8">
              {activeDiscipline.description}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {activeDiscipline.keyMetrics.map((metric) => (
                <div key={metric.label} className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col">
                  <span className="font-label-mono text-[10px] text-white/50 uppercase tracking-widest mb-1">
                    {metric.label}
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold text-white">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Technical Deliverables List */}
            <div className="mb-8">
              <h4 className="font-label-mono text-xs uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">verified</span>
                <span>Verified Technical Deliverables</span>
              </h4>
              <ul className="space-y-2.5">
                {activeDiscipline.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 leading-snug">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${activeStyle.bulletColor}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tool Stack */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-label-mono text-[10px] uppercase tracking-widest text-white/50 block mb-1.5">
                  Platforms & Tooling
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDiscipline.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/15 text-[11px] font-label-mono text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#interactive-studio"
                  onClick={() => {
                    if (isNonVision) {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("select-discipline", {
                            detail: {
                              discipline: activeDiscipline.name,
                              category: activeDiscipline.name === "Data Entry" ? "data-entry" : "virtual-assistant",
                            },
                          })
                        );
                      }
                    } else {
                      const sampleId = activeDiscipline.sampleProjectIds[0];
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("launch-workbench", {
                            detail: { projectId: sampleId, category: activeDiscipline.id },
                          })
                        );
                      }
                      onSelectProject?.(sampleId);
                    }
                  }}
                  className="px-5 py-2 rounded-full bg-primary text-black font-label-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isNonVision ? "tune" : "view_in_ar"}
                  </span>
                  <span>{isNonVision ? "Open in Simulator" : "Test in 3D Workbench"}</span>
                </a>

                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-label-mono text-xs uppercase tracking-wider font-medium transition-all border border-white/15 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Hire for {activeDiscipline.name}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Correlated Real Deliverable Samples */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-label-mono text-xs uppercase tracking-widest text-white/70 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-tertiary">collections</span>
                <span>Associated Project Deliverables</span>
              </h4>
              <Link
                href="/portfolio"
                className="font-label-mono text-[11px] text-primary hover:underline uppercase tracking-wider flex items-center gap-1"
              >
                <span>All 24 Samples</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </Link>
            </div>

            {isNonVision ? (
              <div className="flex flex-col gap-4">
                {nonVisionDeliverables.map((deliv) => (
                  <div
                    key={deliv.id}
                    className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 space-y-4 hover:border-secondary/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-8 h-8 rounded-lg ${activeStyle.badge} flex items-center justify-center`}>
                          <span className="material-symbols-outlined text-base">{deliv.icon}</span>
                        </span>
                        <div>
                          <h5 className="font-display text-sm font-bold text-white line-clamp-1">
                            {deliv.title}
                          </h5>
                          <p className="font-label-mono text-[10px] text-white/50">{deliv.categoryLabel}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono bg-tertiary/20 text-tertiary border border-tertiary/30 shrink-0">
                        {deliv.badge}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-label-mono">
                      {deliv.metrics.map((m) => (
                        <div key={m.label} className="p-2 rounded-lg bg-black/40 border border-white/5">
                          <span className="text-white/40 block text-[9px] uppercase">{m.label}</span>
                          <span className="text-white font-medium">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-white/70 font-body-md leading-relaxed line-clamp-2">
                      {deliv.description}
                    </p>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-label-mono">
                      <div className="flex flex-wrap gap-1">
                        {deliv.tools.slice(0, 3).map((tool) => (
                          <span key={tool} className="px-2 py-0.5 rounded bg-white/5 text-white/60 text-[10px]">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={deliv.discipline === "Data Entry" ? "/portfolio#ai-dataset-cleaning" : "/services#virtual-assistant"}
                        className="text-primary hover:underline flex items-center gap-1 font-bold"
                      >
                        <span>View Details</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : sampleProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="glass-panel rounded-xl overflow-hidden border border-white/10 group hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="relative w-full h-36 bg-black/60 overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-label-mono text-primary border border-primary/30">
                        {proj.iouScore} IoU
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-tertiary/20 backdrop-blur-md text-[9px] font-label-mono text-tertiary border border-tertiary/30">
                        QA PASS
                      </div>
                    </div>
                    <div className="p-3.5">
                      <h5 className="font-display text-xs font-bold text-white line-clamp-1 mb-1">
                        {proj.title}
                      </h5>
                      <p className="font-label-mono text-[10px] text-white/50 line-clamp-1 mb-2">
                        {proj.sensorType}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-label-mono">
                        <span className="text-white/60">{proj.classes.length} Classes</span>
                        <a
                          href="#interactive-studio"
                          onClick={() => onSelectProject?.(proj.id)}
                          className="text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>Test in 3D</span>
                          <span className="material-symbols-outlined text-[11px]">arrow_outward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Quick Consultation Callout Box */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02] flex items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping" />
                <span className="font-label-mono text-xs text-white/90">
                  Ready for long-term or project-based engagement
                </span>
              </div>
              <Link
                href="/contact"
                className="font-label-mono text-xs text-primary font-bold hover:underline shrink-0"
              >
                Inquire Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
