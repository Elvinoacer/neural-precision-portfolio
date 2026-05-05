export default function PainPointsSection() {
  const painPoints = [
    {
      icon: "dataset",
      question: "Need accurate, consistent datasets for your AI models?",
      desc: "Getting clean, well-labeled data is the foundation of every successful ML project. Poor annotations waste time and money.",
      accent: "primary",
    },
    {
      icon: "table_chart",
      question: "Drowning in data entry backlogs and messy spreadsheets?",
      desc: "Unstructured records, missed entries, and formatting errors slow everything down. You need precise, organized data you can trust.",
      accent: "secondary",
    },
    {
      icon: "schedule",
      question: "Overwhelmed by admin tasks eating into your productive hours?",
      desc: "Email management, CRM updates, and scheduling pile up fast. You need someone reliable handling them so you can focus on growth.",
      accent: "tertiary",
    },
    {
      icon: "support_agent",
      question: "Need reliable, responsive customer support for your users?",
      desc: "Your customers deserve timely, professional communication. Slow response times cost you trust and revenue.",
      accent: "primary",
    },
  ];

  const accentColors: Record<string, { border: string; iconBg: string; text: string; glow: string }> = {
    primary: { border: "border-primary/20", iconBg: "bg-primary/10", text: "text-primary", glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]" },
    secondary: { border: "border-secondary/20", iconBg: "bg-secondary/10", text: "text-secondary", glow: "group-hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]" },
    tertiary: { border: "border-tertiary/20", iconBg: "bg-tertiary/10", text: "text-tertiary", glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]" },
  };

  return (
    <section className="w-full py-20 md:py-28 relative bg-surface-container-lowest section-gradient-top">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Section header */}
        <header className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Sound Familiar?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mt-5 mb-5">
            Problems I{" "}
            <span className="font-bold text-gradient-primary">Solve</span>
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
            If any of these challenges resonate with you, I can help. These are the exact problems my clients hire me to fix.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {painPoints.map((point, idx) => {
            const colors = accentColors[point.accent];
            return (
              <div
                key={point.question}
                className={`glass-panel premium-border rounded-2xl p-6 sm:p-8 group transition-all duration-500 hover:-translate-y-1.5 ${colors.glow}`}
              >
                {/* Number indicator */}
                <span className="font-display text-5xl font-bold text-white/[0.04] absolute top-4 right-5 select-none pointer-events-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${colors.border} ${colors.iconBg} transition-colors duration-500`}>
                  <span className={`material-symbols-outlined ${colors.text} text-xl`} style={{ fontVariationSettings: "'FILL' 0" }}>
                    {point.icon}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl text-white mb-3 tracking-tight font-medium leading-snug">{point.question}</h3>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">{point.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
