"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";

import type { KnowledgeBase } from "../types";

interface Actions {
  onView?: (row: KnowledgeBase) => void;
  onEdit?: (row: KnowledgeBase) => void;
  onDelete?: (row: KnowledgeBase) => void;
}

export const createKnowledgeBaseColumns = (
  actions?: Actions
): ColumnDef<KnowledgeBase>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
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
