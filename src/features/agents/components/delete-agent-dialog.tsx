"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import type { Agent } from "../types";

interface DeleteAgentDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  agent: Agent | null;
  onConfirm: () => void;
}

export default function DeleteAgentDialog({
  open,
  onOpenChange,
  agent,
  onConfirm,
}: DeleteAgentDialogProps): React.JSX.Element {
  if (!agent) return <></>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Agent</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Delete <b>{agent.name}</b>?
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
