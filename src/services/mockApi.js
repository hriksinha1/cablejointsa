/**
 * Mock API service layer for client-side demo submission.
 * Validates the contact form payload and returns simulated responses without external network calls.
 */

export const mockApi = {
  /**
   * Submits a demo service enquiry.
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.email
   * @param {string} payload.phone
   * @param {string} payload.service
   * @param {string} payload.message
   * @returns {Promise<{ ok: boolean, referenceId: string, delivered: boolean }>}
   */
  async submitEnquiry(payload) {
    // Simulate real network latency (1000ms)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Server-side simulation validation
    const { name, email, phone, service, message } = payload || {};

    if (!name || name.trim().length < 2) {
      throw new Error("Full name must be at least 2 characters.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      throw new Error("Please provide a valid email address.");
    }

    const digitsOnly = (phone || "").replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      throw new Error("Please enter a valid phone number (7 to 15 digits).");
    }

    if (!service || service === "") {
      throw new Error("Please select an electrical service.");
    }

    if (!message || message.trim().length < 10) {
      throw new Error("Message must be at least 10 characters.");
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
