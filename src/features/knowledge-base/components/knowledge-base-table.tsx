"use client";

import { DataTable } from "@/components/shared/data-table";

import type { KnowledgeBase } from "../types";
import { createKnowledgeBaseColumns } from "./knowledge-base-columns";

interface Props {
  data: KnowledgeBase[];
}

export function KnowledgeBaseTable({ data }: Props): React.JSX.Element {
  const columns = createKnowledgeBaseColumns({
    onView: (row) => {
      console.log("view", row);
    },
    onEdit: (row) => {
      console.log("edit", row);
    },
    onDelete: (row) => {
      console.log("delete", row);
    },
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No knowledge bases found."
    />
  );
}
