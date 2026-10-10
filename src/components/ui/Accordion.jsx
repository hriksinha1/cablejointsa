import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { RichText } from "./RichText";

/**
 * Accessible FAQ Accordion component with single-expand state, keyboard navigation,
 * and RichText token rendering for dynamic phone/address insertion.
 */
export function Accordion({ items, defaultOpenId = "faq-5" }) {
  const [openId, setOpenId] = useState(defaultOpenId);
  const buttonRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e, index) => {
    const total = items.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % total;
      buttonRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + total) % total;
      buttonRefs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      buttonRefs.current[total - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col border-t border-[#E1E5EB] divide-y divide-[#E1E5EB] rounded-[8px] overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const buttonId = `faq-btn-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`transition-colors ${
              isOpen ? "bg-[#1858DE]" : "bg-white hover:bg-[#F4F5F7]"
            }`}
          >
            <h3>
              <button
                id={buttonId}
                ref={(el) => (buttonRefs.current[index] = el)}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-full min-h-[58px] px-5 py-4 flex items-center justify-between text-left font-semibold text-[13px] sm:text-[14px] uppercase tracking-wider transition-colors duration-150 cursor-pointer select-none focus-visible:outline-3 ${
                  isOpen
                    ? "text-white focus-visible:outline-[#FFD92F]"
                    : "text-[#14295C] focus-visible:outline-[#1858DE]"
                }`}
              >
                <span className="pr-4 leading-snug">{item.question}</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "bg-white text-[#1858DE] rotate-180"
                      : "bg-[#F4F5F7] text-[#14295C]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`px-5 pb-5 pt-1 text-[14px] sm:text-[15px] leading-relaxed ${
                isOpen ? "text-white" : "text-[#5B6475]"
              } ${prefersReducedMotion ? "" : "transition-all duration-200"}`}
            >
              {typeof item.answer === "string" ? (
                <RichText
                  text={item.answer}
                  className={isOpen ? "[&_a]:text-[#FFD92F] [&_a]:underline [&_strong]:text-white" : ""}
                />
              ) : (
                item.answer
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
