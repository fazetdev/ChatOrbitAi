"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Contact } from "../types";
import type { ContactFormValues } from "../schemas";

import ContactForm from "./contact-form";

interface EditContactDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  contact: Contact | null;
  onSubmit: (values: ContactFormValues) => void;
}

export default function EditContactDialog({
  open,
  onOpenChange,
  contact,
  onSubmit,
}: EditContactDialogProps): React.JSX.Element {
  if (!contact) return <></>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>

        <ContactForm
          submitLabel="Update Contact"
          defaultValues={{
            name: contact.name,
            phone: contact.phone,
            email: contact.email ?? "",
            company: contact.company ?? "",
            status: contact.status,
            tags: contact.tags,
          }}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
