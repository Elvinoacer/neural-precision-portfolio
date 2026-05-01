export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex items-center pt-32 pb-16 overflow-hidden bg-surface-lowest">
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px] opacity-50"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 glass-pill text-on-surface-variant font-label-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            System Online & Ready
          </div>
          
          <div className="space-y-6">
            <h1 className="font-display text-5xl md:text-7xl lg:text-[80px] font-medium leading-[1.1] tracking-tight">
              Precision Data.<br />
              <span className="text-gradient-primary font-bold">Seamless Assistance.</span>
            </h1>
            <p className="font-label-mono text-sm md:text-base text-primary/80 uppercase tracking-widest border-l-2 border-primary/30 pl-4">
              AI Data Annotator · LLM Trainer · Virtual Assistant
            </p>
          </div>
          
          <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light">
            I help elite AI teams build smarter models through high-fidelity data
            annotation. I also provide meticulous virtual assistance to keep your 
            operations running seamlessly, from anywhere in the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4 w-full">
            <a
              className="premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-sm uppercase tracking-widest px-10 py-5 rounded-full hover:bg-primary/20 transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-3"
              href="#services"
            >
              <span className="relative z-10">View Services</span>
              <span className="material-symbols-outlined text-lg relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a
              className="relative group overflow-hidden bg-transparent border border-white/10 text-white font-label-mono text-sm uppercase tracking-widest px-10 py-5 rounded-full hover:border-white/30 transition-all duration-500 w-full sm:w-auto text-center"
              href="#contact"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[500px] lg:h-[650px] w-full hidden md:block animate-float">
          <div className="absolute inset-0 premium-border rounded-2xl glass-panel overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 scanline-overlay z-20 mix-blend-overlay opacity-50"></div>
            
            {/* High-end Abstract Visual */}
            <div
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-40 mix-blend-luminosity z-0"
              role="img"
              aria-label="Abstract digital art"
            ></div>
            
            {/* Glowing inner shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,212,255,0.1)] z-10 pointer-events-none"></div>

            {/* Floating Tags */}
            <div className="absolute top-1/4 left-[10%] glass-pill px-5 py-3 rounded-full font-label-mono text-xs tracking-widest text-white z-10 animate-float-delayed shadow-lg backdrop-blur-xl">
              [CVAT]
            </div>
            <div className="absolute bottom-1/3 right-[15%] glass-pill px-5 py-3 rounded-full font-label-mono text-xs tracking-widest text-white z-10 animate-float shadow-lg backdrop-blur-xl">
              [Labelbox]
            </div>
            <div className="absolute top-1/2 left-[40%] glass-pill px-5 py-3 rounded-full font-label-mono text-xs tracking-widest text-primary z-10 animate-float shadow-lg backdrop-blur-xl">
              [Segmentation]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
