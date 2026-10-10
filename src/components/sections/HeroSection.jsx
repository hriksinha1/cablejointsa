import React from "react";
import { Phone, Zap, Wrench, Shield } from "lucide-react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { SocialLinks } from "../ui/SocialLinks";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { siteContent } from "../../data/siteContent";
import { images } from "../../data/images";
import { buildTelHref } from "../../utils/contact";

export function HeroSection() {
  const phoneHref = buildTelHref(siteContent.contact.phoneTel);

  return (
    <section id="home" className="relative pt-6 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (Content, ~55%) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
            <Eyebrow>
              <span>{siteContent.hero.eyebrow}</span>
              <span aria-hidden="true" className="ml-1.5 select-none">
                🇸🇦
              </span>
            </Eyebrow>

            <h1 className="font-display text-[#14295C] text-[clamp(2.5rem,1.8rem+2.8vw,4.5rem)] leading-[1.0] tracking-[0.02em] uppercase">
              <span className="block">{siteContent.hero.headingLine1}</span>
              <span className="block">{siteContent.hero.headingLine2}</span>
              <span className="block text-[#1858DE]">{siteContent.hero.headingLine3}</span>
            </h1>

            <p className="text-[#303746] text-[15px] sm:text-[16px] leading-relaxed max-w-[52ch]">
              {siteContent.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Button href="#contact" variant="primary" size="lg" className="w-full sm:w-auto">
                {siteContent.hero.primaryCta}
              </Button>
              <Button href={phoneHref} variant="secondary" size="lg" className="w-full sm:w-auto">
                {siteContent.hero.secondaryCta}
              </Button>
            </div>

            {/* Direct Phone & Social Links Row */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E1E5EB] w-full mt-2">
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 text-[#14295C] font-semibold text-[14px] hover:text-[#1858DE] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[44px]"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFD92F] flex items-center justify-center text-[#14295C] shrink-0">
                  <Phone className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                </div>
                <span className="tabular-nums whitespace-nowrap">{siteContent.contact.phoneDisplay}</span>
              </a>

              <div className="h-4 w-[1px] bg-[#E1E5EB] hidden sm:block" />

              {/* Instagram & Facebook verified links */}
              <SocialLinks variant="hero" />
            </div>
          </div>

          {/* Right Column (Hero Composition, ~45%) */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] lg:max-w-none aspect-[4/5] min-h-[420px] sm:min-h-[500px]">
              {/* (1) Backdrop Panel Image: upper 65% with cool tones */}
              <div className="absolute top-0 right-0 w-[90%] h-[70%] rounded-[8px] overflow-hidden shadow-[0_8px_24px_rgba(20,41,92,0.08)] border border-[#E1E5EB]">
                <ImageWithFallback
                  src={images.heroBackdrop.src}
                  srcSet={images.heroBackdrop.srcSet}
                  sizes={images.heroBackdrop.sizes}
                  alt={images.heroBackdrop.alt}
                  width={images.heroBackdrop.width}
                  height={images.heroBackdrop.height}
                  objectPosition={images.heroBackdrop.objectPosition}
                  loading="eager"
                  fetchPriority="auto"
                  slotKey="heroBackdrop"
                  decorative={true}
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-[#14295C]/20 pointer-events-none" />
              </div>

              {/* (2) Electric Blue Accent Solid Block offset bottom-right */}
              <div
                className="absolute bottom-2 right-2 sm:bottom-0 sm:right-0 w-[80%] h-[60%] rounded-[8px] bg-[#1858DE] -z-10 shadow-lg"
                aria-hidden="true"
              />

              {/* (3) Foreground Portrait: Electrician in hard hat and vest */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-[82%] h-[82%] rounded-[8px] overflow-hidden shadow-2xl border-2 border-white bg-slate-100">
                <ImageWithFallback
                  src={images.heroPortrait.src}
                  srcSet={images.heroPortrait.srcSet}
                  sizes={images.heroPortrait.sizes}
                  alt={images.heroPortrait.alt}
                  width={images.heroPortrait.width}
                  height={images.heroPortrait.height}
                  objectPosition={images.heroPortrait.objectPosition}
                  loading="eager"
                  fetchPriority="high"
                  slotKey="heroPortrait"
                  decorative={false}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* (4) Floating Label Chips */}
              <div className="absolute top-8 left-0 sm:left-2 bg-white/95 backdrop-blur-xs border border-[#E1E5EB] rounded-[4px] px-3 py-1.5 shadow-[0_2px_8px_rgba(20,41,92,0.12)] flex items-center gap-2 select-none z-20">
                <div className="w-5 h-5 rounded-[4px] bg-[#14295C] text-[#FFD92F] flex items-center justify-center">
                  <Shield className="w-3 h-3 fill-current" />
                </div>
                <span className="font-semibold text-[11px] sm:text-[12px] uppercase tracking-wider text-[#14295C]">
                  Electrician
                </span>
              </div>

              <div className="absolute top-1/3 -right-2 sm:right-2 bg-white/95 backdrop-blur-xs border border-[#E1E5EB] rounded-[4px] px-3 py-1.5 shadow-[0_2px_8px_rgba(20,41,92,0.12)] flex items-center gap-2 select-none z-20">
                <div className="w-5 h-5 rounded-[4px] bg-[#14295C] text-[#FFD92F] flex items-center justify-center">
                  <Zap className="w-3 h-3 fill-current" />
                </div>
                <span className="font-semibold text-[11px] sm:text-[12px] uppercase tracking-wider text-[#14295C]">
                  Electrical Panel
                </span>
              </div>

              <div className="absolute bottom-1 left-2 sm:bottom-2 sm:left-2 bg-white/95 backdrop-blur-xs border border-[#E1E5EB] rounded-[4px] px-3 py-1.5 shadow-[0_2px_8px_rgba(20,41,92,0.12)] flex items-center gap-2 select-none z-20">
                <div className="w-5 h-5 rounded-[4px] bg-[#14295C] text-[#FFD92F] flex items-center justify-center">
                  <Wrench className="w-3 h-3" />
                </div>
                <span className="font-semibold text-[11px] sm:text-[12px] uppercase tracking-wider text-[#14295C]">
                  Electrical Repairs
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
