import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { TestimonialCard } from "../ui/TestimonialCard";
import { PageContainer } from "../layout/PageContainer";
import { testimonials } from "../../data/testimonials";
import { siteContent } from "../../data/siteContent";

export function TestimonialsSection() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // If testimonials feature flag is disabled, hide section completely
  if (siteContent.features?.testimonials === false) {
    return null;
  }

  const checkScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, []);

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = 350;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleScroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleScroll("right");
    }
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden border-t border-[#E1E5EB]"
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (~30%) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Eyebrow>{siteContent.testimonialsSection.eyebrow}</Eyebrow>
            <h2
              id="testimonials-heading"
              className="font-display text-[#14295C] text-[clamp(1.875rem,1.4rem+1.4vw,2.75rem)] leading-[1.05] uppercase"
            >
              {siteContent.testimonialsSection.heading}
            </h2>
            <p className="text-[#5B6475] text-[15px] leading-relaxed mb-2">
              {siteContent.testimonialsSection.description}
            </p>
            <Button href="#contact" variant="primary" size="md">
              {siteContent.testimonialsSection.ctaLabel}
            </Button>
          </div>

          {/* Right Column Carousel Track (~70%) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            <div
              ref={scrollContainerRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Customer testimonials"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 px-1 focus-visible:outline-2 focus-visible:outline-[#1858DE] rounded-[8px]"
            >
              {testimonials.map((item, idx) => (
                <TestimonialCard
                  key={item.id}
                  item={item}
                  index={idx}
                  total={testimonials.length}
                />
              ))}
            </div>

            {/* Carousel Navigation Buttons & Sample reviews layout notice */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="text-[12px] text-[#5B6475] max-w-md">
                <span className="italic">{siteContent.testimonialsSection.sampleNotice}</span>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous testimonial"
                  aria-disabled={!canScrollLeft}
                  className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#E1E5EB] flex items-center justify-center transition-colors cursor-pointer select-none focus-visible:outline-3 focus-visible:outline-[#1858DE] ${
                    canScrollLeft
                      ? "bg-white text-[#14295C] hover:bg-[#F4F5F7]"
                      : "opacity-40 cursor-not-allowed bg-[#F4F5F7] text-[#5B6475]"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next testimonial"
                  aria-disabled={!canScrollRight}
                  className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#FFD92F] text-[#14295C] flex items-center justify-center transition-colors cursor-pointer select-none shadow-sm focus-visible:outline-3 focus-visible:outline-[#1858DE] ${
                    canScrollRight
                      ? "hover:bg-[#F2C814]"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
