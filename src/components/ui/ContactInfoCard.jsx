import React from "react";

/**
 * Information tile for company contact credentials.
 */
export function ContactInfoCard({
  icon: Icon,
  label,
  value,
  href,
  ariaLabel,
}) {
  const content = (
    <div className="bg-white border border-[#E1E5EB] rounded-[8px] p-5 flex items-start gap-4 h-full shadow-[0_1px_2px_rgba(20,41,92,0.06)] hover:border-[#14295C]/30 transition-colors">
      <div className="w-10 h-10 rounded-full bg-[#FFD92F] text-[#14295C] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#5B6475] mb-1">
          {label}
        </span>
        <span className="text-[13px] sm:text-[14px] font-semibold text-[#14295C] break-words">
          {value}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block focus-visible:outline-3 focus-visible:outline-[#1858DE] focus-visible:outline-offset-2 rounded-[8px]"
        aria-label={ariaLabel || `${label}: ${value}`}
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
