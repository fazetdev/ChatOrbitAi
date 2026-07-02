export type Conversation = {
  id: string;
  contactId: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  sender: "user" | "contact";
  text: string;
  timestamp: string;
};
