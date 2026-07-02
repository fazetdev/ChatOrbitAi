export type SystemPreferencesConfig = {
  ui: {
    theme: "light" | "dark" | "system";
    language: "en" | "ar";
    dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY";
    defaultLandingPage: "dashboard" | "contacts" | "conversations";
  };

  data: {
    autoSave: boolean;
    refreshIntervalSeconds: number;
    defaultPageSize: number;
  };

  system: {
    debugMode: boolean;
    apiLoggingLevel: "basic" | "verbose";
    backgroundSync: boolean;
  };

  workspaceDefaults: {
    defaultAiModel: string;
    defaultMessageMode: "auto" | "manual";
    defaultWhatsAppMode: "api" | "session";
  };
};
