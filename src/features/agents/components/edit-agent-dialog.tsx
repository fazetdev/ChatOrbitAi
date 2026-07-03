"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Agent } from "../types";
import type { AgentFormValues } from "../schemas";

import AgentForm from "./agent-form";

interface EditAgentDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  agent: Agent | null;
  onSubmit: (values: AgentFormValues) => void;
}

export default function EditAgentDialog({
  open,
  onOpenChange,
  agent,
  onSubmit,
}: EditAgentDialogProps): React.JSX.Element {
  if (!agent) return <></>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
        </DialogHeader>

        <AgentForm
          submitLabel="Update Agent"
          defaultValues={{
            name: agent.name,
            description: agent.description ?? "",
            systemPrompt: agent.config.systemPrompt,
            tone: agent.config.tone,
            status: agent.status,
          }}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
