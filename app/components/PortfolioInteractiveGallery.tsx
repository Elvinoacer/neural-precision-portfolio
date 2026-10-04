"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GALLERY_PROJECTS,
  GalleryProject,
  CoreDiscipline,
  NON_VISION_DELIVERABLES,
  NonVisionDeliverable,
} from "../data/galleryData";
import { soundFx } from "../utils/soundEffects";

type FilterTab = "All" | CoreDiscipline;

export default function PortfolioInteractiveGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProject, setModalProject] = useState<GalleryProject | null>(null);
  const [modalNonVision, setModalNonVision] = useState<NonVisionDeliverable | null>(null);

  const filterTabs: FilterTab[] = [
    "All",
    "3D LiDAR",
    "2D Segmentation",
    "Semantic Segmentation",
    "Instance Segmentation",
    "Bounding box",
    "Polygon",
    "Data Entry",
    "Virtual Assistant Services",
  ];

  const isNonVisionFilter =
    activeFilter === "Data Entry" || activeFilter === "Virtual Assistant Services";

  // Filter Computer Vision projects
  const filteredProjects = GALLERY_PROJECTS.filter((proj) => {
    if (isNonVisionFilter) return false;
    const matchesFilter =
      activeFilter === "All" || proj.disciplines.includes(activeFilter as CoreDiscipline);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      proj.title.toLowerCase().includes(q) ||
      proj.subtitle.toLowerCase().includes(q) ||
      proj.tools.some((t) => t.toLowerCase().includes(q)) ||
      proj.classes.some((c) => c.name.toLowerCase().includes(q)) ||
      proj.disciplines.some((d) => d.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  // Filter Non-Vision deliverables
  const filteredNonVision = NON_VISION_DELIVERABLES.filter((deliv) => {
    const matchesFilter = isNonVisionFilter
      ? deliv.discipline === activeFilter
      : activeFilter === "All" && searchQuery.length > 0;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      deliv.title.toLowerCase().includes(q) ||
      deliv.subtitle.toLowerCase().includes(q) ||
      deliv.description.toLowerCase().includes(q) ||
      deliv.tools.some((t) => t.toLowerCase().includes(q)) ||
      deliv.deliverables.some((d) => d.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  const handleSelectFilter = (tab: FilterTab) => {
    setActiveFilter(tab);
    soundFx.playClick();
  };

  const openModal = (proj: GalleryProject) => {
    setModalProject(proj);
    soundFx.playLock();
  };

  const closeModal = () => {
    setModalProject(null);
    setModalNonVision(null);
  };

  return (
    <div className="w-full">
      {/* Controls Bar: Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        {/* Discipline Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            const count =
              tab === "All"
                ? GALLERY_PROJECTS.length
                : tab === "Data Entry" || tab === "Virtual Assistant Services"
                ? NON_VISION_DELIVERABLES.filter((d) => d.discipline === tab).length
                : GALLERY_PROJECTS.filter((p) => p.disciplines.includes(tab as CoreDiscipline)).length;

            return (
              <button
                key={tab}
                onClick={() => handleSelectFilter(tab)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full font-label-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                    : "glass-pill text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-black/20 text-black font-bold" : "bg-white/10 text-white/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, sensors, classes..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/15 focus:border-primary/60 focus:bg-white/10 text-xs font-label-mono text-white placeholder-white/40 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Non-Vision Deliverables (When Data Entry or VA is selected) */}
      {isNonVisionFilter ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredNonVision.map((deliv) => (
            <article
              key={deliv.id}
              className="glass-panel premium-border rounded-2xl overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:border-secondary/50 transition-all duration-500 hover:-translate-y-1 p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-xl">{deliv.icon}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono bg-tertiary/15 text-tertiary border border-tertiary/30 font-bold">
                    {deliv.badge}
                  </span>
                </div>

                <span className="font-label-mono text-[10px] text-white/50 uppercase tracking-widest block mb-1">
                  {deliv.categoryLabel}
                </span>

                <h3
                  onClick={() => setModalNonVision(deliv)}
                  className="font-display text-lg text-white font-medium tracking-tight mb-2 hover:text-secondary transition-colors cursor-pointer"
                >
                  {deliv.title}
                </h3>

                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                  {deliv.description}
                </p>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-2 gap-2 mb-4 font-label-mono text-xs">
                  {deliv.metrics.map((m) => (
                    <div key={m.label} className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <span className="text-white/40 block text-[9px] uppercase">{m.label}</span>
                      <span className="text-white font-medium">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Key Deliverables bullets */}
                <ul className="space-y-1.5 mb-4 text-xs font-body-md text-white/70">
                  {deliv.deliverables.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                      <span className="line-clamp-2">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {deliv.tools.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-white/60 text-[10px] font-label-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setModalNonVision(deliv)}
                  className="text-xs font-label-mono text-primary hover:underline flex items-center gap-1 cursor-pointer font-bold shrink-0"
                >
                  <span>Specs</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Grid of 24 Computer Vision & Sensor Projects */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((proj) => (
            <article
              key={proj.id}
              className="glass-panel premium-border rounded-2xl overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div>
                {/* Image Preview */}
                <div
                  onClick={() => openModal(proj)}
                  className="relative h-56 sm:h-64 w-full bg-surface-dim overflow-hidden cursor-pointer"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="glass-pill px-2.5 py-1 font-label-mono text-[9px] tracking-widest uppercase rounded-full border border-primary/30 bg-black/60 backdrop-blur-md text-primary font-bold">
                      IoU: {proj.iouScore}
                    </span>
                    <span className="glass-pill px-2.5 py-1 font-label-mono text-[9px] tracking-widest uppercase rounded-full border border-tertiary/30 bg-black/60 backdrop-blur-md text-tertiary">
                      QA PASS
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1 rounded-full bg-primary text-black font-label-mono text-[10px] uppercase font-bold flex items-center gap-1 shadow-lg">
                      <span className="material-symbols-outlined text-xs">zoom_in</span>
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  {/* Disciplines Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.disciplines.map((d) => (
                      <span
                        key={d}
                        className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-label-mono text-white/70"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <h3
                    onClick={() => openModal(proj)}
                    className="font-display text-lg md:text-xl text-white font-medium tracking-tight mb-2 group-hover:text-primary transition-colors cursor-pointer"
                  >
                    {proj.title}
                  </h3>

                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-2">
                    {proj.description}
                  </p>

                  {/* Meta details */}
                  <div className="space-y-2 text-xs font-label-mono">
                    <div className="flex items-center justify-between text-white/50 text-[11px] border-b border-white/5 pb-1.5">
                      <span>Sensor Rig</span>
                      <span className="text-white/80 font-medium truncate max-w-[180px]">
                        {proj.sensorType.split("+")[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-white/50 text-[11px] border-b border-white/5 pb-1.5">
                      <span>Tooling</span>
                      <span className="text-white/80 font-medium truncate max-w-[180px]">
                        {proj.tools.join(" • ")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-white/50 text-[11px]">
                      <span>Resolution</span>
                      <span className="text-white/80 font-medium">
                        {proj.width} × {proj.height} px
                      </span>
                    </div>
                  </div>

                  {/* Class Distribution Swatches */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1">
                    {proj.classes.slice(0, 3).map((cls) => (
                      <span
                        key={cls.name}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[9px] font-label-mono text-white/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cls.color }} />
                        <span className="truncate max-w-[90px]">{cls.name}</span>
                      </span>
                    ))}
                    {proj.classes.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-label-mono text-white/40">
                        +{proj.classes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-2 border-t border-white/5 mt-4">
                <button
                  onClick={() => openModal(proj)}
                  className="text-xs font-label-mono text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Full Specs</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>

                <Link
                  href={`/?project=${proj.id}#interactive-studio`}
                  className="text-[10px] font-label-mono text-white/50 hover:text-white flex items-center gap-1 border border-white/10 px-2.5 py-1 rounded-full hover:border-white/30 transition-all"
                >
                  <span className="material-symbols-outlined text-xs text-primary">view_in_ar</span>
                  <span>Test in 3D</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((!isNonVisionFilter && filteredProjects.length === 0) ||
        (isNonVisionFilter && filteredNonVision.length === 0)) && (
        <div className="text-center py-20 glass-panel rounded-2xl border border-white/10">
          <span className="material-symbols-outlined text-4xl text-white/30 mb-3">manage_search</span>
          <h4 className="font-display text-lg text-white font-medium">No deliverables matched your criteria</h4>
          <p className="text-xs font-label-mono text-white/50 mt-1">Try clearing your search query or choosing another discipline tab.</p>
          <button
            onClick={() => {
              setActiveFilter("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/40 font-label-mono text-xs uppercase"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Full-Screen Inspection Modal for Computer Vision Datasets */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto glass-panel rounded-2xl md:rounded-3xl border border-white/20 p-6 sm:p-8 bg-surface-dim shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-label-mono text-[10px] uppercase font-bold">
                    {modalProject.categoryLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary/10 border border-tertiary/30 text-tertiary font-label-mono text-[10px] uppercase">
                    QA Certified
                  </span>
                  <span className="font-label-mono text-[10px] text-white/40 uppercase">
                    {modalProject.width} × {modalProject.height} PX
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {modalProject.title}
                </h3>
                <p className="font-label-mono text-xs text-primary/80 mt-1">
                  {modalProject.subtitle}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal High-Res Image Stage */}
            <div className="relative w-full h-80 sm:h-96 md:h-[460px] rounded-xl overflow-hidden mb-6 bg-black border border-white/10">
              <Image
                src={modalProject.image}
                alt={modalProject.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md text-xs font-label-mono text-white/80 border border-white/15">
                IoU Score: <strong className="text-primary">{modalProject.iouScore}</strong> • Confidence: <strong className="text-tertiary">{modalProject.confidence}</strong>
              </div>
            </div>

            {/* Modal Two-Column Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Description & Metrics (Col 7) */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-label-mono text-xs uppercase tracking-widest text-white/60">
                  Task Overview & Methodology
                </h4>
                <p className="font-body-lg text-sm text-white/80 leading-relaxed">
                  {modalProject.description}
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs font-label-mono">
                  <div className="flex justify-between">
                    <span className="text-white/50">Sensor System:</span>
                    <span className="text-white font-medium">{modalProject.sensorType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Production Tools:</span>
                    <span className="text-white font-medium">{modalProject.tools.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Annotation Volume:</span>
                    <span className="text-primary font-bold">{modalProject.pointCount || modalProject.polygonCount}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {modalProject.disciplines.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-label-mono text-white"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ontology Classes & Boxes (Col 5) */}
              <div className="md:col-span-5 space-y-4">
                <h4 className="font-label-mono text-xs uppercase tracking-widest text-white/60">
                  Ontology Classes ({modalProject.classes.length})
                </h4>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {modalProject.classes.map((cls) => (
                    <div
                      key={cls.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 text-xs font-label-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cls.color }} />
                        <span className="text-white/90">{cls.name}</span>
                      </div>
                      <span className="text-white/40">{cls.count} instances</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col gap-2.5">
                  <Link
                    href={`/?project=${modalProject.id}#interactive-studio`}
                    onClick={closeModal}
                    className="w-full py-2.5 rounded-full bg-primary text-black font-label-mono text-xs uppercase tracking-wider font-bold text-center flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">view_in_ar</span>
                    <span>Test This Project in 3D Studio</span>
                  </Link>

                  <Link
                    href="/contact"
                    className="w-full py-2.5 rounded-full border border-white/20 hover:border-white/40 text-white font-label-mono text-xs uppercase tracking-wider text-center block transition-all cursor-pointer"
                  >
                    Request Similar Deliverable
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Inspection Modal for Non-Vision Deliverables (Data Entry & VA) */}
      {modalNonVision && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel rounded-2xl md:rounded-3xl border border-white/20 p-6 sm:p-8 bg-surface-dim shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 border border-secondary/30 text-secondary font-label-mono text-[10px] uppercase font-bold">
                    {modalNonVision.discipline}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary/15 border border-tertiary/30 text-tertiary font-label-mono text-[10px] uppercase">
                    {modalNonVision.badge}
                  </span>
                  <span className="font-label-mono text-[10px] text-white/50 uppercase">
                    {modalNonVision.qaVerification}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {modalNonVision.title}
                </h3>
                <p className="font-label-mono text-xs text-secondary mt-1">
                  {modalNonVision.subtitle}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {modalNonVision.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col">
                  <span className="font-label-mono text-[10px] text-white/50 uppercase tracking-widest mb-1">
                    {m.label}
                  </span>
                  <span className="font-display text-base font-bold text-white">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Description & Deliverables */}
            <div className="space-y-6">
              <div>
                <h4 className="font-label-mono text-xs uppercase tracking-widest text-white/60 mb-2">
                  Operational Scope & Methodology
                </h4>
                <p className="font-body-lg text-sm text-white/80 leading-relaxed">
                  {modalNonVision.description}
                </p>
              </div>

              <div>
                <h4 className="font-label-mono text-xs uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-secondary">verified</span>
                  <span>Verified Deliverables & Audit Steps</span>
                </h4>
                <ul className="space-y-2">
                  {modalNonVision.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-label-mono text-[10px] text-white/50 uppercase tracking-widest block mb-1.5">
                    Utilized Platforms & Tooling
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {modalNonVision.tools.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/15 text-[11px] font-label-mono text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={modalNonVision.discipline === "Data Entry" ? "/portfolio#ai-dataset-cleaning" : "/services#virtual-assistant"}
                    onClick={closeModal}
                    className="px-4 py-2 rounded-full border border-white/20 text-white font-label-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
                  >
                    View Section
                  </Link>

                  <Link
                    href="/contact"
                    className="px-5 py-2 rounded-full bg-primary text-black font-label-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                  >
                    Inquire for Engagement
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
