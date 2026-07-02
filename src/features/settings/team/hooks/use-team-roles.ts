"use client";

import * as React from "react";
import type { TeamMember, TeamRole } from "../types";

import {
  getTeamMembers,
  inviteMember,
  updateMember,
  removeMember,
} from "../services/team.service";

export function useTeamRoles() {
  const [members, setMembers] = React.useState<TeamMember[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getTeamMembers();
        if (mounted) setMembers(data);
      } catch {
        setError("Failed to load team members.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  async function invite(name: string, email: string, role: TeamRole) {
    setSaving(true);
    setError(null);

    try {
      const newMember: TeamMember = {
        id: crypto.randomUUID(),
        name,
        email,
        role,
        status: "invited",
        lastActive: "Never",
      };

      const created = await inviteMember(newMember);

      setMembers((prev) => [created, ...prev]);
    } catch {
      setError("Failed to invite member.");
    } finally {
      setSaving(false);
    }
  }

  async function update(id: string, updates: Partial<TeamMember>) {
    setSaving(true);
    setError(null);

    try {
      const updated = await updateMember(id, updates);

      if (updated) {
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? updated : m))
        );
      }
    } catch {
      setError("Failed to update member.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    setSaving(true);
    setError(null);

    try {
      const ok = await removeMember(id);

      if (ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      }
    } catch {
      setError("Failed to remove member.");
    } finally {
      setSaving(false);
    }
  }

  return {
    members,
    loading,
    saving,
    error,
    invite,
    update,
    remove,
  };
}
