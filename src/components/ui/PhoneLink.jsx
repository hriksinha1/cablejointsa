import React from "react";
import { Phone } from "lucide-react";
import { siteContent } from "../../data/siteContent";
import { buildTelHref } from "../../utils/contact";

/**
 * Standard PhoneLink component ensuring consistent click-to-call URLs across the app.
 * Href is always derived from siteContent.contact.phoneTel.
 */
export function PhoneLink({
  variant = "text", // 'text' | 'icon-button' | 'button' | 'pill'
  children,
  className = "",
  showIcon = false,
  ariaLabel,
}) {
  const { phoneDisplay, phoneTel } = siteContent.contact;
  const href = buildTelHref(phoneTel);
  const accessibleLabel = ariaLabel || `Call ${phoneDisplay}`;

  if (variant === "icon-button") {
    return (
      <a
        href={href}
        aria-label={accessibleLabel}
        className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#FFD92F] hover:bg-[#F2C814] text-[#14295C] flex items-center justify-center transition-colors shadow-sm focus-visible:outline-3 focus-visible:outline-[#1858DE] ${className}`}
      >
        <Phone className="w-5 h-5 fill-current" aria-hidden="true" />
      </a>
    );
  }

  if (variant === "button") {
    return (
      <a
        href={href}
        aria-label={accessibleLabel}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-[4px] font-semibold text-[14px] bg-[#1858DE] hover:bg-[#1348B8] text-white transition-colors focus-visible:outline-3 focus-visible:outline-[#FFD92F] whitespace-nowrap ${className}`}
      >
        {showIcon && <Phone className="w-4 h-4 fill-current shrink-0" aria-hidden="true" />}
        <span>{children || `Call ${phoneDisplay}`}</span>
      </a>
    );
  }

  if (variant === "pill") {
    return (
      <a
        href={href}
        aria-label={accessibleLabel}
        className={`inline-flex items-center gap-2 px-3 py-1.5 min-h-[44px] rounded-full bg-[#F4F5F7] hover:bg-[#E1E5EB] text-[#14295C] font-semibold text-[13px] sm:text-[14px] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE] whitespace-nowrap ${className}`}
      >
        <div className="w-7 h-7 rounded-full bg-[#FFD92F] flex items-center justify-center text-[#14295C] shrink-0">
          <Phone className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
        </div>
        <span className="tabular-nums">{children || phoneDisplay}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      aria-label={accessibleLabel}
      className={`inline-flex items-center gap-1.5 text-[#14295C] hover:text-[#1858DE] transition-colors font-semibold focus-visible:outline-3 focus-visible:outline-[#1858DE] whitespace-nowrap min-h-[44px] py-2 ${className}`}
    >
      {showIcon && <Phone className="w-4 h-4 fill-current shrink-0 text-[#1858DE]" aria-hidden="true" />}
      <span className="tabular-nums">{children || phoneDisplay}</span>
    </a>
  );
}
