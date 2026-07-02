export type AutomationStatus =
  | "draft"
  | "active"
  | "paused"
  | "disabled"
  | "archived"
  | "error";

export type AutomationType =
  | "welcome"
  | "keyword"
  | "ai-assistant"
  | "follow-up"
  | "out-of-office"
  | "lead"
  | "support"
  | "appointment";

export type AutomationTrigger =
  | {
      type: "keyword";
      config: {
        keyword: string;
      };
    }
  | {
      type: "first-message";
      config: Record<string, never>;
    }
  | {
      type: "business-hours";
      config: {
        timezone?: string;
      };
    }
  | {
      type: "new-contact";
      config: Record<string, never>;
    };

export interface Automation {
  id: string;
  name: string;
  description?: string;

  type: AutomationType;
  trigger: AutomationTrigger;

  status: AutomationStatus;

  createdAt: string;
  updatedAt: string;
  lastRun: string | null;
}
