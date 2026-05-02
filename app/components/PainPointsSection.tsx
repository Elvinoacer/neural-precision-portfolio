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

  const accentColors: Record<string, { border: string; bg: string; text: string }> = {
    primary: { border: "border-primary/20", bg: "group-hover:bg-primary/10", text: "text-primary" },
    secondary: { border: "border-secondary/20", bg: "group-hover:bg-secondary/10", text: "text-secondary" },
    tertiary: { border: "border-tertiary/20", bg: "group-hover:bg-tertiary/10", text: "text-tertiary" },
  };

  return (
    <section className="w-full py-16 md:py-24 relative bg-surface-container-lowest section-divider">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {painPoints.map((point) => {
            const colors = accentColors[point.accent];
            return (
              <div
                key={point.question}
                className={`glass-panel premium-border rounded-2xl p-6 sm:p-8 md:p-10 group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${colors.bg}`}
              >
                <div className={`w-12 h-12 rounded-xl glass-pill flex items-center justify-center mb-6 border ${colors.border}`}>
                  <span className={`material-symbols-outlined ${colors.text} text-xl`} style={{ fontVariationSettings: "'FILL' 0" }}>
                    {point.icon}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl text-white mb-3 tracking-tight font-medium">{point.question}</h3>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">{point.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
