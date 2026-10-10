import React from "react";
import { Star } from "lucide-react";

/**
 * StarRating component rendering accessible star icons.
 */
export function StarRating({ rating = 5, maxStars = 5, className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }).map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? "fill-[#FFD92F] text-[#FFD92F]"
              : "fill-transparent text-[#E1E5EB]"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
