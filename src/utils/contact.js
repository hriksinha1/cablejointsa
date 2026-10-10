/**
 * Contact utility helpers for Cablejointsa.
 * Pure utility functions for building phone links and map URLs without external APIs.
 */

/**
 * Normalizes a phone number into an RFC 3966 click-to-call tel: URI.
 * @param {string} phoneTel - Raw international or local tel string
 * @returns {string} tel: href string
 */
export function buildTelHref(phoneTel) {
  if (!phoneTel) return "tel:+966570477234";
  const cleaned = phoneTel.trim();
  if (cleaned.startsWith("tel:")) return cleaned;
  return `tel:${cleaned.startsWith("+") ? cleaned : `+${cleaned}`}`;
}

/**
 * Builds a search query URL on Google Maps from an address string without using coordinates or API keys.
 * @param {string} addressFull - Full physical address string
 * @returns {string} Encoded Google Maps search URL
 */
export function buildMapsUrl(addressFull) {
  if (!addressFull) return "https://www.google.com/maps";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressFull.trim())}`;
}

/**
 * Validates Saudi phone numbers and international standard formats.
 * Accepts:
 *  - 05XXXXXXXX (10 digits starting with 05)
 *  - +9665XXXXXXXX or 9665XXXXXXXX
 *  - General 7 to 15 digits with optional +, spaces, hyphens
 * @param {string} value
 * @returns {boolean}
 */
export function isValidPhone(value) {
  if (!value) return false;
  const trimmed = value.trim();
  // Saudi local mobile format: 05 followed by 8 digits
  const saudiLocalRegex = /^05\d{8}$/;
  // Saudi international format: +9665XXXXXXXX or 9665XXXXXXXX
  const saudiIntlRegex = /^(\+?966)5\d{8}$/;

  const digitsOnly = trimmed.replace(/\D/g, "");
  if (saudiLocalRegex.test(digitsOnly) || saudiIntlRegex.test(digitsOnly)) {
    return true;
  }

  // General international fallback (7-15 digits)
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}
