"use client";

import { useMemo, useState } from "react";

import ConversationsSidebar from "./conversations-sidebar";
import ChatWindow from "./chat-window";

import { mockConversations } from "../mock-data/mock-conversations";
import { mockMessages } from "../mock-data/mock-messages";

import { mockContacts } from "@/features/contacts/mock-data";

export default function ConversationsLayout() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const [conversations, setConversations] = useState(
    [...mockConversations].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )
  );

  const contactMap = useMemo(() => {
    const map = new Map();

    mockContacts.forEach((contact) => {
      map.set(contact.id, contact);
    });

    return map;
  }, []);

  const enrichedConversations = useMemo(() => {
    return conversations.map((conversation) => {
      const contact = contactMap.get(conversation.contactId);

      return {
        ...conversation,
        contactName: contact?.name ?? conversation.contactId,
        phone: contact?.phone ?? "",
        contact,
      };
    });
  }, [conversations, contactMap]);

  const filteredConversations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return enrichedConversations;

    return enrichedConversations.filter(
      (conversation) =>
        conversation.contactName.toLowerCase().includes(query) ||
        conversation.phone.toLowerCase().includes(query)
    );
  }, [enrichedConversations, searchQuery]);

  const activeConversation = useMemo(() => {
    return (
      enrichedConversations.find(
        (conversation) => conversation.id === activeConversationId
      ) ?? null
    );
  }, [activeConversationId, enrichedConversations]);

  const activeMessages = useMemo(() => {
    if (!activeConversationId) return [];

    return messages.filter(
      (message) => message.conversationId === activeConversationId
    );
  }, [messages, activeConversationId]);

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unreadCount: 0 }
          : conversation
      )
    );
  };

  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;

    const now = new Date().toISOString();

    setMessages((prev) => [
      ...prev,
      {
        id: `m_${Date.now()}`,
        conversationId: activeConversationId,
        sender: "user" as const,
        text,
        timestamp: now,
      },
    ]);

    setConversations((prev) =>
      [...prev]
        .map((conversation) =>
          conversation.id === activeConversationId
            ? {
                ...conversation,
                lastMessage: text,
                updatedAt: now,
              }
            : conversation
        )
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() -
            new Date(a.updatedAt).getTime()
        )
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-[320px] border-r">
        <ConversationsSidebar
          conversations={filteredConversations}
          activeConversationId={activeConversationId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      <div className="flex-1">
        <ChatWindow
          messages={activeMessages}
          activeConversation={activeConversation}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
