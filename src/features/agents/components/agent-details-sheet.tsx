"use client";

import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import type { Agent } from "../types";

interface AgentDetailsSheetProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  agent: Agent | null;
}

export default function AgentDetailsSheet({
  open,
  onOpenChange,
  agent,
}: AgentDetailsSheetProps): React.JSX.Element {
  if (!agent) return <></>;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Agent Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{agent.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="font-medium">
              {agent.description || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge>{agent.status}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Tone</p>
            <p className="font-medium capitalize">
              {agent.config.tone}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              System Prompt
            </p>

            <div className="mt-1 rounded-md border bg-muted/30 p-3 text-sm whitespace-pre-wrap">
              {agent.config.systemPrompt}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Created
            </p>
            <p className="font-medium">{agent.createdAt}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Updated
            </p>
            <p className="font-medium">{agent.updatedAt}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
