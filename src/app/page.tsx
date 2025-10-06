import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";

export default function PhotographyPortfolio() {
  return (
    <div className="font-sans antialiased bg-black">
      <Header />
      <HeroSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
