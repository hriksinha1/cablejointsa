import React from "react";
import { ExternalLink } from "lucide-react";

/**
 * Information tile for company contact credentials.
 * Supports primary click-to-call/navigation and secondary external links (e.g. Google Maps).
 */
export function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  secondaryLink,
  ariaLabel,
  className = "",
  flagEmoji = false,
}) {
  return (
    <div
      className={`bg-white border border-[#E1E5EB] rounded-[8px] p-5 flex items-start gap-4 h-full shadow-[0_1px_2px_rgba(20,41,92,0.06)] hover:border-[#14295C]/30 transition-colors ${className}`}
    >
      <div className="w-10 h-10 min-w-[40px] rounded-full bg-[#FFD92F] text-[#14295C] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#5B6475] mb-1">
          {label}
        </span>

        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel || `${label}: ${value}`}
            className="text-[13px] sm:text-[14px] font-semibold text-[#14295C] hover:text-[#1858DE] transition-colors break-words focus-visible:outline-3 focus-visible:outline-[#1858DE] rounded-[2px]"
          >
            <span>{value}</span>
            {flagEmoji && (
              <span aria-hidden="true" className="ml-1.5 select-none">
                🇸🇦
              </span>
            )}
          </a>
        ) : (
          <span className="text-[13px] sm:text-[14px] font-semibold text-[#14295C] break-words">
            <span>{value}</span>
            {flagEmoji && (
              <span aria-hidden="true" className="ml-1.5 select-none">
                🇸🇦
              </span>
            )}
          </span>
        )}

        {secondaryLink && (
          <div className="mt-2 pt-2 border-t border-[#E1E5EB]/60">
            <a
              href={secondaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1858DE] hover:text-[#1348B8] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE] rounded-[2px]"
            >
              <span>{secondaryLink.text}</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
