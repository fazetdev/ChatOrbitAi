export type ContactStatus =
  | "active"
  | "inactive"
  | "blocked";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  status: ContactStatus;
  tags: string[];
  lastActive?: string;
}
