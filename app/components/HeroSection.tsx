import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const stats = [
    { value: "500+", label: "Tasks Delivered" },
    { value: "99.8%", label: "Accuracy Rate" },
    { value: "24h", label: "Avg. Turnaround" },
  ];

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-hidden">
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

      {/* Cinematic overlay layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-surface-container-lowest z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10 pointer-events-none hidden lg:block"></div>
      {/* Subtle dot grid texture */}
      <div className="absolute inset-0 z-10 dot-pattern opacity-30 pointer-events-none"></div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-20 pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="max-w-3xl space-y-7 md:space-y-9">
          {/* Availability badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-4 py-2.5 glass-pill text-on-surface-variant font-label-mono text-[11px] tracking-widest uppercase rounded-full">
            <span className="relative w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(34,197,94,0.6)]">
              <span className="absolute inset-0 rounded-full bg-tertiary animate-ping opacity-75"></span>
            </span>
            Available for Projects
          </div>

          {/* Headline — clear visual hierarchy */}
          <div className="animate-fade-in-up-delay-1 space-y-3">
            <h1 className="font-display text-[2.4rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-white">
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
          </div>

          {/* Value proposition */}
          <p className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed animate-fade-in-up-delay-2">
            I help AI teams, businesses, and busy professionals handle
            data entry, image annotation, customer support, and admin
            operations — with precision, speed, and zero errors.
          </p>

          {/* CTAs — prominent and clear */}
          <div className="flex flex-col sm:flex-row gap-4 pt-1 animate-fade-in-up-delay-3">
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-primary text-on-primary font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-3 hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5"
            >
              <span className="relative z-10 font-semibold">Book a Free Consultation</span>
              <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
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
          </div>
        </div>

        {/* Stats bar — floating at bottom of hero */}
        <div className="mt-12 md:mt-20 animate-fade-in-up-delay-4">
          <div className="glass-panel premium-border rounded-2xl md:rounded-full px-6 py-5 md:px-10 md:py-5 inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/10 w-full sm:w-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 sm:px-8 first:sm:pl-0 last:sm:pr-0">
                <span className="font-display text-2xl md:text-3xl font-bold text-gradient-primary">
                  {stat.value}
                </span>
                <span className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-on-surface-variant leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-fade-in-up-delay-5">
        <span className="font-label-mono text-[9px] tracking-[0.25em] uppercase text-muted">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
          <span className="w-1 h-2 rounded-full bg-primary animate-bounce"></span>
        </div>
      </div>
    </section>
  );
}
