import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      className="w-full py-32 relative bg-surface-container-lowest overflow-hidden"
      id="about"
    >
      {/* Editorial Background Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative group perspective-1000">
            {/* Premium Editorial Frame */}
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
              {/* Subtle Lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-transparent opacity-80 z-20"></div>
            </div>
            {/* Floating Info Tag */}
            <div className="absolute -bottom-6 -right-6 glass-pill px-8 py-6 rounded-2xl z-30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl animate-float">
              <div className="font-display text-3xl text-white font-light tracking-tight">Est. 2020</div>
              <div className="font-label-mono text-xs tracking-widest text-primary uppercase mt-1">Data & Operations</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12 lg:pl-12">
            <div className="space-y-6 mt-12 lg:mt-0">
              <h2 className="font-display text-4xl md:text-6xl text-white tracking-tight font-light flex flex-col">
                <span className="text-on-surface-variant text-xl tracking-widest uppercase mb-4 font-label-mono flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-primary"></span>
                  Who I Am
                </span>
                The Bridge Between <br/>
                <span className="font-bold text-gradient-primary">Raw Data & AI</span>
              </h2>
            </div>
            
            <div className="font-body-lg text-lg md:text-xl text-on-surface-variant space-y-6 font-light leading-relaxed">
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
            
            {/* Stats Grid - Premium Refinement */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="glass-panel p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-primary/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-5xl font-light text-white mb-2">
                  150<span className="text-primary">+</span>
                </span>
                <span className="font-label-mono text-xs tracking-widest uppercase text-on-surface-variant">
                  Projects Completed
                </span>
              </div>
              <div className="glass-panel p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-secondary/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-5xl font-light text-white mb-2">
                  5k<span className="text-secondary">+</span>
                </span>
                <span className="font-label-mono text-xs tracking-widest uppercase text-on-surface-variant">
                  Annotation Hours
                </span>
              </div>
              <div className="glass-panel p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-tertiary/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-5xl font-light text-white mb-2">
                  40<span className="text-tertiary">+</span>
                </span>
                <span className="font-label-mono text-xs tracking-widest uppercase text-on-surface-variant">
                  Satisfied Clients
                </span>
              </div>
              <div className="glass-panel p-8 rounded-2xl flex flex-col justify-center border-l-2 border-l-white/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="font-display text-5xl font-light text-white mb-2">
                  12
                </span>
                <span className="font-label-mono text-xs tracking-widest uppercase text-on-surface-variant">
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
