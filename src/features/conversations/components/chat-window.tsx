"use client";

import * as React from "react";
import { runAutomationEngine } from "../lib/automation-simulator";
import type { Message } from "../types";

import MessageBubble from "./message-bubble";

export default function ChatWindow(): React.JSX.Element {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || sending) return;

    setSending(true);

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
    setSending(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b text-xs text-muted-foreground">
        Conversation Timeline View (User → Automation → AI)
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => {
          const prev = messages[i - 1];
          const isGroupStart = !prev || prev.sender !== m.sender;

          return (
            <div key={m.id} className={isGroupStart ? "mt-2" : "mt-0"}>
              <MessageBubble message={m} />
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
          aria-label="Message input"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
        />

        <button
          onClick={handleSend}
          disabled={sending || !input.trim()}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
