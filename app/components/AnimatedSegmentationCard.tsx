"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

interface OrbitConfig {
  /** X-axis keyframes for the orbital path */
  x: number[];
  /** Y-axis keyframes for the orbital path */
  y: number[];
  /** Duration of one full orbit in seconds */
  duration: number;
}

interface AnimatedSegmentationCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  orbitConfig: OrbitConfig;
  /** Entrance delay in seconds */
  delay: number;
  /** Mouse X motion value (normalized -0.5 to 0.5) */
  mouseX: MotionValue<number>;
  /** Mouse Y motion value (normalized -0.5 to 0.5) */
  mouseY: MotionValue<number>;
  /** How strongly this card responds to mouse movement */
  parallaxFactor: number;
  /** Whether to preload this image (use for first/hero image) */
  preload?: boolean;
  /** Additional CSS classes for positioning */
  className?: string;
}

export default function AnimatedSegmentationCard({
  src,
  alt,
  width,
  height,
  orbitConfig,
  delay,
  mouseX,
  mouseY,
  parallaxFactor,
  preload = false,
  className = "",
}: AnimatedSegmentationCardProps) {
  // Mouse parallax transforms
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-parallaxFactor, parallaxFactor]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-parallaxFactor, parallaxFactor]);

  return (
    <motion.div
      className={`absolute glass-image-card ${className}`}
      // Entrance animation
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        x: parallaxX,
        y: parallaxY,
      }}
    >
      {/* Orbital motion wrapper — desktop only via CSS media query */}
      <motion.div
        className="hidden md:block"
        animate={{
          x: orbitConfig.x,
          y: orbitConfig.y,
        }}
        transition={{
          x: {
            duration: orbitConfig.duration,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: orbitConfig.duration * 0.85,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Breathing + rotation + float — layered on top of orbit */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            rotate: [-2, 2, -2],
            y: [0, -20, 0],
          }}
          transition={{
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto object-cover"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            quality={85}
          />
        </motion.div>
      </motion.div>

      {/* Mobile version — simpler float animation, no orbit */}
      <motion.div
        className="block md:hidden"
        animate={{
          scale: [1, 1.04, 1],
          y: [0, -12, 0],
        }}
        transition={{
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay * 2 },
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          loading={preload ? "eager" : "lazy"}
          quality={85}
        />
      </motion.div>
    </motion.div>
  );
}
