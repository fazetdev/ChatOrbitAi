import type { APIIntegrationsConfig } from "./types";

export const mockIntegrationsConfig: APIIntegrationsConfig = {
  apiKeys: {
    aiProviderKey: "sk-mock-ai-key-123456",
    whatsappApiKey: "wa-mock-key-abcdef",
    webhookSecret: "whsec_mock_secret_987654",
  },

  endpoints: {
    baseApiUrl: "http://localhost:8000",
    webhookUrl: "http://localhost:8000/webhooks/whatsapp",
    environment: "development",
  },

  status: {
    whatsapp: "disconnected",
    ai: "active",
    webhooks: "disabled",
  },

  features: {
    aiIntegration: true,
    whatsappIntegration: true,
    webhookIntegration: false,
  },
};
