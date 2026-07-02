"use client";

import * as React from "react";
import AutomationForm from "./automation-form";
import type { Automation } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  automation: Automation | null;
  onUpdate: (a: Automation) => void;
}

export default function EditAutomationDialog({
  open,
  onOpenChange,
  automation,
  onUpdate,
}: Props) {
  if (!open || !automation) return null;

  function handleSubmit(values: any) {
    onUpdate({
      ...automation,
      ...values,
      updatedAt: new Date().toISOString(),
    });

    onOpenChange(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Automation</h2>

        <AutomationForm
          defaultValues={automation}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
