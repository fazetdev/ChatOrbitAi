import { z } from "zod";

export const knowledgeBaseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  content: z.string().min(10, "Content is required"),
  status: z.enum(["active", "inactive"]),
});

export type KnowledgeBaseFormValues = z.infer<typeof knowledgeBaseSchema>;
