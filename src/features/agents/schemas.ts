import { z } from "zod";

import { AGENT_STATUSES, AGENT_TONES } from "./constants";

export const agentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  systemPrompt: z.string().min(10, "System prompt is required"),
  tone: z.enum(AGENT_TONES),
  status: z.enum(AGENT_STATUSES),
});

export type AgentFormValues = z.infer<typeof agentSchema>;
