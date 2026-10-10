import React, { useState } from "react";
import { Phone, MapPin, ExternalLink } from "lucide-react";
import { Logo } from "../ui/Logo";
import { SocialLinks } from "../ui/SocialLinks";
import { Dialog } from "../ui/Dialog";
import { PageContainer } from "./PageContainer";
import { siteContent } from "../../data/siteContent";
import { buildTelHref, buildMapsUrl } from "../../utils/contact";

export function Footer() {
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  const phoneHref = buildTelHref(siteContent.contact.phoneTel);
  const mapsUrl = buildMapsUrl(siteContent.contact.address.full);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white pt-16 sm:pt-20 border-t border-[#E1E5EB] overflow-hidden">
      <PageContainer>
        {/* Four Column Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
          {/* Col 1: Brand & Bio */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-[14px] text-[#5B6475] leading-relaxed max-w-sm">
              {siteContent.footer.description}
            </p>
            <div className="pt-2">
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-[20px] tracking-wider text-[#14295C] uppercase">
              Quick Links
            </h4>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-2.5 text-[14px] text-[#5B6475]">
              <a
                href="#home"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
              >
                Home
              </a>
              <a
                href="#about"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
              >
                About Us
              </a>
              <a
                href="#services"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
              >
                Services
              </a>
              <a
                href="#blog"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
              >
                Insights
              </a>
              <a
                href="#faq"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
              >
                FAQs
              </a>
              <a
                href="#contact"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-[20px] tracking-wider text-[#14295C] uppercase">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] text-[#5B6475]">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1858DE] shrink-0 mt-1" aria-hidden="true" />
                <a
                  href={phoneHref}
                  className="hover:text-[#1858DE] transition-colors font-semibold text-[#14295C] tabular-nums min-h-[32px] flex items-center"
                >
                  {siteContent.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1858DE] shrink-0 mt-1" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <span className="leading-snug text-[#303746]">
                    {siteContent.contact.address.full}
                    <span aria-hidden="true" className="ml-1.5 select-none">
                      🇸🇦
                    </span>
                  </span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1858DE] hover:text-[#1348B8] transition-colors w-fit mt-0.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us (Replacing working hours) */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-[20px] tracking-wider text-[#14295C] uppercase">
              Follow Us
            </h4>
            <p className="text-[14px] text-[#5B6475] leading-relaxed">
              Connect with our team online for project updates and company information.
            </p>
            <div className="pt-1">
              <SocialLinks showLabels={true} />
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="py-6 border-t border-[#E1E5EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#5B6475]">
          <p>© {currentYear} {siteContent.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal("privacy")}
              className="hover:text-[#1858DE] transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal("terms")}
              className="hover:text-[#1858DE] transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-[#1858DE] min-h-[32px] flex items-center"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </PageContainer>

      {/* Giant Bottom Cropped Watermark */}
      <div
        className="w-full overflow-hidden select-none pointer-events-none mt-2 flex justify-center h-[5rem] sm:h-[7rem] md:h-[9rem] lg:h-[11rem]"
        aria-hidden="true"
      >
        <span className="footer-watermark tracking-tight block transform translate-y-3 sm:translate-y-6">
          Cablejointsa
        </span>
      </div>

      {/* Privacy Dialog */}
      <Dialog
        isOpen={legalModal === "privacy"}
        onClose={() => setLegalModal(null)}
        title="Privacy Notice (Demonstration Site)"
      >
        <div className="space-y-4 text-[14px] text-[#303746] leading-relaxed">
          <p>
            This website is currently operated as a demonstration and portfolio site for Cablejointsa in Riyadh, Saudi Arabia.
          </p>
          <p>
            Information submitted through the online enquiry form is captured in demo mode and is not transmitted to external third-party marketing databases or tracking platforms.
          </p>
          <p>
            For actual service enquiries and direct communication, please contact the business directly at{" "}
            <a href={phoneHref} className="text-[#1858DE] underline font-semibold">
              {siteContent.contact.phoneDisplay}
            </a>.
          </p>
        </div>
      </Dialog>

      {/* Terms Dialog */}
      <Dialog
        isOpen={legalModal === "terms"}
        onClose={() => setLegalModal(null)}
        title="Terms of Use (Demonstration Site)"
      >
        <div className="space-y-4 text-[14px] text-[#303746] leading-relaxed">
          <p>
            All content and design assets presented on this landing page are intended to illustrate the services and capabilities of Cablejointsa.
          </p>
          <p>
            Work scopes, pricing, timing, and agreements for residential or commercial electrical work in Riyadh are determined through direct consultation and confirmed with the client prior to commencing any work.
          </p>
        </div>
      </Dialog>
    </footer>
  );
}
