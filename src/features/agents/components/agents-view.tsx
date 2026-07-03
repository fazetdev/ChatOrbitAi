"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { agentsService } from "../services";
import type { Agent } from "../types";
import type { AgentFormValues } from "../schemas";

import AgentsToolbar from "./agents-toolbar";
import { AgentsTable } from "./agents-table";

import AddAgentDialog from "./add-agent-dialog";
import EditAgentDialog from "./edit-agent-dialog";
import DeleteAgentDialog from "./delete-agent-dialog";
import AgentDetailsSheet from "./agent-details-sheet";

export function AgentsView(): React.JSX.Element {
  const [data, setData] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [selected, setSelected] = useState<Agent | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await agentsService.getAgents();
      setData(result);
      setLoading(false);
    }

    load();
  }, []);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return data;

    return data.filter(
      (agent) =>
        agent.name.toLowerCase().includes(q) ||
        (agent.description ?? "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const isEmpty = !loading && filteredData.length === 0;

  /* -----------------------------
   * ACTION HANDLERS
   * ----------------------------- */

  function handleCreate(values: AgentFormValues) {
    const now = new Date().toISOString();

    const newAgent: Agent = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      status: values.status,
      config: {
        tone: values.tone,
        systemPrompt: values.systemPrompt,
      },
      createdAt: now,
      updatedAt: now,
    };

    setData((prev) => [newAgent, ...prev]);
    setOpenAdd(false);
  }

  function handleUpdate(values: AgentFormValues) {
    if (!selected) return;

    setData((prev) =>
      prev.map((a) =>
        a.id === selected.id
          ? {
              ...a,
              name: values.name,
              description: values.description,
              status: values.status,
              config: {
                tone: values.tone,
                systemPrompt: values.systemPrompt,
              },
              updatedAt: new Date().toISOString(),
            }
          : a
      )
    );

    setOpenEdit(false);
    setSelected(null);
  }

  function handleDeleteConfirm() {
    if (!selected) return;

    setData((prev) => prev.filter((a) => a.id !== selected.id));
    setOpenDelete(false);
    setSelected(null);
  }

  /* -----------------------------
   * TABLE ACTIONS (SAFE NAMES)
   * ----------------------------- */

  function onView(agent: Agent) {
    setSelected(agent);
    setOpenView(true);
  }

  function onEdit(agent: Agent) {
    setSelected(agent);
    setOpenEdit(true);
  }

  function onDelete(agent: Agent) {
    setSelected(agent);
    setOpenDelete(true);
  }

  return (
    <>
      <PageHeader
        title="Agents"
        description="Configure AI agents that define behavior, identity, and response settings."
      />

      <AgentsToolbar
        search={search}
        onSearchChange={setSearch}
        onAddAgent={() => setOpenAdd(true)}
      />

      {loading ? (
        <div className="p-4 text-sm text-muted-foreground">
          Loading agents...
        </div>
      ) : isEmpty ? (
        <EmptyState
          icon={Bot}
          title="No agents found"
          description="Try adjusting your search or create a new AI agent."
        />
      ) : (
        <AgentsTable
          data={filteredData}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      {/* Dialogs */}
      <AddAgentDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSubmit={handleCreate}
      />

      <EditAgentDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        agent={selected}
        onSubmit={handleUpdate}
      />

      <DeleteAgentDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        agent={selected}
        onConfirm={handleDeleteConfirm}
      />

      <AgentDetailsSheet
        open={openView}
        onOpenChange={setOpenView}
        agent={selected}
      />
    </>
  );
}
