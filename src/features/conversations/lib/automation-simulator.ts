import type { Automation } from "@/features/automations/types";
import { mockAutomations } from "@/features/automations/mock-data";

export type ConversationEvent =
  | { type: "user-message"; content: string }
  | { type: "automation-trigger"; automation: Automation }
  | { type: "ai-message"; content: string }
  | { type: "system"; content: string };

function matchAutomation(message: string, automation: Automation) {
  const text = message.toLowerCase();

  if (automation.type === "keyword") {
    const keyword = automation.trigger?.config?.keyword;
    return keyword && text.includes(keyword.toLowerCase());
  }

  if (automation.type === "welcome") return false;

  // TEMP RULE: simple fallback
  return automation.status === "active";
}

export function runAutomationEngine(message: string): ConversationEvent[] {
  const events: ConversationEvent[] = [];

  events.push({
    type: "user-message",
    content: message,
  });

  const matched = mockAutomations.filter((a) =>
    matchAutomation(message, a)
  );

  if (matched.length === 0) return events;

  const automation = matched[0];

  events.push({
    type: "automation-trigger",
    automation,
  });

  // simulate response delay behavior (frontend only)
  events.push({
    type: "system",
    content: `Automation "${automation.name}" triggered`,
  });

  events.push({
    type: "ai-message",
    content: `Auto-reply from ${automation.type} automation`,
  });

  return events;
}
