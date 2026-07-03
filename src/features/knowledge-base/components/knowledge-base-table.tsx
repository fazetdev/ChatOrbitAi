"use client";

import { useState } from "react";

import { DataTable } from "@/components/shared/data-table";

import type { KnowledgeBase } from "../types";
import { createKnowledgeBaseColumns } from "./knowledge-base-columns";
import KnowledgeBaseDetailsSheet from "./knowledge-base-details-sheet";

interface Props {
  data: KnowledgeBase[];
  onEdit?: (row: KnowledgeBase) => void;
  onDelete?: (row: KnowledgeBase) => void;
}

export function KnowledgeBaseTable({
  data,
  onEdit,
  onDelete,
}: Props): React.JSX.Element {
  const [selected, setSelected] = useState<KnowledgeBase | null>(null);

  const [openView, setOpenView] = useState(false);

  const columns = createKnowledgeBaseColumns({
    onView: (row) => {
      setSelected(row);
      setOpenView(true);
    },
    onEdit: (row) => {
      onEdit?.(row);
    },
    onDelete: (row) => {
      onDelete?.(row);
    },
  });

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        emptyMessage="No knowledge bases found."
      />

      <KnowledgeBaseDetailsSheet
        open={openView}
        onOpenChange={setOpenView}
        knowledgeBase={selected}
      />
    </>
  );
}
