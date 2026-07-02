"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";

import type { Automation } from "../types";
import {
  AUTOMATION_STATUS_LABEL,
  AUTOMATION_TYPE_LABEL,
} from "../constants";

interface Actions {
  onEdit?: (a: Automation) => void;
  onDelete?: (a: Automation) => void;
}

function formatTrigger(trigger: Automation["trigger"]) {
  switch (trigger.type) {
    case "keyword":
      return `Keyword: "${trigger.config.keyword}"`;
    case "first-message":
      return "First message";
    case "business-hours":
      return "Business hours";
    case "new-contact":
      return "New contact";
    default:
      return "—";
  }
}

export const createAutomationsColumns = (
  actions?: Actions
): ColumnDef<Automation>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <span>{AUTOMATION_TYPE_LABEL[row.original.type]}</span>
    ),
  },
  {
    accessorKey: "trigger",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trigger" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatTrigger(row.original.trigger)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge>{AUTOMATION_STATUS_LABEL[row.original.status]}</Badge>
    ),
  },
  {
    accessorKey: "lastRun",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Run" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        onEdit={actions?.onEdit}
        onDelete={actions?.onDelete}
      />
    ),
  },
];
