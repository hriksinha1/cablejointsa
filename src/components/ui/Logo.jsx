import React from "react";

/**
 * Branded Logo component for Cablejointsa.
 * Features a navy rounded square with a yellow lightning bolt and Bebas Neue wordmark.
 */
export function Logo({ variant = "default", className = "" }) {
  const isLight = variant === "light" || variant === "on-navy";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Icon Mark */}
      <div className="relative w-9 h-9 rounded-[8px] bg-[#14295C] border border-[#FFD92F]/40 flex items-center justify-center shrink-0 shadow-sm">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-[#FFD92F] stroke-[#FFD92F]"
          strokeWidth="1"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
        </svg>
      </div>

      {/* Wordmark */}
      <span
        className={`font-display text-[26px] leading-none tracking-[0.03em] ${
          isLight ? "text-white" : "text-[#14295C]"
        }`}
      >
        Cablejointsa
      </span>
    </div>
  );
}
