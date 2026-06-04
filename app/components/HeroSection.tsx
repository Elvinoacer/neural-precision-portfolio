"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import AnimatedSegmentationCard from "./AnimatedSegmentationCard";

/** Segmentation image configurations */
const IMAGES = [
  {
    src: "/images/landingpage_smooth_animations/image1.png",
    alt: "2D semantic segmentation — urban scene with annotated road, vehicles, trees, and buildings",
    width: 1000,
    height: 630,
    displayClass: "w-[280px] sm:w-[320px] lg:w-[400px] xl:w-[450px]",
    positionClass: "lg:top-[0%] lg:right-[10%] xl:top-[5%] xl:right-[15%]",
    orbit: { x: [0, 20, -10, 0], y: [0, -15, 10, 0], duration: 25 },
    delay: 0.2,
    parallaxFactor: 30,
    preload: true,
  },
  {
    src: "/images/landingpage_smooth_animations/image2.png",
    alt: "2D image segmentation — street scene with color-coded road surfaces, vehicles, and sidewalks",
    width: 1000,
    height: 630,
    displayClass: "w-[240px] sm:w-[280px] lg:w-[320px] xl:w-[360px]",
    positionClass: "lg:top-[35%] lg:-right-[10%] xl:top-[40%] xl:-right-[5%]",
    orbit: { x: [0, -15, 20, 0], y: [0, 15, -20, 0], duration: 30 },
    delay: 0.4,
    parallaxFactor: 20,
    preload: false,
  },
  {
    src: "/images/landingpage_smooth_animations/image3.png",
    alt: "2D image segmentation — highway scene with segmented guardrails, terrain, and sky regions",
    width: 1152,
    height: 648,
    displayClass: "w-[260px] sm:w-[300px] lg:w-[380px] xl:w-[420px]",
    positionClass: "lg:bottom-[5%] lg:left-[-5%] xl:bottom-[10%] xl:left-[0%]",
    orbit: { x: [0, 20, -15, 0], y: [0, -10, 20, 0], duration: 22 },
    delay: 0.6,
    parallaxFactor: 25,
    preload: false,
  },
];

const stats = [
  { value: "500+", label: "Tasks Delivered" },
  { value: "99.8%", label: "Accuracy Rate" },
  { value: "24h", label: "Avg. Turnaround" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize to -0.5 … 0.5
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* ──── Aurora Background ──── */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.08) 0%, transparent 60%), " +
              "radial-gradient(ellipse 60% 80% at 20% 80%, rgba(124,58,237,0.06) 0%, transparent 50%), " +
              "radial-gradient(ellipse 50% 50% at 80% 20%, rgba(34,197,94,0.04) 0%, transparent 50%)",
          }}
        />

        {/* Aurora blobs — slow drifting */}
        <motion.div
          className="aurora-blob w-[600px] h-[600px] bg-primary/20 top-[-10%] left-[-5%]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-blob w-[500px] h-[500px] bg-secondary/15 bottom-[10%] right-[-5%]"
          animate={{
            x: [0, -60, 50, 0],
            y: [0, 50, -70, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-blob w-[400px] h-[400px] bg-tertiary/10 top-[40%] left-[30%]"
          animate={{
            x: [0, 40, -60, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle dot grid texture */}
      <div className="absolute inset-0 z-[1] dot-pattern opacity-20 pointer-events-none" />

      {/* ──── Segmentation Spotlight Glow ──── */}
      <div className="absolute right-0 lg:right-[10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-3xl bg-primary/[0.08] z-[2] pointer-events-none" />

      {/* ──── Main Content Container ──── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-[50] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-28 pb-16 lg:pt-0 lg:pb-0">
        
        {/* ──── Left: Hero Content ──── */}
        <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-center space-y-7 md:space-y-9 text-center lg:text-left z-10 pt-4 lg:pt-0">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 glass-pill text-on-surface-variant font-label-mono text-[11px] tracking-widest uppercase rounded-full mx-auto lg:mx-0 w-max"
          >
            <span className="relative w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(34,197,94,0.6)]">
              <span className="absolute inset-0 rounded-full bg-tertiary animate-ping opacity-75" />
            </span>
            Available for Projects
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h1 className="font-display text-[2.4rem] leading-[1.08] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-medium tracking-tight text-white">
              Data Annotation,
              <br className="hidden sm:block" />{" "}
              Data Entry
              <br />
              <span className="text-gradient-primary font-bold">
                &amp; Reliable Virtual
                <br className="hidden sm:block" /> Assistance
              </span>
            </h1>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-on-surface-variant/80 font-light tracking-tight">
              for Growing Teams.
            </p>
          </motion.div>

          {/* Value proposition */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            I help AI teams, businesses, and busy professionals handle
            data entry, image annotation, customer support, and admin
            operations — with precision, speed, and zero errors.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start"
          >
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-primary text-on-primary font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-3 hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5"
            >
              <span className="relative z-10 font-semibold">Book a Free Consultation</span>
              <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Link>
            <Link
              href="/services"
              className="group relative overflow-hidden border border-white/15 text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:border-white/30 hover:bg-white/5 transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-3"
            >
              View My Services
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 lg:mt-12 w-full flex justify-center lg:justify-start"
          >
            <div className="glass-panel premium-border rounded-2xl md:rounded-full px-6 py-5 md:px-8 md:py-4 inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/10 w-full sm:w-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 sm:px-6 first:sm:pl-0 last:sm:pr-0">
                  <span className="font-display text-xl md:text-2xl font-bold text-gradient-primary">
                    {stat.value}
                  </span>
                  <span className="font-label-mono text-[10px] tracking-widest uppercase text-on-surface-variant leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ──── Right: Floating Segmentation Images ──── */}
        <div className="w-full lg:w-[50%] xl:w-[55%] relative min-h-[400px] sm:min-h-[500px] lg:h-[700px] flex flex-col lg:block items-center justify-center gap-6 mt-8 lg:mt-0 z-0">
          {/* Desktop: Floating Images (Absolute positioning) */}
          <div className="hidden lg:block absolute inset-0">
            {IMAGES.map((img) => (
              <AnimatedSegmentationCard
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                orbitConfig={img.orbit}
                delay={img.delay}
                mouseX={mouseX}
                mouseY={mouseY}
                parallaxFactor={img.parallaxFactor}
                preload={img.preload}
                className={`${img.displayClass} ${img.positionClass}`}
              />
            ))}
          </div>

          {/* Mobile/Tablet: Stacked Images (Flex layout) */}
          <div className="lg:hidden flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 w-full">
            {IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                className={`glass-image-card ${img.displayClass} relative`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.03, 1],
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: img.delay },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 },
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-label-mono text-[9px] tracking-[0.25em] uppercase text-muted">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
          <span className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
