import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const trustChips = [
    "Data Annotation",
    "Data Entry",
    "Image Segmentation",
    "Customer Support",
    "Virtual Assistance",
    "AI Training Support",
  ];

  return (
    <section className="relative w-full min-h-[100svh] flex items-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      {/* Video background — desktop only, lazy loaded */}
      <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover object-center z-0 hidden md:block"
        loop
        muted
        playsInline
        poster="/images/everlyn_linda_photo.webp"
        preload="metadata"
      >
        <source src="/images/videos/mp_.mp4" type="video/mp4" />
      </video>

      {/* Mobile: static image */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/images/everlyn_linda_photo.webp"
          alt="Everlyn Linda"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-surface-container-lowest z-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-8 space-y-8 md:space-y-10 relative z-10">
          {/* Positioning tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 glass-pill text-on-surface-variant font-label-mono text-[11px] tracking-widest uppercase rounded-full animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            Available for Projects
          </div>

          {/* Headline */}
          <div className="space-y-5 animate-fade-in-up-delay-1">
            <h1 className="font-display text-[2.2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[72px] font-medium tracking-tight">
              Data Annotation, Data Entry
              <br />
              <span className="text-gradient-primary font-bold">
                &amp; Reliable Virtual Assistance
              </span>
              <br />
              <span className="text-on-surface-variant font-light text-[1.6rem] sm:text-3xl md:text-4xl lg:text-5xl">
                for Growing Teams.
              </span>
            </h1>
          </div>

          {/* Value proposition */}
          <p className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed animate-fade-in-up-delay-2">
            I help AI teams, businesses, and busy professionals handle
            data entry, image annotation, customer support, and admin
            operations — with precision, speed, and zero errors.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full animate-fade-in-up-delay-3">
            <Link
              href="/contact"
              className="premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:bg-primary/20 transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-3"
            >
              <span className="relative z-10">Book a Free Consultation</span>
              <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/services"
              className="relative group overflow-hidden bg-transparent border border-white/15 text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:border-white/30 hover:bg-white/5 transition-all duration-500 w-full sm:w-auto text-center"
            >
              View My Services
            </Link>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-2 md:gap-3 pt-4">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="glass-pill text-on-surface-variant font-label-mono text-[10px] uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
