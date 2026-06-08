import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/254792038496?text=Hello%20Everlyn%2C%20I%20visited%20your%20website%20and%20I%20would%20like%20to%20inquire%20about%20your%20services.";

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Work Samples", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const contactLinks = [
    { name: "Email", href: "mailto:everlineauma.ke@gmail.com" },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/lindahlish2043",
      external: true,
    },
    { name: "WhatsApp", href: WHATSAPP_URL, external: true },
    { name: "Phone", href: "tel:+254792038496" },
  ];

  return (
    <footer className="bg-surface-container-lowest w-full py-12 md:py-16 relative z-20 section-divider">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[1px]">
                <span className="w-full h-full bg-surface-container-lowest rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                </span>
              </span>
              <span className="font-display text-white tracking-widest uppercase text-sm font-medium">
                Neural Precision
              </span>
            </Link>
            <p className="text-on-surface-variant text-sm font-body-md leading-relaxed max-w-xs">
              Human Precision for Data, AI, and Digital Operations.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              {contactLinks.map((link) => (
                <a
                  key={link.name}
                  className="text-muted hover:text-white transition-colors text-sm font-label-mono tracking-wider uppercase"
                  href={link.href}
                  rel={link.external ? "noreferrer" : undefined}
                  target={link.external ? "_blank" : undefined}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-1">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    className="text-on-surface-variant hover:text-white transition-colors text-sm font-body-md"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Status + WhatsApp */}
          <div className="flex flex-col gap-4 items-start lg:items-end">
            <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-muted mb-1 text-left lg:text-right w-full">
              Status
            </h4>
            <div className="inline-flex items-center gap-2.5 glass-pill px-4 py-2.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span className="text-tertiary font-body-md font-medium text-sm">
                Available for Projects
              </span>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp font-label-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full inline-flex items-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="font-label-mono text-[10px] sm:text-xs tracking-widest uppercase text-muted">
            © {new Date().getFullYear()} Neural Precision by Everlyn Linda.
            Data-Driven Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
