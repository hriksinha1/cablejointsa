import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import { siteContent } from "../../data/siteContent";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * 8-point asterisk separator icon matching reference visual.
 */
function StarBurst({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 fill-current ${className}`}
      aria-hidden="true"
    >
      <path d="M12 0L14 8.5L22.5 6.5L16.5 12L22.5 17.5L14 15.5L12 24L10 15.5L1.5 17.5L7.5 12L1.5 6.5L10 8.5L12 0Z" />
    </svg>
  );
}

export function ServiceStrip({
  variant = "yellow", // 'yellow' | 'blue'
  reverse = false,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const items = siteContent.serviceStripItems;

  const isBlue = variant === "blue";
  const bgClass = isBlue ? "bg-[#1858DE]" : "bg-[#FFD92F]";
  const textClass = isBlue ? "text-white" : "text-[#14295C]";
  const starClass = isBlue ? "text-[#FFD92F]" : "text-[#14295C]";

  const renderGroup = (isDuplicate = false) => (
    <div
      className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10"
      aria-hidden={isDuplicate ? "true" : undefined}
    >
      {items.map((item, idx) => (
        <React.Fragment key={`${item}-${idx}`}>
          <span className="font-display text-[18px] sm:text-[22px] tracking-[0.06em] uppercase whitespace-nowrap">
            {item}
          </span>
          <StarBurst className={starClass} />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <aside
      aria-label="Key Service Highlights"
      className={`relative w-full overflow-hidden h-[48px] sm:h-[60px] flex items-center select-none ${bgClass} ${textClass}`}
    >
      <div
        className="marquee-container w-full h-full flex items-center overflow-hidden"
        data-paused={isPaused ? "true" : "false"}
      >
        <div
          className={
            reverse && !prefersReducedMotion
              ? "animate-marquee-reverse flex items-center"
              : "animate-marquee flex items-center"
          }
        >
          {renderGroup(false)}
          {!prefersReducedMotion && (
            <div className="marquee-duplicate flex items-center">
              {renderGroup(true)}
            </div>
          )}
        </div>
      </div>

      {/* Accessibility Pause / Play Toggle Button */}
      {!prefersReducedMotion && (
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-pressed={isPaused}
          aria-label={isPaused ? "Resume ticker animation" : "Pause ticker animation"}
          className={`absolute right-2 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-3 ${
            isBlue
              ? "bg-white/10 text-white focus-visible:outline-[#FFD92F]"
              : "bg-[#14295C]/10 text-[#14295C] focus-visible:outline-[#1858DE]"
          }`}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
        </button>
      )}
    </aside>
  );
}
