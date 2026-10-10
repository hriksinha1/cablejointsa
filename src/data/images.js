/**
 * Centralized image configuration for Cablejointsa.
 * Each slot defines URL, alt text, dimensions, and object positioning.
 * ImageWithFallback ensures graceful rendering with branded fallback if any fails.
 */

export const images = {
  // Hero section backdrop: industrial switchgear / breaker equipment with cool tones
  heroBackdrop: {
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    alt: "",
    width: 1200,
    height: 800,
    objectPosition: "center right",
    comment: "Industrial electrical panel and switchgear backdrop",
  },

  // Hero section foreground portrait: electrician with hard hat and hi-vis vest
  heroPortrait: {
    url: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80",
    alt: "Professional electrician wearing safety hard hat and high visibility vest",
    width: 800,
    height: 1000,
    objectPosition: "top center",
    comment: "Hero foreground portrait of technician",
  },

  // Company intro video thumbnail: electrician at a control panel (5:2 ratio)
  videoPoster: {
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80",
    alt: "Electrician working at a building main breaker panel",
    width: 1400,
    height: 560,
    objectPosition: "center 40%",
    comment: "Wide video poster of electrician at electrical panel",
  },

  // About section main photo: technician with safety glasses wiring a junction box (4:3 ratio)
  aboutMain: {
    url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
    alt: "Electrician with protective safety glasses carefully inspecting wiring",
    width: 900,
    height: 675,
    objectPosition: "center center",
    comment: "Electrician wiring and testing connections",
  },

  // Service 1: Residential electrical installation
  service1: {
    url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    alt: "Electrician installing wiring for a residential property",
    width: 800,
    height: 1000,
    objectPosition: "center center",
    comment: "Residential electrical service work",
  },

  // Service 2: Commercial electrical switchboard / infrastructure
  service2: {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    alt: "Commercial building electrical distribution and infrastructure racks",
    width: 800,
    height: 1000,
    objectPosition: "center center",
    comment: "Commercial electrical distribution room",
  },

  // Service 3: Electrical repair and maintenance with diagnostic tools
  service3: {
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    alt: "Technician conducting diagnostics and repair on a circuit breaker box",
    width: 800,
    height: 1000,
    objectPosition: "center center",
    comment: "Electrical repair and circuit troubleshooting",
  },

  // Service 4: Wiring and rewiring, cabling runs
  service4: {
    url: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=800&q=80",
    alt: "Organized multi-colored electrical wiring bundles and conduits",
    width: 800,
    height: 1000,
    objectPosition: "center center",
    comment: "Electrical wiring and cabling runs",
  },

  // Service 5: Safety inspection at an electrical panel
  service5: {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    alt: "Electrical technician performing a safety evaluation at a panel",
    width: 800,
    height: 1000,
    objectPosition: "center center",
    comment: "Safety inspection and compliance audit",
  },

  // FAQ section photo: technician with safety glasses and cables
  faqImage: {
    url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
    alt: "Electrician holding testing leads beside an open circuit box",
    width: 900,
    height: 675,
    objectPosition: "center center",
    comment: "Close-up of technician with electrical wires",
  },

  // Blog Article 1: Home electrical safety habits
  article1: {
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
    alt: "Household electrical circuit panel maintenance",
    width: 900,
    height: 600,
    objectPosition: "center center",
    comment: "Home electrical safety",
  },

  // Blog Article 2: Electrical maintenance
  article2: {
    url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=900&q=80",
    alt: "Technicians inspecting electrical installation for preventative maintenance",
    width: 900,
    height: 600,
    objectPosition: "center center",
    comment: "Preventative electrical maintenance",
  },

  // Blog Article 3: Warning signs that need professional diagnostics
  article3: {
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    alt: "Electrical conduits and switches requiring diagnostic inspection",
    width: 900,
    height: 600,
    objectPosition: "center center",
    comment: "Electrical troubleshooting and warning signs",
  },

  // Final CTA banner: industrial electrician in work setting
  ctaBackground: {
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80",
    alt: "",
    width: 1600,
    height: 700,
    objectPosition: "center center",
    comment: "Industrial power setting for final call to action banner",
  },
};
