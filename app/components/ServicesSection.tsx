export default function ServicesSection() {
  return (
    <section className="py-20 md:py-32 relative z-10 bg-surface-dim section-divider" id="services">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-10">
        <header className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-primary mb-5 border border-primary/20 px-4 py-2 rounded-full glass-pill">
            Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white mb-5 tracking-tight font-light">
            Core <span className="font-bold text-gradient-primary">Capabilities</span>
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Providing comprehensive remote support for fast-moving teams. I handle the
            operational data tasks and client communications that keep your business scaling.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">

          {/* Service Card 1 */}
          <article className="glass-panel premium-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col gap-6 md:gap-8 relative group overflow-hidden transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <header className="flex items-start sm:items-center gap-4 sm:gap-6 relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl glass-pill flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(0,212,255,0.15)] shrink-0">
                <span
                  className="material-symbols-outlined text-primary text-2xl sm:text-3xl"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  dataset
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-light text-white tracking-tight">
                Data Entry &amp; <span className="font-bold">Annotation</span>
              </h3>
            </header>

            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant relative z-10 leading-relaxed flex-grow">
              Accurate, fast, and organized data management. From precise image segmentation and bounding box creation to comprehensive database input and document processing.
            </p>

            <div className="mt-auto relative z-10 pt-6 md:pt-8 border-t border-white/5">
              <h4 className="font-label-mono text-[10px] sm:text-xs uppercase tracking-widest text-primary mb-3 md:mb-4">
                Toolchain
              </h4>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['Labelbox', 'CVAT', 'Google Workspace', 'Trello', 'Asana'].map(tool => (
                  <span key={tool} className="glass-pill text-on-surface-variant font-label-mono text-[10px] uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Service Card 2 */}
          <article className="glass-panel premium-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col gap-6 md:gap-8 relative group overflow-hidden transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <header className="flex items-start sm:items-center gap-4 sm:gap-6 relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl glass-pill flex items-center justify-center border border-secondary/30 shadow-[0_0_20px_rgba(124,58,237,0.15)] shrink-0">
                <span
                  className="material-symbols-outlined text-secondary text-2xl sm:text-3xl"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  support_agent
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-light text-white tracking-tight">
                Customer <span className="font-bold">Service</span>
              </h3>
            </header>

            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant relative z-10 leading-relaxed flex-grow">
              Professional, empathetic client communication and ticket resolution. Handling chat, email, and CRM management to ensure your users feel heard and valued.
            </p>

            <div className="mt-auto relative z-10 pt-6 md:pt-8 border-t border-white/5">
              <h4 className="font-label-mono text-[10px] sm:text-xs uppercase tracking-widest text-secondary mb-3 md:mb-4">
                Capabilities
              </h4>
              <div className="flex flex-col gap-3 md:gap-4">
                {['Email & Live Chat Support', 'Ticket Triage & Routing', 'CRM Logging & Maintenance'].map(cap => (
                  <div key={cap} className="flex items-center gap-3 md:gap-4">
                    <span className="material-symbols-outlined text-secondary text-base">check</span>
                    <span className="font-body-md text-sm sm:text-base text-on-surface-variant tracking-wide">
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
