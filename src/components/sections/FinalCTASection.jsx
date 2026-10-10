import React from "react";
import { Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { siteContent } from "../../data/siteContent";
import { images } from "../../data/images";

export function FinalCTASection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#14295C] overflow-hidden text-white"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={images.ctaBackground.src}
          srcSet={images.ctaBackground.srcSet}
          sizes={images.ctaBackground.sizes}
          alt={images.ctaBackground.alt}
          width={images.ctaBackground.width}
          height={images.ctaBackground.height}
          objectPosition={images.ctaBackground.objectPosition}
          slotKey="ctaBackground"
          decorative={true}
          className="w-full h-full object-cover"
        />
        {/* Navy Overlay ensuring WCAG AAA 4.5:1+ contrast while keeping photo visible */}
        <div
          className="absolute inset-0 bg-[#14295C]/75"
          aria-hidden="true"
        />
      </div>

      <PageContainer className="relative z-10">
        <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-6">
          <h2
            id="cta-heading"
            className="font-display text-white text-[clamp(2rem,1.5rem+2vw,3.5rem)] leading-[1.05] uppercase tracking-wide"
          >
            {siteContent.finalCta.heading}
          </h2>

          <p className="text-white/85 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl">
            {siteContent.finalCta.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {siteContent.finalCta.primaryBtn}
            </Button>

            <Button
              href={siteContent.contact.phoneTel}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{siteContent.finalCta.secondaryBtn}</span>
            </Button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
