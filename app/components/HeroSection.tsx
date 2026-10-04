"use client";

import Hero3DStudio from "./Hero3DStudio";

interface HeroSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export default function HeroSection({ onSelectProject }: HeroSectionProps = {}) {
  return (
    <section id="hero" className="relative w-full min-h-[100svh] overflow-hidden bg-[#070b0e]">
      <Hero3DStudio onSelectProject={onSelectProject} />
    </section>
  );
}
