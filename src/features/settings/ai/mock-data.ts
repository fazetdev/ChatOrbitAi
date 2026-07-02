import type { AIConfig } from "./types";

export const mockAIConfig: AIConfig = {
  assistantName: "Nova AI",
  tone: "friendly",
  responseLength: "medium",
  defaultLanguage: "English",
  fallbackLanguage: "English",
  systemPrompt:
    "You are a helpful AI assistant for a WhatsApp business platform. Respond clearly, professionally, and help users manage their business communication effectively.",

  features: {
    aiReplies: true,
    autoSuggestions: true,
    conversationSummary: true,
  },
};
