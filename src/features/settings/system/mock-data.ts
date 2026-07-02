import type { SystemPreferencesConfig } from "./types";

export const mockSystemPreferencesConfig: SystemPreferencesConfig = {
  ui: {
    theme: "system",
    language: "en",
    dateFormat: "DD/MM/YYYY",
    defaultLandingPage: "dashboard",
  },

  data: {
    autoSave: true,
    refreshIntervalSeconds: 30,
    defaultPageSize: 20,
  },

  system: {
    debugMode: false,
    apiLoggingLevel: "basic",
    backgroundSync: true,
  },

  workspaceDefaults: {
    defaultAiModel: "gemini-2.5-flash",
    defaultMessageMode: "auto",
    defaultWhatsAppMode: "api",
  },
};
