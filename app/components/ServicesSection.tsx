export default function ServicesSection() {
  return (
    <section className="py-32 relative z-10 bg-surface-dim" id="services">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
        <header className="mb-20 text-center flex flex-col items-center">
          <span className="font-label-mono text-xs tracking-widest uppercase text-primary mb-6 border border-primary/20 px-4 py-2 rounded-full glass-pill">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight font-light">
            Core <span className="font-bold text-gradient-primary">Capabilities</span>
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl leading-relaxed font-light">
            Providing comprehensive remote support for fast-moving teams. I handle the
            operational data tasks and client communications that keep your business scaling.
          </p>
        </header>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Service Card 1 */}
          <article className="glass-panel premium-border rounded-3xl p-10 md:p-12 flex flex-col gap-8 relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <header className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl glass-pill flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                <span
                  className="material-symbols-outlined text-primary text-3xl font-light"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  dataset
                </span>
              </div>
              <h3 className="font-display text-3xl font-light text-white tracking-tight">Data Entry & <br/><span className="font-bold">Annotation</span></h3>
            </header>
            
            <p className="font-body-lg text-lg text-on-surface-variant font-light relative z-10 leading-relaxed flex-grow">
              Accurate, fast, and organized data management. From precise image segmentation and bounding box creation to comprehensive database input and document processing.
            </p>
            
            <div className="mt-auto relative z-10 pt-8 border-t border-white/5">
              <h4 className="font-label-mono text-xs uppercase tracking-widest text-primary/70 mb-4">
                Toolchain
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Labelbox', 'CVAT', 'Google Workspace', 'Trello', 'Asana'].map(tool => (
                  <span key={tool} className="glass-pill text-white font-label-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-full hover:bg-white/10 transition-colors cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Service Card 2 */}
          <article className="glass-panel premium-border rounded-3xl p-10 md:p-12 flex flex-col gap-8 relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <header className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl glass-pill flex items-center justify-center border border-secondary/30 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                <span
                  className="material-symbols-outlined text-secondary text-3xl font-light"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  support_agent
                </span>
              </div>
              <h3 className="font-display text-3xl font-light text-white tracking-tight">Customer <br/><span className="font-bold">Service</span></h3>
            </header>
            
            <p className="font-body-lg text-lg text-on-surface-variant font-light relative z-10 leading-relaxed flex-grow">
              Professional, empathetic client communication and ticket resolution. Handling chat, email, and CRM management to ensure your users feel heard and valued.
            </p>
            
            <div className="mt-auto relative z-10 pt-8 border-t border-white/5">
              <h4 className="font-label-mono text-xs uppercase tracking-widest text-secondary/70 mb-4">
                Capabilities
              </h4>
              <div className="flex flex-col gap-4">
                {['Email & Live Chat Support', 'Ticket Triage & Routing', 'CRM Logging & Maintenance'].map(cap => (
                  <div key={cap} className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary text-base">
                      check
                    </span>
                    <span className="font-body-md text-base text-white font-light tracking-wide">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
