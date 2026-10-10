import React, { useRef } from "react";
import { Home, Building2, Wrench, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { services } from "../../data/services";
import { images } from "../../data/images";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const iconMap = {
  Home,
  Building2,
  Wrench,
  Cpu,
  ShieldCheck,
};

export function ServicesSection({ selectedServiceId, onSelectService, onBookService }) {
  const tabsRef = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  const activeIndex = Math.max(
    0,
    services.findIndex((s) => s.id === selectedServiceId)
  );
  const activeService = services[activeIndex] || services[0];
  const ServiceIcon = iconMap[activeService.icon] || Wrench;
  const activeImageData = images[activeService.imageSlot] || images.service1;

  const handleKeyDown = (e, index) => {
    const total = services.length;
    let nextIndex = index;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % total;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = total - 1;
    }

    if (nextIndex !== index) {
      onSelectService(services[nextIndex].id);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  const handleLearnMore = () => {
    if (onBookService) {
      onBookService(activeService.id);
    }
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#14295C] py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
    >
      <PageContainer>
        {/* Header Grid: 1/3 + 2/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12">
          <div className="lg:col-span-4">
            <Eyebrow variant="on-navy">Our services</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="services-heading"
              className="font-display text-white text-[clamp(1.875rem,1.4rem+1.4vw,2.75rem)] leading-[1.05] uppercase"
            >
              Professional electrical services for homes and businesses
            </h2>
          </div>
        </div>

        {/* Content Row: Selector (Tabs) + Featured Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Vertical / Horizontal Tabs Selector */}
          <div className="lg:col-span-4 w-full">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Electrical services menu"
              className="flex lg:flex-col overflow-x-auto no-scrollbar gap-2 lg:gap-1 pb-2 lg:pb-0 border-b lg:border-b-0 border-white/10"
            >
              {services.map((svc, idx) => {
                const isActive = svc.id === activeService.id;
                const tabId = `service-tab-${svc.id}`;
                const panelId = `service-panel-${svc.id}`;

                return (
                  <button
                    key={svc.id}
                    id={tabId}
                    ref={(el) => (tabsRef.current[idx] = el)}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => onSelectService(svc.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`shrink-0 lg:w-full min-h-[46px] lg:min-h-[52px] px-4 py-2.5 rounded-[4px] text-left text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider transition-colors duration-150 cursor-pointer flex items-center justify-between border-b lg:border-b-transparent focus-visible:outline-3 focus-visible:outline-[#FFD92F] ${
                      isActive
                        ? "bg-[#1858DE] text-white shadow-md"
                        : "bg-transparent text-white/70 hover:text-white hover:bg-white/5 border-white/10"
                    }`}
                  >
                    <span>{svc.tabLabel}</span>
                    <span
                      className={`hidden lg:inline-block w-2 h-2 rounded-full ${
                        isActive ? "bg-[#FFD92F]" : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Panel (Role Tabpanel) */}
          <div className="lg:col-span-8 w-full">
            <div
              id={`service-panel-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.id}`}
              className="bg-[#1B357A] border border-white/10 rounded-[8px] p-6 sm:p-8 lg:p-10 shadow-2xl"
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
                  prefersReducedMotion ? "" : "animate-in fade-in duration-200"
                }`}
              >
                {/* Left Panel Content */}
                <div className="md:col-span-7 flex flex-col items-start gap-5">
                  {/* Yellow Circular Icon */}
                  <div className="w-12 h-12 rounded-full bg-[#FFD92F] text-[#14295C] flex items-center justify-center shadow-md">
                    <ServiceIcon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="font-display text-[26px] sm:text-[30px] leading-tight text-white uppercase">
                    {activeService.title}
                  </h3>

                  <p className="text-white/85 text-[14px] sm:text-[15px] leading-relaxed">
                    {activeService.longDescription}
                  </p>

                  <div className="pt-2 w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleLearnMore}
                      className="w-full sm:w-auto"
                    >
                      {activeService.ctaLabel}
                    </Button>
                  </div>
                </div>

                {/* Right Panel Image */}
                <div className="md:col-span-5 rounded-[8px] overflow-hidden border border-white/15 aspect-[4/5] bg-[#14295C] relative group">
                  <ImageWithFallback
                    src={activeImageData.url}
                    alt={activeImageData.alt}
                    width={activeImageData.width}
                    height={activeImageData.height}
                    objectPosition={activeImageData.objectPosition}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-[#14295C]/20 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
