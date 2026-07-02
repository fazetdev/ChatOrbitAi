"use client";

import type { Automation } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  automation: Automation | null;
  onDelete: (a: Automation) => void;
}

export default function DeleteAutomationDialog({
  open,
  onOpenChange,
  automation,
  onDelete,
}: Props) {
  if (!open || !automation) return null;

  function handleDelete() {
    onDelete(automation);
    onOpenChange(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          Delete Automation
        </h2>

        <p className="text-sm mb-4">
          Are you sure you want to delete "{automation.name}"?
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-2 border rounded"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>

          <button
            className="px-3 py-2 bg-red-600 text-white rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
