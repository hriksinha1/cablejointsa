import React from "react";

/**
 * Standard Design System Button component.
 * Renders an <a> tag when href is provided, or <button> otherwise.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary", // 'primary' | 'secondary' | 'outline' | 'outline-white'
  size = "md", // 'sm' | 'md' | 'lg'
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
  target,
  rel,
  ...rest
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold text-[14px] leading-tight uppercase tracking-wider rounded-[4px] transition-colors duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "min-h-[38px] px-4 py-2 text-[13px]",
    md: "min-h-[44px] px-6 py-2.5 text-[14px]",
    lg: "min-h-[48px] px-8 py-3 text-[15px]",
  }[size] || "min-h-[44px] px-6 py-2.5 text-[14px]";

  const variantClasses = {
    primary:
      "bg-[#FFD92F] text-[#14295C] hover:bg-[#F2C814] active:bg-[#e0b70d] focus-visible:outline-3 focus-visible:outline-[#1858DE] focus-visible:outline-offset-2",
    secondary:
      "bg-[#1858DE] text-white hover:bg-[#1348B8] active:bg-[#0f3ba1] focus-visible:outline-3 focus-visible:outline-[#FFD92F] focus-visible:outline-offset-2",
    outline:
      "bg-transparent border border-[#14295C]/30 text-[#14295C] hover:bg-[#14295C]/5 focus-visible:outline-3 focus-visible:outline-[#1858DE] focus-visible:outline-offset-2",
    "outline-white":
      "bg-transparent border border-white/40 text-white hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-[#FFD92F] focus-visible:outline-offset-2",
  }[variant] || "";

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
}
