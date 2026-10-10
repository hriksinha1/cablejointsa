import React, { useState } from "react";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { Logo } from "../ui/Logo";
import { SocialLinks } from "../ui/SocialLinks";
import { Dialog } from "../ui/Dialog";
import { PageContainer } from "./PageContainer";
import { siteContent } from "../../data/siteContent";

export function Footer() {
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  return (
    <footer className="relative bg-white pt-16 sm:pt-20 border-t border-[#E1E5EB] overflow-hidden">
      <PageContainer>
        {/* Four Column Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
          {/* Col 1: Brand & Bio */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-[14px] text-[#5B6475] leading-relaxed max-w-sm">
              Electrical services for homes and businesses, from quick repairs to new installations, delivering safety and quality craftsmanship.
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
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE]"
              >
                Home
              </a>
              <a
                href="#services"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE]"
              >
                Services
              </a>
              <a
                href="#about"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE]"
              >
                About Us
              </a>
              <a
                href="#blog"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE]"
              >
                Our Blog
              </a>
              <a
                href="#contact"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE]"
              >
                Contact Us
              </a>
              <a
                href="#faq"
                className="hover:text-[#1858DE] transition-colors w-fit focus-visible:outline-3 focus-visible:outline-[#1858DE]"
              >
                FAQs
              </a>
            </nav>
          </div>

          {/* Col 3: Contact Us */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-[20px] tracking-wider text-[#14295C] uppercase">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] text-[#5B6475]">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1858DE] shrink-0 mt-1" aria-hidden="true" />
                <a
                  href={siteContent.contact.phoneTel}
                  className="hover:text-[#1858DE] transition-colors font-medium text-[#14295C]"
                >
                  {siteContent.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1858DE] shrink-0 mt-1" aria-hidden="true" />
                <span className="leading-snug">{siteContent.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#1858DE] shrink-0 mt-1" aria-hidden="true" />
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="hover:text-[#1858DE] transition-colors break-all"
                >
                  {siteContent.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Working Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-[20px] tracking-wider text-[#14295C] uppercase">
              Working Hours
            </h4>
            <ul className="flex flex-col gap-2.5 text-[14px] text-[#5B6475]">
              {siteContent.workingHours.map((slot, index) => (
                <li key={index} className="flex justify-between items-center border-b border-[#E1E5EB]/60 pb-2">
                  <span className="font-medium text-[#14295C]">{slot.day}</span>
                  <span>{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="py-6 border-t border-[#E1E5EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#5B6475]">
          <p>© 2026 Cablejointsa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal("privacy")}
              className="hover:text-[#1858DE] transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-[#1858DE]"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal("terms")}
              className="hover:text-[#1858DE] transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-[#1858DE]"
            >
              Terms
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
        title="Privacy Policy (Demo Notice)"
      >
        <div className="space-y-4">
          <p>
            This website is a demonstration landing page for Cablejointsa.
            No personal data submitted via the inquiry form is transmitted to third-party tracking services or stored permanently on external servers.
          </p>
          <p>
            When configuring this application for production use, replace this notice with your business&apos;s formal privacy policy governing customer data protection and communications.
          </p>
        </div>
      </Dialog>

      {/* Terms Dialog */}
      <Dialog
        isOpen={legalModal === "terms"}
        onClose={() => setLegalModal(null)}
        title="Terms of Service (Demo Notice)"
      >
        <div className="space-y-4">
          <p>
            All content, statistics, ratings, and quotes presented on this site are sample demonstration assets intended for layout presentation.
          </p>
          <p>
            For actual electrical services, terms of engagement, warranties, and service agreements should be tailored to your jurisdiction and verified business specifications.
          </p>
        </div>
      </Dialog>
    </footer>
  );
}
