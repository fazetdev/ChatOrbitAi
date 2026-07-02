export type AITone = "formal" | "friendly" | "sales" | "neutral";

export type AIResponseLength = "short" | "medium" | "long";

export type AIConfig = {
  assistantName: string;
  tone: AITone;
  responseLength: AIResponseLength;
  defaultLanguage: string;
  fallbackLanguage: string;
  systemPrompt: string;

  features: {
    aiReplies: boolean;
    autoSuggestions: boolean;
    conversationSummary: boolean;
  };
};
