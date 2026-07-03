"use client";

import { DataTable } from "@/components/shared/data-table";

import type { Agent } from "../types";
import { createAgentsColumns } from "./agents-columns";

interface Props {
  data: Agent[];
  onView?: (agent: Agent) => void;
  onEdit?: (agent: Agent) => void;
  onDelete?: (agent: Agent) => void;
}

export function AgentsTable({
  data,
  onView,
  onEdit,
  onDelete,
}: Props): React.JSX.Element {
  const columns = createAgentsColumns({
    onView,
    onEdit,
    onDelete,
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No agents found."
    />
  );
}
