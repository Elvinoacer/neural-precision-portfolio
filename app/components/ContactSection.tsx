export default function ContactSection() {
  return (
    <section className="flex-grow relative w-full overflow-hidden flex items-center justify-center py-32 bg-surface-dim" id="contact">
      {/* Cinematic Lighting Background */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-luminosity z-0"></div>

      <div className="w-full max-w-[1400px] mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Header & Info */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-12">
          <header>
            <div className="inline-flex items-center gap-3 glass-pill px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,212,255,0.8)]"></span>
              <span className="font-label-mono text-xs tracking-widest uppercase text-primary">
                Available for Projects
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6 font-light tracking-tight leading-[1.1]">
              Initiate <br/><span className="font-bold text-gradient-primary">Connection.</span>
            </h2>
            <p className="font-body-lg text-lg text-on-surface-variant font-light max-w-md leading-relaxed">
              Ready to scale your data operations or need dedicated virtual assistance? 
              Reach out and I will respond within 24 hours.
            </p>
          </header>

          <div className="flex flex-col gap-6">
            <a
              className="flex items-center gap-6 p-6 glass-panel premium-border rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              href="mailto:hello@neuralprecision.dev"
            >
              <div className="w-14 h-14 rounded-full glass-pill flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                <span
                  className="material-symbols-outlined text-primary text-2xl font-light"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  mail
                </span>
              </div>
              <div>
                <h3 className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
                  Direct Email
                </h3>
                <p className="font-body-lg text-lg text-white font-light group-hover:text-primary transition-colors">
                  hello@neuralprecision.dev
                </p>
              </div>
            </a>

            <a
              className="flex items-center gap-6 p-6 glass-panel premium-border rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              href="#"
            >
              <div className="w-14 h-14 rounded-full glass-pill flex items-center justify-center border border-secondary/20 group-hover:border-secondary/50 transition-colors">
                <span
                  className="material-symbols-outlined text-secondary text-2xl font-light"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  connect_without_contact
                </span>
              </div>
              <div>
                <h3 className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">
                  Professional Network
                </h3>
                <p className="font-body-lg text-lg text-white font-light group-hover:text-secondary transition-colors">
                  LinkedIn Profile
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Premium Contact Form */}
        <div className="lg:col-span-7 flex items-center">
          <div className="w-full glass-panel premium-border rounded-[2rem] p-8 md:p-14 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <form action="#" className="flex flex-col gap-10 relative z-10" method="POST">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4 relative group">
                  <label
                    className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white font-light focus:border-primary transition-colors outline-none w-full"
                    id="fullName"
                    name="fullName"
                    placeholder="Jane Doe"
                    required
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-4 relative group">
                  <label
                    className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    className="bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white font-light focus:border-primary transition-colors outline-none w-full"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="jane@example.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 relative group">
                <label
                  className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                  htmlFor="serviceInterest"
                >
                  Service Interest
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white font-light focus:border-primary transition-colors outline-none w-full cursor-pointer pr-10"
                    id="serviceInterest"
                    name="serviceInterest"
                    required
                    defaultValue=""
                  >
                    <option disabled value="" className="bg-surface-dim text-on-surface-variant">
                      Select a Discipline...
                    </option>
                    <option value="data_annotation" className="bg-surface-dim">Data Annotation</option>
                    <option value="image_annotation" className="bg-surface-dim">Image Annotation</option>
                    <option value="llm_training" className="bg-surface-dim">LLM/LM AI Training</option>
                    <option value="va_data_entry" className="bg-surface-dim">Virtual Assistant — Data Entry</option>
                    <option value="va_customer_service" className="bg-surface-dim">Virtual Assistant — Customer Service</option>
                    <option value="other" className="bg-surface-dim">Other Inquiry</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-white">
                    <span className="material-symbols-outlined text-lg font-light">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative group">
                <label
                  className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                  htmlFor="projectDetails"
                >
                  Project Details
                </label>
                <textarea
                  className="bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white font-light focus:border-primary transition-colors outline-none w-full resize-y min-h-[120px]"
                  id="projectDetails"
                  name="projectDetails"
                  placeholder="Describe your parameters or requirements..."
                  required
                  rows={4}
                ></textarea>
              </div>

              <button
                className="mt-6 w-full premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-sm uppercase tracking-widest px-10 py-6 rounded-full hover:bg-primary/20 transition-all duration-500 flex items-center justify-center gap-4"
                type="submit"
              >
                <span className="relative z-10">Transmit Message</span>
                <span className="material-symbols-outlined relative z-10 text-lg group-hover:translate-x-2 transition-transform duration-500">
                  trending_flat
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
