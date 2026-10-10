import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

/**
 * Accessible Modal Dialog component.
 * Uses native dialog patterns with backdrop, focus trapping and Escape handling.
 */
export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}) {
  const dialogRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEscapeKey(onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      dialogRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (previouslyFocusedElement.current && previouslyFocusedElement.current.focus) {
        previouslyFocusedElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#14295C]/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`w-full ${maxWidth} bg-white rounded-[8px] shadow-2xl border border-[#E1E5EB] overflow-hidden flex flex-col max-h-[90vh] focus:outline-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1E5EB] bg-[#F4F5F7]">
          <h3
            id="dialog-title"
            className="font-display text-[22px] tracking-wide text-[#14295C] uppercase"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-[4px] flex items-center justify-center text-[#5B6475] hover:text-[#14295C] hover:bg-white transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto text-[#303746] text-[15px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
