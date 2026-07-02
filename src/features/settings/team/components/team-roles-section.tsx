"use client";

import * as React from "react";
import { Users } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { useTeamRoles } from "../hooks/use-team-roles";
import TeamToolbar from "./team-toolbar";
import TeamTable from "./team-table";

export default function TeamRolesSection(): React.JSX.Element {
  const {
    members,
    loading,
    error,
    invite,
    update,
    remove,
  } = useTeamRoles();

  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return members;

    return members.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q)
    );
  }, [members, search]);

  return (
    <>
      <PageHeader
        title="Team & Roles"
        description="Manage workspace members and their permissions."
      />

      <TeamToolbar
        search={search}
        onSearchChange={setSearch}
        onInvite={invite}
      />

      {loading ? (
        <div className="text-sm text-muted-foreground">
          Loading team members...
        </div>
      ) : error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members found"
          description="Invite team members to start collaborating."
        />
      ) : (
        <TeamTable
          members={filtered}
          onUpdate={update}
          onRemove={remove}
        />
      )}
    </>
  );
}
