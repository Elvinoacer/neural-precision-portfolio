export default function ProofSection() {
  const checklist = [
    { label: "Instruction Review", icon: "checklist" },
    { label: "Label Consistency", icon: "rule" },
    { label: "File Naming", icon: "folder" },
    { label: "Error Checking", icon: "bug_report" },
    { label: "Deadline Tracking", icon: "schedule" },
    { label: "Final Review", icon: "task_alt" },
  ];

  const tools = [
    "CVAT", "Labelbox", "Appen", "Slack", "Zoom", "Skype",
    "Google Workspace", "Trello", "Asana", "ClickUp", "ChatGPT", "Notion AI",
  ];

  return (
    <section className="w-full py-20 md:py-32 relative bg-surface-dim section-gradient-top overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[40%] h-[50%] bg-tertiary/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Quality Checklist */}
          <div>
            <span className="font-label-mono text-[11px] tracking-widest uppercase text-primary mb-5 border border-primary/20 px-4 py-2 rounded-full glass-pill inline-block">
              Quality Assurance
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-light tracking-tight mb-4 mt-5">
              Quality checklist used on{" "}
              <span className="font-bold text-gradient-primary">every task</span>
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant leading-relaxed mb-8">
              Every project goes through a systematic review process to ensure accuracy, consistency, and on-time delivery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {checklist.map((item) => (
                <div key={item.label} className="flex items-center gap-3 glass-panel rounded-xl p-4 border-l-2 border-l-primary/40 group hover:border-l-primary transition-colors duration-500 hover:bg-white/[0.02]">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-body-md text-sm sm:text-base text-on-surface-variant group-hover:text-white transition-colors duration-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
              Tools & Platforms
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-light tracking-tight mb-4 mt-5">
              Industry-standard{" "}
              <span className="font-bold text-gradient-primary">toolkit</span>
            </h2>
            <p className="font-body-lg text-base text-on-surface-variant leading-relaxed mb-8">
              Proficient in the platforms your team already uses. Quick to adapt to any new tools or workflows.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {tools.map((tool) => (
                <div key={tool} className="group relative px-5 sm:px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md cursor-default transition-all duration-500 hover:border-primary/40 hover:bg-primary/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                  <span className="relative z-10 font-label-mono text-xs sm:text-sm tracking-widest uppercase text-on-surface-variant group-hover:text-white transition-colors duration-300">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
