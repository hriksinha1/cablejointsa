# Cablejointsa – Electrical Services Landing Page

A complete, production-quality single-page landing site for **Cablejointsa**, built with React, Vite, and Tailwind CSS. Configured for instantaneous, zero-configuration deployment to Vercel.

---

## ⚡ Features & Visual Architecture

- **Faithful Industrial Layout**: Matches the split composition hero with floating status chips, double ticker strips, vertical/horizontal service selector tabs, testimonial carousel, custom validated contact form, single-expand FAQ accordion, and safety editorial articles.
- **Strict Brand Integrity**: Uniform "Cablejointsa" brand presence everywhere, display typography in Bebas Neue, UI and body in Inter Variable, and an oversized cropped watermark in the footer.
- **Factual Honesty**: Sample content indicators enabled by default (`SHOW_DEMO_NOTES = true`) under metrics, ratings, and testimonials. No unsupported licensing, insurance, or 24/7 guarantees in default copy.
- **Accessibility & Contrast**: Built to WCAG AA specifications (4.5:1 minimum text contrast, visible focus rings, native dialog disclosures, keyboard navigation for tabs/accordions/carousel, and `prefers-reduced-motion` compliance).
- **Zero External Network Dependencies**: Self-contained client-side architecture with mock submission API and graceful branded fallbacks for all image slots.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ installed on your machine.

### 2. Local Installation
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
# Build production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```text
├── index.html                     # HTML5 entry with meta, OpenGraph tags & SVG favicon
├── package.json                   # Build scripts & dependencies
├── vite.config.js                 # Vite bundler configuration with Tailwind integration
├── public/
│   └── favicon.svg                # Branded lightning bolt favicon
├── src/
│   ├── App.jsx                    # Root app assembling semantic landmarks & state
│   ├── main.jsx                   # React DOM root entry point
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx         # Static header with desktop disclosures & mobile drawer
│   │   │   ├── Footer.jsx         # 4-column footer, legal modals & giant watermark
│   │   │   └── PageContainer.jsx  # Max 1240px container with responsive gutters
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx    # Hero split layout & floating chips
│   │   │   ├── ServiceStrip.jsx   # Continuous marquee ticker (yellow & blue)
│   │   │   ├── IntroMetricsSection.jsx # Company metrics & video modal preview
│   │   │   ├── AboutSection.jsx   # Quality statement, initials avatar stack & rating
│   │   │   ├── ServicesSection.jsx # Tablist selector & featured service panel
│   │   │   ├── TestimonialsSection.jsx # Horizontal scroll-snap carousel
│   │   │   ├── ContactSection.jsx # Custom validated form & contact cards
│   │   │   ├── FAQSection.jsx     # Accordion with keyboard arrow navigation
│   │   │   ├── ArticlesSection.jsx # Alternating blog rows & modal reader
│   │   │   └── FinalCTASection.jsx # Navy photo banner with dual CTAs
│   │   └── ui/
│   │       ├── Accordion.jsx      # Accessible single-expand accordion
│   │       ├── Avatar.jsx         # Initials-based avatar & avatar stack
│   │       ├── Button.jsx         # Unified button/link with visible focus rings
│   │       ├── ContactInfoCard.jsx# Contact credential cards
│   │       ├── Dialog.jsx         # Native accessible modal dialog
│   │       ├── Eyebrow.jsx        # Outlined uppercase pill badge
│   │       ├── ImageWithFallback.jsx # Aspect-ratio wrapper with branded fallback
│   │       ├── Logo.jsx           # Branded lightning mark & Bebas wordmark
│   │       ├── SectionHeading.jsx # Eyebrow + display heading pair
│   │       ├── SocialLinks.jsx    # Inline SVG platform links
│   │       ├── StarRating.jsx     # Yellow star rating component
│   │       └── TestimonialCard.jsx# Testimonial review cards
│   ├── data/
│   │   ├── siteContent.js         # Phone, email, address, hours, metrics & copy
│   │   ├── services.js            # Service catalog, numbers, descriptions & icons
│   │   ├── testimonials.js        # Customer reviews, reviewer initials & roles
│   │   ├── faqs.js                # FAQ questions and practical answers
│   │   ├── articles.js            # Safety blog articles and full content
│   │   └── images.js              # Centralized image slot registry
│   ├── hooks/
│   │   ├── useEscapeKey.js        # Escape key listener
│   │   └── useReducedMotion.js    # Reduced motion detection
│   ├── services/
│   │   └── mockApi.js             # Simulated async form enquiry handler
│   └── styles/
│       ├── tokens.css             # Tailwind v4 theme tokens & color variables
│       └── global.css             # Typography rules, marquee keyframes & watermark
└── README.md
```

---

## 🛠️ Customization Guide

### Editing Business Information & Copy
All business information is maintained in `src/data/siteContent.js`:
- **Phone Number**: Change `contact.phoneDisplay` and `contact.phoneTel`.
- **Email & Address**: Update `contact.email` and `contact.address`.
- **Hours of Operation**: Edit `workingHours` array.
- **Social Links**: Set URLs in `socialLinks` (unpopulated links are hidden automatically).
- **Demo Note**: Toggle `SHOW_DEMO_NOTES = false` once verified details are loaded.
- **Video Reel**: Add your video URL to `siteContent.videoUrl` to replace the demo modal.

### Replacing Images
All imagery is registered centrally in `src/data/images.js`. Replace any slot's `url` with your own hosted asset or local file in `/public/images/`:
- `heroBackdrop`: Industrial switchgear/breaker photo.
- `heroPortrait`: Professional electrician in safety workwear.
- `videoPoster`: High-resolution electrical maintenance capture.
- `aboutMain`: Technician wiring a panel or junction box.
- `service1` – `service5`: Photographs depicting specific residential and commercial work.
- `faqImage`: Detailed view of electrical work.
- `article1` – `article3`: Safety and maintenance educational photography.
- `ctaBackground`: Wide dark industrial electrical scene.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. Vercel automatically detects the **Vite** framework preset:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**. No environment variables or custom serverless configurations are required.
