import React, { useState, useEffect, useRef } from "react";
import { Zap } from "lucide-react";

/**
 * Image wrapper with layout reservation, loading state management, and branded fallback.
 * Renders an aspect-ratio container with an absolute-positioned <img> layer,
 * ensuring zero layout shift across loading, loaded, and fallback states.
 */
export function ImageWithFallback({
  src,
  srcSet,
  sizes,
  alt = "",
  width,
  height,
  aspectRatio,
  objectFit = "cover",
  objectPosition = "center",
  loading = "lazy",
  fetchPriority,
  className = "",
  containerClassName = "",
  slotKey = "",
  decorative = false,
}) {
  const [status, setStatus] = useState(src ? "loading" : "error"); // 'loading' | 'loaded' | 'error'
  const imgRef = useRef(null);

  // Reset state whenever src changes so new images can load cleanly
  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }
    setStatus("loading");
  }, [src]);

  // Check if image already cached/completed before handler attached on mount
  useEffect(() => {
    if (imgRef.current && status === "loading") {
      if (imgRef.current.complete) {
        if (imgRef.current.naturalWidth > 0) {
          setStatus("loaded");
        } else {
          setStatus("error");
          if (import.meta.env.DEV) {
            console.warn(`[ImageWithFallback] Image failed on mount: ${slotKey || src}`);
          }
        }
      }
    }
  }, [src, status, slotKey]);

  const handleError = () => {
    setStatus("error");
    if (import.meta.env.DEV) {
      console.warn(`[ImageWithFallback] Image failed to load: ${slotKey || src}`);
    }
  };

  const handleLoad = () => {
    setStatus("loaded");
  };

  const computedAspectRatio = aspectRatio || (width && height ? `${width}/${height}` : undefined);

  return (
    <div
      data-image-state={status}
      data-slot={slotKey || undefined}
      className={`relative overflow-hidden ${containerClassName} ${className}`}
      style={{
        aspectRatio: computedAspectRatio,
      }}
    >
      {status === "error" ? (
        <div
          role={decorative ? "presentation" : "img"}
          aria-label={decorative ? undefined : (alt || slotKey || "Cablejointsa electrical visual")}
          aria-hidden={decorative ? "true" : undefined}
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#14295C] via-[#1B357A] to-[#0D1B3E] select-none p-4 text-center z-10"
        >
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #FFD92F 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative flex flex-col items-center justify-center gap-2 z-10">
            <div className="w-10 h-10 rounded-full bg-[#1858DE]/30 border border-[#FFD92F]/40 flex items-center justify-center text-[#FFD92F]">
              <Zap className="w-5 h-5 fill-[#FFD92F]" />
            </div>
            <span className="font-display text-white/80 text-[14px] tracking-wider uppercase">
              Cablejointsa
            </span>
            {import.meta.env.DEV && slotKey && (
              <span className="text-[10px] text-[#FFD92F]/80 font-mono">
                Image failed: {slotKey}
              </span>
            )}
          </div>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={decorative ? "" : alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding={loading === "eager" ? "sync" : "async"}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit,
            objectPosition,
          }}
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
