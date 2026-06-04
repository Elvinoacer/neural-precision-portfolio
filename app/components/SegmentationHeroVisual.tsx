"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BASE_IMAGES = [
  "/images/landingpage_smooth_animations/image1.png",
  "/images/landingpage_smooth_animations/image2.png",
  "/images/landingpage_smooth_animations/image3.png",
];

// Duplicate images to create a continuous 12-panel cylinder
const PANEL_COUNT = 12;
const IMAGES = Array.from({ length: PANEL_COUNT }, (_, i) => BASE_IMAGES[i % BASE_IMAGES.length]);

const TAGS = [
  { label: "road", color: "#00e6b4", borderColor: "rgba(0,230,180,0.5)" },
  { label: "sky", color: "#ffb400", borderColor: "rgba(255,180,0,0.5)" },
  { label: "vehicle", color: "#00b4ff", borderColor: "rgba(0,180,255,0.5)" },
  { label: "terrain", color: "#ff507a", borderColor: "rgba(255,80,122,0.5)" },
  { label: "building", color: "#a78bfa", borderColor: "rgba(167,139,250,0.5)" },
  { label: "sidewalk", color: "#34d399", borderColor: "rgba(52,211,153,0.5)" },
];

export default function SegmentationHeroVisual() {
  const [conf, setConf] = useState(98.7);
  const [segCount, setSegCount] = useState(12);
  const [frame, setFrame] = useState(1);

  // Update HUD readout continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setConf(95 + Math.random() * 4.5);
      setSegCount(Math.floor(10 + Math.random() * 15));
      setFrame((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black flex items-center justify-center">
      {/* ──── 3D Cylinder Scene ──── */}
      <div 
        className="absolute inset-0 flex items-center justify-center" 
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative w-[280px] h-[180px] sm:w-[320px] sm:h-[220px] md:w-[450px] md:h-[280px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, -360] }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        >
          {IMAGES.map((src, i) => {
            const angle = (360 / PANEL_COUNT) * i;
            // Create a wavy helix offset using a sine wave so it loops seamlessly
            const yOffset = Math.sin((i / PANEL_COUNT) * Math.PI * 2) * 120;
            // Use a fixed translateZ to ensure CSS engine compatibility in inline styles
            const translateZ = 750; 

            return (
              <div
                key={i}
                className="absolute inset-0 premium-border rounded-xl md:rounded-2xl overflow-hidden glass-panel shadow-[0_0_30px_rgba(0,212,255,0.15)]"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px) translateY(${yOffset}px)`,
                  // Removed backfaceVisibility so we can see the full helix spiral (front and back)
                  // Removed mix-blend-screen as it causes rendering bugs inside preserve-3d contexts
                  opacity: 0.7,
                }}
              >
                <Image
                  src={src}
                  alt={`Segmentation panel ${i + 1}`}
                  fill
                  className="object-cover"
                  quality={75}
                  sizes="(max-width: 768px) 320px, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ──── Dark Gradient Overlay (readability for text on top) ──── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 100%)",
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
        <div className="sh-scanline" style={{ animationDelay: "2s" }} />
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
          className="sh-tag hidden md:block"
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
        <span>FRAME {String(frame).padStart(4, "0")}</span>
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
    </div>
  );
}
