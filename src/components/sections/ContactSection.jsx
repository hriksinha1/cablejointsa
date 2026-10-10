import React, { useState, useRef } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { ContactInfoCard } from "../ui/ContactInfoCard";
import { PageContainer } from "../layout/PageContainer";
import { siteContent } from "../../data/siteContent";
import { services } from "../../data/services";
import { mockApi } from "../../services/mockApi";
import { buildTelHref, buildMapsUrl, isValidPhone } from "../../utils/contact";

export function ContactSection({ preselectedServiceId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedServiceId || "",
    message: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [serverError, setServerError] = useState(null);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const serviceInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const successRef = useRef(null);

  const phoneHref = buildTelHref(siteContent.contact.phoneTel);
  const mapsUrl = buildMapsUrl(siteContent.contact.address.full);
  const isDemo = siteContent.forms?.deliveryMode === "demo";

  // Sync when preselectedServiceId prop changes
  React.useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, service: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value || value.trim().length < 2) {
          return "Please enter your name.";
        }
        return null;
      case "phone":
        if (!value || !isValidPhone(value)) {
          return "Enter a phone number we can call, for example 05XXXXXXXX.";
        }
        return null;
      case "email": {
        if (!value || value.trim().length === 0) {
          return null; // optional
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return "That email address doesn't look right.";
        }
        return null;
      }
      case "service":
        if (!value || value === "") {
          return "Choose the service you need.";
        }
        return null;
      case "message":
        if (!value || value.trim().length < 10) {
          return "Add a few details about the work (at least 10 characters).";
        }
        return null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields
    const newErrors = {};
    ["name", "phone", "email", "service", "message"].forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });

    // If errors exist, focus the first invalid field
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) nameInputRef.current?.focus();
      else if (newErrors.phone) phoneInputRef.current?.focus();
      else if (newErrors.email) emailInputRef.current?.focus();
      else if (newErrors.service) serviceInputRef.current?.focus();
      else if (newErrors.message) messageInputRef.current?.focus();
      return;
    }

    // Submit via mockApi
    setIsSubmitting(true);
    try {
      const res = await mockApi.submitEnquiry(formData);
      setSubmissionResult(res);
      setTimeout(() => {
        successRef.current?.focus();
      }, 100);
    } catch (err) {
      setServerError(err.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setTouched({});
    setErrors({});
    setSubmissionResult(null);
    setServerError(null);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F4F5F7] border-t border-[#E1E5EB]"
    >
      <PageContainer>
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow={siteContent.contactSection.eyebrow}
            title={siteContent.contactSection.heading}
            align="center"
            maxWidth="max-w-[720px]"
          />
        </div>

        {/* Two Columns Grid: ~55% Form / ~45% Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[8px] p-6 sm:p-8 md:p-10 border border-[#E1E5EB] shadow-[0_8px_24px_rgba(20,41,92,0.06)]">
            <h3 className="font-display text-[#14295C] text-[24px] sm:text-[28px] uppercase tracking-wide mb-2">
              {siteContent.contactSection.formHeading}
            </h3>

            <p className="text-[14px] text-[#5B6475] leading-relaxed mb-6">
              {siteContent.contactSection.formHelper}
            </p>

            {/* Pre-form Demo Notice when deliveryMode is demo */}
            {isDemo && !submissionResult && (
              <div
                role="note"
                className="p-3.5 mb-6 bg-[#FFD92F]/20 border border-[#FFD92F]/60 text-[#14295C] text-[13px] rounded-[4px] flex items-center justify-between flex-wrap gap-2"
              >
                <span>{siteContent.forms.messages.demoNotice}</span>
                <a
                  href={phoneHref}
                  className="font-bold underline text-[#14295C] hover:text-[#1858DE] whitespace-nowrap min-h-[44px] inline-flex items-center"
                >
                  Call {siteContent.contact.phoneDisplay}
                </a>
              </div>
            )}

            {submissionResult ? (
              /* Success State */
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="flex flex-col items-center text-center py-8 gap-4 bg-[#F4F5F7] rounded-[8px] p-6 border border-[#E1E5EB] focus:outline-none"
              >
                <div className="w-14 h-14 rounded-full bg-[#1858DE]/15 text-[#1858DE] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-[22px] text-[#14295C] uppercase">
                  Enquiry Received
                </h4>
                <p className="text-[14px] text-[#303746] max-w-md leading-relaxed">
                  {isDemo
                    ? siteContent.forms.messages.demoSuccess
                    : siteContent.forms.messages.liveSuccess}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-[4px] bg-[#1858DE] hover:bg-[#1348B8] text-white font-semibold text-[14px] shadow-sm transition-colors focus-visible:outline-3 focus-visible:outline-[#FFD92F]"
                  >
                    <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Call {siteContent.contact.phoneDisplay}</span>
                  </a>

                  {siteContent.socialLinks.instagram?.url && (
                    <a
                      href={siteContent.socialLinks.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-[4px] bg-white border border-[#E1E5EB] text-[#14295C] hover:text-[#1858DE] font-semibold text-[13px] shadow-sm transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
                    >
                      <span>Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}

                  {siteContent.socialLinks.facebook?.url && (
                    <a
                      href={siteContent.socialLinks.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-[4px] bg-white border border-[#E1E5EB] text-[#14295C] hover:text-[#1858DE] font-semibold text-[13px] shadow-sm transition-colors focus-visible:outline-3 focus-visible:outline-[#1858DE]"
                    >
                      <span>Facebook</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E1E5EB] w-full mt-2">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Send Another Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="text-[12px] text-[#5B6475] italic -mt-2 mb-2">
                  * Required fields
                </div>

                {serverError && (
                  <div
                    role="alert"
                    className="p-3 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[4px] flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* 2x2 Field Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="field-name"
                      className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                    >
                      Your name *
                    </label>
                    <input
                      ref={nameInputRef}
                      id="field-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "error-name" : undefined}
                      placeholder="e.g. Abdullah"
                      className={`h-[48px] px-3.5 rounded-[4px] border bg-white text-[14px] text-[#303746] transition-colors focus:bg-white ${
                        errors.name
                          ? "border-red-500 focus-visible:outline-red-500"
                          : "border-[#E1E5EB] focus-visible:outline-[#1858DE]"
                      }`}
                    />
                    {errors.name && (
                      <span
                        id="error-name"
                        className="text-[12px] text-red-600 flex items-center gap-1 mt-0.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="field-phone"
                      className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                    >
                      Phone number *
                    </label>
                    <input
                      ref={phoneInputRef}
                      id="field-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "error-phone" : undefined}
                      placeholder="05XXXXXXXX"
                      className={`h-[48px] px-3.5 rounded-[4px] border bg-white text-[14px] text-[#303746] transition-colors ${
                        errors.phone
                          ? "border-red-500 focus-visible:outline-red-500"
                          : "border-[#E1E5EB] focus-visible:outline-[#1858DE]"
                      }`}
                    />
                    {errors.phone && (
                      <span
                        id="error-phone"
                        className="text-[12px] text-red-600 flex items-center gap-1 mt-0.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="field-email"
                      className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                    >
                      Email (optional)
                    </label>
                    <input
                      ref={emailInputRef}
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "error-email" : undefined}
                      placeholder="name@domain.com"
                      className={`h-[48px] px-3.5 rounded-[4px] border bg-white text-[14px] text-[#303746] transition-colors ${
                        errors.email
                          ? "border-red-500 focus-visible:outline-red-500"
                          : "border-[#E1E5EB] focus-visible:outline-[#1858DE]"
                      }`}
                    />
                    {errors.email && (
                      <span
                        id="error-email"
                        className="text-[12px] text-red-600 flex items-center gap-1 mt-0.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Service Needed */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="field-service"
                      className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                    >
                      Service needed *
                    </label>
                    <select
                      ref={serviceInputRef}
                      id="field-service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "error-service" : undefined}
                      className={`h-[48px] px-3.5 rounded-[4px] border bg-white text-[14px] text-[#303746] transition-colors cursor-pointer ${
                        errors.service
                          ? "border-red-500 focus-visible:outline-red-500"
                          : "border-[#E1E5EB] focus-visible:outline-[#1858DE]"
                      }`}
                    >
                      <option value="">Choose the service you need</option>
                      {services.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.title}
                        </option>
                      ))}
                      <option value="other">Not sure / other</option>
                    </select>
                    {errors.service && (
                      <span
                        id="error-service"
                        className="text-[12px] text-red-600 flex items-center gap-1 mt-0.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.service}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tell us about the work (Message) */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="field-message"
                    className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                  >
                    Tell us about the work *
                  </label>
                  <textarea
                    ref={messageInputRef}
                    id="field-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "error-message" : undefined}
                    placeholder="Home or business, district, what's happening or what you'd like done, and when."
                    className={`p-3.5 rounded-[4px] border bg-white text-[14px] text-[#303746] transition-colors resize-y ${
                      errors.message
                        ? "border-red-500 focus-visible:outline-red-500"
                        : "border-[#E1E5EB] focus-visible:outline-[#1858DE]"
                    }`}
                  />
                  {errors.message && (
                    <span
                      id="error-message"
                      className="text-[12px] text-red-600 flex items-center gap-1 mt-0.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending…</span>
                      </span>
                    ) : (
                      "Send Enquiry"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="font-display text-[#14295C] text-[24px] sm:text-[28px] uppercase tracking-wide mb-3">
                {siteContent.contactSection.directHeading}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#5B6475] leading-relaxed">
                {siteContent.contactSection.directParagraph}
              </p>
            </div>

            {/* 4 Consistent ContactInfoCards (no separate duplicate social row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Phone Card */}
              <ContactInfoCard
                icon={Phone}
                label="Phone"
                value={siteContent.contact.phoneDisplay}
                href={phoneHref}
                ariaLabel={`Call ${siteContent.contact.phoneDisplay}`}
              />

              {/* 2. Location Card with Google Maps link */}
              <ContactInfoCard
                icon={MapPin}
                label="Location"
                value={siteContent.contact.address.full}
                flagEmoji={true}
                secondaryLink={{
                  text: "Open in Google Maps",
                  href: mapsUrl,
                }}
              />

              {/* 3. Instagram Card */}
              {siteContent.socialLinks.instagram?.url && (
                <ContactInfoCard
                  icon={() => (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  label="Instagram"
                  value={siteContent.socialLinks.instagram.handle}
                  href={siteContent.socialLinks.instagram.url}
                  ariaLabel="Instagram: @cablejointsa (opens in a new tab)"
                />
              )}

              {/* 4. Facebook Card */}
              {siteContent.socialLinks.facebook?.url && (
                <ContactInfoCard
                  icon={() => (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  label="Facebook"
                  value={siteContent.socialLinks.facebook.handle}
                  href={siteContent.socialLinks.facebook.url}
                  ariaLabel="Facebook profile (opens in a new tab)"
                />
              )}

              {/* Extra cards only render if email or hours are configured (currently null) */}
              {siteContent.contact.email && (
                <ContactInfoCard
                  icon={Mail}
                  label="Email"
                  value={siteContent.contact.email}
                  href={`mailto:${siteContent.contact.email}`}
                />
              )}
              {siteContent.contact.hours && (
                <ContactInfoCard
                  icon={Clock}
                  label="Working Hours"
                  value={siteContent.contact.hours}
                />
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
