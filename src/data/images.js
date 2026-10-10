/**
 * Centralized Image Registry for Cablejointsa.
 * Single source of truth for all imagery across the landing page.
 * All assets are locally hosted, verified for authentic electrical subject matter,
 * and optimized into WebP format with responsive srcset definitions.
 */

const BASE = (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";

export const images = {
  // Hero section backdrop: industrial switchgear / breaker equipment with cool tones
  heroBackdrop: {
    src: `${BASE}images/hero/hero-backdrop-1600.webp`,
    srcSet: `${BASE}images/hero/hero-backdrop-800.webp 800w, ${BASE}images/hero/hero-backdrop-1200.webp 1200w, ${BASE}images/hero/hero-backdrop-1600.webp 1600w`,
    alt: "",
    decorative: true,
    width: 1600,
    height: 1000,
    aspectRatio: "16/10",
    objectPosition: "center right",
    loading: "eager",
    fetchPriority: "auto",
    sizes: "(max-width: 1024px) 100vw, 50vw",
    credit: {
      photographer: "Tyne & Wear Archives & Museums",
      sourcePage: "https://commons.wikimedia.org/wiki/File:TWAM_Ref-_TWCMS-M4424_(21613295362).jpg",
      license: "Public Domain / No restrictions",
    },
    comment: "Industrial electrical panel and switchgear backdrop",
  },

  // Hero section foreground portrait: electrician with hard hat and safety workwear
  heroPortrait: {
    src: `${BASE}images/hero/hero-portrait-1200.webp`,
    srcSet: `${BASE}images/hero/hero-portrait-480.webp 480w, ${BASE}images/hero/hero-portrait-800.webp 800w, ${BASE}images/hero/hero-portrait-1200.webp 1200w`,
    alt: "Professional electrician wearing safety hard hat and high visibility vest",
    decorative: false,
    width: 1200,
    height: 1500,
    aspectRatio: "4/5",
    objectPosition: "top center",
    loading: "eager",
    fetchPriority: "high",
    sizes: "(max-width: 640px) 90vw, (max-width: 1024px) 450px, 500px",
    credit: {
      photographer: "Sacbee233",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Electrical_OSHA_required_gear.jpg",
      license: "CC0 1.0 Universal Public Domain",
    },
    comment: "Hero foreground portrait of qualified electrician",
  },

  // Company intro video thumbnail: electrician at a control panel (5:2 ratio)
  videoPoster: {
    src: `${BASE}images/about/video-poster-1400.webp`,
    srcSet: `${BASE}images/about/video-poster-800.webp 800w, ${BASE}images/about/video-poster-1400.webp 1400w`,
    alt: "Electrician connecting service panel wiring at residential installation",
    decorative: false,
    width: 1400,
    height: 560,
    aspectRatio: "5/2",
    objectPosition: "center 40%",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 768px) 100vw, 1200px",
    credit: {
      photographer: "Editor B",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Electrician_Working.jpg",
      license: "CC BY 2.0",
    },
    comment: "Wide video poster of electrician at electrical panel",
  },

  // About section main photo: technician with safety glasses wiring a junction box (4:3 ratio)
  aboutMain: {
    src: `${BASE}images/about/about-main-1200.webp`,
    srcSet: `${BASE}images/about/about-main-800.webp 800w, ${BASE}images/about/about-main-1200.webp 1200w`,
    alt: "Master electrician with protective safety glasses inspecting control panel wiring",
    decorative: false,
    width: 1200,
    height: 900,
    aspectRatio: "4/3",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 1024px) 100vw, 58vw",
    credit: {
      photographer: "PEO ACWA",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Pueblo_Chemical_Agent-Destruction_Pilot_Plant_Chiller_Water_System_(9609814918).jpg",
      license: "CC BY 2.0",
    },
    comment: "Electrician wiring and testing connections",
  },

  // Service 1: Residential electrical installation
  service1: {
    src: `${BASE}images/services/service-residential-1000.webp`,
    srcSet: `${BASE}images/services/service-residential-600.webp 600w, ${BASE}images/services/service-residential-1000.webp 1000w`,
    alt: "Electrician installing new residential electrical meter socket and service connection",
    decorative: false,
    width: 1000,
    height: 1250,
    aspectRatio: "4/5",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 768px) 100vw, 400px",
    credit: {
      photographer: "Team Massachusetts 4D Home",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Electrician_Mike_Hughes_Installing_Meter_Base.jpg",
      license: "CC BY 2.0",
    },
    comment: "Residential electrical service work",
  },

  // Service 2: Commercial electrical switchboard / infrastructure
  service2: {
    src: `${BASE}images/services/service-commercial-1000.webp`,
    srcSet: `${BASE}images/services/service-commercial-600.webp 600w, ${BASE}images/services/service-commercial-1000.webp 1000w`,
    alt: "Commercial three-phase distribution switchboard and circuit breakers",
    decorative: false,
    width: 1000,
    height: 1250,
    aspectRatio: "4/5",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 768px) 100vw, 400px",
    credit: {
      photographer: "ArnoldR",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Switchboard_1_TMW.agr.jpg",
      license: "CC BY-SA 4.0",
    },
    comment: "Commercial electrical distribution room",
  },

  // Service 3: Electrical repair and maintenance with diagnostic tools
  service3: {
    src: `${BASE}images/services/service-repair-1000.webp`,
    srcSet: `${BASE}images/services/service-repair-600.webp 600w, ${BASE}images/services/service-repair-1000.webp 1000w`,
    alt: "Technician using digital multimeter to test circuit breaker voltage and continuity",
    decorative: false,
    width: 1000,
    height: 1250,
    aspectRatio: "4/5",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 768px) 100vw, 400px",
    credit: {
      photographer: "Jacek Halicki",
      sourcePage: "https://commons.wikimedia.org/wiki/File:2017_Cyfrowy_miernik_uniwersalny.jpg",
      license: "CC BY-SA 4.0",
    },
    comment: "Electrical repair and circuit troubleshooting",
  },

  // Service 4: Wiring and rewiring, cabling runs
  service4: {
    src: `${BASE}images/services/service-wiring-1000.webp`,
    srcSet: `${BASE}images/services/service-wiring-600.webp 600w, ${BASE}images/services/service-wiring-1000.webp 1000w`,
    alt: "Industrial electrical cable tray runs and organized branch circuit conduits",
    decorative: false,
    width: 1000,
    height: 1250,
    aspectRatio: "4/5",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 768px) 100vw, 400px",
    credit: {
      photographer: "Achim Hering",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Pt_tupper_cable_spreading_room_unit2.jpg",
      license: "CC BY 3.0",
    },
    comment: "Electrical wiring and cabling runs",
  },

  // Service 5: Safety inspection at an electrical panel
  service5: {
    src: `${BASE}images/services/service-inspection-1000.webp`,
    srcSet: `${BASE}images/services/service-inspection-600.webp 600w, ${BASE}images/services/service-inspection-1000.webp 1000w`,
    alt: "Electrician performing safety inspection and breaker servicing in uniform",
    decorative: false,
    width: 1000,
    height: 1250,
    aspectRatio: "4/5",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 768px) 100vw, 400px",
    credit: {
      photographer: "176th Wing Alaska Air National Guard",
      sourcePage: "https://commons.wikimedia.org/wiki/File:110317_F_DU133_015_(5543643257).jpg",
      license: "CC BY 2.0",
    },
    comment: "Safety inspection and compliance audit",
  },

  // FAQ section photo: technician with safety glasses and cables
  faqImage: {
    src: `${BASE}images/faq/faq-image-1000.webp`,
    srcSet: `${BASE}images/faq/faq-image-600.webp 600w, ${BASE}images/faq/faq-image-1000.webp 1000w`,
    alt: "Technicians inspecting electrical meter and terminal wiring",
    decorative: false,
    width: 1000,
    height: 750,
    aspectRatio: "4/3",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 1024px) 100vw, 500px",
    credit: {
      photographer: "Jeromi Mikhael",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Electricians_fixing_electricity_meter.jpg",
      license: "CC0 1.0 Universal Public Domain",
    },
    comment: "Close-up of technicians inspecting electrical meter enclosure",
  },

  // Blog Article 1: Home electrical safety habits
  article1: {
    src: `${BASE}images/articles/article-home-safety-1000.webp`,
    srcSet: `${BASE}images/articles/article-home-safety-600.webp 600w, ${BASE}images/articles/article-home-safety-1000.webp 1000w`,
    alt: "Residential electrical breaker panel with GFCI and circuit protection",
    decorative: false,
    width: 1000,
    height: 667,
    aspectRatio: "3/2",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 1024px) 100vw, 550px",
    credit: {
      photographer: "Retired electrician",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Small_house_distribution_panel_1.jpg",
      license: "CC0 1.0 Universal Public Domain",
    },
    comment: "Home electrical safety",
  },

  // Blog Article 2: Electrical maintenance
  article2: {
    src: `${BASE}images/articles/article-maintenance-1000.webp`,
    srcSet: `${BASE}images/articles/article-maintenance-600.webp 600w, ${BASE}images/articles/article-maintenance-1000.webp 1000w`,
    alt: "Electrician performing scheduled maintenance inside utility building electrical cabinets",
    decorative: false,
    width: 1000,
    height: 667,
    aspectRatio: "3/2",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 1024px) 100vw, 550px",
    credit: {
      photographer: "PEO ACWA",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Blue_Grass_Chemical_Agent-Destruction_Pilot_Plant_Utility_Building_(10476535316).jpg",
      license: "CC BY 2.0",
    },
    comment: "Preventative electrical maintenance",
  },

  // Blog Article 3: Warning signs that need professional diagnostics
  article3: {
    src: `${BASE}images/articles/article-warning-signs-1000.webp`,
    srcSet: `${BASE}images/articles/article-warning-signs-600.webp 600w, ${BASE}images/articles/article-warning-signs-1000.webp 1000w`,
    alt: "Indoor electrical wiring and open circuit breaker enclosure under inspection",
    decorative: false,
    width: 1000,
    height: 667,
    aspectRatio: "3/2",
    objectPosition: "center center",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "(max-width: 1024px) 100vw, 550px",
    credit: {
      photographer: "Paul The Writer",
      sourcePage: "https://commons.wikimedia.org/wiki/File:Exposed_Wall_Wiring_and_Breaker_Box.jpg",
      license: "CC0 1.0 Universal Public Domain",
    },
    comment: "Electrical troubleshooting and warning signs",
  },

  // Final CTA banner: industrial electrician in work setting
  ctaBackground: {
    src: `${BASE}images/cta/cta-background-1600.webp`,
    srcSet: `${BASE}images/cta/cta-background-1200.webp 1200w, ${BASE}images/cta/cta-background-1600.webp 1600w`,
    alt: "",
    decorative: true,
    width: 1600,
    height: 685,
    aspectRatio: "21/9",
    objectPosition: "center 35%",
    loading: "lazy",
    fetchPriority: "auto",
    sizes: "100vw",
    credit: {
      photographer: "U.S. Navy photo by MC1 Alan Cole",
      sourcePage: "https://commons.wikimedia.org/wiki/File:US_Navy_090609-N-2128R-023_Construction_Electrician_1st_Class_Alan_Cole_and_Construction_Electrician_3rd_Class_Kevin_Latimer_install_exterior_lights_at_Camp_Moreell,_Kuwait.jpg",
      license: "Public Domain",
    },
    comment: "Industrial power setting for final call to action banner",
  },

  // Social share metadata card
  socialShare: {
    src: `${BASE}images/social/social-share-1200x630.webp`,
    alt: "Cablejointsa - Professional Electrical Services for Homes and Businesses",
    decorative: false,
    width: 1200,
    height: 630,
    aspectRatio: "1200/630",
    credit: {
      photographer: "Tyne & Wear Archives & Museums",
      sourcePage: "https://commons.wikimedia.org/wiki/File:TWAM_Ref-_TWCMS-M4424_(21613295362).jpg",
      license: "Public Domain",
    },
  },
};
