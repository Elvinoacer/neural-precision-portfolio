"use client";

import { useState, useEffect } from "react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          ? "py-4 bg-surface-dim/70 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full px-8 max-w-[1400px] mx-auto">
        <div className="text-2xl font-bold tracking-tight text-white font-display z-50 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[1px]">
            <span className="w-full h-full bg-surface-dim rounded-full flex items-center justify-center">
              <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            </span>
          </span>
          <span className="tracking-widest uppercase text-sm">Neural</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              className="font-label-mono tracking-widest text-xs uppercase text-on-surface-variant hover:text-white transition-all duration-300 relative group"
              href={link.href}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="premium-border relative group overflow-hidden bg-surface-container-highest/50 backdrop-blur-md text-white font-label-mono text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-primary-container/20 transition-all duration-500">
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-white z-50 relative"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined text-3xl font-light">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full glass-panel transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen py-8 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              className="font-display tracking-widest text-lg uppercase text-on-surface-variant hover:text-white transition-colors w-full text-center py-4 border-b border-white/5"
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="premium-border mt-6 w-full max-w-xs relative group overflow-hidden bg-surface-container-highest/50 backdrop-blur-md text-white font-label-mono text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-primary-container/20 transition-all duration-500">
            <span className="relative z-10">Hire Me</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
