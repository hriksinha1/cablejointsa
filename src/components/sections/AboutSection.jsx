import React from "react";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { StarRating } from "../ui/StarRating";
import { AvatarStack } from "../ui/Avatar";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { siteContent, SHOW_DEMO_NOTES } from "../../data/siteContent";
import { images } from "../../data/images";

export function AboutSection() {
  const sampleAvatars = [
    { initials: "JD", name: "Client JD", bgClass: "bg-[#14295C]" },
    { initials: "MK", name: "Client MK", bgClass: "bg-[#1858DE]" },
    { initials: "AL", name: "Client AL", bgClass: "bg-[#1B357A]" },
  ];

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
              src={images.aboutMain.url}
              alt={images.aboutMain.alt}
              width={images.aboutMain.width}
              height={images.aboutMain.height}
              aspectRatio="4/3"
              objectPosition={images.aboutMain.objectPosition}
              className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px]"
            />
          </div>

          {/* Right Column (Text, Rating Stack, Button) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-4 text-[#303746] text-[15px] sm:text-[16px] leading-relaxed">
              <p>{siteContent.aboutText.p1}</p>
              <p>{siteContent.aboutText.p2}</p>
            </div>

            <div className="flex flex-col gap-6 pt-4 border-t border-[#E1E5EB]">
              {/* Rating + Avatar Stack Block */}
              <div className="flex flex-wrap items-center gap-4">
                <AvatarStack items={sampleAvatars} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-[22px] text-[#14295C] leading-none">
                      {siteContent.rating.score}
                    </span>
                    <StarRating rating={siteContent.rating.stars} />
                  </div>
                  <span className="text-[12px] text-[#5B6475]">
                    {siteContent.rating.label}
                  </span>
                </div>
              </div>

              {SHOW_DEMO_NOTES && (
                <span className="text-[11px] text-[#5B6475] italic -mt-3">
                  {siteContent.demoNote}
                </span>
              )}

              {/* Action Button */}
              <div>
                <Button
                  href="#services"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
