import React from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { Accordion } from "../ui/Accordion";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { faqs } from "../../data/faqs";
import { images } from "../../data/images";

export function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
    >
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (~45%): Eyebrow, H2, and 4:3 Photo */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>FAQ</Eyebrow>
              <h2
                id="faq-heading"
                className="font-display text-[#14295C] text-[clamp(1.875rem,1.4rem+1.4vw,2.75rem)] leading-[1.05] uppercase"
              >
                Frequently asked questions
              </h2>
            </div>

            <div className="rounded-[8px] overflow-hidden border border-[#E1E5EB] shadow-[0_8px_24px_rgba(20,41,92,0.06)] aspect-[4/3] bg-slate-100">
              <ImageWithFallback
                src={images.faqImage.url}
                alt={images.faqImage.alt}
                width={images.faqImage.width}
                height={images.faqImage.height}
                aspectRatio="4/3"
                objectPosition={images.faqImage.objectPosition}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column (~55%): Accordion */}
          <div className="lg:col-span-7">
            <Accordion items={faqs} defaultOpenId="faq-5" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
