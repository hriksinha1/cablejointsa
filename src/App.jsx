import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { ServiceStrip } from "./components/sections/ServiceStrip";
import { IntroMetricsSection } from "./components/sections/IntroMetricsSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { FAQSection } from "./components/sections/FAQSection";
import { ArticlesSection } from "./components/sections/ArticlesSection";
import { FinalCTASection } from "./components/sections/FinalCTASection";

export function App() {
  const [selectedServiceId, setSelectedServiceId] = useState("residential");
  const [activeArticleModal, setActiveArticleModal] = useState(null);

  const handleBookService = (serviceId) => {
    setSelectedServiceId(serviceId);
  };

  const handleSelectServiceFromHeader = (serviceId) => {
    setSelectedServiceId(serviceId);
  };

  const handleOpenArticle = (article) => {
    setActiveArticleModal(article);
  };

  const handleCloseArticle = () => {
    setActiveArticleModal(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#303746]">
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#FFD92F] focus:text-[#14295C] focus:font-bold focus:rounded-[4px] focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      {/* Header Landmark */}
      <Header
        onSelectService={handleSelectServiceFromHeader}
        onOpenArticle={handleOpenArticle}
      />

      {/* Main Content Landmark with Exact Visual Rhythm */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero Section (White) */}
        <HeroSection />

        {/* 2. Service Strip #1 (Yellow Marquee) */}
        <ServiceStrip variant="yellow" />

        {/* 3. Company Intro + Metrics + Video Preview (Light Gray) */}
        <IntroMetricsSection />

        {/* 4. About & Quality Section (White) */}
        <AboutSection />

        {/* 5. Professional Services Section (Deep Navy) */}
        <ServicesSection
          selectedServiceId={selectedServiceId}
          onSelectService={setSelectedServiceId}
          onBookService={handleBookService}
        />

        {/* 6. Testimonials Carousel Section (White) */}
        <TestimonialsSection />

        {/* 7. Contact & Enquiry Form Section (Light Gray) */}
        <ContactSection preselectedServiceId={selectedServiceId} />

        {/* 8. FAQ Section with Accordion (White) */}
        <FAQSection />

        {/* 9. Service Strip #2 (Blue Marquee Reverse) */}
        <ServiceStrip variant="blue" reverse />

        {/* 10. Electrical Safety Blog / Editorial Section (White) */}
        <ArticlesSection
          selectedArticle={activeArticleModal}
          onSelectArticle={handleOpenArticle}
          onCloseArticle={handleCloseArticle}
        />

        {/* 11. Final Call To Action Banner (Navy Overlay Photo) */}
        <FinalCTASection />
      </main>

      {/* Footer Landmark with Watermark */}
      <Footer />
    </div>
  );
}

export default App;
