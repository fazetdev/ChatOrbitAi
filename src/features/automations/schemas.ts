import { z } from "zod";

export const automationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),

  type: z.enum([
    "welcome",
    "keyword",
    "ai-assistant",
    "follow-up",
    "out-of-office",
    "lead",
    "support",
    "appointment",
  ]),

  trigger: z.object({
    type: z.enum([
      "keyword",
      "first-message",
      "business-hours",
      "new-contact",
    ]),
    config: z.record(z.any()).default({}),
  }),

  status: z.enum([
    "draft",
    "active",
    "paused",
    "disabled",
    "archived",
    "error",
  ]),
});

export type AutomationFormValues = z.infer<typeof automationSchema>;
