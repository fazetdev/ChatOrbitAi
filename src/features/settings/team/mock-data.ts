import type { TeamMember } from "./types";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Fazet Dev",
    email: "owner@whatsappai.com",
    role: "owner",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Aisha Bello",
    email: "aisha@whatsappai.com",
    role: "admin",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "John Musa",
    email: "john@whatsappai.com",
    role: "agent",
    status: "invited",
    lastActive: "Never",
  },
];
