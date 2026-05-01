import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      className="w-full py-20 md:py-32 relative bg-surface-container-lowest overflow-hidden section-divider"
      id="about"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Portrait */}
          <div className="lg:col-span-5 relative group">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden premium-border glass-panel transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
              <Image
                alt="Professional Portrait"
                className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGBqVbzARf9c4jGa2B9S0rawdDdTv0VBA20AlDXJ9SimmsfQsjYdVYEwQ2TP6tSXjpNe_Aq5YCwkAU1kvUq_MbbrtA289foPzIPjPWCd8mNxoHIN43QyXNmAZNjSkgVwunyfWi547H1bGLXOouQ6enmK45oNNSSw3BKEo-8jJnA5FQIhPSitbDXwHA4D_IzClLWAQma6YE522AwUBh90LTdRp_pOmyD4mfLDjYxRr7ITfvZ-3PkQCtyu3_u4YRkufXCUUY0YLQYuix"
                width={800}
                height={1000}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-70 z-20"></div>
            </div>
            {/* Floating Info Tag — repositioned for mobile */}
            <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-right-4 glass-pill px-6 py-4 sm:px-8 sm:py-6 rounded-2xl z-30 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl animate-float">
              <div className="font-display text-2xl sm:text-3xl text-white font-light tracking-tight">Est. 2020</div>
              <div className="font-label-mono text-[10px] sm:text-xs tracking-widest text-primary uppercase mt-1">Data &amp; Operations</div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12 lg:pl-8 mt-8 lg:mt-0">
            <div className="space-y-5">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight font-light flex flex-col">
                <span className="text-on-surface-variant text-sm sm:text-base md:text-xl tracking-widest uppercase mb-3 md:mb-4 font-label-mono flex items-center gap-3 md:gap-4">
                  <span className="w-8 md:w-12 h-[1px] bg-primary"></span>
                  Who I Am
                </span>
                The Bridge Between <br/>
                <span className="font-bold text-gradient-primary">Raw Data &amp; AI</span>
              </h2>
            </div>

            <div className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant space-y-5 leading-relaxed">
              <p>
                I am a detail-oriented professional specializing in bridging the
                gap between raw data and intelligent systems. With extensive
                experience in high-precision data annotation, I provide the
                foundational ground truth that powers robust machine learning
                models.
              </p>
              <p>
                Beyond technical data work, I operate as a versatile virtual
                assistant, managing complex administrative workflows and
                streamlining operations for fast-paced tech startups and
                enterprise clients alike.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-8">
              <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-primary/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-1">
                  150<span className="text-primary">+</span>
                </span>
                <span className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-on-surface-variant">
                  Projects
                </span>
              </div>
              <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-secondary/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-1">
                  5k<span className="text-secondary">+</span>
                </span>
                <span className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-on-surface-variant">
                  Annotation Hours
                </span>
              </div>
              <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-tertiary/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-1">
                  40<span className="text-tertiary">+</span>
                </span>
                <span className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-on-surface-variant">
                  Clients
                </span>
              </div>
              <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-white/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-1">
                  12
                </span>
                <span className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-on-surface-variant">
                  Tools Mastered
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
