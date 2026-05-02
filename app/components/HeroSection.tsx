export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      <video
        autoPlay
        className="absolute inset-0 h-full w-full object-cover object-center z-0"
        loop
        muted
        playsInline
        poster="/images/everlyn_linda_photo.webp"
        preload="auto"
      >
        <source src="/images/videos/mp_.mp4" type="video/mp4" />
        <source src="/images/videos/mp_.mov" type="video/quicktime" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>

      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-primary/8 rounded-full blur-[100px] md:blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-secondary/8 rounded-full blur-[80px] md:blur-[100px] animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px] opacity-40"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-8 md:space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 glass-pill text-on-surface-variant font-label-mono text-[11px] tracking-widest uppercase rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.6)]"></span>
            System Online &amp; Ready
          </div>

          <div className="space-y-5">
            <h1 className="font-display text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight">
              Precision Data.
              <br />
              <span className="text-gradient-primary font-bold">
                Seamless Assistance.
              </span>
            </h1>
            <p className="font-label-mono text-xs sm:text-sm text-primary uppercase tracking-widest border-l-2 border-primary/40 pl-4">
              AI Data Annotator · LLM Trainer · Virtual Assistant
            </p>
          </div>

          <p className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            I help elite AI teams build smarter models through high-fidelity
            data annotation. I also provide meticulous virtual assistance to
            keep your operations running seamlessly, from anywhere in the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
            <a
              className="premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:bg-primary/20 transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-3"
              href="#services"
            >
              <span className="relative z-10">View Services</span>
              <span className="material-symbols-outlined text-base relative z-10 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
            <a
              className="relative group overflow-hidden bg-transparent border border-white/15 text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-4 sm:py-5 rounded-full hover:border-white/30 hover:bg-white/5 transition-all duration-500 w-full sm:w-auto text-center"
              href="#contact"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
