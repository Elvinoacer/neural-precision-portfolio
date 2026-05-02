import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/254792038496?text=Hello%20Everlyn%2C%20I%20visited%20your%20website%20and%20I%20would%20like%20to%20inquire%20about%20your%20services.";

export default function CTASection() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[120px]"></div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-light mb-6">
          Need accurate data work or{" "}
          <span className="font-bold text-gradient-primary">reliable remote support?</span>
        </h2>
        <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10">
          Let&apos;s discuss your project, timeline, and the kind of help you need. I can support one-time tasks, ongoing projects, and long-term remote operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:bg-primary/20 transition-all duration-500 inline-flex items-center justify-center gap-3">
            <span className="relative z-10">Send Project Request</span>
            <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
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
