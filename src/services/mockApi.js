import { isValidPhone } from "../utils/contact";

/**
 * Mock API service layer for client-side demo submission.
 * Validates the contact form payload and returns simulated responses without external network calls.
 */

export const mockApi = {
  /**
   * Submits a demo service enquiry.
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} [payload.email]
   * @param {string} payload.phone
   * @param {string} payload.service
   * @param {string} payload.message
   * @returns {Promise<{ ok: boolean, referenceId: string, delivered: boolean }>}
   */
  async submitEnquiry(payload) {
    // Simulate real network latency (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { name, email, phone, service, message } = payload || {};

    if (!name || name.trim().length < 2) {
      throw new Error("Please enter your name.");
    }

    if (!phone || !isValidPhone(phone)) {
      throw new Error("Enter a phone number we can call, for example 05XXXXXXXX.");
    }

    if (email && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error("That email address doesn't look right.");
      }
    }

    if (!service || service === "") {
      throw new Error("Choose the service you need.");
    }

    if (!message || message.trim().length < 10) {
      throw new Error("Add a few details about the work (at least 10 characters).");
    }

    // Generate readable random demo reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `DEMO-${randomSuffix}`;

    return {
      ok: true,
      referenceId,
      delivered: false,
    };
  },
};
