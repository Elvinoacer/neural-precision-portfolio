"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SegmentationHeroVisual from "./SegmentationHeroVisual";

const stats = [
  { value: "500+", label: "Tasks Delivered" },
  { value: "99.8%", label: "Accuracy Rate" },
  { value: "24h", label: "Avg. Turnaround" },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden">
      {/* ──── Full-screen Segmentation Background ──── */}
      <SegmentationHeroVisual />

      {/* ──── Content Layer ──── */}
      <div className="relative z-10 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[100svh] px-5 md:px-8 py-32 md:py-40 w-full">
        {/* Left Side */}
        <div className="max-w-2xl">
          <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col items-start space-y-7 md:space-y-9 text-left">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 glass-pill text-on-surface-variant font-label-mono text-[11px] tracking-widest uppercase rounded-full w-max"
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
              className="space-y-6"
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                Precision Data Annotation
                <span className="block text-gradient-primary">
                  for AI Teams
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-xl font-light tracking-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
                Reliable virtual assistance, data entry, image annotation, and operational support delivered with speed and accuracy.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 pt-2 justify-start w-full"
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
                className="group relative overflow-hidden border border-white/15 text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:border-white/30 hover:bg-white/5 transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-3 backdrop-blur-sm"
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
              className="mt-8 lg:mt-12 w-full flex justify-start"
            >
              <div className="glass-panel premium-border rounded-2xl md:rounded-full px-6 py-5 md:px-8 md:py-4 inline-flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/10 w-full sm:w-auto backdrop-blur-md">
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
        </div>
        
        {/* Right Side Empty for Helix */}
        <div className="hidden lg:block" />
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
