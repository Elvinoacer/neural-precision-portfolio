"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "/images/landingpage_smooth_animations/image1.png",
  "/images/landingpage_smooth_animations/image2.png",
  "/images/landingpage_smooth_animations/image3.png",
];

const DURATION = 3500;

export default function SegmentationHeroVisual() {
  const [current, setCurrent] = useState(0);
  const [conf, setConf] = useState(98.7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
      setConf(96 + Math.random() * 3.5);
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sh-hero w-full shadow-2xl premium-border">
      {/* ──── Slides ──── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
            transition={{
              opacity: { duration: 1.2 },
              scale: { duration: 8, ease: "linear" },
              rotate: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={IMAGES[current]}
              alt={`Segmentation scene ${current + 1}`}
              fill
              className="object-cover"
              priority={current === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ──── Vignette ──── */}
      <div className="sh-vignette" />

      {/* ──── Color Bars ──── */}
      <div className="sh-colorbar top">
        <div className="sh-colorbar-inner" />
      </div>
      <div className="sh-colorbar bottom">
        <div className="sh-colorbar-inner" />
      </div>

      {/* ──── Scanline ──── */}
      <div className="sh-overlay-scan">
        <div className="sh-scanline" />
      </div>

      {/* ──── HUD Corners ──── */}
      <div className="sh-hud">
        <div className="sh-corner tl" />
        <div className="sh-corner tr" />
        <div className="sh-corner bl" />
        <div className="sh-corner br" />
      </div>

      {/* ──── Spinning Rings ──── */}
      <div className="sh-ring-wrap">
        <div className="sh-ring" />
        <div className="sh-ring2" />
        <div className="sh-ring-dot" />
      </div>

      {/* ──── Floating Tags ──── */}
      <div className="sh-tag">road</div>
      <div className="sh-tag">sky</div>
      <div className="sh-tag">vehicle</div>
      <div className="sh-tag">terrain</div>

      {/* ──── Segmentation Info ──── */}
      <div className="sh-seg-info">
        <span>SEMANTIC SEG</span>
        <span>FRAME {String(current + 1).padStart(3, "0")}</span>
        <span>CONF {conf.toFixed(1)}%</span>
      </div>

      {/* ──── Progress Dots ──── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx);
              setConf(96 + Math.random() * 3.5);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-[6px] h-[6px] rounded-full border transition-all duration-400 ${
              idx === current
                ? "bg-[rgba(0,230,180,0.9)] scale-150 border-[rgba(0,230,180,0.8)]"
                : "bg-white/30 border-white/40 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
