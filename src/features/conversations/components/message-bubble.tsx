"use client";

import type { Message } from "../types";

export default function MessageBubble({
  message,
}: {
  message: Message;
}): React.JSX.Element {
  const isUser = message.sender === "user";
  const isAI = message.sender === "ai";
  const isSystem = message.sender === "system";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[70%] px-3 py-2 rounded-lg text-sm
          ${
            isUser
              ? "bg-black text-white"
              : isAI
              ? "bg-green-100 text-black"
              : "bg-gray-100 text-gray-600 text-xs border"
          }
        `}
      >
        <div className="text-[10px] uppercase opacity-60 mb-1">
          {message.sender}
        </div>

        {message.content}
      </div>
    </div>
  );
}
