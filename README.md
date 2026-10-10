# Cablejointsa – Electrical Services Landing Page (Riyadh, Saudi Arabia)

A production-quality, responsive single-page landing site for **Cablejointsa**, providing residential and commercial electrical services in Riyadh, Saudi Arabia. Built with React, Vite, Tailwind CSS, Bebas Neue (display typography) and Inter (body typography).

---

## ⚡ Core Business Information & Source of Truth

- **Brand**: Cablejointsa
- **Location**: Riyadh, Saudi Arabia
- **Physical Address**: Malaz, Riyadh, Saudi Arabia 12831
- **Display Phone**: `0570477234`
- **Click-to-Call Link**: `tel:+966570477234`
- **Instagram**: [https://www.instagram.com/cablejointsa/](https://www.instagram.com/cablejointsa/) (`@cablejointsa`)
- **Facebook**: [https://www.facebook.com/people/The-saif-ahmed/100065301078114/#](https://www.facebook.com/people/The-saif-ahmed/100065301078114/#)
- **Canonical Web URL**: `https://cablejointsa.vercel.app/`
- **Emergency Dispatch (Saudi Arabia)**: Saudi Civil Defense on `998`

---

## 🛠️ Content Architecture & Single Source of Truth

All business facts, copy blocks, phone numbers, addresses, social channels, and feature toggles reside in **`src/data/siteContent.js`**. This module is pure ESM data without browser-specific runtime dependencies so that build tools, Vite plugins, and node verification scripts can import it directly.

### 1. Editing Contact & Location Details
In `src/data/siteContent.js`:
- **Phone**: Update `contact.phoneDisplay` (e.g. `"0570477234"`) and `contact.phoneTel` (e.g. `"+966570477234"`). Every phone component derives its `href` via `buildTelHref()`.
- **Address**: Edit `contact.address.district`, `contact.address.city`, `contact.address.postalCode`, and `contact.address.full`. Google Maps search links are generated automatically via `buildMapsUrl()`.
- **Social Links**: Update `socialLinks.instagram` and `socialLinks.facebook`. Only platforms with a defined URL are rendered.

### 2. Adding Verified Email or Working Hours Later
By design, email and hours are omitted when `null`—no "N/A" or placeholder cards are displayed.
To enable them once verified by the business owner:
- **Email**: Set `contact.email: "info@cablejointsa.com"` (or similar). An Email `ContactInfoCard` will automatically appear in the Contact section.
- **Working Hours**: Set `contact.hours: "Sat – Thu: 8:00 AM – 8:00 PM"` (or similar). A Working Hours card will automatically appear.

### 3. Toggling Feature Flags
In `src/data/siteContent.js`:
- **`features.testimonials`**:
  - `true` (default): Displays customer review carousel clearly labelled with "Sample review" layout notices.
  - `false`: Completely hides the Testimonials section from the landing page.
- **`forms.deliveryMode`**:
  - `"demo"` (default): Shows an honest notice that online submissions are in demonstration mode and directs urgent visitors to call `0570477234`.
  - `"live"`: Displays a live confirmation message upon form submission when connected to an active backend.

---

## 🔍 Content Verification & Quality Checks

Run the automated content integrity audit to verify that no forbidden tokens (such as placeholder phones, generic emails, unverified statistics, or arbitrary social URLs) exist anywhere in the codebase:

```bash
# Run the automated content audit
npm run content:check

# Run production build
npm run build
```

The script `scripts/check-content.mjs` verifies:
1. Zero occurrences of `(555)`, `010-0199`, `example.com`, `hello@`, `Your business address`, `Plumbera`, `24/7`, `224K`, or unverified hour strings.
2. Only verified profile links for Instagram and Facebook are referenced.
3. Verification of exact required phone (`0570477234`), click-to-call (`tel:+966570477234`), and address (`Malaz, Riyadh, Saudi Arabia 12831`).

---

## 🌐 Local SEO & Metadata Architecture

- **Client-Rendered SPA**: The application is a client-rendered React single-page app (SPA) deployed on Vercel without prerendering.
- **Build-time Metadata & JSON-LD**: `vite.config.js` utilizes an inline plugin (`localSeoPlugin`) during `vite build` that injects:
  - Canonical link: `https://cablejointsa.vercel.app/`
  - Schema.org structured data (`@type: "Electrician"` LocalBusiness subtype) containing exact telephone, PostalAddress (district Malaz, city Riyadh, postalCode 12831, country SA), and sameAs social profile links.
  - OpenGraph & Twitter summary large image metadata referencing verified local static card `/images/social/social-share-1200x630.webp`.
- **Search Engine Directives**:
  - `public/robots.txt`: Directs search engine crawlers and points to `sitemap.xml`.
  - `public/sitemap.xml`: Declares canonical index URL for search indexing.

---

## 🚀 Development & Deployment

### Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment on Vercel
1. Connect your repository to Vercel.
2. Vercel automatically detects Vite:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**. No additional environment variables or serverless functions are required.
