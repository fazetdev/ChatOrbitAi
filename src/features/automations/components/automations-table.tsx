"use client";

import { DataTable } from "@/components/shared/data-table";
import type { Automation } from "../types";
import { createAutomationsColumns } from "./automations-columns";

interface Props {
  automations: Automation[];
  onEdit: (a: Automation) => void;
  onDelete: (a: Automation) => void;
  onView?: (a: Automation) => void;
}

export default function AutomationsTable({
  automations,
  onEdit,
  onDelete,
  onView,
}: Props): React.JSX.Element {
  const columns = createAutomationsColumns({
    onEdit,
    onDelete,
    onView,
  });

  return <DataTable columns={columns} data={automations} />;
}
