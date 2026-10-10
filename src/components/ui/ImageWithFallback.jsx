import React, { useState } from "react";
import { Zap } from "lucide-react";

/**
 * Image wrapper with zero layout shift, loading priority, and branded fallback.
 */
export function ImageWithFallback({
  src,
  alt = "",
  width,
  height,
  aspectRatio,
  objectFit = "cover",
  objectPosition = "center",
  loading = "lazy",
  fetchPriority,
  className = "",
  sizes,
  containerClassName = "",
}) {
  const [hasError, setHasError] = useState(!src);

  // If no src or failed to load, display deliberate branded industrial fallback
  if (hasError || !src) {
    return (
      <div
        role={alt ? "img" : "presentation"}
        aria-label={alt || undefined}
        className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#14295C] via-[#1B357A] to-[#0D1B3E] ${containerClassName} ${className}`}
        style={{
          aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "auto",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #FFD92F 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex flex-col items-center justify-center gap-2 p-4 text-center z-10">
          <div className="w-12 h-12 rounded-full bg-[#1858DE]/30 border border-[#FFD92F]/40 flex items-center justify-center text-[#FFD92F]">
            <Zap className="w-6 h-6 fill-[#FFD92F]" />
          </div>
          <span className="font-display text-white/80 text-[16px] tracking-wider uppercase">
            Cablejointsa
          </span>
          {alt && (
            <span className="text-[12px] text-white/60 max-w-[200px] line-clamp-2">
              {alt}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={sizes}
      onError={() => setHasError(true)}
      style={{
        objectFit,
        objectPosition,
        aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
      }}
      className={`block w-full h-auto transition-opacity duration-300 ${className}`}
    />
  );
}
