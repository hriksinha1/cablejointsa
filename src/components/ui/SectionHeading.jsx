import React from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Standard section heading with Eyebrow and Bebas Neue H2.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = "left", // 'left' | 'center'
  variant = "default", // 'default' | 'on-navy'
  className = "",
  maxWidth = "max-w-[760px]",
}) {
  const isNavy = variant === "on-navy";
  const alignClasses =
    align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClasses} ${maxWidth} ${className}`}>
      {eyebrow && <Eyebrow variant={variant}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-[clamp(1.875rem,1.4rem+1.4vw,2.75rem)] leading-[1.05] tracking-[0.02em] uppercase ${
          isNavy ? "text-white" : "text-[#14295C]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
