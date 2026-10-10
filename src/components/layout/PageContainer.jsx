import React from "react";

/**
 * Standard content container enforcing 1240px max width and responsive gutters.
 */
export function PageContainer({ children, className = "", as: Component = "div", ...props }) {
  return (
    <Component
      className={`w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
