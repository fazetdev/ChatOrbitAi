"use client";

import { DataTable } from "@/components/shared/data-table";
import type { Contact } from "../types";
import { createContactsColumns } from "./contacts-columns";

interface Props {
  contacts: Contact[];
  onView?: (c: Contact) => void;
  onEdit?: (c: Contact) => void;
  onDelete?: (c: Contact) => void;
  isLoading?: boolean;
}

function ContactsTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-full bg-muted rounded animate-pulse"
        />
      ))}
    </div>
  );
}

export default function ContactsTable({
  contacts,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
}: Props): React.JSX.Element {
  const columns = createContactsColumns({
    onView,
    onEdit,
    onDelete,
  });

  if (isLoading) {
    return <ContactsTableSkeleton />;
  }

  return <DataTable columns={columns} data={contacts} />;
}
