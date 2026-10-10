import React, { useState } from "react";
import { Play } from "lucide-react";
import { Eyebrow } from "../ui/Eyebrow";
import { Dialog } from "../ui/Dialog";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { PageContainer } from "../layout/PageContainer";
import { siteContent, SHOW_DEMO_NOTES } from "../../data/siteContent";
import { images } from "../../data/images";

export function IntroMetricsSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section
      id="about-intro"
      aria-labelledby="intro-heading"
      className="bg-[#F4F5F7] py-16 sm:py-20 lg:py-24 border-b border-[#E1E5EB]"
    >
      <PageContainer>
        {/* Intro Top Row: 1/3 + 2/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-4">
            <Eyebrow>{siteContent.introText.eyebrow}</Eyebrow>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2
              id="intro-heading"
              className="font-display text-[#14295C] text-[clamp(1.875rem,1.4rem+1.4vw,2.75rem)] leading-[1.05] uppercase"
            >
              {siteContent.introText.heading}
            </h2>
            <p className="text-[#5B6475] text-[15px] sm:text-[16px] leading-relaxed max-w-3xl">
              {siteContent.introText.description}
            </p>
          </div>
        </div>

        {/* 1px divider rule */}
        <hr className="border-[#E1E5EB] mb-8" />

        {/* Metrics Row: 4 metrics with vertical dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E1E5EB] text-center mb-4">
          {siteContent.metrics.map((metric, idx) => (
            <div key={idx} className="p-4 sm:p-6 flex flex-col items-center justify-center">
              <span className="font-display text-[#14295C] text-[clamp(2.25rem,1.8rem+1.5vw,3rem)] leading-none mb-1">
                {metric.value}
              </span>
              <span className="text-[13px] sm:text-[14px] font-medium text-[#5B6475] uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Demo Caption */}
        {SHOW_DEMO_NOTES && (
          <p className="text-center text-[12px] text-[#5B6475] mb-12">
            {siteContent.demoNote}
          </p>
        )}

        {/* Video Thumbnail Preview */}
        <div className="relative w-full rounded-[8px] overflow-hidden aspect-[16/9] md:aspect-[5/2] border border-[#E1E5EB] shadow-[0_8px_24px_rgba(20,41,92,0.08)] group bg-[#14295C]">
          <ImageWithFallback
            src={images.videoPoster.src}
            srcSet={images.videoPoster.srcSet}
            sizes={images.videoPoster.sizes}
            alt={images.videoPoster.alt}
            width={images.videoPoster.width}
            height={images.videoPoster.height}
            objectPosition={images.videoPoster.objectPosition}
            slotKey="videoPoster"
            className="w-full h-full object-cover filter brightness-90 group-hover:scale-102 transition-transform duration-500"
          />

          {/* Dark Overlay with Centered Play Trigger Button */}
          <div className="absolute inset-0 bg-[#14295C]/25 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setVideoModalOpen(true)}
              aria-label="Play video preview"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-[8px] bg-[#1858DE] hover:bg-[#1348B8] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 focus-visible:outline-3 focus-visible:outline-[#FFD92F] cursor-pointer"
            >
              <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current ml-1" />
            </button>
          </div>
        </div>

        {/* Video Modal Preview */}
        <Dialog
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          title="Video Preview"
          maxWidth="max-w-3xl"
        >
          {siteContent.videoUrl ? (
            <video
              src={siteContent.videoUrl}
              poster={images.videoPoster.src}
              controls
              className="w-full rounded-[4px] aspect-video bg-black"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-8 px-4 gap-4 bg-[#F4F5F7] rounded-[4px]">
              <div className="w-14 h-14 rounded-full bg-[#1858DE]/20 text-[#1858DE] flex items-center justify-center">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <div>
                <h4 className="font-display text-[20px] text-[#14295C] mb-2 uppercase">
                  Demo Preview
                </h4>
                <p className="text-[14px] text-[#5B6475] max-w-md">
                  No video has been connected yet. Add a video URL in{" "}
                  <code className="text-[#14295C] font-mono font-semibold">siteContent.js</code> to link your actual corporate or project reel.
                </p>
              </div>
            </div>
          )}
        </Dialog>
      </PageContainer>
    </section>
  );
}
