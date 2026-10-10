/**
 * Frequently Asked Questions for Cablejointsa.
 * Answers utilize template tokens ({{services}}, {{phone}}, {{address}}, {{emergency}})
 * to ensure synchronization with the single source of truth in siteContent.js.
 */

export const faqs = [
  {
    id: "faq-1",
    question: "Which electrical services can I enquire about?",
    answer: "You can ask about {{services}}. If your need isn't listed, call {{phone}} and ask.",
  },
  {
    id: "faq-2",
    question: "How can I request a quote?",
    answer:
      "Use the enquiry form on this page or call {{phone}}. Describe the property, the work you need and your preferred timing so the team can discuss the scope with you.",
  },
  {
    id: "faq-3",
    question: "How can I contact Cablejointsa?",
    answer: "Call {{phone}}, send an enquiry through this page, or message us on Instagram or Facebook.",
  },
  {
    id: "faq-4",
    question: "Where is Cablejointsa located?",
    answer: "We're based at {{address}}.",
  },
  {
    id: "faq-5",
    question: "How do I find out whether my property is within your service area?",
    answer:
      "Share your district when you call or send an enquiry, and the team will tell you whether they can help.",
  },
  {
    id: "faq-6",
    question: "What should I include when I enquire?",
    answer:
      "Your name and phone number, whether it's a home or a business, the district, a short description of the work or problem, and when you'd like it done.",
  },
  {
    id: "faq-7",
    question: "What should I do if I notice a possible electrical hazard?",
    answer:
      "If you see sparks or smoke, smell burning, or find an outlet or cable that is very hot, keep away from it. Switch off power at the main breaker only if you can do so safely, and call {{emergency}} if there is fire or immediate danger. Don't try to repair electrical faults yourself; for non-urgent issues, ask a qualified electrician or call {{phone}} to discuss.",
  },
];
