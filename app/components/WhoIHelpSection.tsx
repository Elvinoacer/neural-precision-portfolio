export default function WhoIHelpSection() {
  const audiences = [
    { icon: "psychology", title: "AI & Machine Learning Teams", desc: "High-fidelity annotation for training data pipelines", accent: "primary" },
    { icon: "label", title: "Data Labeling Companies", desc: "Scalable, consistent labeling workforce support", accent: "secondary" },
    { icon: "rocket_launch", title: "Startups & Founders", desc: "Reliable VA support to free up your time", accent: "tertiary" },
    { icon: "shopping_cart", title: "E-commerce Businesses", desc: "Customer support and product data management", accent: "primary" },
    { icon: "groups", title: "Agencies", desc: "Admin, CRM, and client communication handling", accent: "secondary" },
    { icon: "person", title: "Busy Professionals", desc: "Email, scheduling, and document organization", accent: "tertiary" },
  ];

  const accentMap: Record<string, { border: string; text: string; iconBg: string }> = {
    primary: { border: "border-primary/15", text: "text-primary", iconBg: "bg-primary/10" },
    secondary: { border: "border-secondary/15", text: "text-secondary", iconBg: "bg-secondary/10" },
    tertiary: { border: "border-tertiary/15", text: "text-tertiary", iconBg: "bg-tertiary/10" },
  };

  return (
    <section className="w-full py-20 md:py-32 relative bg-surface-container-lowest section-gradient-top overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-secondary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
        <header className="mb-12 md:mb-20 text-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Who I Work With
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mt-5">
            Built for teams that need{" "}
            <span className="font-bold text-gradient-primary">dependable execution.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {audiences.map((item) => {
            const colors = accentMap[item.accent];
            return (
              <div key={item.title} className="glass-panel rounded-2xl p-6 sm:p-8 flex items-start gap-5 group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] border border-white/[0.06] hover:border-white/10">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colors.border} ${colors.iconBg} shrink-0 transition-transform duration-500 group-hover:scale-110`}>
                  <span className={`material-symbols-outlined ${colors.text} text-lg`} style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg text-white mb-1 font-medium tracking-tight">{item.title}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
