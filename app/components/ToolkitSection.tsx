export default function ToolkitSection() {
  const tools = [
    "CVAT",
    "Labelbox",
    "Appen",
    "Slack",
    "Zoom",
    "Skype",
    "Google Workspace",
    "Trello",
    "Asana",
    "ClickUp",
    "ChatGPT",
    "Notion AI",
  ];

  return (
    <section className="relative z-10 py-32 max-w-[1400px] mx-auto w-full px-8 bg-surface-lowest overflow-hidden" id="tools">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="text-center mb-20 relative z-10">
        <h2 className="font-display text-4xl md:text-5xl text-white mb-6 font-light tracking-tight">
          System <span className="font-bold text-gradient-primary">Toolkit</span>
        </h2>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
          Industry-standard platforms I utilize daily to execute operations with precision.
        </p>
      </div>
      
      {/* Interactive Pill Grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mt-12 relative z-10">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="group relative px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-primary/50 hover:bg-primary/10 overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            
            <span className="relative z-10 font-label-mono text-sm tracking-widest uppercase text-on-surface-variant group-hover:text-white transition-colors duration-300">
              {tool}
            </span>
          </div>
        ))}
      </div>
      
      {/* Ambient background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-surface-lowest to-surface-lowest pointer-events-none z-0"></div>
    </section>
  );
}
