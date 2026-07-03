"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";

import type { Agent } from "../types";

interface Actions {
  onView?: (row: Agent) => void;
  onEdit?: (row: Agent) => void;
  onDelete?: (row: Agent) => void;
}

export const createAgentsColumns = (
  actions?: Actions
): ColumnDef<Agent>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agent" />
    ),
  },
  {
    accessorKey: "config.tone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tone" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.config.tone}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        onView={actions?.onView}
        onEdit={actions?.onEdit}
        onDelete={actions?.onDelete}
      />
    ),
  },
];
