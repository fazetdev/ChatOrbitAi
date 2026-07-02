"use client";

import * as React from "react";

import AutomationForm from "./automation-form";
import type { Automation } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreate: (automation: Automation) => void;
}

export default function AddAutomationDialog({
  open,
  onOpenChange,
  onCreate,
}: Props) {
  if (!open) return null;

  function handleSubmit(values: any) {
    onCreate({
      id: crypto.randomUUID(),
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastRun: null,
    });

    onOpenChange(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Create Automation</h2>

        <AutomationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
