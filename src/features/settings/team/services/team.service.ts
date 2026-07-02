import type { TeamMember } from "../types";
import { mockTeamMembers } from "../mock-data";

/**
 * Mock DB (will be replaced by FastAPI later)
 */
let db: TeamMember[] = [...mockTeamMembers];

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Get all team members
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  await delay(600);
  return db;
}

/**
 * Invite new member (mock)
 */
export async function inviteMember(member: TeamMember): Promise<TeamMember> {
  await delay(600);

  db = [member, ...db];
  return member;
}

/**
 * Update member role or status
 */
export async function updateMember(
  id: string,
  updates: Partial<TeamMember>
): Promise<TeamMember | null> {
  await delay(600);

  let updated: TeamMember | null = null;

  db = db.map((m) => {
    if (m.id === id) {
      updated = { ...m, ...updates };
      return updated;
    }
    return m;
  });

  return updated;
}

/**
 * Remove member
 */
export async function removeMember(id: string): Promise<boolean> {
  await delay(600);

  const initialLength = db.length;
  db = db.filter((m) => m.id !== id);

  return db.length < initialLength;
}
