export type WhatsAppConfig = {
  connection: {
    status: "connected" | "disconnected";
    phoneNumber?: string;
  };

  messaging: {
    autoReply: boolean;
    typingIndicator: boolean;
    readReceipts: boolean;
  };

  webhook: {
    url: string;
    secret: string;
  };

  limits: {
    dailyMessageLimit: number;
  };
};
