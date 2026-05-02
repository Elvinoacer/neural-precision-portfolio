import Image from "next/image";

export default function PortfolioGallerySection() {
  return (
    <section
      className="w-full py-20 md:py-32 relative bg-surface-container-lowest overflow-hidden section-divider"
      id="portfolio"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <header className="mb-12 md:mb-24 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-label-mono text-[11px] tracking-widest uppercase text-on-surface-variant mb-5 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Exhibition
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white mb-5 tracking-tight font-light">
            Selected{" "}
            <span className="font-bold text-gradient-primary">Works</span>
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed">
            A glimpse into the precision and quality I bring to every annotation
            project. High-fidelity data structures require surgical accuracy.
          </p>
        </header>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {/* Item 1: Semantic Segmentation */}
          <article className="col-span-1 lg:col-span-2 glass-panel premium-border rounded-2xl md:rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="relative h-[250px] sm:h-[320px] md:h-[400px] w-full bg-surface-dim overflow-hidden">
              <Image
                alt="Annotated highway scene with lane boundaries and overhead signage"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                src="/images/i1.jpeg"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-10 z-20 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-3">
                <span className="glass-pill px-3 py-1.5 font-label-mono text-[10px] tracking-widest text-primary uppercase rounded-full border border-primary/20">
                  Pixel-Level
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-2 tracking-tight">
                Semantic Segmentation
              </h3>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl hidden sm:block sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 delay-100">
                Road scene with dense lane annotations and strong boundary
                separation for high-fidelity model training.
              </p>
            </div>
          </article>

          {/* Item 2: Road Hazard Detection */}
          <article className="col-span-1 glass-panel premium-border rounded-2xl md:rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="relative h-[250px] sm:h-[320px] md:h-[400px] w-full bg-surface-dim overflow-hidden">
              <Image
                alt="Roadway scene with multiple vehicles and barrier-lined lanes"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                src="/images/i2.jpeg"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-3">
                <span className="glass-pill px-3 py-1.5 font-label-mono text-[10px] tracking-widest text-secondary uppercase rounded-full border border-secondary/20">
                  Bounding Box
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-white mb-1 tracking-tight">
                Road Hazard Detection
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 hidden sm:block sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 delay-100">
                Multi-vehicle traffic scene prepared for obstacle detection and
                roadway safety annotation workflows.
              </p>
            </div>
          </article>

          {/* Item 3: Medical Imaging */}
          <article className="col-span-1 glass-panel premium-border rounded-2xl md:rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="relative h-[250px] sm:h-[320px] md:h-[400px] w-full bg-surface-dim overflow-hidden">
              <Image
                alt="Medical MRI segmentation"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpmFbEJgAHLU1aUar0tqt4DfbhaxX2MLvD5_vdDJ5ZO_8uL6j8tKKOuog_NSTlrnBrtIrhimB_E7a_XZ_5YYEgrob39-tb9s08H4GEnWn5ZFyeSjEBVOhjd1WWuvOQeFU4kPi2GVu0td5dqoLtfuVA8aoilChqc5QDKkMrtJF-lhialAlS0BHWFlP-cy4PXIBxUxj5YEn90n4rrnvvhu2Fr_ptwUd4c9nZMJR8yNiAu5jFVbeIAw5uC6CuBUKt6HhzPP9O5Ah0QkfA"
                width={400}
                height={400}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-3">
                <span className="glass-pill px-3 py-1.5 font-label-mono text-[10px] tracking-widest text-tertiary uppercase rounded-full border border-tertiary/20">
                  Polygon
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light text-white mb-1 tracking-tight">
                Medical Imaging
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant line-clamp-2 hidden sm:block sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 delay-100">
                Intricate organ and anomaly segmentation in high-resolution
                MRI/CT scan datasets.
              </p>
            </div>
          </article>

          {/* Item 4: LLM Evaluation */}
          <article className="col-span-1 lg:col-span-2 glass-panel premium-border rounded-2xl md:rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            <div className="p-6 sm:p-8 md:p-10 flex-grow flex flex-col relative z-20">
              <div className="flex items-center gap-3 mb-5">
                <span className="glass-pill px-3 py-1.5 font-label-mono text-[10px] tracking-widest text-primary uppercase rounded-full border border-primary/20">
                  RLHF / Text
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-3 tracking-tight">
                LLM Evaluation
              </h3>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant mb-6 md:mb-8 max-w-2xl">
                Rigorous side-by-side prompt-response comparison and
                fact-checking for model alignment and safety.
              </p>

              {/* Simulated UI */}
              <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl border border-white/5 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 mt-auto font-code text-sm">
                <div className="flex-1 bg-surface-dim/50 backdrop-blur-md p-4 md:p-6 rounded-lg md:rounded-xl border-l-[3px] border-l-primary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
                  <div className="text-muted mb-2 md:mb-3 text-[10px] uppercase tracking-widest font-label-mono">
                    Prompt Context
                  </div>
                  <div className="text-on-surface leading-relaxed text-xs sm:text-sm">
                    Evaluate the logical consistency of the provided argument
                    regarding quantum computing scalability...
                  </div>
                </div>
                <div className="flex-1 bg-surface-dim/50 backdrop-blur-md p-4 md:p-6 rounded-lg md:rounded-xl border-l-[3px] border-l-tertiary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-tertiary/5 to-transparent pointer-events-none"></div>
                  <div className="absolute top-3 md:top-4 right-3 md:right-4">
                    <span className="material-symbols-outlined text-tertiary text-base md:text-lg">
                      verified
                    </span>
                  </div>
                  <div className="text-muted mb-2 md:mb-3 text-[10px] uppercase tracking-widest font-label-mono">
                    Response A (Preferred)
                  </div>
                  <div className="text-on-surface leading-relaxed text-xs sm:text-sm">
                    The model accurately identifies the error-correction
                    bottleneck, citing recent coherence time benchmarks...
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-12 md:mt-24 text-center">
          <p className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-muted flex items-center justify-center gap-3">
            <span className="w-6 md:w-8 h-[1px] bg-white/15"></span>
            Private portfolio available upon request
            <span className="w-6 md:w-8 h-[1px] bg-white/15"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
