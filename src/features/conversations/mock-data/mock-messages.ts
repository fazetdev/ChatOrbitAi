export type Message = {
  id: string;
  conversationId: string;
  sender: "user" | "contact";
  text: string;
  timestamp: string;
};

export const mockMessages: Message[] = [
  {
    id: "m1",
    conversationId: "conv_1",
    sender: "contact",
    text: "Hey, did you check the document?",
    timestamp: "2026-07-01T10:00:00Z",
  },
  {
    id: "m2",
    conversationId: "conv_1",
    sender: "user",
    text: "Yes, I am going through it now.",
    timestamp: "2026-07-01T10:05:00Z",
  },
  {
    id: "m3",
    conversationId: "conv_1",
    sender: "contact",
    text: "Got it, I will review the document.",
    timestamp: "2026-07-01T10:15:00Z",
  },

  {
    id: "m4",
    conversationId: "conv_2",
    sender: "contact",
    text: "Send me the updated UI design.",
    timestamp: "2026-07-01T09:40:00Z",
  },

  {
    id: "m5",
    conversationId: "conv_3",
    sender: "contact",
    text: "Are we still on for tomorrow?",
    timestamp: "2026-07-01T08:25:00Z",
  },
  {
    id: "m6",
    conversationId: "conv_3",
    sender: "user",
    text: "Yes, same time works.",
    timestamp: "2026-07-01T08:30:00Z",
  },

  {
    id: "m7",
    conversationId: "conv_4",
    sender: "contact",
    text: "Payment received, thank you.",
    timestamp: "2026-06-30T18:10:00Z",
  },
];
