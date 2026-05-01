"use client";

import { useState, useEffect } from "react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Tools", href: "#tools" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-surface-dim/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full px-5 md:px-8 max-w-[1400px] mx-auto">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 z-50">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[1px]">
            <span className="w-full h-full bg-surface-dim rounded-full flex items-center justify-center">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            </span>
          </span>
          <span className="font-display text-white tracking-widest uppercase text-sm font-medium">Neural</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              className="font-label-mono tracking-widest text-xs uppercase text-muted hover:text-white transition-all duration-300 relative group"
              href={link.href}
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="premium-border relative group overflow-hidden bg-white/5 backdrop-blur-md text-white font-label-mono text-xs uppercase tracking-widest px-7 py-2.5 rounded-full hover:bg-primary/15 transition-all duration-500 inline-flex items-center gap-2"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center p-1.5 text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-surface-dim/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-400 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-1 px-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              className="font-display tracking-widest text-base uppercase text-on-surface-variant hover:text-white transition-colors w-full text-center py-4 border-b border-white/5 last:border-b-0"
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="premium-border mt-4 w-full relative group overflow-hidden bg-white/5 text-white font-label-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full text-center"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
