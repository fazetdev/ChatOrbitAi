export type APIIntegrationsConfig = {
  apiKeys: {
    aiProviderKey: string;
    whatsappApiKey: string;
    webhookSecret: string;
  };

  endpoints: {
    baseApiUrl: string;
    webhookUrl: string;
    environment: "development" | "production";
  };

  status: {
    whatsapp: "connected" | "disconnected";
    ai: "active" | "inactive";
    webhooks: "enabled" | "disabled";
  };

  features: {
    aiIntegration: boolean;
    whatsappIntegration: boolean;
    webhookIntegration: boolean;
  };
};
