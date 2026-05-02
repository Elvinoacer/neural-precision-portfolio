export default function WhoIHelpSection() {
  const audiences = [
    { icon: "psychology", title: "AI & Machine Learning Teams", desc: "High-fidelity annotation for training data pipelines" },
    { icon: "label", title: "Data Labeling Companies", desc: "Scalable, consistent labeling workforce support" },
    { icon: "rocket_launch", title: "Startups & Founders", desc: "Reliable VA support to free up your time" },
    { icon: "shopping_cart", title: "E-commerce Businesses", desc: "Customer support and product data management" },
    { icon: "groups", title: "Agencies", desc: "Admin, CRM, and client communication handling" },
    { icon: "person", title: "Busy Professionals", desc: "Email, scheduling, and document organization" },
  ];

  return (
    <section className="w-full py-20 md:py-32 relative bg-surface-container-lowest section-divider overflow-hidden">
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
          {audiences.map((item) => (
            <div key={item.title} className="glass-panel premium-border rounded-2xl p-6 sm:p-8 flex items-start gap-5 group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-11 h-11 rounded-xl glass-pill flex items-center justify-center border border-primary/20 shrink-0">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>{item.icon}</span>
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg text-white mb-1 font-medium tracking-tight">{item.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
