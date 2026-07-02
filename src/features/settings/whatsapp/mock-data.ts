import type { WhatsAppConfig } from "./types";

export const mockWhatsAppConfig: WhatsAppConfig = {
  connection: {
    status: "disconnected",
    phoneNumber: "",
  },

  messaging: {
    autoReply: true,
    typingIndicator: true,
    readReceipts: true,
  },

  webhook: {
    url: "",
    secret: "whsec_mock_123456",
  },

  limits: {
    dailyMessageLimit: 100,
  },
};
