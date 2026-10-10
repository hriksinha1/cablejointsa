import React from "react";
import { MapPin, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { siteContent } from "../../data/siteContent";
import { images } from "../../data/images";
import { buildTelHref } from "../../utils/contact";

export function AboutSection() {
  const phoneHref = buildTelHref(siteContent.contact.phoneTel);

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <PageContainer>
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow={siteContent.aboutText.eyebrow}
            title={siteContent.aboutText.heading}
            align="center"
            maxWidth="max-w-[720px]"
          />
        </div>

        {/* Two Columns Grid: ~58% Image / ~42% Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column (Photo: 4/3) */}
          <div className="lg:col-span-7 rounded-[8px] overflow-hidden border border-[#E1E5EB] shadow-[0_8px_24px_rgba(20,41,92,0.08)] bg-slate-100 flex">
            <ImageWithFallback
              src={images.aboutMain.src}
              srcSet={images.aboutMain.srcSet}
              sizes={images.aboutMain.sizes}
              alt={images.aboutMain.alt}
              width={images.aboutMain.width}
              height={images.aboutMain.height}
              aspectRatio="4/3"
              objectPosition={images.aboutMain.objectPosition}
              slotKey="aboutMain"
              className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px]"
            />
          </div>

          {/* Right Column (Text, Location Pill, Phone Link, Button) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-4 text-[#303746] text-[15px] sm:text-[16px] leading-relaxed">
              <p>{siteContent.aboutText.p1}</p>
              <p>{siteContent.aboutText.p2}</p>
            </div>

            <div className="flex flex-col gap-6 pt-4 border-t border-[#E1E5EB]">
              {/* Location Pill & Direct Phone Row replacing sample rating/avatars block */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F4F5F7] border border-[#E1E5EB] text-[13px] font-semibold text-[#14295C] select-none">
                  <MapPin className="w-4 h-4 text-[#1858DE]" aria-hidden="true" />
                  <span>{siteContent.aboutText.locationPill}</span>
                  <span aria-hidden="true">🇸🇦</span>
                </div>

                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 text-[#14295C] hover:text-[#1858DE] font-semibold text-[14px] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE] py-1"
                >
                  <div className="w-7 h-7 rounded-full bg-[#FFD92F] flex items-center justify-center text-[#14295C] shrink-0">
                    <Phone className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  </div>
                  <span className="tabular-nums">{siteContent.contact.phoneDisplay}</span>
                </a>
              </div>

              {/* Action Button */}
              <div>
                <Button
                  href="#services"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {siteContent.aboutText.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
