import React from "react";
import { StarRating } from "./StarRating";
import { Avatar } from "./Avatar";
import { ShieldCheck } from "lucide-react";

/**
 * Clean Testimonial Card component adhering to zero-pill and industrial aesthetic guidelines.
 */
export function TestimonialCard({ item, index, total }) {
  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      className="w-[320px] sm:w-[360px] shrink-0 bg-[#F4F5F7] border border-[#E1E5EB] rounded-[8px] p-6 flex flex-col justify-between snap-start transition-shadow hover:shadow-[0_8px_24px_rgba(20,41,92,0.08)]"
    >
      <div>
        {/* Role header with verified electrical service category */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E1E5EB]">
          <div className="flex items-center gap-1.5 text-[12px] font-semibold tracking-wider uppercase text-[#14295C]">
            <ShieldCheck className="w-4 h-4 text-[#FFD92F] fill-[#FFD92F]" />
            <span>{item.roleLabel}</span>
          </div>
          <span className="text-[11px] text-[#5B6475]">{item.roleCategory}</span>
        </div>

        {/* Stars */}
        <div className="mb-3">
          <StarRating rating={item.stars} />
        </div>

        {/* Quote text */}
        <p className="text-[#303746] text-[14px] sm:text-[15px] leading-relaxed italic mb-6">
          "{item.quote}"
        </p>
      </div>

      {/* Author information with Initials Avatar */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#E1E5EB]">
        <Avatar
          initials={item.initials}
          name={item.authorName}
          bgClass={item.avatarBg}
          size="md"
        />
        <div className="flex flex-col">
          <span className="font-bold text-[13px] uppercase tracking-wider text-[#14295C]">
            {item.authorName}
          </span>
          <span className="text-[12px] text-[#5B6475]">{item.authorRole}</span>
        </div>
      </div>
    </article>
  );
}
