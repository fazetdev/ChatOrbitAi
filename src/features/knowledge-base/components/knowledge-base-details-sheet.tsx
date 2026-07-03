"use client";

import * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { KnowledgeBase } from "../types";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  knowledgeBase: KnowledgeBase | null;
}

export default function KnowledgeBaseDetailsSheet({
  open,
  onOpenChange,
  knowledgeBase,
}: Props): React.JSX.Element {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Knowledge Base Details</SheetTitle>
        </SheetHeader>

        {!knowledgeBase ? null : (
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <div className="text-muted-foreground">Name</div>
              <div className="font-medium">{knowledgeBase.name}</div>
            </div>

            <div>
              <div className="text-muted-foreground">Description</div>
              <div>{knowledgeBase.description || "-"}</div>
            </div>

            {"content" in knowledgeBase && (
              <div>
                <div className="text-muted-foreground">Content</div>
                <div className="whitespace-pre-wrap">
                  {(knowledgeBase as any).content || "-"}
                </div>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
