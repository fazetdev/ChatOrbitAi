"use client";

import * as React from "react";

type BaseRow = any;

interface Props<T = BaseRow> {
  row: T;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTableRowActions<T>({
  row,
  onView,
  onEdit,
  onDelete,
}: Props<T>) {
  return (
    <div className="flex items-center gap-3 text-sm">
      {onView && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(row);
          }}
          className="text-blue-600 hover:underline"
        >
          View
        </button>
      )}

      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row);
          }}
          className="text-green-600 hover:underline"
        >
          Edit
        </button>
      )}

      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row);
          }}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      )}
    </div>
  );
}
