export type TeamRole = "owner" | "admin" | "agent";

export type TeamStatus = "active" | "invited" | "suspended";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamStatus;
  lastActive?: string;
};
