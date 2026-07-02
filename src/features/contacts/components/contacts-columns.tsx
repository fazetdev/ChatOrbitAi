"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import {
  DataTableColumnHeader,
  DataTableRowActions,
} from "@/components/shared/data-table";

import type { Contact } from "../types";

export const createContactsColumns = (actions?: any): ColumnDef<Contact>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
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
    accessorKey: "lastActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Active" />
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
