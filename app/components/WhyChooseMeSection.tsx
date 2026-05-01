export default function WhyChooseMeSection() {
  const reasons = [
    {
      title: "Multi-Tool Expertise",
      desc: "Proficient in Labelbox, Appen, CVAT, Brush and Polygon tools. Adaptable and quick to learn any new annotation platform.",
      icon: "architecture",
      accentBg: "bg-primary/10",
      accentBgHover: "group-hover:bg-primary/20",
      accentBorder: "border-primary/20",
      accentText: "text-primary",
    },
    {
      title: "Seamless Collaboration",
      desc: "Experienced with Zoom, Slack, and Skype for remote team communication. I keep stakeholders updated and document work clearly.",
      icon: "forum",
      accentBg: "bg-secondary/10",
      accentBgHover: "group-hover:bg-secondary/20",
      accentBorder: "border-secondary/20",
      accentText: "text-secondary",
    },
    {
      title: "Deadline-Driven",
      desc: "Ability to manage multiple concurrent projects. I deliver on time and flag blockers early to maintain operational flow.",
      icon: "timer",
      accentBg: "bg-tertiary/10",
      accentBgHover: "group-hover:bg-tertiary/20",
      accentBorder: "border-tertiary/20",
      accentText: "text-tertiary",
    },
    {
      title: "Flexible & Adaptable",
      desc: "From image segmentation to customer emails — I wear many hats and wear them well to support dynamic startup environments.",
      icon: "swap_horiz",
      accentBg: "bg-primary/10",
      accentBgHover: "group-hover:bg-primary/20",
      accentBorder: "border-primary/20",
      accentText: "text-primary",
    },
    {
      title: "AI-Literate",
      desc: "I grasp the downstream impact of data quality on model performance, treating annotation not just as a task, but as model training.",
      icon: "smart_toy",
      accentBg: "bg-secondary/10",
      accentBgHover: "group-hover:bg-secondary/20",
      accentBorder: "border-secondary/20",
      accentText: "text-secondary",
    }
  ];

  return (
    <section className="relative z-10 py-20 md:py-32 w-full bg-surface-dim overflow-hidden section-divider" id="why-choose-us">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dim via-transparent to-surface-dim z-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-20">
        <div className="mb-12 md:mb-20 text-center lg:text-left">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Value Proposition
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mt-5">
            Why <span className="font-bold text-gradient-primary">Partner With Me?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className={`glass-panel premium-border p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-start transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl group ${idx === 0 ? 'sm:col-span-2' : ''}`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl glass-pill flex items-center justify-center mb-6 md:mb-8 border ${reason.accentBorder} relative overflow-hidden`}>
                <div className={`absolute inset-0 ${reason.accentBg} ${reason.accentBgHover} transition-colors`}></div>
                <span
                  className={`material-symbols-outlined ${reason.accentText} text-xl sm:text-2xl relative z-10`}
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {reason.icon}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-light text-white mb-3 md:mb-4 tracking-tight">
                {reason.title}
              </h3>
              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
