import Link from "next/link";

export default function ServicesSnapshot() {
  const services = [
    {
      icon: "dataset",
      title: "Data Annotation",
      desc: "Clean, consistent, and well-labeled datasets for AI, computer vision, and machine learning teams.",
      href: "/services#data-annotation",
      accent: "primary",
    },
    {
      icon: "table_chart",
      title: "Data Entry & Management",
      desc: "Accurate, organized data entry, spreadsheet management, database input, and document formatting with zero-error standards.",
      href: "/services#data-entry",
      accent: "secondary",
    },
    {
      icon: "person",
      title: "Virtual Assistance",
      desc: "Professional remote assistance for founders, teams, and businesses that need reliable daily execution.",
      href: "/services#virtual-assistant",
      accent: "tertiary",
    },
    {
      icon: "support_agent",
      title: "Customer Support",
      desc: "Friendly, organized, and timely customer communication across email, chat, and support platforms.",
      href: "/services#customer-support",
      accent: "primary",
    },
    {
      icon: "smart_toy",
      title: "AI / LLM Training",
      desc: "Human-in-the-loop support for improving AI model outputs through evaluation, labeling, and review.",
      href: "/services#ai-training",
      accent: "secondary",
    },
  ];

  const accentMap: Record<string, { border: string; text: string; shadow: string }> = {
    primary: { border: "border-primary/30", text: "text-primary", shadow: "shadow-[0_0_20px_rgba(0,212,255,0.15)]" },
    secondary: { border: "border-secondary/30", text: "text-secondary", shadow: "shadow-[0_0_20px_rgba(124,58,237,0.15)]" },
    tertiary: { border: "border-tertiary/30", text: "text-tertiary", shadow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]" },
  };

  return (
    <section className="py-20 md:py-32 relative z-10 bg-surface-dim section-divider">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-10">
        <header className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-primary mb-5 border border-primary/20 px-4 py-2 rounded-full glass-pill">
            What I Help You With
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white mb-5 tracking-tight font-light">
            Core <span className="font-bold text-gradient-primary">Services</span>
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Comprehensive remote support for fast-moving teams. I handle the data tasks, admin operations, and client communications that keep your business scaling.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
          {services.map((service) => {
            const colors = accentMap[service.accent];
            return (
              <Link key={service.title} href={service.href} className="glass-panel premium-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col gap-5 relative group overflow-hidden transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                <div className={`absolute inset-0 bg-gradient-to-br from-${service.accent}/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl glass-pill flex items-center justify-center border ${colors.border} ${colors.shadow} shrink-0 relative z-10`}>
                  <span className={`material-symbols-outlined ${colors.text} text-xl sm:text-2xl`} style={{ fontVariationSettings: "'FILL' 0" }}>
                    {service.icon}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-white tracking-tight relative z-10">{service.title}</h3>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant relative z-10 leading-relaxed">{service.desc}</p>
                <span className="font-label-mono text-xs text-primary uppercase tracking-widest relative z-10 mt-auto flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
