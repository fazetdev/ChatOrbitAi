import type { AutomationStatus, AutomationType } from "./types";

export const AUTOMATION_STATUS: AutomationStatus[] = [
  "draft",
  "active",
  "paused",
  "disabled",
  "archived",
  "error",
];

export const AUTOMATION_TYPES: AutomationType[] = [
  "welcome",
  "keyword",
  "ai-assistant",
  "follow-up",
  "out-of-office",
  "lead",
  "support",
  "appointment",
];

export const AUTOMATION_STATUS_LABEL: Record<AutomationStatus, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  disabled: "Disabled",
  archived: "Archived",
  error: "Error",
};

export const AUTOMATION_TYPE_LABEL: Record<AutomationType, string> = {
  welcome: "Welcome",
  keyword: "Keyword Reply",
  "ai-assistant": "AI Assistant",
  "follow-up": "Follow Up",
  "out-of-office": "Out of Office",
  lead: "Lead",
  support: "Support",
  appointment: "Appointment",
};
