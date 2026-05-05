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
    <section className="w-full py-20 md:py-32 relative bg-surface-container-lowest section-gradient-top overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
        <header className="mb-12 md:mb-20 text-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mt-5">
            Simple, <span className="font-bold text-gradient-primary">Transparent Process</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 z-0"></div>

          {steps.map((step) => (
            <div key={step.num} className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col items-start relative group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_50px_rgba(0,0,0,0.3)] border border-white/[0.06] hover:border-primary/20 z-10">
              {/* Step number */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-display text-sm font-bold text-primary group-hover:bg-primary/20 transition-colors duration-500">
                  {step.num}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/[0.06] mb-4">
                <span className="material-symbols-outlined text-on-surface-variant text-lg group-hover:text-primary transition-colors duration-500" style={{ fontVariationSettings: "'FILL' 0" }}>{step.icon}</span>
              </div>
              <h3 className="font-display text-base sm:text-lg text-white mb-2 font-medium tracking-tight">{step.title}</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <Link href="/contact" className="group relative overflow-hidden bg-primary text-on-primary font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full transition-all duration-500 inline-flex items-center gap-3 hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)] hover:-translate-y-0.5">
            <span className="relative z-10 font-semibold">Start With a Small Test Task</span>
            <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
