import type { Contact } from "./types";

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Ahmed Ali",
    phone: "+971501234567",
    email: "ahmed@example.com",
    company: "NovaTech",
    status: "active",
    tags: ["VIP"],
    lastActive: "2 minutes ago",
  },
  {
    id: "2",
    name: "Sarah Khan",
    phone: "+966501234567",
    email: "sarah@example.com",
    company: "Smart Solutions",
    status: "active",
    tags: ["Lead"],
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "John Doe",
    phone: "+2348012345678",
    email: "john@example.com",
    company: "Example Ltd",
    status: "inactive",
    tags: ["Trial"],
    lastActive: "Yesterday",
  },
];
