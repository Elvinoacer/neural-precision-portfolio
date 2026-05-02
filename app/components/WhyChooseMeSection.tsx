export default function WhyChooseMeSection() {
  const reasons = [
    { title: "Accuracy-First Work Ethic", desc: "Every task is treated with the precision it deserves. I double-check, cross-reference, and follow instructions carefully.", icon: "verified", accent: "primary" },
    { title: "Clear Communication", desc: "You'll always know the status of your project. I provide updates, flag blockers early, and document work clearly.", icon: "forum", accent: "secondary" },
    { title: "Fast Turnaround", desc: "I deliver on time, every time. Multiple concurrent projects? Managed without compromising quality.", icon: "timer", accent: "tertiary" },
    { title: "Remote-Ready Collaboration", desc: "Experienced with Zoom, Slack, Skype, and async workflows. I integrate seamlessly into your team's rhythm.", icon: "language", accent: "primary" },
    { title: "Tool Flexibility", desc: "Proficient in Labelbox, CVAT, Appen, Google Workspace, Trello, Asana, and quick to learn any new platform.", icon: "architecture", accent: "secondary" },
    { title: "Deadline Discipline", desc: "I manage time proactively, not reactively. Deadlines are met and blockers are escalated before they become problems.", icon: "event_available", accent: "tertiary" },
    { title: "Confidential & Professional", desc: "Your data and business information are handled with complete discretion and professionalism.", icon: "shield", accent: "primary" },
  ];

  const accentMap: Record<string, { border: string; bg: string; hoverBg: string; text: string }> = {
    primary: { border: "border-primary/20", bg: "bg-primary/10", hoverBg: "group-hover:bg-primary/20", text: "text-primary" },
    secondary: { border: "border-secondary/20", bg: "bg-secondary/10", hoverBg: "group-hover:bg-secondary/20", text: "text-secondary" },
    tertiary: { border: "border-tertiary/20", bg: "bg-tertiary/10", hoverBg: "group-hover:bg-tertiary/20", text: "text-tertiary" },
  };

  return (
    <section className="relative z-10 py-20 md:py-32 w-full bg-surface-dim overflow-hidden section-divider">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-20">
        <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Why Work With Me
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mt-5 mb-6">
            Why <span className="font-bold text-gradient-primary">Partner With Me?</span>
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
            You don&apos;t just need someone who can complete tasks. You need someone who follows instructions, communicates clearly, protects your time, and delivers consistent work without constant supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {reasons.map((reason, idx) => {
            const colors = accentMap[reason.accent];
            return (
              <div key={idx} className={`glass-panel premium-border p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-start transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl group ${idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl glass-pill flex items-center justify-center mb-6 md:mb-8 border ${colors.border} relative overflow-hidden`}>
                  <div className={`absolute inset-0 ${colors.bg} ${colors.hoverBg} transition-colors`}></div>
                  <span className={`material-symbols-outlined ${colors.text} text-xl sm:text-2xl relative z-10`} style={{ fontVariationSettings: "'FILL' 0" }}>{reason.icon}</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-medium text-white mb-3 md:mb-4 tracking-tight">{reason.title}</h3>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
