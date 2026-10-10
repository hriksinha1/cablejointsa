import React, { useState, useRef } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { ContactInfoCard } from "../ui/ContactInfoCard";
import { SocialLinks } from "../ui/SocialLinks";
import { PageContainer } from "../layout/PageContainer";
import { siteContent } from "../../data/siteContent";
import { services } from "../../data/services";
import { mockApi } from "../../services/mockApi";

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
  const [submissionResult, setSubmissionResult] = useState(null); // { ok: true, referenceId: 'DEMO-1234' }
  const [serverError, setServerError] = useState(null);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const serviceInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const successRef = useRef(null);

  // Sync when prop changes
  React.useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, service: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value || value.trim().length < 2) {
          return "Full name must be at least 2 characters.";
        }
        return null;
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return null;
      }
      case "phone": {
        const digits = (value || "").replace(/\D/g, "");
        if (digits.length < 7 || digits.length > 15) {
          return "Please enter a valid phone number (7 to 15 digits).";
        }
        return null;
      }
      case "service":
        if (!value || value === "") {
          return "Please select a service.";
        }
        return null;
      case "message":
        if (!value || value.trim().length < 10) {
          return "Message must be at least 10 characters.";
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

    // Validate all
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
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

    // Check if invalid and focus first
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) nameInputRef.current?.focus();
      else if (newErrors.email) emailInputRef.current?.focus();
      else if (newErrors.phone) phoneInputRef.current?.focus();
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
            eyebrow="Contact us"
            title="Contact our expert electricians"
            align="center"
            maxWidth="max-w-[720px]"
          />
        </div>

        {/* Two Columns Grid: ~55% Form / ~45% Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[8px] p-6 sm:p-8 md:p-10 border border-[#E1E5EB] shadow-[0_8px_24px_rgba(20,41,92,0.06)]">
            <h3 className="font-display text-[#14295C] text-[24px] sm:text-[28px] uppercase tracking-wide mb-6">
              Get in touch with us
            </h3>

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
                <p className="text-[14px] text-[#5B6475] max-w-md leading-relaxed">
                  Thanks, your enquiry was captured in this demo. No message was sent to any business email or server.
                </p>
                <div className="bg-white px-4 py-2 rounded-[4px] border border-[#E1E5EB] text-[13px] font-mono text-[#14295C]">
                  Reference ID: <span className="font-bold">{submissionResult.referenceId}</span>
                </div>
                <div className="pt-2">
                  <Button variant="primary" size="md" onClick={handleReset}>
                    Send Another Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              /* Form */
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
                      placeholder="e.g. John Smith"
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

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="field-email"
                      className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                    >
                      Email address *
                    </label>
                    <input
                      ref={emailInputRef}
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "error-email" : undefined}
                      placeholder="e.g. name@example.com"
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
                      placeholder="e.g. (555) 010-0199"
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

                  {/* Service Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="field-service"
                      className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                    >
                      Select a service *
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
                      <option value="">Select a service</option>
                      {services.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.title}
                        </option>
                      ))}
                      <option value="other">Not sure / Other Electrical Need</option>
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

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="field-message"
                    className="text-[13px] font-semibold text-[#14295C] uppercase tracking-wider"
                  >
                    Message *
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
                    placeholder="Describe your project, timeline, and location..."
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
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Information Cards & Social */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="font-display text-[#14295C] text-[24px] sm:text-[28px] uppercase tracking-wide mb-3">
                Contact us
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#5B6475] leading-relaxed">
                Have questions or need a service estimate? Our team is here to assist. Submit your enquiry or reach out directly by phone or email.
              </p>
            </div>

            {/* 2x2 Grid of Info Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactInfoCard
                icon={MapPin}
                label="Address"
                value={siteContent.contact.address}
              />
              <ContactInfoCard
                icon={Phone}
                label="Mobile"
                value={siteContent.contact.phoneDisplay}
                href={siteContent.contact.phoneTel}
              />
              <ContactInfoCard
                icon={Clock}
                label="Availability"
                value={siteContent.contact.availability}
              />
              <ContactInfoCard
                icon={Mail}
                label="Email"
                value={siteContent.contact.email}
                href={`mailto:${siteContent.contact.email}`}
              />
            </div>

            {/* Social Media Row with 4 yellow circle icons */}
            <div className="pt-2 flex flex-col gap-2">
              <span className="text-[12px] font-bold tracking-wider uppercase text-[#5B6475]">
                Social Media
              </span>
              <SocialLinks variant="yellow-circle" />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
