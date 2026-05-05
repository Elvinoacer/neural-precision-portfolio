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

  const accentMap: Record<string, { border: string; iconBg: string; hoverIconBg: string; text: string; lineBg: string }> = {
    primary: { border: "border-primary/15", iconBg: "bg-primary/10", hoverIconBg: "group-hover:bg-primary/20", text: "text-primary", lineBg: "bg-primary/30" },
    secondary: { border: "border-secondary/15", iconBg: "bg-secondary/10", hoverIconBg: "group-hover:bg-secondary/20", text: "text-secondary", lineBg: "bg-secondary/30" },
    tertiary: { border: "border-tertiary/15", iconBg: "bg-tertiary/10", hoverIconBg: "group-hover:bg-tertiary/20", text: "text-tertiary", lineBg: "bg-tertiary/30" },
  };

  return (
    <section className="relative z-10 py-20 md:py-32 w-full bg-surface-dim overflow-hidden section-gradient-top">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[50%] h-[40%] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((reason, idx) => {
            const colors = accentMap[reason.accent];
            return (
              <div
                key={idx}
                className={`glass-panel p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-start transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_16px_50px_rgba(0,0,0,0.3)] group border border-white/[0.06] hover:border-white/10 ${idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Accent top line */}
                <div className={`w-8 h-[2px] ${colors.lineBg} rounded-full mb-6 md:mb-8 group-hover:w-12 transition-all duration-500`}></div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 md:mb-8 border ${colors.border} ${colors.iconBg} ${colors.hoverIconBg} transition-all duration-500`}>
                  <span className={`material-symbols-outlined ${colors.text} text-xl sm:text-2xl`} style={{ fontVariationSettings: "'FILL' 0" }}>{reason.icon}</span>
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
