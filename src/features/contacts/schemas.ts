import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  company: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["active", "inactive", "blocked"]),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
