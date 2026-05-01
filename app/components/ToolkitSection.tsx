export default function ToolkitSection() {
  const tools = [
    "CVAT", "Labelbox", "Appen", "Slack", "Zoom", "Skype",
    "Google Workspace", "Trello", "Asana", "ClickUp", "ChatGPT", "Notion AI",
  ];

  return (
    <section className="relative z-10 py-20 md:py-32 max-w-[1400px] mx-auto w-full px-5 md:px-8 overflow-hidden section-divider" id="tools">
      <div className="text-center mb-12 md:mb-20 relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-5 font-light tracking-tight">
          System <span className="font-bold text-gradient-primary">Toolkit</span>
        </h2>
        <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Industry-standard platforms I utilize daily to execute operations with precision.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto mt-8 md:mt-12 relative z-10">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="group relative px-5 sm:px-8 py-3 sm:py-4 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-primary/50 hover:bg-primary/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            <span className="relative z-10 font-label-mono text-xs sm:text-sm tracking-widest uppercase text-on-surface-variant group-hover:text-white transition-colors duration-300">
              {tool}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none z-0"></div>
    </section>
  );
}
