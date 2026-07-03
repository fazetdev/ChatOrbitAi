"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { AgentFormValues } from "../schemas";
import AgentForm from "./agent-form";

interface AddAgentDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onSubmit: (values: AgentFormValues) => void;
}

export default function AddAgentDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddAgentDialogProps): React.JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Agent</DialogTitle>
        </DialogHeader>

        <AgentForm
          submitLabel="Create Agent"
          defaultValues={{
            status: "active",
            tone: "professional",
          }}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
