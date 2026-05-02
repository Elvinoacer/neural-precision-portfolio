import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import PainPointsSection from "./components/PainPointsSection";
import ServicesSnapshot from "./components/ServicesSnapshot";
import WhoIHelpSection from "./components/WhoIHelpSection";
import WhyChooseMeSection from "./components/WhyChooseMeSection";
import ProcessSection from "./components/ProcessSection";
import ProofSection from "./components/ProofSection";
import CTASection from "./components/CTASection";

export const metadata: Metadata = {
  title: "Hire a Data Annotation & Data Entry Specialist — Everlyn Linda",
  description:
    "Accurate data annotation, data entry, and reliable virtual assistance for growing teams. Hire Everlyn Linda for image segmentation, spreadsheet management, AI training data, customer support, and remote admin operations. Based in Kenya, available worldwide.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hire a Data Annotation & Data Entry Specialist — Everlyn Linda",
    description:
      "Accurate data annotation, data entry, and reliable virtual assistance for growing teams. Image segmentation, spreadsheet management, AI training data, customer support, and remote operations.",
    url: "/",
  },
};


export default function Home() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <ServicesSnapshot />
      <WhoIHelpSection />
      <WhyChooseMeSection />
      <ProcessSection />
      <ProofSection />
      <CTASection />
    </>
  );
}
