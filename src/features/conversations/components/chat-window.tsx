"use client";

import * as React from "react";
import { runAutomationEngine } from "../lib/automation-simulator";
import type { Message } from "../types";

import MessageBubble from "./message-bubble";

export default function ChatWindow(): React.JSX.Element {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");

  async function handleSend() {
    if (!input.trim()) return;

    const events = runAutomationEngine(input);

    const newMessages: Message[] = [];

    for (const event of events) {
      if (event.type === "user-message") {
        newMessages.push({
          id: crypto.randomUUID(),
          content: event.content,
          sender: "user",
          createdAt: new Date().toISOString(),
        });
      }

      if (event.type === "system") {
        newMessages.push({
          id: crypto.randomUUID(),
          content: `⚙ ${event.content}`,
          sender: "system",
          createdAt: new Date().toISOString(),
        });
      }

      if (event.type === "ai-message") {
        await new Promise((r) => setTimeout(r, 600));

        newMessages.push({
          id: crypto.randomUUID(),
          content: event.content,
          sender: "ai",
          createdAt: new Date().toISOString(),
        });
      }
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-full">
      {/* HEADER TIMELINE INDICATOR */}
      <div className="px-4 py-2 border-b text-xs text-muted-foreground">
        Conversation Timeline View (User → Automation → AI)
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => {
          const isSystem = m.sender === "system";
          const prev = messages[i - 1];

          const isGroupStart =
            !prev || prev.sender !== m.sender;

          return (
            <div key={m.id} className={isGroupStart ? "mt-2" : "mt-0"}>
              <MessageBubble message={m} />
            </div>
          );
        })}
      </div>

      {/* input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
