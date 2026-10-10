import React from "react";

/**
 * Small outlined uppercase eyebrow badge.
 */
export function Eyebrow({ children, variant = "default", className = "" }) {
  const isNavyBg = variant === "on-navy" || variant === "white";

  const colorStyles = isNavyBg
    ? "border border-white/30 text-white bg-transparent"
    : "border border-[#14295C]/30 text-[#14295C] bg-transparent";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[12px] font-semibold tracking-wider uppercase rounded-[4px] select-none ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
}
