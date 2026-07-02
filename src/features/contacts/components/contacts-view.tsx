"use client";

import * as React from "react";
import { Users } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { mockContacts } from "../mock-data";
import type { Contact } from "../types";

import ContactsToolbar from "./contacts-toolbar";
import ContactsTable from "./contacts-table";

import AddContactDialog from "./add-contact-dialog";
import EditContactDialog from "./edit-contact-dialog";
import DeleteContactDialog from "./delete-contact-dialog";
import ContactDetailsSheet from "./contact-details-sheet";

export default function ContactsView(): React.JSX.Element {
  const [contacts, setContacts] = React.useState<Contact[]>(mockContacts);
  const [search, setSearch] = React.useState("");

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);

  const [selected, setSelected] = React.useState<Contact | null>(null);

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return contacts;

    return contacts.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.company ?? "").toLowerCase().includes(q)
    );
  }, [search, contacts]);

  function exportCSV() {
    const header = ["Name", "Phone", "Email", "Company", "Status"];
    const rows = filtered.map((c) => [
      c.name,
      c.phone,
      c.email ?? "",
      c.company ?? "",
      c.status,
    ]);

    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
  }

  function handleCreate(values: any) {
    setContacts((p) => [{ id: crypto.randomUUID(), ...values }, ...p]);
    setOpenAdd(false);
  }

  function handleUpdate(values: any) {
    if (!selected) return;

    setContacts((p) =>
      p.map((c) => (c.id === selected.id ? { ...c, ...values } : c))
    );

    setOpenEdit(false);
  }

  function handleRemove() {
    if (!selected) return;

    setContacts((p) => p.filter((c) => c.id !== selected.id));
    setOpenDelete(false);
  }

  return (
    <>
      <PageHeader
        title="Contacts"
        description="Manage all your WhatsApp contacts in one place."
      />

      <ContactsToolbar
        search={search}
        onSearchChange={setSearch}
        onAddContact={() => setOpenAdd(true)}
        onExport={exportCSV}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No contacts found"
          description="Try adjusting your search or add a new contact."
        />
      ) : (
        <ContactsTable
          contacts={filtered}
          onView={(c) => {
            setSelected(c);
            setOpenView(true);
          }}
          onEdit={(c) => {
            setSelected(c);
            setOpenEdit(true);
          }}
          onDelete={(c) => {
            setSelected(c);
            setOpenDelete(true);
          }}
        />
      )}

      <AddContactDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSubmit={handleCreate}
      />

      <EditContactDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        contact={selected}
        onSubmit={handleUpdate}
      />

      <DeleteContactDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        contact={selected}
        onConfirm={handleRemove}
      />

      <ContactDetailsSheet
        open={openView}
        onOpenChange={setOpenView}
        contact={selected}
      />
    </>
  );
}
