"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { ContactFormValues } from "../schemas";
import ContactForm from "./contact-form";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  onSubmit: (values: ContactFormValues) => void;
}

export default function AddContactDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddContactDialogProps): React.JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Contact</DialogTitle>
        </DialogHeader>

        <ContactForm
          submitLabel="Create Contact"
          defaultValues={{ status: "active", tags: [] }}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
