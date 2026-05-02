"use client";

import { useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/254792038496?text=Hello%20Everlyn%2C%20I%20visited%20your%20website%20and%20I%20would%20like%20to%20inquire%20about%20your%20services.";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full glass-panel premium-border rounded-2xl md:rounded-[2rem] p-8 md:p-14 text-center">
        <div className="w-16 h-16 rounded-full bg-tertiary/15 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-tertiary text-3xl">check_circle</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Message Sent!</h3>
        <p className="font-body-lg text-on-surface-variant mb-8 max-w-md mx-auto">
          Thank you for reaching out. I&apos;ll respond within 24 hours with availability, next steps, and how I can support your project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-whatsapp font-label-mono text-xs uppercase tracking-widest px-6 py-4 rounded-full inline-flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">chat</span>
            Follow Up on WhatsApp
          </a>
          <button onClick={() => setStatus("idle")} className="text-muted hover:text-white font-label-mono text-xs uppercase tracking-widest transition-colors">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full glass-panel premium-border rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10 relative z-10">
        <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Tell me what you need help with. I&apos;ll respond within 24 hours with availability, next steps, and how I can support your project.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          <div className="flex flex-col gap-3 relative group">
            <label className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors" htmlFor="fullName">Full Name</label>
            <input className="bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full placeholder:text-white/20" id="fullName" name="fullName" placeholder="Jane Doe" required type="text" />
          </div>
          <div className="flex flex-col gap-3 relative group">
            <label className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors" htmlFor="emailOrWhatsapp">Email / WhatsApp Number</label>
            <input className="bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full placeholder:text-white/20" id="emailOrWhatsapp" name="emailOrWhatsapp" placeholder="jane@example.com or +1234567890" required type="text" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          <div className="flex flex-col gap-3 relative group">
            <label className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors" htmlFor="serviceNeeded">Service Needed</label>
            <div className="relative">
              <select className="appearance-none bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full cursor-pointer pr-10" id="serviceNeeded" name="serviceNeeded" required defaultValue="">
                <option disabled value="" className="bg-surface-dim text-muted">Select a service...</option>
                <option value="data_annotation" className="bg-surface-dim text-white">Data Annotation</option>
                <option value="virtual_assistant" className="bg-surface-dim text-white">Virtual Assistant</option>
                <option value="customer_support" className="bg-surface-dim text-white">Customer Support</option>
                <option value="ai_llm_training" className="bg-surface-dim text-white">AI / LLM Training Support</option>
                <option value="other" className="bg-surface-dim text-white">Other Inquiry</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-muted">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 relative group">
            <label className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors" htmlFor="timeline">Expected Timeline</label>
            <div className="relative">
              <select className="appearance-none bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full cursor-pointer pr-10" id="timeline" name="timeline" defaultValue="">
                <option disabled value="" className="bg-surface-dim text-muted">Select timeline...</option>
                <option value="asap" className="bg-surface-dim text-white">ASAP</option>
                <option value="1_week" className="bg-surface-dim text-white">Within 1 Week</option>
                <option value="2_weeks" className="bg-surface-dim text-white">Within 2 Weeks</option>
                <option value="1_month" className="bg-surface-dim text-white">Within 1 Month</option>
                <option value="ongoing" className="bg-surface-dim text-white">Ongoing / Long-term</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-muted">
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 relative group">
          <label className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors" htmlFor="projectDetails">Project Details</label>
          <textarea className="bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full resize-y min-h-[100px] placeholder:text-white/20" id="projectDetails" name="projectDetails" placeholder="Describe your project requirements, scope, and any specific needs..." required rows={4}></textarea>
        </div>

        <div className="flex flex-col gap-3 relative group">
          <label className="font-label-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-primary transition-colors" htmlFor="budget">Budget Range <span className="text-muted/60">(optional)</span></label>
          <input className="bg-transparent border-b border-white/15 px-0 py-3 text-base md:text-lg text-white focus:border-primary transition-colors outline-none w-full placeholder:text-white/20" id="budget" name="budget" placeholder="e.g. $500 - $1000" type="text" />
        </div>

        {status === "error" && (
          <p className="text-error text-sm font-body-md">Something went wrong. Please try again or contact me directly via WhatsApp.</p>
        )}

        <button className="mt-4 w-full premium-border relative group overflow-hidden bg-primary/10 backdrop-blur-md text-white font-label-mono text-xs sm:text-sm uppercase tracking-widest px-8 py-5 md:py-6 rounded-full hover:bg-primary/20 transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50" type="submit" disabled={status === "sending"}>
          <span className="relative z-10">{status === "sending" ? "Sending..." : "Send Project Request"}</span>
          <span className="material-symbols-outlined relative z-10 text-base group-hover:translate-x-2 transition-transform duration-500">trending_flat</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
        </button>
      </form>
    </div>
  );
}
