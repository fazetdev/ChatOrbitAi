"use client";

import type { Automation } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  automation: Automation | null;
}

export default function AutomationDetailsSheet({
  open,
  onOpenChange,
  automation,
}: Props) {
  if (!open || !automation) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-4">
        Automation Details
      </h2>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-muted-foreground">Name</p>
          <p>{automation.name}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Type</p>
          <p>{automation.type}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Status</p>
          <p>{automation.status}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Last Run</p>
          <p>{automation.lastRun ?? "Never"}</p>
        </div>
      </div>

      <button
        className="mt-6 px-3 py-2 border rounded"
        onClick={() => onOpenChange(false)}
      >
        Close
      </button>
    </div>
  );
}
