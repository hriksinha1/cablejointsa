import React, { useState, useRef, useEffect } from "react";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "../ui/Logo";
import { siteContent } from "../../data/siteContent";
import { services } from "../../data/services";
import { articles } from "../../data/articles";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export function Header({ onSelectService, onOpenArticle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'blog' | null
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);

  const headerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close with escape key
  useEscapeKey(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, Boolean(activeDropdown || mobileMenuOpen));

  const handleServiceClick = (serviceId) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onSelectService) onSelectService(serviceId);
    const target = document.getElementById("services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleArticleClick = (article) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onOpenArticle) onOpenArticle(article);
  };

  return (
    <header className="relative z-30 pt-5 px-4 sm:px-6 lg:px-8">
      <div
        ref={headerRef}
        className="max-w-[1240px] mx-auto bg-white rounded-[8px] shadow-[0_8px_24px_rgba(20,41,92,0.08)] border border-[#E1E5EB] px-4 sm:px-6 h-[72px] flex items-center justify-between"
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="focus-visible:outline-3 focus-visible:outline-[#1858DE] focus-visible:outline-offset-2 rounded-[4px]"
        >
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1 xl:gap-2 font-medium text-[14px] text-[#303746]"
        >
          <a
            href="#home"
            className="px-3 py-2 rounded-[4px] hover:text-[#1858DE] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
          >
            Home
          </a>
          <a
            href="#about"
            className="px-3 py-2 rounded-[4px] hover:text-[#1858DE] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
          >
            About
          </a>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === "services"}
              aria-controls="services-menu"
              onClick={() =>
                setActiveDropdown((prev) => (prev === "services" ? null : "services"))
              }
              className="px-3 py-2 rounded-[4px] inline-flex items-center gap-1 hover:text-[#1858DE] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE] cursor-pointer"
            >
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === "services" && (
              <div
                id="services-menu"
                className="absolute left-0 top-full mt-1 w-64 bg-white rounded-[8px] shadow-xl border border-[#E1E5EB] py-2 z-40 animate-in fade-in duration-150"
              >
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => handleServiceClick(svc.id)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#14295C] hover:bg-[#F4F5F7] hover:text-[#1858DE] transition-colors font-medium flex items-center justify-between"
                  >
                    <span>{svc.title}</span>
                    <span className="text-[11px] font-mono text-[#5B6475]">{svc.number}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Blog Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("blog")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === "blog"}
              aria-controls="blog-menu"
              onClick={() =>
                setActiveDropdown((prev) => (prev === "blog" ? null : "blog"))
              }
              className="px-3 py-2 rounded-[4px] inline-flex items-center gap-1 hover:text-[#1858DE] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE] cursor-pointer"
            >
              <span>Blog</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === "blog" && (
              <div
                id="blog-menu"
                className="absolute left-0 top-full mt-1 w-72 bg-white rounded-[8px] shadow-xl border border-[#E1E5EB] py-2 z-40 animate-in fade-in duration-150"
              >
                {articles.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => handleArticleClick(article)}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-[#14295C] hover:bg-[#F4F5F7] hover:text-[#1858DE] transition-colors font-medium line-clamp-1"
                  >
                    {article.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#faq"
            className="px-3 py-2 rounded-[4px] hover:text-[#1858DE] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
          >
            FAQ
          </a>

          <a
            href="#contact"
            className="px-3 py-2 rounded-[4px] hover:text-[#1858DE] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
          >
            Contact
          </a>
        </nav>

        {/* Right Phone Call Area & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={siteContent.contact.phoneTel}
            className="flex items-center gap-2.5 px-2 py-1 rounded-[4px] text-right focus-visible:outline-3 focus-visible:outline-[#1858DE] group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FFD92F] group-hover:bg-[#F2C814] flex items-center justify-center text-[#14295C] shadow-sm transition-colors">
              <Phone className="w-4 h-4 fill-current" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#5B6475] leading-none">
                Call or chat
              </span>
              <span className="font-bold text-[14px] text-[#14295C] group-hover:text-[#1858DE] transition-colors leading-tight">
                {siteContent.contact.phoneDisplay}
              </span>
            </div>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden w-11 h-11 rounded-[4px] flex items-center justify-center border border-[#E1E5EB] text-[#14295C] hover:bg-[#F4F5F7] transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden max-w-[1240px] mx-auto mt-2 bg-white rounded-[8px] shadow-2xl border border-[#E1E5EB] p-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-150"
        >
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-[4px] font-semibold text-[15px] text-[#14295C] hover:bg-[#F4F5F7]"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-[4px] font-semibold text-[15px] text-[#14295C] hover:bg-[#F4F5F7]"
          >
            About
          </a>

          {/* Mobile Services Accordion */}
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-[4px] font-semibold text-[15px] text-[#14295C] hover:bg-[#F4F5F7]"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="pl-6 pr-2 py-1 flex flex-col gap-1 border-l-2 border-[#1858DE] ml-4 my-1">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => handleServiceClick(svc.id)}
                    className="text-left py-2 text-[14px] text-[#5B6475] hover:text-[#1858DE]"
                  >
                    {svc.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Blog Accordion */}
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setMobileBlogOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-[4px] font-semibold text-[15px] text-[#14295C] hover:bg-[#F4F5F7]"
            >
              <span>Blog</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileBlogOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileBlogOpen && (
              <div className="pl-6 pr-2 py-1 flex flex-col gap-1 border-l-2 border-[#1858DE] ml-4 my-1">
                {articles.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => handleArticleClick(article)}
                    className="text-left py-2 text-[14px] text-[#5B6475] hover:text-[#1858DE]"
                  >
                    {article.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-[4px] font-semibold text-[15px] text-[#14295C] hover:bg-[#F4F5F7]"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-[4px] font-semibold text-[15px] text-[#14295C] hover:bg-[#F4F5F7]"
          >
            Contact
          </a>

          <div className="pt-3 border-t border-[#E1E5EB] mt-2">
            <a
              href={siteContent.contact.phoneTel}
              className="w-full py-3 px-4 bg-[#FFD92F] text-[#14295C] font-bold uppercase rounded-[4px] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call {siteContent.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
