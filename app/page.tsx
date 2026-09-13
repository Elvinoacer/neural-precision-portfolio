import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import TrustMarquee from "./components/TrustMarquee";
import InteractiveVisionStudio from "./components/InteractiveVisionStudio";
import PainPointsSection from "./components/PainPointsSection";
import ServicesSnapshot from "./components/ServicesSnapshot";
import WhoIHelpSection from "./components/WhoIHelpSection";
import CertificationSection from "./components/CertificationSection";
import WhyChooseMeSection from "./components/WhyChooseMeSection";
import ProcessSection from "./components/ProcessSection";
import ProofSection from "./components/ProofSection";
import CTASection from "./components/CTASection";

export const metadata: Metadata = {
  title: "Hire a 3D LiDAR & Data Annotation Specialist — Everlyn Linda",
  description:
    "Accurate 3D LiDAR point cloud annotation, semantic segmentation, data entry, and reliable virtual assistance for AI teams. Hire Everlyn Linda for image segmentation, spreadsheet management, AI training data, customer support, and remote admin operations. Based in Kenya, available worldwide.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hire a 3D LiDAR & Data Annotation Specialist — Everlyn Linda",
    description:
      "Accurate 3D LiDAR point cloud annotation, semantic segmentation, data entry, and reliable virtual assistance for AI teams. Verified QA, sub-pixel edge precision.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustMarquee />
      <InteractiveVisionStudio />
      <PainPointsSection />
      <ServicesSnapshot />
      <WhoIHelpSection />
      <CertificationSection />
      <WhyChooseMeSection />
      <ProcessSection />
      <ProofSection />
      <CTASection />
    </>
  );
}
