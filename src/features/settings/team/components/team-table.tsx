"use client";

import * as React from "react";
import { TeamMember } from "../types";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  members: TeamMember[];
  onUpdate: (id: string, updates: Partial<TeamMember>) => void;
  onRemove: (id: string) => void;
};

export default function TeamTable({
  members,
  onUpdate,
  onRemove,
}: Props): React.JSX.Element {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.email}</td>

                <td className="p-3">
                  <select
                    value={m.role}
                    onChange={(e) =>
                      onUpdate(m.id, { role: e.target.value as any })
                    }
                    className="rounded border px-2 py-1 text-sm"
                  >
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                    <option value="agent">Agent</option>
                  </select>
                </td>

                <td className="p-3 capitalize">{m.status}</td>

                <td className="p-3">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemove(m.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
