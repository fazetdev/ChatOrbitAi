"use client";

import { DataTable } from "@/components/shared/data-table";

import type { Agent } from "../types";
import { createAgentsColumns } from "./agents-columns";

interface Props {
  data: Agent[];
  onView?: (agent: Agent) => void;
  onEdit?: (agent: Agent) => void;
  onDelete?: (agent: Agent) => void;
  isLoading?: boolean;
}

function AgentsTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-full rounded bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

export function AgentsTable({
  data,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
}: Props): React.JSX.Element {
  const columns = createAgentsColumns({
    onView,
    onEdit,
    onDelete,
  });

  if (isLoading) {
    return <AgentsTableSkeleton />;
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No agents found."
    />
  );
}
