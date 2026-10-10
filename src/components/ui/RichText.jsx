import React from "react";
import { siteContent } from "../../data/siteContent";
import { services } from "../../data/services";
import { PhoneLink } from "./PhoneLink";

/**
 * RichText token replacement component.
 * Replaces tokens in copy strings without dangerouslySetInnerHTML:
 *  - {{phone}}: Clickable PhoneLink
 *  - {{address}}: Full physical address text
 *  - {{location}}: City & country text (e.g. Riyadh, Saudi Arabia)
 *  - {{services}}: Comma-separated list of service titles
 *  - {{emergency}}: Emergency dispatch contact string
 */
export function RichText({ text, className = "" }) {
  if (!text) return null;

  // Split text by tokens: {{phone}}, {{address}}, {{location}}, {{services}}, {{emergency}}
  const tokenRegex = /(\{\{phone\}\}|\{\{address\}\}|\{\{location\}\}|\{\{services\}\}|\{\{emergency\}\})/g;
  const parts = text.split(tokenRegex);

  const servicesListString = services.map((s) => s.title.toLowerCase().replace(" services", "")).join(", ");
  const emergencyString = `${siteContent.safety.emergencyLabel} on ${siteContent.safety.emergencyNumber}`;

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part === "{{phone}}") {
          return (
            <PhoneLink
              key={index}
              variant="text"
              className="inline text-[#1858DE] underline hover:text-[#1348B8] font-medium py-0 min-h-0"
            />
          );
        }
        if (part === "{{address}}") {
          return <span key={index}>{siteContent.contact.address.full}</span>;
        }
        if (part === "{{location}}") {
          return <span key={index}>{siteContent.contact.locationLabel}</span>;
        }
        if (part === "{{services}}") {
          return <span key={index}>{servicesListString}</span>;
        }
        if (part === "{{emergency}}") {
          return (
            <strong key={index} className="text-[#14295C] font-semibold">
              {emergencyString}
            </strong>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
