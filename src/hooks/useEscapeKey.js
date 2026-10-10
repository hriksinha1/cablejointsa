import { useEffect } from "react";

/**
 * Hook to trigger a callback when the Escape key is pressed.
 * @param {Function} handler
 * @param {boolean} active
 */
export function useEscapeKey(handler, active = true) {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handler, active]);
}
