export type Conversation = {
  id: string;
  contactId: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
};

export const mockConversations: Conversation[] = [
  {
    id: "conv_1",
    contactId: "1",
    lastMessage: "Got it, I will review the document.",
    unreadCount: 2,
    updatedAt: "2026-07-01T10:15:00Z",
  },
  {
    id: "conv_2",
    contactId: "2",
    lastMessage: "Send me the updated UI design.",
    unreadCount: 0,
    updatedAt: "2026-07-01T09:40:00Z",
  },
  {
    id: "conv_3",
    contactId: "3",
    lastMessage: "Are we still on for tomorrow?",
    unreadCount: 5,
    updatedAt: "2026-07-01T08:25:00Z",
  },
  {
    id: "conv_4",
    contactId: "1",
    lastMessage: "Payment received, thank you.",
    unreadCount: 0,
    updatedAt: "2026-06-30T18:10:00Z",
  },
];
