import React from "react";

/**
 * Clean initials-based avatar component.
 * Adheres strictly to design guidelines prohibiting fake stock faces.
 */
export function Avatar({
  initials,
  name,
  size = "md", // 'sm' | 'md' | 'lg'
  bgClass = "bg-[#14295C]",
  className = "",
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-[12px]",
    md: "w-10 h-10 text-[14px]",
    lg: "w-12 h-12 text-[16px]",
  }[size] || "w-10 h-10 text-[14px]";

  return (
    <div
      role="img"
      aria-label={name ? `Avatar for ${name}` : undefined}
      className={`rounded-full flex items-center justify-center font-bold text-white shrink-0 select-none shadow-sm ${bgClass} ${sizeClasses} ${className}`}
    >
      <span>{initials}</span>
    </div>
  );
}

/**
 * Overlapping Avatar stack.
 */
export function AvatarStack({ items = [], className = "" }) {
  return (
    <div className={`flex items-center -space-x-2.5 ${className}`}>
      {items.map((item, idx) => (
        <Avatar
          key={idx}
          initials={item.initials}
          name={item.name}
          bgClass={item.bgClass || (idx === 0 ? "bg-[#14295C]" : idx === 1 ? "bg-[#1858DE]" : "bg-[#1B357A]")}
          size="md"
          className="ring-2 ring-white"
        />
      ))}
    </div>
  );
}
