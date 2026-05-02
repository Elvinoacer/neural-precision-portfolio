import Link from "next/link";

export default function ProcessSection() {
  const steps = [
    { num: "01", title: "Share Your Brief", desc: "Tell me about your project, requirements, and timeline.", icon: "description" },
    { num: "02", title: "Review & Scope", desc: "I review the task requirements and clarify any questions.", icon: "search" },
    { num: "03", title: "Agree on Terms", desc: "We align on scope, timeline, deliverables, and communication.", icon: "handshake" },
    { num: "04", title: "Execute with Updates", desc: "I complete the work with regular progress updates.", icon: "engineering" },
    { num: "05", title: "Review & Refine", desc: "You review the output and request any refinements needed.", icon: "rate_review" },
  ];

  return (
    <section className="w-full py-20 md:py-32 relative bg-surface-container-lowest section-divider overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
        <header className="mb-12 md:mb-20 text-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mt-5">
            Simple, <span className="font-bold text-gradient-primary">Transparent Process</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
          {steps.map((step, idx) => (
            <div key={step.num} className="glass-panel premium-border rounded-2xl p-6 sm:p-8 flex flex-col items-start relative group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              {/* Connector line (hidden on last item and mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-white/15 to-transparent z-30"></div>
              )}
              <span className="font-display text-3xl sm:text-4xl font-bold text-primary/20 mb-4">{step.num}</span>
              <div className="w-10 h-10 rounded-lg glass-pill flex items-center justify-center border border-primary/20 mb-4">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>{step.icon}</span>
              </div>
              <h3 className="font-display text-base sm:text-lg text-white mb-2 font-medium tracking-tight">{step.title}</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Link href="/contact" className="premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:bg-primary/20 transition-all duration-500 inline-flex items-center gap-3">
            <span className="relative z-10">Start With a Small Test Task</span>
            <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
