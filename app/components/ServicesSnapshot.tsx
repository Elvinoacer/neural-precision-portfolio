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

  const accentMap: Record<string, { border: string; text: string; iconBg: string; hoverBorder: string }> = {
    primary: { border: "border-primary/15", text: "text-primary", iconBg: "bg-primary/10", hoverBorder: "hover:border-primary/30" },
    secondary: { border: "border-secondary/15", text: "text-secondary", iconBg: "bg-secondary/10", hoverBorder: "hover:border-secondary/30" },
    tertiary: { border: "border-tertiary/15", text: "text-tertiary", iconBg: "bg-tertiary/10", hoverBorder: "hover:border-tertiary/30" },
  };

  return (
    <section className="py-20 md:py-32 relative z-10 bg-surface-dim section-gradient-top overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none"></div>

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

        {/* Bento grid: first two cards larger, last three in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
          {services.map((service, idx) => {
            const colors = accentMap[service.accent];
            // First two cards span 3 cols each (50/50), last three span 2 cols each (33/33/33)
            const colSpan = idx < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`${colSpan} glass-panel rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col gap-5 relative group overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/[0.06] ${colors.hoverBorder} shimmer-sweep`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border ${colors.border} ${colors.iconBg} shrink-0 relative z-10 transition-all duration-500 group-hover:scale-110`}>
                  <span className={`material-symbols-outlined ${colors.text} text-xl sm:text-2xl`} style={{ fontVariationSettings: "'FILL' 0" }}>
                    {service.icon}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-white tracking-tight relative z-10">{service.title}</h3>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant relative z-10 leading-relaxed">{service.desc}</p>
                <span className="font-label-mono text-xs text-primary uppercase tracking-widest relative z-10 mt-auto flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
