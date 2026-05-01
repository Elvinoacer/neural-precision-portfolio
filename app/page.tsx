import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ToolkitSection from "./components/ToolkitSection";
import WhyChooseMeSection from "./components/WhyChooseMeSection";
import PortfolioGallerySection from "./components/PortfolioGallerySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-grow w-full relative z-10 flex flex-col items-center">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ToolkitSection />
        <WhyChooseMeSection />
        <PortfolioGallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
