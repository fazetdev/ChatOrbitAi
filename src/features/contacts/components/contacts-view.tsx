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

import { toast } from "@/components/shared/toast";

function ContactsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 w-1/3 bg-muted rounded" />
      <div className="h-10 w-full bg-muted rounded" />
      <div className="h-64 w-full bg-muted rounded" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-sm text-destructive font-medium">
        Failed to load contacts
      </p>
      <button
        onClick={onRetry}
        className="mt-3 text-sm underline text-primary"
      >
        Retry
      </button>
    </div>
  );
}

export default function ContactsView(): React.JSX.Element {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [search, setSearch] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);

  const [selected, setSelected] = React.useState<Contact | null>(null);

  const loadContacts = React.useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      setTimeout(() => {
        setContacts(mockContacts);
        setIsLoading(false);
        toast.success("Contacts loaded");
      }, 300);
    } catch (e) {
      setError("Failed to load contacts");
      setIsLoading(false);
      toast.error("Failed to load contacts");
    }
  }, []);

  React.useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return contacts;

    return contacts.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.company ?? "").toLowerCase().includes(q)
    );
  }, [search, contacts]);

  const hasContacts = contacts.length > 0;
  const hasResults = filtered.length > 0;

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

    toast.info("Contacts exported");
  }

  function handleCreate(values: any) {
    setContacts((p) => [{ id: crypto.randomUUID(), ...values }, ...p]);
    setOpenAdd(false);
    toast.success("Contact created");
  }

  function handleUpdate(values: any) {
    if (!selected) return;

    setContacts((p) =>
      p.map((c) => (c.id === selected.id ? { ...c, ...values } : c))
    );

    setOpenEdit(false);
    toast.success("Contact updated");
  }

  function handleRemove() {
    if (!selected) return;

    setContacts((p) => p.filter((c) => c.id !== selected.id));
    setOpenDelete(false);
    toast.success("Contact deleted");
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

      {isLoading ? (
        <ContactsSkeleton />
      ) : error ? (
        <ErrorState onRetry={loadContacts} />
      ) : !hasContacts ? (
        <EmptyState
          icon={Users}
          title="No contacts yet"
          description="Add your first contact to get started."
        />
      ) : !hasResults ? (
        <EmptyState
          icon={Users}
          title="No results found"
          description="Try a different search term."
        />
      ) : (
        <ContactsTable
          contacts={filtered}
          isLoading={isLoading}
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
