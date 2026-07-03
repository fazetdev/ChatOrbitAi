"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";

import PageHeader from "@/components/shared/page-header";
import { DataTableToolbar } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";

import { knowledgeBaseService } from "../services";
import type { KnowledgeBase } from "../types";
import { KnowledgeBaseTable } from "./knowledge-base-table";

export function KnowledgeBaseView(): React.JSX.Element {
  const [data, setData] = useState<KnowledgeBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  return (
    <>
      <PageHeader
        title="Knowledge Base"
        description="Manage business knowledge used by AI agents."
      />

      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search knowledge bases..."
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
        <KnowledgeBaseTable data={filteredData} />
      )}
    </>
  );
}
