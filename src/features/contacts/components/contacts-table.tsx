"use client";

import { DataTable } from "@/components/shared/data-table";
import type { Contact } from "../types";
import { createContactsColumns } from "./contacts-columns";

interface Props {
  contacts: Contact[];
  onView?: (c: Contact) => void;
  onEdit?: (c: Contact) => void;
  onDelete?: (c: Contact) => void;
}

export default function ContactsTable({
  contacts,
  onView,
  onEdit,
  onDelete,
}: Props): React.JSX.Element {
  const columns = createContactsColumns({
    onView,
    onEdit,
    onDelete,
  });

  return <DataTable columns={columns} data={contacts} />;
}
