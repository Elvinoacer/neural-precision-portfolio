import Image from "next/image";

export default function PortfolioGallerySection() {
  return (
    <section className="flex-grow w-full py-32 relative bg-surface-container-lowest overflow-hidden" id="portfolio">
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* Header Section */}
        <header className="mb-24 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-label-mono text-xs tracking-widest uppercase text-on-surface-variant mb-6 border border-white/10 px-4 py-2 rounded-full glass-pill inline-block">
            Exhibition
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight font-light">
            Selected <span className="font-bold text-gradient-primary">Works</span>
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant font-light leading-relaxed">
            A glimpse into the precision and quality I bring to every annotation
            project. High-fidelity data structures require surgical accuracy.
          </p>
        </header>

        {/* Premium Cinematic Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Item 1: Semantic Segmentation (Spans 2 columns on large screens) */}
          <article className="col-span-1 lg:col-span-2 glass-panel premium-border rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="relative h-[400px] w-full bg-surface-dim overflow-hidden">
              <Image
                alt="Complex semantic segmentation visual"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUDRoFpZ661_K8yxgLa0ASU1-gJ3BxmfcvzSbZf5pndufOcj1Mu05mH2FmlAVu-_bcWLz56ZVALSAazNls-R-zgbuHcGwWdbkEi7cRNjnjH_FwdB7k-i8EyVotpMB1u6FgbGGmCWWqvesj84iSzRp5SCRLOc_m4huapI81DFlv_EHNLVq-29e2pAV5ATxbBtK1vwJY8i7vyf8jxWNw9LwN3ocPQMhmkxNoSQf4M8PuO1NIBBc2b7NCCG65eH00JslMiUuA4QIfQnLh"
                width={800}
                height={400}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/50 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex flex-col justify-end">
              <div className="flex items-center gap-4 mb-4">
                <span className="glass-pill px-4 py-2 font-label-mono text-[10px] tracking-widest text-primary uppercase rounded-full border border-primary/20">
                  Pixel-Level
                </span>
              </div>
              <h3 className="font-display text-3xl font-light text-white mb-3 tracking-tight">
                Semantic Segmentation
              </h3>
              <p className="font-body-md text-base text-on-surface-variant font-light max-w-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                Complex street scene with precise, pixel-level color overlays
                defining boundaries between distinct object classes.
              </p>
            </div>
          </article>

          {/* Item 2: Road Hazard Detection */}
          <article className="col-span-1 glass-panel premium-border rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="relative h-[400px] w-full bg-surface-dim overflow-hidden">
              <Image
                alt="Road hazard bounding boxes"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpViwaJVI5cjKy1IWc4A1XSBi0AxX2kS1SaIUUMrnSCcvF_5LMTPL-gkV3mOyP0CkPP0LuV97x0hHmOFZ3Ut2GeYpdYmBj7hegD5N4rwb9pBEimMKkEZYKN6TX3ZadiujkQ3_XmV8NK_SvtZ6SeKxhkah1ovlO5OZ7_tlm-YggxM8jqIu_FQXiriQ66MTiqydz8WytEyqmSWo897o0nH3Ci6xHt6rF2YFv847WPrOtBntXqRpF8edCTG0QuVS6gZmeOfMffeJn5hKr"
                width={400}
                height={400}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col justify-end">
              <div className="flex items-center gap-4 mb-4">
                <span className="glass-pill px-4 py-2 font-label-mono text-[10px] tracking-widest text-secondary uppercase rounded-full border border-secondary/20">
                  Bounding Box
                </span>
              </div>
              <h3 className="font-display text-2xl font-light text-white mb-2 tracking-tight">
                Road Hazard Detection
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant font-light line-clamp-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                Precision bounding boxes around obstacles, vehicles, and critical
                lane markings for ADAS systems.
              </p>
            </div>
          </article>

          {/* Item 3: Medical Imaging */}
          <article className="col-span-1 glass-panel premium-border rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="relative h-[400px] w-full bg-surface-dim overflow-hidden">
              <Image
                alt="Medical MRI segmentation"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0 mix-blend-screen"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpmFbEJgAHLU1aUar0tqt4DfbhaxX2MLvD5_vdDJ5ZO_8uL6j8tKKOuog_NSTlrnBrtIrhimB_E7a_XZ_5YYEgrob39-tb9s08H4GEnWn5ZFyeSjEBVOhjd1WWuvOQeFU4kPi2GVu0td5dqoLtfuVA8aoilChqc5QDKkMrtJF-lhialAlS0BHWFlP-cy4PXIBxUxj5YEn90n4rrnvvhu2Fr_ptwUd4c9nZMJR8yNiAu5jFVbeIAw5uC6CuBUKt6HhzPP9O5Ah0QkfA"
                width={400}
                height={400}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col justify-end">
              <div className="flex items-center gap-4 mb-4">
                <span className="glass-pill px-4 py-2 font-label-mono text-[10px] tracking-widest text-tertiary uppercase rounded-full border border-tertiary/20">
                  Polygon
                </span>
              </div>
              <h3 className="font-display text-2xl font-light text-white mb-2 tracking-tight">
                Medical Imaging
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant font-light line-clamp-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                Intricate organ and anomaly segmentation in high-resolution MRI/CT
                scan datasets.
              </p>
            </div>
          </article>

          {/* Item 4: LLM Evaluation (Spans 2 columns on large screens) */}
          <article className="col-span-1 lg:col-span-2 glass-panel premium-border rounded-3xl overflow-hidden group flex flex-col relative shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="p-10 flex-grow flex flex-col relative z-20">
              <div className="flex items-center gap-4 mb-6">
                <span className="glass-pill px-4 py-2 font-label-mono text-[10px] tracking-widest text-primary uppercase rounded-full border border-primary/20">
                  RLHF / Text
                </span>
              </div>
              <h3 className="font-display text-3xl font-light text-white mb-4 tracking-tight">
                LLM Evaluation
              </h3>
              <p className="font-body-lg text-lg text-on-surface-variant font-light mb-8 max-w-2xl">
                Rigorous side-by-side prompt-response comparison and fact-checking
                for model alignment and safety.
              </p>
              
              {/* Premium Simulated UI within the card */}
              <div className="bg-surface-lowest rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row gap-6 mt-auto font-code text-sm">
                <div className="flex-1 bg-surface-dim/50 backdrop-blur-md p-6 rounded-xl border-l-[3px] border-l-primary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
                  <div className="text-on-surface-variant mb-3 text-[10px] uppercase tracking-widest font-label-mono">
                    Prompt Context
                  </div>
                  <div className="text-on-surface font-light leading-relaxed">
                    Evaluate the logical consistency of the provided argument
                    regarding quantum computing scalability...
                  </div>
                </div>
                <div className="flex-1 bg-surface-dim/50 backdrop-blur-md p-6 rounded-xl border-l-[3px] border-l-tertiary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-tertiary/5 to-transparent pointer-events-none"></div>
                  <div className="absolute top-4 right-4 flex gap-1">
                    <span className="material-symbols-outlined text-tertiary text-lg">
                      verified
                    </span>
                  </div>
                  <div className="text-on-surface-variant mb-3 text-[10px] uppercase tracking-widest font-label-mono">
                    Response A (Preferred)
                  </div>
                  <div className="text-on-surface font-light leading-relaxed">
                    The model accurately identifies the error-correction bottleneck,
                    citing recent coherence time benchmarks...
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>

        <div className="mt-24 text-center">
          <p className="font-label-mono text-xs tracking-widest uppercase text-on-surface-variant flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-white/20"></span>
            Private portfolio available upon request
            <span className="w-8 h-[1px] bg-white/20"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
