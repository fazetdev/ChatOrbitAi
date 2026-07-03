"use client";

import * as React from "react";

type BaseRow = any;

interface Props<T = BaseRow> {
  row: T;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

function ActionButton({
  onClick,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className: string;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
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
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onView(row);
          }}
          aria-label="View item"
          className="text-blue-600 hover:text-blue-700 hover:underline"
        >
          View
        </ActionButton>
      )}

      {onEdit && (
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row);
          }}
          aria-label="Edit item"
          className="text-green-600 hover:text-green-700 hover:underline"
        >
          Edit
        </ActionButton>
      )}

      {onDelete && (
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row);
          }}
          aria-label="Delete item"
          className="text-red-600 hover:text-red-700 hover:underline"
        >
          Delete
        </ActionButton>
      )}
    </div>
  );
}
