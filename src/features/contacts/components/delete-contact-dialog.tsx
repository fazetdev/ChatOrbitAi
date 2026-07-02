"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import type { Contact } from "../types";

interface DeleteContactDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  contact: Contact | null;
  onConfirm: () => void;
}

export default function DeleteContactDialog({
  open,
  onOpenChange,
  contact,
  onConfirm,
}: DeleteContactDialogProps): React.JSX.Element {
  if (!contact) return <></>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Contact</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Delete <b>{contact.name}</b>?
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
