export default function ContactSection() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center py-20 md:py-32 bg-surface-dim section-divider"
      id="contact"
    >
      {/* Ambient Background */}
      <div className="absolute top-1/4 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/8 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-secondary/8 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-0"></div>

      <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-8 md:gap-12">
          <header>
            <div className="inline-flex items-center gap-2.5 glass-pill px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.6)]"></span>
              <span className="font-label-mono text-[11px] tracking-widest uppercase text-primary">
                Available for Projects
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-5 font-light tracking-tight leading-[1.1]">
              Initiate <br />
              <span className="font-bold text-gradient-primary">
                Connection.
              </span>
            </h2>
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-md leading-relaxed">
              Ready to scale your data operations or need dedicated virtual
              assistance? Reach out and I will respond within 24 hours.
            </p>
          </header>

          <div className="flex flex-col gap-4 md:gap-6">
            <a
              className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel premium-border rounded-xl md:rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              href="mailto:lindahlish18@gmail.com"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-pill flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors shrink-0">
                <span
                  className="material-symbols-outlined text-primary text-xl md:text-2xl"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  mail
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                  Direct Email
                </h3>
                <p className="font-body-lg text-base md:text-lg text-white group-hover:text-primary transition-colors truncate">
                  lindahlish18@gmail.com
                </p>
              </div>
            </a>

            <a
              className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel premium-border rounded-xl md:rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              href="tel:+254792038496"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-pill flex items-center justify-center border border-secondary/20 group-hover:border-secondary/50 transition-colors shrink-0">
                <span
                  className="material-symbols-outlined text-secondary text-xl md:text-2xl"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  call
                </span>
              </div>
              <div>
                <h3 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                  Phone
                </h3>
                <p className="font-body-lg text-base md:text-lg text-white group-hover:text-secondary transition-colors">
                  +254 792 038496
                </p>
              </div>
            </a>

            <a
              className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel premium-border rounded-xl md:rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              href="https://www.linkedin.com/in/lindahlish2043"
              rel="noreferrer"
              target="_blank"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-pill flex items-center justify-center border border-secondary/20 group-hover:border-secondary/50 transition-colors shrink-0">
                <span
                  className="material-symbols-outlined text-secondary text-xl md:text-2xl"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  person
                </span>
              </div>
              <div>
                <h3 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                  Professional Network
                </h3>
                <p className="font-body-lg text-base md:text-lg text-white group-hover:text-secondary transition-colors">
                  LinkedIn Profile
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 flex items-center">
          <div className="w-full glass-panel premium-border rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <form
              action="#"
              className="flex flex-col gap-8 md:gap-10 relative z-10"
              method="POST"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                <div className="flex flex-col gap-3 relative group">
                  <label
                    className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full placeholder:text-white/20"
                    id="fullName"
                    name="fullName"
                    placeholder="Jane Doe"
                    required
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-3 relative group">
                  <label
                    className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    className="bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full placeholder:text-white/20"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="jane@example.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 relative group">
                <label
                  className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors"
                  htmlFor="serviceInterest"
                >
                  Service Interest
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full cursor-pointer pr-10"
                    id="serviceInterest"
                    name="serviceInterest"
                    required
                    defaultValue=""
                  >
                    <option
                      disabled
                      value=""
                      className="bg-surface-dim text-muted"
                    >
                      Select a Discipline...
                    </option>
                    <option
                      value="data_annotation"
                      className="bg-surface-dim text-white"
                    >
                      Data Annotation
                    </option>
                    <option
                      value="image_annotation"
                      className="bg-surface-dim text-white"
                    >
                      Image Annotation
                    </option>
                    <option
                      value="llm_training"
                      className="bg-surface-dim text-white"
                    >
                      LLM/LM AI Training
                    </option>
                    <option
                      value="va_data_entry"
                      className="bg-surface-dim text-white"
                    >
                      Virtual Assistant — Data Entry
                    </option>
                    <option
                      value="va_customer_service"
                      className="bg-surface-dim text-white"
                    >
                      Virtual Assistant — Customer Service
                    </option>
                    <option value="other" className="bg-surface-dim text-white">
                      Other Inquiry
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-muted">
                    <span className="material-symbols-outlined text-lg">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 relative group">
                <label
                  className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors"
                  htmlFor="projectDetails"
                >
                  Project Details
                </label>
                <textarea
                  className="bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full resize-y min-h-[100px] placeholder:text-white/20"
                  id="projectDetails"
                  name="projectDetails"
                  placeholder="Describe your parameters or requirements..."
                  required
                  rows={4}
                ></textarea>
              </div>

              <button
                className="mt-4 w-full premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-5 md:py-6 rounded-full hover:bg-primary/20 transition-all duration-500 flex items-center justify-center gap-3"
                type="submit"
              >
                <span className="relative z-10">Transmit Message</span>
                <span className="material-symbols-outlined relative z-10 text-base group-hover:translate-x-2 transition-transform duration-500">
                  trending_flat
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
