/**
 * Central Content Architecture and Single Source of Truth for Cablejointsa.
 * Pure ESM data module without JSX or browser-specific globals so vite.config.js and node scripts can import it.
 */

export const siteContent = {
  brand: {
    name: "Cablejointsa",
    tagline: "Electrical Services for Homes and Businesses",
    siteUrl: "https://cablejointsa.vercel.app/",
  },

  // Backwards compatibility property
  brandName: "Cablejointsa",
  tagline: "Electrical Services for Homes and Businesses",

  contact: {
    phoneDisplay: "0570477234",
    phoneTel: "+966570477234",
    phoneTelHref: "tel:+966570477234",
    address: {
      district: "Malaz",
      city: "Riyadh",
      country: "Saudi Arabia",
      postalCode: "12831",
      full: "Malaz, Riyadh, Saudi Arabia 12831",
    },
    locationLabel: "Riyadh, Saudi Arabia",
    email: null,
    hours: null,
  },

  socialLinks: {
    instagram: {
      url: "https://www.instagram.com/cablejointsa/",
      label: "Instagram",
      handle: "@cablejointsa",
    },
    facebook: {
      url: "https://www.facebook.com/people/The-saif-ahmed/100065301078114/#",
      label: "Facebook",
      handle: "Cablejointsa on Facebook",
    },
  },

  safety: {
    emergencyLabel: "Saudi Civil Defense",
    emergencyNumber: "998",
  },

  forms: {
    deliveryMode: "demo", // 'demo' | 'live'
    messages: {
      demoNotice: "Online enquiries are in demo mode. For a real response, please call 0570477234.",
      demoSuccess:
        "Enquiry captured in this demonstration. No message has been sent to Cablejointsa. To reach the team, call 0570477234.",
      liveSuccess:
        "Thank you! Your enquiry has been received. Our team will review your requirements and call you back shortly.",
    },
  },

  features: {
    testimonials: true, // Toggle flag to show/hide the testimonials section and its nav references
  },

  hero: {
    eyebrow: "Electrical services in Riyadh",
    headingLine1: "Electrical work for",
    headingLine2: "homes and",
    headingLine3: "businesses",
    description:
      "Talk to Cablejointsa about wiring, repairs, installations or maintenance for your home or business. Tell us what you need and we'll discuss the next step.",
    primaryCta: "Request a Quote",
    secondaryCta: "Call 0570477234",
  },

  // Backwards compatibility keys for hero
  heroEyebrow: "Electrical services in Riyadh",
  heroHeading: "Electrical work for homes and businesses",
  heroDescription:
    "Talk to Cablejointsa about wiring, repairs, installations or maintenance for your home or business. Tell us what you need and we'll discuss the next step.",

  strips: {
    yellow: [
      "Residential & Commercial Electrical Work",
      "Installation, Repair & Maintenance",
      "Clear Communication",
      "Enquire About Your Project",
    ],
    blue: [
      "Based in Malaz, Riyadh",
      "Call 0570477234",
      "Request a Quote Online",
      "Follow Us on Instagram",
    ],
  },

  // Backwards compatibility
  serviceStripItems: [
    "Residential & Commercial Electrical Work",
    "Installation, Repair & Maintenance",
    "Clear Communication",
    "Enquire About Your Project",
  ],

  introText: {
    eyebrow: "About Cablejointsa",
    heading: "A clear, straightforward way to get electrical work done",
    description:
      "Whether it's a fault at home, work at a shop or office, or planned maintenance, start with a conversation. Call or send an enquiry describing your property and what you need, and we'll talk it through with you.",
  },

  metrics: [
    { value: "Riyadh", label: "Based in Malaz" },
    { value: "5", label: "Electrical service types" },
    { value: "2", label: "Property types: homes and businesses" },
    { value: "Direct", label: "Call or send an enquiry online" },
  ],
  metricsVerified: false,

  aboutText: {
    eyebrow: "About us",
    heading: "Electrical work with safety in mind",
    p1: "Good electrical work protects people and property. We start by understanding your space, your requirements and any concerns, so you know what to expect before work begins.",
    p2: "We work with residential and commercial customers in Riyadh. If you're not sure what to ask for, describe the problem and we'll help you work it out.",
    locationPill: "Malaz, Riyadh",
    ctaLabel: "View Electrical Services",
  },

  servicesSection: {
    eyebrow: "Our services",
    heading: "Professional electrical services for homes and businesses",
  },

  testimonialsSection: {
    eyebrow: "Customer feedback",
    heading: "What customers say",
    description:
      "Feedback from clients on residential and commercial electrical work across Riyadh.",
    ctaLabel: "Discuss Your Project",
    sampleNotice:
      "Sample reviews shown for layout. Replace with real customer feedback before promoting this site.",
  },

  contactSection: {
    eyebrow: "Contact us",
    heading: "Get in touch about your electrical work",
    formHeading: "Send an enquiry",
    formHelper:
      "Tell us about your property, the electrical work you need and your preferred timing. You can also call us directly.",
    directHeading: "Call or message us",
    directParagraph:
      "Prefer to talk? Call 0570477234, or message us on Instagram or Facebook. We're based in Malaz, Riyadh.",
  },

  finalCta: {
    heading: "Talk to Cablejointsa about your electrical work",
    description:
      "Call 0570477234 or send an enquiry with details of your property and the work you need.",
    primaryBtn: "Send an Enquiry",
    secondaryBtn: "Call 0570477234",
  },

  footer: {
    description: "Electrical services for homes and businesses in Riyadh, Saudi Arabia.",
    copyright: "Cablejointsa. All rights reserved.",
  },

  metadata: {
    title: "Cablejointsa | Electrical Services in Riyadh",
    description:
      "Electrical services for homes and businesses in Riyadh. Ask Cablejointsa about wiring, repairs, installations and maintenance, or call 0570477234.",
  },

  // Video preview configuration (empty by default; prompts demo preview modal)
  videoUrl: "",
};
