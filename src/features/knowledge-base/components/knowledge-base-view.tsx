"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import EmptyState from "@/components/shared/empty-state";

import { knowledgeBaseService } from "../services";
import type { KnowledgeBase } from "../types";

import { KnowledgeBaseTable } from "./knowledge-base-table";
import KnowledgeBaseToolbar from "./knowledge-base-toolbar";
import KnowledgeBaseForm, {
  KnowledgeBaseFormValues,
} from "./knowledge-base-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function KnowledgeBaseView(): React.JSX.Element {
  const [data, setData] = useState<KnowledgeBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selected, setSelected] = useState<KnowledgeBase | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await knowledgeBaseService.getKnowledgeBases();
      setData(result);
      setLoading(false);
    }

    load();
  }, []);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return data;

    return data.filter((kb) =>
      kb.name.toLowerCase().includes(q) ||
      (kb.description ?? "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const isEmpty = !loading && filteredData.length === 0;

  function handleCreate(values: KnowledgeBaseFormValues) {
    const newItem: KnowledgeBase = {
      id: crypto.randomUUID(),
      ...values,
    } as KnowledgeBase;

    setData((prev) => [newItem, ...prev]);
    setOpenCreate(false);
  }

  function handleEdit(values: KnowledgeBaseFormValues) {
    if (!selected) return;

    setData((prev) =>
      prev.map((item) =>
        item.id === selected.id ? { ...item, ...values } : item
      )
    );

    setOpenEdit(false);
    setSelected(null);
  }

  function handleDelete() {
    if (!selected) return;

    setData((prev) => prev.filter((item) => item.id !== selected.id));
    setOpenDelete(false);
    setSelected(null);
  }

  return (
    <>
      <PageHeader
        title="Knowledge Base"
        description="Manage business knowledge used by AI agents."
      />

      <KnowledgeBaseToolbar
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setOpenCreate(true)}
      />

      {loading ? (
        <div className="p-4 text-sm text-muted-foreground">
          Loading knowledge bases...
        </div>
      ) : isEmpty ? (
        <EmptyState
          icon={BookOpen}
          title="No knowledge bases found"
          description="Try adjusting your search or create a new knowledge base."
        />
      ) : (
        <KnowledgeBaseTable
          data={filteredData}
          onEdit={(row) => {
            setSelected(row);
            setOpenEdit(true);
          }}
          onDelete={(row) => {
            setSelected(row);
            setOpenDelete(true);
          }}
        />
      )}

      {/* Create */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Knowledge Base</DialogTitle>
          </DialogHeader>

          <KnowledgeBaseForm
            submitLabel="Create"
            onSubmit={handleCreate}
          />
        </DialogContent>
      </Dialog>

      {/* Edit */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Knowledge Base</DialogTitle>
          </DialogHeader>

          <KnowledgeBaseForm
            submitLabel="Save Changes"
            defaultValues={selected ?? undefined}
            onSubmit={handleEdit}
          />
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Knowledge Base</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this item?
            </p>

            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-2 text-sm border rounded"
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-2 text-sm bg-red-500 text-white rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
