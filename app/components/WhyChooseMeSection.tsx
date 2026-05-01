export default function WhyChooseMeSection() {
  const reasons = [
    {
      title: "Multi-Tool Expertise",
      desc: "Proficient in Labelbox, Appen, CVAT, Brush and Polygon tools. Adaptable and quick to learn any new annotation platform.",
      icon: "architecture",
      colorClass: "primary"
    },
    {
      title: "Seamless Collaboration",
      desc: "Experienced with Zoom, Slack, and Skype for remote team communication. I keep stakeholders updated and document work clearly.",
      icon: "forum",
      colorClass: "secondary"
    },
    {
      title: "Deadline-Driven",
      desc: "Ability to manage multiple concurrent projects. I deliver on time and flag blockers early to maintain operational flow.",
      icon: "timer",
      colorClass: "tertiary"
    },
    {
      title: "Flexible & Adaptable",
      desc: "From image segmentation to customer emails — I wear many hats and wear them well to support dynamic startup environments.",
      icon: "swap_horiz",
      colorClass: "primary"
    },
    {
      title: "AI-Literate",
      desc: "I grasp the downstream impact of data quality on model performance, treating annotation not just as a task, but as model training.",
      icon: "smart_toy",
      colorClass: "secondary"
    }
  ];

  return (
    <section className="relative z-10 py-32 w-full bg-surface-dim overflow-hidden" id="why-choose-us">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-5 mix-blend-luminosity z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dim via-transparent to-surface-dim z-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-20">
        <div className="mb-20 text-center lg:text-left">
          <span className="font-label-mono text-xs tracking-widest uppercase text-on-surface-variant mb-6 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Value Proposition
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light tracking-tight mt-6">
            Why <span className="font-bold text-gradient-primary">Partner With Me?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className={`glass-panel premium-border p-10 rounded-3xl flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group ${idx === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl glass-pill flex items-center justify-center mb-8 border border-white/10 relative overflow-hidden">
                <div className={`absolute inset-0 bg-${reason.colorClass}/10 group-hover:bg-${reason.colorClass}/20 transition-colors`}></div>
                <span
                  className={`material-symbols-outlined text-${reason.colorClass} text-2xl font-light relative z-10`}
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {reason.icon}
                </span>
              </div>
              <h3 className="font-display text-2xl font-light text-white mb-4 tracking-tight">
                {reason.title}
              </h3>
              <p className="font-body-lg text-base text-on-surface-variant font-light leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
