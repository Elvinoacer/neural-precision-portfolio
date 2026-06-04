"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "/images/landingpage_smooth_animations/image1.png",
  "/images/landingpage_smooth_animations/image2.png",
  "/images/landingpage_smooth_animations/image3.png",
];

const TAGS = [
  { label: "road", color: "#00e6b4", borderColor: "rgba(0,230,180,0.5)" },
  { label: "sky", color: "#ffb400", borderColor: "rgba(255,180,0,0.5)" },
  { label: "vehicle", color: "#00b4ff", borderColor: "rgba(0,180,255,0.5)" },
  { label: "terrain", color: "#ff507a", borderColor: "rgba(255,80,122,0.5)" },
  { label: "building", color: "#a78bfa", borderColor: "rgba(167,139,250,0.5)" },
  { label: "sidewalk", color: "#34d399", borderColor: "rgba(52,211,153,0.5)" },
];

const DURATION = 4500;

/**
 * Full-screen background segmentation slideshow with HUD overlays.
 * Designed to sit at z-0 behind all hero text content.
 */
export default function SegmentationHeroVisual() {
  const [current, setCurrent] = useState(0);
  const [conf, setConf] = useState(98.7);
  const [segCount, setSegCount] = useState(12);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % IMAGES.length);
    setConf(96 + Math.random() * 3.5);
    setSegCount(Math.floor(8 + Math.random() * 10));
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, DURATION);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* ──── Image Slides ──── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            opacity: { duration: 1.8, ease: "easeInOut" },
            scale: { duration: 12, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={IMAGES[current]}
            alt={`Segmentation scene ${current + 1}`}
            fill
            className="object-cover"
            priority={current === 0}
            quality={85}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ──── Dark Gradient Overlay (readability) ──── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ──── Vignette ──── */}
      <div className="sh-vignette" style={{ zIndex: 2 }} />

      {/* ──── Color Bars ──── */}
      <div className="sh-colorbar top" style={{ zIndex: 3 }}>
        <div className="sh-colorbar-inner" />
      </div>
      <div className="sh-colorbar bottom" style={{ zIndex: 3 }}>
        <div className="sh-colorbar-inner" />
      </div>

      {/* ──── Dual Scanlines ──── */}
      <div className="sh-overlay-scan" style={{ zIndex: 4 }}>
        <div className="sh-scanline" />
        <div className="sh-scanline" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* ──── HUD Corners ──── */}
      <div className="sh-hud" style={{ zIndex: 5 }}>
        <div className="sh-corner tl" />
        <div className="sh-corner tr" />
        <div className="sh-corner bl" />
        <div className="sh-corner br" />
      </div>

      {/* ──── Spinning Rings (center) ──── */}
      <div className="sh-ring-wrap" style={{ zIndex: 4 }}>
        <div className="sh-ring" />
        <div className="sh-ring2" />
        <div className="sh-ring-dot" />
      </div>

      {/* ──── Floating Annotation Tags ──── */}
      {TAGS.map((tag, i) => (
        <span
          key={tag.label}
          className="sh-tag"
          style={{
            color: tag.color,
            borderColor: tag.borderColor,
            animationDelay: `${i * 0.8}s`,
            top: i < 2 ? `${12 + i * 8}%` : undefined,
            bottom: i >= 2 && i < 4 ? `${12 + (i - 2) * 8}%` : undefined,
            left: i % 2 === 0 ? `${4 + i * 1.5}%` : undefined,
            right: i % 2 !== 0 ? `${4 + i * 1.2}%` : undefined,
            ...(i >= 4
              ? {
                  top: `${45 + (i - 4) * 12}%`,
                  left: i === 4 ? "8%" : undefined,
                  right: i === 5 ? "8%" : undefined,
                }
              : {}),
          }}
        >
          {tag.label}
        </span>
      ))}

      {/* ──── Bottom-right Segmentation Info Panel ──── */}
      <div className="sh-seg-info" style={{ zIndex: 6 }}>
        <span>SEMANTIC SEG</span>
        <span>FRAME {String(current + 1).padStart(3, "0")}</span>
        <span>CONF {conf.toFixed(1)}%</span>
        <span>SEGMENTS {segCount}</span>
      </div>

      {/* ──── Top-left HUD Info ──── */}
      <div
        className="absolute top-5 left-5 z-[6] pointer-events-none"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "10px",
          letterSpacing: "0.1em",
          color: "rgba(0,230,180,0.5)",
        }}
      >
        <span className="block" style={{ animation: "sh-infoBlink 2s ease-in-out infinite alternate" }}>
          MODEL: DEEPLABV3+
        </span>
        <span className="block" style={{ animation: "sh-infoBlink 2s ease-in-out infinite alternate 0.3s" }}>
          RES: 1024×512
        </span>
      </div>

      {/* ──── Progress Dots ──── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-[6]">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx);
              setConf(96 + Math.random() * 3.5);
              setSegCount(Math.floor(8 + Math.random() * 10));
            }}
            aria-label={`Go to segmentation slide ${idx + 1}`}
            className={`w-[6px] h-[6px] rounded-full border transition-all duration-400 cursor-pointer ${
              idx === current
                ? "bg-[rgba(0,230,180,0.9)] scale-150 border-[rgba(0,230,180,0.8)] shadow-[0_0_6px_rgba(0,230,180,0.6)]"
                : "bg-white/30 border-white/40 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
