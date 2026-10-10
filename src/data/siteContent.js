/**
 * Central site configuration and editable sample content for Cablejointsa.
 * Keep verified facts in central data files; placeholder contact info is clearly marked.
 */

export const SHOW_DEMO_NOTES = true;

export const siteContent = {
  brandName: "Cablejointsa",
  tagline: "Electrical Services for Homes and Businesses",
  heroEyebrow: "Electrical services you can rely on",
  heroHeading: "The smarter way to handle your electrical needs",
  heroDescription:
    "Cablejointsa provides electrical services for homes and businesses, from quick repairs to full installations, with a focus on safety, efficiency and quality workmanship.",
  
  contact: {
    phoneDisplay: "(555) 010-0199",
    phoneTel: "tel:+15550100199",
    email: "hello@example.com",
    address: "Your business address – edit in siteContent.js",
    availability: "Mon – Fri: 8:00 AM – 6:00 PM",
  },

  workingHours: [
    { day: "Mon – Fri", hours: "8:00 AM – 6:00 PM" },
    { day: "Sat", hours: "8:00 AM – 3:00 PM" },
    { day: "Sun", hours: "Closed" },
  ],

  socialLinks: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    twitter: "https://x.com",
  },

  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services", hasDropdown: true },
    { label: "Blog", href: "#blog", hasDropdown: true },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  serviceStripItems: [
    "Fast & Reliable Service",
    "Transparent Pricing",
    "Residential & Commercial Services",
    "Friendly Customer Support",
  ],

  metrics: [
    { value: "100%", label: "Satisfaction goal" },
    { value: "10+", label: "Years of experience" },
    { value: "500+", label: "Projects completed" },
    { value: "24/7", label: "Support" },
  ],

  rating: {
    score: "5.0",
    label: "Satisfied clients (sample)",
    stars: 5,
  },

  // Video preview configuration (empty by default; prompts demo preview modal)
  videoUrl: "",

  demoNote: "Sample content – replace with verified information",

  aboutText: {
    eyebrow: "About us",
    heading: "Dedicated to safe, reliable and quality electrical work",
    p1: "At Cablejointsa, we believe electrical work should be transparent, stress-free, and dependable. That is why we provide clear communication, skilled technicians, and attentive service on every project.",
    p2: "Whether you need routine troubleshooting, planned maintenance, or system improvements, our team focuses on careful execution, tidy work areas, and strict adherence to industry standards.",
  },

  introText: {
    eyebrow: "Why choose us",
    heading: "Choosing the right electrician means choosing safety, quality and reliability.",
    description:
      "We believe electrical work should be stress-free, transparent, and dependable. That's why we focus on straightforward communication, skilled technicians, and exceptional service — ensuring your electrical systems run smoothly without hidden surprises.",
  },

  finalCta: {
    heading: "Trust the pros for all your electrical needs",
    description:
      "We are committed to providing dependable services, fair pricing, and clear results. Reach out today to discuss your next residential or commercial electrical project.",
    primaryBtn: "Request a Quote",
    secondaryBtn: "Call (555) 010-0199",
  },
};
