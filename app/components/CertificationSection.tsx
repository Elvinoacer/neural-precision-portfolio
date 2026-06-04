"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TRUST_BADGES = [
  { icon: "verified", label: "Verified Training" },
  { icon: "segment", label: "Segmentation Skills" },
  { icon: "model_training", label: "AI Dataset Experience" },
];

export default function CertificationSection() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-surface-container-lowest section-gradient-top overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section header */}
        <header className="mb-12 md:mb-20 text-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Certification
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mt-5">
            Certified in{" "}
            <span className="font-bold text-gradient-primary">2D Image Segmentation</span>
          </h2>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Certificate preview card */}
          <motion.div
            className="cert-perspective"
            initial={{ opacity: 0, rotateY: 8, scale: 0.92 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative group">
              {/* Certificate image */}
              <div className="glass-card premium-border rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_80px_rgba(0,212,255,0.12)]">
                <Image
                  src="/images/certificate-preview.png"
                  alt="2D Image Segmentation Training Certificate — Everline Lindah"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                  loading="lazy"
                  quality={90}
                />
              </div>

              {/* Floating trust badges */}
              <div className="absolute -bottom-4 left-4 right-4 sm:-bottom-5 sm:left-6 sm:right-6 flex flex-wrap gap-2 sm:gap-3 justify-center">
                {TRUST_BADGES.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="glass-pill rounded-full px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 border border-primary/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-sm sm:text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {badge.icon}
                    </span>
                    <span className="font-label-mono text-[10px] sm:text-xs tracking-wider uppercase text-on-surface-variant whitespace-nowrap">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight">
                Professional{" "}
                <span className="text-gradient-primary font-bold">Annotation Training</span>
              </h3>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-lg mx-auto lg:mx-0">
                Professional training in image segmentation workflows,
                annotation quality standards, and AI training data
                preparation. Equipped with industry-standard techniques
                for semantic segmentation, boundary definition, and
                quality assurance.
              </p>
            </div>

            {/* Skills covered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
              {[
                "Semantic Segmentation",
                "Quality Assurance (IoU, F1)",
                "Boundary Definition",
                "Annotation Workflows",
                "Instance Segmentation",
                "Error Analysis",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2.5 text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-tertiary text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-body-md text-sm">{skill}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/2D segmentation training certificate - Everline Lindah.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center gap-3 border border-primary/30 text-primary font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:border-primary/60 hover:bg-primary/5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,212,255,0.15)]"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                description
              </span>
              View Certificate
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
