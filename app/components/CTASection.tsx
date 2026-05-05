import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/254792038496?text=Hello%20Everlyn%2C%20I%20visited%20your%20website%20and%20I%20would%20like%20to%20inquire%20about%20your%20services.";

export default function CTASection() {
  return (
    <section className="relative w-full py-24 md:py-36 overflow-hidden">
      {/* Multi-layer ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.06] rounded-full blur-[150px]"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-secondary/[0.04] rounded-full blur-[100px]"></div>
      </div>
      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none"></div>
      {/* Top gradient divider */}
      <div className="absolute top-0 left-5% right-5% h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="relative w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(34,197,94,0.6)]">
            <span className="absolute inset-0 rounded-full bg-tertiary animate-ping opacity-75"></span>
          </span>
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-tertiary">Currently accepting new clients</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight font-light mb-6">
          Need accurate data work or{" "}
          <span className="font-bold text-gradient-primary">reliable remote support?</span>
        </h2>
        <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10">
          Let&apos;s discuss your project, timeline, and the kind of help you need. I can support one-time tasks, ongoing projects, and long-term remote operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="group relative overflow-hidden bg-primary text-on-primary font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full transition-all duration-500 inline-flex items-center justify-center gap-3 hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5">
            <span className="relative z-10 font-semibold">Send Project Request</span>
            <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-whatsapp font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full inline-flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-base">chat</span>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
