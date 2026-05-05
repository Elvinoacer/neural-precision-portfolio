import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";

const WHATSAPP_URL =
  "https://wa.me/254792038496?text=Hello%20Everlyn%2C%20I%20visited%20your%20website%20and%20I%20would%20like%20to%20inquire%20about%20your%20services.";

export const metadata: Metadata = {
  title: "Contact & Hire Everlyn Linda — Book a Free Consultation",
  description:
    "Get in touch with Everlyn Linda for data annotation, virtual assistance, customer support, and AI training. Book a free consultation via WhatsApp, send a project request, or email directly. Response within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Hire Everlyn Linda — Data Annotation & Virtual Assistant",
    description:
      "Book a free consultation, send a project request, or reach out via WhatsApp. Data annotation, virtual assistance, and AI training support. Response within 24 hours.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/images/everlyn_linda_photo.webp",
        width: 1200,
        height: 630,
        alt: "Contact Everlyn Linda — Hire a Data Annotation Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Hire Everlyn Linda | Neural Precision",
    description:
      "Book a free consultation for data annotation, virtual assistance, customer support, or AI training. Response within 24 hours.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative w-full overflow-hidden flex items-start justify-center pt-32 pb-20 md:pt-40 md:pb-32 bg-surface-dim min-h-screen">
        {/* Ambient Background */}
        <div className="absolute top-1/4 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/8 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-secondary/8 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-0"></div>

        <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-start gap-8 md:gap-12">
            <header>
              <div className="inline-flex items-center gap-2.5 glass-pill px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="font-label-mono text-[11px] tracking-widest uppercase text-tertiary">
                  Available for Projects
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-5 font-light tracking-tight leading-[1.1]">
                Let&apos;s{" "}
                <span className="font-bold text-gradient-primary">
                  Work Together.
                </span>
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-md leading-relaxed">
                Ready to get reliable data work or remote support? Reach out and
                I&apos;ll respond within 24 hours.
              </p>
            </header>

            {/* Primary CTA — Consultation */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp font-label-mono text-sm uppercase tracking-widest px-8 py-5 rounded-full flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              Book a Free Consultation
            </a>

            {/* Fast contact */}
            <div className="flex flex-col gap-4 md:gap-6">
              <a
                className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel premium-border rounded-xl md:rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                href="mailto:everlineauma46@gmail.com"
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
                    everlineauma46@gmail.com
                  </p>
                </div>
              </a>

              <a
                className="flex items-center gap-4 md:gap-6 p-4 md:p-6 glass-panel premium-border rounded-xl md:rounded-2xl group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-pill flex items-center justify-center border border-whatsapp/20 group-hover:border-whatsapp/50 transition-colors shrink-0">
                  <span
                    className="material-symbols-outlined text-whatsapp text-xl md:text-2xl"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    chat
                  </span>
                </div>
                <div>
                  <h3 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                    WhatsApp
                  </h3>
                  <p className="font-body-lg text-base md:text-lg text-white group-hover:text-whatsapp transition-colors">
                    +254 792 038496
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
                    LinkedIn
                  </h3>
                  <p className="font-body-lg text-base md:text-lg text-white group-hover:text-secondary transition-colors">
                    LinkedIn Profile
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Smart Form */}
          <div className="lg:col-span-7 flex items-start">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
