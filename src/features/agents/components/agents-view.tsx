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

function AgentsSkeleton() {
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
        Failed to load agents
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

export function AgentsView(): React.JSX.Element {
  const [data, setData] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [selected, setSelected] = useState<Agent | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await agentsService.getAgents();
        setData(result);
      } catch (e) {
        setError("Failed to load agents");
      } finally {
        setLoading(false);
      }
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

  function handleRetry() {
    setLoading(true);
    setError(null);
    agentsService.getAgents().then((result) => {
      setData(result);
      setLoading(false);
    });
  }

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
        <AgentsSkeleton />
      ) : error ? (
        <ErrorState onRetry={handleRetry} />
      ) : isEmpty ? (
        <EmptyState
          icon={Bot}
          title="No agents found"
          description="Try adjusting your search or create a new AI agent."
        />
      ) : (
        <AgentsTable
          data={filteredData}
          isLoading={loading}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

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
