"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  onInvite: (name: string, email: string, role: "owner" | "admin" | "agent") => void;
};

export default function TeamToolbar({
  search,
  onSearchChange,
  onInvite,
}: Props): React.JSX.Element {
  function handleInvite() {
    // simple mock invite for now
    const name = prompt("Name?");
    const email = prompt("Email?");
    const role = prompt("Role: owner | admin | agent") as
      | "owner"
      | "admin"
      | "agent";

    if (name && email && role) {
      onInvite(name, email, role);
    }
  }

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search team..."
        className="w-full max-w-sm rounded-md border px-3 py-2 text-sm"
      />

      <Button onClick={handleInvite}>
        Invite Member
      </Button>
    </div>
  );
}
