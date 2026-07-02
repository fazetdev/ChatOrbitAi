"use client";

import * as React from "react";
import { Bot } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { mockAutomations } from "../mock-data";
import type { Automation } from "../types";

import AutomationsToolbar from "./automations-toolbar";
import AutomationsTable from "./automations-table";
import AddAutomationDialog from "./add-automation-dialog";
import EditAutomationDialog from "./edit-automation-dialog";
import DeleteAutomationDialog from "./delete-automation-dialog";
import AutomationDetailsSheet from "./automation-details-sheet";

export default function AutomationsView(): React.JSX.Element {
  const [automations, setAutomations] =
    React.useState<Automation[]>(mockAutomations);

  const [search, setSearch] = React.useState("");

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);

  const [selected, setSelected] = React.useState<Automation | null>(null);

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return automations;

    return automations.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.status.toLowerCase().includes(q)
    );
  }, [search, automations]);

  function handleCreate(a: Automation) {
    setAutomations((p) => [a, ...p]);
  }

  function handleUpdate(a: Automation) {
    setAutomations((p) =>
      p.map((x) => (x.id === a.id ? a : x))
    );
  }

  function handleDelete(a: Automation) {
    setAutomations((p) => p.filter((x) => x.id !== a.id));
  }

  return (
    <>
      <PageHeader
        title="Automations"
        description="Manage AI-powered WhatsApp workflows."
      />

      <AutomationsToolbar
        search={search}
        onSearchChange={setSearch}
        onAddAutomation={() => setOpenAdd(true)}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={Bot}
          title="No automations found"
          description="Create your first automation to get started."
        />
      ) : (
        <AutomationsTable
          automations={filtered}
          onEdit={(a) => {
            setSelected(a);
            setOpenEdit(true);
          }}
          onDelete={(a) => {
            setSelected(a);
            setOpenDelete(true);
          }}
          onView={(a) => {
            setSelected(a);
            setOpenView(true);
          }}
        />
      )}

      <AddAutomationDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onCreate={handleCreate}
      />

      <EditAutomationDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        automation={selected}
        onUpdate={handleUpdate}
      />

      <DeleteAutomationDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        automation={selected}
        onDelete={handleDelete}
      />

      <AutomationDetailsSheet
        open={openView}
        onOpenChange={setOpenView}
        automation={selected}
      />
    </>
  );
}
